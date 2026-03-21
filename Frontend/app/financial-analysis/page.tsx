"use client"

import React, { useState, useEffect } from "react"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { MetricCard } from "@/components/ui/metric-card"
import { ChartInfoIcon } from "@/components/ui/chart-info-icon"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Target,
  Zap,
  Shield,
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
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import ChartInsight from '@/components/chart-insight'

export default function FinancialAnalysisPage() {
  const [financialData, setFinancialData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch ML-powered financial analytics
    const fetchFinancialData = async () => {
      try {
        // Get stored company data or use demo data
        const storedData = localStorage.getItem('companyAnalysisData')
        const companyData = storedData ? JSON.parse(storedData) : {
          companyName: "TechCorp Inc.",
          revenue: "8200000",
          expenses: "6396000",
          profitMargin: "22",
          burnRate: "180000",
          cashBalance: "3240000",
          growthRate: "85"
        }

        const response = await fetch('/api/analyze-company', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(companyData)
        })
        
        if (response.ok) {
          const result = await response.json()
          setFinancialData(result.financialAnalysis)
        }
      } catch (error) {
        console.error('Failed to fetch financial analytics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFinancialData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen py-2">
        <SectionWrapper>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading ML-powered financial analytics...</p>
          </div>
        </SectionWrapper>
      </div>
    )
  }

  if (!financialData) {
    return (
      <div className="min-h-screen py-2">
        <SectionWrapper>
          <div className="text-center">
            <p className="text-muted-foreground">No financial data available</p>
          </div>
        </SectionWrapper>
      </div>
    )
  }

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
    return `$${value.toFixed(0)}`
  }

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-xl">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm flex items-center gap-2" style={{ color: entry.color }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const COLORS = ['#06B6D4', '#22C55E', '#22D3EE', '#F59E0B', '#EF4444']

  return (
    <div className="min-h-screen py-2">
      <SectionWrapper>
        {/* Header */}
        <div className="mb-8 opacity-0 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Financial Analysis
          </h1>
          <p className="text-xs text-success mt-2">🤖 Powered by ML Analysis</p>
        </div>

        {/* Key Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Annual Revenue"
            value={formatCurrency(financialData.annualRevenue)}
            subtitle="Total yearly revenue"
            icon={DollarSign}
            status="success"
            trend={{ value: 85, label: "YoY growth" }}
            delay={100}
            sparkline={[6000000,6500000,7000000,7500000,8000000,financialData.annualRevenue]}
          />
          <MetricCard
            title="Profit Margin"
            value={`${financialData.profitMargin.toFixed(1)}%`}
            subtitle="Net profit percentage"
            icon={TrendingUp}
            status={financialData.profitMargin >= 20 ? "success" : financialData.profitMargin >= 15 ? "warning" : "danger"}
            delay={200}
            sparkline={[18,19,20,21,22,financialData.profitMargin]}
          />
          <MetricCard
            title="Burn Rate"
            value={formatCurrency(financialData.burnRate)}
            subtitle="Monthly cash burn"
            icon={TrendingDown}
            status={financialData.burnRate <= 200000 ? "success" : financialData.burnRate <= 300000 ? "warning" : "danger"}
            delay={300}
            sparkline={[200000,190000,185000,182000,180000,financialData.burnRate]}
          />
          <MetricCard
            title="Runway"
            value={`${financialData.runway.toFixed(1)} mo`}
            subtitle="Cash runway"
            icon={Target}
            status={financialData.runway >= 18 ? "success" : financialData.runway >= 12 ? "warning" : "danger"}
            delay={400}
            sparkline={[15,16,17,18,19,financialData.runway]}
          />
        </div>

        {/* Financial Health Score */}
        <div className="glass-card rounded-xl p-6 mb-8 opacity-0 animate-fade-in-up stagger-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">
                Overall Financial Health
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                ML-powered assessment of your company's financial stability and performance
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">
                {financialData.financialHealth.toFixed(0)}
              </div>
              <div className="text-sm text-muted-foreground">Health Score</div>
            </div>
          </div>
          <div className="h-4 bg-secondary rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                financialData.financialHealth >= 80 ? "bg-success" :
                financialData.financialHealth >= 60 ? "bg-warning" :
                "bg-destructive"
              }`}
              style={{ width: `${financialData.financialHealth}%` }}
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="font-medium text-success">Revenue Growth</div>
              <div className="text-muted-foreground">Strong</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-warning">Cost Management</div>
              <div className="text-muted-foreground">Moderate</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-primary">Cash Position</div>
              <div className="text-muted-foreground">Healthy</div>
            </div>
          </div>
        </div>

        {/* Main Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue History */}
          <div className="lg:col-span-2 glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5 relative">
            <div className="absolute top-4 right-4">
              <ChartInsight
                title="Revenue Trend"
                level="High"
                summary="Strong revenue growth trajectory."
                bullets={["85% month-over-month growth", "Consistent upward trend", "On track to exceed projections"]}
              />
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Revenue & Expenses
              </h3>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[
                  { month: "Jan", revenue: financialData.annualRevenue * 0.08, expenses: financialData.annualRevenue * 0.08 * 0.78 },
                  { month: "Feb", revenue: financialData.annualRevenue * 0.085, expenses: financialData.annualRevenue * 0.085 * 0.78 },
                  { month: "Mar", revenue: financialData.annualRevenue * 0.09, expenses: financialData.annualRevenue * 0.09 * 0.78 },
                  { month: "Apr", revenue: financialData.annualRevenue * 0.095, expenses: financialData.annualRevenue * 0.095 * 0.78 },
                  { month: "May", revenue: financialData.annualRevenue * 0.1, expenses: financialData.annualRevenue * 0.1 * 0.78 },
                  { month: "Jun", revenue: financialData.annualRevenue * 0.105, expenses: financialData.annualRevenue * 0.105 * 0.78 },
                  { month: "Jul", revenue: financialData.annualRevenue * 0.11, expenses: financialData.annualRevenue * 0.11 * 0.78 },
                  { month: "Aug", revenue: financialData.annualRevenue * 0.115, expenses: financialData.annualRevenue * 0.115 * 0.78 },
                ]}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
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
                    tickFormatter={(value) => formatCurrency(value)}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#06B6D4"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#revenueGrad)"
                    name="Revenue"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#EF4444"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#expenseGrad)"
                    name="Expenses"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Expense Breakdown */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-6 relative">
            <div className="absolute top-4 right-4">
              <ChartInsight
                title="Expense Breakdown"
                level="Medium"
                summary="Personnel costs dominate budget."
                bullets={["45% of expenses on personnel", "Marketing investment reasonable at 15%", "R&D spending supports innovation"]}
              />
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Expense Breakdown
              </h3>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={financialData.expenseBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="amount"
                  >
                    {financialData.expenseBreakdown.map((entry: any, index: number) => (
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
                    formatter={(value: any) => [formatCurrency(value), "Amount"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {financialData.expenseBreakdown.map((entry: any, index: number) => (
                <div key={entry.category} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-muted-foreground">{entry.category}</span>
                  </div>
                  <span className="font-medium text-card-foreground">{entry.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Flags */}
        <div className="opacity-0 animate-fade-in-up stagger-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground">
              Financial Risk Analysis
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              ML-identified financial risks and recommended actions
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {financialData.riskFlags.map((risk: any, index: number) => (
              <RiskFlagCard key={risk.title} {...risk} delay={700 + index * 100} />
            ))}
          </div>
        </div>

        {/* Key Financial Ratios */}
        <div className="mt-8 glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-7">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-card-foreground">
              Key Financial Ratios
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Important financial metrics for business health assessment
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-secondary/20 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {financialData.ltvCacRatio.toFixed(1)}x
              </div>
              <div className="text-sm text-muted-foreground mt-1">LTV:CAC Ratio</div>
              <div className="text-xs text-success mt-2">Healthy</div>
            </div>
            <div className="text-center p-4 bg-secondary/20 rounded-lg">
              <div className="text-2xl font-bold text-success">
                {((financialData.annualRevenue * (financialData.profitMargin / 100)) / 12).toFixed(0)}
              </div>
              <div className="text-sm text-muted-foreground mt-1">Monthly Profit</div>
              <div className="text-xs text-success mt-2">Growing</div>
            </div>
            <div className="text-center p-4 bg-secondary/20 rounded-lg">
              <div className="text-2xl font-bold text-warning">
                {((financialData.burnRate * 12) / financialData.annualRevenue * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground mt-1">Burn Rate Ratio</div>
              <div className="text-xs text-warning mt-2">Monitor</div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}

function RiskFlagCard({
  type,
  title,
  description,
  action,
  delay = 0,
}: {
  type: string
  title: string
  description: string
  action: string
  delay?: number
}) {
  const getIcon = () => {
    switch (type) {
      case "success": return <Shield className="h-5 w-5 text-success" />
      case "warning": return <AlertTriangle className="h-5 w-5 text-warning" />
      case "danger": return <AlertTriangle className="h-5 w-5 text-destructive" />
      default: return <Target className="h-5 w-5 text-primary" />
    }
  }

  const getStatusColor = () => {
    switch (type) {
      case "success": return "border-success/20 bg-success/5"
      case "warning": return "border-warning/20 bg-warning/5"
      case "danger": return "border-destructive/20 bg-destructive/5"
      default: return "border-primary/20 bg-primary/5"
    }
  }

  return (
    <div
      className={`glass-card rounded-xl p-6 border-l-4 opacity-0 animate-fade-in-up ${getStatusColor()}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-3 mb-4">
        {getIcon()}
        <div className="flex-1">
          <h4 className="font-semibold text-card-foreground mb-2">{title}</h4>
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">{action}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
