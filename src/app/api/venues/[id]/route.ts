import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const venue = await db.venue.findUnique({
    where: { id },
    include: { owner: { select: { name: true } } },
  });
  if (!venue)
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json({ venue });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const token = req.cookies.get("token")?.value;
  const decoded = token ? verifyToken(token) : null;
  if (!decoded || decoded.role !== "owner")
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { name, location, capacity, price, description, image, phone } =
    await req.json();

  const venue = await db.venue.update({
    where: { id },
    data: { name, location, capacity, price, description, image, phone },
  });

  return NextResponse.json({ venue });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const token = req.cookies.get("token")?.value;
  const decoded = token ? verifyToken(token) : null;
  if (!decoded || decoded.role !== "owner")
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    await db.wishlist.deleteMany({ where: { venueId: id } });
    await db.reservation.deleteMany({ where: { venueId: id } });
    await db.venue.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error deleting venue" },
      { status: 500 },
    );
  }
}
