"use client";
import { Bell, Search, Moon, Sun, Zap } from "lucide-react";
import { useAuthStore, useUIStore } from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import { Button } from "@/components/ui/Button";
import { getGreeting } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function TopNav() {
  const { user } = useAuthStore();
  const { darkMode, toggleDarkMode, sensoryMode, toggleSensoryMode } = useUIStore();

  return (
    <header className="flex h-16 items-center justify-between border-b border-surface-border bg-white/80 backdrop-blur-sm px-6 dark:bg-surface-dark-DEFAULT/80 dark:border-surface-dark-border sticky top-0 z-30">
      {/* Greeting */}
      <div>
        <p className="text-sm font-semibold text-slate-800 dark:text-white">
          {user ? getGreeting(user.name.split(" ")[0]) : "Welcome back!"}
        </p>
        <p className="text-xs text-slate-500">
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <button className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-surface-subtle dark:hover:bg-surface-dark-muted transition-colors">
          <Search className="h-4 w-4" />
        </button>

        {/* Sensory mode toggle */}
        <button
          onClick={toggleSensoryMode}
          title={sensoryMode ? "Disable sensory-safe mode" : "Enable sensory-safe mode"}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-xl transition-colors",
            sensoryMode
              ? "bg-calm-100 text-calm-600 dark:bg-calm-900/30 dark:text-calm-400"
              : "text-slate-500 hover:bg-surface-subtle dark:hover:bg-surface-dark-muted"
          )}
        >
          <Zap className="h-4 w-4" />
        </button>

        {/* Dark mode */}
        <button
          onClick={toggleDarkMode}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-surface-subtle dark:hover:bg-surface-dark-muted transition-colors"
        >
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* Notifications */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-surface-subtle dark:hover:bg-surface-dark-muted transition-colors">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-500" />
        </button>

        {/* Avatar */}
        <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-brand-100 dark:ring-brand-900">
          <AvatarImage src={user?.avatar} alt={user?.name} />
          <AvatarFallback>{user?.name?.[0] ?? "U"}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
