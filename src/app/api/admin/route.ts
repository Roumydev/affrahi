import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const decoded = token ? verifyToken(token) : null;
  if (!decoded || decoded.role !== "admin")
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const [totalUsers, totalVenues, totalReservations, pendingReservations] =
    await Promise.all([
      db.user.count(),
      db.venue.count(),
      db.reservation.count(),
      db.reservation.count({ where: { status: "pending" } }),
    ]);

  const recentReservations = await db.reservation.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      client: { select: { name: true } },
      venue: { select: { name: true } },
    },
  });

  return NextResponse.json({
    stats: { totalUsers, totalVenues, totalReservations, pendingReservations },
    recentReservations,
  });
}
