"use client"

import React, { useState, useEffect } from "react"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { useExportPDF } from "@/hooks/use-export-pdf"
import { CustomTooltip } from "@/components/ui/custom-tooltip"
import { TrendingUp, Target, DollarSign, Users, Download } from "lucide-react"
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, ComposedChart, Bar, Line,
} from "recharts"
import ChartInsight from "@/components/chart-insight"
import { useStoredAnalysis } from "@/lib/analysis/use-analysis"

export default function PredictionsPage() {
  const analysis = useStoredAnalysis()
  const { isExporting, handleExport } = useExportPDF(
    "predictions-content",
    "Growth_Predictions_Report.pdf",
    "Business Analysis & Prediction Report",
    analysis?.meta?.companyName ?? "Company"
  )

  // ── Real data ──────────────────────────────────────────────────────────────
  const revenue = analysis?.financial.annualRevenue ?? 0
  const growth = analysis?.market.growthRatePercent ?? 0
  const customerCount = analysis?.customer.customerCount ?? 0
  const marketShare = analysis?.market.marketSharePercent ?? 0
  const healthScore = analysis?.dashboard.businessHealthScore ?? 0
  const riskScore = analysis?.risk.overallRiskScore ?? 0

  const revM = revenue / 1_000_000
  const monthlyGrowthRate = growth / 100 / 12

  // Build trajectory from real data
  const trajectoryData = [
    { month: "Now", revenue: +revM.toFixed(2), customers: customerCount, marketShare: +marketShare.toFixed(1) },
    { month: "3M", revenue: +(revM * Math.pow(1 + monthlyGrowthRate, 3)).toFixed(2), customers: Math.round(customerCount * Math.pow(1 + monthlyGrowthRate * 1.5, 3)), marketShare: +(marketShare * 1.05).toFixed(1) },
    { month: "6M", revenue: +(revM * Math.pow(1 + monthlyGrowthRate, 6)).toFixed(2), customers: Math.round(customerCount * Math.pow(1 + monthlyGrowthRate * 1.5, 6)), marketShare: +(marketShare * 1.12).toFixed(1) },
    { month: "12M", revenue: +(revM * Math.pow(1 + monthlyGrowthRate, 12)).toFixed(2), customers: Math.round(customerCount * Math.pow(1 + monthlyGrowthRate * 1.5, 12)), marketShare: +(marketShare * 1.25).toFixed(1) },
    { month: "24M", revenue: +(revM * Math.pow(1 + monthlyGrowthRate, 24)).toFixed(2), customers: Math.round(customerCount * Math.pow(1 + monthlyGrowthRate * 1.5, 24)), marketShare: +(marketShare * 1.5).toFixed(1) },
  ]

  // Scenario data
  const scenarioPeriods = ["Q1 2026", "Q2 2026", "Q3 2026", "Q4 2026", "Q1 2027", "Q2 2027"]
  const scenarioData = scenarioPeriods.map((period, i) => {
    const base = revM * Math.pow(1 + monthlyGrowthRate, (i + 1) * 3)
    return {
      period,
      optimistic: +(base * 1.1).toFixed(2),
      baseline: +base.toFixed(2),
      conservative: +(base * 0.85).toFixed(2),
    }
  })

  // Growth factors from real scores
  const growthFactors = [
    { factor: "Market Demand", score: Math.min(100, Math.round(healthScore * 0.95)) },
    { factor: "Product Fit", score: Math.min(100, Math.round(healthScore * 0.9)) },
    { factor: "Team Capacity", score: Math.min(100, Math.round(80 - riskScore * 0.2)) },
    { factor: "Capital Access", score: Math.min(100, Math.round(85 - riskScore * 0.15)) },
    { factor: "Tech Scalability", score: Math.min(100, Math.round(healthScore * 0.92)) },
    { factor: "Brand Recognition", score: Math.min(100, Math.round(72 + growth * 0.1)) },
  ]

  // Prediction cards from real trajectory
  const predictions = [
    { period: "3 Months", confidence: Math.max(50, Math.min(95, healthScore - 3 * 0.6)), metrics: [{ label: "Revenue", value: `$${trajectoryData[1].revenue.toFixed(1)}M`, change: +((trajectoryData[1].revenue / revM - 1) * 100).toFixed(1), positive: true }, { label: "Customers", value: trajectoryData[1].customers.toLocaleString(), change: +((trajectoryData[1].customers / customerCount - 1) * 100).toFixed(1), positive: true }], status: "success" as const },
    { period: "6 Months", confidence: Math.max(50, Math.min(95, healthScore - 6 * 0.6)), metrics: [{ label: "Revenue", value: `$${trajectoryData[2].revenue.toFixed(1)}M`, change: +((trajectoryData[2].revenue / revM - 1) * 100).toFixed(1), positive: true }, { label: "Customers", value: trajectoryData[2].customers.toLocaleString(), change: +((trajectoryData[2].customers / customerCount - 1) * 100).toFixed(1), positive: true }], status: "success" as const },
    { period: "12 Months", confidence: Math.max(50, Math.min(95, healthScore - 12 * 0.6)), metrics: [{ label: "Revenue", value: `$${trajectoryData[3].revenue.toFixed(1)}M`, change: +((trajectoryData[3].revenue / revM - 1) * 100).toFixed(1), positive: true }, { label: "Customers", value: trajectoryData[3].customers.toLocaleString(), change: +((trajectoryData[3].customers / customerCount - 1) * 100).toFixed(1), positive: true }], status: "warning" as const },
    { period: "24 Months", confidence: Math.max(50, Math.min(95, healthScore - 24 * 0.6)), metrics: [{ label: "Revenue", value: `$${trajectoryData[4].revenue.toFixed(1)}M`, change: +((trajectoryData[4].revenue / revM - 1) * 100).toFixed(1), positive: true }, { label: "Customers", value: trajectoryData[4].customers.toLocaleString(), change: +((trajectoryData[4].customers / customerCount - 1) * 100).toFixed(1), positive: true }], status: "warning" as const },
  ]

  const avgConfidence = Math.round(predictions.reduce((s, p) => s + p.confidence, 0) / predictions.length)
  const hasData = !!analysis

  return (
    <div className="min-h-screen py-2">
      <SectionWrapper>
        <div className="mb-8">
          <div className="opacity-0 animate-fade-in-up flex items-start justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-1">Growth Predictions</h1>
              <p className="text-sm text-muted-foreground">AI-powered forecasts based on current performance</p>
            </div>
            <button onClick={handleExport} disabled={isExporting} title="Export PDF"
              className="mt-2 p-2.5 rounded-lg bg-card hover:bg-secondary/80 border border-border text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!hasData && (
          <div className="glass-card rounded-xl p-8 mb-8 text-center border border-primary/20">
            <p className="text-muted-foreground text-lg">No analysis data found.</p>
            <p className="text-sm text-muted-foreground mt-2">Run an analysis from <span className="text-primary font-medium">Company Input</span> first.</p>
          </div>
        )}

        <div id="predictions-content">
          {/* Summary Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <SummaryCard icon={TrendingUp} label="Growth Rate" value={growth} suffix="%" color="success" delay={100} sparkData={[growth * 0.4, growth * 0.55, growth * 0.65, growth * 0.75, growth * 0.85, growth * 0.93, growth]} />
            <SummaryCard icon={DollarSign} label="Revenue Target" value={+trajectoryData[4].revenue.toFixed(1)} prefix="$" suffix="M" color="success" delay={200} sparkData={trajectoryData.map(d => d.revenue)} />
            <SummaryCard icon={Users} label="Customer Target" value={trajectoryData[4].customers} color="primary" delay={300} sparkData={trajectoryData.map(d => d.customers / 1000)} />
            <SummaryCard icon={Target} label="Avg Confidence" value={avgConfidence} suffix="%" color="warning" delay={400} sparkData={predictions.map(p => p.confidence)} />
          </div>

          {/* Main Charts Row */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Growth Trajectory */}
            <div className="lg:col-span-2 glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5 relative">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground">Growth Trajectory</h3>
                  <p className="text-sm text-muted-foreground mt-1">Revenue and customer growth over 24 months</p>
                </div>
                <ChartInsight
                  title="Growth Trajectory"
                  level={growth > 20 ? "High" : "Medium"}
                  summary={`${growth}% annual growth rate projects to $${trajectoryData[4].revenue.toFixed(1)}M in 24 months.`}
                  bullets={[
                    `Current: $${revM.toFixed(1)}M → 24M: $${trajectoryData[4].revenue.toFixed(1)}M`,
                    `Customers: ${customerCount.toLocaleString()} → ${trajectoryData[4].customers.toLocaleString()}`,
                    `Based on ${growth}% annual growth rate`,
                  ]}
                />
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={trajectoryData}>
                    <defs>
                      <linearGradient id="colorRevGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="month" stroke="var(--muted-foreground)" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                    <YAxis yAxisId="left" stroke="var(--muted-foreground)" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} tickFormatter={(v) => `$${v}M`} />
                    <YAxis yAxisId="right" orientation="right" stroke="var(--muted-foreground)" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="var(--chart-2)" strokeWidth={3} fillOpacity={1} fill="url(#colorRevGrad)" name="Revenue ($M)" />
                    <Line yAxisId="right" type="monotone" dataKey="customers" stroke="var(--chart-1)" strokeWidth={3} dot={{ fill: "var(--chart-1)", strokeWidth: 2, r: 6 }} activeDot={{ r: 8 }} name="Customers" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Growth Factors */}
            <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-card-foreground">Growth Factors</h3>
                <p className="text-sm text-muted-foreground mt-1">Key drivers of growth potential</p>
              </div>
              <div className="space-y-4">
                {growthFactors.map((item) => {
                  const color = item.score >= 85 ? "bg-success" : item.score >= 70 ? "bg-warning" : "bg-destructive"
                  const textColor = item.score >= 85 ? "text-success" : item.score >= 70 ? "text-warning" : "text-destructive"
                  return (
                    <div key={item.factor} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{item.factor}</span>
                        <span className={`text-sm font-semibold ${textColor}`}>{item.score}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${item.score}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Scenario Analysis */}
          <div className="glass-card rounded-xl p-6 mb-8 opacity-0 animate-fade-in-up stagger-5">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">Scenario Analysis</h3>
                <p className="text-sm text-muted-foreground mt-1">Optimistic, baseline, and conservative revenue projections</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                {[["Optimistic", "var(--chart-2)"], ["Baseline", "var(--chart-1)"], ["Conservative", "var(--chart-3)"]].map(([label, color]) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={scenarioData}>
                  <defs>
                    {[["colorOpt", "var(--chart-2)"], ["colorBase", "var(--chart-1)"], ["colorCons", "var(--chart-3)"]].map(([id, color]) => (
                      <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={color} stopOpacity={0} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="period" stroke="var(--muted-foreground)" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <YAxis stroke="var(--muted-foreground)" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} tickFormatter={(v) => `$${v}M`} />
                  <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }} labelStyle={{ color: "var(--card-foreground)" }} formatter={(v: number) => [`$${v}M`, ""]} />
                  <Area type="monotone" dataKey="optimistic" stroke="var(--chart-2)" strokeWidth={2} fillOpacity={1} fill="url(#colorOpt)" name="Optimistic" />
                  <Area type="monotone" dataKey="baseline" stroke="var(--chart-1)" strokeWidth={2} fillOpacity={1} fill="url(#colorBase)" name="Baseline" />
                  <Area type="monotone" dataKey="conservative" stroke="var(--chart-3)" strokeWidth={2} fillOpacity={1} fill="url(#colorCons)" name="Conservative" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Prediction Timeline */}
          <div className="mb-4 opacity-0 animate-fade-in-up stagger-6">
            <h3 className="text-xl font-semibold text-foreground">Prediction Timeline</h3>
            <p className="text-sm text-muted-foreground mt-1">Confidence-weighted forecasts by period</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-0">
            {predictions.map((prediction, index) => (
              <PredictionCard key={prediction.period} {...prediction} delay={700 + index * 100} />
            ))}
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}

function SummaryCard({ icon: Icon, label, value, prefix = "", suffix = "", color = "primary", delay = 0, sparkData }: {
  icon: React.ElementType; label: string; value: number; prefix?: string; suffix?: string
  color?: "primary" | "success" | "warning" | "accent"; delay?: number; sparkData: number[]
}) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const duration = 1500; const steps = 60; const increment = value / steps
    let current = 0; let step = 0
    const timer = setInterval(() => {
      step++; current = Math.min(current + increment, value); setDisplayValue(current)
      if (step >= steps || current >= value) { setDisplayValue(value); clearInterval(timer) }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [value])

  const colorStyles = {
    primary: { border: "border-t-4 border-primary", icon: "text-primary bg-primary/10", sparkColor: "var(--chart-1)" },
    success: { border: "border-t-4 border-success", icon: "text-success bg-success/10", sparkColor: "var(--chart-2)" },
    warning: { border: "border-t-4 border-warning", icon: "text-warning bg-warning/10", sparkColor: "var(--chart-3)" },
    accent: { border: "border-t-4 border-accent", icon: "text-accent bg-accent/10", sparkColor: "var(--chart-1)" },
  }
  const style = colorStyles[color]
  const fmt = (v: number) => value % 1 !== 0 ? v.toFixed(1) : Math.round(v).toLocaleString()

  return (
    <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: `${delay}ms` }}>
      <div className={`relative glass-card rounded-xl p-6 group transition-all duration-300 ${style.border}`}>
        <div className="flex items-start justify-between mb-4">
          <span className="text-sm text-muted-foreground">{label}</span>
          <div className={`p-2 rounded-lg ${style.icon}`}><Icon className="w-5 h-5" /></div>
        </div>
        <div className="text-3xl font-bold text-card-foreground mb-2">{prefix}{fmt(displayValue)}{suffix}</div>
        <Sparkline data={sparkData} color={style.sparkColor} delay={delay} />
      </div>
    </div>
  )
}

function Sparkline({ data, color = "#0EA5E9", delay = 0 }: { data: number[]; color?: string; delay?: number }) {
  const w = 120; const h = 36; const n = data.length
  const min = Math.min(...data); const max = Math.max(...data); const range = max === min ? 1 : max - min
  const pathD = data.map((d, i) => `${i === 0 ? "M" : "L"} ${(i / Math.max(1, n - 1)) * w} ${h - ((d - min) / range) * h}`).join(" ")
  const id = `spark-${delay}`
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none" style={{ display: "block" }}>
      <defs>
        <linearGradient id={id} x1="0" x2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.16" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={pathD} fill={`url(#${id})`} stroke="none" />
      <path d={pathD} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1}>
        <animate attributeName="stroke-dashoffset" from="1" to="0" dur="0.8s" begin={`${delay}ms`} fill="freeze" />
      </path>
    </svg>
  )
}

function PredictionCard({ period, confidence, metrics, status, delay = 0 }: {
  period: string; confidence: number; metrics: { label: string; value: string; change: number; positive: boolean }[]
  status: "success" | "warning" | "danger"; delay?: number
}) {
  const [isHovered, setIsHovered] = React.useState(false)
  const borderGlow = {
    success: "border-t-4 border-success hover:shadow-[0_0_25px_rgba(34,197,94,0.4)]",
    warning: "border-t-4 border-warning hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]",
    danger: "border-t-4 border-destructive hover:shadow-[0_0_25px_rgba(239,68,68,0.4)]",
  }
  const badgeColor = {
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    danger: "bg-destructive/10 text-destructive",
  }

  return (
    <div className="opacity-0 animate-fade-in-up h-full" style={{ animationDelay: `${delay}ms` }}>
      <div className={`group relative glass-card rounded-xl p-6 h-full flex flex-col transition-all duration-300 ${borderGlow[status]}`}
        onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className="flex items-start justify-between mb-4">
          <span className="font-semibold text-card-foreground">{period}</span>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${badgeColor[status]}`}>{confidence.toFixed(0)}%</span>
        </div>
        <div className="space-y-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{metric.label}</span>
                <span className="font-medium text-card-foreground">{metric.value}</span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ${metric.positive ? "bg-success" : "bg-destructive"}`} style={{ width: `${Math.min(metric.change, 100)}%` }} />
              </div>
              <p className="text-xs text-muted-foreground">+{metric.change.toFixed(1)}% growth</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
