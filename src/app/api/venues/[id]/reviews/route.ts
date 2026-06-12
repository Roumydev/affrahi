import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }, // رجعها Promise
) {
  try {
    // دير await للـ params هنايا
    const { id } = await params;

    const reviews = await db.review.findMany({
      where: {
        venueId: id,
      },
      include: {
        user: {
          select: { name: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error) {
    console.error("[REVIEWS_GET_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
