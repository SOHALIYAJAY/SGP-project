"use client"

import React, { useState, useEffect } from "react"
import { MetricCard } from "@/components/ui/metric-card"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { useExportPDF } from "@/hooks/use-export-pdf"
import { useCompanyData } from "@/hooks/useCompanyData"
import { FillCompanyFirst } from "@/components/ui/fill-company-first"
import { GlowCard } from "@/components/ui/spotlight-card";
import { DashboardGlowCard } from "@/components/ui/dashboard-glow-card";
import { CustomTooltip } from "@/components/ui/custom-tooltip"

import {
  Activity,
  AlertTriangle,
  TrendingUp,
  Target,
  Zap,
  Eye,
  ShieldAlert,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ComposedChart,
  Line,
  Legend,
  RadialBarChart,
  RadialBar,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"
import ChartInsight from '@/components/chart-insight'
import CustomerStabilityInfo from '@/components/ui/customer-stability-info'
import { SimpleStatusCard } from '@/components/ui/simple-status-card'

export default function DashboardPage() {
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { hasCompanyData, isLoading: companyDataLoading } = useCompanyData()
  const { isExporting, handleExport } = useExportPDF(
    "dashboard-content",
    "Business_Analysis_Report.pdf",
    "Business Analysis Dashboard",
    analysisData?.input?.companyName || "Company"
  )

  // Simple backend export function
  const handleSimpleExport = async () => {
    try {
      console.log("Starting PDF export from backend...")
      
      // Get company data from localStorage
      const storedData = localStorage.getItem('companyAnalysisData')
      const companyData = storedData ? JSON.parse(storedData) : {}
      
      // Call backend API for PDF generation
      const response = await fetch('http://localhost:8000/api/export-pdf', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/pdf'
        },
        body: JSON.stringify(companyData)
      })
      
      if (!response.ok) {
        throw new Error(`Backend export failed: ${response.status}`)
      }
      
      // Get PDF blob
      const blob = await response.blob()
      
      console.log("Response blob type:", blob.type)
      console.log("Response blob size:", blob.size)
      console.log("Response headers:", response.headers)
      
      // Check if it's actually a PDF
      if (blob.type !== 'application/pdf') {
        console.warn('Response is not PDF, blob type:', blob.type)
        const text = await blob.text()
        console.error('Backend response:', text)
        throw new Error('Server did not return a PDF file')
      }
      
      console.log("Creating download link...")
      
      // Create download link
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = "Business_Analysis_Report.pdf"
      document.body.appendChild(a)
      a.click()
      
      console.log("Download link clicked!")
      
      // Cleanup
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      console.log("PDF exported successfully from backend")
      
    } catch (error) {
      console.error("PDF export error:", error)
      alert("PDF export failed. Please try again.")
    }
  }

  useEffect(() => {
    // Fetch ML-powered analysis data
    const fetchAnalysisData = async () => {
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
          growthRate: "85",
          customerCount: "1500",
          churnRate: "2.5",
          nps: "72",
          marketSize: "50",
          competitorCount: "15",
          marketShare: "2.5",
          industryGrowthRate: "25"
        }

        const response = await fetch('http://localhost:8000/api/analyze-company', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(companyData)
        })
        
        if (response.ok) {
          const result = await response.json()
          setAnalysisData(result)
        }
      } catch (error) {
        console.error('Failed to fetch analysis data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalysisData()
  }, [])

  if (loading || companyDataLoading) {
    return (
      <div className="min-h-screen py-2">
        <SectionWrapper>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading ML-powered analysis...</p>
          </div>
        </SectionWrapper>
      </div>
    )
  }

  if (!hasCompanyData) {
    return <FillCompanyFirst />
  }

  if (!analysisData) {
    return (
      <div className="min-h-screen py-2">
        <SectionWrapper>
          <div className="text-center">
            <p className="text-muted-foreground">No analysis data available</p>
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
              {entry.name}: {typeof entry.value === 'number' ? formatCurrency(entry.value) : entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  // Generate dynamic data based on ML analysis
  const revenueData = analysisData.trajectory.map((point: any, index: number) => ({
    month: point.month,
    revenue: point.revenue,
    cost: point.revenue * (1 - analysisData.summary.businessHealth / 200),
    profit: point.revenue * (analysisData.summary.businessHealth / 200),
  }))

  const customerData = [
    { name: "Active", value: 100 - analysisData.customerAnalytics.churnRate * 5, color: "#22C55E" },
    { name: "At Risk", value: analysisData.customerAnalytics.churnRate * 3, color: "#F59E0B" },
    { name: "Churned", value: analysisData.customerAnalytics.churnRate, color: "#EF4444" },
  ]

  const performanceMetrics = [
    { name: "Revenue Growth", value: analysisData.growthPredictions.revenueGrowth || 75, fill: "#06B6D4" },
    { name: "Customer Growth", value: analysisData.growthPredictions.customerGrowth || 82, fill: "#22C55E" },
    { name: "Profit Margin", value: analysisData.financialAnalysis.profitMargin || 65, fill: "#F59E0B" },
    { name: "Market Share", value: analysisData.marketAnalysis.marketShare || 45, fill: "#8B5CF6" },
    { name: "NPS Score", value: analysisData.customerAnalytics.nps || 70, fill: "#A855F7" },
    { name: "Stability", value: 100 - analysisData.riskAssessment.overallRiskScore, fill: "#22D3EE" },
  ]

  const monthlyGrowth = analysisData.trajectory.map((point: any, index: number) => ({
    month: point.month,
    mrr: point.revenue * 0.1,
    arr: point.revenue * 1.2,
  }))

  const riskDistributionData = [
    { name: "Financial", value: analysisData.riskAssessment.riskCategories[0]?.score || 42, fill: "url(#colorFinancial)" },
    { name: "Operational", value: analysisData.riskAssessment.riskCategories[1]?.score || 65, fill: "url(#colorOperational)" },
    { name: "Market", value: analysisData.riskAssessment.riskCategories[2]?.score || 58, fill: "url(#colorMarket)" },
    { name: "Regulatory", value: 35, fill: "url(#colorRegulatory)" },
    { name: "Dependency", value: 48, fill: "url(#colorDependency)" },
  ]

  return (
    <div className="min-h-screen py-2">
      <SectionWrapper>
        {/* Header */}
        <div className="mb-8 opacity-0 animate-fade-in-up">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Business Dashboard
              </h1>
              <p className="text-xs text-success mt-2">🤖 Powered by ML Analysis</p>
            </div>
            <Button
              onClick={handleSimpleExport}
              disabled={isExporting}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              {isExporting ? "Exporting..." : "Export PDF"}
            </Button>
          </div>
        </div>

        <div id="dashboard-content">
        {/* Key Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Business Health"
            value={`${analysisData.summary.businessHealth.toFixed(1)}`}
            subtitle="Overall health score"
            icon={Activity}
            status={analysisData.summary.businessHealth >= 80 ? "success" : analysisData.summary.businessHealth >= 60 ? "warning" : "danger"}
            delay={100}
            sparkline={[75,78,82,85,88,analysisData.summary.businessHealth]}
          />
          <MetricCard
            title="Risk Level"
            value={analysisData.summary.riskLevel}
            subtitle="Current risk assessment"
            icon={AlertTriangle}
            status={analysisData.summary.riskLevel === "Low" ? "success" : analysisData.summary.riskLevel === "Medium" ? "warning" : "danger"}
            delay={200}
            sparkline={[60,55,52,48,45,analysisData.summary.riskLevel === "Low" ? 35 : analysisData.summary.riskLevel === "Medium" ? 55 : 75]}
          />
          <MetricCard
            title="Investment Readiness"
            value={analysisData.summary.investmentReadiness}
            subtitle="Investment grade"
            icon={Target}
            status={analysisData.summary.investmentReadiness.includes("A") ? "success" : analysisData.summary.investmentReadiness.includes("B") ? "warning" : "danger"}
            delay={300}
            sparkline={[65,68,72,75,78,analysisData.summary.investmentReadiness.includes("A") ? 90 : analysisData.summary.investmentReadiness.includes("B") ? 75 : 60]}
          />
        </div>

        {/* Main Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue vs Cost Analysis */}
          <div className="lg:col-span-2 glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5 relative">
            <div className="absolute top-4 right-4">
              <ChartInsight
                title="Revenue & Cost Analysis"
                level="High"
                summary="Strong revenue growth with controlled costs."
                bullets={["Revenue growing 85% MoM", "Cost ratio improving", "Profit margins expanding"]}
              />
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Revenue vs Cost Analysis
              </h3>
              <p className="text-sm text-muted-foreground">
                Revenue trends, cost analysis, and profit margin evaluation showing financial health and efficiency.
              </p>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="costGrad" x1="0" y1="0" x2="0" y2="1">
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
                    dataKey="cost"
                    stroke="#EF4444"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#costGrad)"
                    name="Cost"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Customer Stability */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Customer Analytics
              </h3>
              <p className="text-sm text-muted-foreground">
                Customer behavior analysis including retention rates, satisfaction scores, and lifetime value metrics.
              </p>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {customerData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(17, 24, 39, 0.95)",
                      border: "1px solid #1E293B",
                      borderRadius: "8px",
                      backdropFilter: "blur(8px)",
                    }}
                    formatter={(value: any) => [`${value}%`, "Customers"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <CustomerStabilityInfo />
          </div>
        </div>

        {/* Secondary Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* MRR & ARR Growth */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5 relative">
            <div className="absolute top-4 right-4">
              <ChartInsight
                title="Revenue Growth"
                level="High"
                summary="Exceptional growth trajectory."
                bullets={["85% month-over-month growth", "ARR on track for 10M", "MRR consistently expanding"]}
              />
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                MRR & ARR Growth
              </h3>
              <p className="text-sm text-muted-foreground">
                Monthly Recurring Revenue and Annual Recurring Revenue trends showing growth patterns and revenue predictability.
              </p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={monthlyGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                  <XAxis
                    dataKey="month"
                    stroke="#64748B"
                    tick={{ fill: "#64748B", fontSize: 12 }}
                  />
                  <YAxis
                    yAxisId="left"
                    stroke="#64748B"
                    tick={{ fill: "#64748B", fontSize: 12 }}
                    tickFormatter={(value) => formatCurrency(value)}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#64748B"
                    tick={{ fill: "#64748B", fontSize: 12 }}
                    tickFormatter={(value) => formatCurrency(value)}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    yAxisId="left"
                    dataKey="mrr"
                    fill="#06B6D4"
                    radius={[4, 4, 0, 0]}
                    name="MRR"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="arr"
                    stroke="#22C55E"
                    strokeWidth={3}
                    dot={{ fill: "#22C55E", strokeWidth: 2, r: 4 }}
                    name="ARR"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Performance Metrics
              </h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="10%"
                  outerRadius="90%"
                  data={performanceMetrics}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar
                    dataKey="value"
                    cornerRadius={10}
                    fill="#8884d8"
                    label={{ position: "insideStart", fill: "#fff" }}
                  />
                  <Legend
                    iconSize={18}
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    formatter={(value: any, entry: any) => (
                      <span style={{ color: entry.color }}>
                        {entry.payload.value}%
                      </span>
                    )}
                  />
                  <Tooltip content={<CustomTooltip />} />
                </RadialBarChart>
              </ResponsiveContainer>
              
              {/* Performance Metrics Description */}
              <div className="mt-4 p-4 bg-card/50 rounded-lg">
                <h4 className="text-sm font-semibold text-card-foreground mb-2">Performance Analysis</h4>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  {performanceMetrics.map((metric: any, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: metric.fill }}></div>
                      <span className="text-muted-foreground">{metric.name}: {metric.value}%</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Comprehensive performance metrics showing revenue growth, customer acquisition, profitability, market position, and customer satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="glass-card rounded-xl p-6 mb-8 opacity-0 animate-fade-in-up stagger-7">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-card-foreground">
              Risk Distribution
            </h3>
            <p className="text-sm text-muted-foreground">
              Risk assessment across financial, operational, market, regulatory, and dependency factors.
            </p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={riskDistributionData}>
                <defs>
                  <linearGradient id="colorFinancial" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorOperational" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorMarket" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#22D3EE" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorRegulatory" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorDependency" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <PolarGrid stroke="#1E293B" />
                <PolarAngleAxis
                  dataKey="name"
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
                  name="Risk"
                  dataKey="value"
                  stroke="#06B6D4"
                  strokeWidth={2}
                  fill="#06B6D4"
                  fillOpacity={0.3}
                />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8 opacity-0 animate-fade-in-up stagger-8" style={{ display: isExporting ? 'none' : 'grid' }}>
          <SimpleStatusCard
            title="Key Strength"
            description="Strong revenue growth with improving profit margins"
            metrics={["Revenue 85% MoM", "Profit margin expanding", "Customer retention high"]}
            status="success"
            icon={TrendingUp}
            delay={900}
          />
          <SimpleStatusCard
            title="Needs Attention"
            description="Customer churn rate slightly elevated"
            metrics={["Churn at 2.5%", "Focus on retention", "Improve onboarding"]}
            status="warning"
            icon={AlertCircle}
            delay={1000}
          />
          <SimpleStatusCard
            title="Risk Factor"
            description="Burn rate indicates 18-month runway"
            metrics={["18 months runway", "Plan Series B", "Optimize costs"]}
            status="risk"
            icon={AlertTriangle}
            delay={1100}
          />
        </div>
        </div>
      </SectionWrapper>
    </div>
  )
}
