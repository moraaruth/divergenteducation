"use client";
import { forwardRef } from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

// ─── Input ────────────────────────────────────────────────────────────────────

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?:  React.ReactNode;
  rightIcon?: React.ReactNode;
  error?:     boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, rightIcon, error, ...props }, ref) => (
    <div className="relative">
      {leftIcon && (
        <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-subtle">
          {leftIcon}
        </div>
      )}
      <input
        ref={ref}
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border bg-white px-4 py-2.5 text-sm font-medium text-ink",
          "placeholder:text-ink-faint placeholder:font-normal",
          "transition-all duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-0 focus-visible:border-brand-400",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-subtle",
          "dark:bg-surface-dark-subtle dark:border-surface-dark-border dark:text-slate-100 dark:placeholder:text-slate-500",
          "dark:focus-visible:ring-brand-400",
          error
            ? "border-rose-400 focus-visible:ring-rose-400 bg-rose-50 dark:bg-rose-900/10"
            : "border-surface-border hover:border-surface-border-strong",
          leftIcon  && "pl-10",
          rightIcon && "pr-10",
          className
        )}
        {...props}
      />
      {rightIcon && (
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-subtle">
          {rightIcon}
        </div>
      )}
    </div>
  )
);
Input.displayName = "Input";

// ─── Textarea ─────────────────────────────────────────────────────────────────

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }
>(({ className, error, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[100px] w-full rounded-xl border bg-white px-4 py-3 text-sm font-medium text-ink",
      "placeholder:text-ink-faint placeholder:font-normal",
      "transition-all duration-150 resize-none",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:border-brand-400",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "dark:bg-surface-dark-subtle dark:border-surface-dark-border dark:text-slate-100",
      error
        ? "border-rose-400 focus-visible:ring-rose-400"
        : "border-surface-border hover:border-surface-border-strong",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

// ─── Label ────────────────────────────────────────────────────────────────────

export const Label = forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }
>(({ className, required, children, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "block text-sm font-semibold text-ink dark:text-slate-200 mb-1.5 leading-none",
      className
    )}
    {...props}
  >
    {children}
    {required && <span className="ml-1 text-rose-500" aria-hidden="true">*</span>}
  </label>
));
Label.displayName = "Label";

// ─── FormField ────────────────────────────────────────────────────────────────

export function FormField({
  label,
  error,
  hint,
  required,
  children,
  className,
}: {
  label?:    string;
  error?:    string;
  hint?:     string;
  required?: boolean;
  children:  React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      {label && <Label required={required}>{label}</Label>}
      {children}
      {error && (
        <p className="text-xs text-rose-500 font-medium flex items-center gap-1" role="alert">
          <span aria-hidden>⚠</span> {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-xs text-ink-subtle">{hint}</p>
      )}
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "calm" | "warm" | "brand" | "joy" | "outline";
  size?:    "sm" | "md";
  dot?:     boolean;
}

const badgeVariants: Record<string, string> = {
  default: "bg-surface-subtle text-ink-muted border-surface-border dark:bg-surface-dark-subtle dark:text-slate-300 dark:border-surface-dark-border",
  success: "bg-calm-50 text-calm-700 border-calm-100 dark:bg-calm-900/30 dark:text-calm-300 dark:border-calm-800",
  warning: "bg-joy-50 text-joy-600 border-joy-100 dark:bg-joy-900/30 dark:text-joy-300 dark:border-joy-800",
  danger:  "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800",
  calm:    "bg-calm-50 text-calm-700 border-calm-100 dark:bg-calm-900/30 dark:text-calm-300 dark:border-calm-800",
  warm:    "bg-warm-50 text-warm-600 border-warm-100 dark:bg-warm-900/30 dark:text-warm-300 dark:border-warm-800",
  brand:   "bg-brand-50 text-brand-600 border-brand-100 dark:bg-brand-900/30 dark:text-brand-300 dark:border-brand-800",
  joy:     "bg-joy-50 text-joy-600 border-joy-100 dark:bg-joy-900/30 dark:text-joy-300 dark:border-joy-800",
  outline: "bg-transparent text-ink-muted border-surface-border dark:text-slate-400 dark:border-surface-dark-border",
};

const dotColors: Record<string, string> = {
  default: "bg-ink-subtle",
  success: "bg-calm-500",
  warning: "bg-joy-500",
  danger:  "bg-rose-500",
  calm:    "bg-calm-500",
  warm:    "bg-warm-500",
  brand:   "bg-brand-500",
  joy:     "bg-joy-500",
  outline: "bg-ink-subtle",
};

export const Badge = ({
  className,
  variant = "default",
  size = "sm",
  dot,
  children,
  ...props
}: BadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 rounded-full border font-semibold",
      size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm",
      badgeVariants[variant],
      className
    )}
    {...props}
  >
    {dot && (
      <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", dotColors[variant])} aria-hidden />
    )}
    {children}
  </span>
);

// ─── Avatar ───────────────────────────────────────────────────────────────────

interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  ring?: boolean;
  status?: "online" | "offline" | "busy";
}

const avatarSizes = {
  xs: "h-6 w-6 text-2xs",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

const statusColors = {
  online:  "bg-calm-500",
  offline: "bg-ink-faint",
  busy:    "bg-warm-500",
};

export const Avatar = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size = "md", ring, status, ...props }, ref) => (
  <div className="relative inline-flex shrink-0">
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full",
        avatarSizes[size],
        ring && "ring-2 ring-white ring-offset-1 dark:ring-surface-dark-card",
        className
      )}
      {...props}
    />
    {status && (
      <span
        className={cn(
          "absolute bottom-0 right-0 rounded-full border-2 border-white dark:border-surface-dark-card",
          size === "xs" || size === "sm" ? "h-2 w-2" : "h-2.5 w-2.5",
          statusColors[status]
        )}
        aria-label={`Status: ${status}`}
      />
    )}
  </div>
));
Avatar.displayName = "Avatar";

export const AvatarImage = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
));
AvatarImage.displayName = "AvatarImage";

export const AvatarFallback = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full",
      "bg-gradient-to-br from-brand-400 to-calm-400 text-white font-bold",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = "AvatarFallback";

// ─── Progress ─────────────────────────────────────────────────────────────────

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  color?:    string;
  size?:     "xs" | "sm" | "md" | "lg";
  animated?: boolean;
  label?:    string;
}

const progressSizes = {
  xs: "h-1",
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3",
};

export const Progress = forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, color = "bg-brand-500", size = "sm", animated, label, ...props }, ref) => (
  <div className="w-full">
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative w-full overflow-hidden rounded-full bg-surface-subtle dark:bg-surface-dark-subtle",
        progressSizes[size],
        className
      )}
      aria-label={label}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full rounded-full transition-all duration-500 ease-out-expo",
          animated && "animate-pulse-soft",
          color
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  </div>
));
Progress.displayName = "Progress";

// ─── Divider ──────────────────────────────────────────────────────────────────

export function Divider({ label, className }: { label?: string; className?: string }) {
  if (!label) {
    return <hr className={cn("border-surface-border dark:border-surface-dark-border", className)} />;
  }
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <hr className="flex-1 border-surface-border dark:border-surface-dark-border" />
      <span className="text-xs font-semibold text-ink-subtle uppercase tracking-wider">{label}</span>
      <hr className="flex-1 border-surface-border dark:border-surface-dark-border" />
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("skeleton animate-shimmer", className)}
      aria-hidden="true"
      {...props}
    />
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?:        React.ReactNode;
  title:        string;
  description?: string;
  action?:      React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {icon && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-subtle dark:bg-surface-dark-subtle text-3xl">
          {icon}
        </div>
      )}
      <h3 className="text-base font-bold text-ink dark:text-slate-200 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-ink-muted dark:text-slate-400 max-w-xs leading-relaxed mb-6">{description}</p>
      )}
      {action}
    </div>
  );
}
