export type AnalysisInput = Record<string, unknown>

export type Analysis = {
  meta: {
    companyName: string
    generatedAt: string
    model: {
      targetColumn: string
      problemType: "regression" | "classification"
    }
  }
  dashboard: {
    businessHealthScore: number // 0-100
    riskLevel: "Low" | "Medium" | "High"
    investmentReadinessGrade: "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C"
    failureProbabilityPercent: number // 0-100
  }
  financial: {
    annualRevenue: number
    annualExpenses: number
    profitMarginPercent: number
    burnRateMonthly: number
    runwayMonths: number
  }
  market: {
    marketSizeB: number
    competitorCount: number
    growthRatePercent: number
    marketSharePercent: number
    opportunityScore: number // 0-100
  }
  customer: {
    customerCount: number
    churnRatePercent: number
    nps: number
    retentionPercent: number
  }
  risk: {
    overallRiskScore: number // 0-100 (higher = riskier)
  }
}

