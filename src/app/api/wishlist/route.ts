import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const decoded = token ? verifyToken(token) : null;
  if (!decoded)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const wishlist = await db.wishlist.findMany({
    where: { userId: decoded.id },
    include: { venue: true },
  });
  return NextResponse.json({ wishlist });
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const decoded = token ? verifyToken(token) : null;
  if (!decoded)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { venueId } = await req.json();
  try {
    const item = await db.wishlist.create({
      data: { userId: decoded.id, venueId },
    });
    return NextResponse.json({ item }, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Already in wishlist" },
      { status: 400 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const decoded = token ? verifyToken(token) : null;
  if (!decoded)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { venueId } = await req.json();
  await db.wishlist.deleteMany({
    where: { userId: decoded.id, venueId },
  });
  return NextResponse.json({ message: "Removed" });
}
