import { NextResponse } from "next/server"
import { getCachedModel } from "@/lib/ml/cache"

export const runtime = "nodejs"

export async function GET() {
  const model = getCachedModel()
  if (!model) {
    return NextResponse.json(
      {
        trained: false,
        message:
          "Model not trained yet. POST /api/ml/train to train using data/dataset.csv.",
      },
      { status: 200 }
    )
  }

  return NextResponse.json(
    {
      trained: true,
      schema: model.schema,
      metrics: model.metrics,
    },
    { status: 200 }
  )
}

