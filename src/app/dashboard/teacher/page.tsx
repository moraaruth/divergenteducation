"use client";
import { motion } from "framer-motion";
import { Users, BookOpen, Sparkles, MessageCircle, Plus, ArrowRight, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge, Avatar, AvatarFallback, Progress } from "@/components/ui";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item      = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } } };

const STUDENTS = [
  { id: "1", name: "Alex M.",  diagnosis: "ADHD",     mood: 4, progress: 78, focus: 85, alerts: 0 },
  { id: "2", name: "Jamie L.", diagnosis: "ASD",      mood: 3, progress: 62, focus: 70, alerts: 1 },
  { id: "3", name: "Sam K.",   diagnosis: "ASD+ADHD", mood: 5, progress: 91, focus: 92, alerts: 0 },
  { id: "4", name: "Riley P.", diagnosis: "ADHD",     mood: 2, progress: 45, focus: 55, alerts: 2 },
];

const MOOD_EMOJIS: Record<number, string> = { 1: "😰", 2: "😔", 3: "😐", 4: "😊", 5: "🤩" };

const STAT_CARDS = [
  { label: "Students",     value: "4",   icon: Users,         iconColor: "text-brand-500", iconBg: "bg-brand-50" },
  { label: "Avg Progress", value: "69%", icon: BookOpen,      iconColor: "text-calm-500",  iconBg: "bg-calm-50"  },
  { label: "AI Insights",  value: "12",  icon: Sparkles,      iconColor: "text-joy-500",   iconBg: "bg-joy-50"   },
  { label: "Messages",     value: "5",   icon: MessageCircle, iconColor: "text-warm-500",  iconBg: "bg-warm-50"  },
];

export default function TeacherDashboard() {
  const alertCount = STUDENTS.reduce((a, s) => a + s.alerts, 0);

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
              Classroom Overview 🏫
            </h1>
            <p className="mt-1 text-sm text-ink-muted dark:text-slate-400">
              Monday · {STUDENTS.length} students active today
            </p>
          </div>
          <div className="flex items-center gap-2">
            {alertCount > 0 && (
              <Button variant="danger" size="sm" leftIcon={<AlertCircle className="h-4 w-4" />}>
                {alertCount} Alert{alertCount > 1 ? "s" : ""}
              </Button>
            )}
            <Button size="sm" leftIcon={<Plus className="h-4 w-4" />}>
              New Lesson
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

            {/* Student roster */}
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>Student Roster</CardTitle>
                  <Link href="/dashboard/teacher/students">
                    <Button variant="ghost" size="xs" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                      View all
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="space-y-2">
                  {STUDENTS.map((student) => (
                    <motion.div
                      key={student.id}
                      whileHover={{ x: 3 }}
                      className="flex items-center gap-4 rounded-xl p-3 hover:bg-surface-subtle dark:hover:bg-surface-dark-subtle transition-colors cursor-pointer"
                    >
                      <Avatar size="md" ring>
                        <AvatarFallback>{student.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <p className="font-semibold text-ink dark:text-white">{student.name}</p>
                          <Badge variant="calm">{student.diagnosis}</Badge>
                          {student.alerts > 0 && (
                            <Badge variant="warning">
                              {student.alerts} alert{student.alerts > 1 ? "s" : ""}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm">{MOOD_EMOJIS[student.mood]}</span>
                          <div className="flex-1">
                            <Progress
                              value={student.progress}
                              size="xs"
                              color={
                                student.progress >= 80 ? "bg-calm-500"
                                : student.progress >= 60 ? "bg-brand-500"
                                : "bg-warm-500"
                              }
                            />
                          </div>
                          <span className="text-xs font-semibold tabular-nums text-ink-subtle dark:text-slate-400">
                            {student.progress}%
                          </span>
                        </div>
                      </div>
                      {/* Focus score — right-aligned, fixed width */}
                      <div className="w-14 shrink-0 text-right">
                        <p className="text-2xs text-ink-subtle dark:text-slate-500">Focus</p>
                        <p className={`text-sm font-bold tabular-nums ${
                          student.focus >= 80 ? "text-calm-500"
                          : student.focus >= 60 ? "text-brand-500"
                          : "text-warm-500"
                        }`}>
                          {student.focus}%
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Behavioral Insights */}
            <motion.div variants={item}>
              <Card gradient="calm">
                <CardHeader>
                  <CardTitle>AI Behavioral Insights ✨</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { student: "Riley P.", insight: "Mood dropped to 2/5 today. Consider a sensory break or 1:1 check-in.", severity: "warning" as const },
                    { student: "Jamie L.", insight: "Struggling with today's visual lesson. Try audio mode instead.",         severity: "default" as const },
                    { student: "Sam K.",   insight: "Exceptional focus today! Great candidate for peer mentoring.",           severity: "success" as const },
                  ].map(({ student, insight, severity }) => (
                    <div key={student} className="flex gap-3 rounded-xl bg-white/60 p-3 dark:bg-surface-dark-subtle/60">
                      <div className="mt-0.5 shrink-0">
                        {severity === "warning" ? (
                          <AlertCircle className="h-4 w-4 text-warm-500" />
                        ) : severity === "success" ? (
                          <CheckCircle className="h-4 w-4 text-calm-500" />
                        ) : (
                          <Sparkles className="h-4 w-4 text-brand-500" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-ink-muted dark:text-slate-300">{student}</p>
                        <p className="mt-0.5 text-sm text-ink dark:text-slate-200 leading-relaxed">{insight}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* ── Right (1/3) ── */}
          <div className="space-y-6">

            {/* Quick actions */}
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                {/* space-y-2 = 8px between action buttons */}
                <CardContent className="space-y-2">
                  {[
                    { label: "Assign Lesson",      icon: BookOpen,      variant: "primary"   as const },
                    { label: "Send Group Message",  icon: MessageCircle, variant: "secondary" as const },
                    { label: "View Therapy Notes",  icon: Sparkles,      variant: "secondary" as const },
                    { label: "Schedule Session",    icon: Users,         variant: "calm"      as const },
                  ].map(({ label, icon: Icon, variant }) => (
                    <Button
                      key={label}
                      variant={variant}
                      size="sm"
                      fullWidth
                      className="justify-start"
                      leftIcon={<Icon className="h-4 w-4" />}
                    >
                      {label}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Class mood */}
            <motion.div variants={item}>
              <Card gradient="warm">
                <CardHeader>
                  <CardTitle>Class Mood Today</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Equal-width columns for each student */}
                  <div className="grid grid-cols-4 gap-2 py-1">
                    {STUDENTS.map((s) => (
                      <div key={s.id} className="flex flex-col items-center gap-1">
                        <span className="text-2xl leading-none">{MOOD_EMOJIS[s.mood]}</span>
                        <span className="text-2xs font-medium text-ink-muted dark:text-slate-300 truncate w-full text-center">
                          {s.name.split(" ")[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-xl bg-white/60 p-3 dark:bg-surface-dark-subtle/60">
                    <p className="text-xs text-ink dark:text-slate-300 leading-relaxed">
                      <strong>AI Note:</strong> 1 student needs attention. Average class mood: 3.5/5
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
