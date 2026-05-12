import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/auth";
import type { UserRole } from "@/types";

const ROLE_ROUTES: Record<string, UserRole[]> = {
  "/dashboard/child":   ["child"],
  "/dashboard/parent":  ["parent"],
  "/dashboard/teacher": ["teacher"],
  "/dashboard/admin":   ["school_admin", "super_admin"],
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect dashboard routes
  if (!pathname.startsWith("/dashboard")) return NextResponse.next();

  const token = req.headers.get("authorization")?.slice(7)
    ?? req.cookies.get("accessToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const payload = verifyAccessToken(token);

    // Check role-based access
    for (const [route, roles] of Object.entries(ROLE_ROUTES)) {
      if (pathname.startsWith(route) && !roles.includes(payload.role)) {
        const redirect = `/dashboard/${payload.role === "school_admin" ? "admin" : payload.role}`;
        return NextResponse.redirect(new URL(redirect, req.url));
      }
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
