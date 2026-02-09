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
    description:
      "Launch a proactive retention initiative targeting at-risk customers with personalized engagement and incentives.",
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
    description:
      "Reduce dependency on top 3 customers by expanding into new market segments and launching additional product tiers.",
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
    description:
      "Automate manual processes in customer onboarding and support to reduce operational costs and improve scalability.",
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
    description:
      "Increase marketing investment in high-growth segments and develop competitive differentiation through unique features.",
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
    description:
      "Organize financial documentation, optimize unit economics, and build relationships with potential investors.",
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
    description:
      "Implement advanced security measures and achieve SOC 2 compliance to strengthen enterprise sales positioning.",
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
    description:
      "Establish partnerships with complementary service providers to expand distribution channels and market reach.",
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
    description:
      "Allocate resources to R&D for next-generation features that address emerging market needs and customer feedback.",
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
  const [lowExpanded, setLowExpanded] = React.useState(false)

  return (
    <div className="min-h-screen pt-20">
      <SectionWrapper>
        {/* Header */}
        <div className="mb-8 opacity-0 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">AI Recommendations</h1>
          <p className="text-muted-foreground">Actionable insights prioritized by impact and urgency</p>
        </div>

        {/* Summary Row - compact horizontal */}
        <div className="flex items-center gap-4 mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: `80ms` }}>
          <div className="flex-1">
            <SummaryCard count={priorityGroups.high.length} label="High" status="danger" className="p-3" />
          </div>
          <div className="flex-1">
            <SummaryCard count={priorityGroups.medium.length} label="Medium" status="warning" className="p-3" />
          </div>
          <div className="flex-1">
            <SummaryCard count={priorityGroups.low.length} label="Low" status="success" className="p-3" />
          </div>
        </div>

        {/* High Priority - full-width, dominant */}
        <div className="mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: `120ms` }}>
          <PrioritySection
            title="High Priority"
            subtitle="Address these items immediately for maximum impact"
            recommendations={priorityGroups.high}
            priority="high"
            delay={200}
            columnsClass="grid-cols-1"
          />
        </div>

        {/* Medium Priority - grid 2-3 columns */}
        <div className="mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: `160ms` }}>
          <PrioritySection
            title="Medium Priority"
            subtitle="Plan these initiatives for the next quarter"
            recommendations={priorityGroups.medium}
            priority="medium"
            delay={400}
            columnsClass="md:grid-cols-2 lg:grid-cols-3"
          />
        </div>

        {/* Low Priority - collapsed/softer */}
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: `200ms` }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-success" />
              <h3 className="text-lg font-semibold text-success">Low Priority</h3>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-success/10 text-success">{priorityGroups.low.length} items</span>
            </div>
            <div>
              <button className="text-sm px-3 py-2 rounded-md bg-secondary/10" onClick={() => setLowExpanded((s) => !s)}>
                {lowExpanded ? "Collapse" : "Expand"}
              </button>
            </div>
          </div>

          <div className={`${lowExpanded ? "" : "opacity-60"} grid md:grid-cols-2 lg:grid-cols-3 gap-6`}>
            {priorityGroups.low.map((rec, idx) => (
              <RecommendationCard key={rec.id} recommendation={rec} delay={600 + idx * 30} />
            ))}
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}

function AIConfidenceCard() {
  const overall = { high: 0.92, medium: 0.76, low: 0.63 }

  return (
    <div className="glass-card rounded-xl p-6">
      <h5 className="text-sm font-semibold text-card-foreground mb-2">AI Confidence</h5>
      <p className="text-xs text-muted-foreground mb-4">Model confidence in recommended priorities and expected outcomes.</p>

      <div className="space-y-3">
        {([
          { key: "high", label: "High Priority", val: overall.high, color: "destructive" },
          { key: "medium", label: "Medium Priority", val: overall.medium, color: "warning" },
          { key: "low", label: "Low Priority", val: overall.low, color: "success" },
        ] as const).map((row) => (
          <div key={row.key} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{row.label}</span>
              <span className={`text-xs font-semibold text-${row.color}`}>{Math.round(row.val * 100)}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${row.color === "destructive" ? "bg-destructive" : row.color === "warning" ? "bg-warning" : "bg-success"}`} style={{ width: `${Math.round(row.val * 100)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SummaryCard({ count, label, status, className = "" }: { count: number; label: string; status: "success" | "warning" | "danger"; className?: string }) {
  const styles = { success: "border-t-success", warning: "border-t-warning", danger: "border-t-destructive" }
  const glowColors = { success: "green" as const, warning: "orange" as const, danger: "red" as const }
  return (
    <div className={`glass-card border-t-[3px] ${styles[status]} rounded-xl ${className} text-center`}>
      <div className="text-3xl font-bold text-card-foreground mb-1">{count}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}

function PrioritySection({ title, subtitle, recommendations, priority, delay = 0, columnsClass = "md:grid-cols-2 lg:grid-cols-3" }: { title: string; subtitle: string; recommendations: Recommendation[]; priority: Priority; delay?: number; columnsClass?: string }) {
  const priorityStyles = {
    high: { badge: "bg-destructive/10 text-destructive", dot: "bg-destructive", text: "text-destructive", accent: "destructive" },
    medium: { badge: "bg-warning/10 text-warning", dot: "bg-warning", text: "text-warning", accent: "warning" },
    low: { badge: "bg-success/10 text-success", dot: "bg-success", text: "text-success", accent: "success" },
  }

  const style = priorityStyles[priority as keyof typeof priorityStyles]

  return (
    <div className="mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-3 h-3 rounded-full ${style.dot}`} />
        <span className="ai-pulse" aria-hidden />
        <h3 className={`text-xl font-semibold ${style.text}`}>{title}</h3>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${style.badge}`}>{recommendations.length} items</span>
      </div>
      <p className="text-muted-foreground mb-6 ml-6">{subtitle}</p>

      <div className={`grid ${columnsClass} gap-6`}>
        {recommendations.map((rec, index) => (
          <RecommendationCard key={rec.id} recommendation={rec} delay={delay + 100 + index * 50} />
        ))}
      </div>
    </div>
  )
}

function RecommendationCard({ recommendation, delay = 0 }: { recommendation: Recommendation; delay?: number }) {
  const Icon = recommendation.icon
  const priorityMap = {
    high: { text: "text-destructive", bg: "bg-destructive/10", bar: "bg-destructive", accent: "destructive" },
    medium: { text: "text-warning", bg: "bg-warning/10", bar: "bg-warning", accent: "warning" },
    low: { text: "text-success", bg: "bg-success/10", bar: "bg-success", accent: "success" },
  } as const

  const p = priorityMap[recommendation.priority]

  const computeConfidence = (rec: Recommendation) => {
    const base = rec.priority === "high" ? 0.9 : rec.priority === "medium" ? 0.75 : 0.6
    const effortAdj = rec.effort === "High" ? -0.08 : rec.effort === "Medium" ? 0 : 0.04
    const val = Math.max(0.35, Math.min(0.99, base + effortAdj))
    return Math.round(val * 100)
  }

  const confidence = computeConfidence(recommendation)
  const [showWhy, setShowWhy] = React.useState(false)
  const [inProgress, setInProgress] = React.useState(false)
  const [deferred, setDeferred] = React.useState(false)
  const [addedToRoadmap, setAddedToRoadmap] = React.useState(false)

  const factors = [
    { icon: TrendingUp, label: "Predicted Impact", text: "Model projects high ROI based on growth signals" },
    { icon: Zap, label: "Operational Fit", text: "Low integration effort; automatable" },
    { icon: CheckCircle2, label: "Data Support", text: "Multiple data sources indicate supporting trend" },
  ]

  const getMetricTooltip = (metric: string) => {
    const map: Record<string, string> = {
      "Churn Rate": "Measures customer attrition — lower is better",
      "NPS Score": "Net Promoter Score — customer satisfaction indicator",
      "Customer LTV": "Lifetime value of a customer — revenue per customer over time",
      "Revenue Concentration": "Dependence on top customers — risk indicator",
      "New Customer Acquisition": "Rate of acquiring new customers",
      "Product Mix": "Diversity of product revenue streams",
      "Operational Costs": "Costs tied to operations — efficiency metric",
      "Support Response Time": "Time to resolve customer issues",
      "Onboarding Time": "Time to onboard new customers",
      "Market Share": "Share of total market revenue",
      "Brand Awareness": "Recognition of brand among target users",
      "Lead Generation": "Rate of new qualified leads",
      "Investor Pipeline": "Lead indicators of investor interest",
      "Due Diligence Readiness": "Preparedness for investor review",
      "Valuation": "Estimated company worth",
      "Security Score": "Assessment of security posture",
      "Compliance Status": "Regulatory compliance progress",
      "Enterprise Win Rate": "Success rate with enterprise deals",
      "Partner Revenue": "Revenue through partners",
      "Channel Diversification": "Number of revenue channels",
      "Market Reach": "Coverage across markets",
      "Feature Adoption": "User adoption of new features",
      "Customer Satisfaction": "Overall user satisfaction metrics",
      "Competitive Edge": "Advantage over competitors",
    }
    return map[metric] ?? "Metric supporting the recommendation"
  }

  const parseImpactScore = (impactText: string) => {
    const numMatch = impactText.match(/(-?\d+\.?\d*)\s*%?/)
    if (numMatch) {
      const n = Math.abs(Number(numMatch[1]))
      if (!isNaN(n)) return Math.min(100, Math.round(n))
    }
    if (recommendation.priority === "high") return 85
    if (recommendation.priority === "medium") return 55
    return 30
  }

  const parseTimelineMonths = (timeline: string) => {
    const m = timeline.match(/(\d+(?:\.\d+)?)(?:\s*-\s*(\d+(?:\.\d+)?))?\s*(month|months|mo|m|year|years|yr)?/i)
    if (m) {
      const a = Number(m[1])
      const b = m[2] ? Number(m[2]) : a
      let avg = (a + b) / 2
      const unit = (m[3] || "").toLowerCase()
      if (unit.startsWith("year") || unit.startsWith("yr")) avg = avg * 12
      return Math.max(0.5, Math.round(avg))
    }
    return 6
  }

  const impactScore = parseImpactScore(recommendation.impact)
  const timelineMonths = parseTimelineMonths(recommendation.timeline)
  const timeLabel = timelineMonths >= 12 ? `${Math.round(timelineMonths / 12)} yr` : `${timelineMonths} mo`

  return (
    <div className={`opacity-0 animate-fade-in-up group`} style={{ animationDelay: `${delay}ms` }}>
      <div className={`rounded-xl p-[1px] bg-gradient-to-r from-${p.accent} to-${p.accent}/60`}>
        <div className="glass-card rounded-[calc(0.75rem-1px)] p-6 relative group-hover:shadow-xl transition-shadow duration-200 transform-gpu transition-transform will-change-transform group-hover:-translate-y-1" style={{ backdropFilter: "blur(6px)" }}>
          <div className={`absolute -top-3 left-4 px-2 py-1 text-xs rounded-md font-semibold ${p.bg} ${p.text}`}>{recommendation.priority.toUpperCase()}</div>

          <div className="flex items-start gap-3 mb-4">
            <div className={`p-2 rounded-lg ${p.bg} group-hover:opacity-90 transition-colors`}>
              <Icon className={`w-5 h-5 ${p.text}`} />
            </div>
            <div className="flex-1">
              <span className="text-xs text-muted-foreground">{recommendation.category}</span>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-card-foreground text-lg leading-tight">{recommendation.title}</h4>
                {confidence >= 85 ? (
                  <span className={`ai-badge ${p.bg} ${p.text}`}>AI Verified</span>
                ) : confidence >= 75 ? (
                  <span className={`ai-badge ${p.bg} ${p.text}`}>High Confidence</span>
                ) : null}
              </div>
            </div>

            <div className="ml-4 flex flex-col items-end">
              <span className="text-xs text-muted-foreground">Confidence</span>
              <div className="w-12 h-6 flex items-center justify-center text-sm font-semibold">
                <span className="text-card-foreground">{confidence}%</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4">{recommendation.description}</p>

          <div className="mb-4">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${p.bg} ${p.text}`}>
              <Target className={`w-4 h-4 ${p.text}`} />
              <span>{recommendation.impact}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {recommendation.metrics.map((metric) => (
              <span key={metric} className="text-xs px-2 py-0.5 rounded-full bg-secondary/30 text-muted-foreground metric-tooltip" title={getMetricTooltip(metric)}>
                {metric}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Impact</span>
                <span className="font-medium text-card-foreground">{impactScore}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className={`h-full ${p.bar}`} style={{ width: `${impactScore}%` }} />
              </div>
            </div>

            <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${p.bg} ${p.text}`}>
              <Clock className="w-3 h-3" />
              <span>{timeLabel}</span>
            </div>

            <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium bg-secondary/10 text-card-foreground">
              <span className="font-semibold">{confidence}%</span>
            </div>
          </div>

          <div className="mb-3">
            <button type="button" onClick={() => setShowWhy((s) => !s)} className="flex items-center gap-2 text-sm text-muted-foreground" aria-expanded={showWhy}>
              <Lightbulb className="w-4 h-4 text-muted-foreground" />
              <span>Why AI recommends this</span>
              <ArrowRight className={`w-3 h-3 transform transition-transform ${showWhy ? "rotate-90" : ""}`} />
            </button>

            <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: showWhy ? 240 : 0 }}>
              <div className="mt-3 grid gap-2 text-xs text-muted-foreground">
                {factors.map((f) => {
                  const IconComponent = f.icon
                  return (
                    <div key={f.label} className="flex items-start gap-2">
                      <IconComponent className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="text-card-foreground text-xs font-medium">{f.label}</div>
                        <div className="text-xs text-muted-foreground">{f.text}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{recommendation.timeline}</span>
              </div>

              <div className="flex items-center gap-2">
                {recommendation.priority === "high" ? (
                  <button onClick={() => setInProgress(true)} className={`text-sm px-3 py-2 rounded-md text-white bg-${p.accent} shadow-md hover:shadow-lg transition transform active:scale-95`} aria-pressed={inProgress}>
                    {inProgress ? "In Progress" : "Act Now"}
                  </button>
                ) : recommendation.priority === "medium" ? (
                  <button onClick={() => setAddedToRoadmap(true)} className={`text-sm px-3 py-2 rounded-md border border-${p.accent} ${p.text} bg-transparent transition transform active:scale-95`}>
                    {addedToRoadmap ? "Added" : "Plan"}
                  </button>
                ) : (
                  <button onClick={() => setAddedToRoadmap(true)} className={`text-sm px-2 py-1 rounded-md text-${p.text} bg-transparent underline transform active:scale-95`}>
                    {addedToRoadmap ? "Roadmap" : "Add to Roadmap"}
                  </button>
                )}

                <div className="flex items-center gap-2">
                  <button onClick={() => setInProgress((s) => !s)} className="text-xs px-2 py-1 rounded-md bg-secondary/10 hover:bg-secondary/20 transform active:scale-95">
                    {inProgress ? "Undo" : "Mark In Progress"}
                  </button>
                  <button onClick={() => setDeferred((s) => !s)} className="text-xs px-2 py-1 rounded-md bg-secondary/10 hover:bg-secondary/20 transform active:scale-95">
                    {deferred ? "Undefer" : "Defer"}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-1 h-2 bg-secondary rounded-full overflow-hidden">
              <div className={`h-full ${p.bar}`} style={{ width: `${confidence}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
