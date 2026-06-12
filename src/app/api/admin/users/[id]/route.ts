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

  if (decoded.id === id)
    return NextResponse.json(
      { message: "Cannot delete yourself" },
      { status: 400 },
    );

  await db.wishlist.deleteMany({ where: { userId: id } });
  await db.reservation.deleteMany({ where: { clientId: id } });
  await db.venue.deleteMany({ where: { ownerId: id } });
  await db.user.delete({ where: { id } });

  return NextResponse.json({ message: "Deleted" });
}
