"use client";
import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 font-semibold",
    "transition-all duration-150 ease-smooth select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:scale-[0.97]",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-brand-500 text-white",
          "hover:bg-brand-600 hover:shadow-glow",
          "shadow-sm",
        ].join(" "),

        secondary: [
          "bg-surface-subtle text-ink border border-surface-border",
          "hover:bg-surface-border hover:border-surface-border-strong",
          "dark:bg-surface-dark-subtle dark:text-slate-200 dark:border-surface-dark-border",
          "dark:hover:bg-surface-dark-border",
        ].join(" "),

        calm: [
          "bg-calm-500 text-white",
          "hover:bg-calm-600 hover:shadow-glow-calm",
          "shadow-sm",
        ].join(" "),

        outline: [
          "border-2 border-brand-200 text-brand-600 bg-transparent",
          "hover:bg-brand-50 hover:border-brand-300",
          "dark:border-brand-700 dark:text-brand-300 dark:hover:bg-brand-950",
        ].join(" "),

        ghost: [
          "text-ink-muted bg-transparent",
          "hover:bg-surface-subtle hover:text-ink",
          "dark:text-slate-400 dark:hover:bg-surface-dark-subtle dark:hover:text-slate-200",
        ].join(" "),

        danger: [
          "bg-rose-500 text-white",
          "hover:bg-rose-600",
          "shadow-sm",
        ].join(" "),

        warm: [
          "bg-warm-500 text-white",
          "hover:bg-warm-600 hover:shadow-glow-warm",
          "shadow-sm",
        ].join(" "),

        joy: [
          "bg-joy-400 text-slate-900 font-bold",
          "hover:bg-joy-500 hover:shadow-glow-joy",
          "shadow-sm",
        ].join(" "),

        // Premium glass variant
        glass: [
          "glass text-slate-700 border-white/50",
          "hover:bg-white/80",
          "dark:text-slate-200",
        ].join(" "),

        // Gradient variant
        gradient: [
          "bg-gradient-hero text-white",
          "hover:opacity-90 hover:shadow-glow",
          "shadow-md",
        ].join(" "),
      },

      size: {
        "2xs": "h-6 px-2.5 text-2xs rounded-lg",
        xs:    "h-7 px-3 text-xs rounded-lg",
        sm:    "h-9 px-4 text-sm rounded-xl",
        md:    "h-11 px-5 text-sm rounded-xl",
        lg:    "h-12 px-6 text-base rounded-2xl",
        xl:    "h-14 px-8 text-lg rounded-2xl",
        "2xl": "h-16 px-10 text-xl rounded-3xl",
        icon:  "h-10 w-10 rounded-xl",
        "icon-sm": "h-8 w-8 rounded-lg",
        "icon-lg": "h-12 w-12 rounded-2xl",
      },

      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, fullWidth, asChild, loading, children, disabled, leftIcon, rightIcon, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-4 w-4 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            <span>{children}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0" aria-hidden="true">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0" aria-hidden="true">{rightIcon}</span>}
          </>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";
export { buttonVariants };
