import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const role = request.cookies.get("role")?.value;

  // 🔐 PROTEKSI ADMIN
  if (pathname.startsWith("/admin")) {
    if (role !== "admin") {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }
  }

  // 🔐 PROTEKSI USER
  if (pathname.startsWith("/user")) {
    if (!role) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
