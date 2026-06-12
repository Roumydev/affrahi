import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

// GET — جيب كل conversations تاع المستخدم
export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const decoded = token ? verifyToken(token) : null;
  if (!decoded)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const messages = await db.message.findMany({
    where: {
      OR: [{ senderId: decoded.id }, { receiverId: decoded.id }],
    },
    include: {
      sender: { select: { id: true, name: true, role: true } },
      receiver: { select: { id: true, name: true, role: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({ messages });
}

// POST — إرسال message
export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const decoded = token ? verifyToken(token) : null;
  if (!decoded)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { receiverId, content } = await req.json();
  if (!receiverId || !content)
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });

  const message = await db.message.create({
    data: {
      senderId: decoded.id,
      receiverId,
      content,
    },
    include: {
      sender: { select: { id: true, name: true, role: true } },
      receiver: { select: { id: true, name: true, role: true } },
    },
  });

  return NextResponse.json({ message }, { status: 201 });
}
