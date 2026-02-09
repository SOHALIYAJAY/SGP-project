"use client"

import { SectionWrapper } from "@/components/ui/section-wrapper"
import { MetricCard } from "@/components/ui/metric-card"
import { ChartInfoIcon } from "@/components/ui/chart-info-icon"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import {
  TrendingUp,
  Target,
  Award,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Building2,
  Calendar,
  Users,
  BarChart3,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts"


import ChartInsight from '@/components/chart-insight'

const stageInfo = {
  current: "Series A",
  valuation: "$25M",
  lastRound: "$5M",
  investors: 3,
  nextTarget: "Series B",
}

const readinessFactors = [
  { factor: "Revenue Growth", score: 92, status: "excellent" as const },
  { factor: "Unit Economics", score: 85, status: "strong" as const },
  { factor: "Market Position", score: 78, status: "strong" as const },
  { factor: "Team Strength", score: 88, status: "excellent" as const },
  { factor: "Financial Health", score: 72, status: "good" as const },
  { factor: "Scalability", score: 80, status: "strong" as const },
]

const readinessRadar = [
  { factor: "Revenue", score: 92 },
  { factor: "Unit Econ", score: 85 },
  { factor: "Market", score: 78 },
  { factor: "Team", score: 88 },
  { factor: "Finance", score: 72 },
  { factor: "Scale", score: 80 },
]

const valuationProjection = [
  { stage: "Seed", valuation: 3, year: "2022" },
  { stage: "Series A", valuation: 25, year: "2024" },
  { stage: "Series B", valuation: 90, year: "2026" },
  { stage: "Series C", valuation: 250, year: "2028" },
]

const capTable = [
  { name: "Founders", value: 55, color: "var(--chart-2)" },
  { name: "Series A", value: 20, color: "var(--chart-3)" },
  { name: "Seed", value: 12, color: "var(--chart-4)" },
  { name: "ESOP", value: 10, color: "var(--accent)" },
  { name: "Advisors", value: 3, color: "var(--muted-foreground)" },
]

const fundingRecommendation = {
  recommended: true,
  amount: "$15-20M",
  timing: "Q3 2026",
  valuation: "$80-100M",
  keyPoints: [
    "Strong revenue trajectory supports premium valuation",
    "Unit economics demonstrate path to profitability",
    "Market opportunity supports aggressive growth investment",
    "Team has track record of execution",
  ],
  concerns: [
    "Customer concentration needs diversification",
    "Burn rate optimization would strengthen position",
  ],
}

const milestones = [
  { stage: "Seed", date: "2022", amount: "$1.5M", status: "completed" },
  { stage: "Series A", date: "2024", amount: "$5M", status: "completed" },
  { stage: "Series B", date: "2026 (Target)", amount: "$15-20M", status: "upcoming" },
  { stage: "Series C", date: "2028 (Projected)", amount: "$40-50M", status: "future" },
]

export default function InvestmentPage() {
  const avgReadinessScore = Math.round(
    readinessFactors.reduce((sum, f) => sum + f.score, 0) / readinessFactors.length
  )

  return (
    <div className="min-h-screen py-2">
      <SectionWrapper>
        {/* Header */}
        <div className="mb-8 opacity-0 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Investment Insights
          </h1>
          <p className="text-muted-foreground">
            Funding readiness assessment and investment recommendations
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Current Stage"
            value={stageInfo.current}
            subtitle={`Last: ${stageInfo.lastRound}`}
            icon={Building2}
            status="neutral"
            delay={100}
            sparkline={[1,1,1,2,2,3,3]}
          />
          <MetricCard
            title="Current Valuation"
            value={stageInfo.valuation}
            subtitle="Post-money"
            icon={DollarSign}
            status="success"
            delay={200}
            sparkline={[3,6,12,18,25]}
          />
          <MetricCard
            title="Readiness Score"
            value={`${avgReadinessScore}%`}
            subtitle="Investment ready"
            icon={Target}
            status="success"
            delay={300}
            sparkline={[70,75,78,82,88,90,92]}
          />
          <MetricCard
            title="Active Investors"
            value={stageInfo.investors}
            subtitle="Institutional"
            icon={Users}
            status="neutral"
            delay={400}
            sparkline={[2,2,2,2,3,3,3]}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Readiness Radar */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-lg font-semibold text-card-foreground">
                Readiness Profile
              </h3>
              <ChartInsight
                title="Readiness Profile"
                level="High"
                summary="Strong across product, market, and team readiness factors."
                bullets={["Product-market fit strong (90+)", "Team experienced and capable", "Market timing favorable for Series B"]}
              />
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Multi-factor assessment
            </p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={readinessRadar}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis
                    dataKey="factor"
                    tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 9 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      backdropFilter: "blur(8px)",
                    }}
                    labelStyle={{ color: "var(--card-foreground)" }}
                  />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="var(--chart-3)"
                    fill="var(--chart-3)"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Cap Table */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-lg font-semibold text-card-foreground">
                Cap Table Overview
              </h3>
              <ChartInsight
                title="Cap Table Overview"
                level="Medium"
                summary="Healthy founder control; room for Series B dilution planned."
                bullets={["Founders: 55% ownership", "Early investors: 35%", "Reserves: 10% for hires"]}
              />
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Current ownership distribution
            </p>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={capTable}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {capTable.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {capTable.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground truncate">{item.name}</span>
                  <span className="text-card-foreground font-medium ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Company Stage */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground">
                Company Stage
              </h3>
            </div>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mb-4">
                <span className="text-2xl font-bold text-primary-foreground">A</span>
              </div>
              <h4 className="text-lg font-bold text-card-foreground">Growth Stage</h4>
              <p className="text-sm text-muted-foreground">
                Scale-up with proven PMF
              </p>
            </div>

            <div className="space-y-2">
              <StageIndicator label="Validation" completed />
              <StageIndicator label="Product-Market Fit" completed />
              <StageIndicator label="Revenue Growth" completed />
              <StageIndicator label="Scale Operations" current />
              <StageIndicator label="Market Expansion" upcoming />
            </div>
          </div>
        </div>

        {/* Valuation & Readiness Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Valuation Projection */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-lg font-semibold text-card-foreground">
                Valuation Trajectory
              </h3>
              <ChartInsight
                title="Valuation Growth"
                level="High"
                summary="Exceptional valuation growth trajectory from seed to Series B."
                bullets={["3x growth Seed to Series A", "3.6x growth Series A to B", "10x total growth projected"]}
              />
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Historical and projected valuations ($M)
            </p>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              10x Growth
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={valuationProjection}>
                  <defs>
                    <linearGradient id="valuationGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                  <XAxis
                    dataKey="stage"
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
                    formatter={(value: number) => [`$${value}M`, "Valuation"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="valuation"
                    stroke="#22C55E"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#valuationGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Readiness Factors */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">
                  Investment Readiness
                </h3>
                <p className="text-sm text-muted-foreground">
                  Factor-by-factor assessment
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold gradient-text">
                  {avgReadinessScore}%
                </div>
                <span className="text-xs text-success">Series B Ready</span>
              </div>
            </div>

            <div className="space-y-4">
              {readinessFactors.map((factor) => (
                <ReadinessBar key={factor.factor} {...factor} />
              ))}
            </div>
          </div>
        </div>

        {/* Funding Recommendation */}
        <div className="glass-card border-t-[3px] border-t-success rounded-xl p-6 mb-8 opacity-0 animate-fade-in-up stagger-6">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-success/10">
                  <Briefcase className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground">
                    Funding Recommendation
                  </h3>
                  <p className="text-sm text-success">Recommended to Proceed</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-secondary/50 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Target Amount</p>
                  <p className="text-xl font-bold text-card-foreground">
                    {fundingRecommendation.amount}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Target Timing</p>
                  <p className="text-xl font-bold text-card-foreground">
                    {fundingRecommendation.timing}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Expected Valuation</p>
                  <p className="text-xl font-bold text-card-foreground">
                    {fundingRecommendation.valuation}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-card-foreground mb-3">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    Key Strengths
                  </h4>
                  <ul className="space-y-2">
                    {fundingRecommendation.keyPoints.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-card-foreground mb-3">
                    <AlertCircle className="w-4 h-4 text-warning" />
                    Areas to Address
                  </h4>
                  <ul className="space-y-2">
                    {fundingRecommendation.concerns.map((concern) => (
                      <li key={concern} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 flex-shrink-0" />
                        {concern}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Funding Timeline */}
        <div className="opacity-0 animate-fade-in-up stagger-6 mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-6">
            Funding Journey
          </h3>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <MilestoneCard key={milestone.stage} {...milestone} delay={700 + index * 100} />
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}

function ReadinessBar({
  factor,
  score,
  status,
}: {
  factor: string
  score: number
  status: "excellent" | "strong" | "good" | "needs-work"
}) {
  const statusColors = {
    excellent: "bg-success",
    strong: "bg-primary",
    good: "bg-warning",
    "needs-work": "bg-destructive",
  }

  const statusLabels = {
    excellent: "text-success",
    strong: "text-primary",
    good: "text-warning",
    "needs-work": "text-destructive",
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">{factor}</span>
        <span className={`text-sm font-medium ${statusLabels[status]}`}>{score}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${statusColors[status]}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}

function StageIndicator({
  label,
  completed,
  current,
  upcoming,
}: {
  label: string
  completed?: boolean
  current?: boolean
  upcoming?: boolean
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
          completed
            ? "bg-success border-success"
            : current
            ? "border-primary bg-primary/20"
            : "border-muted-foreground/30"
        }`}
      >
        {completed && <CheckCircle2 className="w-3 h-3 text-success-foreground" />}
        {current && <div className="w-2 h-2 rounded-full bg-primary" />}
      </div>
      <span
        className={`text-sm ${
          completed || current ? "text-card-foreground" : "text-muted-foreground"
        }`}
      >
        {label}
      </span>
    </div>
  )
}

function MilestoneCard({
  stage,
  date,
  amount,
  status,
  delay = 0,
}: {
  stage: string
  date: string
  amount: string
  status: "completed" | "upcoming" | "future"
  delay?: number
}) {
  const statusStyles = {
    completed: {
      dot: "bg-success",
      bg: "bg-success/10",
      border: "border-success/20",
      text: "text-success",
    },
    upcoming: {
      dot: "bg-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
      text: "text-primary",
    },
    future: {
      dot: "bg-muted-foreground/30",
      bg: "bg-secondary/50",
      border: "border-border",
      text: "text-muted-foreground",
    },
  }

  const style = statusStyles[status]

  return (
    <div
      className="relative pl-12 opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`absolute left-4 w-4 h-4 rounded-full ${style.dot} border-4 border-background`} />
      <div className={`${style.bg} border ${style.border} rounded-xl p-4`}>
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-semibold text-card-foreground">{stage}</h4>
          <span className={`text-xs font-medium ${style.text}`}>
            {status === "completed" ? "Completed" : status === "upcoming" ? "Target" : "Projected"}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="w-3 h-3" />
            {date}
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <DollarSign className="w-3 h-3" />
            {amount}
          </span>
        </div>
      </div>
    </div>
  )
}
