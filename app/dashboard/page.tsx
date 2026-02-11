"use client"

import React from "react"
import { MetricCard } from "@/components/ui/metric-card"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { useExportPDF } from "@/hooks/use-export-pdf"
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
import SGPStatusCard from '@/components/ui/sgp-status-card'

const revenueData = [
  { month: "Jan", revenue: 4000, cost: 2400, profit: 1600 },
  { month: "Feb", revenue: 4500, cost: 2600, profit: 1900 },
  { month: "Mar", revenue: 5200, cost: 2800, profit: 2400 },
  { month: "Apr", revenue: 4800, cost: 2700, profit: 2100 },
  { month: "May", revenue: 5800, cost: 3000, profit: 2800 },
  { month: "Jun", revenue: 6200, cost: 3200, profit: 3000 },
  { month: "Jul", revenue: 7000, cost: 3400, profit: 3600 },
  { month: "Aug", revenue: 7500, cost: 3600, profit: 3900 },
]

const customerData = [
  { name: "Active", value: 68, color: "#22C55E" },
  { name: "At Risk", value: 22, color: "#F59E0B" },
  { name: "Churned", value: 10, color: "#EF4444" },
]

const performanceMetrics = [
  { name: "Revenue", value: 87, fill: "#06B6D4" },
  { name: "Growth", value: 92, fill: "#22C55E" },
  { name: "Efficiency", value: 78, fill: "#F59E0B" },
  { name: "Stability", value: 85, fill: "#22D3EE" },
]

const monthlyGrowth = [
  { month: "Jan", mrr: 280, arr: 3360 },
  { month: "Feb", mrr: 320, arr: 3840 },
  { month: "Mar", mrr: 380, arr: 4560 },
  { month: "Apr", mrr: 420, arr: 5040 },
  { month: "May", mrr: 480, arr: 5760 },
  { month: "Jun", mrr: 550, arr: 6600 },
  { month: "Jul", mrr: 620, arr: 7440 },
  { month: "Aug", mrr: 700, arr: 8400 },
]

const riskDistributionData = [
  { name: "Financial", value: 42, fill: "url(#colorFinancial)" },
  { name: "Operational", value: 65, fill: "url(#colorOperational)" },
  { name: "Market", value: 58, fill: "url(#colorMarket)" },
  { name: "Regulatory", value: 35, fill: "url(#colorRegulatory)" },
  { name: "Dependency", value: 48, fill: "url(#colorDependency)" },
]

export default function DashboardPage() {
  const { isExporting, handleExport } = useExportPDF(
    "dashboard-content",
    "Business_Analysis_Report.pdf",
    "Business Analysis & Prediction Report",
    "TechCorp Inc."
  )

  return (
    <div className="py-2">
      <SectionWrapper>
        {/* Header with Export Button */}
        <div className="mb-8 flex items-start justify-between">
          <div className="opacity-0 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Business Dashboard
            </h1>
            <p className="text-muted-foreground">
              TechCorp Inc. - Analysis generated on Feb 3, 2026
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

        {/* Main Content Container for PDF Export */}
        <div id="dashboard-content">

        {/* Summary Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Business Health"
            value="87%"
            subtitle="Above industry average"
            icon={Activity}
            status="success"
            trend={{ value: 12, label: "vs last quarter" }}
            delay={100}
            sparkline={[70,72,76,80,83,85,87]}
          />
          <MetricCard
            title="Risk Level"
            value="Medium"
            subtitle="3 areas need attention"
            icon={AlertTriangle}
            status="warning"
            delay={200}
            sparkline={[45,48,46,50,52,50,49]}
          />
          <MetricCard
            title="Investment Readiness"
            value="A-"
            subtitle="Series B ready"
            icon={TrendingUp}
            status="success"
            trend={{ value: 8, label: "improvement" }}
            delay={300}
            sparkline={[55,58,60,63,67,71,76]}
          />
          {/* Company Stage removed per request */}
          <MetricCard
            title="Failure Probability (%)"
            value="18%"
            subtitle="Within acceptable range"
            icon={AlertCircle}
            status="warning"
            delay={500}
            sparkline={[22,21,20,19,19,18,18]}
          />
        </div>

        {/* Main Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue vs Cost Chart */}
          <div className="lg:col-span-2 glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5 relative group">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-lg font-semibold text-card-foreground">
                Revenue vs Cost Analysis
              </h3>
              <ChartInsight
                title="Revenue vs Cost"
                level="High"
                summary="Revenue growing; costs stable; profit margins improving."
                bullets={["Monthly revenue up 15% MoM", "Profit expanding each month", "Cost control strong"]}
              />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Monthly comparison with profit margin
            </p>
            <div className="flex items-center gap-4 text-sm mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#06B6D4]" />
                <span className="text-muted-foreground">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                <span className="text-muted-foreground">Cost</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
                <span className="text-muted-foreground">Profit</span>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
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
                    tickFormatter={(value) => `$${value / 1000}K`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#06B6D4"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                    name="Revenue"
                  />
                  <Area
                    type="monotone"
                    dataKey="cost"
                    stroke="#EF4444"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorCost)"
                    name="Cost"
                  />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="#22C55E"
                    strokeWidth={3}
                    dot={{ fill: "#22C55E", strokeWidth: 2, r: 4 }}
                    name="Profit"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Customer Stability Donut */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-6 relative group">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-lg font-semibold text-card-foreground">
                Customer Stability
              </h3>
              <CustomerStabilityInfo
                title="Customer Stability"
                status="medium"
                statusLabel="Medium Risk"
                summary="Most are stable; 20% at-risk segment needs attention."
                metrics={{ stable: 70, atRisk: 20, churned: 10 }}
                recommendation="Target retention offers to at-risk customers and monitor churn drivers."
              />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Distribution by status
            </p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {customerData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* ChartInfo component removed */}
            <div className="flex flex-col gap-2 mt-2">
              {customerData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium text-card-foreground">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        

        {/* Secondary Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* MRR Growth Chart */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5 relative group">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-lg font-semibold text-card-foreground">
                MRR & ARR Growth
              </h3>
              <ChartInsight
                title="MRR & ARR Growth"
                level="High"
                summary="Recurring revenue growing 40% YoY; on pace for $200K ARR."
                bullets={["MRR up $15K/month trend", "ARR on pace for $200K", "Subscription model strong"]}
              />
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Monthly recurring revenue trends
            </p>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
                <ArrowUpRight className="w-4 h-4" />
                +150%
              </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis
                    dataKey="month"
                    stroke="#64748B"
                    tick={{ fill: "#64748B", fontSize: 12 }}
                  />
                  <YAxis
                    stroke="#64748B"
                    tick={{ fill: "#64748B", fontSize: 12 }}
                    tickFormatter={(value) => `$${value}K`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="mrr" name="MRR" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="arr" name="ARR" fill="#22D3EE" radius={[4, 4, 0, 0]} opacity={0.6} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Performance Radial Chart */}
<div className="relative glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-6">
  <div className="mb-6">
    <h3 className="text-lg font-semibold text-card-foreground">
      Performance Metrics
    </h3>
    <p className="text-sm text-muted-foreground">
      Key business performance indicators
    </p>
  </div>

  <div className="h-64">
    <ResponsiveContainer width="100%" height="100%">
      <RadialBarChart
        cx="50%"
        cy="50%"
        innerRadius="30%"
        outerRadius="90%"
        data={performanceMetrics}
        startAngle={90}
        endAngle={-270}
      >
        <RadialBar
          background={{ fill: "#1E293B" }}
          dataKey="value"
          cornerRadius={4}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  </div>

  <div className="grid grid-cols-2 gap-3 mt-2">
    {performanceMetrics.map((metric) => (
      <div key={metric.name} className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: metric.fill }}
        />
        <span className="text-sm text-muted-foreground">
          {metric.name}
        </span>
        <span className="text-sm font-medium text-card-foreground ml-auto">
          {metric.value}%
        </span>
      </div>
    ))}
  </div>
</div>
         {/* ✅ CLOSE Secondary Charts Row */}

        {/* Risk Distribution Radar Chart */}
        <div className="relative glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-5 mb-8">

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-card-foreground">
              Risk Distribution
            </h3>
            <p className="text-sm text-muted-foreground">
              Multi-dimensional risk analysis across key business areas
            </p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                data={riskDistributionData}
                margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
              >
                <defs>
                  <linearGradient id="colorFinancial" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.2} />
                  </linearGradient>
                  <linearGradient id="colorOperational" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#22D3EE" stopOpacity={0.2} />
                  </linearGradient>
                  <linearGradient id="colorMarket" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.2} />
                  </linearGradient>
                  <linearGradient id="colorRegulatory" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.2} />
                  </linearGradient>
                  <linearGradient id="colorDependency" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#14B8A6" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <PolarGrid stroke="#1E293B" />
                <PolarAngleAxis
                  dataKey="name"
                  stroke="#64748B"
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  stroke="#1E293B"
                  tick={{ fill: "#64748B", fontSize: 11 }}
                />
                <Radar
                  name="Risk Level"
                  dataKey="value"
                  stroke="#06B6D4"
                  fill="url(#colorFinancial)"
                  fillOpacity={0.6}
                  dot={{ fill: "#06B6D4", r: 5, strokeWidth: 2, stroke: "#0B1220" }}
                  activeDot={{ r: 7, fill: "#22D3EE" }}
                />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-5 gap-4 mt-6 pt-6 border-t border-border">
            {riskDistributionData.map((item) => (
              <div key={item.name} className="flex flex-col items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer">
                  <span className="text-sm font-semibold text-primary">{item.value}</span>
                </div>
                <p className="text-xs text-muted-foreground text-center">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
        </div>

        {/* Quick Insights */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <InsightCard
            type="strength"
            icon={Zap}
            title="Key Strength"
            description="Strong revenue growth of 85% YoY with consistent month-over-month improvements"
            metrics={[
              { label: "YoY Growth", value: "+85%", positive: true },
              { label: "Profit Margin", value: "52%", positive: true },
            ]}
            delay={700}
          />
          <InsightCard
            type="attention"
            icon={Eye}
            title="Needs Attention"
            description="Customer churn rate slightly elevated at 2.5% - consider retention initiatives"
            metrics={[
              { label: "Churn Rate", value: "2.5%", positive: false },
              { label: "At-Risk", value: "22%", positive: false },
            ]}
            delay={800}
          />
          <InsightCard
            type="risk"
            icon={ShieldAlert}
            title="Risk Factor"
            description="Burn rate indicates 18-month runway - plan for next funding round"
            metrics={[
              { label: "Runway", value: "18mo", positive: true },
              { label: "Burn Rate", value: "$180K", positive: false },
            ]}
            delay={900}
          />
        </div>
        {/* END dashboard-content */}
        </div>

      </SectionWrapper>
    </div>
  )
}

function InsightCard({
  type,
  icon: Icon,
  title,
  description,
  metrics,
  delay = 0,
}: {
  type: "strength" | "attention" | "risk"
  icon: React.ElementType
  title: string
  description: string
  metrics: { label: string; value: string; positive: boolean }[]
  delay?: number
}) {
  const styles = {
    strength: {
      border: "border-l-success group-hover:border-t-success",
      bg: "bg-success/10",
      icon: "text-success",
      glow: "shadow-success/10",
      spark: "#22C55E",
    },
    attention: {
      border: "border-l-warning group-hover:border-t-warning",
      bg: "bg-warning/10",
      icon: "text-warning",
      glow: "shadow-warning/10",
      spark: "#F59E0B",
    },
    risk: {
      border: "border-l-destructive group-hover:border-t-destructive",
      bg: "bg-destructive/10",
      icon: "text-destructive",
      glow: "shadow-destructive/10",
      spark: "#EF4444",
    },
  }

  const style = styles[type]

  const sparklineData = {
    strength: [30, 35, 40, 50, 60, 75, 85],
    attention: [80, 75, 70, 65, 60, 55, 50],
    risk: [70, 68, 65, 62, 60, 58, 55],
  }

  return (
    <div
      className="group relative glass-card rounded-xl p-6 opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className={`p-2 rounded-lg ${style.bg}`}>
          <Icon className={`w-5 h-5 ${style.icon}`} />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-card-foreground mb-1">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <svg width="50" height="20" className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <polyline points={sparklineData[type].map((v, i) => `${(i / 6) * 50},${20 - v / 4}`).join(' ')} fill="none" stroke={style.spark} strokeWidth="1.5" />
        </svg>
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


