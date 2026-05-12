import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { LessonModel } from "@/models/index";
import { verifyAccessToken } from "@/lib/auth";
import { z } from "zod";

const CreateSchema = z.object({
  title:       z.string().min(2).max(100),
  description: z.string().optional(),
  type:        z.enum(["visual","audio","interactive","story","stem","life_skills","emotional_iq"]),
  difficulty:  z.number().min(1).max(3).default(1),
  duration:    z.number().min(1).max(120).default(10),
  xpReward:    z.number().min(0).default(50),
  tags:        z.array(z.string()).default([]),
});

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.slice(7);
    if (!token) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    const jwt = verifyAccessToken(token);

    await connectDB();
    const { searchParams } = new URL(req.url);
    const type       = searchParams.get("type");
    const difficulty = searchParams.get("difficulty");
    const page       = parseInt(searchParams.get("page") ?? "1");
    const limit      = Math.min(parseInt(searchParams.get("limit") ?? "12"), 50);

    const filter: Record<string, unknown> = {
      isPublished: true,
      $or: [{ tenantId: null }, { tenantId: jwt.tenantId }],
    };
    if (type) filter.type = type;
    if (difficulty) filter.difficulty = parseInt(difficulty);

    const [lessons, total] = await Promise.all([
      LessonModel.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      LessonModel.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: lessons,
      total,
      page,
      limit,
      hasMore: page * limit < total,
    });
  } catch {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.slice(7);
    if (!token) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    const jwt = verifyAccessToken(token);

    if (!["teacher","school_admin","super_admin"].includes(jwt.role)) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    await connectDB();
    const data = CreateSchema.parse(await req.json());
    const lesson = await LessonModel.create({ ...data, tenantId: jwt.tenantId, createdBy: jwt.userId });

    return NextResponse.json({ success: true, data: lesson }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ success: false, error: err.issues[0].message }, { status: 400 });
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
