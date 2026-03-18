import type { Analysis } from "./types"

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n))
}

function toNum(v: unknown, fallback = 0) {
  const n = typeof v === "number" ? v : Number(String(v ?? "").trim())
  return Number.isFinite(n) ? n : fallback
}

function gradeFromScore(score: number): Analysis["dashboard"]["investmentReadinessGrade"] {
  if (score >= 90) return "A"
  if (score >= 85) return "A-"
  if (score >= 78) return "B+"
  if (score >= 70) return "B"
  if (score >= 62) return "B-"
  if (score >= 55) return "C+"
  return "C"
}

function riskLevelFromProb(pct: number): Analysis["dashboard"]["riskLevel"] {
  if (pct >= 55) return "High"
  if (pct >= 30) return "Medium"
  return "Low"
}

export function buildAnalysis(params: {
  companyName: string
  input: Record<string, unknown>
  model: { targetColumn: string; problemType: "regression" | "classification" }
  prediction: { value?: number; classIndex?: number; classLabel?: string }
}): Analysis {
  const now = new Date().toISOString()

  // These map from your existing Company Input form field names
  const annualRevenue = toNum(params.input.revenue, toNum(params.input.Revenue, 0))
  const annualExpenses = toNum(params.input.expenses, 0)
  const burnRateMonthly = toNum(params.input.burnRate, toNum(params.input.Burn_Rate, 0))
  const cashBalance = toNum(params.input.cashBalance, 0)
  const customerCount = toNum(params.input.customerCount, 0)
  const churnRatePercent = toNum(params.input.churnRate, 0)
  const nps = toNum(params.input.nps, 0)
  const marketSizeB = toNum(params.input.marketSize, 0)
  const competitorCount = toNum(params.input.competitorCount, 0)
  const growthRatePercent = toNum(params.input.growthRate, 0)
  const marketSharePercent = toNum(params.input.marketShare, 0)

  const profit = annualRevenue - annualExpenses
  const profitMarginPercent =
    annualRevenue > 0 ? clamp((profit / annualRevenue) * 100, -100, 100) : 0

  const runwayMonths =
    burnRateMonthly > 0 ? clamp(cashBalance / burnRateMonthly, 0, 120) : 120

  // Interpret model prediction as “failure probability” when classification target is a flag.
  // If regression, we map it into a probability-ish number conservatively.
  let failureProbabilityPercent = 18
  if (params.model.problemType === "classification") {
    const label = (params.prediction.classLabel ?? String(params.prediction.classIndex ?? "")).toLowerCase()
    const idx = params.prediction.classIndex ?? (label === "1" ? 1 : 0)
    failureProbabilityPercent = idx === 1 ? 65 : 18
  } else if (typeof params.prediction.value === "number" && Number.isFinite(params.prediction.value)) {
    // squash to 0-100 using a simple clamp; real calibration can be added later
    failureProbabilityPercent = clamp(Math.abs(params.prediction.value), 0, 100)
  }

  // Risk score: combine model + burn + churn
  const burnPressure = burnRateMonthly > 0 && annualRevenue > 0 ? clamp((burnRateMonthly * 12) / annualRevenue, 0, 3) : 0
  const churnPressure = clamp(churnRatePercent / 10, 0, 3)
  const baseRisk = failureProbabilityPercent
  const overallRiskScore = clamp(baseRisk + burnPressure * 10 + churnPressure * 10 - clamp(profitMarginPercent, -100, 100) * 0.1, 0, 100)

  const businessHealthScore = clamp(
    100 -
      overallRiskScore * 0.6 +
      clamp(profitMarginPercent, -50, 50) * 0.4 +
      clamp(growthRatePercent, -50, 150) * 0.1,
    0,
    100
  )

  const opportunityScore = clamp(
    50 +
      clamp(growthRatePercent, 0, 150) * 0.25 +
      clamp(marketSizeB, 0, 1000) * 0.02 -
      clamp(competitorCount, 0, 200) * 0.1 +
      clamp(marketSharePercent, 0, 100) * 0.2,
    0,
    100
  )

  const retentionPercent = clamp(100 - churnRatePercent, 0, 100)
  const readinessScore = clamp(
    businessHealthScore * 0.5 + opportunityScore * 0.3 + clamp(nps, 0, 100) * 0.2,
    0,
    100
  )

  return {
    meta: {
      companyName: params.companyName || "Company",
      generatedAt: now,
      model: params.model,
    },
    dashboard: {
      businessHealthScore: Math.round(businessHealthScore),
      riskLevel: riskLevelFromProb(failureProbabilityPercent),
      investmentReadinessGrade: gradeFromScore(readinessScore),
      failureProbabilityPercent: Math.round(clamp(failureProbabilityPercent, 0, 100)),
    },
    financial: {
      annualRevenue,
      annualExpenses,
      profitMarginPercent: Math.round(profitMarginPercent * 10) / 10,
      burnRateMonthly,
      runwayMonths: Math.round(runwayMonths),
    },
    market: {
      marketSizeB,
      competitorCount,
      growthRatePercent,
      marketSharePercent,
      opportunityScore: Math.round(opportunityScore),
    },
    customer: {
      customerCount,
      churnRatePercent,
      nps,
      retentionPercent: Math.round(retentionPercent * 10) / 10,
    },
    risk: {
      overallRiskScore: Math.round(overallRiskScore),
    },
  }
}

