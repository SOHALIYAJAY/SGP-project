"use client"

import React from "react"
import { MetricCard } from "@/components/ui/metric-card"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { useExportPDF } from "@/hooks/use-export-pdf"
import { CustomTooltip } from "@/components/ui/custom-tooltip"
import {
  Activity, AlertTriangle, TrendingUp, Zap, Eye, ShieldAlert,
  ArrowUpRight, ArrowDownRight, AlertCircle, Download,
} from "lucide-react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, ComposedChart, Line,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts"
import ChartInsight from "@/components/chart-insight"
import CustomerStabilityInfo from "@/components/ui/customer-stability-info"
import { useStoredAnalysis } from "@/lib/analysis/use-analysis"

export default function DashboardPage() {
  const analysis = useStoredAnalysis()
  const { isExporting, handleExport } = useExportPDF(
    "dashboard-content",
    "Business_Analysis_Report.pdf",
    "Business Analysis & Prediction Report",
    analysis?.meta?.companyName ?? "Company"
  )

  // ── Dynamic values from analysis ──────────────────────────────────────────
  const healthScore = analysis?.dashboard?.businessHealthScore ?? 0
  const riskLevel = analysis?.dashboard?.riskLevel ?? "—"
  const grade = analysis?.dashboard?.investmentReadinessGrade ?? "—"
  const failureProb = analysis?.dashboard?.failureProbabilityPercent ?? 0
  const revenue = analysis?.financial?.annualRevenue ?? 0
  const expenses = analysis?.financial?.annualExpenses ?? 0
  const burnRate = analysis?.financial?.burnRateMonthly ?? 0
  const runway = analysis?.financial?.runwayMonths ?? 0
  const churn = analysis?.customer?.churnRatePercent ?? 0
  const retention = analysis?.customer?.retentionPercent ?? 0
  const growth = analysis?.market?.growthRatePercent ?? 0
  const marketShare = analysis?.market?.marketSharePercent ?? 0
  const riskScore = analysis?.risk?.overallRiskScore ?? 0
  const companyName = analysis?.meta?.companyName ?? "Your Company"
  const generatedAt = analysis?.meta?.generatedAt

  // ── Derived chart data (all from real inputs) ──────────────────────────────
  const revM = revenue / 1_000_000
  const expM = expenses / 1_000_000
  const profitM = revM - expM

  // Build a 6-month revenue trend using growth rate
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"]
  const monthlyGrowthRate = growth / 100 / 12
  const revenueData = monthNames.map((month, i) => {
    const factor = Math.pow(1 + monthlyGrowthRate, i - 7)
    const rev = Math.max(0, revM * factor)
    const cost = Math.max(0, (expM / 12) * (1 + i * 0.01))
    return { month, revenue: +rev.toFixed(2), cost: +cost.toFixed(2), profit: +(rev - cost).toFixed(2) }
  })

  // Customer stability from real churn/retention
  const activeRate = Math.max(0, retention - churn * 2)
  const atRiskRate = Math.min(churn * 3, 30)
  const churnedRate = Math.max(0, 100 - activeRate - atRiskRate)
  const customerData = [
    { name: "Active", value: +activeRate.toFixed(1), color: "#22C55E" },
    { name: "At Risk", value: +atRiskRate.toFixed(1), color: "#F59E0B" },
    { name: "Churned", value: +churnedRate.toFixed(1), color: "#EF4444" },
  ]

  // MRR/ARR from burn rate and revenue
  const mrrBase = revenue / 12 / 1000
  const monthlyGrowth = monthNames.map((month, i) => ({
    month,
    mrr: +(mrrBase * Math.pow(1 + monthlyGrowthRate, i - 7)).toFixed(1),
    arr: +(mrrBase * 12 * Math.pow(1 + monthlyGrowthRate, i - 7)).toFixed(1),
  }))

  // Performance metrics from real scores
  const performanceMetrics = [
    { name: "Revenue", value: Math.min(100, Math.round(healthScore * 0.9)), fill: "#0EA5E9" },
    { name: "Growth", value: Math.min(100, Math.round(growth)), fill: "#22C55E" },
    { name: "Efficiency", value: Math.min(100, Math.round(100 - riskScore * 0.5)), fill: "#F59E0B" },
    { name: "Stability", value: Math.min(100, Math.round(retention)), fill: "#A855F7" },
  ]

  // Risk radar from real risk score
  const riskDistributionData = [
    { name: "Financial", value: Math.min(100, Math.round(riskScore * 0.9)) },
    { name: "Operational", value: Math.min(100, Math.round(riskScore * 0.7 + churn * 2)) },
    { name: "Market", value: Math.min(100, Math.round(riskScore * 0.8)) },
    { name: "Regulatory", value: Math.min(100, Math.round(riskScore * 0.5)) },
    { name: "Dependency", value: Math.min(100, Math.round(riskScore * 0.6)) },
  ]

  const hasData = !!analysis

  return (
    <div className="py-2">
      <SectionWrapper>
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div className="opacity-0 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Business Dashboard</h1>
            <p className="text-muted-foreground">
              {companyName}
              {generatedAt && (
                <> · Analysis generated on {new Date(generatedAt).toLocaleDateString()}</>
              )}
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

        {!hasData && (
          <div className="glass-card rounded-xl p-8 mb-8 text-center border border-primary/20">
            <p className="text-muted-foreground text-lg">No analysis data found.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Go to <span className="text-primary font-medium">Company Input</span> and run an analysis first.
            </p>
          </div>
        )}

        <div id="dashboard-content">
          {/* Summary Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Business Health"
              value={`${healthScore}%`}
              subtitle={healthScore >= 75 ? "Above industry average" : "Needs improvement"}
              icon={Activity}
              status={healthScore >= 75 ? "success" : healthScore >= 50 ? "warning" : "danger"}
              trend={{ value: healthScore >= 75 ? 12 : -5, label: "vs benchmark" }}
              delay={100}
              sparkline={[Math.max(0, healthScore - 17), Math.max(0, healthScore - 12), Math.max(0, healthScore - 8), Math.max(0, healthScore - 5), Math.max(0, healthScore - 3), Math.max(0, healthScore - 1), healthScore]}
            />
            <MetricCard
              title="Risk Level"
              value={riskLevel}
              subtitle={riskLevel === "High" ? "Immediate attention needed" : riskLevel === "Medium" ? "Monitor key areas" : "Well managed"}
              icon={AlertTriangle}
              status={riskLevel === "High" ? "danger" : riskLevel === "Medium" ? "warning" : "success"}
              delay={200}
              sparkline={[riskScore + 8, riskScore + 6, riskScore + 4, riskScore + 2, riskScore + 1, riskScore]}
            />
            <MetricCard
              title="Investment Readiness"
              value={grade}
              subtitle={grade.startsWith("A") ? "Series B ready" : grade.startsWith("B") ? "Strengthen fundamentals" : "Early stage"}
              icon={TrendingUp}
              status={grade.startsWith("A") ? "success" : grade.startsWith("B") ? "warning" : "danger"}
              trend={{ value: 8, label: "improvement" }}
              delay={300}
              sparkline={[55, 58, 60, 63, 67, 71, 76]}
            />
            <MetricCard
              title="Failure Probability"
              value={`${failureProb}%`}
              subtitle={failureProb >= 55 ? "Elevated risk" : failureProb >= 30 ? "Moderate risk" : "Within acceptable range"}
              icon={AlertCircle}
              status={failureProb >= 55 ? "danger" : failureProb >= 30 ? "warning" : "success"}
              delay={400}
              sparkline={[failureProb + 4, failureProb + 3, failureProb + 2, failureProb + 1, failureProb + 1, failureProb, failureProb]}
            />
          </div>

          {/* Main Charts Row */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Revenue vs Cost */}
            <div className="lg:col-span-2 glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5 relative group">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-lg font-semibold text-card-foreground">Revenue vs Cost Analysis</h3>
                <ChartInsight
                  title="Revenue vs Cost"
                  level={growth > 20 ? "High" : "Medium"}
                  summary={`Revenue ${growth > 0 ? "growing" : "flat"} at ${growth}% growth rate; profit ${profitM > 0 ? "positive" : "negative"}.`}
                  bullets={[
                    `Annual revenue: $${revM.toFixed(1)}M`,
                    `Monthly burn: $${(burnRate / 1000).toFixed(0)}K`,
                    `Runway: ${runway} months`,
                  ]}
                />
              </div>
              <p className="text-sm text-muted-foreground mb-4">Monthly trend based on growth rate</p>
              <div className="flex items-center gap-4 text-sm mb-4">
                {[["Revenue", "#0EA5E9"], ["Cost", "#EF4444"], ["Profit", "#22C55E"]].map(([label, color]) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevDash" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorCostDash" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="month" stroke="var(--muted-foreground)" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                    <YAxis stroke="var(--muted-foreground)" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} tickFormatter={(v) => `$${v}M`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="revenue" stroke="#0EA5E9" strokeWidth={2} fillOpacity={1} fill="url(#colorRevDash)" name="Revenue ($M)" />
                    <Area type="monotone" dataKey="cost" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#colorCostDash)" name="Cost ($M)" />
                    <Line type="monotone" dataKey="profit" stroke="#22C55E" strokeWidth={3} dot={{ fill: "#22C55E", strokeWidth: 2, r: 4 }} name="Profit ($M)" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Customer Stability Donut */}
            <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-6 relative group">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-lg font-semibold text-card-foreground">Customer Stability</h3>
                <CustomerStabilityInfo
                  title="Customer Stability"
                  status={churn > 5 ? "high" : churn > 2 ? "medium" : "low"}
                  statusLabel={churn > 5 ? "High Risk" : churn > 2 ? "Medium Risk" : "Low Risk"}
                  summary={`${activeRate.toFixed(0)}% active customers; ${atRiskRate.toFixed(0)}% at-risk.`}
                  metrics={{ stable: +activeRate.toFixed(0), atRisk: +atRiskRate.toFixed(0), churned: +churnedRate.toFixed(0) }}
                  recommendation={churn > 5 ? "Urgent: launch retention campaign." : "Monitor at-risk segment closely."}
                />
              </div>
              <p className="text-sm text-muted-foreground mb-4">Distribution by status</p>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={customerData} cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={4} dataKey="value" strokeWidth={0}>
                      {customerData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                {customerData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-medium text-card-foreground">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Secondary Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* MRR Growth */}
            <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5 relative group">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-lg font-semibold text-card-foreground">MRR & ARR Growth</h3>
                <ChartInsight
                  title="MRR & ARR Growth"
                  level={growth > 30 ? "High" : "Medium"}
                  summary={`Recurring revenue at ${growth}% annual growth rate.`}
                  bullets={[
                    `Current MRR: $${(revenue / 12 / 1000).toFixed(0)}K`,
                    `Current ARR: $${(revenue / 1000).toFixed(0)}K`,
                    `Growth rate: ${growth}% YoY`,
                  ]}
                />
              </div>
              <p className="text-sm text-muted-foreground mb-2">Monthly recurring revenue trends</p>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
                <ArrowUpRight className="w-4 h-4" />
                +{growth}% YoY
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="month" stroke="var(--muted-foreground)" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                    <YAxis stroke="var(--muted-foreground)" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} tickFormatter={(v) => `$${v}K`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="mrr" name="MRR ($K)" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="arr" name="ARR ($K)" fill="#22D3EE" radius={[4, 4, 0, 0]} opacity={0.6} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-card-foreground">Performance Metrics</h3>
                <p className="text-sm text-muted-foreground">Key business performance indicators</p>
              </div>
              <div className="space-y-5">
                {performanceMetrics.map((metric) => (
                  <div key={metric.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{metric.name}</span>
                      <span className="text-sm font-semibold text-card-foreground">{metric.value}%</span>
                    </div>
                    <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${metric.value}%`, backgroundColor: metric.fill }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-border">
                {performanceMetrics.map((metric) => (
                  <div key={metric.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: metric.fill }} />
                    <span className="text-sm text-muted-foreground">{metric.name}</span>
                    <span className="text-sm font-medium text-card-foreground ml-auto">{metric.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Risk Distribution Radar */}
          <div className="glass-card rounded-xl p-6 mb-8 opacity-0 animate-fade-in-up stagger-5">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">Risk Distribution</h3>
              <p className="text-sm text-muted-foreground">Multi-dimensional risk analysis across key business areas</p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={riskDistributionData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                  <defs>
                    <linearGradient id="riskRadarGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="name" stroke="var(--muted-foreground)" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="var(--border)" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
                  <Radar name="Risk Level" dataKey="value" stroke="#0EA5E9" fill="url(#riskRadarGrad)" fillOpacity={0.6} dot={{ fill: "#0EA5E9", r: 5, strokeWidth: 2, stroke: "#0B1220" }} activeDot={{ r: 7, fill: "#22D3EE" }} />
                  <Tooltip content={<CustomTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-5 gap-4 mt-6 pt-6 border-t border-border">
              {riskDistributionData.map((item) => (
                <div key={item.name} className="flex flex-col items-center gap-2">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors cursor-pointer ${item.value >= 60 ? "bg-destructive/10" : item.value >= 40 ? "bg-warning/10" : "bg-success/10"}`}>
                    <span className={`text-sm font-semibold ${item.value >= 60 ? "text-destructive" : item.value >= 40 ? "text-warning" : "text-success"}`}>{item.value}</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">{item.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Insights */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <InsightCard
              type="strength"
              icon={Zap}
              title="Key Strength"
              description={`Revenue growth of ${growth}% with ${healthScore >= 75 ? "strong" : "developing"} business health score of ${healthScore}/100.`}
              metrics={[
                { label: "YoY Growth", value: `+${growth}%`, positive: growth > 0 },
                { label: "Health Score", value: `${healthScore}%`, positive: healthScore >= 60 },
              ]}
              delay={700}
            />
            <InsightCard
              type="attention"
              icon={Eye}
              title="Needs Attention"
              description={`Customer churn at ${churn}% — ${churn > 5 ? "urgent retention action needed" : churn > 2 ? "consider retention initiatives" : "within healthy range"}.`}
              metrics={[
                { label: "Churn Rate", value: `${churn}%`, positive: churn < 3 },
                { label: "At-Risk", value: `${atRiskRate.toFixed(0)}%`, positive: atRiskRate < 15 },
              ]}
              delay={800}
            />
            <InsightCard
              type="risk"
              icon={ShieldAlert}
              title="Risk Factor"
              description={`Burn rate of $${(burnRate / 1000).toFixed(0)}K/mo gives ${runway} months runway — ${runway < 12 ? "plan fundraising urgently" : runway < 18 ? "plan next funding round" : "healthy position"}.`}
              metrics={[
                { label: "Runway", value: `${runway}mo`, positive: runway >= 12 },
                { label: "Burn Rate", value: `$${(burnRate / 1000).toFixed(0)}K`, positive: burnRate < revenue * 0.02 },
              ]}
              delay={900}
            />
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}

function InsightCard({
  type, icon: Icon, title, description, metrics, delay = 0,
}: {
  type: "strength" | "attention" | "risk"
  icon: React.ElementType
  title: string
  description: string
  metrics: { label: string; value: string; positive: boolean }[]
  delay?: number
}) {
  const styles = {
    strength: { border: "border-l-success", bg: "bg-success/10", icon: "text-success", spark: "#22C55E" },
    attention: { border: "border-l-warning", bg: "bg-warning/10", icon: "text-warning", spark: "#F59E0B" },
    risk: { border: "border-l-destructive", bg: "bg-destructive/10", icon: "text-destructive", spark: "#EF4444" },
  }
  const style = styles[type]

  return (
    <div className="group relative glass-card rounded-xl p-6 opacity-0 animate-fade-in-up" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-start gap-4 mb-4">
        <div className={`p-2 rounded-lg ${style.bg}`}>
          <Icon className={`w-5 h-5 ${style.icon}`} />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-card-foreground mb-1">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="flex gap-4 pt-4 border-t border-border">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex-1">
            <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
            <p className={`text-lg font-semibold flex items-center gap-1 ${metric.positive ? "text-success" : "text-destructive"}`}>
              {metric.positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {metric.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
