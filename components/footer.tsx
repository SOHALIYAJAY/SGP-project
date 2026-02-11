"use client"

import Link from "next/link"
import { ShieldCheck, Activity, Github, Linkedin, Mail, Sparkles, Lock } from "lucide-react"

export default function Footer() {
  return (
  <footer className="w-full border-t border-border bg-gradient-to-b from-background to-background/50 backdrop-blur-sm mt-8">      
      {/* Container aligned with main content */}
        <div className="px-6 lg:px-10 xl:px-16 pt-6 pb-4">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-6">

          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <Activity className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">BAPS</h3>
                <p className="text-xs text-muted-foreground">
                  Business Analysis & Prediction
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              AI-powered business analysis, prediction, and decision support platform.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-success/10 text-success text-xs font-medium">
                <Lock className="w-3 h-3" /> Secure
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                <Sparkles className="w-3 h-3" /> AI-Powered
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-accent/10 text-accent text-xs font-medium">
                <ShieldCheck className="w-3 h-3" /> Enterprise-Ready
              </span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Product</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "Company Input", href: "/company-input" },
                { label: "Dashboard", href: "/dashboard" },
                { label: "Predictions", href: "/predictions" },
                { label: "Market Analysis", href: "/market-analysis" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Analytics */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Analytics</h4>
            <ul className="space-y-2">
              {[
                { label: "Customer Analytics", href: "/customer-analytics" },
                { label: "Financial Analysis", href: "/financial-analysis" },
                { label: "Risk Assessment", href: "/risk-assessment" },
                { label: "Investment Insights", href: "/investment" },
                { label: "AI Recommendations", href: "/recommendations" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Features</h4>
            <ul className="space-y-2">
              {[
                "Business Health Score",
                "Growth Forecasting",
                "Failure Probability",
                "Risk Analysis",
                "Investment Readiness",
              ].map((feature) => (
                <li key={feature}>
                  <span className="text-sm text-muted-foreground">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Support</h4>
            <ul className="space-y-2 mb-4">
              {[
                { label: "About Project", href: "#" },
                { label: "Documentation", href: "#" },
                { label: "Privacy Policy", href: "#" },
                { label: "Terms & Conditions", href: "#" },
                { label: "Contact", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              {[
                { icon: Github, label: "GitHub", href: "#" },
                { icon: Linkedin, label: "LinkedIn", href: "#" },
                { icon: Mail, label: "Email", href: "mailto:contact@baps.com" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2 rounded-lg bg-secondary/40 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50 mb-4" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            © 2026 BAPS. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/70 text-center md:text-right max-w-2xl">
            This system provides analytical insights and predictions for educational and decision-support purposes.
          </p>
        </div>

      </div>
    </footer>
  )
}
