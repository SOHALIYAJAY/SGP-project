"use client"

import React from "react"

import { SectionWrapper } from "@/components/ui/section-wrapper"
import {
  Lightbulb,
  ArrowRight,
  Clock,
  Target,
  TrendingUp,
  Users,
  DollarSign,
  Shield,
  Zap,
  CheckCircle2,
} from "lucide-react"

type Priority = "high" | "medium" | "low"

interface Recommendation {
  id: string
  title: string
  description: string
  impact: string
  effort: string
  priority: Priority
  category: string
  icon: React.ElementType
  timeline: string
  metrics: string[]
}

const recommendations: Recommendation[] = [
  {
    id: "1",
    title: "Implement Customer Retention Program",
    description: "Launch a proactive retention initiative targeting at-risk customers with personalized engagement and incentives.",
    impact: "Reduce churn by 25%",
    effort: "Medium",
    priority: "high",
    category: "Customer",
    icon: Users,
    timeline: "2-3 months",
    metrics: ["Churn Rate", "NPS Score", "Customer LTV"],
  },
  {
    id: "2",
    title: "Diversify Revenue Streams",
    description: "Reduce dependency on top 3 customers by expanding into new market segments and launching additional product tiers.",
    impact: "Reduce revenue concentration risk by 40%",
    effort: "High",
    priority: "high",
    category: "Financial",
    icon: DollarSign,
    timeline: "6-12 months",
    metrics: ["Revenue Concentration", "New Customer Acquisition", "Product Mix"],
  },
  {
    id: "3",
    title: "Optimize Operational Efficiency",
    description: "Automate manual processes in customer onboarding and support to reduce operational costs and improve scalability.",
    impact: "Reduce operational costs by 15%",
    effort: "Medium",
    priority: "high",
    category: "Operations",
    icon: Zap,
    timeline: "3-4 months",
    metrics: ["Operational Costs", "Support Response Time", "Onboarding Time"],
  },
  {
    id: "4",
    title: "Strengthen Market Position",
    description: "Increase marketing investment in high-growth segments and develop competitive differentiation through unique features.",
    impact: "Increase market share by 1.5%",
    effort: "High",
    priority: "medium",
    category: "Growth",
    icon: TrendingUp,
    timeline: "6-9 months",
    metrics: ["Market Share", "Brand Awareness", "Lead Generation"],
  },
  {
    id: "5",
    title: "Prepare for Series B Funding",
    description: "Organize financial documentation, optimize unit economics, and build relationships with potential investors.",
    impact: "Secure $15-20M funding",
    effort: "High",
    priority: "medium",
    category: "Financial",
    icon: Target,
    timeline: "4-6 months",
    metrics: ["Investor Pipeline", "Due Diligence Readiness", "Valuation"],
  },
  {
    id: "6",
    title: "Enhance Data Security Protocols",
    description: "Implement advanced security measures and achieve SOC 2 compliance to strengthen enterprise sales positioning.",
    impact: "Enable 30% more enterprise deals",
    effort: "Medium",
    priority: "medium",
    category: "Compliance",
    icon: Shield,
    timeline: "3-5 months",
    metrics: ["Security Score", "Compliance Status", "Enterprise Win Rate"],
  },
  {
    id: "7",
    title: "Build Strategic Partnerships",
    description: "Establish partnerships with complementary service providers to expand distribution channels and market reach.",
    impact: "Add 2 new revenue channels",
    effort: "Medium",
    priority: "low",
    category: "Growth",
    icon: Users,
    timeline: "4-6 months",
    metrics: ["Partner Revenue", "Channel Diversification", "Market Reach"],
  },
  {
    id: "8",
    title: "Invest in Product Innovation",
    description: "Allocate resources to R&D for next-generation features that address emerging market needs and customer feedback.",
    impact: "Launch 3 major features",
    effort: "High",
    priority: "low",
    category: "Product",
    icon: Lightbulb,
    timeline: "6-12 months",
    metrics: ["Feature Adoption", "Customer Satisfaction", "Competitive Edge"],
  },
]

const priorityGroups = {
  high: recommendations.filter((r) => r.priority === "high"),
  medium: recommendations.filter((r) => r.priority === "medium"),
  low: recommendations.filter((r) => r.priority === "low"),
}

export default function RecommendationsPage() {
  return (
    <div className="min-h-screen pt-20">
      <SectionWrapper>
        {/* Header */}
        <div className="mb-8 opacity-0 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            AI Recommendations
          </h1>
          <p className="text-muted-foreground">
            Actionable insights prioritized by impact and urgency
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-6 mb-12 opacity-0 animate-fade-in-up stagger-1">
          <SummaryCard
            count={priorityGroups.high.length}
            label="High Priority"
            status="danger"
          />
          <SummaryCard
            count={priorityGroups.medium.length}
            label="Medium Priority"
            status="warning"
          />
          <SummaryCard
            count={priorityGroups.low.length}
            label="Low Priority"
            status="success"
          />
        </div>

        {/* High Priority Section */}
        <PrioritySection
          title="High Priority"
          subtitle="Address these items immediately for maximum impact"
          recommendations={priorityGroups.high}
          priority="high"
          delay={200}
        />

        {/* Medium Priority Section */}
        <PrioritySection
          title="Medium Priority"
          subtitle="Plan these initiatives for the next quarter"
          recommendations={priorityGroups.medium}
          priority="medium"
          delay={400}
        />

        {/* Low Priority Section */}
        <PrioritySection
          title="Low Priority"
          subtitle="Consider these for long-term strategic planning"
          recommendations={priorityGroups.low}
          priority="low"
          delay={600}
        />
      </SectionWrapper>
    </div>
  )
}

function SummaryCard({
  count,
  label,
  status,
}: {
  count: number
  label: string
  status: "success" | "warning" | "danger"
}) {
  const styles = {
    success: "border-t-success",
    warning: "border-t-warning",
    danger: "border-t-destructive",
  }

  return (
    <div className={`bg-card border border-border border-t-[3px] ${styles[status]} rounded-xl p-6 text-center`}>
      <div className="text-3xl font-bold text-card-foreground mb-1">{count}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}

function PrioritySection({
  title,
  subtitle,
  recommendations,
  priority,
  delay = 0,
}: {
  title: string
  subtitle: string
  recommendations: Recommendation[]
  priority: Priority
  delay?: number
}) {
  const priorityStyles = {
    high: { badge: "bg-destructive/10 text-destructive", dot: "bg-destructive" },
    medium: { badge: "bg-warning/10 text-warning", dot: "bg-warning" },
    low: { badge: "bg-success/10 text-success", dot: "bg-success" },
  }

  const style = priorityStyles[priority]

  return (
    <div className="mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-3 h-3 rounded-full ${style.dot}`} />
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${style.badge}`}>
          {recommendations.length} items
        </span>
      </div>
      <p className="text-muted-foreground mb-6 ml-6">{subtitle}</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((rec, index) => (
          <RecommendationCard key={rec.id} recommendation={rec} delay={delay + 100 + index * 50} />
        ))}
      </div>
    </div>
  )
}

function RecommendationCard({
  recommendation,
  delay = 0,
}: {
  recommendation: Recommendation
  delay?: number
}) {
  const Icon = recommendation.icon

  return (
    <div
      className="bg-card border border-border rounded-xl p-6 card-hover opacity-0 animate-fade-in-up group"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <span className="text-xs text-muted-foreground">{recommendation.category}</span>
          <h4 className="font-semibold text-card-foreground leading-tight">
            {recommendation.title}
          </h4>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4">
        {recommendation.description}
      </p>

      {/* Impact */}
      <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-secondary/50">
        <Target className="w-4 h-4 text-success" />
        <span className="text-sm font-medium text-card-foreground">
          {recommendation.impact}
        </span>
      </div>

      {/* Metrics */}
      <div className="flex flex-wrap gap-2 mb-4">
        {recommendation.metrics.map((metric) => (
          <span
            key={metric}
            className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground"
          >
            {metric}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span>{recommendation.timeline}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-primary group-hover:text-accent transition-colors">
          <span>View Details</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  )
}
