import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  className?: string;
  action?: React.ReactNode;
}

export function SectionHeader({
  title,
  subtitle,
  icon: Icon,
  className,
  action,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between mb-6", className)}>
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        )}
        <div>
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      {action}
    </div>
  );
}
