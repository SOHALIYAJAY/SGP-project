import { DashboardLayout } from "@/components/layout/DashboardLayout";
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
  Sparkles,
  ArrowUpRight,
  Activity,
  BarChart3,
  LineChart,
  Zap,
} from "lucide-react";

const predictions = [
  {
    title: "Business Growth Prediction",
    value: "High Growth",
    score: 78,
    variant: "success" as const,
    description: "Based on revenue trajectory and market conditions",
    icon: TrendingUp,
    gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
    accentColor: "emerald",
  },
  {
    title: "Profitability Status",
    value: "Profitable",
    score: 85,
    variant: "success" as const,
    description: "Healthy profit margins with room for improvement",
    icon: DollarSign,
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    accentColor: "cyan",
  },
  {
    title: "Failure Probability",
    value: "12%",
    score: 12,
    variant: "success" as const,
    description: "Low risk of business failure within 24 months",
    icon: AlertTriangle,
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    accentColor: "amber",
    invertScore: true,
  },
  {
    title: "Revenue Trend",
    value: "Increasing",
    score: 72,
    variant: "success" as const,
    description: "Consistent upward trend in quarterly revenue",
    icon: LineChart,
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    accentColor: "violet",
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
  { label: "3-Month Outlook", trend: "up", value: "+15%", description: "Strong positive momentum", delay: "0" },
  { label: "6-Month Outlook", trend: "up", value: "+28%", description: "Continued growth expected", delay: "100" },
  { label: "12-Month Outlook", trend: "stable", value: "+42%", description: "Sustainable trajectory", delay: "200" },
  { label: "24-Month Outlook", trend: "up", value: "+85%", description: "High potential scenario", delay: "300" },
];

export default function PredictionsPage() {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUpRight className="w-5 h-5 text-emerald-400" />;
      case "down":
        return <TrendingDown className="w-5 h-5 text-rose-400" />;
      default:
        return <Minus className="w-5 h-5 text-amber-400" />;
    }
  };

  const getAccentClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string; glow: string }> = {
      emerald: {
        bg: "bg-emerald-500/10",
        text: "text-emerald-400",
        border: "border-emerald-500/30",
        glow: "shadow-emerald-500/20",
      },
      cyan: {
        bg: "bg-cyan-500/10",
        text: "text-cyan-400",
        border: "border-cyan-500/30",
        glow: "shadow-cyan-500/20",
      },
      amber: {
        bg: "bg-amber-500/10",
        text: "text-amber-400",
        border: "border-amber-500/30",
        glow: "shadow-amber-500/20",
      },
      violet: {
        bg: "bg-violet-500/10",
        text: "text-violet-400",
        border: "border-violet-500/30",
        glow: "shadow-violet-500/20",
      },
    };
    return colors[color] || colors.cyan;
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent rounded-3xl" />
          <div className="relative flex items-center gap-4 p-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/20 flex items-center justify-center">
                <Target className="w-7 h-7 text-primary" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Prediction Results</h1>
              <p className="text-muted-foreground flex items-center gap-2 mt-1">
                <Sparkles className="w-4 h-4 text-primary" />
                AI-powered business forecasting and trend analysis
              </p>
            </div>
          </div>
        </div>

        {/* Main Prediction Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {predictions.map((prediction, index) => {
            const accent = getAccentClasses(prediction.accentColor);
            return (
              <div
                key={index}
                className="prediction-card group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${prediction.gradient} opacity-60`} />
                
                {/* Top accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${
                  prediction.accentColor === 'emerald' ? 'from-emerald-500 via-green-400 to-emerald-500' :
                  prediction.accentColor === 'cyan' ? 'from-cyan-500 via-blue-400 to-cyan-500' :
                  prediction.accentColor === 'amber' ? 'from-amber-500 via-yellow-400 to-amber-500' :
                  'from-violet-500 via-purple-400 to-violet-500'
                }`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl ${accent.bg} border ${accent.border} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${accent.glow}`}>
                      <prediction.icon className={`w-6 h-6 ${accent.text}`} />
                    </div>
                    <StatusBadge
                      label={prediction.score >= 70 ? "High" : prediction.score >= 40 ? "Medium" : "Low"}
                      variant={prediction.invertScore 
                        ? (prediction.score <= 30 ? "success" : prediction.score <= 60 ? "warning" : "danger")
                        : (prediction.score >= 70 ? "success" : prediction.score >= 40 ? "warning" : "danger")
                      }
                      size="sm"
                    />
                  </div>
                  
                  <p className="text-sm text-muted-foreground/80 mb-1.5 font-medium">{prediction.title}</p>
                  <h3 className="text-3xl font-bold tracking-tight mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    {prediction.value}
                  </h3>
                  <p className="text-xs text-muted-foreground/70 leading-relaxed">{prediction.description}</p>
                  
                  {/* Progress indicator */}
                  <div className="mt-5">
                    <div className="h-1.5 bg-secondary/50 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${
                          prediction.accentColor === 'emerald' ? 'bg-gradient-to-r from-emerald-600 to-emerald-400' :
                          prediction.accentColor === 'cyan' ? 'bg-gradient-to-r from-cyan-600 to-cyan-400' :
                          prediction.accentColor === 'amber' ? 'bg-gradient-to-r from-amber-600 to-amber-400' :
                          'bg-gradient-to-r from-violet-600 to-violet-400'
                        }`}
                        style={{ width: `${prediction.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Growth Trajectory Outlook */}
        <div className="premium-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Growth Trajectory Outlook</h2>
              <p className="text-sm text-muted-foreground">Projected performance over different time horizons</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {trendIndicators.map((indicator, index) => (
              <div
                key={index}
                className="outlook-card group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-foreground/90">{indicator.label}</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                    {getTrendIcon(indicator.trend)}
                  </div>
                </div>
                <p className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent mb-2">
                  {indicator.value}
                </p>
                <p className="text-xs text-muted-foreground/70">{indicator.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Metrics & Confidence */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Metrics */}
          <div className="premium-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-cyan-500/10 border border-primary/20 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Performance Metrics</h2>
                <p className="text-sm text-muted-foreground">Detailed scoring across key areas</p>
              </div>
            </div>
            
            <div className="space-y-5">
              {detailedMetrics.map((metric, index) => (
                <div key={index} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                      {metric.label}
                    </span>
                    <span className={`text-sm font-bold ${
                      metric.variant === 'success' ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      {metric.value}%
                    </span>
                  </div>
                  <div className="h-2 bg-secondary/40 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ease-out ${
                        metric.variant === 'success' 
                          ? 'bg-gradient-to-r from-emerald-600 to-emerald-400' 
                          : 'bg-gradient-to-r from-amber-600 to-amber-400'
                      }`}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Confidence Analysis */}
          <div className="premium-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/10 border border-violet-500/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Confidence Analysis</h2>
                <p className="text-sm text-muted-foreground">Prediction reliability metrics</p>
              </div>
            </div>
            
            <div className="space-y-5">
              {/* Model Confidence */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">Model Confidence</span>
                  <StatusBadge label="High" variant="success" size="sm" />
                </div>
                <div className="h-3 bg-secondary/40 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-cyan-400"
                    style={{ width: '87%' }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">Based on data quality and historical accuracy</p>
                  <span className="text-sm font-bold text-primary">87%</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="stats-grid-item">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                    94%
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">Data Completeness</p>
                </div>
                <div className="stats-grid-item">
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-cyan-300 bg-clip-text text-transparent">
                    89%
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">Historical Accuracy</p>
                </div>
              </div>

              {/* Note */}
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amber-200/90">Important Note</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      Predictions are based on current market conditions and provided data. External factors may impact actual outcomes.
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
