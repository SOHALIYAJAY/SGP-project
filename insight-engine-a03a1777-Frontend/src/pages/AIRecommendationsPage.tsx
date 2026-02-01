import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { RecommendationCard } from "@/components/ui/recommendation-card";
import { SectionHeader } from "@/components/ui/section-header";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Lightbulb,
  DollarSign,
  Users,
  Globe,
  Shield,
  TrendingUp,
  Zap,
  Target,
  Wrench,
  Sparkles,
} from "lucide-react";

const recommendations = {
  costOptimization: [
    {
      title: "Automate Customer Support",
      description: "Implement AI-powered chatbots to handle 40% of routine inquiries, reducing support costs by approximately $15,000/month while maintaining response quality.",
      priority: "high" as const,
      impact: "Cost Reduction: $180K/year",
    },
    {
      title: "Cloud Infrastructure Optimization",
      description: "Right-size cloud instances and implement auto-scaling. Current analysis shows 35% of compute resources are underutilized during off-peak hours.",
      priority: "medium" as const,
      impact: "Cost Reduction: $45K/year",
    },
    {
      title: "Vendor Contract Renegotiation",
      description: "Three major vendor contracts are up for renewal. Market analysis suggests 15-20% savings potential through competitive bidding.",
      priority: "medium" as const,
      impact: "Cost Reduction: $60K/year",
    },
  ],
  customerRetention: [
    {
      title: "Proactive Churn Prevention",
      description: "Deploy predictive analytics to identify at-risk customers 30 days before churn. Early intervention has shown 45% recovery rate in similar companies.",
      priority: "high" as const,
      impact: "Revenue Protection: $250K/year",
    },
    {
      title: "Customer Success Program",
      description: "Implement quarterly business reviews with top 50 accounts. Companies with structured CS programs see 20% higher retention rates.",
      priority: "high" as const,
      impact: "NPS Improvement: +15 points",
    },
    {
      title: "Loyalty Rewards System",
      description: "Introduce tiered benefits based on customer tenure and engagement. This can increase average customer lifetime value by 25%.",
      priority: "medium" as const,
      impact: "LTV Increase: 25%",
    },
  ],
  marketStrategy: [
    {
      title: "Adjacent Market Expansion",
      description: "Analysis identifies healthcare vertical as high-potential market with 40% product-market fit. Entry requires minimal product modifications.",
      priority: "high" as const,
      impact: "Revenue Opportunity: $1.2M/year",
    },
    {
      title: "Strategic Partnership",
      description: "Partner with complementary SaaS providers to offer bundled solutions. This strategy can accelerate sales cycles by 30%.",
      priority: "medium" as const,
      impact: "Sales Efficiency: +30%",
    },
    {
      title: "Content Marketing Investment",
      description: "Increase thought leadership content production. Companies with strong content strategies see 3x more leads per marketing dollar.",
      priority: "low" as const,
      impact: "Lead Generation: +200%",
    },
  ],
  riskMitigation: [
    {
      title: "Revenue Diversification",
      description: "Top 3 customers represent 45% of revenue. Accelerate mid-market acquisition to reduce concentration risk below 30%.",
      priority: "high" as const,
      impact: "Risk Reduction: Critical",
    },
    {
      title: "Key Person Dependency",
      description: "Critical technical knowledge concentrated in 2 senior engineers. Implement documentation sprints and cross-training programs.",
      priority: "high" as const,
      impact: "Business Continuity",
    },
    {
      title: "Compliance Automation",
      description: "Automate SOC 2 and GDPR compliance monitoring to reduce audit preparation time by 60% and minimize compliance risks.",
      priority: "medium" as const,
      impact: "Compliance Efficiency: +60%",
    },
  ],
};

const quickWins = [
  { label: "Implement price anchoring", impact: "+5% conversion", effort: "Low" },
  { label: "Add customer testimonials", impact: "+12% trust score", effort: "Low" },
  { label: "Optimize email sequences", impact: "+18% open rate", effort: "Medium" },
  { label: "A/B test landing pages", impact: "+8% signups", effort: "Low" },
];

export default function AIRecommendationsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <SectionHeader
          title="AI-Powered Recommendations"
          subtitle="Strategic insights and actionable suggestions for business optimization"
          icon={Lightbulb}
        />

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass-card-hover p-4 text-center">
            <p className="text-3xl font-bold text-gradient-primary">12</p>
            <p className="text-sm text-muted-foreground">Total Recommendations</p>
          </div>
          <div className="glass-card-hover p-4 text-center">
            <p className="text-3xl font-bold text-success">5</p>
            <p className="text-sm text-muted-foreground">High Priority</p>
          </div>
          <div className="glass-card-hover p-4 text-center">
            <p className="text-3xl font-bold text-warning">5</p>
            <p className="text-sm text-muted-foreground">Medium Priority</p>
          </div>
          <div className="glass-card-hover p-4 text-center">
            <p className="text-3xl font-bold text-muted-foreground">2</p>
            <p className="text-sm text-muted-foreground">Low Priority</p>
          </div>
        </div>

        {/* Quick Wins */}
        <div className="glass-card p-6">
          <SectionHeader
            title="Quick Wins"
            subtitle="Low-effort, high-impact improvements"
            icon={Zap}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickWins.map((win, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-primary/5 border border-primary/20 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <StatusBadge label={win.effort} variant="info" size="sm" />
                </div>
                <p className="text-sm font-medium mb-1">{win.label}</p>
                <p className="text-xs text-success font-medium">{win.impact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Optimization */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-warning" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Cost Optimization</h2>
              <p className="text-sm text-muted-foreground">Reduce operational expenses and improve efficiency</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {recommendations.costOptimization.map((rec, index) => (
              <RecommendationCard
                key={index}
                title={rec.title}
                description={rec.description}
                type="suggestion"
                priority={rec.priority}
                icon={Wrench}
              />
            ))}
          </div>
        </div>

        {/* Customer Retention */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-success" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Customer Retention</h2>
              <p className="text-sm text-muted-foreground">Strategies to improve customer loyalty and reduce churn</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {recommendations.customerRetention.map((rec, index) => (
              <RecommendationCard
                key={index}
                title={rec.title}
                description={rec.description}
                type="success"
                priority={rec.priority}
                icon={Users}
              />
            ))}
          </div>
        </div>

        {/* Market Strategy */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-info/20 flex items-center justify-center">
              <Globe className="w-5 h-5 text-info" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Market & Competition</h2>
              <p className="text-sm text-muted-foreground">Expand market presence and improve competitive positioning</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {recommendations.marketStrategy.map((rec, index) => (
              <RecommendationCard
                key={index}
                title={rec.title}
                description={rec.description}
                type="info"
                priority={rec.priority}
                icon={Target}
              />
            ))}
          </div>
        </div>

        {/* Risk Mitigation */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Risk Mitigation</h2>
              <p className="text-sm text-muted-foreground">Address potential risks and improve business resilience</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {recommendations.riskMitigation.map((rec, index) => (
              <RecommendationCard
                key={index}
                title={rec.title}
                description={rec.description}
                type="warning"
                priority={rec.priority}
                icon={Shield}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
