"use client";
import { motion } from "framer-motion";
import { Users, Building2, DollarSign, TrendingUp, Activity, Shield, ArrowRight, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge, Progress } from "@/components/ui";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const GROWTH_DATA = [
  { month: "Jan", users: 120 }, { month: "Feb", users: 180 }, { month: "Mar", users: 240 },
  { month: "Apr", users: 310 }, { month: "May", users: 420 }, { month: "Jun", users: 580 },
];

const TENANTS = [
  { name: "Sunrise Academy",    users: 48,  tier: "pro",        status: "active",   mrr: 299  },
  { name: "Bright Minds School",users: 120, tier: "enterprise", status: "active",   mrr: 799  },
  { name: "Hope Learning Center",users: 22, tier: "starter",    status: "trialing", mrr: 99   },
  { name: "Rainbow Kids",       users: 35,  tier: "pro",        status: "active",   mrr: 299  },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-6xl mx-auto space-y-6">
        <motion.div variants={item} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white">Platform Overview 🏢</h1>
            <p className="text-slate-500 mt-1">DivergentEd Super Admin</p>
          </div>
          <Button size="sm"><Plus className="h-4 w-4" /> Onboard School</Button>
        </motion.div>

        {/* KPI stats */}
        <motion.div variants={item} className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Total Users",    value: "2,847",  icon: Users,       color: "text-brand-500", bg: "bg-brand-50",  change: "+12%" },
            { label: "Active Schools", value: "24",     icon: Building2,   color: "text-calm-500",  bg: "bg-calm-50",   change: "+3"   },
            { label: "MRR",            value: "$8,420", icon: DollarSign,  color: "text-joy-500",   bg: "bg-joy-50",    change: "+18%" },
            { label: "Uptime",         value: "99.9%",  icon: Activity,    color: "text-warm-500",  bg: "bg-warm-50",   change: "SLA"  },
          ].map(({ label, value, icon: Icon, color, bg, change }) => (
            <Card key={label} hover className="py-4">
              <div className="flex items-start justify-between mb-2">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg}`}>
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <Badge variant="success">{change}</Badge>
              </div>
              <p className="text-2xl font-extrabold text-slate-800 dark:text-white">{value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{label}</p>
            </Card>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Growth chart */}
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <div className="flex items-center gap-1.5 text-sm text-green-600 font-semibold">
                    <TrendingUp className="h-4 w-4" /> +38% this month
                  </div>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={GROWTH_DATA}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }} />
                      <Bar dataKey="users" fill="#6366f1" radius={[6, 6, 0, 0]} />
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
                  <Button variant="ghost" size="sm">View all <ArrowRight className="h-3.5 w-3.5" /></Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  {TENANTS.map((tenant) => (
                    <div key={tenant.name} className="flex items-center gap-4 rounded-xl p-3 hover:bg-surface-subtle dark:hover:bg-surface-dark-muted transition-colors">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600 font-bold text-sm">
                        {tenant.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-slate-800 dark:text-white truncate">{tenant.name}</p>
                          <Badge variant={tenant.tier === "enterprise" ? "calm" : tenant.tier === "pro" ? "default" : "warning"}>
                            {tenant.tier}
                          </Badge>
                          <Badge variant={tenant.status === "active" ? "success" : "warning"}>{tenant.status}</Badge>
                        </div>
                        <p className="text-xs text-slate-500">{tenant.users} users</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-800 dark:text-white">${tenant.mrr}/mo</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Subscription breakdown */}
            <motion.div variants={item}>
              <Card>
                <CardHeader><CardTitle>Subscriptions</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { tier: "Enterprise", count: 3,  pct: 12, color: "bg-brand-500" },
                    { tier: "Pro",        count: 12, pct: 50, color: "bg-calm-500"  },
                    { tier: "Starter",    count: 7,  pct: 29, color: "bg-warm-500"  },
                    { tier: "Free",       count: 2,  pct: 9,  color: "bg-slate-300" },
                  ].map(({ tier, count, pct, color }) => (
                    <div key={tier}>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-slate-700 dark:text-slate-200">{tier}</span>
                        <span className="text-slate-500">{count} schools</span>
                      </div>
                      <Progress value={pct} color={color} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Security */}
            <motion.div variants={item}>
              <Card gradient="calm">
                <CardHeader>
                  <CardTitle>Security Status</CardTitle>
                  <Shield className="h-5 w-5 text-calm-500" />
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    { label: "COPPA Compliance",  ok: true  },
                    { label: "GDPR Compliance",   ok: true  },
                    { label: "SSL Certificate",   ok: true  },
                    { label: "Rate Limiting",     ok: true  },
                    { label: "Data Encryption",   ok: true  },
                    { label: "Audit Logging",     ok: true  },
                  ].map(({ label, ok }) => (
                    <div key={label} className="flex items-center justify-between rounded-lg bg-white/60 px-3 py-2 dark:bg-surface-dark-muted/60">
                      <span className="text-sm text-slate-700 dark:text-slate-200">{label}</span>
                      <span className={`text-xs font-bold ${ok ? "text-calm-600" : "text-red-500"}`}>
                        {ok ? "✓ Active" : "✗ Issue"}
                      </span>
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
