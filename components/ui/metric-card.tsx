"use client"

import { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ElementType
  status?: "success" | "warning" | "danger"
  trend?: {
    value: number
    label: string
  }
  delay?: number
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  status,
  trend,
  delay = 0,
}: MetricCardProps) {
  const statusColor =
    status === "success"
      ? "text-success"
      : status === "warning"
      ? "text-warning"
      : status === "danger"
      ? "text-destructive"
      : "text-muted-foreground"

  return (
    <Card
      className="opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className={`w-5 h-5 ${statusColor}`} />}
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold">{value}</div>

        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">
            {subtitle}
          </p>
        )}

        {trend && (
          <p className="mt-2 text-xs text-muted-foreground">
            <span className={trend.value >= 0 ? "text-success" : "text-destructive"}>
              {trend.value >= 0 ? "+" : ""}
              {trend.value}%
            </span>{" "}
            {trend.label}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
