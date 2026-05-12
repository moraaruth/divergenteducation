"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, BookOpen, Palette, Heart, Users, Settings,
  ChevronLeft, Sparkles, Bell, LogOut, Brain, Star, MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore, useUIStore } from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import { XPBar, LevelBadge } from "@/components/ui/XPBar";
import type { UserRole } from "@/types";

const NAV_ITEMS: Record<UserRole, { href: string; label: string; icon: React.ElementType }[]> = {
  child: [
    { href: "/dashboard/child",            label: "My Space",      icon: LayoutDashboard },
    { href: "/dashboard/child/learn",      label: "Learning Hub",  icon: BookOpen },
    { href: "/dashboard/child/create",     label: "Create Studio", icon: Palette },
    { href: "/dashboard/child/wellbeing",  label: "Wellbeing",     icon: Heart },
    { href: "/dashboard/child/ai-coach",   label: "AI Coach",      icon: Brain },
    { href: "/dashboard/child/rewards",    label: "Rewards",       icon: Star },
  ],
  parent: [
    { href: "/dashboard/parent",           label: "Overview",      icon: LayoutDashboard },
    { href: "/dashboard/parent/children",  label: "My Children",   icon: Users },
    { href: "/dashboard/parent/insights",  label: "Insights",      icon: Sparkles },
    { href: "/dashboard/parent/messages",  label: "Messages",      icon: MessageCircle },
    { href: "/dashboard/parent/routines",  label: "Routines",      icon: Heart },
  ],
  teacher: [
    { href: "/dashboard/teacher",          label: "Classroom",     icon: LayoutDashboard },
    { href: "/dashboard/teacher/students", label: "Students",      icon: Users },
    { href: "/dashboard/teacher/lessons",  label: "Lessons",       icon: BookOpen },
    { href: "/dashboard/teacher/insights", label: "Insights",      icon: Sparkles },
    { href: "/dashboard/teacher/messages", label: "Messages",      icon: MessageCircle },
  ],
  school_admin: [
    { href: "/dashboard/admin",            label: "Dashboard",     icon: LayoutDashboard },
    { href: "/dashboard/admin/users",      label: "Users",         icon: Users },
    { href: "/dashboard/admin/analytics",  label: "Analytics",     icon: Sparkles },
    { href: "/dashboard/admin/settings",   label: "Settings",      icon: Settings },
  ],
  super_admin: [
    { href: "/dashboard/admin",            label: "Dashboard",     icon: LayoutDashboard },
    { href: "/dashboard/admin/tenants",    label: "Schools",       icon: Users },
    { href: "/dashboard/admin/analytics",  label: "Analytics",     icon: Sparkles },
    { href: "/dashboard/admin/billing",    label: "Billing",       icon: Star },
    { href: "/dashboard/admin/settings",   label: "Settings",      icon: Settings },
  ],
};

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  const navItems = user ? NAV_ITEMS[user.role] : [];

  return (
    <AnimatePresence>
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 260 : 72 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="relative flex h-screen flex-col border-r border-surface-border bg-white dark:bg-surface-dark-DEFAULT dark:border-surface-dark-border overflow-hidden shrink-0"
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 px-4 border-b border-surface-border dark:border-surface-dark-border">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-hero">
            <Brain className="h-5 w-5 text-white" />
          </div>
          {sidebarOpen && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-lg font-extrabold text-slate-800 dark:text-white"
            >
              DivergentEd
            </motion.span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-150",
                  active
                    ? "bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400"
                    : "text-slate-600 hover:bg-surface-subtle dark:text-slate-400 dark:hover:bg-surface-dark-muted"
                )}
              >
                <Icon className={cn("h-5 w-5 shrink-0", active && "text-brand-500")} />
                {sidebarOpen && <span className="truncate">{label}</span>}
                {active && sidebarOpen && (
                  <motion.div
                    layoutId="active-indicator"
                    className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-500"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        {user && (
          <div className="border-t border-surface-border dark:border-surface-dark-border p-3 space-y-3">
            {sidebarOpen && user.role === "child" && (
              <XPBar xp={user.stats?.totalXp ?? 0} />
            )}
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 shrink-0">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              {sidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">{user.name}</p>
                  <p className="text-xs text-slate-500 capitalize">{user.role.replace("_", " ")}</p>
                </div>
              )}
              {sidebarOpen && (
                <button
                  onClick={logout}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                  aria-label="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-surface-border bg-white shadow-sm dark:bg-surface-dark-muted dark:border-surface-dark-border hover:bg-surface-subtle transition-colors"
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <ChevronLeft className={cn("h-3.5 w-3.5 text-slate-500 transition-transform", !sidebarOpen && "rotate-180")} />
        </button>
      </motion.aside>
    </AnimatePresence>
  );
}
