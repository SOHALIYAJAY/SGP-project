"use client"

import { SectionWrapper } from "@/components/ui/section-wrapper"
import { MetricCard } from "@/components/ui/metric-card"
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
  { name: "Your Company", value: 2.5, color: "#06B6D4" },
  { name: "Competitor A", value: 18, color: "#22C55E" },
  { name: "Competitor B", value: 15, color: "#F59E0B" },
  { name: "Competitor C", value: 12, color: "#EF4444" },
  { name: "Others", value: 52.5, color: "#64748B" },
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Market Size"
            value="$50B"
            subtitle="Total Addressable"
            icon={Globe}
            status="neutral"
            delay={100}
          />
          <MetricCard
            title="Competition"
            value="Medium"
            subtitle="15 major players"
            icon={Users}
            status="warning"
            delay={200}
          />
          <MetricCard
            title="Opportunity"
            value="87/100"
            subtitle="Strong potential"
            icon={Target}
            status="success"
            delay={300}
          />
          <MetricCard
            title="Growth Rate"
            value="+24%"
            subtitle="Annual growth"
            icon={TrendingUp}
            status="success"
            trend={{ value: 4, label: "vs last year" }}
            delay={400}
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
          <div className="lg:col-span-1 bg-card border border-border rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5">
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
          <div className="bg-card border border-border rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5 relative">
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
            <div className="h-48">
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
            {/* Insight */}
            <div className="mt-4 pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="text-warning font-semibold">52.5% fragmented</span> market offers opportunity. You're a small but <span className="text-success font-semibold">fast-growing player</span>.
              </p>
            </div>
          </div>

          {/* Your Position Highlight */}
          <div className="bg-card border border-border border-t-[3px] border-t-success rounded-xl p-6 opacity-0 animate-fade-in-up stagger-6">
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
          <div className="bg-card border border-border rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5 relative">
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
                      <stop offset="5%" stopColor="#64748B" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#64748B" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="samGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="somGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                  <XAxis
                    dataKey="year"
                    stroke="#64748B"
                    tick={{ fill: "#64748B", fontSize: 12 }}
                  />
                  <YAxis
                    stroke="#64748B"
                    tick={{ fill: "#64748B", fontSize: 12 }}
                    tickFormatter={(value) => `$${value}B`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(17, 24, 39, 0.95)",
                      border: "1px solid #1E293B",
                      borderRadius: "8px",
                      backdropFilter: "blur(8px)",
                    }}
                    labelStyle={{ color: "#F1F5F9" }}
                    formatter={(value: number) => [`$${value}B`, ""]}
                  />
                  <Area
                    type="monotone"
                    dataKey="tam"
                    name="TAM"
                    stroke="#64748B"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#tamGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="sam"
                    name="SAM"
                    stroke="#06B6D4"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#samGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="som"
                    name="SOM"
                    stroke="#22C55E"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#somGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            {/* Insight */}
            <div className="mt-6 pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="text-success font-semibold">Strong upward trajectory</span> projected through 2027. 
                Your SOM (Serviceable Obtainable Market) is <span className="text-success font-semibold">growing 8x faster</span> than TAM, indicating strong positioning.
              </p>
            </div>
          </div>

          {/* Industry Comparison */}
          <div className="bg-card border border-border rounded-xl p-6 opacity-0 animate-fade-in-up stagger-6 relative">
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
            {/* Insight */}
            <div className="mt-6 pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="text-success font-semibold">Outperforming</span> industry across all metrics. 
                Your 97% retention and 72 NPS are <span className="text-success font-semibold">12-27% higher</span> than average.
              </p>
            </div>
          </div>
        </div>

        {/* Competitive Landscape - Simplified */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Market Share Dominance */}
          <div className="bg-card border border-border rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5">
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
            {/* Insight */}
            <div className="mt-6 pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="text-success font-semibold">Competitors A & B</span> lead the market, but significant <span className="text-warning font-semibold">fragmentation</span> exists.
              </p>
            </div>
          </div>

          {/* Competitor Growth */}
          <div className="bg-card border border-border rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5">
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
            {/* Insight */}
            <div className="mt-6 pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="text-success font-semibold">You're growing 7x faster</span> than Competitor A and 17x faster than the market average.
              </p>
            </div>
          </div>

          {/* Satisfaction Edge */}
          <div className="bg-card border border-border rounded-xl p-6 opacity-0 animate-fade-in-up stagger-6">
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
            {/* Insight */}
            <div className="mt-6 pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="text-success font-semibold">72 NPS is your competitive edge</span> — 7 points above nearest competitor, 17+ above laggards.
              </p>
            </div>
          </div>
        </div>

        {/* Recommended Strategy */}
        <div className="mb-12 opacity-0 animate-fade-in-up stagger-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Recommended Strategy
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StrategyCard
              icon={Rocket}
              priority="high"
              title="Accelerate Market Penetration"
              description="Leverage your 7x faster growth to capture share from fragmented competitors. The window is open now."
              data="Growing at 85% vs competition at 3-12%"
              delay={500}
            />
            <StrategyCard
              icon={Lightbulb}
              priority="high"
              title="Capitalize on Product Excellence"
              description="Your 72 NPS is industry-leading. Use this as competitive advantage in sales and marketing."
              data="7+ points above nearest competitor"
              delay={600}
            />
            <StrategyCard
              icon={BarChart3}
              priority="medium"
              title="Improve Profitability"
              description="Profitability score of 70/100 needs attention. Optimize operations to improve margins."
              data="Gap: 70 vs target 85+"
              delay={700}
            />
            <StrategyCard
              icon={TrendingUp}
              priority="high"
              title="Expand Geographic Reach"
              description="Market fundamentals are strong. Use this foundation to expand into adjacent geographies."
              data="TAM growing 9% annually to $68B by 2027"
              delay={800}
            />
            <StrategyCard
              icon={Target}
              priority="medium"
              title="Build Switching Costs"
              description="With high competition, create deeper customer relationships to protect market share."
              data="Your retention rate: 97% (best-in-class)"
              delay={900}
            />
            <StrategyCard
              icon={AlertTriangle}
              priority="medium"
              title="Monitor Competitive Moves"
              description="Competitor A still leads in share. Track their moves and maintain product innovation edge."
              data="Their share: 18% vs your 2.5% (but you're growing faster)"
              delay={1000}
            />
          </div>
        </div>

        {/* Market Trends */}
        <div className="opacity-0 animate-fade-in-up stagger-6">
          <h3 className="text-xl font-semibold text-foreground mb-6">
            Key Market Trends
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {marketTrends.map((trend, index) => (
              <TrendCard key={trend.trend} {...trend} delay={700 + index * 100} />
            ))}
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}

function StrategyCard({
  icon: Icon,
  priority,
  title,
  description,
  data,
  delay = 0,
}: {
  icon: any
  priority: "high" | "medium" | "low"
  title: string
  description: string
  data: string
  delay?: number
}) {
  const priorityStyles = {
    high: { 
      border: "border-t-4 border-t-destructive", 
      bg: "bg-destructive/5", 
      iconColor: "text-destructive",
      dotBg: "bg-destructive",
      borderColor: "border-destructive/20",
      badge: "bg-destructive/10 text-destructive",
    },
    medium: { 
      border: "border-t-4 border-t-warning", 
      bg: "bg-warning/5", 
      iconColor: "text-warning",
      dotBg: "bg-warning",
      borderColor: "border-warning/20",
      badge: "bg-warning/10 text-warning",
    },
    low: { 
      border: "border-t-4 border-t-success", 
      bg: "bg-success/5", 
      iconColor: "text-success",
      dotBg: "bg-success",
      borderColor: "border-success/20",
      badge: "bg-success/10 text-success",
    },
  }

  const style = priorityStyles[priority]

  return (
    <div
      className={`bg-card border border-border rounded-xl p-6 ${style.border} ${style.bg} card-hover opacity-0 animate-fade-in-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2 rounded-lg ${style.badge}`}>
          <Icon className={`w-5 h-5 ${style.iconColor}`} />
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${style.badge} uppercase tracking-wide`}>
          {priority === "high" ? "High" : priority === "medium" ? "Medium" : "Low"} Priority
        </span>
      </div>
      <h4 className="text-lg font-semibold text-card-foreground mb-3">{title}</h4>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className={`flex items-center gap-2 pt-4 border-t ${style.borderColor}`}>
        <div className={`w-2 h-2 rounded-full ${style.dotBg}`} />
        <p className="text-xs text-muted-foreground italic">{data}</p>
      </div>
    </div>
  )
}

function TrendCard({
  trend,
  impact,
  relevance,
  description,
  delay = 0,
}: {
  trend: string
  impact: "high" | "medium" | "low"
  relevance: number
  description: string
  delay?: number
}) {
  const impactStyles = {
    high: { bg: "bg-destructive/10", text: "text-destructive", label: "High Impact", icon: Zap },
    medium: { bg: "bg-warning/10", text: "text-warning", label: "Medium Impact", icon: TrendingUp },
    low: { bg: "bg-success/10", text: "text-success", label: "Low Impact", icon: Target },
  }

  const style = impactStyles[impact]
  const Icon = style.icon

  return (
    <div
      className="bg-card border border-border rounded-xl p-6 card-hover opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${style.bg}`}>
            <Icon className={`w-5 h-5 ${style.text}`} />
          </div>
          <h4 className="font-semibold text-card-foreground">{trend}</h4>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${style.bg} ${style.text}`}>
          {style.label}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Relevance to Business</span>
          <span className="font-medium text-card-foreground">{relevance}%</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
            style={{ width: `${relevance}%` }}
          />
        </div>
      </div>
    </div>
  )
}
