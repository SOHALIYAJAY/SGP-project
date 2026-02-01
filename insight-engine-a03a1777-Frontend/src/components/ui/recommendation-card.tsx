import { cn } from "@/lib/utils";
import { LucideIcon, Lightbulb, AlertTriangle, CheckCircle2, Info } from "lucide-react";

type RecommendationType = "suggestion" | "warning" | "success" | "info";

interface RecommendationCardProps {
  title: string;
  description: string;
  type?: RecommendationType;
  icon?: LucideIcon;
  priority?: "high" | "medium" | "low";
  className?: string;
}

const typeConfig: Record<
  RecommendationType,
  { icon: LucideIcon; bgClass: string; iconClass: string; borderClass: string }
> = {
  suggestion: {
    icon: Lightbulb,
    bgClass: "bg-primary/10",
    iconClass: "text-primary",
    borderClass: "border-primary/30",
  },
  warning: {
    icon: AlertTriangle,
    bgClass: "bg-warning/10",
    iconClass: "text-warning",
    borderClass: "border-warning/30",
  },
  success: {
    icon: CheckCircle2,
    bgClass: "bg-success/10",
    iconClass: "text-success",
    borderClass: "border-success/30",
  },
  info: {
    icon: Info,
    bgClass: "bg-info/10",
    iconClass: "text-info",
    borderClass: "border-info/30",
  },
};

const priorityStyles: Record<"high" | "medium" | "low", string> = {
  high: "bg-destructive/15 text-destructive",
  medium: "bg-warning/15 text-warning",
  low: "bg-success/15 text-success",
};

export function RecommendationCard({
  title,
  description,
  type = "suggestion",
  icon,
  priority,
  className,
}: RecommendationCardProps) {
  const config = typeConfig[type];
  const Icon = icon || config.icon;

  return (
    <div
      className={cn(
        "glass-card-hover p-5 border",
        config.bgClass,
        config.borderClass,
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
            config.bgClass
          )}
        >
          <Icon className={cn("w-5 h-5", config.iconClass)} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-semibold text-foreground">{title}</h4>
            {priority && (
              <span
                className={cn(
                  "text-xs font-medium px-2 py-0.5 rounded-full capitalize",
                  priorityStyles[priority]
                )}
              >
                {priority}
              </span>
            )}
          </div>
          <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
