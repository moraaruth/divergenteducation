"use client";
import { motion } from "framer-motion";
import { cn, getLevelFromXP, getLevelProgress, getXPForNextLevel, formatXP } from "@/lib/utils";

interface XPBarProps {
  xp: number;
  className?: string;
  showLabel?: boolean;
}

export function XPBar({ xp, className, showLabel = true }: XPBarProps) {
  const level = getLevelFromXP(xp);
  const progress = getLevelProgress(xp);
  const nextLevelXP = getXPForNextLevel(level);

  return (
    <div className={cn("space-y-1", className)}>
      {showLabel && (
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-brand-600 dark:text-brand-400">Level {level}</span>
          <span className="text-slate-500">{formatXP(xp)} / {formatXP(nextLevelXP)} XP</span>
        </div>
      )}
      <div className="h-2.5 w-full rounded-full bg-surface-subtle dark:bg-surface-dark-subtle overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-400 to-calm-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

interface LevelBadgeProps {
  level: number;
  size?: "sm" | "md" | "lg";
}

export function LevelBadge({ level, size = "md" }: LevelBadgeProps) {
  const sizes = {
    sm: "h-7 w-7 text-xs",
    md: "h-9 w-9 text-sm",
    lg: "h-12 w-12 text-base",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full font-bold text-white",
        "bg-gradient-to-br from-brand-500 to-calm-500 shadow-glow",
        sizes[size]
      )}
    >
      {level}
    </div>
  );
}

interface StreakBadgeProps {
  streak: number;
}

export function StreakBadge({ streak }: StreakBadgeProps) {
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-warm-100 px-3 py-1.5 dark:bg-warm-900/30">
      <span className="text-lg">🔥</span>
      <span className="text-sm font-bold text-warm-600 dark:text-warm-400">{streak} day streak</span>
    </div>
  );
}
