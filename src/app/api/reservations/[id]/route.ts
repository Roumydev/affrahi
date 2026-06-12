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
  if (!decoded)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { status } = await req.json();

  if (decoded.role === "owner") {
    if (!["confirmed", "rejected"].includes(status))
      return NextResponse.json({ message: "Invalid status" }, { status: 400 });

    const reservation = await db.reservation.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ reservation });
  }

  if (decoded.role === "client") {
    if (status !== "cancelled")
      return NextResponse.json({ message: "Invalid status" }, { status: 400 });

    const existing = await db.reservation.findFirst({
      where: { id, clientId: decoded.id },
    });
    if (!existing)
      return NextResponse.json({ message: "Not found" }, { status: 404 });

    const reservation = await db.reservation.update({
      where: { id },
      data: { status: "cancelled" },
    });
    return NextResponse.json({ reservation });
  }

  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const token = req.cookies.get("token")?.value;
  const decoded = token ? verifyToken(token) : null;
  if (!decoded || decoded.role !== "client")
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const existing = await db.reservation.findFirst({
    where: { id, clientId: decoded.id },
  });
  if (!existing)
    return NextResponse.json({ message: "Not found" }, { status: 404 });

  await db.reservation.update({
    where: { id },
    data: { status: "cancelled" },
  });
  return NextResponse.json({ message: "Cancelled" });
}
