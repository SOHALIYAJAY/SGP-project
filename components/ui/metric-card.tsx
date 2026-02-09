"use client"

import { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedCounter } from "./animated-counter"
import { GlowCard } from "./glow-card"

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ElementType
  status?: "success" | "warning" | "danger" | "neutral"
  trend?: {
    value: number
    label: string
  }
  sparkline?: number[]
  delay?: number
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  status,
  trend,
  sparkline,
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

  const sparkColor =
    status === "success"
      ? "#22C55E"
      : status === "warning"
      ? "#F59E0B"
      : status === "danger"
      ? "#EF4444"
      : "#06B6D4"

  return (
    <GlowCard
      status={status || "neutral"}
      className="opacity-0 animate-fade-in-up h-full"
    >
      <Card
        className={`card-hover h-full bg-transparent border-0 ${status ? `status-${status}` : ""}`}
        style={{ animationDelay: `${delay}ms`, ["--spark-color" as any]: sparkColor }}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {Icon && <Icon className={`w-5 h-5 ${statusColor}`} />}
        </CardHeader>

        <CardContent>
          <div className="text-2xl font-bold">
            {typeof value === "number" ? (
              <AnimatedCounter value={value as number} />
            ) : typeof value === "string" && value.trim().endsWith("%") && !isNaN(Number(value.replace(/[^0-9.-]+/g, ""))) ? (
              <>
                <AnimatedCounter value={Number(value.replace(/[^0-9.-]+/g, ""))} />%
              </>
            ) : (
              value
            )}
          </div>

          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">
              {subtitle}
            </p>
          )}

          {sparkline && sparkline.length > 0 && (
            <div className="mt-3" style={{ ["--spark-color" as any]: sparkColor }}>
              <Sparkline data={sparkline} delay={delay} />
            </div>
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
    </GlowCard>
  )
}

function Sparkline({
  data,
  color = "#06B6D4",
  delay = 0,
}: {
  data: number[]
  color?: string
  delay?: number
}) {
  const w = 120
  const h = 36
  const n = data.length
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max === min ? 1 : max - min

  const pathD = data
    .map((d, i) => {
      const x = (i / Math.max(1, n - 1)) * w
      const y = h - ((d - min) / range) * h
      return `${i === 0 ? "M" : "L"} ${x} ${y}`
    })
    .join(" ")

  const id = `spark-${Math.random().toString(36).slice(2)}`

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none" style={{ display: "block" }}>
      <defs>
        <linearGradient id={id} x1="0" x2="1">
          <stop offset="0%" stopColor={`var(--spark-color, ${color})`} stopOpacity="0.16" />
          <stop offset="100%" stopColor={`var(--spark-color, ${color})`} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={pathD} fill={`url(#${id})`} stroke="none" />
      <path
        d={pathD}
        fill="none"
        stroke={`var(--spark-color, ${color})`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
      >
        <animate
          attributeName="stroke-dashoffset"
          from="1"
          to="0"
          dur="0.8s"
          begin={`${delay}ms`}
          fill="freeze"
        />
      </path>
    </svg>
  )
}
