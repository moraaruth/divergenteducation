import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/auth";

const FALLBACK: Record<string, string> = {
  overwhelmed: "I hear you 💙 Try this: breathe in for 4 counts, hold for 4, out for 4. You've got this!",
  focus:       "Let's boost your focus! 🎯 Try working for 15 minutes, then take a 5-minute break. Want a lesson suggestion?",
  break:       "A break is a great idea! 🌿 Step away for 5 minutes — stretch, drink water, look outside. Your brain will thank you!",
  learn:       "Great question! 📚 I'd suggest starting with 'Emotions & Feelings' — it's fun and only 8 minutes. Ready?",
  default:     "That's really interesting! 🌟 I'm here to help you learn, feel good, and have fun. What would you like to explore today?",
};

function fallbackReply(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("overwhelm") || m.includes("stress") || m.includes("anxious")) return FALLBACK.overwhelmed;
  if (m.includes("focus") || m.includes("concentrat") || m.includes("distract")) return FALLBACK.focus;
  if (m.includes("break") || m.includes("tired") || m.includes("rest")) return FALLBACK.break;
  if (m.includes("learn") || m.includes("lesson") || m.includes("study")) return FALLBACK.learn;
  return FALLBACK.default;
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.slice(7);
    if (!token) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    verifyAccessToken(token);

    const { message } = await req.json();
    if (!message?.trim()) return NextResponse.json({ success: false, error: "Message required" }, { status: 400 });

    if (process.env.OPENAI_API_KEY) {
      const { default: OpenAI } = await import("openai");
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are Spark, a warm AI companion for children with ASD and ADHD on DivergentEd. " +
              "Be concise (2-3 sentences), use simple language, include 1 emoji, be emotionally supportive, " +
              "and always end with an actionable suggestion. Never use complex vocabulary. Be playful but calm.",
          },
          { role: "user", content: message },
        ],
        max_tokens: 150,
        temperature: 0.7,
      });
      return NextResponse.json({ success: true, reply: completion.choices[0].message.content });
    }

    await new Promise((r) => setTimeout(r, 500));
    return NextResponse.json({ success: true, reply: fallbackReply(message) });
  } catch {
    return NextResponse.json({ success: false, error: "AI service unavailable" }, { status: 500 });
  }
}
