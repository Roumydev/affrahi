import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const decoded = token ? verifyToken(token) : null;
  if (!decoded)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  // جيب كل reservations confirmed بدون شرط التاريخ
  const reservations = await db.reservation.findMany({
    where: { clientId: decoded.id, status: "confirmed" },
    include: { venue: true },
    orderBy: { date: "desc" },
  });

  const reviews = await db.review.findMany({
    where: { userId: decoded.id },
  });

  const reviewMap: Record<
    string,
    { id: string; rating: number; comment: string; createdAt: Date }
  > = {};
  for (const r of reviews) {
    reviewMap[r.reservationId] = r;
  }

  const result = reservations.map((res) => ({
    reservationId: res.id,
    venueName: res.venue.name,
    eventType: res.eventType || "Event",
    date: res.date,
    review: reviewMap[res.id] || null,
  }));

  return NextResponse.json({ items: result });
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const decoded = token ? verifyToken(token) : null;
  if (!decoded)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { reservationId, rating, comment } = await req.json();
  if (!reservationId || !rating || !comment)
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });

  const reservation = await db.reservation.findFirst({
    where: { id: reservationId, clientId: decoded.id },
  });
  if (!reservation)
    return NextResponse.json(
      { message: "Reservation not found" },
      { status: 404 },
    );

  try {
    const review = await db.review.create({
      data: {
        userId: decoded.id,
        reservationId,
        venueId: reservation.venueId,
        rating: Number(rating),
        comment,
      },
    });
    return NextResponse.json({ review }, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Review already exists" },
      { status: 400 },
    );
  }
}
