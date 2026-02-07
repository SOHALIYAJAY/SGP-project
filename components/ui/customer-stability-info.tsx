"use client"

import * as React from "react"
import { X, Plus } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

type Status = "low" | "medium" | "high"

interface Metrics {
  stable: number
  atRisk: number
  churned: number
}

interface CustomerStabilityInfoProps {
  title?: string
  statusLabel?: string
  status?: Status
  summary?: string
  metrics?: Metrics
  recommendation?: string
}

const statusClasses: Record<Status, string> = {
  low: "bg-success/10 text-success",
  medium: "bg-warning/10 text-warning",
  high: "bg-destructive/10 text-destructive",
}

const accentClasses: Record<Status, string> = {
  low: "bg-success",
  medium: "bg-warning",
  high: "bg-destructive",
}

export default function CustomerStabilityInfo({
  title = "Customer Stability",
  statusLabel = "Medium Risk",
  status = "medium",
  summary = "Most customers remain active, but a notable segment is at risk.",
  metrics = { stable: 70, atRisk: 20, churned: 10 },
  recommendation = "Prioritize targeted retention campaigns for the at-risk segment.",
}: CustomerStabilityInfoProps) {
  const [open, setOpen] = React.useState(false)
  const panelRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    if (open) {
      document.addEventListener("keydown", onKey)
      // focus the panel for accessibility
      panelRef.current?.focus()
    }
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <div className="relative inline-block">
      <button
        aria-expanded={open}
        aria-controls="customer-stability-panel"
        aria-label={`Show ${title} info`}
        onClick={() => setOpen((s) => !s)}
        className="w-8 h-8 rounded-full bg-card/80 border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary/60 transition"
      >
        <Plus className="w-4 h-4" />
      </button>

      <div
        id="customer-stability-panel"
        role="dialog"
        aria-labelledby="customer-stability-title"
        tabIndex={-1}
        ref={panelRef}
        className={`origin-top-right absolute right-0 top-0 transform z-40 transition-all duration-200 ease-out pointer-events-auto w-[360px] max-w-xs ${
          open ? "opacity-100 translate-y-6" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <Card className="relative overflow-hidden rounded-lg border bg-white dark:bg-slate-900 text-card-foreground shadow-lg">
          <div className={`absolute left-0 top-0 bottom-0 w-1 ${accentClasses[status]} bg-opacity-90`} aria-hidden />

          <CardHeader className="flex items-start justify-between p-4 pt-3 pl-4">
            <div className="flex-1 pr-3">
              <CardTitle id="customer-stability-title" className="text-base font-semibold">
                {title}
              </CardTitle>
              <div className="mt-2 flex items-center gap-2">
                <span className={`text-xs font-medium px-2 py-1 rounded ${statusClasses[status]}`}>{statusLabel}</span>
              </div>
            </div>
            <button
              aria-label="Close panel"
              onClick={() => setOpen(false)}
              className="text-muted-foreground p-1 rounded hover:bg-secondary/50"
            >
              <X className="w-4 h-4" />
            </button>
          </CardHeader>

          <CardContent className="pt-2">
            <p className="text-sm text-muted-foreground mb-4 pr-2">{summary}</p>

            <div className="space-y-3">
              {[
                { key: 'stable', label: 'Stable customers', value: metrics.stable, color: 'bg-success' },
                { key: 'atRisk', label: 'At risk', value: metrics.atRisk, color: 'bg-warning' },
                { key: 'churned', label: 'Churned', value: metrics.churned, color: 'bg-destructive' },
              ].map((m) => (
                <div key={m.key} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{m.label}</span>
                      <span className={`text-sm font-semibold ${m.color === 'bg-success' ? 'text-success' : m.color === 'bg-warning' ? 'text-warning' : 'text-destructive'}`}>{m.value}%</span>
                    </div>
                    <div className="h-2 bg-border/30 rounded mt-2 overflow-hidden">
                      <div className={`${m.color} h-2 rounded`} style={{ width: `${m.value}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border/60 my-3" />

            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-medium">Recommended action</h4>
              <p className="text-sm text-muted-foreground">{recommendation}</p>
              <div className="mt-2 flex justify-end">
                <button className="inline-flex items-center rounded-md bg-primary px-3 py-1 text-sm font-medium text-white hover:opacity-95">View plan</button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
