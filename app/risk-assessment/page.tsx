"use client"

import React from "react"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { ChartInfoIcon } from "@/components/ui/chart-info-icon"
import {
  Shield,
  AlertTriangle,
  TrendingDown,
  DollarSign,
  Users,
  Globe,
  Server,
  Scale,
  Leaf,
  CheckCircle,
  XCircle,
} from "lucide-react"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"


import ChartInsight from '@/components/chart-insight'

const riskRadarData = [
  { subject: "Financial", A: 35, fullMark: 100 },
  { subject: "Operational", A: 28, fullMark: 100 },
  { subject: "Market", A: 45, fullMark: 100 },
  { subject: "Team", A: 22, fullMark: 100 },
  { subject: "Compliance", A: 30, fullMark: 100 },
  { subject: "Strategic", A: 40, fullMark: 100 },
]

const riskDistribution = [
  { name: "Low Risk", value: 3, color: "var(--chart-3)" },
  { name: "Medium Risk", value: 3, color: "var(--chart-4)" },
  { name: "High Risk", value: 0, color: "var(--chart-5)" },
]

const riskTrend = [
  { month: "Aug", overall: 42, financial: 45, market: 55, operational: 32 },
  { month: "Sep", overall: 40, financial: 42, market: 52, operational: 30 },
  { month: "Oct", overall: 38, financial: 40, market: 50, operational: 28 },
  { month: "Nov", overall: 36, financial: 38, market: 48, operational: 26 },
  { month: "Dec", overall: 34, financial: 36, market: 46, operational: 27 },
  { month: "Jan", overall: 33, financial: 35, market: 45, operational: 28 },
]

const riskCategories = [
  {
    category: "Financial Risk",
    score: 35,
    status: "medium" as const,
    icon: DollarSign,
    factors: [
      { name: "Cash Flow Stability", score: 72, status: "good" },
      { name: "Debt Ratio", score: 45, status: "warning" },
      { name: "Revenue Concentration", score: 38, status: "warning" },
    ],
  },
  {
    category: "Operational Risk",
    score: 28,
    status: "low" as const,
    icon: Server,
    factors: [
      { name: "System Reliability", score: 92, status: "good" },
      { name: "Process Efficiency", score: 78, status: "good" },
      { name: "Supply Chain", score: 65, status: "moderate" },
    ],
  },
  {
    category: "Market Risk",
    score: 45,
    status: "medium" as const,
    icon: Globe,
    factors: [
      { name: "Competition Intensity", score: 42, status: "warning" },
      { name: "Market Volatility", score: 55, status: "warning" },
      { name: "Regulatory Changes", score: 60, status: "moderate" },
    ],
  },
  {
    category: "Team Risk",
    score: 22,
    status: "low" as const,
    icon: Users,
    factors: [
      { name: "Key Person Dependency", score: 68, status: "moderate" },
      { name: "Talent Retention", score: 85, status: "good" },
      { name: "Skill Gaps", score: 78, status: "good" },
    ],
  },
  {
    category: "Compliance Risk",
    score: 30,
    status: "low" as const,
    icon: Scale,
    factors: [
      { name: "Data Privacy", score: 82, status: "good" },
      { name: "Industry Regulations", score: 75, status: "good" },
      { name: "Legal Exposure", score: 70, status: "moderate" },
    ],
  },
  {
    category: "Strategic Risk",
    score: 40,
    status: "medium" as const,
    icon: TrendingDown,
    factors: [
      { name: "Product-Market Fit", score: 85, status: "good" },
      { name: "Innovation Pipeline", score: 62, status: "moderate" },
      { name: "Expansion Strategy", score: 55, status: "warning" },
    ],
  },
]

const mitigationActions = [
  { action: "Diversify customer base", status: "in-progress", impact: "high", risk: "Financial" },
  { action: "Implement redundancy systems", status: "completed", impact: "medium", risk: "Operational" },
  { action: "Expand market segments", status: "planned", impact: "high", risk: "Market" },
  { action: "Key person insurance", status: "completed", impact: "medium", risk: "Team" },
  { action: "SOC 2 compliance audit", status: "in-progress", impact: "high", risk: "Compliance" },
]

const sustainabilityIndicators = [
  { name: "Environmental Impact", score: 72, trend: "improving" },
  { name: "Social Responsibility", score: 68, trend: "stable" },
  { name: "Governance Quality", score: 85, trend: "improving" },
  { name: "Long-term Viability", score: 78, trend: "improving" },
]

export default function RiskAssessmentPage() {
  const overallRiskScore = Math.round(
    riskCategories.reduce((sum, cat) => sum + cat.score, 0) / riskCategories.length
  )

  return (
    <div className="min-h-screen py-2">
      <SectionWrapper>
        {/* Header */}
        <div className="mb-8 opacity-0 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Risk Assessment
          </h1>
          <p className="text-muted-foreground">
            Comprehensive risk analysis across all business dimensions
          </p>
        </div>

        {/* Overall Risk Score Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Risk Gauge */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-1">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-36 h-36 rounded-full border-8 border-secondary flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-warning">
                      <AnimatedCounter end={overallRiskScore} />
                    </div>
                    <p className="text-sm text-muted-foreground">Risk Score</p>
                  </div>
                </div>
                <svg className="absolute inset-0 w-36 h-36 -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r="64"
                    fill="none"
                    stroke="var(--chart-4)"
                    strokeWidth="8"
                    strokeDasharray={`${(overallRiskScore / 100) * 402} 402`}
                    className="transition-all duration-1000"
                  />
                </svg>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-warning" />
                <h3 className="text-lg font-semibold text-card-foreground">
                  Medium Risk Profile
                </h3>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Financial and market risks are the primary concerns
              </p>
            </div>
          </div>

          {/* Risk Radar Chart */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-2">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-lg font-semibold text-card-foreground">
                Risk Distribution
              </h3>
              <ChartInsight
                title="Risk Distribution"
                level="Medium"
                summary="Market and financial risks are elevated; operational risks managed."
                bullets={["Market risk: 45/100 — monitor competition", "Financial risk: 35/100 — manage runway", "Team risk: 22/100 — experienced team"]}
              />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Risk across key dimensions
            </p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={riskRadarData}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 9 }}
                  />
                  <Radar
                    name="Risk"
                    dataKey="A"
                    stroke="var(--chart-4)"
                    fill="var(--chart-4)"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Risk Summary */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-3">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-lg font-semibold text-card-foreground">
                Risk Summary
              </h3>
              <ChartInsight
                title="Risk Summary"
                level="Medium"
                summary="Balanced risk profile: 3 low, 3 medium risks identified."
                bullets={["3 low-risk areas: operational, team, compliance", "3 medium-risk areas: financial, market, strategic", "Mitigation strategies in place"]}
              />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Risk distribution by severity level
            </p>
            <div className="h-40 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={4}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {riskDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {riskDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between px-3 py-2 rounded-lg bg-secondary/30">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-card-foreground">{item.value} categories</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Trend Chart */}
        <div className="glass-card rounded-xl p-6 mb-8 opacity-0 animate-fade-in-up stagger-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">
                Risk Trend Analysis
              </h3>
              <p className="text-sm text-muted-foreground">
                6-month risk score evolution
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--chart-4)' }} />
                  <span className="text-muted-foreground">Overall</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--chart-2)' }} />
                  <span className="text-muted-foreground">Financial</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--chart-5)' }} />
                  <span className="text-muted-foreground">Market</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--chart-3)' }} />
                  <span className="text-muted-foreground">Operational</span>
                </div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={riskTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="month"
                  stroke="var(--muted-foreground)"
                  tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                  domain={[0, 60]}
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
                <Line type="monotone" dataKey="overall" name="Overall" stroke="var(--chart-4)" strokeWidth={3} dot={{ fill: "var(--chart-4)", r: 4 }} />
                <Line type="monotone" dataKey="financial" name="Financial" stroke="var(--chart-2)" strokeWidth={2} dot={{ fill: "var(--chart-2)", r: 3 }} />
                <Line type="monotone" dataKey="market" name="Market" stroke="var(--chart-5)" strokeWidth={2} dot={{ fill: "var(--chart-5)", r: 3 }} />
                <Line type="monotone" dataKey="operational" name="Operational" stroke="var(--chart-3)" strokeWidth={2} dot={{ fill: "var(--chart-3)", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Categories Grid */}
        <div className="mb-8 opacity-0 animate-fade-in-up stagger-5">
          <h3 className="text-xl font-semibold text-foreground mb-6">
            Risk Categories
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {riskCategories.map((category, index) => (
              <RiskCategoryCard key={category.category} {...category} delay={300 + index * 100} />
            ))}
          </div>
        </div>

        {/* Mitigation Actions */}
        <div className="glass-card rounded-xl p-6 mb-8 opacity-0 animate-fade-in-up stagger-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-6">
            Risk Mitigation Actions
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Action</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Risk Area</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Impact</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {mitigationActions.map((item) => (
                  <tr key={item.action} className="border-b border-border/50">
                    <td className="py-3 px-4 text-sm text-card-foreground">{item.action}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{item.risk}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        item.impact === "high" ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning"
                      }`}>
                        {item.impact}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                        item.status === "completed" ? "bg-success/10 text-success" :
                        item.status === "in-progress" ? "bg-primary/10 text-primary" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {item.status === "completed" && <CheckCircle className="w-3 h-3" />}
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sustainability Indicators */}
        <div className="opacity-0 animate-fade-in-up stagger-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-success/10">
              <Leaf className="w-5 h-5 text-success" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Sustainability Indicators
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sustainabilityIndicators.map((indicator, index) => (
              <SustainabilityCard key={indicator.name} {...indicator} delay={900 + index * 100} />
            ))}
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}

function RiskCategoryCard({
  category,
  score,
  status,
  icon: Icon,
  factors,
  delay = 0,
}: {
  category: string
  score: number
  status: "low" | "medium" | "high"
  icon: React.ElementType
  factors: { name: string; score: number; status: string }[]
  delay?: number
}) {
  const statusStyles = {
    low: { border: "border-t-success", bg: "bg-success/10", text: "text-success" },
    medium: { border: "border-t-warning", bg: "bg-warning/10", text: "text-warning" },
    high: { border: "border-t-destructive", bg: "bg-destructive/10", text: "text-destructive" },
  }

  const style = statusStyles[status]

  return (
    <div
      className={`glass-card border-t-[3px] ${style.border} rounded-xl p-6 card-hover opacity-0 animate-fade-in-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${style.bg}`}>
            <Icon className={`w-5 h-5 ${style.text}`} />
          </div>
          <h4 className="font-semibold text-card-foreground">{category}</h4>
        </div>
        <div className={`text-lg font-bold ${style.text}`}>{score}%</div>
      </div>

      <div className="space-y-3">
        {factors.map((factor) => (
          <div key={factor.name}>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-muted-foreground">{factor.name}</span>
              <span className="text-card-foreground">{factor.score}%</span>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  factor.status === "good"
                    ? "bg-success"
                    : factor.status === "warning"
                    ? "bg-warning"
                    : "bg-primary"
                }`}
                style={{ width: `${factor.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SustainabilityCard({
  name,
  score,
  trend,
  delay = 0,
}: {
  name: string
  score: number
  trend: "improving" | "stable" | "declining"
  delay?: number
}) {
  const trendStyles = {
    improving: { text: "text-success", label: "Improving", icon: CheckCircle },
    stable: { text: "text-warning", label: "Stable", icon: AlertTriangle },
    declining: { text: "text-destructive", label: "Declining", icon: XCircle },
  }

  const trendStyle = trendStyles[trend]
  const Icon = trendStyle.icon

  return (
    <div
      className="glass-card rounded-xl p-6 card-hover opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <h4 className="font-medium text-card-foreground mb-4">{name}</h4>
      <div className="flex items-end justify-between">
        <div className="text-3xl font-bold gradient-text">
          <AnimatedCounter end={score} suffix="%" />
        </div>
        <span className={`flex items-center gap-1 text-sm ${trendStyle.text}`}>
          <Icon className="w-4 h-4" />
          {trendStyle.label}
        </span>
      </div>
      <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}
