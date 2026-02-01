import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Lightbulb,
  DollarSign,
  Users,
  Globe,
  Shield,
  Target,
  Wrench,
  Sparkles,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

const recommendations = {
  costOptimization: [
    {
      title: "Automate Customer Support",
      description: "Implement AI-powered chatbots to handle 40% of routine inquiries, reducing support costs significantly.",
      priority: "high" as const,
      impact: "Cost Reduction: $180K/year",
      icon: Wrench,
    },
    {
      title: "Cloud Infrastructure Optimization",
      description: "Right-size cloud instances and implement auto-scaling for underutilized resources.",
      priority: "medium" as const,
      impact: "Cost Reduction: $45K/year",
      icon: Wrench,
    },
  ],
  customerRetention: [
    {
      title: "Proactive Churn Prevention",
      description: "Deploy predictive analytics to identify at-risk customers 30 days before churn.",
      priority: "high" as const,
      impact: "Revenue Protection: $250K/year",
      icon: Users,
    },
    {
      title: "Customer Success Program",
      description: "Implement quarterly business reviews with top accounts for higher retention rates.",
      priority: "high" as const,
      impact: "NPS Improvement: +15 points",
      icon: Users,
    },
  ],
  marketStrategy: [
    {
      title: "Adjacent Market Expansion",
      description: "Healthcare vertical identified as high-potential market with 40% product-market fit.",
      priority: "high" as const,
      impact: "Revenue Opportunity: $1.2M/year",
      icon: Target,
    },
    {
      title: "Strategic Partnership",
      description: "Partner with complementary SaaS providers to accelerate sales cycles by 30%.",
      priority: "medium" as const,
      impact: "Sales Efficiency: +30%",
      icon: Target,
    },
  ],
  riskMitigation: [
    {
      title: "Revenue Diversification",
      description: "Top 3 customers represent 45% of revenue. Reduce concentration risk below 30%.",
      priority: "high" as const,
      impact: "Risk Reduction: Critical",
      icon: Shield,
    },
    {
      title: "Key Person Dependency",
      description: "Implement documentation sprints and cross-training programs for critical knowledge.",
      priority: "high" as const,
      impact: "Business Continuity",
      icon: Shield,
    },
  ],
};

const priorityConfig = {
  high: {
    bg: "bg-rose-500/10",
    text: "text-rose-400",
    border: "border-rose-500/30",
  },
  medium: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/30",
  },
  low: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
  },
};

const sectionConfig = {
  costOptimization: {
    title: "Cost Optimization",
    subtitle: "Reduce operational expenses and improve efficiency",
    icon: DollarSign,
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    iconBg: "from-amber-500/20 to-orange-500/10",
    iconColor: "text-amber-400",
    borderColor: "border-amber-500/20",
    accentType: "type-warning",
  },
  customerRetention: {
    title: "Customer Retention",
    subtitle: "Strategies to improve customer loyalty and reduce churn",
    icon: Users,
    gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
    iconBg: "from-emerald-500/20 to-green-500/10",
    iconColor: "text-emerald-400",
    borderColor: "border-emerald-500/20",
    accentType: "type-success",
  },
  marketStrategy: {
    title: "Market & Competition",
    subtitle: "Expand market presence and improve competitive positioning",
    icon: Globe,
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    iconBg: "from-cyan-500/20 to-blue-500/10",
    iconColor: "text-cyan-400",
    borderColor: "border-cyan-500/20",
    accentType: "type-info",
  },
  riskMitigation: {
    title: "Risk Mitigation",
    subtitle: "Address potential risks and improve business resilience",
    icon: Shield,
    gradient: "from-rose-500/20 via-red-500/10 to-transparent",
    iconBg: "from-rose-500/20 to-red-500/10",
    iconColor: "text-rose-400",
    borderColor: "border-rose-500/20",
    accentType: "type-danger",
  },
};

interface RecommendationCardProps {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  impact: string;
  icon: typeof Wrench;
  accentType: string;
  iconColor: string;
}

function PremiumRecommendationCard({ 
  title, 
  description, 
  priority, 
  impact, 
  icon: Icon,
  accentType,
  iconColor,
}: RecommendationCardProps) {
  const config = priorityConfig[priority];
  
  return (
    <div className={`recommendation-card-premium ${accentType} group`}>
      <div className="flex items-start gap-4">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${
          accentType === 'type-warning' ? 'from-amber-500/15 to-orange-500/5' :
          accentType === 'type-success' ? 'from-emerald-500/15 to-green-500/5' :
          accentType === 'type-info' ? 'from-cyan-500/15 to-blue-500/5' :
          'from-rose-500/15 to-red-500/5'
        } border ${
          accentType === 'type-warning' ? 'border-amber-500/20' :
          accentType === 'type-success' ? 'border-emerald-500/20' :
          accentType === 'type-info' ? 'border-cyan-500/20' :
          'border-rose-500/20'
        } flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h4 className="font-semibold text-foreground/95 leading-tight">{title}</h4>
            <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider ${config.bg} ${config.text} ${config.border} border whitespace-nowrap`}>
              {priority}
            </span>
          </div>
          <p className="text-sm text-muted-foreground/80 leading-relaxed mb-3">
            {description}
          </p>
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 text-xs font-medium ${
              accentType === 'type-warning' ? 'text-amber-400/90' :
              accentType === 'type-success' ? 'text-emerald-400/90' :
              accentType === 'type-info' ? 'text-cyan-400/90' :
              'text-rose-400/90'
            }`}>
              <TrendingUp className="w-3.5 h-3.5" />
              {impact}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AIRecommendationsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-violet-500/5 to-transparent rounded-3xl" />
          <div className="relative flex items-center gap-4 p-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-violet-500/20 border border-primary/20 flex items-center justify-center">
                <Lightbulb className="w-7 h-7 text-primary" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">AI-Powered Recommendations</h1>
              <p className="text-muted-foreground flex items-center gap-2 mt-1">
                <Sparkles className="w-4 h-4 text-primary" />
                Strategic insights for business optimization
              </p>
            </div>
          </div>
        </div>

        {/* Recommendation Sections */}
        {Object.entries(recommendations).map(([key, recs]) => {
          const config = sectionConfig[key as keyof typeof sectionConfig];
          const IconComponent = config.icon;
          
          return (
            <div key={key} className="space-y-4">
              {/* Section Header */}
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} rounded-2xl opacity-50`} />
                <div className="relative flex items-center gap-4 p-5">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.iconBg} border ${config.borderColor} flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 ${config.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{config.title}</h2>
                    <p className="text-sm text-muted-foreground">{config.subtitle}</p>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{recs.length} recommendations</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Recommendation Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {recs.map((rec, index) => (
                  <PremiumRecommendationCard
                    key={index}
                    title={rec.title}
                    description={rec.description}
                    priority={rec.priority}
                    impact={rec.impact}
                    icon={rec.icon}
                    accentType={config.accentType}
                    iconColor={config.iconColor}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
