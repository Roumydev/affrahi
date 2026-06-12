import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const decoded = token ? verifyToken(token) : null;
  if (!decoded || decoded.role !== "admin")
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const reports = await db.report.findMany({
    include: { user: { select: { name: true, email: true, role: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ reports });
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const decoded = token ? verifyToken(token) : null;
  if (!decoded)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { subject, description, category } = await req.json();
  if (!subject || !description)
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });

  const report = await db.report.create({
    data: {
      userId: decoded.id,
      subject,
      description,
      category: category || "other",
    },
  });

  return NextResponse.json({ report }, { status: 201 });
}
