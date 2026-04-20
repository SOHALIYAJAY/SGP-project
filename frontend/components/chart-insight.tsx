"use client"

import React, { useState } from "react"
import { Plus, X } from "lucide-react"

export default function ChartInsight({
  title,
  level = "Low",
  bullets = [],
  summary = "",
}: {
  title?: string
  level?: "Low" | "Medium" | "High"
  bullets?: string[]
  summary?: string
}) {
  const [open, setOpen] = useState(false)

  const levelStyles: Record<string, { badge: string }> = {
    Low: { badge: "bg-success/10 text-success" },
    Medium: { badge: "bg-warning/10 text-warning" },
    High: { badge: "bg-destructive/10 text-destructive" },
  }

  const accent: Record<string, string> = {
    Low: "bg-success",
    Medium: "bg-warning",
    High: "bg-destructive",
  }

  return (
    <div className="relative inline-block">
      <button
        aria-expanded={open}
        aria-label="Show chart insight"
        onClick={() => setOpen((s) => !s)}
        className="w-8 h-8 rounded-full bg-card/80 border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary/60 transition"
      >
        <Plus className="w-4 h-4" />
      </button>

      <div
        className={`origin-top-right absolute right-0 top-0 transform transition-all duration-200 ease-out z-40 pointer-events-auto ${
          open ? "opacity-100 translate-y-10" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="w-[340px] max-w-xs relative rounded-lg shadow-lg p-0 overflow-hidden">
          <div className={`absolute left-0 top-0 bottom-0 w-1 ${accent[level]} bg-opacity-90`} aria-hidden />

          <div className="bg-white dark:bg-slate-900 border border-border p-4 pl-5 rounded-r-lg">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                {title && <div className="text-sm font-semibold text-foreground mb-1">{title}</div>}
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded ${levelStyles[level].badge}`}>{level}</span>
                  {summary && <div className="text-xs text-muted-foreground">{summary}</div>}
                </div>
              </div>
              <button aria-label="Close insight" onClick={() => setOpen(false)} className="text-muted-foreground p-1 rounded hover:bg-secondary/50">
                <X className="w-4 h-4" />
              </button>
            </div>

            <ul className="mt-3 text-sm text-muted-foreground space-y-2 list-inside list-disc">
              {bullets.slice(0, 3).map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>

            <div className="mt-3 flex justify-end">
              <button className="text-sm px-3 py-1 rounded bg-primary text-white">View details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
