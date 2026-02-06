"use client"

import React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AnimatedCounter } from "@/components/ui/animated-counter"
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
import Footer from "@/components/footer"
import HeroParticles from "@/components/hero-particles"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 opacity-0 animate-fade-in-up stagger-1">
              Business Analysis &{" "}
              <span className="gradient-text">Prediction System</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in-up stagger-2 text-pretty">
              Transform raw business data into actionable insights. Analyze company health, 
              predict growth trajectories, and make data-driven decisions with confidence.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up stagger-3">
              <Link href="/company-input">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-all duration-300 group px-8">
                  Start Company Analysis
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="border-border hover:bg-secondary/50 px-8 bg-transparent">
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
              delay={400}
            />
            <StatCard
              value={2500}
              suffix="+"
              label="Reports Generated"
              delay={500}
            />
            <StatCard
              value={150}
              suffix="+"
              label="Data Points Analyzed"
              delay={600}
            />
            <StatCard
              value={24}
              suffix="/7"
              label="Real-time Monitoring"
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
              delay={100}
            />
            <FeatureCard
              icon={TrendingUp}
              title="Growth Predictions"
              description="AI-powered forecasts for revenue, customer base, and market expansion"
              delay={200}
            />
            <FeatureCard
              icon={Brain}
              title="AI Recommendations"
              description="Actionable insights prioritized by impact and urgency for your business"
              delay={300}
            />
            <FeatureCard
              icon={Shield}
              title="Risk Assessment"
              description="Comprehensive risk analysis across financial, operational, and market factors"
              delay={400}
            />
            <FeatureCard
              icon={LineChart}
              title="Financial Analysis"
              description="Deep dive into revenue, profit margins, burn rate, and runway projections"
              delay={500}
            />
            <FeatureCard
              icon={CheckCircle2}
              title="Investment Readiness"
              description="Evaluate funding potential and get tailored investment recommendations"
              delay={600}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function StatCard({
  value,
  suffix = "",
  label,
  delay = 0,
}: {
  value: number
  suffix?: string
  label: string
  delay?: number
}) {
  return (
    <div
      className="text-center p-6 rounded-xl glass card-hover opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
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
  delay = 0,
}: {
  icon: React.ElementType
  title: string
  description: string
  delay?: number
}) {
  return (
    <div
      className="p-6 rounded-xl bg-card border border-border card-hover opacity-0 animate-fade-in-up group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-card-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
