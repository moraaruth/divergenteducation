import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/auth";
import type { JWTPayload, UserRole } from "@/types";

export function withAuth(
  handler: (req: NextRequest, ctx: { params: Record<string, string> }, jwt: JWTPayload) => Promise<NextResponse>,
  allowedRoles?: UserRole[]
) {
  return async (req: NextRequest, ctx: { params: Record<string, string> }) => {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    try {
      const payload = verifyAccessToken(token);
      if (allowedRoles && !allowedRoles.includes(payload.role)) {
        return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
      }
      return handler(req, ctx, payload);
    } catch {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 });
    }
  };
}
