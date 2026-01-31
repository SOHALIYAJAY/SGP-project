import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KpiCard } from "@/components/ui/kpi-card";
import { ChartCard } from "@/components/ui/chart-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { SectionHeader } from "@/components/ui/section-header";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Building2,
  DollarSign,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 420000, cost: 280000 },
  { month: "Feb", revenue: 480000, cost: 290000 },
  { month: "Mar", revenue: 520000, cost: 310000 },
  { month: "Apr", revenue: 490000, cost: 285000 },
  { month: "May", revenue: 580000, cost: 320000 },
  { month: "Jun", revenue: 620000, cost: 340000 },
];

const growthTrendData = [
  { month: "Jan", value: 100 },
  { month: "Feb", value: 108 },
  { month: "Mar", value: 115 },
  { month: "Apr", value: 112 },
  { month: "May", value: 128 },
  { month: "Jun", value: 142 },
  { month: "Jul", value: 155 },
];

const customerStabilityData = [
  { name: "Active", value: 68, color: "hsl(142, 76%, 46%)" },
  { name: "At Risk", value: 22, color: "hsl(38, 92%, 50%)" },
  { name: "Churned", value: 10, color: "hsl(0, 72%, 51%)" },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header with company context */}
        <div className="glass-card p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold">TechVenture Inc.</h2>
              <p className="text-sm text-muted-foreground">Technology • Growth Stage • Series B</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge label="Analysis Complete" variant="success" dot />
            <span className="text-xs text-muted-foreground">Last updated: 2 hours ago</span>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Business Health Score"
            value="78/100"
            subtitle="Good standing"
            icon={Activity}
            variant="success"
            trend={{ value: 5.2, label: "vs last quarter" }}
          />
          <KpiCard
            title="Risk Level"
            value="Medium"
            subtitle="3 areas need attention"
            icon={AlertTriangle}
            variant="warning"
          />
          <KpiCard
            title="Investment Readiness"
            value="82%"
            subtitle="Series C potential"
            icon={Zap}
            variant="info"
            trend={{ value: 12, label: "improvement" }}
          />
          <KpiCard
            title="Company Stage"
            value="Growth"
            subtitle="Scaling operations"
            icon={TrendingUp}
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Revenue vs Operational Cost"
            subtitle="Monthly comparison (USD)"
            icon={BarChart3}
          >
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData} barGap={8}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <YAxis
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                  />
                  <Bar dataKey="revenue" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} name="Revenue" />
                  <Bar dataKey="cost" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} name="Cost" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-chart-1" />
                <span className="text-sm text-muted-foreground">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-chart-3" />
                <span className="text-sm text-muted-foreground">Operational Cost</span>
              </div>
            </div>
          </ChartCard>

          <ChartCard
            title="Growth Trend"
            subtitle="Indexed performance over time"
            icon={TrendingUp}
          >
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthTrendData}>
                  <defs>
                    <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--chart-2))" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
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
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    fill="url(#growthGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartCard
            title="Customer Stability"
            subtitle="Distribution by status"
            icon={Users}
          >
            <div className="h-[240px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerStabilityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {customerStabilityData.map((entry, index) => (
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
              {customerStabilityData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {item.name} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </ChartCard>

          <div className="lg:col-span-2 glass-card p-6">
            <SectionHeader
              title="Quick Insights"
              subtitle="Key findings from the analysis"
              icon={Zap}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-sm font-medium text-success">Strength</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Strong revenue growth trajectory with 42% YoY increase and improving profit margins.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-sm font-medium text-success">Strength</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  High customer satisfaction score (78%) indicates strong product-market fit.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-warning" />
                  <span className="text-sm font-medium text-warning">Attention</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Customer churn rate slightly elevated at 10% - retention strategies recommended.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-destructive" />
                  <span className="text-sm font-medium text-destructive">Risk</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  High dependency on single revenue stream - diversification recommended.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
