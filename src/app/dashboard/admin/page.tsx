"use client";
import { motion } from "framer-motion";
import { Users, Building2, DollarSign, TrendingUp, Activity, Shield, ArrowRight, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge, Progress } from "@/components/ui";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item      = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } } };

const GROWTH_DATA = [
  { month: "Jan", users: 120 }, { month: "Feb", users: 180 }, { month: "Mar", users: 240 },
  { month: "Apr", users: 310 }, { month: "May", users: 420 }, { month: "Jun", users: 580 },
];

const TENANTS = [
  { name: "Sunrise Academy",     users: 48,  tier: "pro",        status: "active",   mrr: 299 },
  { name: "Bright Minds School", users: 120, tier: "enterprise", status: "active",   mrr: 799 },
  { name: "Hope Learning Center",users: 22,  tier: "starter",    status: "trialing", mrr: 99  },
  { name: "Rainbow Kids",        users: 35,  tier: "pro",        status: "active",   mrr: 299 },
];

const STAT_CARDS = [
  { label: "Total Users",    value: "2,847",  icon: Users,      iconColor: "text-brand-500", iconBg: "bg-brand-50", change: "+12%", positive: true  },
  { label: "Active Schools", value: "24",     icon: Building2,  iconColor: "text-calm-500",  iconBg: "bg-calm-50",  change: "+3",   positive: true  },
  { label: "MRR",            value: "$8,420", icon: DollarSign, iconColor: "text-joy-500",   iconBg: "bg-joy-50",   change: "+18%", positive: true  },
  { label: "Uptime",         value: "99.9%",  icon: Activity,   iconColor: "text-warm-500",  iconBg: "bg-warm-50",  change: "SLA",  positive: true  },
];

const SUBSCRIPTIONS = [
  { tier: "Enterprise", count: 3,  pct: 12, color: "bg-brand-500" },
  { tier: "Pro",        count: 12, pct: 50, color: "bg-calm-500"  },
  { tier: "Starter",    count: 7,  pct: 29, color: "bg-warm-500"  },
  { tier: "Free",       count: 2,  pct: 9,  color: "bg-slate-300" },
];

const SECURITY_CHECKS = [
  "COPPA Compliance", "GDPR Compliance", "SSL Certificate",
  "Rate Limiting",    "Data Encryption", "Audit Logging",
];

export default function AdminDashboard() {
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
              Platform Overview 🏢
            </h1>
            <p className="mt-1 text-sm text-ink-muted dark:text-slate-400">
              DivergentEd Super Admin
            </p>
          </div>
          <Button size="sm" leftIcon={<Plus className="h-4 w-4" />}>
            Onboard School
          </Button>
        </motion.div>

        {/* ── KPI row ── */}
        <motion.div variants={item} className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STAT_CARDS.map(({ label, value, icon: Icon, iconColor, iconBg, change, positive }) => (
            <Card key={label} hover padding="md" className="group">
              <div className="mb-4 flex items-start justify-between">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconBg} transition-transform duration-200 group-hover:scale-110`}>
                  <Icon className={`h-[18px] w-[18px] ${iconColor}`} />
                </div>
                <Badge variant={positive ? "success" : "danger"} size="sm">{change}</Badge>
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

            {/* Growth chart */}
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-calm-600 dark:text-calm-400">
                    <TrendingUp className="h-4 w-4" /> +38% this month
                  </div>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={GROWTH_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -16 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 11, fill: "#94a3b8" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: "#94a3b8" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", fontSize: "12px" }}
                        cursor={{ fill: "rgba(99,102,241,0.05)" }}
                      />
                      <Bar dataKey="users" fill="#6366f1" radius={[6, 6, 0, 0]} maxBarSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Tenant list */}
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>Schools & Organizations</CardTitle>
                  <Button variant="ghost" size="xs" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                    View all
                  </Button>
                </CardHeader>
                <CardContent className="space-y-2">
                  {TENANTS.map((tenant) => (
                    <div
                      key={tenant.name}
                      className="flex items-center gap-4 rounded-xl p-3 hover:bg-surface-subtle dark:hover:bg-surface-dark-subtle transition-colors cursor-pointer"
                    >
                      {/* Avatar */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-sm font-bold text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
                        {tenant.name[0]}
                      </div>
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                          <p className="font-semibold text-ink dark:text-white truncate">{tenant.name}</p>
                          <Badge variant={tenant.tier === "enterprise" ? "calm" : tenant.tier === "pro" ? "brand" : "warning"}>
                            {tenant.tier}
                          </Badge>
                          <Badge variant={tenant.status === "active" ? "success" : "warning"}>
                            {tenant.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-ink-subtle dark:text-slate-400">{tenant.users} users</p>
                      </div>
                      {/* MRR — right-aligned, fixed width */}
                      <div className="w-20 shrink-0 text-right">
                        <p className="text-sm font-bold tabular-nums text-ink dark:text-white">${tenant.mrr}/mo</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* ── Right (1/3) ── */}
          <div className="space-y-6">

            {/* Subscription breakdown */}
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>Subscriptions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {SUBSCRIPTIONS.map(({ tier, count, pct, color }) => (
                    <div key={tier}>
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-sm font-semibold text-ink dark:text-slate-200">{tier}</span>
                        <span className="text-xs text-ink-subtle dark:text-slate-400 tabular-nums">{count} schools</span>
                      </div>
                      <Progress value={pct} size="sm" color={color} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Security status */}
            <motion.div variants={item}>
              <Card gradient="calm">
                <CardHeader>
                  <CardTitle>Security Status</CardTitle>
                  <Shield className="h-5 w-5 text-calm-500" />
                </CardHeader>
                {/* space-y-2 = 8px between check rows */}
                <CardContent className="space-y-2">
                  {SECURITY_CHECKS.map((label) => (
                    <div
                      key={label}
                      className="flex items-center justify-between rounded-xl bg-white/60 px-3 py-2 dark:bg-surface-dark-subtle/60"
                    >
                      <span className="text-sm text-ink dark:text-slate-200">{label}</span>
                      <span className="text-xs font-bold text-calm-600 dark:text-calm-400">✓ Active</span>
                    </div>
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
