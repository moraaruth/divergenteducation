"use client";
import { motion } from "framer-motion";
import { cn, getLevelFromXP, getLevelProgress, getXPForNextLevel, formatXP } from "@/lib/utils";

// ─── XP Bar ───────────────────────────────────────────────────────────────────

interface XPBarProps {
  xp:         number;
  className?: string;
  showLabel?: boolean;
  size?:      "sm" | "md";
}

export function XPBar({ xp, className, showLabel = true, size = "md" }: XPBarProps) {
  const level    = getLevelFromXP(xp);
  const progress = getLevelProgress(xp);
  const nextXP   = getXPForNextLevel(level);

  return (
    <div className={cn("space-y-1.5", className)}>
      {showLabel && (
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
            Level {level}
          </span>
          <span className="text-xs text-ink-subtle dark:text-slate-400">
            {formatXP(xp)} / {formatXP(nextXP)} XP
          </span>
        </div>
      )}
      <div className={cn(
        "relative w-full overflow-hidden rounded-full bg-surface-subtle dark:bg-surface-dark-subtle",
        size === "sm" ? "h-1.5" : "h-2"
      )}>
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-400 via-brand-500 to-calm-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
        />
        {/* Shimmer */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}

// ─── Level Badge ──────────────────────────────────────────────────────────────

interface LevelBadgeProps {
  level:      number;
  size?:      "sm" | "md" | "lg" | "xl";
  animated?:  boolean;
}

const levelSizes = {
  sm: "h-7 w-7 text-xs",
  md: "h-9 w-9 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-xl",
};

export function LevelBadge({ level, size = "md", animated }: LevelBadgeProps) {
  return (
    <motion.div
      className={cn(
        "relative flex items-center justify-center rounded-full font-extrabold text-white",
        "bg-gradient-to-br from-brand-400 to-calm-500",
        animated && "shadow-glow",
        levelSizes[size]
      )}
      whileHover={animated ? { scale: 1.08 } : undefined}
    >
      {level}
      {animated && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-400 to-calm-500 opacity-40"
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}

// ─── Streak Badge ─────────────────────────────────────────────────────────────

interface StreakBadgeProps {
  streak:     number;
  size?:      "sm" | "md";
  animated?:  boolean;
}

export function StreakBadge({ streak, size = "md", animated }: StreakBadgeProps) {
  return (
    <motion.div
      className={cn(
        "flex items-center gap-1.5 rounded-full font-bold",
        "bg-gradient-to-r from-warm-100 to-joy-100 dark:from-warm-900/30 dark:to-joy-900/30",
        "border border-warm-200 dark:border-warm-800",
        size === "sm" ? "px-2.5 py-1 text-xs" : "px-3.5 py-1.5 text-sm"
      )}
      whileHover={{ scale: 1.03 }}
    >
      <motion.span
        animate={animated ? { scale: [1, 1.2, 1] } : undefined}
        transition={{ duration: 1.5, repeat: Infinity }}
        className={size === "sm" ? "text-base" : "text-lg"}
      >
        🔥
      </motion.span>
      <span className="text-warm-700 dark:text-warm-300">{streak} day{streak !== 1 ? "s" : ""}</span>
    </motion.div>
  );
}

// ─── XP Ring (circular progress) ─────────────────────────────────────────────

interface XPRingProps {
  xp:         number;
  size?:      number;
  className?: string;
}

export function XPRing({ xp, size = 80, className }: XPRingProps) {
  const level    = getLevelFromXP(xp);
  const progress = getLevelProgress(xp);
  const r        = (size - 10) / 2;
  const circ     = 2 * Math.PI * r;
  const offset   = circ * (1 - progress / 100);

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        {/* Track */}
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          className="text-surface-subtle dark:text-surface-dark-subtle"
        />
        {/* Progress */}
        <motion.circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke="url(#xpGradient)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
        />
        <defs>
          <linearGradient id="xpGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#2dd4bf" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-extrabold text-ink dark:text-white leading-none">{level}</span>
        <span className="text-2xs text-ink-subtle dark:text-slate-400 font-medium">LVL</span>
      </div>
    </div>
  );
}
