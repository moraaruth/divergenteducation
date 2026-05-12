"use client";
import { motion } from "framer-motion";
import {
  TrendingUp, Users, MessageCircle, Calendar, Bell,
  ArrowRight, Heart, BookOpen, Clock,
} from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge, Avatar, AvatarFallback, AvatarImage, Progress } from "@/components/ui";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item      = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } } };

const MOOD_DATA = [
  { day: "Mon", mood: 3 }, { day: "Tue", mood: 4 }, { day: "Wed", mood: 2 },
  { day: "Thu", mood: 4 }, { day: "Fri", mood: 5 }, { day: "Sat", mood: 4 }, { day: "Sun", mood: 4 },
];

const CHILDREN = [
  { id: "1", name: "Alex",  age: 9,  avatar: "", mood: 4, streak: 7, xp: 1250, diagnosis: "ADHD", lastActive: "2h ago" },
  { id: "2", name: "Jamie", age: 12, avatar: "", mood: 3, streak: 3, xp: 890,  diagnosis: "ASD",  lastActive: "1d ago" },
];

const RECENT_ACTIVITY = [
  { child: "Alex",  action: "Completed 'Emotions & Feelings'", time: "2h ago", icon: "📚" },
  { child: "Alex",  action: "Mood check-in: Feeling Good 😊",  time: "3h ago", icon: "💛" },
  { child: "Jamie", action: "Started 'Morning Routine'",       time: "1d ago", icon: "🌅" },
  { child: "Jamie", action: "Earned 'Creative Star' badge",    time: "2d ago", icon: "🎨" },
];

const MOOD_EMOJIS: Record<number, string> = { 1: "😰", 2: "😔", 3: "😐", 4: "😊", 5: "🤩" };

const STAT_CARDS = [
  { label: "Children",      value: "2",   icon: Users,        iconColor: "text-brand-500", iconBg: "bg-brand-50" },
  { label: "Avg Mood",      value: "4/5", icon: Heart,        iconColor: "text-warm-500",  iconBg: "bg-warm-50"  },
  { label: "Lessons Today", value: "3",   icon: BookOpen,     iconColor: "text-calm-500",  iconBg: "bg-calm-50"  },
  { label: "Focus Mins",    value: "68",  icon: Clock,        iconColor: "text-joy-500",   iconBg: "bg-joy-50"   },
];

export default function ParentDashboard() {
  return (
    <DashboardLayout>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-screen-xl space-y-6"
      >

        {/* ── Page header ── */}
        <motion.div variants={item} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-ink dark:text-white sm:text-3xl">
              Family Overview 👨‍👩‍👧
            </h1>
            <p className="mt-1 text-sm text-ink-muted dark:text-slate-400">
              Here&apos;s how your children are doing today
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" leftIcon={<Bell className="h-4 w-4" />}>
              Alerts
            </Button>
            <Button size="sm" leftIcon={<MessageCircle className="h-4 w-4" />}>
              Message Teacher
            </Button>
          </div>
        </motion.div>

        {/* ── KPI row ── */}
        <motion.div variants={item} className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STAT_CARDS.map(({ label, value, icon: Icon, iconColor, iconBg }) => (
            <Card key={label} hover padding="md" className="group">
              <div className={`mb-4 flex h-9 w-9 items-center justify-center rounded-xl ${iconBg} transition-transform duration-200 group-hover:scale-110`}>
                <Icon className={`h-[18px] w-[18px] ${iconColor}`} />
              </div>
              <p className="text-xl font-extrabold tracking-tight text-ink dark:text-white">{value}</p>
              <p className="mt-1 text-xs font-medium text-ink-subtle dark:text-slate-400">{label}</p>
            </Card>
          ))}
        </motion.div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* ── Left (2/3) ── */}
          <div className="space-y-6 lg:col-span-2">

            {/* Children list */}
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>My Children</CardTitle>
                  <Button variant="ghost" size="xs" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                    Manage
                  </Button>
                </CardHeader>
                <CardContent className="space-y-2">
                  {CHILDREN.map((child) => (
                    <Link key={child.id} href={`/dashboard/parent/children/${child.id}`}>
                      <motion.div
                        whileHover={{ x: 3 }}
                        className="flex items-center gap-4 rounded-xl p-3 hover:bg-surface-subtle dark:hover:bg-surface-dark-subtle transition-colors cursor-pointer"
                      >
                        <Avatar size="lg" ring>
                          <AvatarImage src={child.avatar} />
                          <AvatarFallback>{child.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-bold text-ink dark:text-white">{child.name}</p>
                            <Badge variant="calm">{child.diagnosis}</Badge>
                          </div>
                          <p className="text-xs text-ink-subtle dark:text-slate-400">
                            Age {child.age} · Last active {child.lastActive}
                          </p>
                          <div className="mt-2 flex items-center gap-3">
                            <span className="text-sm">{MOOD_EMOJIS[child.mood]}</span>
                            <div className="flex-1">
                              <Progress value={(child.xp / 2000) * 100} size="xs" color="bg-brand-500" />
                            </div>
                            <span className="text-xs font-bold text-joy-600 dark:text-joy-400 tabular-nums">
                              {child.xp} XP
                            </span>
                          </div>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-lg leading-none">🔥</p>
                          <p className="mt-0.5 text-xs font-bold text-warm-500">{child.streak}d</p>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Mood chart */}
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>Alex&apos;s Mood This Week</CardTitle>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-calm-600 dark:text-calm-400">
                    <TrendingUp className="h-4 w-4" /> Improving
                  </div>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={MOOD_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -16 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis
                        dataKey="day"
                        tick={{ fontSize: 11, fill: "#94a3b8" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        domain={[1, 5]}
                        ticks={[1, 2, 3, 4, 5]}
                        tick={{ fontSize: 11, fill: "#94a3b8" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", fontSize: "12px" }}
                        formatter={(v: unknown) => {
                          const n = Number(v);
                          return [["😰", "😔", "😐", "😊", "🤩"][n - 1] ?? "", "Mood"] as [string, string];
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="mood"
                        stroke="#6366f1"
                        strokeWidth={2.5}
                        dot={{ fill: "#6366f1", r: 4, strokeWidth: 0 }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent activity */}
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                {/* space-y-3 = 12px between activity rows */}
                <CardContent className="space-y-3">
                  {RECENT_ACTIVITY.map((act, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface-subtle text-base dark:bg-surface-dark-subtle">
                        {act.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-ink dark:text-slate-200">{act.child}</p>
                        <p className="text-xs text-ink-muted dark:text-slate-400 truncate">{act.action}</p>
                      </div>
                      <span className="shrink-0 text-xs text-ink-subtle dark:text-slate-500">{act.time}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* ── Right (1/3) ── */}
          <div className="space-y-6">

            {/* AI Insights */}
            <motion.div variants={item}>
              <Card gradient="calm">
                <CardHeader>
                  <CardTitle>AI Insights ✨</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { icon: "💡", text: "Alex focuses best between 9–11am. Schedule learning then." },
                    { icon: "🌿", text: "Jamie had 3 calm moments this week — great progress!" },
                    { icon: "📈", text: "Both children improved mood scores by 15% this week." },
                  ].map(({ icon, text }, i) => (
                    <div key={i} className="flex gap-3 rounded-xl bg-white/60 p-3 dark:bg-surface-dark-subtle/60">
                      <span className="shrink-0 text-lg leading-none">{icon}</span>
                      <p className="text-sm text-ink dark:text-slate-200 leading-relaxed">{text}</p>
                    </div>
                  ))}
                  <Button variant="calm" size="sm" fullWidth rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                    Full Report
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Upcoming */}
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming 📅</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { title: "Therapy Session — Alex", date: "Tomorrow, 10am", iconBg: "bg-brand-100 text-brand-600" },
                    { title: "Parent-Teacher Meeting", date: "Fri, 3pm",       iconBg: "bg-calm-100 text-calm-600"  },
                    { title: "Jamie's IEP Review",     date: "Next Mon, 2pm",  iconBg: "bg-warm-100 text-warm-600"  },
                  ].map(({ title, date, iconBg }) => (
                    <div key={title} className="flex items-center gap-3">
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-ink dark:text-slate-200 truncate">{title}</p>
                        <p className="text-xs text-ink-subtle dark:text-slate-400">{date}</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="secondary" size="sm" fullWidth>
                    Schedule Appointment
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Message team */}
            <motion.div variants={item}>
              <Card gradient="warm">
                <CardHeader>
                  <CardTitle>Message Team 💬</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {["Alex's Teacher — Ms. Chen", "Therapist — Dr. Patel"].map((contact) => (
                    <button
                      key={contact}
                      className="flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition-colors hover:bg-white/60 dark:hover:bg-surface-dark-subtle/60"
                    >
                      <Avatar size="sm">
                        <AvatarFallback>{contact[0]}</AvatarFallback>
                      </Avatar>
                      <span className="flex-1 truncate text-sm font-medium text-ink dark:text-slate-200">
                        {contact}
                      </span>
                      <MessageCircle className="h-4 w-4 shrink-0 text-ink-subtle" />
                    </button>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
