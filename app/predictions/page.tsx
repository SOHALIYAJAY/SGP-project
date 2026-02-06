"use client"

import React from "react"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { useExportPDF } from "@/hooks/use-export-pdf"
import {
  TrendingUp,
  Target,
  DollarSign,
  Users,
  Download,
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
      { label: "Market Share", value: "3.2%", change: 0.7, positive: true },
    ],
    status: "success" as const,
  },
  {
    period: "6 Months",
    confidence: 88,
    metrics: [
      { label: "Revenue", value: "$11.8M", change: 57, positive: true },
      { label: "Customers", value: "2,530", change: 69, positive: true },
      { label: "Market Share", value: "4.1%", change: 1.6, positive: true },
    ],
    status: "success" as const,
  },
  {
    period: "12 Months",
    confidence: 78,
    metrics: [
      { label: "Revenue", value: "$16.4M", change: 119, positive: true },
      { label: "Customers", value: "3,450", change: 130, positive: true },
      { label: "Market Share", value: "5.5%", change: 3, positive: true },
    ],
    status: "warning" as const,
  },
  {
    period: "24 Months",
    confidence: 65,
    metrics: [
      { label: "Revenue", value: "$28.2M", change: 276, positive: true },
      { label: "Customers", value: "5,800", change: 287, positive: true },
      { label: "Market Share", value: "8.2%", change: 5.7, positive: true },
    ],
    status: "warning" as const,
  },
]

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-xl">
        <p className="text-sm font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm flex items-center gap-2" style={{ color: entry.color }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            {entry.name}: {typeof entry.value === "number" && entry.name.includes("Revenue") ? `$${entry.value}M` : entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    )
  }
  return null
}

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
        {/* Header with Export Button */}
        <div className="mb-8 flex items-start justify-between">
          <div className="opacity-0 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-1">
              Growth Predictions
            </h1>
            <p className="text-sm text-muted-foreground">
              AI-powered forecasts based on current performance
            </p>
          </div>
          <button
            onClick={handleExport}
            disabled={isExporting}
            title="Download full analysis report (PDF)"
            className="mt-2 p-2.5 rounded-lg bg-card hover:bg-secondary/80 border border-border text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-5 h-5" />
          </button>
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
          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5 relative">
            <div className="absolute top-4 right-4">
              <ChartInsight
                title="Growth Trajectory"
                level="High"
                summary="Revenue and customer projections both strong through 2026."
                bullets={["Revenue projected to $20M by 2026", "Customer base growing to 10K+", "Growth momentum sustainable"]}
              />
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Growth Trajectory
              </h3>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={trajectoryData}>
                  <defs>
                    <linearGradient id="colorRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                  <XAxis
                    dataKey="month"
                    stroke="#64748B"
                    tick={{ fill: "#64748B", fontSize: 12 }}
                  />
                  <YAxis
                    yAxisId="left"
                    stroke="#64748B"
                    tick={{ fill: "#64748B", fontSize: 12 }}
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
                    stroke="#22C55E"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorRevenueGrad)"
                    name="Revenue ($M)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="customers"
                    stroke="#06B6D4"
                    strokeWidth={3}
                    dot={{ fill: "#06B6D4", strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: "#06B6D4", strokeWidth: 2 }}
                    name="Customers"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Growth Factors - Horizontal Bars */}
          <div className="bg-card border border-border rounded-xl p-6 opacity-0 animate-fade-in-up stagger-6">
            <div className="flex items-start justify-between gap-4 mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Growth Factors
              </h3>
              <ChartInsight
                title="Growth Factors"
                level="High"
                summary="All key factors scored above 70; strong growth potential."
                bullets={["Market potential: 92%", "Team capability: 88%", "Product-market fit: 85%"]}
              />
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
        <div className="bg-card border border-border rounded-xl p-6 mb-8 opacity-0 animate-fade-in-up stagger-5">
          <div className="flex items-start justify-between gap-4 mb-6">
            <h3 className="text-lg font-semibold text-card-foreground">
              Scenario Analysis
            </h3>
            <ChartInsight
              title="Scenario Analysis"
              level="Medium"
              summary="Baseline scenario most likely; upside and downside defined."
              bullets={["Baseline: $15M revenue by 2026", "Upside: strong growth to $22M", "Downside: market headwinds = $10M"]}
            />
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={scenarioData}>
                <defs>
                  <linearGradient id="colorOptimistic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
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
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis
                  dataKey="period"
                  stroke="#64748B"
                  tick={{ fill: "#64748B", fontSize: 12 }}
                />
                <YAxis
                  stroke="#64748B"
                  tick={{ fill: "#64748B", fontSize: 12 }}
                  tickFormatter={(value) => `$${value}M`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(17, 24, 39, 0.95)",
                    border: "1px solid #1E293B",
                    borderRadius: "8px",
                    backdropFilter: "blur(8px)",
                  }}
                  labelStyle={{ color: "#F1F5F9" }}
                  formatter={(value: number) => [`$${value}M`, ""]}
                />
                <Area
                  type="monotone"
                  dataKey="optimistic"
                  stroke="#22C55E"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorOptimistic)"
                  name="Optimistic"
                />
                <Area
                  type="monotone"
                  dataKey="baseline"
                  stroke="#06B6D4"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorBaseline)"
                  name="Baseline"
                />
                <Area
                  type="monotone"
                  dataKey="conservative"
                  stroke="#F59E0B"
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
        <div className="mb-6 opacity-0 animate-fade-in-up stagger-6">
          <h3 className="text-xl font-semibold text-foreground">
            Timeline
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
  const colorStyles = {
    primary: { border: "border-t-primary", glow: "shadow-[0_0_15px_rgba(6,182,212,0.15)]" },
    success: { border: "border-t-success", glow: "shadow-[0_0_15px_rgba(34,197,94,0.15)]" },
    warning: { border: "border-t-warning", glow: "shadow-[0_0_15px_rgba(245,158,11,0.15)]" },
    accent: { border: "border-t-accent", glow: "shadow-[0_0_15px_rgba(34,211,238,0.15)]" },
  }

  const iconStyles = {
    primary: "text-primary bg-primary/10",
    success: "text-success bg-success/10",
    warning: "text-warning bg-warning/10",
    accent: "text-accent bg-accent/10",
  }

  const style = colorStyles[color]

  return (
    <div
      className={`relative rounded-xl bg-card p-6 border border-border border-t-[3px] card-hover opacity-0 animate-fade-in-up ${style.border} ${style.glow}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-sm text-muted-foreground">{label}</span>
        <div className={`p-2 rounded-lg ${iconStyles[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="text-3xl font-bold text-card-foreground">
        <AnimatedCounter end={value} prefix={prefix} suffix={suffix} decimals={value % 1 !== 0 ? 1 : 0} />
      </div>
    </div>
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
  const borderColor = {
    success: "border-t-success",
    warning: "border-t-warning",
    danger: "border-t-destructive",
  }

  const glowColor = {
    success: "shadow-[0_0_15px_rgba(34,197,94,0.15)]",
    warning: "shadow-[0_0_15px_rgba(245,158,11,0.15)]",
    danger: "shadow-[0_0_15px_rgba(239,68,68,0.15)]",
  }

  const badgeColor = {
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    danger: "bg-destructive/10 text-destructive",
  }

  return (
    <div
      className={`relative rounded-xl bg-card p-6 border border-border border-t-[3px] card-hover opacity-0 animate-fade-in-up ${borderColor[status]} ${glowColor[status]}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="font-semibold text-card-foreground">{period}</span>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${badgeColor[status]}`}>
          {confidence}%
        </span>
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
  )
}
