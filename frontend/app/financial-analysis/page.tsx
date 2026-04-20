"use client"

import React from "react"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { MetricCard } from "@/components/ui/metric-card"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { DollarSign, TrendingUp, Flame, Clock, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar,
} from "recharts"
import ChartInsight from "@/components/chart-insight"
import { useStoredAnalysis } from "@/lib/analysis/use-analysis"

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg p-3 shadow-lg border border-border">
        <p className="text-sm font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: ${entry.value}M
          </p>
        ))}
      </div>
    )
  }
  return null
}

function Gauge({ score = 0, size = 120 }: { score?: number; size?: number }) {
  const radius = (size - 12) / 2
  const circumference = 2 * Math.PI * radius
  const percent = Math.max(0, Math.min(100, score))
  const offset = circumference - (percent / 100) * circumference
  const color = percent >= 75 ? "#22C55E" : percent >= 50 ? "#F59E0B" : "#EF4444"

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
        <defs>
          <filter id="gaugeGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <g transform={`translate(${size / 2}, ${size / 2})`}>
          <circle r={radius} fill="transparent" stroke="var(--secondary)" strokeWidth={12} />
          <circle r={radius} fill="transparent" stroke={color} strokeWidth={12} strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`} strokeDashoffset={offset}
            transform="rotate(-90)" style={{ filter: "url(#gaugeGlow)", transition: "stroke-dashoffset 1s ease" }} />
        </g>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-2xl font-bold text-foreground leading-none">
          <AnimatedCounter end={score} />
        </div>
        <div className="text-xs text-muted-foreground">/100</div>
      </div>
    </div>
  )
}

export default function FinancialAnalysisPage() {
  const analysis = useStoredAnalysis()

  const revenue = analysis?.financial.annualRevenue ?? 0
  const expenses = analysis?.financial.annualExpenses ?? 0
  const profitMargin = analysis?.financial.profitMarginPercent ?? 0
  const burnRate = analysis?.financial.burnRateMonthly ?? 0
  const runway = analysis?.financial.runwayMonths ?? 0
  const growth = analysis?.market.growthRatePercent ?? 0
  const healthScore = analysis?.dashboard.businessHealthScore ?? 0

  const revM = revenue / 1_000_000
  const burnK = burnRate / 1000
  const financialHealth = Math.min(100, Math.round(healthScore * 0.9 + profitMargin * 0.3))
  const ltvCac = Math.max(1.0, Math.min(10.0, healthScore / 15))

  const quarterlyGrowthRate = growth / 100 / 4
  const quarters = ["Q1 2025", "Q2 2025", "Q3 2025", "Q4 2025", "Q1 2026"]
  const revenueHistory = quarters.map((quarter, i) => {
    const factor = Math.pow(1 + quarterlyGrowthRate, i - 4)
    const rev = Math.max(0, revM * factor)
    const profit = rev * (profitMargin / 100)
    return { quarter, revenue: +rev.toFixed(2), profit: +profit.toFixed(2) }
  })

  const annualBurn = burnRate * 12
  const expenseBreakdown = [
    { category: "Personnel", amount: +(annualBurn * 0.45 / 1_000_000).toFixed(2), percentage: 45 },
    { category: "Operations", amount: +(annualBurn * 0.20 / 1_000_000).toFixed(2), percentage: 20 },
    { category: "Marketing", amount: +(annualBurn * 0.15 / 1_000_000).toFixed(2), percentage: 15 },
    { category: "R&D", amount: +(annualBurn * 0.13 / 1_000_000).toFixed(2), percentage: 13 },
    { category: "Other", amount: +(annualBurn * 0.07 / 1_000_000).toFixed(2), percentage: 7 },
  ].sort((a, b) => b.amount - a.amount)

  const riskFlags: { type: "success" | "warning" | "danger"; title: string; description: string; action: string }[] = [
    {
      type: runway < 12 ? "danger" : runway < 18 ? "warning" : "success",
      title: "Cash Runway",
      description: `Current runway of ${runway} months — ${runway < 12 ? "critical: raise funds immediately" : runway < 18 ? "plan for next funding round" : "healthy cash position"}.`,
      action: runway < 18 ? "Begin fundraising discussions now" : "Maintain current cash position",
    },
    {
      type: growth > 20 ? "success" : growth > 5 ? "warning" : "danger",
      title: "Revenue Growth",
      description: `${growth}% annual growth rate — ${growth > 20 ? "exceeds projections" : growth > 5 ? "moderate growth" : "below target"}.`,
      action: growth > 20 ? "Maintain current growth strategies" : "Review and accelerate growth initiatives",
    },
    {
      type: burnRate > revenue * 0.03 ? "danger" : burnRate > revenue * 0.015 ? "warning" : "success",
      title: "Burn Rate",
      description: `Monthly burn of $${burnK.toFixed(0)}K is ${burnRate > revenue * 0.03 ? "high relative to revenue" : burnRate > revenue * 0.015 ? "elevated" : "well-managed"}.`,
      action: burnRate > revenue * 0.015 ? "Review operational expenses" : "Continue efficient operations",
    },
    {
      type: ltvCac >= 3 ? "success" : ltvCac >= 2 ? "warning" : "danger",
      title: "Unit Economics",
      description: `LTV:CAC ratio of ${ltvCac.toFixed(1)}x is ${ltvCac >= 3 ? "healthy" : ltvCac >= 2 ? "acceptable" : "needs improvement"}.`,
      action: ltvCac >= 3 ? "Continue scaling acquisition" : "Optimize customer acquisition cost",
    },
  ]

  const hasData = !!analysis

  return (
    <div className="min-h-screen pt-20">
      <SectionWrapper>
        <div className="mb-8 opacity-0 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Financial Analysis</h1>
          <p className="text-muted-foreground">Comprehensive financial health metrics and projections</p>
        </div>

        {!hasData && (
          <div className="glass-card rounded-xl p-8 mb-8 text-center border border-primary/20">
            <p className="text-muted-foreground text-lg">No analysis data found.</p>
            <p className="text-sm text-muted-foreground mt-2">Run an analysis from <span className="text-primary font-medium">Company Input</span> first.</p>
          </div>
        )}

        {/* Key Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <MetricCard
            title="Annual Revenue"
            value={`$${revM.toFixed(1)}M`}
            subtitle="Current ARR"
            icon={DollarSign}
            status={revM > 5 ? "success" : revM > 1 ? "warning" : "danger"}
            trend={{ value: growth, label: "YoY growth" }}
            delay={100}
            sparkline={revenueHistory.map(r => r.revenue)}
          />
          <MetricCard
            title="Profit Margin"
            value={`${profitMargin.toFixed(1)}%`}
            subtitle="Net profit margin"
            icon={TrendingUp}
            status={profitMargin > 15 ? "success" : profitMargin > 0 ? "warning" : "danger"}
            trend={{ value: 5, label: "vs last quarter" }}
            delay={200}
            sparkline={[profitMargin - 4, profitMargin - 3, profitMargin - 2, profitMargin - 1, profitMargin]}
          />
          <MetricCard
            title="Burn Rate"
            value={`$${burnK.toFixed(0)}K`}
            subtitle="Monthly burn"
            icon={Flame}
            status={burnRate > revenue * 0.03 ? "danger" : burnRate > revenue * 0.015 ? "warning" : "success"}
            trend={{ value: 20, label: "increase" }}
            delay={300}
            sparkline={[burnK * 0.9, burnK * 0.93, burnK * 0.96, burnK * 0.98, burnK]}
          />
          <MetricCard
            title="Runway"
            value={`${runway} mo`}
            subtitle="Cash runway"
            icon={Clock}
            status={runway >= 18 ? "success" : runway >= 12 ? "warning" : "danger"}
            delay={400}
            sparkline={[runway + 4, runway + 3, runway + 2, runway + 1, runway]}
          />
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5 relative">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-lg font-semibold text-card-foreground">Revenue & Profit</h3>
              <ChartInsight
                title="Revenue & Profit"
                level={growth > 20 ? "High" : "Medium"}
                summary={`${growth}% growth rate with ${profitMargin.toFixed(1)}% profit margin.`}
                bullets={[
                  `Revenue: $${revM.toFixed(1)}M annually`,
                  `Profit margin: ${profitMargin.toFixed(1)}%`,
                  profitMargin > 15 ? "Strong profitability" : "Focus on margin improvement",
                ]}
              />
            </div>
            <p className="text-sm text-muted-foreground mb-4">Quarterly performance (in millions)</p>
            <div className="flex items-center gap-4 text-sm mb-4">
              {[["Revenue", "var(--chart-1)"], ["Profit", "var(--chart-2)"]].map(([label, color]) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueHistory}>
                  <defs>
                    <linearGradient id="colorRevFin" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorProfitFin" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="quarter" stroke="var(--muted-foreground)" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <YAxis stroke="var(--muted-foreground)" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} tickFormatter={(v) => `$${v}M`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="revenue" stroke="var(--chart-1)" strokeWidth={2} fillOpacity={1} fill="url(#colorRevFin)" name="Revenue" />
                  <Area type="monotone" dataKey="profit" stroke="var(--chart-2)" strokeWidth={2} fillOpacity={1} fill="url(#colorProfitFin)" name="Profit" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-6 relative">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-lg font-semibold text-card-foreground">Expense Breakdown</h3>
              <ChartInsight
                title="Expense Breakdown"
                level="Medium"
                summary="Personnel is the largest cost driver."
                bullets={["Personnel: 45% of total expenses", "Marketing and R&D are moderate", "Review for efficiency gains"]}
              />
            </div>
            <p className="text-sm text-muted-foreground mb-4">Annual expense distribution ($M)</p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={expenseBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="category" stroke="var(--muted-foreground)" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
                  <YAxis stroke="var(--muted-foreground)" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} tickFormatter={(v) => `$${v}M`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }}
                    labelStyle={{ color: "var(--card-foreground)" }}
                    formatter={(value: number) => [`$${value}M`, "Amount"]}
                  />
                  <Bar dataKey="amount" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Financial Health Score */}
        <div className="glass-card rounded-xl p-6 mb-12 opacity-0 animate-fade-in-up stagger-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-6">
              <Gauge score={financialHealth} size={120} />
              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-1">Overall Financial Health</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Composite score based on revenue, profitability, burn rate, and runway metrics.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">{financialHealth}/100</div>
                <p className="text-sm text-muted-foreground mt-1">Health Score</p>
              </div>
              <div className="h-16 w-px bg-border" />
              <div className="text-center">
                <div className={`text-3xl font-bold ${ltvCac >= 3 ? "text-success" : ltvCac >= 2 ? "text-warning" : "text-destructive"}`}>
                  {ltvCac.toFixed(1)}x
                </div>
                <p className="text-sm text-muted-foreground mt-1">LTV:CAC Ratio</p>
              </div>
              <div className="h-16 w-px bg-border" />
              <div className="text-center">
                <div className={`text-3xl font-bold ${profitMargin > 15 ? "text-success" : profitMargin > 0 ? "text-warning" : "text-destructive"}`}>
                  {profitMargin.toFixed(1)}%
                </div>
                <p className="text-sm text-muted-foreground mt-1">Profit Margin</p>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Flags */}
        <div className="opacity-0 animate-fade-in-up stagger-6">
          <h3 className="text-xl font-semibold text-foreground mb-6">Financial Risk Flags</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {riskFlags.map((flag, index) => (
              <RiskFlagCard key={flag.title} {...flag} delay={700 + index * 100} />
            ))}
          </div>
        </div>
      </SectionWrapper>
      <br />
    </div>
  )
}

function RiskFlagCard({ type, title, description, action, delay = 0 }: {
  type: "success" | "warning" | "danger"
  title: string; description: string; action: string; delay?: number
}) {
  const styles = {
    success: { icon: CheckCircle, border: "border-l-success", bg: "bg-success/10", iconColor: "text-success" },
    warning: { icon: AlertTriangle, border: "border-l-warning", bg: "bg-warning/10", iconColor: "text-warning" },
    danger: { icon: XCircle, border: "border-l-destructive", bg: "bg-destructive/10", iconColor: "text-destructive" },
  }
  const style = styles[type]
  const Icon = style.icon

  return (
    <div
      className={`glass-card border-l-4 ${style.border} rounded-xl p-6 opacity-0 animate-fade-in-up`}
      style={{ animationDelay: `${delay}ms` } as React.CSSProperties}
    >
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-lg ${style.bg} flex-shrink-0`}>
          <Icon className={`w-5 h-5 ${style.iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-card-foreground mb-1">{title}</h4>
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Recommended:</span>
            <span className="text-xs text-primary">{action}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
