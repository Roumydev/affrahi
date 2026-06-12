import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  req: NextRequest, // نستخدم NextRequest كـ معيار في Next.js
  { params }: { params: Promise<{ id: string }> }, // تحديث الـ Type هنا ليصبح Promise
) {
  try {
    // نقوم بعمل await للـ params أولاً في Next.js 15+
    const { id } = await params;

    const body = await req.json();
    const { status, adminReply } = body;

    if (!id) {
      return new NextResponse("Report ID is required", { status: 400 });
    }

    const updatedReport = await db.report.update({
      where: { id: id },
      data: {
        ...(status && { status }),
        ...(adminReply && { adminReply }),
      },
    });

    return NextResponse.json({ report: updatedReport }, { status: 200 });
  } catch (error) {
    console.error("[REPORT_PATCH_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
