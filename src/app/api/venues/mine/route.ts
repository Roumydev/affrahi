import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const decoded = token ? verifyToken(token) : null;

  if (!decoded || decoded.role !== "owner")
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const venues = await db.venue.findMany({
    where: { ownerId: decoded.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ venues });
}
