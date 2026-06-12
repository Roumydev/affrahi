import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const reviews = await db.review.findMany({
    include: {
      user: { select: { name: true } },
      venue: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ reviews });
}
