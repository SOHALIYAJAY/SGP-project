import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SectionHeader } from "@/components/ui/section-header";
import {
  Info,
  Lightbulb,
  Layers,
  GraduationCap,
  Building2,
  Mail,
  MapPin,
} from "lucide-react";

const objectives = [
  "Develop a comprehensive business analysis platform for data-driven decision making",
  "Implement multi-dimensional scoring system for business health assessment",
  "Create predictive models for growth, profitability, and failure probability",
  "Design intuitive visualizations for complex business metrics",
  "Provide actionable AI-powered recommendations for business optimization",
];

const modules = [
  { name: "Company Data Input", description: "Multi-section form for comprehensive data collection" },
  { name: "Business Analysis Dashboard", description: "KPI visualization and health scoring" },
  { name: "Prediction Engine", description: "ML-powered forecasting and trend analysis" },
  { name: "Customer Analytics", description: "Satisfaction, retention, and churn metrics" },
  { name: "Market Analysis", description: "Competition and opportunity assessment" },
  { name: "Financial Analysis", description: "Revenue, profitability, and efficiency tracking" },
  { name: "Risk Assessment", description: "Multi-factor risk evaluation and sustainability" },
  { name: "AI Recommendations", description: "Strategic insights and improvement suggestions" },
];

export default function AboutPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <SectionHeader
          title="About This Project"
          subtitle="Business Analysis & Prediction System - SGP Project"
          icon={Info}
        />

        {/* Project Overview */}
        <div className="glass-card p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
              <Building2 className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Business Analysis & Prediction System</h2>
              <p className="text-muted-foreground">
                A comprehensive web-based platform designed to analyze business data and provide 
                predictive insights for investors, analysts, and decision-makers. This system 
                combines rule-based analysis with machine learning predictions to deliver actionable 
                business intelligence.
              </p>
            </div>
          </div>
        </div>

        {/* Objectives */}
        <div className="glass-card p-6">
          <SectionHeader
            title="Project Objectives"
            subtitle="Key goals and deliverables"
            icon={Lightbulb}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {objectives.map((objective, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 border border-border"
              >
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary-foreground">{index + 1}</span>
                </div>
                <p className="text-sm">{objective}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Modules */}
        <div className="glass-card p-6">
          <SectionHeader
            title="Key Modules"
            subtitle="System components and functionality"
            icon={Layers}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((module, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-primary/5 border border-primary/20 hover:border-primary/40 transition-colors"
              >
                <h4 className="font-semibold text-sm mb-1">{module.name}</h4>
                <p className="text-xs text-muted-foreground">{module.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Relevance */}
        <div className="glass-card p-6">
          <SectionHeader
            title="Academic & Industry Relevance"
            subtitle="SGP project significance"
            icon={GraduationCap}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <h4 className="font-semibold mb-2 text-success">Academic Value</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Demonstrates full-stack development capabilities</li>
                <li>• Showcases data visualization and analytics skills</li>
                <li>• Applies software engineering best practices</li>
                <li>• Integrates multiple technologies cohesively</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-info/10 border border-info/20">
              <h4 className="font-semibold mb-2 text-info">Industry Application</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Real-world business intelligence use case</li>
                <li>• Applicable to VC/PE due diligence processes</li>
                <li>• Scalable for enterprise deployment</li>
                <li>• Foundation for AI-enhanced decision making</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="glass-card p-6">
            <SectionHeader
              title="Contact Information"
              subtitle="Get in touch"
              icon={Mail}
            />
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 border border-border">
                <Building2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Institution</p>
                  <p className="text-sm text-muted-foreground">Your College Name</p>
                  <p className="text-xs text-muted-foreground">Department of Computer Engineering</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 border border-border">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Location</p>
                  <p className="text-sm text-muted-foreground">Your City, State, Country</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 border border-border">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Email</p>
                  <p className="text-sm text-muted-foreground">project@college.edu</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 border border-border">
                <GraduationCap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Academic Year</p>
                  <p className="text-sm text-muted-foreground">SGP Project 2024-25</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
