"use client"

import React, { useState, useEffect } from "react"
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

export default function MarketAnalysisPage() {
  const [marketData, setMarketData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch ML-powered market analytics
    const fetchMarketData = async () => {
      try {
        // Get stored company data or use demo data
        const storedData = localStorage.getItem('companyAnalysisData')
        const companyData = storedData ? JSON.parse(storedData) : {
          companyName: "TechCorp Inc.",
          revenue: "8200000",
          marketSize: "50",
          competitorCount: "15",
          growthRate: "85",
          marketShare: "2.5",
          industryGrowthRate: "25",
          nps: "72"
        }

        const response = await fetch('/api/analyze-company', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(companyData)
        })
        
        if (response.ok) {
          const result = await response.json()
          setMarketData(result.marketAnalysis)
        }
      } catch (error) {
        console.error('Failed to fetch market analytics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMarketData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen py-2">
        <SectionWrapper>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading ML-powered market analytics...</p>
          </div>
        </SectionWrapper>
      </div>
    )
  }

  if (!marketData) {
    return (
      <div className="min-h-screen py-2">
        <SectionWrapper>
          <div className="text-center">
            <p className="text-muted-foreground">No market data available</p>
          </div>
        </SectionWrapper>
      </div>
    )
  }

  const radarData = [
    { subject: "Market Size", A: marketData.marketSize * 2, fullMark: 100 },
    { subject: "Growth Rate", A: marketData.growthRate, fullMark: 100 },
    { subject: "Competition", A: 100 - (marketData.competition === "Low" ? 20 : marketData.competition === "Medium" ? 40 : 60), fullMark: 100 },
    { subject: "Entry Barriers", A: marketData.opportunity * 0.8, fullMark: 100 },
    { subject: "Profitability", A: marketData.opportunity * 0.9, fullMark: 100 },
    { subject: "Innovation", A: marketData.opportunity, fullMark: 100 },
  ]

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-xl">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm flex items-center gap-2" style={{ color: entry.color }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              {entry.name}: {entry.value}%
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const COLORS = ['#06B6D4', '#22C55E', '#22D3EE', '#1E293B', '#64748B']

  return (
    <div className="min-h-screen py-2">
      <SectionWrapper>
        {/* Header */}
        <div className="mb-8 opacity-0 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Market Analysis
          </h1>
          <p className="text-xs text-success mt-2">🤖 Powered by ML Analysis</p>
        </div>

        {/* Key Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Market Size"
            value={`$${marketData.marketSize}B`}
            subtitle="Total addressable market"
            icon={Globe}
            status="success"
            trend={{ value: marketData.growthRate * 0.3, label: "vs last year" }}
            delay={100}
            sparkline={[45,47,48,49,50,marketData.marketSize]}
          />
          <MetricCard
            title="Competition"
            value={marketData.competition}
            subtitle="Market competition level"
            icon={Users}
            status={marketData.competition === "Low" ? "success" : marketData.competition === "Medium" ? "warning" : "danger"}
            delay={200}
            sparkline={[18,16,17,15,marketData.competition === "Low" ? 10 : marketData.competition === "Medium" ? 20 : 30]}
          />
          <MetricCard
            title="Opportunity"
            value={`${marketData.opportunity.toFixed(0)}%`}
            subtitle="Market opportunity score"
            icon={Target}
            status="success"
            trend={{ value: marketData.growthRate * 0.2, label: "potential" }}
            delay={300}
            sparkline={[70,75,78,82,85,marketData.opportunity]}
          />
          <MetricCard
            title="Growth Rate"
            value={`${marketData.growthRate}%`}
            subtitle="Annual market growth"
            icon={TrendingUp}
            status="success"
            delay={400}
            sparkline={[20,22,24,26,28,marketData.growthRate]}
          />
        </div>

        {/* Main Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Market Overview */}
          <div className="lg:col-span-2 glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5 relative">
            <div className="absolute top-4 right-4">
              <ChartInsight
                title="Market Overview"
                level="High"
                summary="Strong growth; moderate competition."
                bullets={["Market expanding 85% annually", "Competition manageable at Medium level", "High opportunity score indicates potential"]}
              />
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Market Overview
              </h3>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[
                  { month: "Jan", size: marketData.marketSize * 0.8, growth: marketData.growthRate * 0.7 },
                  { month: "Feb", size: marketData.marketSize * 0.85, growth: marketData.growthRate * 0.8 },
                  { month: "Mar", size: marketData.marketSize * 0.9, growth: marketData.growthRate * 0.85 },
                  { month: "Apr", size: marketData.marketSize * 0.95, growth: marketData.growthRate * 0.9 },
                  { month: "May", size: marketData.marketSize, growth: marketData.growthRate },
                ]}>
                  <defs>
                    <linearGradient id="marketGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                  <XAxis
                    dataKey="month"
                    stroke="#64748B"
                    tick={{ fill: "#64748B", fontSize: 12 }}
                  />
                  <YAxis
                    stroke="#64748B"
                    tick={{ fill: "#64748B", fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="size"
                    stroke="#06B6D4"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#marketGrad)"
                    name="Market Size ($B)"
                  />
                  <Area
                    type="monotone"
                    dataKey="growth"
                    stroke="#22C55E"
                    strokeWidth={2}
                    fillOpacity={0.1}
                    fill="#22C55E"
                    name="Growth Rate (%)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Market Share */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-6 relative">
            <div className="absolute top-4 right-4">
              <ChartInsight
                title="Market Share"
                level="Medium"
                summary="Small but growing share."
                bullets={["Currently 2.5% market share", "Room for expansion", "Focus on high-growth segments"]}
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
                    data={marketData.marketShareData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {marketData.marketShareData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(17, 24, 39, 0.95)",
                      border: "1px solid #1E293B",
                      borderRadius: "8px",
                      backdropFilter: "blur(8px)",
                    }}
                    formatter={(value: any) => [`${value}%`, "Market Share"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {marketData.marketShareData.slice(0, 3).map((entry: any, index: number) => (
                <div key={entry.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-muted-foreground">{entry.name}</span>
                  </div>
                  <span className="font-medium text-card-foreground">{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Secondary Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Competitor Analysis */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5 relative">
            <div className="absolute top-4 right-4">
              <ChartInsight
                title="Competitors"
                level="Medium"
                summary="Strong competitors; differentiation needed."
                bullets={["15+ major competitors", "Your growth rate leads market", "Focus on unique value proposition"]}
              />
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Competitor Analysis
              </h3>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={marketData.competitorData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                  <XAxis
                    dataKey="name"
                    stroke="#64748B"
                    tick={{ fill: "#64748B", fontSize: 11 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis
                    stroke="#64748B"
                    tick={{ fill: "#64748B", fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ paddingTop: "20px" }}
                    formatter={(value: any) => (
                      <span className="text-muted-foreground text-sm">{value}</span>
                    )}
                  />
                  <Bar dataKey="marketShare" name="Market Share (%)" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="growth" name="Growth Rate (%)" fill="#22C55E" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="satisfaction" name="Satisfaction" fill="#22D3EE" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Industry Comparison */}
          <div className="glass-card rounded-xl p-6 mb-8 opacity-0 animate-fade-in-up stagger-5">
            <div className="mb-2">
              <h3 className="text-lg font-semibold text-card-foreground">
                Industry Comparison
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                How your company performs against industry benchmarks across key metrics.
              </p>
            </div>
            <div className="space-y-4">
              {marketData.industryComparison.map((item: any, index: number) => {
                const performance = item.you > item.industry ? "success" : item.you >= item.industry * 0.9 ? "warning" : "danger"
                const percentage = (item.you / item.industry) * 100
                
                return (
                  <div key={item.metric} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-card-foreground">{item.metric}</span>
                      <span className={`text-sm font-medium ${
                        performance === "success" ? "text-success" :
                        performance === "warning" ? "text-warning" :
                        "text-destructive"
                      }`}>
                        {item.you}% vs {item.industry}% industry
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          performance === "success" ? "bg-success" :
                          performance === "warning" ? "bg-warning" :
                          "bg-destructive"
                        }`}
                        style={{ width: `${Math.min(percentage, 150)}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Market Opportunities */}
        <div className="opacity-0 animate-fade-in-up stagger-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground">
              Market Opportunities
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Key growth opportunities and market expansion strategies based on ML analysis.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <OpportunityCard
              icon={Rocket}
              title="High-Growth Segments"
              description="Focus on enterprise and mid-market segments showing 25-35% growth rates."
              impact="High"
              delay={700}
            />
            <OpportunityCard
              icon={Lightbulb}
              title="Innovation Leadership"
              description="Leverage technology advantage to differentiate from competitors."
              impact="Medium"
              delay={800}
            />
            <OpportunityCard
              icon={Building2}
              title="Geographic Expansion"
              description="Expand into underserved markets with lower competition."
              impact="High"
              delay={900}
            />
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}

function OpportunityCard({
  icon: Icon,
  title,
  description,
  impact,
  delay = 0,
}: {
  icon: any
  title: string
  description: string
  impact: string
  delay?: number
}) {
  return (
    <div
      className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          impact === "High" ? "bg-success/10 text-success" :
          impact === "Medium" ? "bg-warning/10 text-warning" :
          "bg-muted text-muted-foreground"
        }`}>
          {impact} Impact
        </span>
      </div>
      <h4 className="font-semibold text-card-foreground mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
