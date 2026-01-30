import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KpiCard } from "@/components/ui/kpi-card";
import { ChartCard } from "@/components/ui/chart-card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SectionHeader } from "@/components/ui/section-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { Users, Heart, RefreshCw, UserMinus, Star, TrendingUp } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const satisfactionTrend = [
  { month: "Jan", score: 72 },
  { month: "Feb", score: 74 },
  { month: "Mar", score: 75 },
  { month: "Apr", score: 73 },
  { month: "May", score: 78 },
  { month: "Jun", score: 82 },
];

const retentionData = [
  { month: "Jan", retained: 92, churned: 8 },
  { month: "Feb", retained: 90, churned: 10 },
  { month: "Mar", retained: 88, churned: 12 },
  { month: "Apr", retained: 91, churned: 9 },
  { month: "May", retained: 93, churned: 7 },
  { month: "Jun", retained: 95, churned: 5 },
];

const segmentData = [
  { name: "Enterprise", value: 35, color: "hsl(187, 80%, 48%)" },
  { name: "SMB", value: 45, color: "hsl(142, 76%, 46%)" },
  { name: "Startup", value: 20, color: "hsl(38, 92%, 50%)" },
];

const loyaltyMetrics = [
  { label: "NPS Score", value: 72, max: 100, variant: "success" as const },
  { label: "Customer Lifetime Value", value: 85, max: 100, variant: "success" as const },
  { label: "Engagement Rate", value: 68, max: 100, variant: "warning" as const },
  { label: "Support Satisfaction", value: 91, max: 100, variant: "success" as const },
];

export default function CustomerAnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <SectionHeader
          title="Customer & Brand Analytics"
          subtitle="Comprehensive insights into customer behavior and satisfaction"
          icon={Users}
        />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Customer Satisfaction"
            value="82%"
            subtitle="Above industry average"
            icon={Heart}
            variant="success"
            trend={{ value: 8, label: "vs last quarter" }}
          />
          <KpiCard
            title="Retention Rate"
            value="95%"
            subtitle="Monthly retention"
            icon={RefreshCw}
            variant="success"
            trend={{ value: 3, label: "improvement" }}
          />
          <KpiCard
            title="Churn Rate"
            value="5%"
            subtitle="Monthly churn"
            icon={UserMinus}
            variant="warning"
            trend={{ value: -2, label: "reduction" }}
          />
          <KpiCard
            title="Customer Base"
            value="12,450"
            subtitle="Active customers"
            icon={Users}
            trend={{ value: 15, label: "growth YoY" }}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Customer Satisfaction Trend"
            subtitle="Monthly CSAT score progression"
            icon={Heart}
          >
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={satisfactionTrend}>
                  <defs>
                    <linearGradient id="satGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--success))" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <YAxis
                    domain={[60, 100]}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value}%`, "Score"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="hsl(var(--success))"
                    strokeWidth={2}
                    fill="url(#satGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard
            title="Retention vs Churn"
            subtitle="Monthly customer retention breakdown"
            icon={RefreshCw}
          >
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={retentionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <YAxis
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value}%`, ""]}
                  />
                  <Bar dataKey="retained" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} name="Retained" stackId="a" />
                  <Bar dataKey="churned" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} name="Churned" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-sm text-muted-foreground">Retained</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <span className="text-sm text-muted-foreground">Churned</span>
              </div>
            </div>
          </ChartCard>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartCard
            title="Customer Segments"
            subtitle="Distribution by company size"
            icon={Users}
          >
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={segmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {segmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value}%`, ""]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-4 mt-2">
              {segmentData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </ChartCard>

          <div className="lg:col-span-2 glass-card p-6">
            <SectionHeader
              title="Loyalty & Stability Metrics"
              subtitle="Key indicators of customer loyalty"
              icon={Star}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loyaltyMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <ProgressBar
                    value={metric.value}
                    max={metric.max}
                    variant={metric.variant}
                    size="md"
                    label={metric.label}
                    showLabel
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-lg bg-success/10 border border-success/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="font-medium text-success">Positive Trend</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Customer loyalty metrics are showing consistent improvement, with NPS increasing
                by 12 points over the last two quarters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
