"use client"

import { SectionWrapper } from "@/components/ui/section-wrapper"
import { MetricCard } from "@/components/ui/metric-card"
import { AnimatedCounter } from "@/components/ui/animated-counter"

import {
  DollarSign,
  TrendingUp,
  Flame,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"
import ChartInsight from '@/components/chart-insight'

const revenueHistory = [
  { quarter: "Q1 2025", revenue: 5.2, profit: 0.8 },
  { quarter: "Q2 2025", revenue: 5.8, profit: 1.0 },
  { quarter: "Q3 2025", revenue: 6.5, profit: 1.2 },
  { quarter: "Q4 2025", revenue: 7.5, profit: 1.5 },
  { quarter: "Q1 2026", revenue: 8.2, profit: 1.8 },
]
const expenseBreakdown = [
  { category: "Personnel", amount: 2.8, percentage: 45 },
  { category: "Operations", amount: 1.2, percentage: 20 },
  { category: "Marketing", amount: 0.9, percentage: 15 },
  { category: "R&D", amount: 0.8, percentage: 13 },
  { category: "Other", amount: 0.5, percentage: 7 },
]

// Sorted copy for visual clarity (high -> low)
const sortedExpenseBreakdown = [...expenseBreakdown].sort((a, b) => b.amount - a.amount)

const riskFlags = [
  {
    type: "warning",
    title: "Cash Runway",
    description: "Current runway of 18 months - plan for Series B",
    action: "Begin fundraising discussions in Q3",
  },
  {
    type: "success",
    title: "Revenue Growth",
    description: "Consistent 15% MoM growth exceeds projections",
    action: "Maintain current growth strategies",
  },
  {
    type: "danger",
    title: "Burn Rate",
    description: "Monthly burn increased 20% this quarter",
    action: "Review operational expenses",
  },
  {
    type: "success",
    title: "Unit Economics",
    description: "LTV:CAC ratio of 4.2x is healthy",
    action: "Continue scaling acquisition",
  },
]

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg p-3 shadow-lg">
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

function Gauge({ score = 0, size = 100 }: { score?: number; size?: number }) {
  const radius = (size - 12) / 2
  const circumference = 2 * Math.PI * radius
  const percent = Math.max(0, Math.min(100, score))
  const offset = circumference - (percent / 100) * circumference

  const color = percent >= 75 ? "var(--chart-3)" : percent >= 50 ? "var(--chart-4)" : "var(--chart-5)"

  return (
    <div className="relative" style={{ width: size, height: size }} aria-label={`Financial health ${score} out of 100`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g transform={`translate(${size / 2}, ${size / 2})`}>
          <circle r={radius} fill="transparent" stroke="#0F1724" strokeWidth={12} />
          <circle
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={12}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={offset}
            transform={`rotate(-90)`}
            style={{ filter: "url(#glow)" }}
          />
        </g>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-xl font-semibold text-foreground leading-none">
          <AnimatedCounter end={score} />
        </div>
        <div className="text-xs text-muted-foreground">/100</div>
      </div>
    </div>
  )
}

export default function FinancialAnalysisPage() {
  return (
    <div className="min-h-screen pt-20">
      <SectionWrapper>
        {/* Header */}
        <div className="mb-8 opacity-0 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Financial Analysis
          </h1>
          <p className="text-muted-foreground">
            Comprehensive financial health metrics and projections
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <MetricCard
            title="Annual Revenue"
            value="$8.2M"
            subtitle="Current ARR"
            icon={DollarSign}
            status="success"
            trend={{ value: 85, label: "YoY growth" }}
            delay={100}
            sparkline={[5.2,5.8,6.5,7.5,8.2]}
          />
          <MetricCard
            title="Profit Margin"
            value="22%"
            subtitle="Net profit margin"
            icon={TrendingUp}
            status="success"
            trend={{ value: 5, label: "vs last quarter" }}
            delay={200}
            sparkline={[18,19,20,21,22]}
          />
          <MetricCard
            title="Burn Rate"
            value="$180K"
            subtitle="Monthly burn"
            icon={Flame}
            status="warning"
            trend={{ value: 20, label: "increase" }}
            delay={300}
            sparkline={[170,175,180,185,180]}
          />
          <MetricCard
            title="Runway"
            value="18 mo"
            subtitle="Cash runway"
            icon={Clock}
            status="warning"
            delay={400}
            sparkline={[20,19,19,18,18]}
          />
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* Revenue & Profit Trend */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5 relative">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-lg font-semibold text-card-foreground">
                Revenue & Profit
              </h3>
              <ChartInsight
                title="Revenue & Profit"
                level="High"
                summary="Strong revenue growth with improving margins."
                bullets={["Revenue up quarter-over-quarter", "Profit margin improving", "Watch operational expenses"]}
              />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Quarterly performance (in millions)
            </p>
            <div className="flex items-center gap-4 text-sm mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-muted-foreground">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-muted-foreground">Profit</span>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueHistory}>
                          <defs>
                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="var(--chart-3)" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="var(--chart-3)" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                          <XAxis
                            dataKey="quarter"
                            stroke="var(--muted-foreground)"
                            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                          />
                          <YAxis
                            stroke="var(--muted-foreground)"
                            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                            tickFormatter={(value) => `$${value}M`}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="var(--chart-2)"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorRev)"
                            name="Revenue"
                          />
                          <Area
                            type="monotone"
                            dataKey="profit"
                            stroke="var(--chart-3)"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorProfit)"
                            name="Profit"
                          />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Expense Breakdown */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-6 relative">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-lg font-semibold text-card-foreground">
                Expense Breakdown
              </h3>
              <ChartInsight
                title="Expense Breakdown"
                level="Medium"
                summary="Personnel is the largest cost; consider efficiency gains."
                bullets={["Personnel is highest cost", "Marketing and R&D are moderate", "Consider cost reviews"]}
              />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Monthly expense distribution
            </p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sortedExpenseBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="category"
                    stroke="var(--muted-foreground)"
                    tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                  />
                  <YAxis
                    stroke="var(--muted-foreground)"
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                    tickFormatter={(value) => `$${value}M`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "var(--card-foreground)" }}
                    formatter={(value: number) => [`$${value}M`, "Amount"]}
                  />
                  <Bar dataKey="amount" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Financial Health Score (with circular gauge) */}
        <div className="glass-card rounded-xl p-6 mb-12 opacity-0 animate-fade-in-up stagger-6 relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                Overall Financial Health
              </h3>
              <p className="text-sm text-muted-foreground">
                Composite score based on revenue, profitability, and stability metrics
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">
                  78/100
                </div>
                <p className="text-sm text-muted-foreground mt-1">Health Score</p>
              </div>
              <div className="h-16 w-px bg-border" />
              <div className="text-center">
                <div className="text-3xl font-bold text-success">
                  4.2x
                </div>
                <p className="text-sm text-muted-foreground mt-1">LTV:CAC Ratio</p>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Flags */}
        <div className="opacity-0 animate-fade-in-up stagger-6">
          <h3 className="text-xl font-semibold text-foreground mb-6">
            Financial Risk Flags
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {riskFlags.map((flag, index) => (
              <RiskFlagCard key={flag.title} {...flag} delay={700 + index * 100} />
            ))}
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}

function RiskFlagCard({
  type,
  title,
  description,
  action,
  delay = 0,
}: {
  type: "success" | "warning" | "danger"
  title: string
  description: string
  action: string
  delay?: number
}) {
  const styles = {
    success: {
      icon: CheckCircle,
      border: "border-l-success",
      bg: "bg-success/10",
      iconColor: "text-success",
    },
    warning: {
      icon: AlertTriangle,
      border: "border-l-warning",
      bg: "bg-warning/10",
      iconColor: "text-warning",
    },
    danger: {
      icon: XCircle,
      border: "border-l-destructive",
      bg: "bg-destructive/10",
      iconColor: "text-destructive",
    },
  }

  const style = styles[type]
  const Icon = style.icon

  return (
    <div
      className={`glass-card border-l-4 ${style.border} rounded-xl p-6 card-hover opacity-0 animate-fade-in-up`}
      style={{ animationDelay: `${delay}ms` } as React.CSSProperties}
    >
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-lg ${style.bg}`}>
          <Icon className={`w-5 h-5 ${style.iconColor}`} />
        </div>
        <div className="flex-1">
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
