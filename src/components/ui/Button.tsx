"use client";
import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        primary:   "bg-brand-500 text-white hover:bg-brand-600 active:scale-[0.98] shadow-sm hover:shadow-glow",
        secondary: "bg-surface-subtle text-slate-700 hover:bg-surface-border dark:bg-surface-dark-muted dark:text-slate-200",
        calm:      "bg-calm-500 text-white hover:bg-calm-600 active:scale-[0.98] shadow-sm hover:shadow-glow-calm",
        outline:   "border-2 border-brand-200 text-brand-600 hover:bg-brand-50 dark:border-brand-700 dark:text-brand-300",
        ghost:     "text-slate-600 hover:bg-surface-subtle dark:text-slate-300 dark:hover:bg-surface-dark-muted",
        danger:    "bg-red-500 text-white hover:bg-red-600 active:scale-[0.98]",
        warm:      "bg-warm-500 text-white hover:bg-warm-600 active:scale-[0.98]",
        joy:       "bg-joy-400 text-slate-900 hover:bg-joy-500 active:scale-[0.98]",
      },
      size: {
        xs: "h-7 px-3 text-xs",
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg",
        icon: "h-10 w-10",
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
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        )}
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";
export { buttonVariants };
