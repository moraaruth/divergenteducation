"use client";
import { motion } from "framer-motion";
import {
  BookOpen, Palette, Heart, Zap, Star, Trophy, Target, Clock,
  Play, ArrowRight, Flame, Brain,
} from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge, Progress } from "@/components/ui";
import { XPBar, StreakBadge, LevelBadge } from "@/components/ui/XPBar";
import { MoodCheckIn } from "@/components/ai/MoodCheckIn";
import { AICompanion } from "@/components/ai/AICompanion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const QUICK_ACTIONS = [
  { href: "/dashboard/child/learn",     icon: BookOpen, label: "Learn",    color: "bg-brand-100 text-brand-600",  emoji: "📚" },
  { href: "/dashboard/child/create",    icon: Palette,  label: "Create",   color: "bg-warm-100 text-warm-600",    emoji: "🎨" },
  { href: "/dashboard/child/wellbeing", icon: Heart,    label: "Calm",     color: "bg-calm-100 text-calm-600",    emoji: "🌿" },
  { href: "/dashboard/child/ai-coach",  icon: Brain,    label: "AI Coach", color: "bg-joy-100 text-joy-600",      emoji: "🤖" },
];

const TODAYS_LESSONS = [
  { id: "1", title: "Emotions & Feelings",  type: "emotional_iq", duration: 8,  xp: 50,  progress: 0,   emoji: "💛" },
  { id: "2", title: "Counting with Stars",  type: "stem",         duration: 10, xp: 75,  progress: 60,  emoji: "⭐" },
  { id: "3", title: "My Morning Routine",   type: "life_skills",  duration: 5,  xp: 40,  progress: 100, emoji: "🌅" },
];

const ACHIEVEMENTS = [
  { icon: "🔥", title: "7-Day Streak",    unlocked: true  },
  { icon: "📚", title: "First Lesson",    unlocked: true  },
  { icon: "🎨", title: "Creative Star",   unlocked: true  },
  { icon: "🧘", title: "Calm Champion",   unlocked: false },
  { icon: "🏆", title: "Level 5",         unlocked: false },
  { icon: "💬", title: "Social Butterfly",unlocked: false },
];

export default function ChildDashboard() {
  // In production, fetch from API with React Query
  const mockUser = { name: "Alex", stats: { totalXp: 1250, level: 4, streak: 7, focusMinutes: 42 } };

  return (
    <DashboardLayout>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto space-y-6"
      >
        {/* Hero greeting */}
        <motion.div variants={item} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white">
              Hey {mockUser.name}! 👋
            </h1>
            <p className="text-slate-500 mt-1">Ready for an amazing day of learning?</p>
          </div>
          <div className="flex items-center gap-3">
            <StreakBadge streak={mockUser.stats.streak} />
            <LevelBadge level={mockUser.stats.level} size="lg" />
          </div>
        </motion.div>

        {/* XP Bar */}
        <motion.div variants={item}>
          <XPBar xp={mockUser.stats.totalXp} />
        </motion.div>

        {/* Stats row */}
        <motion.div variants={item} className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { icon: Zap,    label: "Focus Score",  value: "87%",  color: "text-brand-500",  bg: "bg-brand-50" },
            { icon: Flame,  label: "Day Streak",   value: "7",    color: "text-warm-500",   bg: "bg-warm-50"  },
            { icon: Star,   label: "Total XP",     value: "1.2k", color: "text-joy-500",    bg: "bg-joy-50"   },
            { icon: Clock,  label: "Focus Mins",   value: "42",   color: "text-calm-500",   bg: "bg-calm-50"  },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <Card key={label} hover className="text-center py-4">
              <div className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl ${bg}`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <p className="text-2xl font-extrabold text-slate-800 dark:text-white">{value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{label}</p>
            </Card>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick actions */}
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>What do you want to do? 🚀</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {QUICK_ACTIONS.map(({ href, icon: Icon, label, color, emoji }) => (
                      <Link key={href} href={href}>
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="flex flex-col items-center gap-2 rounded-2xl border-2 border-transparent p-4 text-center hover:border-brand-100 hover:bg-brand-50/50 transition-all cursor-pointer dark:hover:bg-brand-900/20"
                        >
                          <span className="text-3xl">{emoji}</span>
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{label}</span>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Today's lessons */}
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>Today&apos;s Adventures 📖</CardTitle>
                  <Link href="/dashboard/child/learn">
                    <Button variant="ghost" size="sm">See all <ArrowRight className="h-3.5 w-3.5" /></Button>
                  </Link>
                </CardHeader>
                <CardContent className="space-y-3">
                  {TODAYS_LESSONS.map((lesson) => (
                    <motion.div
                      key={lesson.id}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-4 rounded-xl p-3 hover:bg-surface-subtle dark:hover:bg-surface-dark-muted transition-colors cursor-pointer"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface-subtle text-2xl dark:bg-surface-dark-subtle">
                        {lesson.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-800 dark:text-white truncate">{lesson.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-slate-500">{lesson.duration} min</span>
                          <span className="text-xs text-joy-500 font-semibold">+{lesson.xp} XP</span>
                        </div>
                        {lesson.progress > 0 && (
                          <Progress value={lesson.progress} className="mt-1.5 h-1.5" color={lesson.progress === 100 ? "bg-calm-500" : "bg-brand-500"} />
                        )}
                      </div>
                      <div>
                        {lesson.progress === 100 ? (
                          <Badge variant="success">Done ✓</Badge>
                        ) : (
                          <Button size="sm" variant={lesson.progress > 0 ? "secondary" : "primary"}>
                            <Play className="h-3.5 w-3.5" />
                            {lesson.progress > 0 ? "Continue" : "Start"}
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Focus meter */}
            <motion.div variants={item}>
              <Card gradient="brand">
                <CardHeader>
                  <CardTitle>Focus Meter 🎯</CardTitle>
                  <Badge variant="calm">Great today!</Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { label: "Attention",  value: 87, color: "bg-brand-500" },
                    { label: "Energy",     value: 72, color: "bg-warm-500"  },
                    { label: "Calm",       value: 91, color: "bg-calm-500"  },
                  ].map(({ label, value, color }) => (
                    <div key={label}>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-slate-700 dark:text-slate-200">{label}</span>
                        <span className="text-slate-500">{value}%</span>
                      </div>
                      <Progress value={value} color={color} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Mood check-in */}
            <motion.div variants={item}>
              <MoodCheckIn />
            </motion.div>

            {/* Achievements */}
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>Achievements 🏆</CardTitle>
                  <Link href="/dashboard/child/rewards">
                    <Button variant="ghost" size="sm">All <ArrowRight className="h-3.5 w-3.5" /></Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {ACHIEVEMENTS.map(({ icon, title, unlocked }) => (
                      <motion.div
                        key={title}
                        whileHover={{ scale: 1.05 }}
                        title={title}
                        className={`flex flex-col items-center gap-1 rounded-xl p-2 text-center transition-all ${
                          unlocked
                            ? "bg-joy-50 dark:bg-joy-900/20"
                            : "bg-surface-subtle opacity-40 grayscale dark:bg-surface-dark-subtle"
                        }`}
                      >
                        <span className="text-2xl">{icon}</span>
                        <span className="text-2xs font-medium text-slate-600 dark:text-slate-300 leading-tight">{title}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Daily goal */}
            <motion.div variants={item}>
              <Card gradient="warm">
                <CardHeader>
                  <CardTitle>Daily Goal 🎯</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-center">
                    <div className="relative mx-auto h-24 w-24">
                      <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                        <circle
                          cx="50" cy="50" r="40" fill="none"
                          stroke="#6366f1" strokeWidth="8"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.65)}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-extrabold text-slate-800 dark:text-white">65%</span>
                        <span className="text-2xs text-slate-500">done</span>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mt-2">
                      Complete 2 more lessons to hit your goal!
                    </p>
                  </div>
                  <Button variant="warm" size="sm" className="w-full">
                    <Target className="h-4 w-4" /> Keep going!
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <AICompanion />
    </DashboardLayout>
  );
}
