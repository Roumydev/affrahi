import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const decoded = token ? verifyToken(token) : null;
  if (!decoded || decoded.role !== "admin")
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const reservations = await db.reservation.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      client: { select: { name: true, email: true } },
      venue: { select: { name: true, location: true } },
    },
  });

  return NextResponse.json({ reservations });
}
