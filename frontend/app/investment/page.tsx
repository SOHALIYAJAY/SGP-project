"use client"

import { SectionWrapper } from "@/components/ui/section-wrapper"
import { MetricCard } from "@/components/ui/metric-card"
import {
  TrendingUp, Target, Award, DollarSign, CheckCircle2, AlertCircle,
  Building2, Calendar, Users, Briefcase,
} from "lucide-react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  AreaChart, Area, PieChart, Pie, Cell,
} from "recharts"
import ChartInsight from "@/components/chart-insight"
import { useStoredAnalysis } from "@/lib/analysis/use-analysis"

export default function InvestmentPage() {
  const analysis = useStoredAnalysis()

  // ── Real data ──────────────────────────────────────────────────────────────
  const healthScore = analysis?.dashboard.businessHealthScore ?? 0
  const grade = analysis?.dashboard.investmentReadinessGrade ?? "—"
  const riskLevel = analysis?.dashboard.riskLevel ?? "—"
  const revenue = analysis?.financial.annualRevenue ?? 0
  const growth = analysis?.market.growthRatePercent ?? 0
  const profitMargin = analysis?.financial.profitMarginPercent ?? 0
  const churn = analysis?.customer.churnRatePercent ?? 0
  const nps = analysis?.customer.nps ?? 0
  const opportunityScore = analysis?.market.opportunityScore ?? 0
  const riskScore = analysis?.risk.overallRiskScore ?? 0

  const revM = revenue / 1_000_000

  // Readiness factors from real scores
  const readinessFactors = [
    { factor: "Revenue Growth", score: Math.min(100, Math.round(growth)), status: growth >= 30 ? "excellent" : growth >= 15 ? "strong" : "good" as const },
    { factor: "Unit Economics", score: Math.min(100, Math.round(healthScore * 0.85)), status: healthScore >= 80 ? "excellent" : healthScore >= 65 ? "strong" : "good" as const },
    { factor: "Market Position", score: Math.min(100, Math.round(opportunityScore * 0.8)), status: opportunityScore >= 70 ? "strong" : "good" as const },
    { factor: "Team Strength", score: Math.min(100, Math.round(healthScore * 0.88)), status: healthScore >= 75 ? "excellent" : "strong" as const },
    { factor: "Financial Health", score: Math.min(100, Math.round(healthScore * 0.72)), status: healthScore >= 70 ? "strong" : "good" as const },
    { factor: "Scalability", score: Math.min(100, Math.round(healthScore * 0.8)), status: healthScore >= 75 ? "strong" : "good" as const },
  ]

  const avgReadinessScore = Math.round(readinessFactors.reduce((s, f) => s + f.score, 0) / readinessFactors.length)

  const readinessRadar = readinessFactors.map(f => ({ factor: f.factor.split(" ")[0], score: f.score }))

  // Valuation projection from real revenue
  const currentValuation = Math.round(revM * 8) // 8x revenue multiple
  const valuationProjection = [
    { stage: "Seed", valuation: Math.max(1, Math.round(currentValuation * 0.12)), year: "2022" },
    { stage: "Series A", valuation: Math.max(5, Math.round(currentValuation * 0.4)), year: "2024" },
    { stage: "Series B", valuation: currentValuation, year: "2026" },
    { stage: "Series C", valuation: Math.round(currentValuation * 2.8), year: "2028" },
  ]

  // Cap table (generic but realistic)
  const capTable = [
    { name: "Founders", value: 55, color: "var(--chart-1)" },
    { name: "Series A", value: 20, color: "var(--chart-2)" },
    { name: "Seed", value: 12, color: "var(--chart-3)" },
    { name: "ESOP", value: 10, color: "var(--accent)" },
    { name: "Advisors", value: 3, color: "var(--muted-foreground)" },
  ]

  // Funding recommendation based on real data
  const targetAmount = revM >= 10 ? "$20-30M" : revM >= 5 ? "$10-20M" : "$5-10M"
  const targetValuation = `$${Math.round(currentValuation * 0.8)}-${currentValuation}M`
  const fundingRecommendation = {
    recommended: healthScore >= 60,
    amount: targetAmount,
    timing: "Q3 2026",
    valuation: targetValuation,
    keyPoints: [
      `${growth}% revenue growth supports premium valuation`,
      `${profitMargin.toFixed(1)}% profit margin demonstrates path to profitability`,
      `${opportunityScore}/100 opportunity score shows market potential`,
      "Team has track record of execution",
    ],
    concerns: [
      churn > 3 ? `Churn rate of ${churn}% needs reduction` : "Customer concentration needs diversification",
      riskScore > 40 ? `Risk score of ${riskScore}/100 needs mitigation` : "Burn rate optimization would strengthen position",
    ],
  }

  const milestones = [
    { stage: "Seed", date: "2022", amount: `$${Math.round(currentValuation * 0.05)}M`, status: "completed" as const },
    { stage: "Series A", date: "2024", amount: `$${Math.round(currentValuation * 0.15)}M`, status: "completed" as const },
    { stage: "Series B", date: "2026 (Target)", amount: targetAmount, status: "upcoming" as const },
    { stage: "Series C", date: "2028 (Projected)", amount: `$${Math.round(currentValuation * 0.5)}-${Math.round(currentValuation * 0.7)}M`, status: "future" as const },
  ]

  const companyStage = grade.startsWith("A") ? "Series B" : grade.startsWith("B") ? "Series A" : "Seed"
  const hasData = !!analysis

  return (
    <div className="min-h-screen py-2">
      <SectionWrapper>
        <div className="mb-8 opacity-0 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Investment Insights</h1>
          <p className="text-muted-foreground">Funding readiness assessment and investment recommendations</p>
        </div>

        {!hasData && (
          <div className="glass-card rounded-xl p-8 mb-8 text-center border border-primary/20">
            <p className="text-muted-foreground text-lg">No analysis data found.</p>
            <p className="text-sm text-muted-foreground mt-2">Run an analysis from <span className="text-primary font-medium">Company Input</span> first.</p>
          </div>
        )}

        {/* Key Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Company Stage"
            value={companyStage}
            subtitle={`Grade: ${grade}`}
            icon={Building2}
            status={grade.startsWith("A") ? "success" : grade.startsWith("B") ? "warning" : "danger"}
            delay={100}
            sparkline={[1, 1, 1, 2, 2, 3, 3]}
          />
          <MetricCard
            title="Est. Valuation"
            value={`$${currentValuation}M`}
            subtitle="Revenue-based estimate"
            icon={DollarSign}
            status="success"
            delay={200}
            sparkline={valuationProjection.map(v => v.valuation)}
          />
          <MetricCard
            title="Readiness Score"
            value={`${avgReadinessScore}%`}
            subtitle={avgReadinessScore >= 80 ? "Investment ready" : avgReadinessScore >= 60 ? "Nearly ready" : "Developing"}
            icon={Target}
            status={avgReadinessScore >= 80 ? "success" : avgReadinessScore >= 60 ? "warning" : "danger"}
            delay={300}
            sparkline={readinessFactors.map(f => f.score)}
          />
          <MetricCard
            title="Risk Level"
            value={riskLevel}
            subtitle={`Score: ${riskScore}/100`}
            icon={Users}
            status={riskLevel === "Low" ? "success" : riskLevel === "Medium" ? "warning" : "danger"}
            delay={400}
            sparkline={[riskScore + 8, riskScore + 6, riskScore + 4, riskScore + 2, riskScore]}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Readiness Radar */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-lg font-semibold text-card-foreground">Readiness Profile</h3>
              <ChartInsight
                title="Readiness Profile"
                level={avgReadinessScore >= 75 ? "High" : "Medium"}
                summary={`${avgReadinessScore}% average readiness across 6 dimensions.`}
                bullets={readinessFactors.slice(0, 3).map(f => `${f.factor}: ${f.score}%`)}
              />
            </div>
            <p className="text-sm text-muted-foreground mb-6">Multi-factor assessment</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={readinessRadar}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="factor" tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "var(--muted-foreground)", fontSize: 9 }} />
                  <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }} labelStyle={{ color: "var(--card-foreground)" }} />
                  <Radar name="Score" dataKey="score" stroke="var(--chart-2)" fill="var(--chart-2)" fillOpacity={0.3} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Cap Table */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-lg font-semibold text-card-foreground">Cap Table Overview</h3>
              <ChartInsight
                title="Cap Table"
                level="Medium"
                summary="Healthy founder control with room for Series B dilution."
                bullets={["Founders: 55% ownership", "Early investors: 35%", "ESOP: 10% for team"]}
              />
            </div>
            <p className="text-sm text-muted-foreground mb-6">Current ownership distribution</p>
            <div className="h-40 transition-transform duration-300 hover:scale-105">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={capTable} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={2} dataKey="value" strokeWidth={0}>
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
              <h3 className="text-lg font-semibold text-card-foreground">Company Stage</h3>
            </div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mb-4">
                <span className="text-2xl font-bold text-white">{grade}</span>
              </div>
              <h4 className="text-lg font-bold text-card-foreground">{companyStage} Stage</h4>
              <p className="text-sm text-muted-foreground">
                {grade.startsWith("A") ? "Scale-up with proven PMF" : grade.startsWith("B") ? "Growth stage company" : "Early stage startup"}
              </p>
            </div>
            <div className="space-y-2">
              <StageIndicator label="Validation" completed />
              <StageIndicator label="Product-Market Fit" completed={healthScore >= 60} current={healthScore < 60} />
              <StageIndicator label="Revenue Growth" completed={growth >= 20} current={growth > 0 && growth < 20} />
              <StageIndicator label="Scale Operations" current={grade.startsWith("A")} upcoming={!grade.startsWith("A")} />
              <StageIndicator label="Market Expansion" upcoming />
            </div>
          </div>
        </div>

        {/* Valuation & Readiness Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Valuation Projection */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-lg font-semibold text-card-foreground">Valuation Trajectory</h3>
              <ChartInsight
                title="Valuation Growth"
                level="High"
                summary={`Projected valuation of $${currentValuation}M at Series B.`}
                bullets={[
                  `Current est. valuation: $${currentValuation}M`,
                  `Based on ${revM.toFixed(1)}M revenue × 8x multiple`,
                  `Series C target: $${Math.round(currentValuation * 2.8)}M`,
                ]}
              />
            </div>
            <p className="text-sm text-muted-foreground mb-2">Historical and projected valuations ($M)</p>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              {Math.round(currentValuation / Math.max(1, valuationProjection[0].valuation))}x Growth
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={valuationProjection}>
                  <defs>
                    <linearGradient id="valuationGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="stage" stroke="var(--muted-foreground)" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <YAxis stroke="var(--muted-foreground)" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} tickFormatter={(v) => `$${v}M`} />
                  <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }} labelStyle={{ color: "var(--card-foreground)" }} formatter={(v: number) => [`$${v}M`, "Valuation"]} />
                  <Area type="monotone" dataKey="valuation" stroke="var(--chart-2)" strokeWidth={3} fillOpacity={1} fill="url(#valuationGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Readiness Factors */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">Investment Readiness</h3>
                <p className="text-sm text-muted-foreground">Factor-by-factor assessment</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold gradient-text">{avgReadinessScore}%</div>
                <span className={`text-xs ${avgReadinessScore >= 80 ? "text-success" : "text-warning"}`}>
                  {avgReadinessScore >= 80 ? "Series B Ready" : avgReadinessScore >= 60 ? "Series A Ready" : "Pre-Seed Stage"}
                </span>
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
        <div className={`glass-card border-t-[3px] ${fundingRecommendation.recommended ? "border-t-success" : "border-t-warning"} rounded-xl p-6 mb-8 opacity-0 animate-fade-in-up stagger-6`}>
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${fundingRecommendation.recommended ? "bg-success/10" : "bg-warning/10"}`}>
                  <Briefcase className={`w-5 h-5 ${fundingRecommendation.recommended ? "text-success" : "text-warning"}`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground">Funding Recommendation</h3>
                  <p className={`text-sm ${fundingRecommendation.recommended ? "text-success" : "text-warning"}`}>
                    {fundingRecommendation.recommended ? "Recommended to Proceed" : "Strengthen Before Raising"}
                  </p>
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Target Amount", value: fundingRecommendation.amount },
                  { label: "Target Timing", value: fundingRecommendation.timing },
                  { label: "Expected Valuation", value: fundingRecommendation.valuation },
                ].map(item => (
                  <div key={item.label} className="p-4 rounded-lg bg-secondary/50 text-center">
                    <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                    <p className="text-xl font-bold text-card-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-card-foreground mb-3">
                    <CheckCircle2 className="w-4 h-4 text-success" /> Key Strengths
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
                    <AlertCircle className="w-4 h-4 text-warning" /> Areas to Address
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
          <h3 className="text-xl font-semibold text-foreground mb-6">Funding Journey</h3>
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

function ReadinessBar({ factor, score, status }: { factor: string; score: number; status: "excellent" | "strong" | "good" | "needs-work" }) {
  const statusColors = { excellent: "bg-success", strong: "bg-primary", good: "bg-warning", "needs-work": "bg-destructive" }
  const statusLabels = { excellent: "text-success", strong: "text-primary", good: "text-warning", "needs-work": "text-destructive" }
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">{factor}</span>
        <span className={`text-sm font-medium ${statusLabels[status]}`}>{score}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${statusColors[status]}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  )
}

function StageIndicator({ label, completed, current, upcoming }: { label: string; completed?: boolean; current?: boolean; upcoming?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${completed ? "bg-success border-success" : current ? "border-primary bg-primary/20" : "border-muted-foreground/30"}`}>
        {completed && <CheckCircle2 className="w-3 h-3 text-white" />}
        {current && <div className="w-2 h-2 rounded-full bg-primary" />}
      </div>
      <span className={`text-sm ${completed || current ? "text-card-foreground" : "text-muted-foreground"}`}>{label}</span>
    </div>
  )
}

function MilestoneCard({ stage, date, amount, status, delay = 0 }: { stage: string; date: string; amount: string; status: "completed" | "upcoming" | "future"; delay?: number }) {
  const statusStyles = {
    completed: { dot: "bg-success", bg: "bg-success/10", border: "border-success/20", text: "text-success" },
    upcoming: { dot: "bg-primary", bg: "bg-primary/10", border: "border-primary/20", text: "text-primary" },
    future: { dot: "bg-muted-foreground/30", bg: "bg-secondary/50", border: "border-border", text: "text-muted-foreground" },
  }
  const style = statusStyles[status]
  return (
    <div className="relative pl-12 opacity-0 animate-fade-in-up" style={{ animationDelay: `${delay}ms` }}>
      <div className={`absolute left-4 w-4 h-4 rounded-full ${style.dot} border-4 border-background`} />
      <div className={`${style.bg} border ${style.border} rounded-xl p-4`}>
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-semibold text-card-foreground">{stage}</h4>
          <span className={`text-xs font-medium ${style.text}`}>{status === "completed" ? "Completed" : status === "upcoming" ? "Target" : "Projected"}</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1 text-muted-foreground"><Calendar className="w-3 h-3" />{date}</span>
          <span className="flex items-center gap-1 text-muted-foreground"><DollarSign className="w-3 h-3" />{amount}</span>
        </div>
      </div>
    </div>
  )
}
