import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/User";
import { verifyRefreshToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("refreshToken")?.value;
    if (token) {
      const payload = verifyRefreshToken(token);
      await connectDB();
      await UserModel.findByIdAndUpdate(payload.userId, { $unset: { refreshToken: 1 } });
    }
  } catch { /* ignore */ }

  const res = NextResponse.json({ success: true });
  res.cookies.delete("refreshToken");
  return res;
}
