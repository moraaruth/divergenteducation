import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { MoodEntryModel } from "@/models/index";
import { verifyAccessToken } from "@/lib/auth";

const Schema = z.object({
  mood:     z.number().min(1).max(5),
  note:     z.string().max(500).optional(),
  triggers: z.array(z.string()).optional(),
  energy:   z.number().min(1).max(5).optional(),
  focus:    z.number().min(1).max(5).optional(),
});

const MOOD_LABELS = ["", "overwhelmed", "sad", "okay", "good", "amazing"] as const;

const AI_INSIGHTS: Record<number, string[]> = {
  1: ["It's okay to feel overwhelmed. Try a 5-minute breathing exercise 🌬️", "You're brave for checking in. Let's find something calming together 💙"],
  2: ["Feeling sad is valid. A short walk or creative activity might help 🌿", "You're not alone. Let's try something gentle today 🤗"],
  3: ["A steady day! Small wins count. What's one thing you can do well today? ⭐", "Okay is perfectly fine! Let's build on that energy 🌤️"],
  4: ["You're doing great! This is a perfect time to tackle a learning challenge 🚀", "Wonderful energy! Let's channel it into something creative 🎨"],
  5: ["You're absolutely shining today! 🌟 Let's make the most of this amazing energy!", "Incredible! You're unstoppable today — let's celebrate and learn! 🎉"],
};

function getAIInsight(mood: number): string {
  const insights = AI_INSIGHTS[mood] ?? AI_INSIGHTS[3];
  return insights[Math.floor(Math.random() * insights.length)];
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.slice(7);
    if (!token) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    const jwt = verifyAccessToken(token);

    await connectDB();
    const data = Schema.parse(await req.json());

    const entry = await MoodEntryModel.create({
      userId:    jwt.userId,
      tenantId:  jwt.tenantId,
      mood:      data.mood,
      label:     MOOD_LABELS[data.mood],
      note:      data.note,
      triggers:  data.triggers,
      energy:    data.energy,
      focus:     data.focus,
      aiInsight: getAIInsight(data.mood),
    });

    return NextResponse.json({ success: true, data: entry }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ success: false, error: err.issues[0].message }, { status: 400 });
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.slice(7);
    if (!token) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    const jwt = verifyAccessToken(token);

    await connectDB();
    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "7"), 30);

    const entries = await MoodEntryModel.find({ userId: jwt.userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({ success: true, data: entries });
  } catch {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
