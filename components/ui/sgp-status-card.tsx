"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./card"
import { Button } from "./button"
import { cn } from "@/lib/utils"

export type SGPStatus = "success" | "warning" | "risk" | "error" | "neutral"

interface SGPStatusCardProps {
  id: string
  title: string
  description?: string
  status: SGPStatus
  progress: number
  progressLabel?: string
  progressValue?: string
  className?: string
}

const STATUS_MAP: Record<SGPStatus, { color: string; btnLabel: string }> = {
  success: { color: "#22c55e", btnLabel: "View" },
  warning: { color: "#f59e0b", btnLabel: "Investigate" },
  risk: { color: "#f97316", btnLabel: "Mitigate" },
  error: { color: "#ef4444", btnLabel: "Resolve" },
  neutral: { color: "#3b82f6", btnLabel: "Details" },
}

export function SGPStatusCard({
  id,
  title,
  description,
  status,
  progress,
  progressLabel,
  progressValue,
  className,
}: SGPStatusCardProps) {
  const mapping = STATUS_MAP[status]

  // set CSS variables for Tailwind arbitrary utilities
  const rootStyle: React.CSSProperties = {
    ["--sgp-accent" as any]: mapping.color,
    ["--sgp-accent-rgb" as any]: mapping.color.replace("#", ""),
    ["--sgp-text" as any]: mapping.color,
  }

  const pct = Math.max(0, Math.min(100, Math.round(progress)))

  return (
    <Card
      id={id}
      className={cn("overflow-hidden", className)}
      style={rootStyle}
      data-status={status}
    >
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </CardHeader>

      <CardContent>
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "var(--sgp-accent)" }}
              />
              <span className="text-sm text-muted-foreground">{progressLabel}</span>
            </div>
            <div className="text-sm font-medium text-card-foreground">{progressValue}</div>
          </div>

          <div className="w-full bg-secondary/20 rounded-full h-2 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, background: "var(--sgp-accent)" }}
            />
          </div>
        </div>

        <div className="text-xs text-muted-foreground">Status: <span className="font-medium" style={{ color: "var(--sgp-accent)" }}>{status}</span></div>
      </CardContent>

      <CardFooter>
        <div className="ml-auto">
          <Button className="bg-[var(--sgp-accent)] text-white hover:opacity-95">{mapping.btnLabel}</Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default SGPStatusCard
