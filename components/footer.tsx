"use client"

import { ShieldCheck, Activity, Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-background/70 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Top Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Left: Brand + Trust */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground">
                BAPS – Business Analysis & Prediction System
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-success" />
                Secure • AI-Powered • Enterprise-Ready
              </p>
            </div>
          </div>

          {/* Center: Meta Info */}
          <div className="text-xs text-muted-foreground text-center">
            Version <span className="text-foreground font-medium">1.0</span> •
            Built for <span className="text-primary font-medium">SGP Project</span>
          </div>

          {/* Right: Social / Contact */}
          <div className="flex items-center gap-3">
            {[
              { icon: Github, label: "GitHub" },
              { icon: Linkedin, label: "LinkedIn" },
              { icon: Mail, label: "Email" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="p-2 rounded-lg bg-secondary/40 hover:bg-primary/20 transition-all hover:scale-105"
              >
                <Icon className="w-4 h-4 text-muted-foreground hover:text-primary" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-6 pt-4 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} BAPS. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-muted-foreground">Privacy</span>
            <span className="text-muted-foreground">Terms</span>
            <span className="text-muted-foreground">Support</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
