"use client"

import React, { useState } from "react"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import {
  Lightbulb,
  Clock,
  Target,
  TrendingUp,
  Users,
  DollarSign,
  Shield,
  Zap,
  CheckCircle2,
  Download,
  Filter,
  ArrowUpDown,
  Sparkles,
  TrendingDown,
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
  const [filterPriority, setFilterPriority] = useState<"all" | Priority>("all")
  const [sortBy, setSortBy] = useState<"impact" | "confidence" | "timeline">("impact")

  const filteredRecs = filterPriority === "all" ? recommendations : recommendations.filter(r => r.priority === filterPriority)
  
  const sortedRecs = [...filteredRecs].sort((a, b) => {
    if (sortBy === "impact") {
      const aScore = parseImpactScore(a.impact)
      const bScore = parseImpactScore(b.impact)
      return bScore - aScore
    }
    if (sortBy === "confidence") {
      return computeConfidence(b) - computeConfidence(a)
    }
    return parseTimelineMonths(a.timeline) - parseTimelineMonths(b.timeline)
  })

  const highPriority = sortedRecs.filter(r => r.priority === "high")
  const mediumPriority = sortedRecs.filter(r => r.priority === "medium")
  const lowPriority = sortedRecs.filter(r => r.priority === "low")

  const totalROI = "$2.4M"
  const avgConfidence = Math.round(sortedRecs.reduce((sum, r) => sum + computeConfidence(r), 0) / sortedRecs.length)

  return (
    <div className="min-h-screen py-2">
      <SectionWrapper>
        {/* Header */}
        <div className="mb-8 opacity-0 animate-fade-in-up">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">AI Insights</h1>
              <p className="text-muted-foreground">AI-powered strategic recommendations based on your business data</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Filter Dropdown */}
              <div className="relative">
                <select 
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value as "all" | Priority)}
                  className="glass-card rounded-lg px-4 py-2 pr-10 text-sm text-card-foreground border border-white/10 appearance-none cursor-pointer"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "impact" | "confidence" | "timeline")}
                  className="glass-card rounded-lg px-4 py-2 pr-10 text-sm text-card-foreground border border-white/10 appearance-none cursor-pointer"
                >
                  <option value="impact">Sort by Impact</option>
                  <option value="confidence">Sort by Confidence</option>
                  <option value="timeline">Sort by Timeline</option>
                </select>
                <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>

              {/* Export Button */}
              <button className="glass-card rounded-lg px-4 py-2 text-sm text-card-foreground border border-white/10 hover:border-primary/30 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Summary Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <SummaryMetricCard
            icon={Sparkles}
            label="Total Insights"
            value={sortedRecs.length.toString()}
            iconColor="text-primary"
            delay={100}
          />
          <SummaryMetricCard
            icon={TrendingUp}
            label="High Priority"
            value={highPriority.length.toString()}
            iconColor="text-destructive"
            delay={200}
          />
          <SummaryMetricCard
            icon={DollarSign}
            label="Estimated ROI"
            value={totalROI}
            iconColor="text-success"
            delay={300}
          />
          <SummaryMetricCard
            icon={Target}
            label="Avg Confidence"
            value={`${avgConfidence}%`}
            iconColor="text-warning"
            delay={400}
          />
        </div>

        {/* High Priority Section */}
        {highPriority.length > 0 && (
          <div className="mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-destructive rounded-full" />
              <h2 className="text-xl font-semibold text-destructive">High Priority</h2>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-destructive/10 text-destructive">
                {highPriority.length} {highPriority.length === 1 ? "insight" : "insights"}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {highPriority.map((rec, idx) => (
                <InsightCard key={rec.id} recommendation={rec} delay={600 + idx * 100} />
              ))}
            </div>
          </div>
        )}

        {/* Medium Priority Section */}
        {mediumPriority.length > 0 && (
          <div className="mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: "600ms" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-warning rounded-full" />
              <h2 className="text-xl font-semibold text-warning">Medium Priority</h2>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-warning/10 text-warning">
                {mediumPriority.length} {mediumPriority.length === 1 ? "insight" : "insights"}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediumPriority.map((rec, idx) => (
                <InsightCard key={rec.id} recommendation={rec} delay={700 + idx * 100} />
              ))}
            </div>
          </div>
        )}

        {/* Low Priority Section */}
        {lowPriority.length > 0 && (
          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "700ms" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-success rounded-full" />
              <h2 className="text-xl font-semibold text-success">Low Priority</h2>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-success/10 text-success">
                {lowPriority.length} {lowPriority.length === 1 ? "insight" : "insights"}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lowPriority.map((rec, idx) => (
                <InsightCard key={rec.id} recommendation={rec} delay={800 + idx * 100} />
              ))}
            </div>
          </div>
        )}
      </SectionWrapper>
    </div>
  )
}

// Helper functions
const computeConfidence = (rec: Recommendation) => {
  const base = rec.priority === "high" ? 90 : rec.priority === "medium" ? 75 : 60
  const effortAdj = rec.effort === "High" ? -8 : rec.effort === "Medium" ? 0 : 4
  return Math.max(35, Math.min(99, base + effortAdj))
}

const parseImpactScore = (impactText: string) => {
  const numMatch = impactText.match(/(-?\d+\.?\d*)\s*%?/)
  if (numMatch) {
    const n = Math.abs(Number(numMatch[1]))
    if (!isNaN(n)) return Math.min(100, Math.round(n))
  }
  return 50
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

// Summary Metric Card Component
function SummaryMetricCard({
  icon: Icon,
  label,
  value,
  iconColor,
  delay = 0,
}: {
  icon: React.ElementType
  label: string
  value: string
  iconColor: string
  delay?: number
}) {
  return (
    <div
      className="glass-card rounded-xl p-6 border border-white/10 opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-2">{label}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
        </div>
        <div className={`p-2 rounded-lg bg-secondary/30`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
    </div>
  )
}

// Insight Card Component
function InsightCard({ recommendation, delay = 0 }: { recommendation: Recommendation; delay?: number }) {
  const Icon = recommendation.icon
  const [inProgress, setInProgress] = useState(false)
  const [completed, setCompleted] = useState(false)

  const priorityStyles = {
    high: { border: "border-destructive/30", badge: "bg-destructive/10 text-destructive", icon: "text-destructive", progress: "bg-destructive" },
    medium: { border: "border-warning/30", badge: "bg-warning/10 text-warning", icon: "text-warning", progress: "bg-warning" },
    low: { border: "border-success/30", badge: "bg-success/10 text-success", icon: "text-success", progress: "bg-success" },
  }

  const style = priorityStyles[recommendation.priority]
  const confidence = computeConfidence(recommendation)
  const impactScore = parseImpactScore(recommendation.impact)
  const timelineMonths = parseTimelineMonths(recommendation.timeline)

  return (
    <div
      className="glass-card rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 opacity-0 animate-fade-in-up group"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2 rounded-lg ${style.badge}`}>
          <Icon className={`w-5 h-5 ${style.icon}`} />
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${style.badge}`}>
            {recommendation.priority.toUpperCase()}
          </span>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary/30 text-muted-foreground">
            {confidence}%
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">{recommendation.title}</h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{recommendation.description}</p>

      {/* Impact & Timeline */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Estimated Impact</span>
          <span className="font-medium text-foreground">{recommendation.impact}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Time to Implement</span>
          <span className="font-medium text-foreground">{recommendation.timeline}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Confidence Score</span>
          <span className="font-medium text-foreground">{confidence}%</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div className={`h-full ${style.progress} transition-all duration-500`} style={{ width: `${confidence}%` }} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-4 border-t border-white/10">
        <button className="flex-1 px-3 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          View Details
        </button>
        <button
          onClick={() => setInProgress(!inProgress)}
          className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
            inProgress ? "border-warning bg-warning/10 text-warning" : "border-white/10 text-muted-foreground hover:border-white/20"
          }`}
        >
          {inProgress ? "In Progress" : "Start"}
        </button>
        <button
          onClick={() => setCompleted(!completed)}
          className={`p-2 rounded-lg border transition-colors ${
            completed ? "border-success bg-success/10" : "border-white/10 hover:border-white/20"
          }`}
        >
          <CheckCircle2 className={`w-4 h-4 ${completed ? "text-success" : "text-muted-foreground"}`} />
        </button>
      </div>
    </div>
  )
}
