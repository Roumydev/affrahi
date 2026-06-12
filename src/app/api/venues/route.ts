import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  try {
    const venues = await db.venue.findMany({
      include: { owner: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ venues });
  } catch (error) {
    console.error("❌ Venues API Error:", error);
    return NextResponse.json(
      { message: "Server error", error: String(error) },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    const decoded = token ? verifyToken(token) : null;

    if (!decoded || decoded.role !== "owner")
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { name, location, capacity, price, description, image, phone } =
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
        phone,
        ownerId: decoded.id,
      },
    });

    return NextResponse.json({ venue }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
