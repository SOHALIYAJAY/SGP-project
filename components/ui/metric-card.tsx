"use client"

import { ReactNode, useMemo, useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedCounter } from "./animated-counter"
import { StatusSpotlightCard } from "./status-spotlight-card"

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
  const [displayValue, setDisplayValue] = useState<number>(0)
  const [isAnimating, setIsAnimating] = useState(true)

  const numValue = typeof value === "string" ? parseFloat(value.replace(/[^0-9.-]+/g, "")) : value
  const isNumeric = !isNaN(numValue)

  useEffect(() => {
    if (!isNumeric) {
      setIsAnimating(false)
      return
    }

    const duration = 1500
    const steps = 60
    const increment = numValue / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(current + increment, numValue)
      setDisplayValue(current)
      
      if (step >= steps || current >= numValue) {
        setDisplayValue(numValue)
        setIsAnimating(false)
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [numValue, isNumeric])

  const borderGlow = 
    status === "success"
      ? "border-t-4 border-success hover:shadow-[0_0_25px_rgba(34,197,94,0.6)]"
      : status === "warning"
      ? "border-t-4 border-warning hover:shadow-[0_0_25px_rgba(245,158,11,0.6)]"
      : status === "danger"
      ? "border-t-4 border-destructive hover:shadow-[0_0_25px_rgba(239,68,68,0.6)]"
      : "border-t-4 border-primary hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]"

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

  const isPeak = numValue >= 85 || value === "A-" || value === "A" || value === "A+"

  const formatDisplayValue = () => {
    if (!isNumeric) return value
    
    const valueStr = typeof value === "string" ? value : ""
    const hasPercent = valueStr.includes("%")
    const formatted = Math.round(displayValue)
    
    return hasPercent ? `${formatted}%` : formatted
  }

  return (
    <div className="opacity-0 animate-fade-in-up h-full" style={{ animationDelay: `${delay}ms` }}>
      <Card
        className={`card-hover h-full bg-card/50 backdrop-blur-sm border transition-all duration-300 ${borderGlow} ${
          isPeak ? "border-border/60" : "border-border/40"
        }`}
        style={{ ["--spark-color" as any]: sparkColor }}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className={`text-sm font-medium transition-all ${isPeak ? "font-semibold" : ""}`}>{title}</CardTitle>
          {Icon && <Icon className={`w-5 h-5 ${statusColor} transition-all ${isPeak ? "opacity-100" : "opacity-80"}`} />}
        </CardHeader>

        <CardContent>
          <div className={`text-2xl font-bold transition-all ${isPeak ? "text-foreground" : "text-foreground/90"}`}>
            {isNumeric && isAnimating ? formatDisplayValue() : value}
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
    </div>
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

  const id = useMemo(() => `spark-${data.join("-")}-${delay}`, [data, delay])

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
