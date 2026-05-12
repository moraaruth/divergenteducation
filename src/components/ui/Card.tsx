import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?:    boolean;
  hover?:    boolean;
  bordered?: boolean;
  padding?:  "none" | "sm" | "md" | "lg" | "xl";
  gradient?: "none" | "calm" | "warm" | "brand" | "joy" | "mesh" | "dark";
  elevated?: boolean;
}

const paddingMap = {
  none: "",
  sm:   "p-4",   /* 16px = 2 × 8pt */
  md:   "p-4",   /* 16px = 2 × 8pt — was p-5 (20px), off-grid */
  lg:   "p-6",   /* 24px = 3 × 8pt */
  xl:   "p-8",   /* 32px = 4 × 8pt */
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      glass,
      hover,
      bordered = true,
      padding = "lg",
      gradient = "none",
      elevated,
      children,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        // Base
        "rounded-2xl bg-white dark:bg-surface-dark-card",
        // Border
        bordered && "border border-surface-border dark:border-surface-dark-border",
        // Shadow
        elevated ? "shadow-lg" : "shadow-card",
        // Padding
        paddingMap[padding],
        // Glass
        glass && "glass dark:glass",
        // Hover
        hover && "card-hover cursor-pointer",
        // Gradients
        gradient === "calm"  && "bg-gradient-to-br from-calm-25 via-white to-brand-25 dark:from-calm-900/20 dark:via-surface-dark-card dark:to-brand-900/20",
        gradient === "warm"  && "bg-gradient-to-br from-warm-25 via-white to-joy-25 dark:from-warm-900/20 dark:via-surface-dark-card dark:to-joy-900/20",
        gradient === "brand" && "bg-gradient-to-br from-brand-25 via-white to-calm-25 dark:from-brand-900/20 dark:via-surface-dark-card dark:to-calm-900/20",
        gradient === "joy"   && "bg-gradient-to-br from-joy-25 via-white to-warm-25 dark:from-joy-900/20 dark:via-surface-dark-card dark:to-warm-900/20",
        gradient === "mesh"  && "bg-gradient-mesh",
        gradient === "dark"  && "bg-gradient-dark text-white border-transparent",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
Card.displayName = "Card";

export const CardHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mb-4 flex items-center justify-between gap-3", className)}
    {...props}
  />
);

export const CardTitle = ({
  className,
  as: Tag = "h3",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { as?: "h2" | "h3" | "h4" }) => (
  <Tag
    className={cn(
      "text-base font-bold leading-snug text-ink dark:text-slate-100",
      className
    )}
    {...props}
  />
);

export const CardDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn("text-sm text-ink-muted dark:text-slate-400 leading-relaxed", className)}
    {...props}
  />
);

export const CardContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("", className)} {...props} />
);

export const CardFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "mt-4 flex items-center gap-3 pt-4 border-t border-surface-border dark:border-surface-dark-border",
      className
    )}
    {...props}
  />
);

// ── Stat Card ─────────────────────────────────────────────────────────────

interface StatCardProps {
  label:     string;
  value:     string | number;
  icon?:     React.ReactNode;
  change?:   string;
  positive?: boolean;
  color?:    string;
  bg?:       string;
  className?: string;
}

export function StatCard({ label, value, icon, change, positive, color = "text-brand-500", bg = "bg-brand-50", className }: StatCardProps) {
  return (
    <Card hover className={cn("group", className)}>
      <div className="flex items-start justify-between mb-3">
        {icon && (
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110", bg)}>
            <span className={cn("h-5 w-5", color)}>{icon}</span>
          </div>
        )}
        {change && (
          <span className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
            positive !== false ? "bg-calm-50 text-calm-700 dark:bg-calm-900/30 dark:text-calm-400" : "bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400"
          )}>
            {positive !== false ? "↑" : "↓"} {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-extrabold text-ink dark:text-white tracking-tight">{value}</p>
      <p className="text-xs text-ink-subtle dark:text-slate-400 mt-0.5 font-medium">{label}</p>
    </Card>
  );
}
