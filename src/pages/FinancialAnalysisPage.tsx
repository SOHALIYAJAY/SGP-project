import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KpiCard } from "@/components/ui/kpi-card";
import { ChartCard } from "@/components/ui/chart-card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatusBadge } from "@/components/ui/status-badge";
import { SectionHeader } from "@/components/ui/section-header";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Wallet,
  PiggyBank,
  AlertCircle,
  CheckCircle,
  BarChart3,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  ComposedChart,
  Bar,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 420, target: 400 },
  { month: "Feb", revenue: 480, target: 440 },
  { month: "Mar", revenue: 520, target: 480 },
  { month: "Apr", revenue: 490, target: 520 },
  { month: "May", revenue: 580, target: 560 },
  { month: "Jun", revenue: 620, target: 600 },
];

const profitData = [
  { month: "Jan", profit: 85, margin: 20.2 },
  { month: "Feb", profit: 105, margin: 21.9 },
  { month: "Mar", profit: 125, margin: 24.0 },
  { month: "Apr", profit: 98, margin: 20.0 },
  { month: "May", profit: 145, margin: 25.0 },
  { month: "Jun", profit: 168, margin: 27.1 },
];

const financialKpis = [
  {
    title: "Revenue",
    value: "$3.2M",
    subtitle: "Annual run rate",
    icon: DollarSign,
    variant: "success" as const,
    trend: { value: 18, label: "YoY growth" },
  },
  {
    title: "Profit Margin",
    value: "27.1%",
    subtitle: "Net margin",
    icon: TrendingUp,
    variant: "success" as const,
    trend: { value: 5.2, label: "improvement" },
  },
  {
    title: "Burn Rate",
    value: "$125K",
    subtitle: "Monthly",
    icon: Wallet,
    variant: "warning" as const,
    trend: { value: -8, label: "reduced" },
  },
  {
    title: "Runway",
    value: "18 mo",
    subtitle: "Based on current burn",
    icon: PiggyBank,
    variant: "success" as const,
  },
];

const riskFlags = [
  { label: "Cash Flow Risk", level: "low", description: "Positive operating cash flow" },
  { label: "Revenue Concentration", level: "medium", description: "Top 3 clients = 45% revenue" },
  { label: "Cost Structure", level: "low", description: "Fixed costs well managed" },
  { label: "Debt Level", level: "low", description: "Minimal debt obligations" },
];

const efficiencyMetrics = [
  { label: "Gross Margin", value: 72, target: 70 },
  { label: "Operating Margin", value: 27, target: 25 },
  { label: "Revenue per Employee", value: 85, target: 80 },
  { label: "Cost Efficiency", value: 78, target: 75 },
];

export default function FinancialAnalysisPage() {
  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return "success";
      case "medium":
        return "warning";
      case "high":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <SectionHeader
          title="Financial Analysis"
          subtitle="Revenue performance, profitability, and financial health metrics"
          icon={DollarSign}
        />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {financialKpis.map((kpi, index) => (
            <KpiCard
              key={index}
              title={kpi.title}
              value={kpi.value}
              subtitle={kpi.subtitle}
              icon={kpi.icon}
              variant={kpi.variant}
              trend={kpi.trend}
            />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Revenue Performance"
            subtitle="Actual vs Target (in thousands USD)"
            icon={BarChart3}
          >
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <YAxis
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    tickFormatter={(value) => `$${value}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`$${value}k`, ""]}
                  />
                  <Bar dataKey="revenue" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} name="Actual" />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="hsl(var(--chart-3))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--chart-3))" }}
                    name="Target"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-chart-1" />
                <span className="text-sm text-muted-foreground">Actual Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-chart-3" />
                <span className="text-sm text-muted-foreground">Target</span>
              </div>
            </div>
          </ChartCard>

          <ChartCard
            title="Profit Margin Trend"
            subtitle="Monthly profit and margin percentage"
            icon={TrendingUp}
          >
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={profitData}>
                  <defs>
                    <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
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
                    yAxisId="left"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    tickFormatter={(value) => `$${value}k`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="profit"
                    stroke="hsl(var(--success))"
                    strokeWidth={2}
                    fill="url(#profitGradient)"
                    name="Profit ($k)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="margin"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))" }}
                    name="Margin (%)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Efficiency & Risk */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <SectionHeader
              title="Operational Efficiency"
              subtitle="Performance vs targets"
              icon={CheckCircle}
            />
            <div className="space-y-5">
              {efficiencyMetrics.map((metric, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{metric.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{metric.value}%</span>
                      {metric.value >= metric.target ? (
                        <CheckCircle className="w-4 h-4 text-success" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-warning" />
                      )}
                    </div>
                  </div>
                  <ProgressBar
                    value={metric.value}
                    variant={metric.value >= metric.target ? "success" : "warning"}
                    size="sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Target: {metric.target}%</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <SectionHeader
              title="Financial Risk Flags"
              subtitle="Key risk indicators"
              icon={AlertCircle}
            />
            <div className="space-y-4">
              {riskFlags.map((risk, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-secondary/50 border border-border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{risk.label}</span>
                    <StatusBadge
                      label={risk.level.toUpperCase()}
                      variant={getRiskColor(risk.level) as "success" | "warning" | "danger" | "default"}
                      size="sm"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">{risk.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
