"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn, MOOD_CONFIG } from "@/lib/utils";

interface MoodPickerProps {
  value?: number;
  onChange?: (mood: number) => void;
  size?: "sm" | "md" | "lg";
}

export function MoodPicker({ value, onChange, size = "md" }: MoodPickerProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const sizes = { sm: "text-2xl", md: "text-4xl", lg: "text-5xl" };
  const containerSizes = { sm: "h-12 w-12", md: "h-16 w-16", lg: "h-20 w-20" };

  return (
    <div className="flex items-center gap-3" role="group" aria-label="How are you feeling?">
      {([1, 2, 3, 4, 5] as const).map((mood) => {
        const config = MOOD_CONFIG[mood];
        const isSelected = value === mood;
        const isHovered = hovered === mood;

        return (
          <motion.button
            key={mood}
            type="button"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange?.(mood)}
            onMouseEnter={() => setHovered(mood)}
            onMouseLeave={() => setHovered(null)}
            aria-label={config.label}
            aria-pressed={isSelected}
            className={cn(
              "flex flex-col items-center gap-1 rounded-2xl p-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
              containerSizes[size],
              isSelected && "ring-2 ring-offset-2",
              !isSelected && "opacity-60 hover:opacity-100"
            )}
            style={{ backgroundColor: isSelected || isHovered ? config.bg : "transparent" }}
          >
            <span className={sizes[size]} role="img" aria-hidden>
              {config.emoji}
            </span>
            {size !== "sm" && (
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                {config.label}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
