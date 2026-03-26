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

/**
 * Compute failure probability from real business fundamentals.
 * Returns a value in [2, 95] — never 0% (uncertainty always exists)
 * and never 100% (company is still operating).
 *
 * Factors (each contributes independently):
 *  - Runway risk:      short runway = high failure risk
 *  - Burn pressure:    annual burn vs revenue ratio
 *  - Churn risk:       high churn erodes revenue base
 *  - Profitability:    negative margin increases failure risk
 *  - Growth signal:    strong growth reduces failure risk
 *  - Revenue scale:    larger revenue = more resilient
 */
function computeFailureProbability(params: {
  runwayMonths: number
  burnRateMonthly: number
  annualRevenue: number
  profitMarginPercent: number
  churnRatePercent: number
  growthRatePercent: number
}): number {
  const { runwayMonths, burnRateMonthly, annualRevenue, profitMarginPercent, churnRatePercent, growthRatePercent } = params

  // ── 1. Runway risk (0–35 pts) ──────────────────────────────────────────────
  // < 3 months = critical (35), 3–6 = severe (25), 6–12 = high (15),
  // 12–18 = moderate (8), 18–24 = low (4), > 24 = minimal (1)
  let runwayRisk: number
  if (runwayMonths <= 0)       runwayRisk = 40
  else if (runwayMonths < 3)   runwayRisk = 35
  else if (runwayMonths < 6)   runwayRisk = 25
  else if (runwayMonths < 12)  runwayRisk = 15
  else if (runwayMonths < 18)  runwayRisk = 8
  else if (runwayMonths < 24)  runwayRisk = 4
  else                         runwayRisk = 1

  // ── 2. Burn pressure (0–25 pts) ───────────────────────────────────────────
  // Annual burn / revenue ratio. > 1.5x = burning more than earning
  const annualBurn = burnRateMonthly * 12
  const burnRatio = annualRevenue > 0 ? annualBurn / annualRevenue : (burnRateMonthly > 0 ? 3 : 0)
  const burnRisk = clamp(burnRatio * 12, 0, 25)

  // ── 3. Churn risk (0–20 pts) ──────────────────────────────────────────────
  // Monthly churn > 5% = very high risk, 2–5% = moderate, < 2% = healthy
  const churnRisk = clamp(churnRatePercent * 2.5, 0, 20)

  // ── 4. Profitability factor (−15 to +10 pts) ──────────────────────────────
  // Negative margin adds risk; positive margin reduces it
  const marginFactor = clamp(-profitMarginPercent * 0.3, -10, 15)

  // ── 5. Growth signal (−20 to 0 pts) ──────────────────────────────────────
  // Strong growth reduces failure probability significantly
  const growthReduction = clamp(growthRatePercent * 0.25, 0, 20)

  // ── 6. Revenue scale bonus (−10 to 0 pts) ────────────────────────────────
  // Larger companies are more resilient; log scale
  const revenueM = annualRevenue / 1_000_000
  const scaleBonus = revenueM > 0 ? clamp(Math.log10(revenueM + 1) * 4, 0, 10) : 0

  const raw = runwayRisk + burnRisk + churnRisk + marginFactor - growthReduction - scaleBonus

  return clamp(Math.round(raw), 2, 95)
}

/**
 * Compute business health score from real fundamentals.
 * Returns a value in [0, 100] with proper sensitivity:
 *  - A company needs MULTIPLE strong signals to score > 80
 *  - A single strong metric cannot push score to 100
 *  - Weak areas pull the score down meaningfully
 *
 * Weighted components (total weight = 100):
 *  - Profitability (25): profit margin quality
 *  - Growth (20): revenue growth rate
 *  - Runway safety (20): months of cash remaining
 *  - Burn efficiency (15): burn vs revenue ratio
 *  - Customer health (10): churn rate
 *  - Revenue scale (10): absolute revenue size
 */
function computeBusinessHealth(params: {
  profitMarginPercent: number
  growthRatePercent: number
  runwayMonths: number
  burnRateMonthly: number
  annualRevenue: number
  churnRatePercent: number
}): number {
  const { profitMarginPercent, growthRatePercent, runwayMonths, burnRateMonthly, annualRevenue, churnRatePercent } = params

  // ── 1. Profitability score (0–25) ─────────────────────────────────────────
  // > 30% margin = 25, 15–30% = 18, 5–15% = 12, 0–5% = 7, negative = 0–5
  let profitScore: number
  if (profitMarginPercent >= 30)      profitScore = 25
  else if (profitMarginPercent >= 15) profitScore = 18 + ((profitMarginPercent - 15) / 15) * 7
  else if (profitMarginPercent >= 5)  profitScore = 12 + ((profitMarginPercent - 5) / 10) * 6
  else if (profitMarginPercent >= 0)  profitScore = (profitMarginPercent / 5) * 12
  else                                profitScore = clamp(5 + profitMarginPercent * 0.1, 0, 5)

  // ── 2. Growth score (0–20) ────────────────────────────────────────────────
  // Use log scale: 100%+ growth = 20, 50% = 16, 20% = 12, 10% = 8, 0% = 4, negative = 0
  const growthScore = growthRatePercent > 0
    ? clamp((Math.log(growthRatePercent + 1) / Math.log(101)) * 20, 0, 20)
    : clamp(4 + growthRatePercent * 0.1, 0, 4)

  // ── 3. Runway safety score (0–20) ─────────────────────────────────────────
  // > 36 months = 20, 24–36 = 17, 18–24 = 14, 12–18 = 10, 6–12 = 6, < 6 = 0–4
  let runwayScore: number
  if (runwayMonths >= 36)      runwayScore = 20
  else if (runwayMonths >= 24) runwayScore = 17 + ((runwayMonths - 24) / 12) * 3
  else if (runwayMonths >= 18) runwayScore = 14 + ((runwayMonths - 18) / 6) * 3
  else if (runwayMonths >= 12) runwayScore = 10 + ((runwayMonths - 12) / 6) * 4
  else if (runwayMonths >= 6)  runwayScore = 6 + ((runwayMonths - 6) / 6) * 4
  else                         runwayScore = (runwayMonths / 6) * 6

  // ── 4. Burn efficiency score (0–15) ───────────────────────────────────────
  // burnRatio = annual burn / revenue. < 0.5 = efficient, > 2 = burning fast
  const annualBurn = burnRateMonthly * 12
  const burnRatio = annualRevenue > 0 ? annualBurn / annualRevenue : (burnRateMonthly > 0 ? 3 : 0)
  const burnScore = burnRatio <= 0
    ? 15
    : clamp(15 * Math.exp(-burnRatio * 0.8), 0, 15)

  // ── 5. Customer health score (0–10) ───────────────────────────────────────
  // Monthly churn: < 1% = 10, 1–2% = 8, 2–5% = 5, 5–10% = 2, > 10% = 0
  let churnScore: number
  if (churnRatePercent < 1)       churnScore = 10
  else if (churnRatePercent < 2)  churnScore = 8 - ((churnRatePercent - 1) * 2)
  else if (churnRatePercent < 5)  churnScore = 5 - ((churnRatePercent - 2) * 1)
  else if (churnRatePercent < 10) churnScore = 2 - ((churnRatePercent - 5) * 0.4)
  else                            churnScore = 0
  churnScore = clamp(churnScore, 0, 10)

  // ── 6. Revenue scale score (0–10) ─────────────────────────────────────────
  // Log scale: $1B+ = 10, $100M = 8, $10M = 6, $1M = 4, $100K = 2, < $100K = 0
  const revenueM = annualRevenue / 1_000_000
  const scaleScore = revenueM > 0
    ? clamp((Math.log10(revenueM + 1) / Math.log10(1001)) * 10, 0, 10)
    : 0

  const total = profitScore + growthScore + runwayScore + burnScore + churnScore + scaleScore
  return clamp(Math.round(total), 0, 100)
}

/**
 * Compute market opportunity score from real market data.
 * Returns a value in [0, 100].
 *
 * Factors:
 *  - TAM size (log scale, 0–30): large markets = more opportunity
 *  - Growth rate (0–25): fast-growing markets = more opportunity
 *  - Market share position (0–20): current share + growth potential
 *  - Competitive intensity (0–15): fewer competitors = more opportunity
 *  - Revenue traction (0–10): already capturing revenue = validated opportunity
 */
function computeOpportunityScore(params: {
  marketSizeB: number
  growthRatePercent: number
  marketSharePercent: number
  competitorCount: number
  annualRevenue: number
}): number {
  const { marketSizeB, growthRatePercent, marketSharePercent, competitorCount, annualRevenue } = params

  // ── 1. TAM score (0–30) — log scale ───────────────────────────────────────
  // $1T+ = 30, $100B = 24, $10B = 18, $1B = 12, $100M = 6, < $100M = 0–6
  const tamScore = marketSizeB > 0
    ? clamp((Math.log10(marketSizeB * 1000 + 1) / Math.log10(1_000_001)) * 30, 0, 30)
    : 0

  // ── 2. Market growth score (0–25) ─────────────────────────────────────────
  // > 50% = 25, 30–50% = 20, 15–30% = 15, 5–15% = 10, 0–5% = 5, negative = 0
  let growthScore: number
  if (growthRatePercent >= 50)      growthScore = 25
  else if (growthRatePercent >= 30) growthScore = 20 + ((growthRatePercent - 30) / 20) * 5
  else if (growthRatePercent >= 15) growthScore = 15 + ((growthRatePercent - 15) / 15) * 5
  else if (growthRatePercent >= 5)  growthScore = 10 + ((growthRatePercent - 5) / 10) * 5
  else if (growthRatePercent >= 0)  growthScore = (growthRatePercent / 5) * 10
  else                              growthScore = 0

  // ── 3. Market share score (0–20) ──────────────────────────────────────────
  // Rewards both having share AND having room to grow.
  // 0% share = 10 (pure opportunity), 1% = 14, 5% = 17, 20%+ = 20
  // (having 0% share in a big market is still opportunity)
  const shareScore = marketSharePercent <= 0
    ? 10
    : clamp(10 + (Math.log10(marketSharePercent + 1) / Math.log10(101)) * 10, 10, 20)

  // ── 4. Competitive intensity score (0–15) ─────────────────────────────────
  // Fewer competitors = more opportunity
  // 0–5 competitors = 15, 5–15 = 12, 15–30 = 8, 30–50 = 5, > 50 = 2
  let competitorScore: number
  if (competitorCount <= 5)       competitorScore = 15
  else if (competitorCount <= 15) competitorScore = 12 - ((competitorCount - 5) / 10) * 4
  else if (competitorCount <= 30) competitorScore = 8 - ((competitorCount - 15) / 15) * 3
  else if (competitorCount <= 50) competitorScore = 5 - ((competitorCount - 30) / 20) * 3
  else                            competitorScore = 2
  competitorScore = clamp(competitorScore, 0, 15)

  // ── 5. Revenue traction score (0–10) ──────────────────────────────────────
  // Already generating revenue validates the opportunity
  const revenueM = annualRevenue / 1_000_000
  const tractionScore = revenueM > 0
    ? clamp((Math.log10(revenueM + 1) / Math.log10(10001)) * 10, 0, 10)
    : 0

  const total = tamScore + growthScore + shareScore + competitorScore + tractionScore
  return clamp(Math.round(total), 0, 100)
}

export function buildAnalysis(params: {
  companyName: string
  input: Record<string, unknown>
  model: { targetColumn: string; problemType: "regression" | "classification" }
  prediction: { value?: number; classIndex?: number; classLabel?: string }
}): Analysis {
  const now = new Date().toISOString()

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

  // ── Failure Probability ────────────────────────────────────────────────────
  // Use our formula-based computation. The ML model's binary output is used
  // only as a secondary signal to nudge the result when it predicts high risk.
  const formulaFailureProb = computeFailureProbability({
    runwayMonths,
    burnRateMonthly,
    annualRevenue,
    profitMarginPercent,
    churnRatePercent,
    growthRatePercent,
  })

  // If ML model predicts high-risk class (class=1), add a penalty nudge
  let mlNudge = 0
  if (params.model.problemType === "classification") {
    const idx = params.prediction.classIndex ?? 0
    if (idx === 1) mlNudge = 15
  } else if (typeof params.prediction.value === "number" && Number.isFinite(params.prediction.value)) {
    // For regression: if predicted value is very low (near 0 = failure), add nudge
    const v = params.prediction.value
    if (v < 0.3) mlNudge = 10
  }

  const failureProbabilityPercent = clamp(formulaFailureProb + mlNudge, 2, 95)

  // ── Business Health Score ──────────────────────────────────────────────────
  const businessHealthScore = computeBusinessHealth({
    profitMarginPercent,
    growthRatePercent,
    runwayMonths,
    burnRateMonthly,
    annualRevenue,
    churnRatePercent,
  })

  // ── Opportunity Score ──────────────────────────────────────────────────────
  const opportunityScore = computeOpportunityScore({
    marketSizeB,
    growthRatePercent,
    marketSharePercent,
    competitorCount,
    annualRevenue,
  })

  // ── Overall Risk Score ─────────────────────────────────────────────────────
  // Derived from failure probability + burn pressure + churn pressure
  const burnPressure = burnRateMonthly > 0 && annualRevenue > 0
    ? clamp((burnRateMonthly * 12) / annualRevenue, 0, 3)
    : 0
  const churnPressure = clamp(churnRatePercent / 10, 0, 3)
  const overallRiskScore = clamp(
    failureProbabilityPercent * 0.6 + burnPressure * 8 + churnPressure * 8 - clamp(profitMarginPercent, 0, 50) * 0.1,
    0,
    100
  )

  // ── Investment Readiness ───────────────────────────────────────────────────
  const retentionPercent = clamp(100 - churnRatePercent, 0, 100)
  const readinessScore = clamp(
    businessHealthScore * 0.45 +
    opportunityScore * 0.30 +
    clamp(nps, 0, 100) * 0.15 +
    clamp(100 - failureProbabilityPercent, 0, 100) * 0.10,
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
      failureProbabilityPercent: Math.round(failureProbabilityPercent),
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
