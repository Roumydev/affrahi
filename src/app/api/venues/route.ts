import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

// GET — كل الـ venues (للعموم)
export async function GET() {
  try {
    const venues = await db.venue.findMany({
      include: { owner: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ venues });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// POST — owner يضيف venue جديد
export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    const decoded = token ? verifyToken(token) : null;

    if (!decoded || decoded.role !== "owner")
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { name, location, capacity, price, description, image } =
      await req.json();

    if (!name || !location || !capacity || !price)
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });

    const venue = await db.venue.create({
      data: {
        name,
        location,
        capacity: Number(capacity),
        price: Number(price),
        description,
        image,
        ownerId: decoded.id,
      },
    });

    return NextResponse.json({ venue }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
