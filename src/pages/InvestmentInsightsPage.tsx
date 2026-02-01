import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KpiCard } from "@/components/ui/kpi-card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatusBadge } from "@/components/ui/status-badge";
import { SectionHeader } from "@/components/ui/section-header";
import {
  Building2,
  Rocket,
  TrendingUp,
  DollarSign,
  Users,
  Target,
  CheckCircle,
  BarChart3,
} from "lucide-react";

const stageInfo = {
  current: "Growth",
  description: "The company is in a growth phase, characterized by rapid revenue expansion, scaling operations, and market penetration efforts.",
  characteristics: [
    "Revenue growth exceeding 50% year-over-year",
    "Scaling team and operations",
    "Expanding market presence",
    "Product-market fit achieved",
    "Focus on customer acquisition",
  ],
};

const investmentMetrics = [
  { label: "Investment Readiness Score", value: 82, target: 80 },
  { label: "Scalability Assessment", value: 78, target: 75 },
  { label: "Team Capability", value: 85, target: 80 },
  { label: "Market Opportunity", value: 88, target: 85 },
  { label: "Financial Health", value: 75, target: 70 },
  { label: "Competitive Moat", value: 72, target: 70 },
];

const investorHighlights = [
  { label: "ARR Growth", value: "156%", description: "Year-over-year recurring revenue growth" },
  { label: "Gross Margin", value: "72%", description: "Healthy software margins" },
  { label: "Net Revenue Retention", value: "118%", description: "Strong expansion revenue" },
  { label: "LTV:CAC Ratio", value: "4.2x", description: "Efficient customer acquisition" },
  { label: "Payback Period", value: "8 mo", description: "Quick CAC recovery" },
  { label: "Rule of 40", value: "62%", description: "Exceeds benchmark" },
];

const fundingRecommendation = {
  stage: "Series B",
  amount: "$15-25M",
  timing: "6-12 months",
  rationale: "Strong growth metrics and market opportunity support Series B fundraise. Recommended to secure runway for market expansion and team scaling.",
};

export default function InvestmentInsightsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <SectionHeader
          title="Company Stage & Investment Insights"
          subtitle="Classification, readiness assessment, and investor-focused metrics"
          icon={Building2}
        />

        {/* Stage Classification */}
        <div className="glass-card p-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-2xl bg-gradient-primary flex items-center justify-center">
                <Rocket className="w-16 h-16 text-primary-foreground" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-2xl font-bold">Company Stage:</h2>
                <StatusBadge label={stageInfo.current} variant="success" size="lg" />
              </div>
              <p className="text-muted-foreground mb-4">{stageInfo.description}</p>
              <div className="flex flex-wrap gap-2">
                {stageInfo.characteristics.map((char, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-medium">{char}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Investment Readiness */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <SectionHeader
              title="Investment Readiness Score"
              subtitle="Overall assessment of fundraising potential"
              icon={Target}
            />
            <div className="flex flex-col items-center py-6">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="84"
                    fill="none"
                    stroke="hsl(var(--secondary))"
                    strokeWidth="16"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="84"
                    fill="none"
                    stroke="url(#investmentGradient)"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeDasharray={`${82 * 5.28} 528`}
                  />
                  <defs>
                    <linearGradient id="investmentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--success))" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-5xl font-bold">82</span>
                  <span className="text-sm text-muted-foreground">/100</span>
                </div>
              </div>
              <StatusBadge label="Investment Ready" variant="success" size="lg" className="mt-4" />
            </div>
          </div>

          <div className="glass-card p-6">
            <SectionHeader
              title="Readiness Breakdown"
              subtitle="Score by evaluation criteria"
              icon={BarChart3}
            />
            <div className="space-y-4">
              {investmentMetrics.map((metric, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{metric.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{metric.value}%</span>
                      {metric.value >= metric.target && (
                        <CheckCircle className="w-4 h-4 text-success" />
                      )}
                    </div>
                  </div>
                  <ProgressBar
                    value={metric.value}
                    variant={metric.value >= metric.target ? "success" : "warning"}
                    size="sm"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Investor Highlights */}
        <div className="glass-card p-6">
          <SectionHeader
            title="Investor Highlights"
            subtitle="Key metrics for potential investors"
            icon={DollarSign}
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {investorHighlights.map((metric, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-secondary/50 border border-border text-center hover:border-primary/30 transition-colors"
              >
                <p className="text-2xl font-bold text-gradient-primary">{metric.value}</p>
                <p className="text-sm font-medium mt-1">{metric.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Funding Recommendation */}
        <div className="glass-card p-6 border-gradient relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-success/5" />
          <div className="relative z-10">
            <SectionHeader
              title="Funding Recommendation"
              subtitle="AI-generated fundraising guidance"
              icon={Rocket}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 text-center">
                <p className="text-sm text-muted-foreground mb-1">Recommended Stage</p>
                <p className="text-2xl font-bold text-primary">{fundingRecommendation.stage}</p>
              </div>
              <div className="p-4 rounded-lg bg-success/10 border border-success/20 text-center">
                <p className="text-sm text-muted-foreground mb-1">Target Raise</p>
                <p className="text-2xl font-bold text-success">{fundingRecommendation.amount}</p>
              </div>
              <div className="p-4 rounded-lg bg-info/10 border border-info/20 text-center">
                <p className="text-sm text-muted-foreground mb-1">Optimal Timing</p>
                <p className="text-2xl font-bold text-info">{fundingRecommendation.timing}</p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-secondary/50 border border-border">
              <p className="text-sm text-muted-foreground">{fundingRecommendation.rationale}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
