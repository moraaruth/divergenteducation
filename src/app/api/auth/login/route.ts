import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/User";
import { signAccessToken, signRefreshToken } from "@/lib/auth";

const Schema = z.object({
  email:    z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password } = Schema.parse(await req.json());

    const user = await UserModel.findOne({ email, isActive: true }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    const payload = { userId: user._id.toString(), role: user.role, tenantId: user.tenantId.toString() };
    const accessToken  = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    await UserModel.findByIdAndUpdate(user._id, {
      refreshToken,
      "stats.lastActiveAt": new Date(),
    });

    const res = NextResponse.json({
      success: true,
      data: {
        user: {
          _id: user._id, name: user.name, email: user.email,
          role: user.role, avatar: user.avatar, profile: user.profile,
          settings: user.settings, stats: user.stats,
          tenantId: user.tenantId, subscriptionTier: user.subscriptionTier,
        },
        accessToken,
      },
    });

    res.cookies.set("refreshToken", refreshToken, {
      httpOnly: true, secure: process.env.NODE_ENV === "production",
      sameSite: "lax", maxAge: 30 * 24 * 60 * 60, path: "/",
    });
    return res;
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ success: false, error: err.issues[0].message }, { status: 400 });
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
