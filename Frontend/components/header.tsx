"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Home,
  Building2,
  TrendingUp,
  Users,
  Globe,
  DollarSign,
  Shield,
  Lightbulb,
  PiggyBank,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const headerNavItems = [
  { href: "/company-input", label: "Company Input", icon: Building2 },
  { href: "#about", label: "About", icon: Lightbulb },
]

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Enhanced Header with better styling */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0A0F1E]/95 backdrop-blur-xl shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Enhanced Logo and Brand */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/40 rounded-xl blur-xl opacity-80 group-hover:opacity-90 transition-all duration-300 animate-pulse" />
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl border border-white/20">
                  <BarChart3 className="w-7 h-7 text-primary-foreground drop-shadow-lg" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-foreground text-xl gradient-text drop-shadow-md">NexusAI</span>
                <span className="text-[11px] text-muted-foreground font-medium tracking-wide">Intelligent Analytics</span>
              </div>
            </Link>

            {/* Enhanced Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {headerNavItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-3 whitespace-nowrap",
                      isActive
                        ? "bg-primary/25 text-primary border border-primary/50 shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/15 hover:border-border/40"
                    )}
                  >
                    <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    <span className="hidden lg:inline font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Enhanced Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-accent/20 transition-colors duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 transition-transform duration-300" />
              ) : (
                <Menu className="w-6 h-6 transition-transform duration-300" />
              )}
            </Button>
          </div>

          {/* Enhanced Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-white/10 bg-[#0A0F1E]/95 backdrop-blur-xl animate-fade-in">
              <div className="px-4 py-6 space-y-2">
                {headerNavItems.map((item, index) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 animate-fade-in-up",
                        isActive
                          ? "bg-primary/25 text-primary border border-primary/50 shadow-lg"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/15"
                      )}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <Icon className="w-6 h-6 transition-transform duration-300" />
                      <span className="font-medium">{item.label}</span>
                      {isActive && (
                        <div className="ml-auto w-2 h-2 rounded-full bg-primary shadow-lg animate-pulse" />
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
