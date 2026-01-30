import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KpiCard } from "@/components/ui/kpi-card";
import { ChartCard } from "@/components/ui/chart-card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatusBadge } from "@/components/ui/status-badge";
import { SectionHeader } from "@/components/ui/section-header";
import {
  Shield,
  AlertTriangle,
  FileCheck,
  Link2,
  Leaf,
  TrendingDown,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

const riskRadarData = [
  { category: "Financial", score: 25, fullMark: 100 },
  { category: "Operational", score: 35, fullMark: 100 },
  { category: "Market", score: 45, fullMark: 100 },
  { category: "Regulatory", score: 20, fullMark: 100 },
  { category: "Technology", score: 30, fullMark: 100 },
  { category: "Strategic", score: 40, fullMark: 100 },
];

const riskCategories = [
  {
    title: "Financial Risk",
    icon: AlertTriangle,
    level: "Low",
    score: 25,
    variant: "success" as const,
    details: [
      { factor: "Cash Flow Volatility", score: 20 },
      { factor: "Debt Exposure", score: 15 },
      { factor: "Revenue Concentration", score: 40 },
    ],
  },
  {
    title: "Regulatory Risk",
    icon: FileCheck,
    level: "Low",
    score: 20,
    variant: "success" as const,
    details: [
      { factor: "Compliance Status", score: 15 },
      { factor: "Regulatory Changes", score: 25 },
      { factor: "License Requirements", score: 20 },
    ],
  },
  {
    title: "Dependency Risk",
    icon: Link2,
    level: "Medium",
    score: 45,
    variant: "warning" as const,
    details: [
      { factor: "Vendor Dependency", score: 55 },
      { factor: "Key Personnel", score: 40 },
      { factor: "Technology Stack", score: 40 },
    ],
  },
];

const sustainabilityMetrics = [
  { label: "Business Continuity", value: 82, description: "Disaster recovery readiness" },
  { label: "Operational Resilience", value: 75, description: "Ability to adapt to changes" },
  { label: "Resource Efficiency", value: 68, description: "Optimal resource utilization" },
  { label: "Long-term Viability", value: 85, description: "Sustainable growth trajectory" },
];

export default function RiskAssessmentPage() {
  const getVariant = (score: number) => {
    if (score <= 30) return "success";
    if (score <= 60) return "warning";
    return "danger";
  };

  const getLabel = (score: number) => {
    if (score <= 30) return "Low";
    if (score <= 60) return "Medium";
    return "High";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <SectionHeader
          title="Risk & Sustainability Assessment"
          subtitle="Comprehensive risk analysis and long-term sustainability evaluation"
          icon={Shield}
        />

        {/* Summary KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Overall Risk Score"
            value="32/100"
            subtitle="Low risk profile"
            icon={Shield}
            variant="success"
          />
          <KpiCard
            title="Financial Risk"
            value="Low"
            subtitle="Healthy financials"
            icon={AlertTriangle}
            variant="success"
          />
          <KpiCard
            title="Regulatory Compliance"
            value="95%"
            subtitle="Well compliant"
            icon={FileCheck}
            variant="success"
          />
          <KpiCard
            title="Sustainability Score"
            value="78/100"
            subtitle="Strong outlook"
            icon={Leaf}
            variant="success"
          />
        </div>

        {/* Risk Radar & Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Risk Distribution"
            subtitle="Score by category (lower is better)"
            icon={AlertCircle}
          >
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={riskRadarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis
                    dataKey="category"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                  />
                  <Radar
                    name="Risk Score"
                    dataKey="score"
                    stroke="hsl(var(--warning))"
                    fill="hsl(var(--warning))"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Lower scores indicate lower risk levels
            </p>
          </ChartCard>

          <div className="glass-card p-6">
            <SectionHeader
              title="Risk Summary"
              subtitle="Key risk indicators at a glance"
              icon={AlertTriangle}
            />
            <div className="space-y-4">
              {riskCategories.map((category, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-secondary/50 border border-border"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-${category.variant}/20 flex items-center justify-center`}>
                        <category.icon className={`w-5 h-5 text-${category.variant}`} />
                      </div>
                      <div>
                        <h4 className="font-medium">{category.title}</h4>
                        <p className="text-xs text-muted-foreground">Score: {category.score}/100</p>
                      </div>
                    </div>
                    <StatusBadge
                      label={category.level}
                      variant={category.variant}
                      size="sm"
                    />
                  </div>
                  <ProgressBar
                    value={category.score}
                    variant={category.variant}
                    size="sm"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Risk Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {riskCategories.map((category, index) => (
            <div key={index} className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  category.variant === "success" ? "bg-success/20" : "bg-warning/20"
                }`}>
                  <category.icon className={`w-5 h-5 ${
                    category.variant === "success" ? "text-success" : "text-warning"
                  }`} />
                </div>
                <div>
                  <h3 className="font-semibold">{category.title}</h3>
                  <p className="text-xs text-muted-foreground">Detailed breakdown</p>
                </div>
              </div>
              <div className="space-y-4">
                {category.details.map((detail, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">{detail.factor}</span>
                      <span className="text-sm font-medium">{detail.score}%</span>
                    </div>
                    <ProgressBar
                      value={detail.score}
                      variant={getVariant(detail.score) as "success" | "warning" | "danger"}
                      size="sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sustainability Metrics */}
        <div className="glass-card p-6">
          <SectionHeader
            title="Long-term Sustainability"
            subtitle="Indicators of business longevity and resilience"
            icon={Leaf}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sustainabilityMetrics.map((metric, index) => (
              <div key={index} className="p-4 rounded-lg bg-secondary/50 border border-border text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      fill="none"
                      stroke="hsl(var(--secondary))"
                      strokeWidth="8"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      fill="none"
                      stroke={`hsl(var(--${metric.value >= 75 ? "success" : metric.value >= 50 ? "warning" : "destructive"}))`}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${metric.value * 2.51} 251`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold">{metric.value}%</span>
                  </div>
                </div>
                <h4 className="font-medium mb-1">{metric.label}</h4>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
