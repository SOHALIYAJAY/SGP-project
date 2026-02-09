"use client"

import { SectionWrapper } from "@/components/ui/section-wrapper"
import { MetricCard } from "@/components/ui/metric-card"
import { ChartInfoIcon } from "@/components/ui/chart-info-icon"
import {
  Globe,
  Users,
  Target,
  TrendingUp,
  Zap,
  Building2,
  Lightbulb,
  Rocket,
  BarChart3,
  AlertTriangle,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import ChartInsight from '@/components/chart-insight'

const radarData = [
  { subject: "Market Size", A: 85, fullMark: 100 },
  { subject: "Growth Rate", A: 92, fullMark: 100 },
  { subject: "Competition", A: 65, fullMark: 100 },
  { subject: "Entry Barriers", A: 78, fullMark: 100 },
  { subject: "Profitability", A: 70, fullMark: 100 },
  { subject: "Innovation", A: 88, fullMark: 100 },
]

const competitorData = [
  { name: "Your Company", marketShare: 2.5, growth: 85, satisfaction: 72 },
  { name: "Competitor A", marketShare: 18, growth: 12, satisfaction: 65 },
  { name: "Competitor B", marketShare: 15, growth: 8, satisfaction: 58 },
  { name: "Competitor C", marketShare: 12, growth: 5, satisfaction: 62 },
  { name: "Others", marketShare: 52.5, growth: 3, satisfaction: 55 },
]

const marketSharePie = [
  { name: "Your Company", value: 2.5, color: "var(--chart-2)" },
  { name: "Competitor A", value: 18, color: "var(--chart-3)" },
  { name: "Competitor B", value: 15, color: "var(--chart-4)" },
  { name: "Competitor C", value: 12, color: "var(--chart-5)" },
  { name: "Others", value: 52.5, color: "var(--muted-foreground)" },
]

const marketGrowth = [
  { year: "2022", tam: 35, sam: 12, som: 0.8 },
  { year: "2023", tam: 40, sam: 15, som: 1.2 },
  { year: "2024", tam: 45, sam: 18, som: 1.8 },
  { year: "2025", tam: 50, sam: 22, som: 2.5 },
  { year: "2026", tam: 58, sam: 28, som: 4.0 },
  { year: "2027", tam: 68, sam: 35, som: 6.5 },
]

const industryComparison = [
  { metric: "Revenue Growth", you: 85, industry: 25 },
  { metric: "Profit Margin", you: 22, industry: 15 },
  { metric: "Customer Retention", you: 97, industry: 85 },
  { metric: "NPS Score", you: 72, industry: 45 },
  { metric: "Market Share Growth", you: 0.7, industry: 0.2 },
]

const marketTrends = [
  {
    trend: "AI Integration",
    impact: "high",
    relevance: 95,
    description: "Increasing demand for AI-powered solutions in your industry",
  },
  {
    trend: "Remote Work",
    impact: "medium",
    relevance: 78,
    description: "Shift to remote work creating new market opportunities",
  },
  {
    trend: "Sustainability",
    impact: "medium",
    relevance: 65,
    description: "Growing focus on sustainable business practices",
  },
  {
    trend: "Data Privacy",
    impact: "high",
    relevance: 88,
    description: "Stricter regulations creating compliance requirements",
  },
]

export default function MarketAnalysisPage() {
  return (
    <div className="min-h-screen py-2">
      <SectionWrapper>
        {/* Header */}
        <div className="mb-8 opacity-0 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Market Analysis
          </h1>
        </div>

        {/* Key Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 items-stretch">
          <div className="border-t-4 border-t-cyan-500 h-full">
            <MetricCard
              title="Market Size"
              value="$50B"
              subtitle="Total Addressable"
              icon={Globe}
              status="neutral"
              delay={100}
              sparkline={[60,62,63,64,65,66,67]}
            />
          </div>
          <MetricCard
            title="Competition"
            value="Medium"
            subtitle="15 major players"
            icon={Users}
            status="warning"
            delay={200}
            sparkline={[40,42,41,43,45,44,43]}
          />
          <MetricCard
            title="Opportunity"
            value="87/100"
            subtitle="Strong potential"
            icon={Target}
            status="success"
            delay={300}
            sparkline={[70,72,74,76,80,83,87]}
          />
          <MetricCard
            title="Growth Rate"
            value="+24%"
            subtitle="Annual growth"
            icon={TrendingUp}
            status="success"
            trend={{ value: 4, label: "vs last year" }}
            delay={400}
            sparkline={[12,14,16,18,20,22,24]}
          />
        </div>

        {/* Market Insight Summary */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-6 mb-8 opacity-0 animate-fade-in-up stagger-5">
          <div className="max-w-4xl">
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Market Insight Summary
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The market is growing strongly at <span className="text-success font-semibold">+24% annually</span>, presenting excellent expansion opportunities. 
              You're a <span className="text-primary font-semibold">fast-growing challenger</span> with <span className="text-success font-semibold">85% growth rate</span>, significantly outpacing competitors. 
              With <span className="text-warning font-semibold">medium competition</span> and your strong product-market fit, 
              the window to capture market share is <span className="text-success font-semibold">open but time-sensitive</span>.
            </p>
          </div>
        </div>

        {/* Main Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Market Position - Simplified View */}
          <div className="lg:col-span-1 glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5">
            <div className="flex items-start justify-between gap-4 mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Strengths
              </h3>
              <ChartInsight
                title="Strengths"
                level="High"
                summary="Strong across market size, growth, and innovation."
                bullets={["Market size high (85/100)", "Growth rate excellent (92/100)", "Focus on profitability next"]}
              />
            </div>
            <div className="space-y-4">
              {[
                { label: "Market Size", value: "85/100", color: "success" },
                { label: "Growth Rate", value: "92/100", color: "success" },
                { label: "Innovation", value: "88/100", color: "success" },
                { label: "Profitability", value: "70/100", color: "warning" },
                { label: "Entry Barriers", value: "78/100", color: "success" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span className={`text-sm font-semibold ${item.color === "success" ? "text-success" : "text-warning"}`}>
                      {item.value}
                    </span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.color === "success" ? "bg-success" : "bg-warning"
                      }`}
                      style={{ width: `${parseInt(item.value)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* Insight */}
            <div className="mt-6 pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="text-success font-semibold">Strong fundamentals</span> across market size, growth, and innovation. Focus on improving profitability to be fully competitive.
              </p>
            </div>
          </div>

          {/* Market Share */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5 relative group">
            <div className="absolute top-4 right-4">
              <ChartInsight
                title="Market Share"
                level="Medium"
                summary="Small share but strong growth potential."
                bullets={["Your company: 2.5% share", "Competitors dominate share", "Marketing can help capture share"]}
              />
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Market Share
              </h3>
            </div>
            <div className="h-48 transition-transform duration-300 group-hover:scale-105">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={marketSharePie}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {marketSharePie.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {marketSharePie.slice(0, 4).map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-2 text-xs"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground truncate">{item.name}</span>
                  <span className="text-card-foreground font-medium ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Your Position Highlight */}
          <div className="glass-card border-t-[3px] border-t-success rounded-xl p-6 opacity-0 animate-fade-in-up stagger-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-success/10">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">
                  Your Position
                </h3>
                <p className="text-sm text-success">Fast-growing challenger</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border-l-2 border-l-success">
                <span className="text-sm text-muted-foreground">Market Share</span>
                <span className="text-lg font-bold text-success">2.5%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border-l-2 border-l-success">
                <span className="text-sm text-muted-foreground">Growth Rate</span>
                <span className="text-lg font-bold text-success">+85%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border-l-2 border-l-primary">
                <span className="text-sm text-muted-foreground">Satisfaction</span>
                <span className="text-lg font-bold text-primary">72 NPS</span>
              </div>
              <div className="pt-2">
                <p className="text-xs text-muted-foreground mb-2">vs Competition</p>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-success rounded-full w-[85%]" />
                </div>
                <p className="text-xs text-success mt-1 font-medium">7x faster growth</p>
              </div>
            </div>
          </div>

        {/* TAM SAM SOM Chart */}
        </div>

        {/* TAM SAM SOM Chart */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5 relative">
            <div className="absolute top-4 right-4">
              <ChartInsight
                title="Market Size Growth"
                level="High"
                summary="TAM/SAM/SOM all trending up — SOM growing fastest."
                bullets={["Market size expanding through 2027", "SOM growth outpacing TAM — strong positioning", "Plan to capture higher SOM share"]}
              />
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Market Size Growth
              </h3>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={marketGrowth}>
                    <defs>
                      <linearGradient id="tamGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--muted-foreground)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="var(--muted-foreground)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="samGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="somGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--chart-3)" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="var(--chart-3)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis
                      dataKey="year"
                      stroke="var(--muted-foreground)"
                      tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                    />
                    <YAxis
                      stroke="var(--muted-foreground)"
                      tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                      tickFormatter={(value) => `$${value}B`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        backdropFilter: "blur(8px)",
                      }}
                      labelStyle={{ color: "var(--card-foreground)" }}
                      formatter={(value: number) => [`$${value}B`, ""]}
                    />
                    <Area
                      type="monotone"
                      dataKey="tam"
                      name="TAM"
                      stroke="var(--muted-foreground)"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#tamGrad)"
                    />
                    <Area
                      type="monotone"
                      dataKey="sam"
                      name="SAM"
                      stroke="var(--chart-2)"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#samGrad)"
                    />
                    <Area
                      type="monotone"
                      dataKey="som"
                      name="SOM"
                      stroke="var(--chart-3)"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#somGrad)"
                    />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Industry Comparison */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-6 relative">
            <div className="absolute top-4 right-4">
              <ChartInsight
                title="Performance vs Industry"
                level="Medium"
                summary="You outperform on growth and retention; profitability lags."
                bullets={["Growth and retention above industry", "Profit margin below industry — review ops", "Focus on improving profitability"]}
              />
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Performance vs Industry
              </h3>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={industryComparison} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
                  <XAxis
                    type="number"
                    stroke="#64748B"
                    tick={{ fill: "#64748B", fontSize: 12 }}
                  />
                  <YAxis
                    type="category"
                    dataKey="metric"
                    stroke="#64748B"
                    tick={{ fill: "#64748B", fontSize: 10 }}
                    width={100}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(17, 24, 39, 0.95)",
                      border: "1px solid #1E293B",
                      borderRadius: "8px",
                      backdropFilter: "blur(8px)",
                    }}
                    labelStyle={{ color: "#F1F5F9" }}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: "10px" }}
                    formatter={(value) => (
                      <span className="text-muted-foreground text-sm">{value}</span>
                    )}
                  />
                  <Bar dataKey="you" name="Your Company" fill="#22C55E" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="industry" name="Industry Avg" fill="#64748B" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Competitive Landscape - Simplified */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Market Share Dominance */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Market Share Leaders
              </h3>
            </div>
            <div className="space-y-4">
              {competitorData.map((comp, idx) => (
                <div key={comp.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">{comp.name}</span>
                    <span className={`text-sm font-semibold ${
                      idx === 0 ? "text-success" : idx < 3 ? "text-warning" : "text-muted-foreground"
                    }`}>
                      {comp.marketShare.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        idx === 0 ? "bg-success" : idx < 3 ? "bg-warning" : "bg-muted-foreground/30"
                      }`}
                      style={{ width: `${comp.marketShare}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Competitor Growth */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Growth Comparison
              </h3>
            </div>
            <div className="space-y-4">
              {competitorData.map((comp, idx) => {
                const isYou = idx === 0;
                const growth = comp.growth;
                const color = isYou ? "success" : growth > 10 ? "warning" : "muted-foreground/30";
                return (
                  <div key={comp.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">{comp.name}</span>
                      <span className={`text-sm font-semibold ${
                        color === "success" ? "text-success" : color === "warning" ? "text-warning" : "text-muted-foreground"
                      }`}>
                        +{growth}%
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          color === "success" ? "bg-success" : color === "warning" ? "bg-warning" : "bg-muted-foreground/30"
                        }`}
                        style={{ width: `${Math.min(growth, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Satisfaction Edge */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Customer Satisfaction
              </h3>
            </div>
            <div className="space-y-4">
              {competitorData.map((comp, idx) => {
                const satisfaction = comp.satisfaction;
                const isYou = idx === 0;
                const color = isYou || satisfaction >= 70 ? "success" : satisfaction >= 60 ? "warning" : "destructive";
                return (
                  <div key={comp.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">{comp.name}</span>
                      <span className={`text-sm font-semibold ${
                        color === "success" ? "text-success" : color === "warning" ? "text-warning" : "text-destructive"
                      }`}>
                        {satisfaction} NPS
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          color === "success" ? "bg-success" : color === "warning" ? "bg-warning" : "bg-destructive"
                        }`}
                        style={{ width: `${satisfaction}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* End of main content */}
      </SectionWrapper>
    </div>
  )
}
