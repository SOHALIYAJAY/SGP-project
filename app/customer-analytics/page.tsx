"use client"

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

const retentionData = [
  { month: "Jan", retention: 92, churn: 8, newCustomers: 120 },
  { month: "Feb", retention: 91, churn: 9, newCustomers: 145 },
  { month: "Mar", retention: 93, churn: 7, newCustomers: 180 },
  { month: "Apr", retention: 94, churn: 6, newCustomers: 210 },
  { month: "May", retention: 92, churn: 8, newCustomers: 195 },
  { month: "Jun", retention: 95, churn: 5, newCustomers: 240 },
  { month: "Jul", retention: 96, churn: 4, newCustomers: 280 },
  { month: "Aug", retention: 97, churn: 3, newCustomers: 310 },
]

const satisfactionData = [
  { category: "Product Quality", score: 4.5, benchmark: 4.0 },
  { category: "Customer Support", score: 4.2, benchmark: 3.8 },
  { category: "Value for Money", score: 3.9, benchmark: 3.5 },
  { category: "Ease of Use", score: 4.7, benchmark: 4.0 },
  { category: "Feature Set", score: 4.3, benchmark: 3.9 },
]

const cohortData = [
  { cohort: "Jan 2025", month1: 100, month2: 92, month3: 85, month4: 80, month5: 76, month6: 73 },
  { cohort: "Feb 2025", month1: 100, month2: 94, month3: 88, month4: 83, month5: 79, month6: 75 },
  { cohort: "Mar 2025", month1: 100, month2: 95, month3: 90, month4: 86, month5: 82, month6: null },
  { cohort: "Apr 2025", month1: 100, month2: 96, month3: 92, month4: 88, month5: null, month6: null },
  { cohort: "May 2025", month1: 100, month2: 97, month3: 93, month4: null, month5: null, month6: null },
]

const customerLifecycle = [
  { name: "New", value: 25, color: "#22D3EE" },
  { name: "Active", value: 45, color: "#22C55E" },
  { name: "At Risk", value: 18, color: "#F59E0B" },
  { name: "Dormant", value: 8, color: "#EF4444" },
  { name: "Churned", value: 4, color: "#64748B" },
]

const engagementTrend = [
  { week: "W1", dau: 850, wau: 2100, mau: 4500 },
  { week: "W2", dau: 920, wau: 2300, mau: 4700 },
  { week: "W3", dau: 980, wau: 2450, mau: 4900 },
  { week: "W4", dau: 1050, wau: 2600, mau: 5100 },
  { week: "W5", dau: 1120, wau: 2750, mau: 5300 },
  { week: "W6", dau: 1200, wau: 2900, mau: 5500 },
  { week: "W7", dau: 1280, wau: 3050, mau: 5700 },
  { week: "W8", dau: 1350, wau: 3200, mau: 5900 },
]

const segmentData = [
  { segment: "Enterprise", count: 150, revenue: 4500000, growth: 25, ltv: 30000 },
  { segment: "Mid-Market", count: 450, revenue: 2700000, growth: 35, ltv: 6000 },
  { segment: "SMB", count: 900, revenue: 800000, growth: 45, ltv: 889 },
]

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-xl">
        <p className="text-sm font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry, index) => (
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

export default function CustomerAnalyticsPage() {
  return (
    <div className="min-h-screen py-2">
      <SectionWrapper>
        {/* Header */}
        <div className="mb-8 opacity-0 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Customer Analytics
          </h1>
        </div>

        {/* Key Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Customer Retention"
            value="97.5%"
            subtitle="Monthly average"
            icon={Users}
            status="success"
            trend={{ value: 5.2, label: "vs last quarter" }}
            delay={100}
            sparkline={[92,91,93,94,92,95,97]}
          />
          <MetricCard
            title="Churn Rate"
            value="2.5%"
            subtitle="Monthly churn"
            icon={UserMinus}
            status="warning"
            trend={{ value: -1.8, label: "improvement" }}
            delay={200}
            sparkline={[8,9,7,6,8,5,4]}
          />
          <MetricCard
            title="NPS Score"
            value="72"
            subtitle="Net Promoter Score"
            icon={Heart}
            status="success"
            trend={{ value: 8, label: "vs industry avg" }}
            delay={300}
            sparkline={[60,65,68,70,71,72]}
          />
          <MetricCard
            title="Customer Growth"
            value="+30%"
            subtitle="YoY growth"
            icon={TrendingUp}
            status="success"
            delay={400}
            sparkline={[10,12,15,18,22,25,30]}
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
                <ComposedChart data={retentionData}>
                  <defs>
                    <linearGradient id="retentionGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                    </linearGradient>
                  </defs>
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
                    dataKey="retention"
                    name="Retention"
                    stroke="#22C55E"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#retentionGrad)"
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="churn"
                    name="Churn"
                    stroke="#EF4444"
                    strokeWidth={3}
                    dot={{ fill: "#EF4444", strokeWidth: 2, r: 4 }}
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="newCustomers"
                    name="New Customers"
                    fill="#06B6D4"
                    radius={[4, 4, 0, 0]}
                    opacity={0.7}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            {/* Insights */}
            <div className="mt-6 pt-6 border-t border-border/50">
              <div className="grid sm:grid-cols-3 gap-4">
                <InsightBullet color="success" text="Retention rate improved to 97% - strong trend" />
                <InsightBullet color="destructive" text="Churn dropped to 3% - best performance" />
                <InsightBullet color="primary" text="310 new customers in Aug - accelerating growth" />
              </div>
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
                Lifecycle
              </h3>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerLifecycle}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {customerLifecycle.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {customerLifecycle.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-sm px-2 py-1 rounded bg-secondary/30"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-muted-foreground text-xs">{item.name}</span>
                  </div>
                  <span className="font-medium text-card-foreground text-xs">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
            {/* Insights */}
            <div className="mt-4 pt-4 border-t border-border/50">
              <div className="space-y-2">
                <InsightBullet color="success" text="45% active - healthy user base" />
                <InsightBullet color="warning" text="18% at risk - targeted retention needed" />
              </div>
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
                <BarChart data={satisfactionData} layout="vertical">
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
                    formatter={(value) => (
                      <span className="text-muted-foreground text-sm">{value}</span>
                    )}
                  />
                  <Bar dataKey="score" name="Your Score" fill="#06B6D4" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="benchmark" name="Benchmark" fill="#1E293B" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Insights */}
            <div className="mt-6 pt-6 border-t border-border/50">
              <div className="grid sm:grid-cols-3 gap-4">
                <InsightBullet color="primary" text="Ease of Use leads at 4.7 - above benchmark" />
                <InsightBullet color="success" text="All categories exceed industry average" />
                <InsightBullet color="warning" text="Value for Money lowest at 3.9 - review pricing" />
              </div>
            </div>
          </div>

          {/* User Engagement */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-6 relative">
            <div className="absolute top-4 right-4">
              <ChartInsight
                title="Engagement"
                level="High"
                summary="DAU and MAU steadily growing — strong engagement."
                bullets={["DAU grew 59% W1→W8", "MAU at 5.9K — healthy monthly reach", "DAU/MAU ratio improving — deeper usage"]}
              />
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Engagement
              </h3>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagementTrend}>
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
                  <Area
                    type="monotone"
                    dataKey="mau"
                    name="MAU"
                    stroke="#22D3EE"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#mauGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="wau"
                    name="WAU"
                    stroke="#22C55E"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#wauGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="dau"
                    name="DAU"
                    stroke="#06B6D4"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#dauGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 pt-6 border-t border-border/50">
              <div className="grid sm:grid-cols-3 gap-4">
                <InsightBullet color="success" text="DAU growing 59% from W1 to W8 - strong engagement" />
                <InsightBullet color="primary" text="MAU reached 5.9K - consistent monthly growth" />
                <InsightBullet color="success" text="DAU/MAU ratio improving - higher frequency" />
              </div>
            </div>
          </div>
        </div>

        {/* Cohort Analysis */}
        <div className="glass-card rounded-xl p-6 mb-8 opacity-0 animate-fade-in-up stagger-5">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-card-foreground">
              Cohort Retention
            </h3>
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
                {cohortData.map((row) => (
                  <tr key={row.cohort} className="border-b border-border/50">
                    <td className="py-3 px-4 text-sm font-medium text-card-foreground">{row.cohort}</td>
                    {[row.month1, row.month2, row.month3, row.month4, row.month5, row.month6].map((value, idx) => (
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
          {/* Insights */}
          <div className="mt-6 pt-6 border-t border-border/50">
            <div className="grid sm:grid-cols-3 gap-4">
              <InsightBullet color="success" text="May 2025 cohort strongest - 97% month 1 retention" />
              <InsightBullet color="primary" text="6-month retention range 73-76% - consistent" />
              <InsightBullet color="success" text="Newer cohorts improving - better onboarding" />
            </div>
          </div>
        </div>

        {/* Customer Segments */}
        <div className="opacity-0 animate-fade-in-up stagger-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Segments
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {segmentData.map((segment, index) => (
              <SegmentCard key={segment.segment} {...segment} delay={700 + index * 100} />
            ))}
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}

function InsightBullet({
  color,
  text,
}: {
  color: "success" | "destructive" | "warning" | "primary"
  text: string
}) {
  const colorStyles = {
    success: "text-success",
    destructive: "text-destructive",
    warning: "text-warning",
    primary: "text-primary",
  }

  return (
    <div className="flex items-start gap-2 text-sm opacity-0 animate-fade-in-up">
      <div className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${colorStyles[color]}`} style={{ backgroundColor: "currentColor" }} />
      <span className="text-muted-foreground">{text}</span>
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

  return (
    <div
      className="glass-card rounded-xl p-6 card-hover opacity-0 animate-fade-in-up"
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
          <span className="font-medium text-card-foreground">{count.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Revenue</span>
          <span className="font-medium text-card-foreground">{formatRevenue(revenue)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Avg. LTV</span>
          <span className="font-medium text-primary">{formatRevenue(ltv)}</span>
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
