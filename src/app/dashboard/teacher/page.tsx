"use client";
import { motion } from "framer-motion";
import { Users, BookOpen, Sparkles, MessageCircle, Plus, ArrowRight, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge, Avatar, AvatarFallback, Progress } from "@/components/ui";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const STUDENTS = [
  { id: "1", name: "Alex M.",   diagnosis: "ADHD",     mood: 4, progress: 78, focus: 85, alerts: 0  },
  { id: "2", name: "Jamie L.",  diagnosis: "ASD",      mood: 3, progress: 62, focus: 70, alerts: 1  },
  { id: "3", name: "Sam K.",    diagnosis: "ASD+ADHD", mood: 5, progress: 91, focus: 92, alerts: 0  },
  { id: "4", name: "Riley P.",  diagnosis: "ADHD",     mood: 2, progress: 45, focus: 55, alerts: 2  },
];

const MOOD_EMOJIS: Record<number, string> = { 1: "😰", 2: "😔", 3: "😐", 4: "😊", 5: "🤩" };

export default function TeacherDashboard() {
  const alertCount = STUDENTS.reduce((a, s) => a + s.alerts, 0);

  return (
    <DashboardLayout>
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <motion.div variants={item} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white">Classroom Overview 🏫</h1>
            <p className="text-slate-500 mt-1">Monday, 4 students active today</p>
          </div>
          <div className="flex gap-2">
            {alertCount > 0 && (
              <Button variant="danger" size="sm">
                <AlertCircle className="h-4 w-4" /> {alertCount} Alerts
              </Button>
            )}
            <Button size="sm">
              <Plus className="h-4 w-4" /> New Lesson
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={item} className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Students",      value: "4",   icon: Users,         color: "text-brand-500", bg: "bg-brand-50" },
            { label: "Avg Progress",  value: "69%", icon: BookOpen,      color: "text-calm-500",  bg: "bg-calm-50"  },
            { label: "AI Insights",   value: "12",  icon: Sparkles,      color: "text-joy-500",   bg: "bg-joy-50"   },
            { label: "Messages",      value: "5",   icon: MessageCircle, color: "text-warm-500",  bg: "bg-warm-50"  },
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
          <div className="lg:col-span-2 space-y-6">
            {/* Student roster */}
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>Student Roster</CardTitle>
                  <Link href="/dashboard/teacher/students">
                    <Button variant="ghost" size="sm">View all <ArrowRight className="h-3.5 w-3.5" /></Button>
                  </Link>
                </CardHeader>
                <CardContent className="space-y-3">
                  {STUDENTS.map((student) => (
                    <motion.div
                      key={student.id}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-4 rounded-xl p-3 hover:bg-surface-subtle dark:hover:bg-surface-dark-muted transition-colors cursor-pointer"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{student.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-slate-800 dark:text-white">{student.name}</p>
                          <Badge variant="calm">{student.diagnosis}</Badge>
                          {student.alerts > 0 && (
                            <Badge variant="warning">{student.alerts} alert{student.alerts > 1 ? "s" : ""}</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm">{MOOD_EMOJIS[student.mood]}</span>
                          <div className="flex-1">
                            <Progress
                              value={student.progress}
                              color={student.progress >= 80 ? "bg-calm-500" : student.progress >= 60 ? "bg-brand-500" : "bg-warm-500"}
                              className="h-1.5"
                            />
                          </div>
                          <span className="text-xs font-semibold text-slate-500">{student.progress}%</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500">Focus</p>
                        <p className={`text-sm font-bold ${student.focus >= 80 ? "text-calm-500" : student.focus >= 60 ? "text-brand-500" : "text-warm-500"}`}>
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
                    { student: "Jamie L.", insight: "Struggling with today's visual lesson. Try audio mode instead.", severity: "default" as const },
                    { student: "Sam K.",   insight: "Exceptional focus today! Great candidate for peer mentoring.", severity: "success" as const },
                  ].map(({ student, insight, severity }) => (
                    <div key={student} className="flex gap-3 rounded-xl bg-white/60 p-3 dark:bg-surface-dark-muted/60">
                      <div className="shrink-0 mt-0.5">
                        {severity === "warning" ? (
                          <AlertCircle className="h-4 w-4 text-warm-500" />
                        ) : severity === "success" ? (
                          <CheckCircle className="h-4 w-4 text-calm-500" />
                        ) : (
                          <Sparkles className="h-4 w-4 text-brand-500" />
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-600 dark:text-slate-300">{student}</p>
                        <p className="text-sm text-slate-700 dark:text-slate-200">{insight}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Quick actions */}
            <motion.div variants={item}>
              <Card>
                <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {[
                    { label: "Assign Lesson",       icon: BookOpen,      variant: "primary"    as const },
                    { label: "Send Group Message",   icon: MessageCircle, variant: "secondary"  as const },
                    { label: "View Therapy Notes",   icon: Sparkles,      variant: "secondary"  as const },
                    { label: "Schedule Session",     icon: Users,         variant: "calm"       as const },
                  ].map(({ label, icon: Icon, variant }) => (
                    <Button key={label} variant={variant} size="sm" className="w-full justify-start gap-3">
                      <Icon className="h-4 w-4" /> {label}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Class mood overview */}
            <motion.div variants={item}>
              <Card gradient="warm">
                <CardHeader><CardTitle>Class Mood Today</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex justify-around py-2">
                    {STUDENTS.map((s) => (
                      <div key={s.id} className="flex flex-col items-center gap-1">
                        <span className="text-2xl">{MOOD_EMOJIS[s.mood]}</span>
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{s.name.split(" ")[0]}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 rounded-xl bg-white/60 p-3 dark:bg-surface-dark-muted/60">
                    <p className="text-xs text-slate-600 dark:text-slate-300">
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
