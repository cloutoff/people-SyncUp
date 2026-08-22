import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "strong" | "subtle";
};

export function GlassCard({ children, className, variant = "default" }: GlassCardProps) {
  const variantClass =
    variant === "strong"
      ? "glass-strong"
      : variant === "subtle"
        ? "glass-subtle"
        : "glass-card";

  return (
    <div className={cn(variantClass, "p-6", className)}>
      {children}
    </div>
  );
}

type GlassKpiCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: "up" | "down" | "neutral";
  className?: string;
};

export function GlassKpiCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  className,
}: GlassKpiCardProps) {
  return (
    <div className={cn("glass-card p-5 transition-all hover:scale-[1.02]", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <p className="text-xs font-medium tracking-wide uppercase text-muted-foreground/80">
            {title}
          </p>
          <p className="text-3xl font-bold tracking-tight text-foreground">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {icon}
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-3 flex items-center gap-1">
          {trend === "up" && (
            <span className="text-xs font-medium text-emerald-600">↑ Trending up</span>
          )}
          {trend === "down" && (
            <span className="text-xs font-medium text-rose-500">↓ Trending down</span>
          )}
          {trend === "neutral" && (
            <span className="text-xs font-medium text-muted-foreground">→ Stable</span>
          )}
        </div>
      )}
    </div>
  );
}
