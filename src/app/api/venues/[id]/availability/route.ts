import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const reservations = await db.reservation.findMany({
    where: {
      venueId: id,
      OR: [
        { status: "confirmed" },
        {
          status: "pending",
          createdAt: { gte: twentyFourHoursAgo },
        },
      ],
    },
    select: { date: true, status: true },
  });

  const bookedDates = reservations
    .filter((r) => r.status === "confirmed")
    .map((r) => r.date.toISOString().split("T")[0]);

  const pendingDates = reservations
    .filter((r) => r.status === "pending")
    .map((r) => r.date.toISOString().split("T")[0]);

  return NextResponse.json({ bookedDates, pendingDates });
}
