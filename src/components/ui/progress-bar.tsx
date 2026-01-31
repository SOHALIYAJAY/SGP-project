import { cn } from "@/lib/utils";

type ProgressVariant = "default" | "success" | "warning" | "danger" | "info";

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: ProgressVariant;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  label?: string;
  className?: string;
  animated?: boolean;
}

const barVariantStyles: Record<ProgressVariant, string> = {
  default: "bg-gradient-primary",
  success: "bg-gradient-success",
  warning: "bg-gradient-warning",
  danger: "bg-gradient-danger",
  info: "bg-info",
};

const sizeStyles: Record<"sm" | "md" | "lg", string> = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

export function ProgressBar({
  value,
  max = 100,
  variant = "default",
  size = "md",
  showLabel = false,
  label,
  className,
  animated = false,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full", className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-muted-foreground">
              {label}
            </span>
          )}
          {showLabel && (
            <span className="text-sm font-semibold">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div
        className={cn(
          "w-full rounded-full bg-secondary overflow-hidden",
          sizeStyles[size]
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            barVariantStyles[variant],
            animated && "animate-shimmer bg-[length:200%_100%]"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
