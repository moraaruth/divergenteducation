import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/User";
import { TenantModel } from "@/models/index";
import { signAccessToken, signRefreshToken } from "@/lib/auth";
import { slugify } from "@/lib/utils";

const Schema = z.object({
  name:       z.string().min(2).max(50),
  email:      z.string().email(),
  password:   z.string().min(8),
  role:       z.enum(["child", "parent", "teacher", "school_admin"]),
  schoolName: z.string().optional(),
  tenantSlug: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = Schema.parse(await req.json());

    if (await UserModel.findOne({ email: data.email })) {
      return NextResponse.json({ success: false, error: "Email already registered" }, { status: 409 });
    }

    let tenant;
    if (data.tenantSlug) {
      tenant = await TenantModel.findOne({ slug: data.tenantSlug });
      if (!tenant) return NextResponse.json({ success: false, error: "School not found" }, { status: 404 });
    } else {
      tenant = await TenantModel.create({
        name: data.schoolName ?? `${data.name}'s Family`,
        slug: slugify(data.schoolName ?? data.name) + "-" + Date.now(),
        subscriptionStatus: "trialing",
        trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      });
    }

    const user = await UserModel.create({
      name: data.name, email: data.email, password: data.password,
      role: data.role, tenantId: tenant._id,
    });

    const payload = { userId: user._id.toString(), role: user.role, tenantId: tenant._id.toString() };
    const accessToken  = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);
    await UserModel.findByIdAndUpdate(user._id, { refreshToken });

    const res = NextResponse.json({
      success: true,
      data: { user: { _id: user._id, name: user.name, email: user.email, role: user.role }, accessToken },
    }, { status: 201 });

    res.cookies.set("refreshToken", refreshToken, {
      httpOnly: true, secure: process.env.NODE_ENV === "production",
      sameSite: "lax", maxAge: 30 * 24 * 60 * 60, path: "/",
    });
    return res;
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ success: false, error: err.issues[0].message }, { status: 400 });
    console.error(err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
