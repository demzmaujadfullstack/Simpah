import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const pathname = req.nextUrl.pathname;

  // Login & Register
  if (
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/register")
  ) {
    if (isLoggedIn) {
      return NextResponse.redirect(
        new URL("/", req.nextUrl)
      );
    }

    return NextResponse.next();
  }

  // Dashboard
  if (pathname.startsWith("/dashboard")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(
        new URL("/auth/login", req.nextUrl)
      );
    }

    const role = req.auth?.user?.role;

    if (
      pathname.startsWith("/dashboard/admin") &&
      role !== "ADMIN"
    ) {
      return NextResponse.redirect(
        new URL("/unauthorized", req.nextUrl)
      );
    }

    if (
      pathname.startsWith("/dashboard/petugas") &&
      role !== "PETUGAS"
    ) {
      return NextResponse.redirect(
        new URL("/unauthorized", req.nextUrl)
      );
    }

    if (
      pathname.startsWith("/dashboard/warga") &&
      role !== "WARGA"
    ) {
      return NextResponse.redirect(
        new URL("/unauthorized", req.nextUrl)
      );
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/auth/login",
    "/auth/register",
  ],
};