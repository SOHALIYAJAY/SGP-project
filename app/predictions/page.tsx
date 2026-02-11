"use client"

import React, { useState, useEffect } from "react"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { useExportPDF } from "@/hooks/use-export-pdf"
import { StatusSpotlightCard } from "@/components/ui/status-spotlight-card"
import { CustomTooltip } from "@/components/ui/custom-tooltip"

import {
  TrendingUp,
  Target,
  DollarSign,
  Users,
  Download,
  Plus,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  ComposedChart,
  Bar,
  Legend,
} from "recharts"
import ChartInsight from '@/components/chart-insight'

const trajectoryData = [
  { month: "Now", revenue: 7.5, customers: 1500, marketShare: 2.5 },
  { month: "3M", revenue: 9.2, customers: 1950, marketShare: 3.2 },
  { month: "6M", revenue: 11.8, customers: 2530, marketShare: 4.1 },
  { month: "12M", revenue: 16.4, customers: 3450, marketShare: 5.5 },
  { month: "24M", revenue: 28.2, customers: 5800, marketShare: 8.2 },
]

const scenarioData = [
  { period: "Q1 2026", optimistic: 9.5, baseline: 8.5, conservative: 7.8 },
  { period: "Q2 2026", optimistic: 11.2, baseline: 9.8, conservative: 8.5 },
  { period: "Q3 2026", optimistic: 13.5, baseline: 11.5, conservative: 9.8 },
  { period: "Q4 2026", optimistic: 16.8, baseline: 13.8, conservative: 11.2 },
  { period: "Q1 2027", optimistic: 21.0, baseline: 16.5, conservative: 13.0 },
  { period: "Q2 2027", optimistic: 26.5, baseline: 20.0, conservative: 15.5 },
]

const growthFactors = [
  { factor: "Market Demand", score: 92 },
  { factor: "Product Fit", score: 88 },
  { factor: "Team Capacity", score: 78 },
  { factor: "Capital Access", score: 85 },
  { factor: "Tech Scalability", score: 90 },
  { factor: "Brand Recognition", score: 72 },
]

const predictions = [
  {
    period: "3 Months",
    confidence: 94,
    metrics: [
      { label: "Revenue", value: "$9.2M", change: 23, positive: true },
      { label: "Customers", value: "1,950", change: 30, positive: true },
    ],
    status: "success" as const,
  },
  {
    period: "6 Months",
    confidence: 88,
    metrics: [
      { label: "Revenue", value: "$11.8M", change: 57, positive: true },
      { label: "Customers", value: "2,530", change: 69, positive: true },
    ],
    status: "success" as const,
  },
  {
    period: "12 Months",
    confidence: 78,
    metrics: [
      { label: "Revenue", value: "$16.4M", change: 119, positive: true },
      { label: "Customers", value: "3,450", change: 130, positive: true },
    ],
    status: "warning" as const,
  },
  {
    period: "24 Months",
    confidence: 65,
    metrics: [
      { label: "Revenue", value: "$28.2M", change: 276, positive: true },
      { label: "Customers", value: "5,800", change: 287, positive: true },
    ],
    status: "warning" as const,
  },
]

export default function PredictionsPage() {
  const { isExporting, handleExport } = useExportPDF(
    "predictions-content",
    "Growth_Predictions_Report.pdf",
    "Business Analysis & Prediction Report",
    "TechCorp Inc."
  )

  return (
    <div className="min-h-screen py-2">
      <SectionWrapper>
        {/* Header */}
        <div className="mb-8">
          <div className="opacity-0 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-1">
              Growth Predictions
            </h1>
            <p className="text-sm text-muted-foreground">
              AI-powered forecasts based on current performance
            </p>
          </div>
        </div>

        {/* Main Content Container for PDF Export */}
        <div id="predictions-content">

        {/* Summary Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <SummaryCard
            icon={TrendingUp}
            label="Growth"
            value={30}
            suffix="%"
            color="success"
            delay={100}
          />
          <SummaryCard
            icon={DollarSign}
            label="Revenue Target"
            value={28.2}
            prefix="$"
            suffix="M"
            color="success"
            delay={200}
          />
          <SummaryCard
            icon={Users}
            label="Customer Target"
            value={5800}
            color="success"
            delay={300}
          />
          <SummaryCard
            icon={Target}
            label="Confidence"
            value={81}
            suffix="%"
            color="warning"
            delay={400}
          />
        </div>

        {/* Main Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Growth Trajectory Chart */}
          <div className="lg:col-span-2 glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5 relative">
            <div className="flex items-start justify-between gap-4 mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Growth Trajectory
              </h3>
              <button className="p-1.5 rounded-lg bg-secondary/40 hover:bg-secondary/60 text-muted-foreground hover:text-foreground transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={trajectoryData}>
                  <defs>
                    <linearGradient id="colorRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--chart-3)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="var(--chart-3)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis
                    dataKey="month"
                    stroke="var(--muted-foreground)"
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                  />
                  <YAxis
                    yAxisId="left"
                    stroke="var(--muted-foreground)"
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                    tickFormatter={(value) => `$${value}M`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#64748B"
                    tick={{ fill: "#64748B", fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--chart-3)"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorRevenueGrad)"
                    name="Revenue ($M)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="customers"
                    stroke="var(--chart-2)"
                    strokeWidth={3}
                    dot={{ fill: "var(--chart-2)", strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: "var(--chart-2)", strokeWidth: 2 }}
                    name="Customers"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Growth Factors - Horizontal Bars */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-6 relative">
            <div className="flex items-start justify-between gap-4 mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Growth Factors
              </h3>
            </div>
            <div className="space-y-4">
              {growthFactors.map((item) => {
                const getColor = (score: number) => {
                  if (score >= 85) return "bg-success"
                  if (score >= 70) return "bg-warning"
                  return "bg-destructive"
                }
                return (
                  <div key={item.factor} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{item.factor}</span>
                      <span className="text-sm font-semibold text-card-foreground">{item.score}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${getColor(item.score)} transition-all duration-500`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Scenario Analysis */}
        <div className="glass-card rounded-xl p-6 mb-8 opacity-0 animate-fade-in-up stagger-5 relative">
          <div className="flex items-start justify-between gap-4 mb-6">
            <h3 className="text-lg font-semibold text-card-foreground">
              Scenario Analysis
            </h3>
            <button className="p-1.5 rounded-lg bg-secondary/40 hover:bg-secondary/60 text-muted-foreground hover:text-foreground transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={scenarioData}>
                <defs>
                  <linearGradient id="colorOptimistic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-3)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--chart-3)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorConservative" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis
                    dataKey="period"
                    stroke="var(--muted-foreground)"
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                  />
                  <YAxis
                    stroke="var(--muted-foreground)"
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                    tickFormatter={(value) => `$${value}M`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      backdropFilter: "blur(12px)",
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    }}
                    labelStyle={{ color: "var(--foreground)" }}
                    formatter={(value: number) => [`$${value}M`, ""]}
                  />
                <Area
                  type="monotone"
                  dataKey="optimistic"
                  stroke="var(--chart-3)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorOptimistic)"
                  name="Optimistic"
                />
                <Area
                  type="monotone"
                  dataKey="baseline"
                  stroke="var(--chart-2)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorBaseline)"
                  name="Baseline"
                />
                <Area
                  type="monotone"
                  dataKey="conservative"
                  stroke="var(--chart-4)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorConservative)"
                  name="Conservative"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* Prediction Timeline */}
        <div className="mb-4 opacity-0 animate-fade-in-up stagger-6">
          <h3 className="text-xl font-semibold text-foreground">
            Timeline
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-0">
          {predictions.map((prediction, index) => (
            <PredictionCard
              key={prediction.period}
              {...prediction}
              delay={700 + index * 100}
            />
          ))}
        </div>

        </div>
      </SectionWrapper>
    </div>
  )
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  prefix = "",
  suffix = "",
  color = "primary",
  delay = 0,
}: {
  icon: React.ElementType
  label: string
  value: number
  prefix?: string
  suffix?: string
  color?: "primary" | "success" | "warning" | "accent"
  delay?: number
}) {
  const [displayValue, setDisplayValue] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    const duration = 1500
    const steps = 60
    const increment = value / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(current + increment, value)
      setDisplayValue(current)
      
      if (step >= steps || current >= value) {
        setDisplayValue(value)
        setIsAnimating(false)
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  const colorStyles = {
    primary: { border: "border-t-4 border-primary hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]", icon: "text-primary bg-primary/10", sparkColor: "#06B6D4", sparkData: [20, 22, 24, 26, 28, 29, 30] },
    success: { border: "border-t-4 border-success hover:shadow-[0_0_25px_rgba(34,197,94,0.6)]", icon: "text-success bg-success/10", sparkColor: "#22C55E", sparkData: [18, 20, 22, 24, 26, 27, 28.2] },
    warning: { border: "border-t-4 border-warning hover:shadow-[0_0_25px_rgba(245,158,11,0.6)]", icon: "text-warning bg-warning/10", sparkColor: "#F59E0B", sparkData: [4200, 4600, 5000, 5300, 5600, 5750, 5800] },
    accent: { border: "border-t-4 border-accent hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]", icon: "text-accent bg-accent/10", sparkColor: "#22D3EE", sparkData: [88, 86, 84, 83, 82, 81.5, 81] },
  }

  const style = colorStyles[color]

  const helpTexts: Record<string, string> = {
    "Growth": "Projected growth over next 24 months from baseline",
    "Revenue Target": "Peak revenue forecast by end of 24 months",
    "Customer Target": "Expected total customer base in 2 years",
    "Confidence": "Model confidence level based on historical accuracy",
  }

  const formatValue = (val: number) => {
    if (value % 1 !== 0) return val.toFixed(1)
    return Math.round(val).toString()
  }

  return (
    <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: `${delay}ms` }}>
      <div className={`relative glass-card rounded-xl p-6 overflow-visible group transition-all duration-300 ${style.border}`}>
        <div className="flex items-start justify-between mb-4">
          <span className="text-sm text-muted-foreground">{label}</span>
          <div className={`p-2 rounded-lg ${style.icon}`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
        <div className="text-3xl font-bold text-card-foreground mb-2">
          {prefix}{formatValue(displayValue)}{suffix}
        </div>
        <p className="text-xs text-muted-foreground/80 leading-relaxed mb-3">
          {helpTexts[label] || "Key metric for prediction analysis"}
        </p>
        <Sparkline data={style.sparkData} color={style.sparkColor} delay={delay} />
      </div>
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

  const id = `spark-${data.join("-")}-${delay}`

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none" style={{ display: "block" }}>
      <defs>
        <linearGradient id={id} x1="0" x2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.16" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={pathD} fill={`url(#${id})`} stroke="none" />
      <path
        d={pathD}
        fill="none"
        stroke={color}
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

function PredictionCard({
  period,
  confidence,
  metrics,
  status,
  delay = 0,
}: {
  period: string
  confidence: number
  metrics: { label: string; value: string; change: number; positive: boolean }[]
  status: "success" | "warning" | "danger"
  delay?: number
}) {
  const [isHovered, setIsHovered] = React.useState(false)

  const borderGlow = {
    success: "border-t-4 border-success hover:shadow-[0_0_25px_rgba(34,197,94,0.6)]",
    warning: "border-t-4 border-warning hover:shadow-[0_0_25px_rgba(245,158,11,0.6)]",
    danger: "border-t-4 border-destructive hover:shadow-[0_0_25px_rgba(239,68,68,0.6)]",
  }

  const badgeColor = {
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    danger: "bg-destructive/10 text-destructive",
  }

  const sparklineColor = {
    success: "#22C55E",
    warning: "#F59E0B",
    danger: "#EF4444",
  }

  const sparklineData = {
    success: [45, 50, 48, 55, 60, 70, 80],
    warning: [60, 65, 62, 68, 72, 75, 78],
    danger: [70, 72, 75, 73, 76, 79, 82],
  }

  return (
    <div className="opacity-0 animate-fade-in-up h-full" style={{ animationDelay: `${delay}ms` }}>
      <div
        className={`group relative glass-card rounded-xl p-6 overflow-visible h-full flex flex-col transition-all duration-300 ${borderGlow[status]}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-start justify-between mb-4">
          <span className="font-semibold text-card-foreground">{period}</span>
          <div className="flex items-center gap-2">
            {isHovered && (
              <svg width="40" height="20" className="animate-fade-in">
                <polyline points={sparklineData[status].map((v, i) => `${(i / 6) * 40},${20 - v / 4}`).join(' ')} fill="none" stroke={sparklineColor[status]} strokeWidth="1.5" />
              </svg>
            )}
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${badgeColor[status]}`}>
              {confidence}%
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{metric.label}</span>
                <span className="font-medium text-card-foreground">{metric.value}</span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    metric.positive ? "bg-success" : "bg-destructive"
                  }`}
                  style={{ width: `${Math.min(metric.change, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
