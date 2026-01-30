import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KpiCard } from "@/components/ui/kpi-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SectionHeader } from "@/components/ui/section-header";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Target,
  Gauge,
} from "lucide-react";

const predictions = [
  {
    title: "Business Growth Prediction",
    value: "High Growth",
    score: 78,
    variant: "success" as const,
    description: "Based on revenue trajectory and market conditions",
    icon: TrendingUp,
  },
  {
    title: "Profitability Status",
    value: "Profitable",
    score: 85,
    variant: "success" as const,
    description: "Healthy profit margins with room for improvement",
    icon: DollarSign,
  },
  {
    title: "Failure Probability",
    value: "12%",
    score: 12,
    variant: "success" as const,
    description: "Low risk of business failure within 24 months",
    icon: AlertTriangle,
  },
  {
    title: "Revenue Trend",
    value: "Increasing",
    score: 72,
    variant: "success" as const,
    description: "Consistent upward trend in quarterly revenue",
    icon: TrendingUp,
  },
];

const detailedMetrics = [
  { label: "Market Expansion Potential", value: 82, variant: "success" as const },
  { label: "Operational Efficiency", value: 68, variant: "warning" as const },
  { label: "Customer Acquisition Rate", value: 75, variant: "success" as const },
  { label: "Product Innovation Index", value: 71, variant: "success" as const },
  { label: "Team Scalability", value: 65, variant: "warning" as const },
  { label: "Technology Maturity", value: 88, variant: "success" as const },
];

const trendIndicators = [
  { label: "3-Month Outlook", trend: "up", value: "+15%", description: "Strong positive momentum" },
  { label: "6-Month Outlook", trend: "up", value: "+28%", description: "Continued growth expected" },
  { label: "12-Month Outlook", trend: "stable", value: "+42%", description: "Sustainable trajectory" },
  { label: "24-Month Outlook", trend: "up", value: "+85%", description: "High potential scenario" },
];

export default function PredictionsPage() {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-5 h-5 text-success" />;
      case "down":
        return <TrendingDown className="w-5 h-5 text-destructive" />;
      default:
        return <Minus className="w-5 h-5 text-warning" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <SectionHeader
          title="Prediction Results"
          subtitle="AI-powered business forecasting and trend analysis"
          icon={Target}
        />

        {/* Main Prediction Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {predictions.map((prediction, index) => (
            <div key={index} className="glass-card-hover p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-success" />
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                  <prediction.icon className="w-5 h-5 text-success" />
                </div>
                <StatusBadge
                  label={prediction.score >= 70 ? "High" : prediction.score >= 40 ? "Medium" : "Low"}
                  variant={prediction.score >= 70 ? "success" : prediction.score >= 40 ? "warning" : "danger"}
                  size="sm"
                />
              </div>
              <h3 className="text-sm text-muted-foreground mb-1">{prediction.title}</h3>
              <p className="text-2xl font-bold mb-2">{prediction.value}</p>
              <p className="text-xs text-muted-foreground">{prediction.description}</p>
              <ProgressBar
                value={prediction.score}
                variant={prediction.variant}
                size="sm"
                className="mt-4"
              />
            </div>
          ))}
        </div>

        {/* Trend Outlook */}
        <div className="glass-card p-6">
          <SectionHeader
            title="Growth Trajectory Outlook"
            subtitle="Projected performance over different time horizons"
            icon={Gauge}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trendIndicators.map((indicator, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-secondary/50 border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">{indicator.label}</span>
                  {getTrendIcon(indicator.trend)}
                </div>
                <p className="text-3xl font-bold text-gradient-success mb-1">{indicator.value}</p>
                <p className="text-xs text-muted-foreground">{indicator.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <SectionHeader
              title="Performance Metrics"
              subtitle="Detailed scoring across key areas"
              icon={CheckCircle}
            />
            <div className="space-y-5">
              {detailedMetrics.map((metric, index) => (
                <div key={index}>
                  <ProgressBar
                    value={metric.value}
                    variant={metric.variant}
                    size="md"
                    label={metric.label}
                    showLabel
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <SectionHeader
              title="Confidence Analysis"
              subtitle="Prediction reliability metrics"
              icon={Target}
            />
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Model Confidence</span>
                  <StatusBadge label="High" variant="success" size="sm" />
                </div>
                <ProgressBar value={87} variant="default" size="lg" showLabel className="mt-3" />
                <p className="text-xs text-muted-foreground mt-2">
                  Based on data quality and historical accuracy
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50 border border-border text-center">
                  <p className="text-2xl font-bold text-success">94%</p>
                  <p className="text-xs text-muted-foreground mt-1">Data Completeness</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50 border border-border text-center">
                  <p className="text-2xl font-bold text-primary">89%</p>
                  <p className="text-xs text-muted-foreground mt-1">Historical Accuracy</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Note</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Predictions are based on current market conditions and provided data.
                      External factors may impact actual outcomes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
