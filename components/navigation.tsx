"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Home,
  Building2,
  LayoutDashboard,
  TrendingUp,
  Users,
  Globe,
  DollarSign,
  Shield,
  Lightbulb,
  PiggyBank,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/company-input", label: "Company Input", icon: Building2 },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/predictions", label: "Predictions", icon: TrendingUp },
  { href: "/customer-analytics", label: "Customers", icon: Users },
  { href: "/market-analysis", label: "Market", icon: Globe },
  { href: "/financial-analysis", label: "Financial", icon: DollarSign },
  { href: "/risk-assessment", label: "Risk", icon: Shield },
  { href: "/recommendations", label: "AI Insights", icon: Lightbulb },
  { href: "/investment", label: "Investment", icon: PiggyBank },
]

export function Navigation() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen z-50 hidden lg:flex flex-col transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-48"
        )}
      >
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-slate-950 overflow-hidden">
          {/* Floating orbs */}
          <div className="absolute top-20 left-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-orb-float" />
          <div className="absolute bottom-40 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl animate-orb-float" style={{ animationDelay: '1s' }} />
          
          {/* Animated light line on the right edge */}
          <div className="absolute right-0 top-0 w-px h-full overflow-hidden">
            <div className="h-20 w-full bg-gradient-to-b from-transparent via-primary to-transparent animate-border-light" 
                 style={{ position: 'absolute', top: '0%' }} />
          </div>
        </div>

        {/* Sidebar border with glow effect */}
        <div className="absolute right-0 top-0 h-full w-px bg-border/30" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Logo */}
          <div className={cn(
            "flex items-center h-20 px-4 border-b border-border/50",
            collapsed ? "justify-center" : "gap-3"
          )}>
            <div className="relative group">
              {/* Logo glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity animate-pulse-glow" />
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-foreground gradient-text">BAPS</span>
                <span className="text-[10px] text-muted-foreground">Business Analysis</span>
              </div>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {navItems.map((item, index) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all duration-300",
                    collapsed && "justify-center px-2",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Active/Hover background with glow */}
                  <div className={cn(
                    "absolute inset-0 rounded-xl transition-all duration-300",
                    isActive 
                      ? "bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/30 shadow-[0_0_25px_rgba(6,182,212,0.25),inset_0_1px_1px_rgba(255,255,255,0.1)]" 
                      : "bg-transparent group-hover:bg-gradient-to-r group-hover:from-secondary/60 group-hover:to-secondary/30 group-hover:border group-hover:border-border/50"
                  )}>
                    {/* Inner glow for active state */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-transparent" />
                    )}
                    {/* Shimmer effect on hover */}
                    {!isActive && (
                      <div className="absolute inset-0 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                      </div>
                    )}
                  </div>

                  {/* Active indicator light */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-gradient-to-b from-primary to-accent shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
                  )}

                  <Icon className={cn(
                    "relative z-10 w-5 h-5 transition-all duration-300",
                    isActive && "scale-110 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]",
                    !collapsed && "group-hover:scale-110"
                  )} />
                  
                  {!collapsed && (
                    <span className={cn(
                      "relative z-10 font-medium transition-all duration-300",
                      isActive && "drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                    )}>{item.label}</span>
                  )}

                  {/* Tooltip for collapsed state */}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-3 py-2 rounded-lg bg-card border border-border text-sm font-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-xl">
                      {item.label}
                      <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-card border-l border-b border-border rotate-45" />
                    </div>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* CTA Button */}
          <div className={cn("p-4 border-t border-border/50", collapsed && "px-2")}>
            <Link href="/company-input">
              <Button className={cn(
                "relative w-full overflow-hidden bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]",
                collapsed && "px-0"
              )}>
                {/* Button shimmer effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
                <span className="relative z-10">
                  {collapsed ? <TrendingUp className="w-5 h-5" /> : "Start Analysis"}
                </span>
              </Button>
            </Link>
          </div>

          {/* Collapse Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-24 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors shadow-lg"
          >
            {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 lg:hidden glass">
        <div className="flex items-center justify-between h-16 px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-lg blur-md opacity-50" />
              <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
            <span className="font-bold gradient-text">BAPS</span>
          </Link>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="glass border-t border-border animate-fade-in">
            <div className="px-4 py-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {navItems.map((item, index) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 animate-fade-in-up",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    )}
                    style={{ animationDelay: `${index * 0.03}s` }}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                    )}
                  </Link>
                )
              })}
              <div className="pt-4 border-t border-border">
                <Link href="/company-input" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold">
                    Start Analysis
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer for content */}
      <div className={cn("hidden lg:block transition-all duration-300", collapsed ? "w-16" : "w-48")} />
      <div className="lg:hidden h-16" />
    </>
  )
}
