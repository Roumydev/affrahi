import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    const decoded = token ? verifyToken(token) : null;
    if (!decoded)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    if (decoded.role === "client") {
      const reservations = await db.reservation.findMany({
        where: { clientId: decoded.id },
        include: { venue: true },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json({ reservations });
    }

    if (decoded.role === "owner") {
      const reservations = await db.reservation.findMany({
        where: { venue: { ownerId: decoded.id } },
        include: {
          venue: true,
          client: { select: { name: true, email: true } },
        },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json({ reservations });
    }

    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    const decoded = token ? verifyToken(token) : null;
    if (!decoded || decoded.role !== "client")
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { venueId, date, guests, eventType, clientPhone } = await req.json();
    if (!venueId || !date || !guests)
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });

    const bookingDate = new Date(date);
    bookingDate.setHours(0, 0, 0, 0);
    const nextDay = new Date(bookingDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const existing = await db.reservation.findFirst({
      where: {
        venueId,
        date: {
          gte: bookingDate,
          lt: nextDay,
        },
        OR: [
          { status: "confirmed" },
          {
            status: "pending",
            createdAt: { gte: twentyFourHoursAgo },
          },
        ],
      },
    });

    if (existing) {
      const message =
        existing.status === "confirmed"
          ? "This date is already booked. Please choose another date."
          : "This date has a pending reservation. Please try again later or choose another date.";
      return NextResponse.json({ message }, { status: 400 });
    }

    const reservation = await db.reservation.create({
      data: {
        venueId,
        clientId: decoded.id,
        date: new Date(date),
        guests: Number(guests),
        eventType,
        clientPhone,
        status: "pending",
      },
    });

    return NextResponse.json({ reservation }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
