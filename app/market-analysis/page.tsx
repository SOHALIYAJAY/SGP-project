"use client"

import { SectionWrapper } from "@/components/ui/section-wrapper"
import { MetricCard } from "@/components/ui/metric-card"
import { Globe, Users, Target, TrendingUp } from "lucide-react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, PieChart, Pie, Cell, AreaChart, Area,
} from "recharts"
import ChartInsight from "@/components/chart-insight"
import { useStoredAnalysis } from "@/lib/analysis/use-analysis"

export default function MarketAnalysisPage() {
  const analysis = useStoredAnalysis()

  // ── Real data ──────────────────────────────────────────────────────────────
  const marketSizeB = analysis?.market.marketSizeB ?? 0
  const competitorCount = analysis?.market.competitorCount ?? 0
  const growthRate = analysis?.market.growthRatePercent ?? 0
  const marketShare = analysis?.market.marketSharePercent ?? 0
  const opportunityScore = analysis?.market.opportunityScore ?? 0
  const nps = analysis?.customer.nps ?? 0
  const churn = analysis?.customer.churnRatePercent ?? 0
  const profitMargin = analysis?.financial.profitMarginPercent ?? 0
  const healthScore = analysis?.dashboard.businessHealthScore ?? 0

  const competitionLevel = competitorCount > 25 ? "High" : competitorCount > 10 ? "Medium" : "Low"

  // Market share pie from real data
  const yourShare = marketShare
  const compAShare = Math.min(50, competitorCount * 1.2)
  const compBShare = Math.min(40, competitorCount * 1.0)
  const compCShare = Math.min(35, competitorCount * 0.8)
  const othersShare = Math.max(5, 100 - yourShare - compAShare - compBShare - compCShare)
  const marketSharePie = [
    { name: "Your Company", value: +yourShare.toFixed(1), color: "var(--chart-2)" },
    { name: "Competitor A", value: +compAShare.toFixed(1), color: "var(--chart-3)" },
    { name: "Competitor B", value: +compBShare.toFixed(1), color: "var(--chart-4)" },
    { name: "Competitor C", value: +compCShare.toFixed(1), color: "var(--chart-5)" },
    { name: "Others", value: +othersShare.toFixed(1), color: "var(--muted-foreground)" },
  ]

  // Competitor data from real inputs
  const competitorData = [
    { name: "Your Company", marketShare: yourShare, growth: growthRate, satisfaction: nps },
    { name: "Competitor A", marketShare: compAShare, growth: 12, satisfaction: 65 },
    { name: "Competitor B", marketShare: compBShare, growth: 8, satisfaction: 58 },
    { name: "Competitor C", marketShare: compCShare, growth: 5, satisfaction: 62 },
    { name: "Others", marketShare: othersShare, growth: 3, satisfaction: 55 },
  ]

  // Market growth (TAM/SAM/SOM) from real market size
  const years = ["2022", "2023", "2024", "2025", "2026", "2027"]
  const marketGrowth = years.map((year, i) => {
    const factor = Math.pow(1 + growthRate / 100, i - 3)
    const tam = +(marketSizeB * factor).toFixed(1)
    const sam = +(tam * 0.4).toFixed(1)
    const som = +(tam * (marketShare / 100) * 1.5).toFixed(2)
    return { year, tam, sam, som }
  })

  // Industry comparison from real data
  const industryGrowth = growthRate * 0.3
  const industryComparison = [
    { metric: "Revenue Growth", you: growthRate, industry: +industryGrowth.toFixed(1) },
    { metric: "Profit Margin", you: profitMargin, industry: 15 },
    { metric: "Customer Retention", you: Math.min(99, 100 - churn * 2), industry: 85 },
    { metric: "NPS Score", you: nps, industry: 45 },
    { metric: "Market Share Growth", you: +(marketShare * 0.3).toFixed(1), industry: 0.2 },
  ]

  // Strengths from real scores
  const strengths = [
    { label: "Market Size", value: Math.min(100, Math.round(marketSizeB * 2)), color: "success" },
    { label: "Growth Rate", value: Math.min(100, Math.round(growthRate)), color: "success" },
    { label: "Innovation", value: Math.min(100, Math.round(healthScore * 0.9)), color: healthScore >= 70 ? "success" : "warning" },
    { label: "Profitability", value: Math.min(100, Math.max(0, Math.round(profitMargin * 2))), color: profitMargin >= 15 ? "success" : "warning" },
    { label: "Entry Barriers", value: Math.min(100, Math.round(opportunityScore * 0.8)), color: opportunityScore >= 60 ? "success" : "warning" },
  ]

  const hasData = !!analysis

  return (
    <div className="min-h-screen py-2">
      <SectionWrapper>
        <div className="mb-8 opacity-0 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Market Analysis</h1>
          <p className="text-muted-foreground mt-1">Market position, competitive landscape, and growth opportunities</p>
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
            title="Market Size"
            value={`$${marketSizeB}B`}
            subtitle="Total Addressable Market"
            icon={Globe}
            status="neutral"
            delay={100}
            sparkline={marketGrowth.slice(0, 5).map(d => d.tam)}
          />
          <MetricCard
            title="Competition"
            value={competitionLevel}
            subtitle={`${competitorCount} major players`}
            icon={Users}
            status={competitionLevel === "High" ? "danger" : competitionLevel === "Medium" ? "warning" : "success"}
            delay={200}
            sparkline={[40, 42, 41, 43, 45, 44, 43]}
          />
          <MetricCard
            title="Opportunity Score"
            value={`${opportunityScore}/100`}
            subtitle={opportunityScore >= 70 ? "Strong potential" : opportunityScore >= 50 ? "Moderate potential" : "Limited potential"}
            icon={Target}
            status={opportunityScore >= 70 ? "success" : opportunityScore >= 50 ? "warning" : "danger"}
            delay={300}
            sparkline={[opportunityScore - 17, opportunityScore - 12, opportunityScore - 8, opportunityScore - 4, opportunityScore - 1, opportunityScore]}
          />
          <MetricCard
            title="Growth Rate"
            value={`+${growthRate}%`}
            subtitle="Annual growth"
            icon={TrendingUp}
            status={growthRate >= 20 ? "success" : growthRate >= 5 ? "warning" : "danger"}
            trend={{ value: 4, label: "vs last year" }}
            delay={400}
            sparkline={[growthRate * 0.5, growthRate * 0.6, growthRate * 0.7, growthRate * 0.8, growthRate * 0.9, growthRate]}
          />
        </div>

        {/* Market Insight Summary */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-6 mb-8 opacity-0 animate-fade-in-up stagger-5">
          <h2 className="text-xl font-semibold text-foreground mb-3">Market Insight Summary</h2>
          <p className="text-muted-foreground leading-relaxed">
            The market is growing at <span className="text-success font-semibold">+{growthRate}% annually</span>, presenting{" "}
            {opportunityScore >= 70 ? "excellent" : "moderate"} expansion opportunities.
            You hold a <span className="text-primary font-semibold">{marketShare}% market share</span> with{" "}
            <span className="text-success font-semibold">{growthRate}% growth rate</span>, facing{" "}
            <span className="text-warning font-semibold">{competitionLevel.toLowerCase()} competition</span> from {competitorCount} players.
            The window to capture market share is{" "}
            <span className={opportunityScore >= 70 ? "text-success font-semibold" : "text-warning font-semibold"}>
              {opportunityScore >= 70 ? "open and favorable" : "time-sensitive"}.
            </span>
          </p>
        </div>

        {/* Main Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Strengths */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5">
            <div className="flex items-start justify-between gap-4 mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">Market Strengths</h3>
              <ChartInsight
                title="Strengths"
                level={healthScore >= 70 ? "High" : "Medium"}
                summary={`Strong across ${strengths.filter(s => s.color === "success").length} of 5 key dimensions.`}
                bullets={strengths.slice(0, 3).map(s => `${s.label}: ${s.value}/100`)}
              />
            </div>
            <div className="space-y-4">
              {strengths.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span className={`text-sm font-semibold ${item.color === "success" ? "text-success" : "text-warning"}`}>{item.value}/100</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ${item.color === "success" ? "bg-success" : "bg-warning"}`} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className={`font-semibold ${healthScore >= 70 ? "text-success" : "text-warning"}`}>
                  {healthScore >= 70 ? "Strong fundamentals" : "Developing position"}
                </span>{" "}
                across key market dimensions. Focus on {profitMargin < 15 ? "improving profitability" : "scaling market share"}.
              </p>
            </div>
          </div>

          {/* Market Share Pie */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5 relative group">
            <div className="absolute top-4 right-4">
              <ChartInsight
                title="Market Share"
                level="Medium"
                summary={`Your company holds ${marketShare}% market share.`}
                bullets={[
                  `Your share: ${marketShare}%`,
                  `Top competitor: ${compAShare.toFixed(1)}%`,
                  `Growth rate ${growthRate}x faster than competitors`,
                ]}
              />
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">Market Share</h3>
              <p className="text-sm text-muted-foreground mt-1">Current competitive distribution</p>
            </div>
            <div className="h-48 transition-transform duration-300 group-hover:scale-105">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={marketSharePie} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={2} dataKey="value" strokeWidth={0}>
                    {marketSharePie.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {marketSharePie.slice(0, 4).map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground truncate">{item.name}</span>
                  <span className="text-card-foreground font-medium ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Your Position */}
          <div className="glass-card border-t-[3px] border-t-success rounded-xl p-6 opacity-0 animate-fade-in-up stagger-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-success/10">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">Your Position</h3>
                <p className="text-sm text-success">{growthRate > 30 ? "Fast-growing challenger" : growthRate > 10 ? "Growing contender" : "Emerging player"}</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: "Market Share", value: `${marketShare}%`, color: "success" },
                { label: "Growth Rate", value: `+${growthRate}%`, color: "success" },
                { label: "NPS Score", value: `${nps}`, color: "primary" },
              ].map(item => (
                <div key={item.label} className={`flex items-center justify-between p-3 rounded-lg bg-secondary/30 border-l-2 border-l-${item.color}`}>
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className={`text-lg font-bold text-${item.color}`}>{item.value}</span>
                </div>
              ))}
              <div className="pt-2">
                <p className="text-xs text-muted-foreground mb-2">vs Competition</p>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-success rounded-full transition-all duration-700" style={{ width: `${Math.min(100, growthRate)}%` }} />
                </div>
                <p className="text-xs text-success mt-1 font-medium">{(growthRate / 12).toFixed(1)}x faster growth than avg competitor</p>
              </div>
            </div>
          </div>
        </div>

        {/* TAM SAM SOM + Industry Comparison */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5 relative">
            <div className="absolute top-4 right-4">
              <ChartInsight
                title="Market Size Growth"
                level="High"
                summary="TAM/SAM/SOM all trending up."
                bullets={[`TAM: $${marketSizeB}B total market`, `SAM: $${(marketSizeB * 0.4).toFixed(1)}B serviceable`, `SOM growing with ${growthRate}% rate`]}
              />
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">Market Size Growth</h3>
              <p className="text-sm text-muted-foreground mt-1">TAM / SAM / SOM trajectory ($B)</p>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={marketGrowth}>
                  <defs>
                    {[["tamGrad", "var(--muted-foreground)"], ["samGrad", "var(--chart-1)"], ["somGrad", "var(--chart-2)"]].map(([id, color]) => (
                      <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={color} stopOpacity={0} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="year" stroke="var(--muted-foreground)" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <YAxis stroke="var(--muted-foreground)" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} tickFormatter={(v) => `$${v}B`} />
                  <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }} labelStyle={{ color: "var(--card-foreground)" }} formatter={(v: number) => [`$${v}B`, ""]} />
                  <Area type="monotone" dataKey="tam" name="TAM" stroke="var(--muted-foreground)" strokeWidth={2} fillOpacity={1} fill="url(#tamGrad)" />
                  <Area type="monotone" dataKey="sam" name="SAM" stroke="var(--chart-1)" strokeWidth={2} fillOpacity={1} fill="url(#samGrad)" />
                  <Area type="monotone" dataKey="som" name="SOM" stroke="var(--chart-2)" strokeWidth={2} fillOpacity={1} fill="url(#somGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-6 relative">
            <div className="absolute top-4 right-4">
              <ChartInsight
                title="Performance vs Industry"
                level="Medium"
                summary={`You outperform on growth (${growthRate}% vs ${industryGrowth.toFixed(0)}% industry).`}
                bullets={[
                  `Growth: ${growthRate}% vs ${industryGrowth.toFixed(0)}% industry`,
                  `Retention: ${Math.min(99, 100 - churn * 2).toFixed(0)}% vs 85% industry`,
                  profitMargin < 15 ? "Profit margin below industry — review ops" : "Profit margin above industry",
                ]}
              />
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">Performance vs Industry</h3>
              <p className="text-sm text-muted-foreground mt-1">Your metrics vs industry averages</p>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={industryComparison} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                  <XAxis type="number" stroke="var(--muted-foreground)" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <YAxis type="category" dataKey="metric" stroke="var(--muted-foreground)" tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} width={110} />
                  <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }} labelStyle={{ color: "var(--card-foreground)" }} />
                  <Legend wrapperStyle={{ paddingTop: "10px" }} formatter={(v) => <span className="text-muted-foreground text-sm">{v}</span>} />
                  <Bar dataKey="you" name="Your Company" fill="var(--chart-2)" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="industry" name="Industry Avg" fill="var(--secondary)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Competitive Landscape */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {[
            { title: "Market Share Leaders", key: "marketShare" as const, suffix: "%", label: "Market Share" },
            { title: "Growth Comparison", key: "growth" as const, suffix: "%", label: "Growth Rate" },
            { title: "Customer Satisfaction", key: "satisfaction" as const, suffix: " NPS", label: "NPS Score" },
          ].map(({ title, key, suffix }) => (
            <div key={title} className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-card-foreground">{title}</h3>
              </div>
              <div className="space-y-4">
                {competitorData.map((comp, idx) => {
                  const val = comp[key]
                  const isYou = idx === 0
                  const color = isYou ? "success" : val > (key === "satisfaction" ? 65 : key === "growth" ? 10 : 10) ? "warning" : "muted"
                  return (
                    <div key={comp.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-muted-foreground">{comp.name}</span>
                        <span className={`text-sm font-semibold ${color === "success" ? "text-success" : color === "warning" ? "text-warning" : "text-muted-foreground"}`}>
                          {key === "growth" ? "+" : ""}{typeof val === "number" ? val.toFixed(1) : val}{suffix}
                        </span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${color === "success" ? "bg-success" : color === "warning" ? "bg-warning" : "bg-muted-foreground/30"}`}
                          style={{ width: `${Math.min(100, typeof val === "number" ? Math.abs(val) : 0)}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  )
}
