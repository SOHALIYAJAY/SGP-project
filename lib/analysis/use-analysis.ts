"use client"

import React from "react"
import type { Analysis } from "./types"
import { getStoredAnalysis } from "./client"

export function useStoredAnalysis() {
  const [analysis, setAnalysis] = React.useState<Analysis | null>(null)

  React.useEffect(() => {
    setAnalysis(getStoredAnalysis())
  }, [])

  return analysis
}

