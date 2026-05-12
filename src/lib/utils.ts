import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatXP(xp: number): string {
  if (xp >= 1000) return `${(xp / 1000).toFixed(1)}k`;
  return xp.toString();
}

export function getLevelFromXP(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

export function getXPForNextLevel(level: number): number {
  return Math.pow(level, 2) * 100;
}

export function getLevelProgress(xp: number): number {
  const level = getLevelFromXP(xp);
  const currentLevelXP = getXPForNextLevel(level - 1);
  const nextLevelXP = getXPForNextLevel(level);
  return ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
}

export const MOOD_CONFIG = {
  1: { label: "Overwhelmed", emoji: "😰", color: "#ef4444", bg: "#fef2f2" },
  2: { label: "Sad",         emoji: "😔", color: "#f97316", bg: "#fff7ed" },
  3: { label: "Okay",        emoji: "😐", color: "#eab308", bg: "#fefce8" },
  4: { label: "Good",        emoji: "😊", color: "#22c55e", bg: "#f0fdf4" },
  5: { label: "Amazing",     emoji: "🤩", color: "#6366f1", bg: "#f0f4ff" },
} as const;

export function getMoodConfig(mood: 1 | 2 | 3 | 4 | 5) {
  return MOOD_CONFIG[mood];
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", year: "numeric",
  }).format(new Date(date));
}

export function formatTime(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric", minute: "2-digit", hour12: true,
  }).format(new Date(date));
}

export function getGreeting(name: string): string {
  const hour = new Date().getHours();
  if (hour < 12) return `Good morning, ${name}! ☀️`;
  if (hour < 17) return `Good afternoon, ${name}! 🌤️`;
  return `Good evening, ${name}! 🌙`;
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}
