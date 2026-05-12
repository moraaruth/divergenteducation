import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  hover?: boolean;
  gradient?: "calm" | "warm" | "brand" | "none";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, glass, hover, gradient = "none", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-surface-border bg-white p-6 shadow-card dark:bg-surface-dark-muted dark:border-surface-dark-border",
        glass && "glass dark:glass-dark",
        hover && "transition-all duration-200 hover:shadow-soft hover:-translate-y-0.5 cursor-pointer",
        gradient === "calm"  && "bg-gradient-to-br from-calm-50 to-brand-50",
        gradient === "warm"  && "bg-gradient-to-br from-warm-50 to-joy-50",
        gradient === "brand" && "bg-gradient-to-br from-brand-50 to-calm-50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

Card.displayName = "Card";

export const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mb-4 flex items-center justify-between", className)} {...props} />
);

export const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("text-lg font-bold text-slate-800 dark:text-slate-100", className)} {...props} />
);

export const CardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-slate-500 dark:text-slate-400", className)} {...props} />
);

export const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("", className)} {...props} />
);

export const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-4 flex items-center gap-3", className)} {...props} />
);
