import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KpiCard } from "@/components/ui/kpi-card";
import { ChartCard } from "@/components/ui/chart-card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatusBadge } from "@/components/ui/status-badge";
import { SectionHeader } from "@/components/ui/section-header";
import {
  Globe,
  Target,
  TrendingUp,
  Users,
  BarChart3,
  Zap,
  Scale,
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const competitorData = [
  { subject: "Market Share", you: 75, industry: 60 },
  { subject: "Brand Recognition", you: 68, industry: 72 },
  { subject: "Product Quality", you: 85, industry: 70 },
  { subject: "Pricing", you: 70, industry: 75 },
  { subject: "Innovation", you: 82, industry: 65 },
  { subject: "Customer Service", you: 78, industry: 68 },
];

const industryGrowthData = [
  { year: "2020", growth: 5.2 },
  { year: "2021", growth: 8.4 },
  { year: "2022", growth: 12.1 },
  { year: "2023", growth: 15.8 },
  { year: "2024", growth: 18.5 },
  { year: "2025 (P)", growth: 22.0 },
];

const marketMetrics = [
  { label: "Market Size", value: "$4.2B", change: "+12%", variant: "success" as const },
  { label: "Your Share", value: "8.5%", change: "+2.1%", variant: "success" as const },
  { label: "Competition Level", value: "High", change: "Stable", variant: "warning" as const },
  { label: "Entry Barriers", value: "Medium", change: "Increasing", variant: "info" as const },
];

const businessModelImpact = [
  { factor: "SaaS Revenue Model", score: 92, description: "Recurring revenue provides stability" },
  { factor: "Scalability", score: 85, description: "Cloud infrastructure enables growth" },
  { factor: "Customer Acquisition", score: 72, description: "CAC payback within 12 months" },
  { factor: "Competitive Moat", score: 68, description: "Technology differentiation" },
];

export default function MarketAnalysisPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <SectionHeader
          title="Market & Competition Analysis"
          subtitle="Strategic market positioning and competitive landscape insights"
          icon={Globe}
        />

        {/* Market Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {marketMetrics.map((metric, index) => (
            <div key={index} className="glass-card-hover p-5">
              <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold">{metric.value}</p>
                <StatusBadge label={metric.change} variant={metric.variant} size="sm" />
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Competitive Positioning"
            subtitle="Your performance vs industry average"
            icon={Target}
          >
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={competitorData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                  />
                  <Radar
                    name="Your Company"
                    dataKey="you"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Industry Average"
                    dataKey="industry"
                    stroke="hsl(var(--muted-foreground))"
                    fill="hsl(var(--muted-foreground))"
                    fillOpacity={0.1}
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">Your Company</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                <span className="text-sm text-muted-foreground">Industry Average</span>
              </div>
            </div>
          </ChartCard>

          <ChartCard
            title="Industry Growth Rate"
            subtitle="Year-over-year market growth (%)"
            icon={TrendingUp}
          >
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={industryGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="year"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <YAxis
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
                    formatter={(value: number) => [`${value}%`, "Growth"]}
                  />
                  <Bar dataKey="growth" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Market Opportunity & Business Model */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <SectionHeader
              title="Market Opportunity Score"
              subtitle="Overall assessment of market potential"
              icon={Zap}
            />
            <div className="flex flex-col items-center justify-center py-8">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="hsl(var(--secondary))"
                    strokeWidth="12"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="url(#opportunityGradient)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${78 * 4.4} 440`}
                  />
                  <defs>
                    <linearGradient id="opportunityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--success))" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-4xl font-bold">78</span>
                  <span className="text-sm text-muted-foreground">/100</span>
                </div>
              </div>
              <StatusBadge label="High Opportunity" variant="success" size="lg" className="mt-4" />
              <p className="text-sm text-muted-foreground text-center mt-4 max-w-xs">
                Strong market opportunity with growing demand and manageable competition levels.
              </p>
            </div>
          </div>

          <div className="glass-card p-6">
            <SectionHeader
              title="Business Model Impact"
              subtitle="How your model affects market success"
              icon={Scale}
            />
            <div className="space-y-5">
              {businessModelImpact.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{item.factor}</span>
                    <span className="text-sm font-bold text-primary">{item.score}%</span>
                  </div>
                  <ProgressBar
                    value={item.score}
                    variant={item.score >= 80 ? "success" : item.score >= 60 ? "warning" : "danger"}
                    size="sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
