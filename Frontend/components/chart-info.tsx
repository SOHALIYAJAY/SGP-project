"use client"

import React from "react"

export default function ChartInfo({
  title,
  description,
}: {
  title?: string
  description: string
}) {
  return (
    <div className="mt-3 text-left">
      {title && <div className="text-xs font-medium text-muted-foreground mb-1">{title}</div>}
      <div className="text-xs text-muted-foreground">{description}</div>
    </div>
  )
}
