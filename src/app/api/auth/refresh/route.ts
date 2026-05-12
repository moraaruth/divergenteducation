import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/User";
import { verifyRefreshToken, signAccessToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("refreshToken")?.value;
    if (!token) return NextResponse.json({ success: false, error: "No refresh token" }, { status: 401 });

    const payload = verifyRefreshToken(token);
    await connectDB();

    const user = await UserModel.findById(payload.userId).select("+refreshToken");
    if (!user || user.refreshToken !== token) {
      return NextResponse.json({ success: false, error: "Invalid refresh token" }, { status: 401 });
    }

    const accessToken = signAccessToken({
      userId: user._id.toString(), role: user.role, tenantId: user.tenantId.toString(),
    });

    return NextResponse.json({ success: true, data: { accessToken } });
  } catch {
    return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 });
  }
}
