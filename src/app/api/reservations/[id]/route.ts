import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const token = req.cookies.get("token")?.value;
  const decoded = token ? verifyToken(token) : null;
  if (!decoded || decoded.role !== "owner")
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { status } = await req.json();
  if (!["confirmed", "rejected"].includes(status))
    return NextResponse.json({ message: "Invalid status" }, { status: 400 });

  const reservation = await db.reservation.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json({ reservation });
}
