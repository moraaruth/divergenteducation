import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/User";
import { verifyAccessToken } from "@/lib/auth";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.slice(7);
    if (!token) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    const jwt = verifyAccessToken(token);

    await connectDB();
    const user = await UserModel.findById(jwt.userId).lean();
    if (!user) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });

    return NextResponse.json({ success: true, data: user });
  } catch {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

const UpdateSchema = z.object({
  name:     z.string().min(2).max(50).optional(),
  avatar:   z.string().optional(),
  profile:  z.record(z.string(), z.unknown()).optional(),
  settings: z.record(z.string(), z.unknown()).optional(),
});

export async function PATCH(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.slice(7);
    if (!token) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    const jwt = verifyAccessToken(token);

    await connectDB();
    const data = UpdateSchema.parse(await req.json());
    const user = await UserModel.findByIdAndUpdate(jwt.userId, { $set: data }, { new: true }).lean();

    return NextResponse.json({ success: true, data: user });
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ success: false, error: err.issues[0].message }, { status: 400 });
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
