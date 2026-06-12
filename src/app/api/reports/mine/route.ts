import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const decoded = token ? verifyToken(token) : null;
  if (!decoded)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const reports = await db.report.findMany({
    where: { userId: decoded.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      subject: true,
      description: true,
      category: true,
      status: true,
      adminReply: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ reports });
}
