"use client";
import { motion } from "framer-motion";
import {
  BookOpen, Palette, Heart, Zap, Star, Target, Clock, Play,
  ArrowRight, Flame, Brain, CheckCircle2, Lock,
} from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge, Progress } from "@/components/ui";
import { XPRing, StreakBadge } from "@/components/ui/XPBar";
import { MoodCheckIn } from "@/components/ai/MoodCheckIn";
import { AICompanion } from "@/components/ai/AICompanion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

// ─── Animation ────────────────────────────────────────────────────────────────

const container = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
};

// ─── Static data ──────────────────────────────────────────────────────────────

const QUICK_ACTIONS = [
  { href: "/dashboard/child/learn",     label: "Learn",    emoji: "📚", bg: "bg-brand-50",  border: "border-brand-100", text: "text-brand-700" },
  { href: "/dashboard/child/create",    label: "Create",   emoji: "🎨", bg: "bg-warm-50",   border: "border-warm-100",  text: "text-warm-700"  },
  { href: "/dashboard/child/wellbeing", label: "Calm",     emoji: "🌿", bg: "bg-calm-50",   border: "border-calm-100",  text: "text-calm-700"  },
  { href: "/dashboard/child/ai-coach",  label: "AI Coach", emoji: "🤖", bg: "bg-joy-50",    border: "border-joy-100",   text: "text-joy-700"   },
];

const TODAYS_LESSONS = [
  { id: "1", title: "Emotions & Feelings", type: "Emotional IQ", duration: 8,  xp: 50,  progress: 0,   emoji: "💛", iconBg: "bg-joy-100"   },
  { id: "2", title: "Counting with Stars", type: "STEM",         duration: 10, xp: 75,  progress: 60,  emoji: "⭐", iconBg: "bg-brand-100" },
  { id: "3", title: "My Morning Routine",  type: "Life Skills",  duration: 5,  xp: 40,  progress: 100, emoji: "🌅", iconBg: "bg-calm-100"  },
];

const ACHIEVEMENTS = [
  { icon: "🔥", title: "7-Day Streak",  unlocked: true  },
  { icon: "📚", title: "First Lesson",  unlocked: true  },
  { icon: "🎨", title: "Creative Star", unlocked: true  },
  { icon: "🧘", title: "Calm Champ",    unlocked: false },
  { icon: "🏆", title: "Level 5",       unlocked: false },
  { icon: "💬", title: "Social Star",   unlocked: false },
];

const FOCUS_METRICS = [
  { label: "Attention", value: 87, bar: "bg-brand-500", track: "bg-brand-100" },
  { label: "Energy",    value: 72, bar: "bg-warm-400",  track: "bg-warm-100"  },
  { label: "Calm",      value: 91, bar: "bg-calm-500",  track: "bg-calm-100"  },
];

const STAT_CARDS = [
  { icon: Zap,   label: "Focus Score", value: "87%",  iconColor: "text-brand-500", iconBg: "bg-brand-50", change: "+5%"   },
  { icon: Flame, label: "Day Streak",  value: "7",    iconColor: "text-warm-500",  iconBg: "bg-warm-50",  change: "🔥"    },
  { icon: Star,  label: "Total XP",    value: "1.2k", iconColor: "text-joy-500",   iconBg: "bg-joy-50",   change: "+75"   },
  { icon: Clock, label: "Focus Mins",  value: "42",   iconColor: "text-calm-500",  iconBg: "bg-calm-50",  change: "today" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function QuickActionCard({ href, label, emoji, bg, border, text }: typeof QUICK_ACTIONS[0]) {
  return (
    <Link href={href} className="block">
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`flex flex-col items-center gap-2 rounded-2xl border-2 ${border} ${bg} p-4 text-center cursor-pointer transition-shadow duration-200 hover:shadow-md`}
      >
        <span className="text-3xl leading-none" role="img" aria-label={label}>{emoji}</span>
        <span className={`text-sm font-bold ${text}`}>{label}</span>
      </motion.div>
    </Link>
  );
}

function LessonRow({ lesson }: { lesson: typeof TODAYS_LESSONS[0] }) {
  const done    = lesson.progress === 100;
  const started = lesson.progress > 0 && !done;

  return (
    <motion.div
      whileHover={{ x: 2 }}
      className="group flex items-center gap-4 rounded-xl p-3 hover:bg-surface-subtle dark:hover:bg-surface-dark-subtle transition-colors duration-150 cursor-pointer"
    >
      {/* Icon — fixed 48×48 */}
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${lesson.iconBg} text-2xl`}>
        {lesson.emoji}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="text-sm font-bold text-ink dark:text-white truncate">{lesson.title}</p>
          {done && <CheckCircle2 className="h-4 w-4 text-calm-500 shrink-0" />}
        </div>
        <div className="flex items-center gap-2 text-xs text-ink-subtle dark:text-slate-400">
          <span>{lesson.type}</span>
          <span aria-hidden>·</span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{lesson.duration}m</span>
          <span className="font-bold text-joy-600 dark:text-joy-400">+{lesson.xp} XP</span>
        </div>
        {lesson.progress > 0 && (
          <div className="mt-2">
            <Progress value={lesson.progress} size="xs" color={done ? "bg-calm-500" : "bg-brand-500"} />
          </div>
        )}
      </div>

      {/* Action — right-aligned, fixed width */}
      <div className="shrink-0 w-20 flex justify-end">
        {done ? (
          <Badge variant="success" size="sm">Done ✓</Badge>
        ) : (
          <Button
            size="xs"
            variant={started ? "secondary" : "primary"}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            leftIcon={<Play className="h-3 w-3" />}
          >
            {started ? "Continue" : "Start"}
          </Button>
        )}
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ChildDashboard() {
  const mockUser = { name: "Alex", stats: { totalXp: 1250, level: 4, streak: 7, focusMinutes: 42 } };

  return (
    <DashboardLayout>
      {/*
        Layout contract:
        - max-w-screen-xl keeps content from stretching on ultra-wide
        - space-y-6 = 24px vertical rhythm throughout (3 × 8pt)
        - All grids use gap-4 (16px) for cards, gap-6 (24px) for sections
      */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-screen-xl space-y-6"
      >

        {/* ── Page header ── */}
        <motion.div
          variants={item}
          className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-ink dark:text-white sm:text-3xl">
              Hey {mockUser.name}! 👋
            </h1>
            <p className="mt-1 text-sm text-ink-muted dark:text-slate-400">
              You&apos;re on a roll — keep that streak going! 🌟
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StreakBadge streak={mockUser.stats.streak} animated />
            <XPRing xp={mockUser.stats.totalXp} size={72} />
          </div>
        </motion.div>

        {/* ── KPI stat row — 2-col mobile, 4-col sm+ ── */}
        <motion.div variants={item} className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STAT_CARDS.map(({ icon: Icon, label, value, iconColor, iconBg, change }) => (
            <Card key={label} hover padding="md" className="group">
              {/* Icon */}
              <div className={`mb-4 flex h-9 w-9 items-center justify-center rounded-xl ${iconBg} transition-transform duration-200 group-hover:scale-110`}>
                <Icon className={`h-[18px] w-[18px] ${iconColor}`} />
              </div>
              {/* Value */}
              <p className="text-xl font-extrabold tracking-tight text-ink dark:text-white">{value}</p>
              {/* Label */}
              <p className="mt-1 text-xs font-medium text-ink-subtle dark:text-slate-400">{label}</p>
              {/* Change */}
              <p className="mt-0.5 text-2xs text-ink-faint dark:text-slate-500">{change}</p>
            </Card>
          ))}
        </motion.div>

        {/* ── Main 2-col grid: left 2/3, right 1/3 ── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* ── Left column ── */}
          <div className="space-y-6 lg:col-span-2">

            {/* Quick actions */}
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>What do you want to do? 🚀</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* 2-col mobile, 4-col sm+ — gap-4 = 16px */}
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {QUICK_ACTIONS.map((action) => (
                      <QuickActionCard key={action.href} {...action} />
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
                    <Button variant="ghost" size="xs" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                      See all
                    </Button>
                  </Link>
                </CardHeader>
                {/* space-y-1 = 4px between rows — tight list rhythm */}
                <CardContent className="space-y-1">
                  {TODAYS_LESSONS.map((lesson) => (
                    <LessonRow key={lesson.id} lesson={lesson} />
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Focus meter */}
            <motion.div variants={item}>
              <Card gradient="brand">
                <CardHeader>
                  <div>
                    <CardTitle>Focus Meter 🎯</CardTitle>
                    <p className="mt-0.5 text-xs text-ink-muted dark:text-slate-400">How you&apos;re doing right now</p>
                  </div>
                  <Badge variant="success" dot>Great today!</Badge>
                </CardHeader>
                {/* space-y-4 = 16px between metric rows */}
                <CardContent className="space-y-4">
                  {FOCUS_METRICS.map(({ label, value, bar, track }) => (
                    <div key={label}>
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-sm font-semibold text-ink dark:text-slate-200">{label}</span>
                        <span className="text-sm font-bold tabular-nums text-ink-muted dark:text-slate-400">{value}%</span>
                      </div>
                      <div className={`h-2 w-full overflow-hidden rounded-full ${track} dark:bg-surface-dark-subtle`}>
                        <motion.div
                          className={`h-full rounded-full ${bar}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${value}%` }}
                          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* ── Right column ── */}
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
                    <Button variant="ghost" size="xs" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                      All
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  {/* 3-col grid, gap-2 = 8px — tight badge grid */}
                  <div className="grid grid-cols-3 gap-2">
                    {ACHIEVEMENTS.map(({ icon, title, unlocked }) => (
                      <motion.div
                        key={title}
                        whileHover={unlocked ? { scale: 1.05, y: -2 } : undefined}
                        title={title}
                        className={`relative flex flex-col items-center gap-1.5 rounded-xl p-2.5 text-center transition-all duration-150 ${
                          unlocked
                            ? "bg-gradient-to-br from-joy-50 to-warm-50 dark:from-joy-900/20 dark:to-warm-900/20 cursor-pointer"
                            : "bg-surface-subtle dark:bg-surface-dark-subtle opacity-50"
                        }`}
                      >
                        <span className={`text-2xl leading-none ${!unlocked && "grayscale"}`}>{icon}</span>
                        <span className="text-2xs font-semibold leading-tight text-ink-muted dark:text-slate-400">{title}</span>
                        {!unlocked && (
                          <Lock className="absolute right-1.5 top-1.5 h-2.5 w-2.5 text-ink-faint" />
                        )}
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
                  <Badge variant="warm" size="sm">65%</Badge>
                </CardHeader>
                <CardContent>
                  {/* Horizontal layout: ring left, text right — gap-4 = 16px */}
                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-20 shrink-0">
                      <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80" aria-hidden="true">
                        <circle cx="40" cy="40" r="32" fill="none" stroke="#fed7aa" strokeWidth="6" />
                        <motion.circle
                          cx="40" cy="40" r="32" fill="none"
                          stroke="#f97316" strokeWidth="6"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 32}`}
                          initial={{ strokeDashoffset: `${2 * Math.PI * 32}` }}
                          animate={{ strokeDashoffset: `${2 * Math.PI * 32 * (1 - 0.65)}` }}
                          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-base font-extrabold text-ink dark:text-white">65%</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold leading-snug text-ink dark:text-slate-200">
                        2 more lessons to hit your goal!
                      </p>
                      <p className="mt-1 text-xs text-ink-subtle dark:text-slate-400">3 of 5 completed today</p>
                      <Button
                        variant="warm"
                        size="xs"
                        className="mt-3"
                        leftIcon={<Target className="h-3.5 w-3.5" />}
                      >
                        Keep going!
                      </Button>
                    </div>
                  </div>
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
