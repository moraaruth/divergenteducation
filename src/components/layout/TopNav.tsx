"use client";
import { useState } from "react";
import { Bell, Search, Moon, Sun, Zap, ChevronDown, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore, useUIStore } from "@/store";
import { Avatar, AvatarFallback, AvatarImage, Badge } from "@/components/ui";
import { getGreeting, cn } from "@/lib/utils";

const NOTIFICATIONS = [
  { id: "1", type: "achievement", text: "You earned the '7-Day Streak' badge! 🔥", time: "2m ago",  read: false },
  { id: "2", type: "lesson",      text: "New lesson available: 'Emotions & Feelings'", time: "1h ago",  read: false },
  { id: "3", type: "message",     text: "Ms. Chen sent you a message",               time: "3h ago",  read: true  },
];

export function TopNav() {
  const { user } = useAuthStore();
  const { darkMode, toggleDarkMode, sensoryMode, toggleSensoryMode } = useUIStore();
  const [notifOpen, setNotifOpen]   = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-3 border-b border-surface-border bg-white/90 backdrop-blur-md px-4 sm:px-6 dark:bg-surface-dark-muted/90 dark:border-surface-dark-border">

      {/* ── Left: Greeting ── */}
      <div className="min-w-0 hidden sm:block">
        <p className="text-sm font-bold text-ink dark:text-white truncate">
          {user ? getGreeting(user.name.split(" ")[0]) : "Welcome back! 👋"}
        </p>
        <p className="text-xs text-ink-subtle dark:text-slate-400 font-medium">
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* ── Center: Search ── */}
      <div className="flex-1 max-w-xs hidden sm:block">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-subtle" />
          <input
            type="search"
            placeholder="Search lessons, activities..."
            className={cn(
              "h-9 w-full rounded-xl border border-surface-border bg-surface-subtle pl-9 pr-4 text-sm",
              "placeholder:text-ink-faint font-medium text-ink",
              "transition-all duration-150",
              "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-400 focus:bg-white",
              "dark:bg-surface-dark-subtle dark:border-surface-dark-border dark:text-slate-200 dark:placeholder:text-slate-500",
              "dark:focus:bg-surface-dark-card"
            )}
            aria-label="Search"
          />
        </div>
      </div>

      {/* ── Right: Actions ── */}
      <div className="flex items-center gap-0.5">

        {/* Sensory mode */}
        <button
          onClick={toggleSensoryMode}
          title={sensoryMode ? "Disable sensory-safe mode" : "Enable sensory-safe mode"}
          aria-pressed={sensoryMode}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-150",
            sensoryMode
              ? "bg-calm-100 text-calm-600 dark:bg-calm-900/30 dark:text-calm-400"
              : "text-ink-subtle hover:bg-surface-subtle dark:hover:bg-surface-dark-subtle"
          )}
        >
          <Zap className="h-4 w-4" />
        </button>

        {/* Dark mode */}
        <button
          onClick={toggleDarkMode}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-ink-subtle hover:bg-surface-subtle dark:hover:bg-surface-dark-subtle transition-colors"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={darkMode ? "sun" : "moon"}
              initial={{ rotate: -30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 30, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </motion.div>
          </AnimatePresence>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
            aria-expanded={notifOpen}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl text-ink-subtle hover:bg-surface-subtle dark:hover:bg-surface-dark-subtle transition-colors"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 text-2xs font-bold text-white"
              >
                {unreadCount}
              </motion.span>
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-surface-border bg-white shadow-float dark:bg-surface-dark-card dark:border-surface-dark-border overflow-hidden z-50"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-surface-border dark:border-surface-dark-border">
                  <p className="text-sm font-bold text-ink dark:text-white">Notifications</p>
                  {unreadCount > 0 && <Badge variant="brand" size="sm">{unreadCount} new</Badge>}
                </div>
                <div className="divide-y divide-surface-border dark:divide-surface-dark-border max-h-72 overflow-y-auto">
                  {NOTIFICATIONS.map((n) => (
                    <div
                      key={n.id}
                      className={cn(
                        "flex gap-3 px-4 py-3 transition-colors hover:bg-surface-subtle dark:hover:bg-surface-dark-subtle cursor-pointer",
                        !n.read && "bg-brand-25 dark:bg-brand-950/30"
                      )}
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-surface-subtle dark:bg-surface-dark-subtle text-base">
                        {n.type === "achievement" ? "🏆" : n.type === "lesson" ? "📚" : "💬"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-ink dark:text-slate-200 leading-snug">{n.text}</p>
                        <p className="text-2xs text-ink-subtle dark:text-slate-400 mt-0.5">{n.time}</p>
                      </div>
                      {!n.read && <div className="h-2 w-2 rounded-full bg-brand-500 shrink-0 mt-1" />}
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 border-t border-surface-border dark:border-surface-dark-border">
                  <button className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative ml-1">
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            aria-expanded={profileOpen}
            aria-label="Profile menu"
            className="flex items-center gap-2 rounded-xl p-1 pr-2 hover:bg-surface-subtle dark:hover:bg-surface-dark-subtle transition-colors"
          >
            <Avatar size="sm" ring>
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name?.[0] ?? "U"}</AvatarFallback>
            </Avatar>
            <ChevronDown className={cn(
              "h-3.5 w-3.5 text-ink-subtle transition-transform duration-150 hidden sm:block",
              profileOpen && "rotate-180"
            )} />
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-surface-border bg-white shadow-float dark:bg-surface-dark-card dark:border-surface-dark-border overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-surface-border dark:border-surface-dark-border">
                  <p className="text-sm font-bold text-ink dark:text-white">{user?.name}</p>
                  <p className="text-xs text-ink-subtle dark:text-slate-400">{user?.email}</p>
                </div>
                <div className="p-1.5">
                  {[
                    { icon: Settings, label: "Settings", href: "/settings" },
                  ].map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-ink-muted hover:bg-surface-subtle dark:text-slate-300 dark:hover:bg-surface-dark-subtle transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Click outside to close */}
      {(notifOpen || profileOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => { setNotifOpen(false); setProfileOpen(false); }}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
