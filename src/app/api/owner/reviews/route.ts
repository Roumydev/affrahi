import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const decoded = token ? verifyToken(token) : null;
  if (!decoded)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const reviews = await db.review.findMany({
    where: { venue: { ownerId: decoded.id } },
    include: {
      user: { select: { name: true } },
      venue: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ reviews });
}
