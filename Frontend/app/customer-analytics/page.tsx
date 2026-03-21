"use client"

import React, { useState, useEffect } from "react"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { MetricCard } from "@/components/ui/metric-card"
import { ChartInfoIcon } from "@/components/ui/chart-info-icon"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import {
  Users,
  UserMinus,
  Heart,
  TrendingUp,
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
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
} from "recharts"
import ChartInsight from '@/components/chart-insight'

export default function CustomerAnalyticsPage() {
  const [customerData, setCustomerData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch ML-powered customer analytics
    const fetchCustomerData = async () => {
      try {
        // Get stored company data or use demo data
        const storedData = localStorage.getItem('companyAnalysisData')
        const companyData = storedData ? JSON.parse(storedData) : {
          companyName: "TechCorp Inc.",
          revenue: "8200000",
          churnRate: "2.5",
          nps: "72",
          growthRate: "85",
          customerCount: "1500"
        }

        const response = await fetch('/api/analyze-company', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(companyData)
        })
        
        if (response.ok) {
          const result = await response.json()
          setCustomerData(result.customerAnalytics)
        }
      } catch (error) {
        console.error('Failed to fetch customer analytics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCustomerData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen py-2">
        <SectionWrapper>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading ML-powered analytics...</p>
          </div>
        </SectionWrapper>
      </div>
    )
  }

  if (!customerData) {
    return (
      <div className="min-h-screen py-2">
        <SectionWrapper>
          <div className="text-center">
            <p className="text-muted-foreground">No customer data available</p>
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

  return (
    <div className="min-h-screen py-2">
      <SectionWrapper>
        {/* Header */}
        <div className="mb-8 opacity-0 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Customer Analytics
          </h1>
          <p className="text-xs text-success mt-2">🤖 Powered by ML Analysis</p>
        </div>

        {/* Key Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Customer Retention"
            value={`${customerData.retentionRate.toFixed(1)}%`}
            subtitle="Monthly average"
            icon={Users}
            status="success"
            trend={{ value: customerData.customerGrowth, label: "vs last quarter" }}
            delay={100}
            sparkline={[85,88,90,92,94,96,customerData.retentionRate]}
          />
          <MetricCard
            title="Churn Rate"
            value={`${customerData.churnRate.toFixed(1)}%`}
            subtitle="Monthly churn"
            icon={UserMinus}
            status="warning"
            trend={{ value: -customerData.customerGrowth * 0.1, label: "improvement" }}
            delay={200}
            sparkline={[8,9,7,6,8,customerData.churnRate]}
          />
          <MetricCard
            title="NPS Score"
            value={Math.round(customerData.npsScore)}
            subtitle="Net Promoter Score"
            icon={Heart}
            status="success"
            trend={{ value: customerData.customerGrowth * 0.2, label: "vs industry avg" }}
            delay={300}
            sparkline={[60,65,68,70,71,customerData.npsScore]}
          />
          <MetricCard
            title="Customer Growth"
            value={`+${customerData.customerGrowth.toFixed(1)}%`}
            subtitle="YoY growth"
            icon={TrendingUp}
            status="success"
            delay={400}
            sparkline={[10,12,15,18,22,25,customerData.customerGrowth]}
          />
        </div>

        {/* Main Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Retention Trend */}
          <div className="lg:col-span-2 glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5 relative">
            <div className="absolute top-4 right-4">
              <ChartInsight
                title="Retention & Growth"
                level="High"
                summary="Retention strong; new customers accelerating."
                bullets={["Retention >92% consistently", "Churn reducing month-over-month", "New customers accelerating — scale carefully"]}
              />
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Retention & Growth
              </h3>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={customerData.engagementData}>
                  <defs>
                    <linearGradient id="retentionGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                  <XAxis
                    dataKey="week"
                    stroke="#64748B"
                    tick={{ fill: "#64748B", fontSize: 12 }}
                  />
                  <YAxis
                    yAxisId="left"
                    stroke="#64748B"
                    tick={{ fill: "#64748B", fontSize: 12 }}
                    domain={[0, 100]}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#64748B"
                    tick={{ fill: "#64748B", fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="dau"
                    stroke="#22C55E"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#retentionGrad)"
                    name="DAU"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="wau"
                    stroke="#06B6D4"
                    strokeWidth={3}
                    dot={{ fill: "#06B6D4", strokeWidth: 2, r: 4 }}
                    name="WAU"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="mau"
                    name="MAU"
                    fill="#22D3EE"
                    radius={[4, 4, 0, 0]}
                    opacity={0.7}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Customer Lifecycle */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-6 relative">
            <div className="absolute top-4 right-4">
              <ChartInsight
                title="Lifecycle"
                level="Medium"
                summary="Most customers active; some at-risk."
                bullets={["45% active — healthy base", "18% at-risk — engage these users", "Prioritize retention for at-risk segments"]}
              />
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Engagement Trend
              </h3>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={customerData.engagementData}>
                  <defs>
                    <linearGradient id="dauGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="wauGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="mauGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#22D3EE" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                  <XAxis
                    dataKey="week"
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
                    dataKey="mau"
                    stroke="#22D3EE"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#mauGrad)"
                    name="MAU"
                  />
                  <Area
                    type="monotone"
                    dataKey="wau"
                    stroke="#22C55E"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#wauGrad)"
                    name="WAU"
                  />
                  <Area
                    type="monotone"
                    dataKey="dau"
                    stroke="#06B6D4"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#dauGrad)"
                    name="DAU"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Secondary Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Satisfaction Scores */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5 relative">
            <div className="absolute top-4 right-4">
              <ChartInsight
                title="Satisfaction"
                level="Medium"
                summary="High scores overall; value for money lags."
                bullets={["Ease of use highest at 4.7", "All categories exceed benchmark", "Value for money lowest — review pricing"]}
              />
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Satisfaction
              </h3>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={customerData.satisfactionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
                  <XAxis
                    type="number"
                    domain={[0, 5]}
                    stroke="#64748B"
                    tick={{ fill: "#64748B", fontSize: 12 }}
                  />
                  <YAxis
                    type="category"
                    dataKey="category"
                    stroke="#64748B"
                    tick={{ fill: "#64748B", fontSize: 11 }}
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
                    wrapperStyle={{ paddingTop: "20px" }}
                    formatter={(value: any) => (
                      <span className="text-muted-foreground text-sm">{value}</span>
                    )}
                  />
                  <Bar dataKey="score" name="Your Score" fill="#06B6D4" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="benchmark" name="Benchmark" fill="#1E293B" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Cohort Analysis */}
          <div className="glass-card rounded-xl p-6 mb-8 opacity-0 animate-fade-in-up stagger-5">
            <div className="mb-2">
              <h3 className="text-lg font-semibold text-card-foreground">
                Cohort Retention
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Track how customer groups retain over time. Each row shows a cohort's retention percentage month-by-month.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Cohort</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">M1</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">M2</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">M3</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">M4</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">M5</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">M6</th>
                  </tr>
                </thead>
                <tbody>
                  {customerData.cohortData.map((row: any) => (
                    <tr key={row.cohort} className="border-b border-border/50">
                      <td className="py-3 px-4 text-sm font-medium text-card-foreground">{row.cohort}</td>
                      {[row.month1, row.month2, row.month3, row.month4, row.month5, row.month6].map((value: any, idx: number) => (
                        <td key={idx} className="text-center py-3 px-4">
                          {value !== null ? (
                            <span
                              className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                value >= 90 ? "bg-success/20 text-success" :
                                value >= 80 ? "bg-primary/20 text-primary" :
                                value >= 70 ? "bg-warning/20 text-warning" :
                                "bg-destructive/20 text-destructive"
                              }`}
                            >
                              {value}%
                            </span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Customer Segments */}
        <div className="opacity-0 animate-fade-in-up stagger-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground">
              Segments
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Customer groups by size and value. Shows count, revenue, growth rate, and lifetime value per segment.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {customerData.segmentData.map((segment: any, index: number) => (
              <SegmentCard key={segment.segment} {...segment} delay={700 + index * 100} />
            ))}
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}

function SegmentCard({
  segment,
  count,
  revenue,
  growth,
  ltv,
  delay = 0,
}: {
  segment: string
  count: number
  revenue: number
  growth: number
  ltv: number
  delay?: number
}) {
  const formatRevenue = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
    return `$${value}`
  }

  const getValueColor = (val: number) => {
    if (val >= 1000000) return "text-success"
    if (val >= 100000) return "text-primary"
    return "text-warning"
  }

  return (
    <div
      className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-card-foreground">{segment}</h4>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-success/10 text-success">
          +{growth}%
        </span>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Customers</span>
          <span className="font-semibold text-lg text-primary">{count.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Revenue</span>
          <span className={`font-semibold text-lg ${getValueColor(revenue)}`}>{formatRevenue(revenue)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Avg. LTV</span>
          <span className={`font-semibold text-lg ${getValueColor(ltv)}`}>{formatRevenue(ltv)}</span>
        </div>
        {/* Progress bar */}
        <div className="pt-2">
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
              style={{ width: `${(count / 1500) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
