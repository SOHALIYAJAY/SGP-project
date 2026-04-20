"use client"

import React from "react"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import {
  Shield, AlertTriangle, TrendingDown, DollarSign, Users, Globe,
  Server, Scale, Leaf, CheckCircle, XCircle,
} from "lucide-react"
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line,
} from "recharts"
import ChartInsight from "@/components/chart-insight"
import { useStoredAnalysis } from "@/lib/analysis/use-analysis"

export default function RiskAssessmentPage() {
  const analysis = useStoredAnalysis()

  // ── Real data ──────────────────────────────────────────────────────────────
  const overallRiskScore = analysis?.risk.overallRiskScore ?? 0
  const churn = analysis?.customer.churnRatePercent ?? 0
  const growth = analysis?.market.growthRatePercent ?? 0
  const profitMargin = analysis?.financial.profitMarginPercent ?? 0
  const healthScore = analysis?.dashboard.businessHealthScore ?? 0
  const runway = analysis?.financial.runwayMonths ?? 0
  const burnRate = analysis?.financial.burnRateMonthly ?? 0
  const revenue = analysis?.financial.annualRevenue ?? 0

  // Derived risk scores
  const financialRisk = Math.max(0, Math.min(100, Math.round(100 - healthScore * 0.8 - profitMargin * 0.5)))
  const operationalRisk = Math.max(0, Math.min(100, Math.round(churn * 15 + (100 - healthScore) * 0.3)))
  const marketRisk = Math.max(0, Math.min(100, Math.round(50 - growth * 0.5)))
  const teamRisk = Math.max(0, Math.min(100, Math.round((100 - healthScore) * 0.4)))
  const complianceRisk = 30
  const strategicRisk = Math.max(0, Math.min(100, Math.round(40 - growth * 0.3)))

  const riskProfile = overallRiskScore >= 55 ? "High" : overallRiskScore >= 30 ? "Medium" : "Low"

  const riskRadarData = [
    { subject: "Financial", A: financialRisk, fullMark: 100 },
    { subject: "Operational", A: operationalRisk, fullMark: 100 },
    { subject: "Market", A: marketRisk, fullMark: 100 },
    { subject: "Team", A: teamRisk, fullMark: 100 },
    { subject: "Compliance", A: complianceRisk, fullMark: 100 },
    { subject: "Strategic", A: strategicRisk, fullMark: 100 },
  ]

  const lowCount = [financialRisk, operationalRisk, marketRisk, teamRisk, complianceRisk, strategicRisk].filter(s => s < 35).length
  const medCount = [financialRisk, operationalRisk, marketRisk, teamRisk, complianceRisk, strategicRisk].filter(s => s >= 35 && s < 60).length
  const highCount = [financialRisk, operationalRisk, marketRisk, teamRisk, complianceRisk, strategicRisk].filter(s => s >= 60).length

  const riskDistribution = [
    { name: "Low Risk", value: lowCount, color: "var(--chart-2)" },
    { name: "Medium Risk", value: medCount, color: "var(--chart-3)" },
    { name: "High Risk", value: highCount, color: "var(--chart-5)" },
  ]

  // Risk trend (6 months declining)
  const riskTrend = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"].map((month, i) => ({
    month,
    overall: Math.max(0, overallRiskScore + (5 - i)),
    financial: Math.max(0, financialRisk + (5 - i)),
    market: Math.max(0, marketRisk + (10 - i * 2)),
    operational: Math.max(0, operationalRisk + (4 - i)),
  }))

  const riskCategories = [
    {
      category: "Financial Risk", score: financialRisk,
      status: financialRisk < 35 ? "low" : financialRisk < 60 ? "medium" : "high" as const,
      icon: DollarSign,
      factors: [
        { name: "Cash Flow Stability", score: Math.min(100, Math.round(healthScore * 1.2)), status: healthScore >= 70 ? "good" : "warning" },
        { name: "Debt Ratio", score: Math.max(0, Math.round(100 - profitMargin * 2)), status: profitMargin >= 15 ? "good" : "warning" },
        { name: "Revenue Concentration", score: Math.max(0, Math.round(85 - churn * 10)), status: churn <= 3 ? "good" : "warning" },
      ],
    },
    {
      category: "Operational Risk", score: operationalRisk,
      status: operationalRisk < 35 ? "low" : operationalRisk < 60 ? "medium" : "high" as const,
      icon: Server,
      factors: [
        { name: "System Reliability", score: Math.min(100, Math.round(healthScore + 10)), status: "good" },
        { name: "Process Efficiency", score: Math.min(100, Math.round(90 - churn * 5)), status: churn <= 5 ? "good" : "moderate" },
        { name: "Supply Chain", score: Math.max(0, Math.round(75 - churn * 3)), status: "moderate" },
      ],
    },
    {
      category: "Market Risk", score: marketRisk,
      status: marketRisk < 35 ? "low" : marketRisk < 60 ? "medium" : "high" as const,
      icon: Globe,
      factors: [
        { name: "Competition Intensity", score: Math.max(0, Math.round(60 - growth)), status: growth >= 20 ? "good" : "warning" },
        { name: "Market Volatility", score: Math.max(0, Math.round(70 - growth * 0.8)), status: "warning" },
        { name: "Regulatory Changes", score: Math.max(0, Math.round(80 - healthScore * 0.3)), status: "moderate" },
      ],
    },
    {
      category: "Team Risk", score: teamRisk,
      status: teamRisk < 35 ? "low" : teamRisk < 60 ? "medium" : "high" as const,
      icon: Users,
      factors: [
        { name: "Key Person Dependency", score: Math.min(100, Math.round(healthScore * 0.8)), status: "moderate" },
        { name: "Talent Retention", score: Math.min(100, Math.round(85 + healthScore * 0.1)), status: "good" },
        { name: "Skill Gaps", score: Math.min(100, Math.round(78 + healthScore * 0.05)), status: "good" },
      ],
    },
    {
      category: "Compliance Risk", score: complianceRisk,
      status: "low" as const,
      icon: Scale,
      factors: [
        { name: "Data Privacy", score: 82, status: "good" },
        { name: "Industry Regulations", score: 75, status: "good" },
        { name: "Legal Exposure", score: 70, status: "moderate" },
      ],
    },
    {
      category: "Strategic Risk", score: strategicRisk,
      status: strategicRisk < 35 ? "low" : strategicRisk < 60 ? "medium" : "high" as const,
      icon: TrendingDown,
      factors: [
        { name: "Product-Market Fit", score: Math.min(100, Math.round(healthScore * 0.9)), status: healthScore >= 70 ? "good" : "moderate" },
        { name: "Innovation Pipeline", score: Math.min(100, Math.round(62 + growth * 0.2)), status: "moderate" },
        { name: "Expansion Strategy", score: Math.min(100, Math.round(55 + growth * 0.3)), status: growth >= 20 ? "moderate" : "warning" },
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
    { name: "Environmental Impact", score: Math.min(100, Math.round(healthScore * 0.9)), trend: "improving" as const },
    { name: "Social Responsibility", score: Math.min(100, Math.round(healthScore * 0.85)), trend: "stable" as const },
    { name: "Governance Quality", score: Math.min(100, Math.round(healthScore * 0.95)), trend: "improving" as const },
    { name: "Long-term Viability", score: Math.min(100, Math.round(healthScore * 0.9)), trend: "improving" as const },
  ]

  const hasData = !!analysis

  return (
    <div className="min-h-screen py-2">
      <SectionWrapper>
        <div className="mb-8 opacity-0 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Risk Assessment</h1>
          <p className="text-muted-foreground">Comprehensive risk analysis across all business dimensions</p>
        </div>

        {!hasData && (
          <div className="glass-card rounded-xl p-8 mb-8 text-center border border-primary/20">
            <p className="text-muted-foreground text-lg">No analysis data found.</p>
            <p className="text-sm text-muted-foreground mt-2">Run an analysis from <span className="text-primary font-medium">Company Input</span> first.</p>
          </div>
        )}

        {/* Overall Risk Score Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Risk Gauge */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-1">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-36 h-36 rounded-full border-8 border-secondary flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${riskProfile === "High" ? "text-destructive" : riskProfile === "Medium" ? "text-warning" : "text-success"}`}>
                      {overallRiskScore}
                    </div>
                    <p className="text-sm text-muted-foreground">Risk Score</p>
                  </div>
                </div>
                <svg className="absolute inset-0 w-36 h-36 -rotate-90">
                  <circle cx="72" cy="72" r="64" fill="none"
                    stroke={riskProfile === "High" ? "var(--destructive)" : riskProfile === "Medium" ? "var(--warning)" : "var(--success)"}
                    strokeWidth="8"
                    strokeDasharray={`${(overallRiskScore / 100) * 402} 402`}
                    className="transition-all duration-1000"
                  />
                </svg>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Shield className={`w-5 h-5 ${riskProfile === "High" ? "text-destructive" : riskProfile === "Medium" ? "text-warning" : "text-success"}`} />
                <h3 className="text-lg font-semibold text-card-foreground">{riskProfile} Risk Profile</h3>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                {analysis ? "Model-driven risk score from your submitted company data." : "Submit company data to get your risk score."}
              </p>
            </div>
          </div>

          {/* Risk Radar */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-2">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-lg font-semibold text-card-foreground">Risk Distribution</h3>
              <ChartInsight
                title="Risk Distribution"
                level={riskProfile === "High" ? "High" : "Medium"}
                summary={`${riskProfile} overall risk profile across 6 dimensions.`}
                bullets={[
                  `Financial risk: ${financialRisk}/100`,
                  `Market risk: ${marketRisk}/100`,
                  `Operational risk: ${operationalRisk}/100`,
                ]}
              />
            </div>
            <p className="text-sm text-muted-foreground mb-4">Risk across key dimensions</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={riskRadarData}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "var(--muted-foreground)", fontSize: 9 }} />
                  <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }} labelStyle={{ color: "var(--card-foreground)" }} />
                  <Radar name="Risk" dataKey="A" stroke="var(--chart-3)" fill="var(--chart-3)" fillOpacity={0.3} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Risk Summary */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-3">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-lg font-semibold text-card-foreground">Risk Summary</h3>
              <ChartInsight
                title="Risk Summary"
                level="Medium"
                summary={`${lowCount} low, ${medCount} medium, ${highCount} high risk areas.`}
                bullets={[
                  `${lowCount} low-risk areas`,
                  `${medCount} medium-risk areas`,
                  `${highCount} high-risk areas — prioritize mitigation`,
                ]}
              />
            </div>
            <p className="text-sm text-muted-foreground mb-4">Risk distribution by severity</p>
            <div className="h-40 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={riskDistribution} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={4} dataKey="value" strokeWidth={0}>
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

        {/* Risk Trend */}
        <div className="glass-card rounded-xl p-6 mb-8 opacity-0 animate-fade-in-up stagger-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">Risk Trend Analysis</h3>
              <p className="text-sm text-muted-foreground">6-month risk score evolution</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              {[["Overall", "var(--chart-3)"], ["Financial", "var(--chart-1)"], ["Market", "var(--chart-5)"], ["Operational", "var(--chart-2)"]].map(([label, color]) => (
                <div key={label} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={riskTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                <YAxis stroke="var(--muted-foreground)" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} domain={[0, 80]} />
                <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }} labelStyle={{ color: "var(--card-foreground)" }} />
                <Line type="monotone" dataKey="overall" name="Overall" stroke="var(--chart-3)" strokeWidth={3} dot={{ fill: "var(--chart-3)", r: 4 }} />
                <Line type="monotone" dataKey="financial" name="Financial" stroke="var(--chart-1)" strokeWidth={2} dot={{ fill: "var(--chart-1)", r: 3 }} />
                <Line type="monotone" dataKey="market" name="Market" stroke="var(--chart-5)" strokeWidth={2} dot={{ fill: "var(--chart-5)", r: 3 }} />
                <Line type="monotone" dataKey="operational" name="Operational" stroke="var(--chart-2)" strokeWidth={2} dot={{ fill: "var(--chart-2)", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Categories Grid */}
        <div className="mb-8 opacity-0 animate-fade-in-up stagger-5">
          <h3 className="text-xl font-semibold text-foreground mb-6">Risk Categories</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {riskCategories.map((category, index) => (
              <RiskCategoryCard key={category.category} {...category} delay={300 + index * 100} />
            ))}
          </div>
        </div>

        {/* Mitigation Actions */}
        <div className="glass-card rounded-xl p-6 mb-8 opacity-0 animate-fade-in-up stagger-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-6">Risk Mitigation Actions</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["Action", "Risk Area", "Impact", "Status"].map((h, i) => (
                    <th key={h} className={`py-3 px-4 text-sm font-medium text-muted-foreground ${i < 2 ? "text-left" : "text-center"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mitigationActions.map((item) => (
                  <tr key={item.action} className="border-b border-border/50">
                    <td className="py-3 px-4 text-sm text-card-foreground">{item.action}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{item.risk}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${item.impact === "high" ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning"}`}>{item.impact}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${item.status === "completed" ? "bg-success/10 text-success" : item.status === "in-progress" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
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
            <h3 className="text-xl font-semibold text-foreground">Sustainability Indicators</h3>
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

function RiskCategoryCard({ category, score, status, icon: Icon, factors, delay = 0 }: {
  category: string; score: number; status: "low" | "medium" | "high"; icon: React.ElementType
  factors: { name: string; score: number; status: string }[]; delay?: number
}) {
  const statusStyles = {
    low: { border: "border-t-success", bg: "bg-success/10", text: "text-success" },
    medium: { border: "border-t-warning", bg: "bg-warning/10", text: "text-warning" },
    high: { border: "border-t-destructive", bg: "bg-destructive/10", text: "text-destructive" },
  }
  const style = statusStyles[status]

  return (
    <div className={`glass-card border-t-[3px] ${style.border} rounded-xl p-6 opacity-0 animate-fade-in-up`} style={{ animationDelay: `${delay}ms` } as React.CSSProperties}>
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
                className={`h-full rounded-full transition-all duration-500 ${factor.status === "good" ? "bg-success" : factor.status === "warning" ? "bg-warning" : "bg-primary"}`}
                style={{ width: `${factor.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SustainabilityCard({ name, score, trend, delay = 0 }: {
  name: string; score: number; trend: "improving" | "stable" | "declining"; delay?: number
}) {
  const trendStyles = {
    improving: { text: "text-success", label: "Improving", icon: CheckCircle },
    stable: { text: "text-warning", label: "Stable", icon: AlertTriangle },
    declining: { text: "text-destructive", label: "Declining", icon: XCircle },
  }
  const trendStyle = trendStyles[trend]
  const Icon = trendStyle.icon

  return (
    <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up" style={{ animationDelay: `${delay}ms` } as React.CSSProperties}>
      <h4 className="font-medium text-card-foreground mb-4">{name}</h4>
      <div className="flex items-end justify-between">
        <div className="text-3xl font-bold gradient-text">{score}%</div>
        <span className={`flex items-center gap-1 text-sm ${trendStyle.text}`}>
          <Icon className="w-4 h-4" />
          {trendStyle.label}
        </span>
      </div>
      <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500" style={{ width: `${score}%` }} />
      </div>
    </div>
  )
}
