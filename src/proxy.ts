import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;
  const decoded = token ? verifyToken(token) : null;

  if (pathname.startsWith("/client")) {
    if (!decoded || decoded.role !== "client")
      return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname.startsWith("/owner")) {
    if (!decoded || decoded.role !== "owner")
      return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname.startsWith("/admin")) {
    if (!decoded || decoded.role !== "admin")
      return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/client/:path*", "/owner/:path*", "/admin/:path*"],
};
