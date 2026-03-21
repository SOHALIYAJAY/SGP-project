"use client"

import React, { useState, useEffect } from "react"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { MetricCard } from "@/components/ui/metric-card"
import { ChartInfoIcon } from "@/components/ui/chart-info-icon"
import {
  Shield,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Target,
  Zap,
  CheckCircle,
  Clock,
  Users,
  DollarSign,
  Building,
  Scale,
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import ChartInsight from '@/components/chart-insight'

export default function RiskAssessmentPage() {
  const [riskData, setRiskData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch ML-powered risk analytics
    const fetchRiskData = async () => {
      try {
        // Get stored company data or use demo data
        const storedData = localStorage.getItem('companyAnalysisData')
        const companyData = storedData ? JSON.parse(storedData) : {
          companyName: "TechCorp Inc.",
          revenue: "8200000",
          churnRate: "2.5",
          growthRate: "85",
          profitMargin: "22"
        }

        const response = await fetch('/api/analyze-company', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(companyData)
        })
        
        if (response.ok) {
          const result = await response.json()
          setRiskData(result.riskAssessment)
        }
      } catch (error) {
        console.error('Failed to fetch risk analytics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRiskData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen py-2">
        <SectionWrapper>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading ML-powered risk assessment...</p>
          </div>
        </SectionWrapper>
      </div>
    )
  }

  if (!riskData) {
    return (
      <div className="min-h-screen py-2">
        <SectionWrapper>
          <div className="text-center">
            <p className="text-muted-foreground">No risk data available</p>
          </div>
        </SectionWrapper>
      </div>
    )
  }

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

  const getRiskColor = (score: number) => {
    if (score < 35) return "text-success"
    if (score < 60) return "text-warning"
    return "text-destructive"
  }

  const getRiskBgColor = (score: number) => {
    if (score < 35) return "bg-success/20"
    if (score < 60) return "bg-warning/20"
    return "bg-destructive/20"
  }

  return (
    <div className="min-h-screen py-2">
      <SectionWrapper>
        {/* Header */}
        <div className="mb-8 opacity-0 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Risk Assessment
          </h1>
          <p className="text-xs text-success mt-2">🤖 Powered by ML Analysis</p>
        </div>

        {/* Overall Risk Score */}
        <div className="glass-card rounded-xl p-6 mb-8 opacity-0 animate-fade-in-up stagger-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">
                Overall Risk Score
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                ML-powered comprehensive risk assessment across all business dimensions
              </p>
            </div>
            <div className="text-right">
              <div className={`text-3xl font-bold ${getRiskColor(riskData.overallRiskScore)}`}>
                {riskData.overallRiskScore.toFixed(0)}
              </div>
              <div className="text-sm text-muted-foreground">Risk Score</div>
            </div>
          </div>
          <div className="h-4 bg-secondary rounded-full overflow-hidden mb-4">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                riskData.overallRiskScore < 35 ? "bg-success" :
                riskData.overallRiskScore < 60 ? "bg-warning" :
                "bg-destructive"
              }`}
              style={{ width: `${riskData.overallRiskScore}%` }}
            />
          </div>
          <div className="flex items-center justify-center">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getRiskBgColor(riskData.overallRiskScore)} ${getRiskColor(riskData.overallRiskScore)}`}>
              {riskData.riskProfile} Risk
            </span>
          </div>
        </div>

        {/* Risk Categories */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {riskData.riskCategories.map((category: any, index: number) => (
            <div key={category.category} className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-card-foreground">{category.category}</h4>
                <span className={`text-lg font-bold ${getRiskColor(category.score)}`}>
                  {category.score}
                </span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden mb-4">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    category.score < 35 ? "bg-success" :
                    category.score < 60 ? "bg-warning" :
                    "bg-destructive"
                  }`}
                  style={{ width: `${category.score}%` }}
                />
              </div>
              <div className="space-y-2">
                {category.factors.map((factor: any, factorIndex: number) => (
                  <div key={factor.name} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{factor.name}</span>
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${getRiskColor(factor.score)}`}>
                        {factor.score}
                      </span>
                      <div className={`w-2 h-2 rounded-full ${
                        factor.status === "good" ? "bg-success" :
                        factor.status === "moderate" ? "bg-warning" :
                        "bg-destructive"
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Risk Trend */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5 relative">
            <div className="absolute top-4 right-4">
              <ChartInsight
                title="Risk Trend"
                level="Medium"
                summary="Risk levels improving over time."
                bullets={["Overall risk decreasing", "Financial risk stable", "Market risk improving"]}
              />
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Risk Trend Analysis
              </h3>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={riskData.riskTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                  <XAxis
                    dataKey="month"
                    stroke="#64748B"
                    tick={{ fill: "#64748B", fontSize: 12 }}
                  />
                  <YAxis
                    stroke="#64748B"
                    tick={{ fill: "#64748B", fontSize: 12 }}
                    domain={[0, 100]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ paddingTop: "20px" }}
                    formatter={(value: any) => (
                      <span className="text-muted-foreground text-sm">{value}</span>
                    )}
                  />
                  <Line
                    type="monotone"
                    dataKey="overall"
                    stroke="#06B6D4"
                    strokeWidth={3}
                    dot={{ fill: "#06B6D4", strokeWidth: 2, r: 4 }}
                    name="Overall Risk"
                  />
                  <Line
                    type="monotone"
                    dataKey="financial"
                    stroke="#22C55E"
                    strokeWidth={2}
                    dot={{ fill: "#22C55E", strokeWidth: 2, r: 3 }}
                    name="Financial Risk"
                  />
                  <Line
                    type="monotone"
                    dataKey="market"
                    stroke="#22D3EE"
                    strokeWidth={2}
                    dot={{ fill: "#22D3EE", strokeWidth: 2, r: 3 }}
                    name="Market Risk"
                  />
                  <Line
                    type="monotone"
                    dataKey="operational"
                    stroke="#F59E0B"
                    strokeWidth={2}
                    dot={{ fill: "#F59E0B", strokeWidth: 2, r: 3 }}
                    name="Operational Risk"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Risk Radar */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Risk Distribution
              </h3>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={riskData.riskCategories.map((cat: any) => ({
                  category: cat.category.replace(" Risk", ""),
                  score: cat.score,
                  fullMark: 100,
                }))}>
                  <PolarGrid stroke="#1E293B" />
                  <PolarAngleAxis
                    dataKey="category"
                    stroke="#64748B"
                    tick={{ fill: "#64748B", fontSize: 11 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    stroke="#64748B"
                    tick={{ fill: "#64748B", fontSize: 10 }}
                  />
                  <Radar
                    name="Risk Score"
                    dataKey="score"
                    stroke="#06B6D4"
                    strokeWidth={2}
                    fill="#06B6D4"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Mitigation Actions */}
        <div className="mb-8 opacity-0 animate-fade-in-up stagger-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground">
              Risk Mitigation Actions
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Recommended actions to mitigate identified risks
            </p>
          </div>
          <div className="space-y-4">
            {riskData.mitigationActions.map((action: any, index: number) => (
              <MitigationCard key={action.action} {...action} delay={700 + index * 100} />
            ))}
          </div>
        </div>

        {/* Sustainability Indicators */}
        <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-7">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-card-foreground">
              Sustainability Indicators
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Long-term business sustainability metrics
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {riskData.sustainabilityIndicators.map((indicator: any, index: number) => (
              <div key={indicator.name} className="text-center">
                <div className="mb-4">
                  <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                    indicator.score >= 80 ? "bg-success/20" :
                    indicator.score >= 60 ? "bg-warning/20" :
                    "bg-destructive/20"
                  }`}>
                    <Scale className={`h-8 w-8 ${
                      indicator.score >= 80 ? "text-success" :
                      indicator.score >= 60 ? "text-warning" :
                      "text-destructive"
                    }`} />
                  </div>
                </div>
                <div className="text-lg font-bold text-card-foreground mb-1">
                  {indicator.score}
                </div>
                <div className="text-sm text-muted-foreground mb-2">{indicator.name}</div>
                <div className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                  indicator.trend === "improving" ? "bg-success/10 text-success" :
                  indicator.trend === "stable" ? "bg-warning/10 text-warning" :
                  "bg-destructive/10 text-destructive"
                }`}>
                  {indicator.trend === "improving" && <TrendingUp className="h-3 w-3" />}
                  {indicator.trend === "stable" && <div className="h-3 w-3 border-t-2 border-current" />}
                  {indicator.trend === "declining" && <TrendingDown className="h-3 w-3" />}
                  {indicator.trend}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}

function MitigationCard({
  action,
  status,
  impact,
  risk,
  delay = 0,
}: {
  action: string
  status: string
  impact: string
  risk: string
  delay?: number
}) {
  const getStatusIcon = () => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-success" />
      case "in-progress": return <Clock className="h-4 w-4 text-warning" />
      case "planned": return <Target className="h-4 w-4 text-primary" />
      default: return <Target className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getImpactColor = () => {
    switch (impact) {
      case "high": return "bg-success/10 text-success"
      case "medium": return "bg-warning/10 text-warning"
      case "low": return "bg-muted text-muted-foreground"
      default: return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div
      className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <div>
            <h4 className="font-semibold text-card-foreground">{action}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Addresses {risk.toLowerCase()} risks
            </p>
          </div>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getImpactColor()}`}>
          {impact} Impact
        </span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Zap className="h-4 w-4 text-primary" />
        <span className="text-muted-foreground capitalize">{status}</span>
      </div>
    </div>
  )
}
