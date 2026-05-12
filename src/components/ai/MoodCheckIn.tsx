"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ArrowLeft, Heart } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui";
import { MoodPicker } from "@/components/ui/MoodPicker";
import { useMoodStore } from "@/store";
import { getMoodConfig } from "@/lib/utils";

type Step = "pick" | "note" | "insight";

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 20 }),
  center: { opacity: 1, x: 0 },
  exit:  (dir: number) => ({ opacity: 0, x: dir * -20 }),
};

export function MoodCheckIn() {
  const [step,    setStep]    = useState<Step>("pick");
  const [dir,     setDir]     = useState(1);
  const [mood,    setMood]    = useState<number | null>(null);
  const [note,    setNote]    = useState("");
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);
  const { setTodayMood } = useMoodStore();

  const moodConfig = mood ? getMoodConfig(mood as 1 | 2 | 3 | 4 | 5) : null;

  function goTo(next: Step, direction: number) {
    setDir(direction);
    setStep(next);
  }

  async function submit() {
    if (!mood) return;
    setLoading(true);
    try {
      const res  = await fetch("/api/mood", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ mood, note }),
      });
      const data = await res.json();
      setInsight(data.data?.aiInsight ?? "You're doing great! Keep going 🌟");
      setTodayMood(mood);
      goTo("insight", 1);
    } catch {
      setInsight("You're doing great! Keep going 🌟");
      setTodayMood(mood);
      goTo("insight", 1);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setDir(-1);
    setStep("pick");
    setMood(null);
    setNote("");
    setInsight("");
  }

  return (
    <Card gradient="calm" className="overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-calm-100 dark:bg-calm-900/30">
          <Heart className="h-4 w-4 text-calm-600 dark:text-calm-400" />
        </div>
        <div>
          <p className="text-sm font-bold text-ink dark:text-white">Mood Check-in</p>
          <p className="text-xs text-ink-subtle dark:text-slate-400">
            {step === "pick" ? "Step 1 of 2" : step === "note" ? "Step 2 of 2" : "Done!"}
          </p>
        </div>
      </div>

      {/* Step indicator */}
      {step !== "insight" && (
        <div className="flex gap-1.5 mb-5">
          {(["pick", "note"] as const).map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                step === s || (step === "note" && s === "pick")
                  ? "bg-calm-500"
                  : "bg-surface-border dark:bg-surface-dark-border"
              }`}
            />
          ))}
        </div>
      )}

      {/* Steps */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          {step === "pick" && (
            <motion.div
              key="pick"
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="space-y-4"
            >
              <div>
                <h3 className="text-base font-bold text-ink dark:text-white">How are you feeling? 💭</h3>
                <p className="text-xs text-ink-muted dark:text-slate-400 mt-0.5">
                  Take a moment to check in with yourself
                </p>
              </div>
              <MoodPicker value={mood ?? undefined} onChange={setMood} />
              <Button
                onClick={() => goTo("note", 1)}
                disabled={!mood}
                fullWidth
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Next
              </Button>
            </motion.div>
          )}

          {step === "note" && (
            <motion.div
              key="note"
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl leading-none">{moodConfig?.emoji}</span>
                <div>
                  <h3 className="text-base font-bold text-ink dark:text-white">
                    Feeling {moodConfig?.label}
                  </h3>
                  <p className="text-xs text-ink-muted dark:text-slate-400">
                    Want to share more? (optional)
                  </p>
                </div>
              </div>
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What's on your mind? You can write anything here..."
                className="min-h-[80px] text-sm"
                aria-label="Mood note"
              />
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => goTo("pick", -1)}
                  leftIcon={<ArrowLeft className="h-4 w-4" />}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={submit}
                  loading={loading}
                  className="flex-1"
                  leftIcon={!loading ? <Sparkles className="h-4 w-4" /> : undefined}
                >
                  Get insight
                </Button>
              </div>
            </motion.div>
          )}

          {step === "insight" && (
            <motion.div
              key="insight"
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="space-y-4 text-center"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                className="text-5xl leading-none"
              >
                {moodConfig?.emoji}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl p-4 text-sm font-medium text-ink dark:text-slate-200 leading-relaxed"
                style={{ backgroundColor: moodConfig?.bg }}
              >
                <Sparkles className="h-4 w-4 inline mr-1.5 text-brand-500" />
                {insight}
              </motion.div>

              <Button variant="calm" onClick={reset} fullWidth>
                Done ✨
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
