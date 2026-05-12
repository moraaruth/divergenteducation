"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, BookOpen, Palette, Heart, Users, Settings,
  ChevronLeft, Sparkles, LogOut, Brain, Star, MessageCircle,
  Menu, X, Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore, useUIStore } from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import { XPBar } from "@/components/ui/XPBar";
import type { UserRole } from "@/types";

const NAV_ITEMS: Record<UserRole, { href: string; label: string; icon: React.ElementType; emoji?: string }[]> = {
  child: [
    { href: "/dashboard/child",           label: "My Space",      icon: LayoutDashboard, emoji: "🏠" },
    { href: "/dashboard/child/learn",     label: "Learning Hub",  icon: BookOpen,        emoji: "📚" },
    { href: "/dashboard/child/create",    label: "Create Studio", icon: Palette,         emoji: "🎨" },
    { href: "/dashboard/child/wellbeing", label: "Wellbeing",     icon: Heart,           emoji: "🌿" },
    { href: "/dashboard/child/ai-coach",  label: "AI Coach",      icon: Brain,           emoji: "🤖" },
    { href: "/dashboard/child/rewards",   label: "Rewards",       icon: Star,            emoji: "🏆" },
  ],
  parent: [
    { href: "/dashboard/parent",          label: "Overview",      icon: LayoutDashboard },
    { href: "/dashboard/parent/children", label: "My Children",   icon: Users           },
    { href: "/dashboard/parent/insights", label: "Insights",      icon: Sparkles        },
    { href: "/dashboard/parent/messages", label: "Messages",      icon: MessageCircle   },
    { href: "/dashboard/parent/routines", label: "Routines",      icon: Heart           },
  ],
  teacher: [
    { href: "/dashboard/teacher",           label: "Classroom",   icon: LayoutDashboard },
    { href: "/dashboard/teacher/students",  label: "Students",    icon: Users           },
    { href: "/dashboard/teacher/lessons",   label: "Lessons",     icon: BookOpen        },
    { href: "/dashboard/teacher/insights",  label: "Insights",    icon: Sparkles        },
    { href: "/dashboard/teacher/messages",  label: "Messages",    icon: MessageCircle   },
  ],
  school_admin: [
    { href: "/dashboard/admin",            label: "Dashboard",    icon: LayoutDashboard },
    { href: "/dashboard/admin/users",      label: "Users",        icon: Users           },
    { href: "/dashboard/admin/analytics",  label: "Analytics",    icon: Sparkles        },
    { href: "/dashboard/admin/settings",   label: "Settings",     icon: Settings        },
  ],
  super_admin: [
    { href: "/dashboard/admin",            label: "Dashboard",    icon: LayoutDashboard },
    { href: "/dashboard/admin/tenants",    label: "Schools",      icon: Users           },
    { href: "/dashboard/admin/analytics",  label: "Analytics",    icon: Sparkles        },
    { href: "/dashboard/admin/billing",    label: "Billing",      icon: Star            },
    { href: "/dashboard/admin/settings",   label: "Settings",     icon: Settings        },
  ],
};

const ROLE_COLORS: Record<UserRole, string> = {
  child:        "from-brand-400 to-calm-400",
  parent:       "from-warm-400 to-joy-400",
  teacher:      "from-calm-400 to-brand-400",
  school_admin: "from-brand-500 to-brand-700",
  super_admin:  "from-slate-600 to-slate-800",
};

// ─── Mobile Overlay ───────────────────────────────────────────────────────────

function MobileOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  );
}

// ─── Nav Item ─────────────────────────────────────────────────────────────────

function NavItem({
  href,
  label,
  icon: Icon,
  emoji,
  active,
  collapsed,
  isChild,
}: {
  href:      string;
  label:     string;
  icon:      React.ElementType;
  emoji?:    string;
  active:    boolean;
  collapsed: boolean;
  isChild:   boolean;
}) {
  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold",
        "transition-all duration-150 ease-smooth",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-inset",
        active
          ? "bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300"
          : "text-ink-muted hover:bg-surface-subtle hover:text-ink dark:text-slate-400 dark:hover:bg-surface-dark-subtle dark:hover:text-slate-200"
      )}
    >
      {/* Active indicator */}
      {active && (
        <motion.div
          layoutId="sidebar-active"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-brand-500"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}

      {/* Icon or emoji */}
      <span className={cn(
        "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all duration-150",
        active
          ? "bg-brand-100 dark:bg-brand-900/50"
          : "group-hover:bg-surface-subtle dark:group-hover:bg-surface-dark-subtle"
      )}>
        {isChild && emoji
          ? <span className="text-base leading-none">{emoji}</span>
          : <Icon className={cn("h-4 w-4", active ? "text-brand-600 dark:text-brand-400" : "text-ink-subtle dark:text-slate-500")} />
        }
      </span>

      {/* Label */}
      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="truncate overflow-hidden whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const { sidebarOpen, setSidebarOpen, sensoryMode } = useUIStore();

  const navItems  = user ? NAV_ITEMS[user.role] : [];
  const isChild   = user?.role === "child";
  const roleColor = user ? ROLE_COLORS[user.role] : "from-brand-400 to-calm-400";

  return (
    <>
      {/* Mobile overlay */}
      <MobileOverlay open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile toggle button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-md border border-surface-border dark:bg-surface-dark-card dark:border-surface-dark-border md:hidden"
        aria-label={sidebarOpen ? "Close menu" : "Open menu"}
      >
        {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 260 : 72 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          "relative flex h-screen flex-col overflow-hidden shrink-0",
          "bg-white dark:bg-surface-dark-muted",
          "border-r border-surface-border dark:border-surface-dark-border",
          // Mobile: fixed drawer
          "fixed inset-y-0 left-0 z-50 md:relative md:z-auto",
          !sidebarOpen && "-translate-x-full md:translate-x-0",
          "transition-transform duration-250 ease-smooth md:transition-none",
          sensoryMode && "transition-none"
        )}
        style={{ width: sidebarOpen ? 260 : 72 }}
      >
        {/* ── Logo ── */}
        <div className={cn(
          "flex h-16 shrink-0 items-center border-b border-surface-border dark:border-surface-dark-border",
          sidebarOpen ? "px-4 gap-3" : "justify-center px-0"
        )}>
          <div className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
            `bg-gradient-to-br ${roleColor}`,
            "shadow-glow-sm"
          )}>
            <Brain className="h-5 w-5 text-white" />
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                className="min-w-0"
              >
                <p className="text-base font-extrabold text-ink dark:text-white leading-none">DivergentEd</p>
                <p className="text-2xs text-ink-subtle dark:text-slate-400 mt-0.5 font-medium">
                  {user?.role?.replace("_", " ") ?? "Platform"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Nav ── */}
        <nav
          className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-3 space-y-0.5 scrollbar-hide"
          aria-label="Main navigation"
        >
          {navItems.map(({ href, label, icon, emoji }) => (
            <NavItem
              key={href}
              href={href}
              label={label}
              icon={icon}
              emoji={emoji}
              active={pathname === href || (href !== "/dashboard/child" && pathname.startsWith(href + "/"))}
              collapsed={!sidebarOpen}
              isChild={isChild}
            />
          ))}
        </nav>

        {/* ── User section ── */}
        {user && (
          <div className="shrink-0 border-t border-surface-border dark:border-surface-dark-border p-3 space-y-3">
            {/* XP bar — child only */}
            <AnimatePresence>
              {sidebarOpen && isChild && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <XPBar xp={user.stats?.totalXp ?? 0} size="sm" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* User row */}
            <div className={cn("flex items-center gap-2.5", !sidebarOpen && "justify-center")}>
              <Avatar size="sm" ring>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>

              <AnimatePresence>
                {sidebarOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 min-w-0"
                  >
                    <p className="text-sm font-bold text-ink dark:text-white truncate leading-none">{user.name}</p>
                    <p className="text-2xs text-ink-subtle dark:text-slate-400 mt-0.5 capitalize font-medium">
                      {user.role.replace("_", " ")}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {sidebarOpen && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={logout}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-ink-subtle hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                    aria-label="Sign out"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* ── Collapse toggle (desktop) ── */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={cn(
            "absolute -right-3 top-[4.5rem] hidden md:flex",
            "h-6 w-6 items-center justify-center rounded-full",
            "border border-surface-border bg-white shadow-sm",
            "dark:bg-surface-dark-card dark:border-surface-dark-border",
            "hover:bg-surface-subtle dark:hover:bg-surface-dark-subtle",
            "transition-colors duration-150 z-10"
          )}
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <ChevronLeft className={cn(
            "h-3.5 w-3.5 text-ink-subtle transition-transform duration-250",
            !sidebarOpen && "rotate-180"
          )} />
        </button>

        {/* ── Sensory mode indicator ── */}
        {sensoryMode && sidebarOpen && (
          <div className="mx-3 mb-3 flex items-center gap-2 rounded-xl bg-calm-50 dark:bg-calm-900/20 px-3 py-2">
            <Zap className="h-3.5 w-3.5 text-calm-600 dark:text-calm-400 shrink-0" />
            <span className="text-2xs font-semibold text-calm-700 dark:text-calm-300">Sensory-safe on</span>
          </div>
        )}
      </motion.aside>
    </>
  );
}
