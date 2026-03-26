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
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/company-input", label: "Company Input", icon: Building2 },
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
      {/* Enhanced Desktop Sidebar */}
      <aside
        className={cn(
          "sticky left-0 top-0 h-screen z-50 hidden lg:flex flex-col transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-56"
        )}
      >
        {/* Enhanced Animated background */}
        <div className="absolute inset-0 bg-[#0A0F1E]/95 backdrop-blur-xl overflow-hidden border-r border-white/5">
          {/* Enhanced floating orbs */}
          <div className="absolute top-20 left-4 w-40 h-40 bg-primary/8 rounded-full blur-3xl animate-orb-float" />
          <div className="absolute bottom-32 right-0 w-32 h-32 bg-accent/8 rounded-full blur-2xl animate-orb-float" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.8s' }} />
          
          {/* Enhanced animated light line on right edge */}
          <div className="absolute right-0 top-0 w-px h-full overflow-hidden">
            <div className="h-full w-full bg-gradient-to-b from-transparent via-primary/30 to-transparent animate-border-light" 
                 style={{ position: 'absolute', top: '0%', animationDuration: '3s' }} />
            <div className="h-full w-full bg-gradient-to-b from-transparent via-accent/20 to-transparent animate-border-light" 
                 style={{ position: 'absolute', top: '0%', animationDelay: '1.5s', animationDuration: '3s' }} />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Logo Section - Completely Removed */}
          <div className={cn(
            "flex items-center h-16 px-4 border-b border-white/10",
            collapsed ? "justify-center" : "gap-3"
          )}>
          </div>

          {/* Enhanced Navigation Items */}
          <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {navItems.map((item, index) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-medium transition-all duration-300 hover:scale-105",
                    collapsed && "justify-center px-2 py-2",
                    isActive
                      ? "text-primary shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Simplified Active/Hover background - removed blue colors */}
                  <div className={cn(
                    "absolute inset-0 rounded-2xl transition-all duration-300",
                    isActive 
                      ? "bg-gray-800/20 border border-gray-600/40" 
                      : "bg-transparent group-hover:bg-gray-700/10 group-hover:border-gray-600/30"
                  )}>
                    {/* Simplified inner glow for active state */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-2xl bg-gray-700/10" />
                    )}
                    {/* Removed shimmer effect */}
                  </div>

                  {/* Simplified Icon - removed blue colors */}
                  <Icon className={cn(
                    "relative z-10 w-5 h-5 transition-all duration-300",
                    !collapsed && "group-hover:scale-110"
                  )} />
                   
                  {!collapsed && (
                    <span className={cn(
                      "relative z-10 font-medium transition-all duration-300"
                    )}>{item.label}</span>
                  )}

                  {/* Enhanced Tooltip for collapsed state */}
                  {collapsed && (
                    <div className="absolute left-full ml-3 px-3 py-2 rounded-xl bg-card/95 backdrop-blur-xl border border-border/80 text-sm font-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50 shadow-2xl">
                      {item.label}
                      <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-card/95 border-l border-b border-border rotate-45" />
                    </div>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Simplified CTA Section - Removed Button */}
          <div className={cn("p-4 border-t border-border/60", collapsed && "px-2")}>
          </div>

          {/* Simplified Collapse Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
          </button>
        </div>
      </aside>

      {/* Mobile Header - Logo Removed */}
      <header className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-[#0A0F1E]/95 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between h-14 px-4">
             
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
          <div className="bg-[#0A0F1E]/95 backdrop-blur-xl border-t border-white/5 animate-fade-in">
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
      <div className="lg:hidden h-14" />
    </>
  )
}
