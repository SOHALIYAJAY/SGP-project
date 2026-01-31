import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type KpiVariant = "default" | "success" | "warning" | "danger" | "info";

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  variant?: KpiVariant;
  trend?: {
    value: number;
    label: string;
  };
  className?: string;
  children?: ReactNode;
}

const variantStyles: Record<KpiVariant, string> = {
  default: "kpi-card",
  success: "kpi-card kpi-card-success",
  warning: "kpi-card kpi-card-warning",
  danger: "kpi-card kpi-card-danger",
  info: "kpi-card",
};

const iconVariantStyles: Record<KpiVariant, string> = {
  default: "bg-primary/20 text-primary",
  success: "bg-success/20 text-success",
  warning: "bg-warning/20 text-warning",
  danger: "bg-destructive/20 text-destructive",
  info: "bg-info/20 text-info",
};

export function KpiCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = "default",
  trend,
  className,
  children,
}: KpiCardProps) {
  return (
    <div className={cn(variantStyles[variant], "hover-lift", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center",
              iconVariantStyles[variant]
            )}
          >
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-4 flex items-center gap-2">
          <span
            className={cn(
              "text-sm font-medium",
              trend.value >= 0 ? "text-success" : "text-destructive"
            )}
          >
            {trend.value >= 0 ? "+" : ""}
            {trend.value}%
          </span>
          <span className="text-xs text-muted-foreground">{trend.label}</span>
        </div>
      )}
      {children}
    </div>
  );
}
