import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle,
  Database,
  Globe,
  LineChart,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "Business Health Score",
    description: "Comprehensive scoring system analyzing multiple dimensions of business performance.",
  },
  {
    icon: TrendingUp,
    title: "Growth & Profitability",
    description: "Predictive analytics for revenue growth and profit margin forecasting.",
  },
  {
    icon: Shield,
    title: "Risk & Failure Analysis",
    description: "Early warning system for potential business risks and failure indicators.",
  },
  {
    icon: Users,
    title: "Customer Analytics",
    description: "Deep insights into customer behavior, retention, and satisfaction metrics.",
  },
  {
    icon: Globe,
    title: "Market Analysis",
    description: "Competitive landscape and market opportunity assessment tools.",
  },
  {
    icon: Brain,
    title: "AI Recommendations",
    description: "Intelligent suggestions for optimization and strategic decision-making.",
  },
];

const workflowSteps = [
  { icon: Database, title: "Input", description: "Enter company data" },
  { icon: BarChart3, title: "Analysis", description: "Multi-dimensional analysis" },
  { icon: LineChart, title: "Prediction", description: "ML-powered forecasting" },
  { icon: Sparkles, title: "Insights", description: "Actionable recommendations" },
];

const stats = [
  { value: "50+", label: "Analysis Metrics" },
  { value: "12", label: "Report Types" },
  { value: "98%", label: "Accuracy Rate" },
  { value: "Real-time", label: "Processing" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">BizAnalytics</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link to="/dataset" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Dataset
            </Link>
            <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
          </div>
          <Link to="/input">
            <Button className="bg-gradient-primary hover:opacity-90 transition-opacity text-primary-foreground">
              Start Analysis
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in-up">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Business Intelligence</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up stagger-1">
            Business Analysis &{" "}
            <span className="text-gradient-primary">Prediction System</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up stagger-2">
            Transform raw business data into actionable insights. Make data-driven decisions with
            advanced analytics, predictive modeling, and AI-powered recommendations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-3">
            <Link to="/input">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-primary-foreground px-8 py-6 text-lg glow-primary">
                Start Analysis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-primary/30 hover:bg-primary/10">
                View Demo Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 border-y border-border bg-card/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-gradient-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our streamlined process transforms your business data into valuable insights in just four steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2 z-0" />
            
            {workflowSteps.map((step, index) => (
              <div
                key={index}
                className="glass-card-hover p-6 text-center relative z-10 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Analysis Suite</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need to analyze, predict, and optimize business performance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-card-hover p-6 group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="glass-card p-8 md:p-12 text-center border-gradient relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
            <div className="relative z-10">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Start your comprehensive business analysis today and unlock insights that drive growth.
              </p>
              <Link to="/input">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-primary-foreground px-8 py-6 text-lg">
                  Start Free Analysis
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border bg-card/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <Activity className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg">BizAnalytics</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-md">
                Business Analysis & Prediction System - A comprehensive platform for data-driven
                business intelligence and predictive analytics.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
                <li><Link to="/input" className="hover:text-foreground transition-colors">Start Analysis</Link></li>
                <li><Link to="/about" className="hover:text-foreground transition-colors">About Project</Link></li>
                <li><Link to="/dataset" className="hover:text-foreground transition-colors">Dataset Info</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>SGP Project 2024-25</li>
                <li>Computer Engineering</li>
                <li>contact@bizanalytics.edu</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 Business Analysis & Prediction System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
