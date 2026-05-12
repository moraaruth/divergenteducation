"use client";
import { motion } from "framer-motion";
import {
  TrendingUp, TrendingDown, Minus, Users, MessageCircle,
  Calendar, Bell, ArrowRight, Heart, BookOpen, Clock,
} from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge, Avatar, AvatarFallback, AvatarImage, Progress } from "@/components/ui";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const MOOD_DATA = [
  { day: "Mon", mood: 3 }, { day: "Tue", mood: 4 }, { day: "Wed", mood: 2 },
  { day: "Thu", mood: 4 }, { day: "Fri", mood: 5 }, { day: "Sat", mood: 4 }, { day: "Sun", mood: 4 },
];

const CHILDREN = [
  { id: "1", name: "Alex",  age: 9,  avatar: "", mood: 4, streak: 7,  xp: 1250, diagnosis: "ADHD",     lastActive: "2h ago" },
  { id: "2", name: "Jamie", age: 12, avatar: "", mood: 3, streak: 3,  xp: 890,  diagnosis: "ASD",      lastActive: "1d ago" },
];

const RECENT_ACTIVITY = [
  { child: "Alex",  action: "Completed 'Emotions & Feelings'",  time: "2h ago",  icon: "📚", type: "lesson"   },
  { child: "Alex",  action: "Mood check-in: Feeling Good 😊",   time: "3h ago",  icon: "💛", type: "mood"     },
  { child: "Jamie", action: "Started 'Morning Routine'",        time: "1d ago",  icon: "🌅", type: "routine"  },
  { child: "Jamie", action: "Earned 'Creative Star' badge",     time: "2d ago",  icon: "🎨", type: "achievement" },
];

const MOOD_EMOJIS: Record<number, string> = { 1: "😰", 2: "😔", 3: "😐", 4: "😊", 5: "🤩" };

export default function ParentDashboard() {
  return (
    <DashboardLayout>
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <motion.div variants={item} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white">Family Overview 👨‍👩‍👧</h1>
            <p className="text-slate-500 mt-1">Here&apos;s how your children are doing today</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              <Bell className="h-4 w-4" /> Alerts
            </Button>
            <Button size="sm">
              <MessageCircle className="h-4 w-4" /> Message Teacher
            </Button>
          </div>
        </motion.div>

        {/* Summary stats */}
        <motion.div variants={item} className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Children",       value: "2",    icon: Users,         color: "text-brand-500",  bg: "bg-brand-50"  },
            { label: "Avg Mood",       value: "4/5",  icon: Heart,         color: "text-warm-500",   bg: "bg-warm-50"   },
            { label: "Lessons Today",  value: "3",    icon: BookOpen,      color: "text-calm-500",   bg: "bg-calm-50"   },
            { label: "Focus Mins",     value: "68",   icon: Clock,         color: "text-joy-500",    bg: "bg-joy-50"    },
          ].map(({ label, value, icon: Icon, color, bg }) => (
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
          {/* Left: Children cards + activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Children */}
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>My Children</CardTitle>
                  <Button variant="ghost" size="sm">Manage <ArrowRight className="h-3.5 w-3.5" /></Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {CHILDREN.map((child) => (
                    <Link key={child.id} href={`/dashboard/parent/children/${child.id}`}>
                      <motion.div
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-4 rounded-xl p-3 hover:bg-surface-subtle dark:hover:bg-surface-dark-muted transition-colors cursor-pointer"
                      >
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={child.avatar} />
                          <AvatarFallback>{child.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-slate-800 dark:text-white">{child.name}</p>
                            <Badge variant="calm">{child.diagnosis}</Badge>
                          </div>
                          <p className="text-xs text-slate-500">Age {child.age} · Last active {child.lastActive}</p>
                          <div className="flex items-center gap-3 mt-1.5">
                            <span className="text-sm">{MOOD_EMOJIS[child.mood]}</span>
                            <div className="flex-1">
                              <Progress value={(child.xp / 2000) * 100} color="bg-brand-500" className="h-1.5" />
                            </div>
                            <span className="text-xs font-semibold text-joy-500">{child.xp} XP</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg">🔥</p>
                          <p className="text-xs font-bold text-warm-500">{child.streak}d</p>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Mood trend chart */}
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>Alex&apos;s Mood This Week</CardTitle>
                  <div className="flex items-center gap-1.5 text-sm text-green-600 font-semibold">
                    <TrendingUp className="h-4 w-4" /> Improving
                  </div>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={MOOD_DATA}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                      <YAxis domain={[1, 5]} ticks={[1,2,3,4,5]} tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
                        formatter={(v: unknown) => {
                          const n = Number(v);
                          return [["😰","😔","😐","😊","🤩"][n - 1] ?? "", "Mood"] as [string, string];
                        }}
                      />
                      <Line type="monotone" dataKey="mood" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: "#6366f1", r: 4 }} />
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
                <CardContent className="space-y-3">
                  {RECENT_ACTIVITY.map((act, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface-subtle text-lg dark:bg-surface-dark-subtle">
                        {act.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{act.child}</p>
                        <p className="text-xs text-slate-500 truncate">{act.action}</p>
                      </div>
                      <span className="text-xs text-slate-400 shrink-0">{act.time}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right column */}
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
                    { icon: "📈", text: "Both children improved their mood scores by 15% this week." },
                  ].map(({ icon, text }, i) => (
                    <div key={i} className="flex gap-3 rounded-xl bg-white/60 p-3 dark:bg-surface-dark-muted/60">
                      <span className="text-xl shrink-0">{icon}</span>
                      <p className="text-sm text-slate-700 dark:text-slate-200">{text}</p>
                    </div>
                  ))}
                  <Button variant="calm" size="sm" className="w-full">
                    Full Report <ArrowRight className="h-3.5 w-3.5" />
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
                    { title: "Therapy Session — Alex",  date: "Tomorrow, 10am",  color: "bg-brand-100 text-brand-600" },
                    { title: "Parent-Teacher Meeting",  date: "Fri, 3pm",        color: "bg-calm-100 text-calm-600"  },
                    { title: "Jamie's IEP Review",      date: "Next Mon, 2pm",   color: "bg-warm-100 text-warm-600"  },
                  ].map(({ title, date, color }) => (
                    <div key={title} className="flex items-center gap-3">
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${color}`}>
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{title}</p>
                        <p className="text-xs text-slate-500">{date}</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="secondary" size="sm" className="w-full">
                    Schedule Appointment
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick message */}
            <motion.div variants={item}>
              <Card gradient="warm">
                <CardHeader>
                  <CardTitle>Message Team 💬</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {["Alex's Teacher — Ms. Chen", "Therapist — Dr. Patel"].map((contact) => (
                    <button
                      key={contact}
                      className="flex w-full items-center gap-3 rounded-xl p-2.5 hover:bg-white/60 transition-colors text-left"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{contact[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{contact}</span>
                      <MessageCircle className="h-4 w-4 text-slate-400 ml-auto shrink-0" />
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
