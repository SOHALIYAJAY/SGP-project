import { NextResponse } from "next/server"
import { z } from "zod"
import { getCachedModel, setCachedModel } from "@/lib/ml/cache"
import { predictTabular, trainTabularModel } from "@/lib/ml/tabular-regression"
import { buildAnalysis } from "@/lib/analysis/generate"

export const runtime = "nodejs"

const BodySchema = z.record(z.string(), z.unknown())

function currentYear() {
  return new Date().getFullYear()
}

function mapCompanyFormToMlInput(form: Record<string, unknown>) {
  // Map your Company Input form → the engineered dataset feature names when possible.
  // If your selected dataset differs, the model will ignore unknown keys and default missing ones to 0.
  const revenue = Number(form.revenue ?? 0)
  const burnRateMonthly = Number(form.burnRate ?? 0)
  const totalFunding = Number(form.totalFunding ?? 0)
  const foundedYear = Number(form.foundedYear ?? 0)

  const startupAge =
    foundedYear > 1900 && foundedYear <= currentYear()
      ? currentYear() - foundedYear
      : Number(form.startupAge ?? 0)

  const cashBalance = Number(form.cashBalance ?? 0)
  const runwayMonths = burnRateMonthly > 0 ? cashBalance / burnRateMonthly : 0

  const profitabilityRatio =
    burnRateMonthly > 0 ? revenue / burnRateMonthly : 0

  const burnIntensity =
    totalFunding > 0 ? burnRateMonthly / totalFunding : 0

  const revenuePerYear =
    startupAge > 0 ? revenue / startupAge : revenue

  // `Startup_Status` in your engineered dataset looks like a label (1/0).
  // We set it to 1 by default (active).
  return {
    Revenue: Number.isFinite(revenue) ? revenue : 0,
    Burn_Rate: Number.isFinite(burnRateMonthly) ? burnRateMonthly : 0,
    Funding_Amount: Number.isFinite(totalFunding) ? totalFunding : 0,
    Startup_Age: Number.isFinite(startupAge) ? startupAge : 0,
    Startup_Status: 1,
    Cash_Runway: Number.isFinite(runwayMonths) ? runwayMonths : 0,
    Profitability_Ratio: Number.isFinite(profitabilityRatio) ? profitabilityRatio : 0,
    Burn_Intensity: Number.isFinite(burnIntensity) ? burnIntensity : 0,
    Revenue_Per_Year: Number.isFinite(revenuePerYear) ? revenuePerYear : 0,
  }
}

export async function POST(req: Request) {
  const json = await req.json().catch(() => null)
  const parsed = BodySchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 })
  }

  let model = getCachedModel()
  if (!model) {
    model = await trainTabularModel()
    setCachedModel(model)
  }

  const mlInput = mapCompanyFormToMlInput(parsed.data)
  const prediction = predictTabular(model, mlInput)

  const analysis = buildAnalysis({
    companyName: String(parsed.data.companyName ?? "Company"),
    input: { ...parsed.data, ...mlInput },
    model: { targetColumn: model.schema.targetColumn, problemType: model.schema.problemType },
    prediction,
  })

  return NextResponse.json({ ok: true, analysis }, { status: 200 })
}

