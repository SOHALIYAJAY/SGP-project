import { NextResponse } from "next/server"
import { z } from "zod"
import { getCachedModel, setCachedModel } from "@/lib/ml/cache"
import { predictTabular, trainTabularModel } from "@/lib/ml/tabular-regression"

export const runtime = "nodejs"

const PredictBodySchema = z.object({
  input: z.record(z.string(), z.unknown()),
  autoTrain: z.boolean().optional().default(true),
})

export async function POST(req: Request) {
  const json = await req.json().catch(() => null)
  const parsed = PredictBodySchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid body. Expected { input: { ... } }." },
      { status: 400 }
    )
  }

  let model = getCachedModel()
  if (!model) {
    if (!parsed.data.autoTrain) {
      return NextResponse.json(
        { ok: false, error: "Model not trained. Call POST /api/ml/train first." },
        { status: 400 }
      )
    }
    try {
      model = await trainTabularModel()
      setCachedModel(model)
    } catch (e) {
      return NextResponse.json(
        {
          ok: false,
          error: e instanceof Error ? e.message : "Training failed",
        },
        { status: 400 }
      )
    }
  }

  const prediction = predictTabular(model, parsed.data.input)

  return NextResponse.json(
    {
      ok: true,
      prediction,
      targetColumn: model.schema.targetColumn,
      problemType: model.schema.problemType,
      metrics: model.metrics,
    },
    { status: 200 }
  )
}

