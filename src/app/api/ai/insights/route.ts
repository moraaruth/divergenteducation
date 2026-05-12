import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { MoodEntryModel } from "@/models/index";
import { verifyAccessToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.slice(7);
    if (!token) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    const jwt = verifyAccessToken(token);

    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") ?? jwt.userId;

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const entries = await MoodEntryModel.find({
      userId,
      createdAt: { $gte: sevenDaysAgo },
    }).sort({ createdAt: 1 }).lean();

    if (!entries.length) {
      return NextResponse.json({ success: true, data: { summary: "No mood data yet.", recommendations: [] } });
    }

    const avgMood = entries.reduce((s, e) => s + e.mood, 0) / entries.length;
    const firstHalf = entries.slice(0, Math.floor(entries.length / 2));
    const secondHalf = entries.slice(Math.floor(entries.length / 2));
    const firstAvg = firstHalf.reduce((s, e) => s + e.mood, 0) / (firstHalf.length || 1);
    const secondAvg = secondHalf.reduce((s, e) => s + e.mood, 0) / (secondHalf.length || 1);
    const trend = secondAvg > firstAvg + 0.3 ? "improving" : secondAvg < firstAvg - 0.3 ? "declining" : "stable";

    const recommendations = [];
    if (avgMood < 3) recommendations.push({ type: "wellbeing", title: "Schedule a calm activity", priority: "high" });
    if (avgMood >= 4) recommendations.push({ type: "lesson", title: "Great time for a challenge lesson!", priority: "medium" });
    recommendations.push({ type: "routine", title: "Consistent morning routine helps focus", priority: "low" });

    return NextResponse.json({
      success: true,
      data: {
        avgMood: Math.round(avgMood * 10) / 10,
        moodTrend: trend,
        entryCount: entries.length,
        recommendations,
        summary: `Average mood this week: ${avgMood.toFixed(1)}/5. Trend is ${trend}.`,
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
