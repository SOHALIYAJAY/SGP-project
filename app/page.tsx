import React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { Typewriter } from "@/components/ui/typewriter";
import RainAnimation from "@/components/rain-animation"
import Footer from "@/components/footer"

import {
  ArrowRight,
  BarChart3,
  Brain,
  LineChart,
  Shield,
  TrendingUp,
  Zap,
  CheckCircle2,
} from "lucide-react"
import HeroParticles from "@/components/hero-particles"

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <RainAnimation />
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="absolute inset-0 -z-20">
              <HeroParticles />
            </div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted-foreground mb-8 opacity-0 animate-fade-in-up">
              <Zap className="w-4 h-4 text-primary" />
              <span>AI-Powered Business Intelligence</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6 opacity-0 animate-fade-in-up stagger-1">
            Business Analysis &{" "}
            <Typewriter
              text={[
                "Prediction System",
                "Growth Forecasting",
                "Smart Business Insights",
                "AI-Driven Decisions",
              ]}
              className="font-bold"
            />
          </h1>


            {/* Subheading */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in-up stagger-2 text-pretty">
              Transform raw business data into actionable insights. Analyze company health, 
              predict growth trajectories, and make data-driven decisions with confidence.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up stagger-3">
              <Link href="/company-input">
                <Button size="lg" className="bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white hover:opacity-90 transition-all duration-300 group px-8 shadow-lg shadow-cyan-500/20">
                  Start Company Analysis
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="border-cyan-500/30 hover:bg-cyan-500/5 px-8 bg-transparent text-foreground hover:text-cyan-400 transition-colors">
                  View Demo Dashboard
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <StatCard
              value={97.8}
              suffix="%"
              label="Prediction Accuracy"
              color="success"
              delay={400}
            />
            <StatCard
              value={2500}
              suffix="+"
              label="Reports Generated"
              color="info"
              delay={500}
            />
            <StatCard
              value={150}
              suffix="+"
              label="Data Points Analyzed"
              color="info"
              delay={600}
            />
            <StatCard
              value={24}
              suffix="/7"
              label="Real-time Monitoring"
              color="success"
              delay={700}
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 opacity-0 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comprehensive Analysis Suite
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to understand, analyze, and predict business performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={BarChart3}
              title="Business Dashboard"
              description="Real-time metrics on business health, risk levels, and investment readiness scores"
              color="dashboard"
              delay={100}
            />
            <FeatureCard
              icon={TrendingUp}
              title="Growth Predictions"
              description="AI-powered forecasts for revenue, customer base, and market expansion"
              color="prediction"
              delay={200}
            />
            <FeatureCard
              icon={Brain}
              title="AI Recommendations"
              description="Actionable insights prioritized by impact and urgency for your business"
              color="ai"
              delay={300}
            />
            <FeatureCard
              icon={Shield}
              title="Risk Assessment"
              description="Comprehensive risk analysis across financial, operational, and market factors"
              color="risk"
              delay={400}
            />
            <FeatureCard
              icon={LineChart}
              title="Financial Analysis"
              description="Deep dive into revenue, profit margins, burn rate, and runway projections"
              color="financial"
              delay={500}
            />
            <FeatureCard
              icon={CheckCircle2}
              title="Investment Readiness"
              description="Evaluate funding potential and get tailored investment recommendations"
              color="investment"
              delay={600}
            />
          </div>
        </div>
      </section>

      {/* Video Demo Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 opacity-0 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              See BAPS in Action
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Watch how to input your company data and explore powerful analytics features
            </p>
          </div>

          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <div className="relative rounded-2xl overflow-hidden glass-card p-2">
              <div className="aspect-video bg-secondary/30 rounded-xl overflow-hidden">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="BAPS Demo Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 opacity-0 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get actionable insights in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center opacity-0 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Input Your Data</h3>
              <p className="text-muted-foreground">
                Enter your company information, financial metrics, and business details through our intuitive form
              </p>
            </div>

            <div className="text-center opacity-0 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary-foreground">
                2
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">AI Analysis</h3>
              <p className="text-muted-foreground">
                Our AI engine processes your data, identifies patterns, and generates comprehensive insights across multiple dimensions
              </p>
            </div>

            <div className="text-center opacity-0 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary-foreground">
                3
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Get Insights</h3>
              <p className="text-muted-foreground">
                Access detailed reports, predictions, and actionable recommendations to drive your business forward
              </p>
            </div>
          </div>
        </div>
      </section>
<br />
<br /><br /><br /><br />
      <Footer />

    </div>
  )
}

function StatCard({
  value,
  suffix = "",
  label,
  color = "info",
  delay = 0,
}: {
  value: number
  suffix?: string
  label: string
  color?: "success" | "info" | "warning" | "danger"
  delay?: number
}) {
  const colorClasses = {
    success: "text-[#22C55E]",
    info: "text-[#0EA5E9]",
    warning: "text-[#F59E0B]",
    danger: "text-[#EF4444]",
  }

  return (
    <div
      className="text-center p-6 rounded-xl glass card-hover opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`text-3xl md:text-4xl font-bold ${colorClasses[color]} mb-2`}>
        <AnimatedCounter end={value} suffix={suffix} decimals={value % 1 !== 0 ? 1 : 0} />
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  color = "dashboard",
  delay = 0,
}: {
  icon: React.ElementType
  title: string
  description: string
  color?: "dashboard" | "prediction" | "ai" | "risk" | "financial" | "investment"
  delay?: number
}) {
  const colorMap = {
dashboard: {
  icon: "#3B82F6",
  bg: "bg-blue-500/5",
  hover: "group-hover:bg-blue-500/10",
  border: "border-t-blue-500",
  glow: "group-hover:shadow-[0_0_25px_rgba(59,130,246,0.35)]"
},
    prediction: {
  icon: "#6366F1",
  bg: "bg-indigo-500/5",
  hover: "group-hover:bg-indigo-500/10",
  border: "border-t-indigo-500",
  glow: "group-hover:shadow-[0_0_25px_rgba(99,102,241,0.35)]"
}
,
   ai: {
  icon: "#D946EF",
  bg: "bg-fuchsia-500/5",
  hover: "group-hover:bg-fuchsia-500/10",
  border: "border-t-fuchsia-500",
  glow: "group-hover:shadow-[0_0_25px_rgba(217,70,239,0.35)]"
}
,
   risk: {
  icon: "#F59E0B",
  bg: "bg-amber-500/5",
  hover: "group-hover:bg-amber-500/10",
  border: "border-t-amber-500",
  glow: "group-hover:shadow-[0_0_25px_rgba(245,158,11,0.35)]"
}
,
   financial: {
  icon: "#10B981",
  bg: "bg-emerald-500/5",
  hover: "group-hover:bg-emerald-500/10",
  border: "border-t-emerald-500",
  glow: "group-hover:shadow-[0_0_25px_rgba(16,185,129,0.35)]"
}
,
    investment: {
  icon: "#06B6D4",
  bg: "bg-cyan-500/5",
  hover: "group-hover:bg-cyan-500/10",
  border: "border-t-cyan-500",
  glow: "group-hover:shadow-[0_0_25px_rgba(6,182,212,0.35)]"
}

}

  const colorStyle = colorMap[color]

  return (
    <div
      className={`p-6 rounded-xl glass-card border-t-4 ${colorStyle.border} card-hover opacity-0 animate-fade-in-up group`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`w-12 h-12 rounded-lg ${colorStyle.bg} flex items-center justify-center mb-4 ${colorStyle.hover} transition-colors`}>
        <Icon className="w-6 h-6" style={{ color: colorStyle.icon }} />
      </div>
      <h3 className="text-lg font-semibold text-card-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
