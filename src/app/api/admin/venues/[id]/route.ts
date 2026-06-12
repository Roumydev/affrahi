import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const token = req.cookies.get("token")?.value;
  const decoded = token ? verifyToken(token) : null;
  if (!decoded || decoded.role !== "admin")
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  await db.wishlist.deleteMany({ where: { venueId: id } });
  await db.reservation.deleteMany({ where: { venueId: id } });
  await db.venue.delete({ where: { id } });

  return NextResponse.json({ message: "Deleted" });
}
