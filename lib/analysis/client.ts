import type { Analysis } from "./types"

const KEY = "baps:analysis"

export function getStoredAnalysis(): Analysis | null {
  if (typeof window === "undefined") return null
  const raw = window.sessionStorage.getItem(KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as Analysis
  } catch {
    return null
  }
}

export function setStoredAnalysis(a: Analysis) {
  if (typeof window === "undefined") return
  window.sessionStorage.setItem(KEY, JSON.stringify(a))
}

