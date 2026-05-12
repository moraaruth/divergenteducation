"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui";
import { MoodPicker } from "@/components/ui/MoodPicker";
import { useMoodStore } from "@/store";
import { getMoodConfig } from "@/lib/utils";

export function MoodCheckIn() {
  const [step, setStep] = useState<"pick" | "note" | "insight">("pick");
  const [mood, setMood] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);
  const { setTodayMood } = useMoodStore();

  async function submit() {
    if (!mood) return;
    setLoading(true);
    try {
      const res = await fetch("/api/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood, note }),
      });
      const data = await res.json();
      setInsight(data.data?.aiInsight ?? "You're doing great! Keep going 🌟");
      setTodayMood(mood);
      setStep("insight");
    } catch {
      setInsight("You're doing great! Keep going 🌟");
      setStep("insight");
    } finally {
      setLoading(false);
    }
  }

  const moodConfig = mood ? getMoodConfig(mood as 1 | 2 | 3 | 4 | 5) : null;

  return (
    <Card gradient="calm" className="overflow-hidden">
      <AnimatePresence mode="wait">
        {step === "pick" && (
          <motion.div
            key="pick"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">How are you feeling? 💭</h3>
              <p className="text-sm text-slate-500 mt-1">Take a moment to check in with yourself</p>
            </div>
            <MoodPicker value={mood ?? undefined} onChange={setMood} />
            <Button
              onClick={() => setStep("note")}
              disabled={!mood}
              className="w-full"
              size="md"
            >
              Next <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        )}

        {step === "note" && (
          <motion.div
            key="note"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{moodConfig?.emoji}</span>
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                  Feeling {moodConfig?.label}
                </h3>
                <p className="text-sm text-slate-500">Want to share more? (optional)</p>
              </div>
            </div>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What's on your mind? You can write anything here..."
              className="min-h-[80px]"
            />
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setStep("pick")} className="flex-1">Back</Button>
              <Button onClick={submit} loading={loading} className="flex-1">
                <Sparkles className="h-4 w-4" /> Get AI insight
              </Button>
            </div>
          </motion.div>
        )}

        {step === "insight" && (
          <motion.div
            key="insight"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4 text-center"
          >
            <div className="text-5xl">{moodConfig?.emoji}</div>
            <div
              className="rounded-2xl p-4 text-sm font-medium text-slate-700 dark:text-slate-200"
              style={{ backgroundColor: moodConfig?.bg }}
            >
              <Sparkles className="h-4 w-4 inline mr-2 text-brand-500" />
              {insight}
            </div>
            <Button variant="calm" onClick={() => { setStep("pick"); setMood(null); setNote(""); }} className="w-full">
              Done ✨
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
