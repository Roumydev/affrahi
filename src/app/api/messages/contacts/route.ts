import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

// جيب قائمة الأشخاص اللي يقدر يراسلهم
export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const decoded = token ? verifyToken(token) : null;
  if (!decoded)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  if (decoded.role === "client") {
    // Client يشوف owners تاع القاعات اللي حجزها
    const reservations = await db.reservation.findMany({
      where: { clientId: decoded.id },
      include: {
        venue: { include: { owner: { select: { id: true, name: true } } } },
      },
    });
    const owners = Array.from(
      new Map(
        reservations.map((r) => [r.venue.owner.id, r.venue.owner]),
      ).values(),
    );
    return NextResponse.json({ contacts: owners });
  } else {
    // Owner يشوف clients اللي حجزوا عنده
    const reservations = await db.reservation.findMany({
      where: { venue: { ownerId: decoded.id } },
      include: { client: { select: { id: true, name: true } } },
    });
    const clients = Array.from(
      new Map(reservations.map((r) => [r.client.id, r.client])).values(),
    );
    return NextResponse.json({ contacts: clients });
  }
}
