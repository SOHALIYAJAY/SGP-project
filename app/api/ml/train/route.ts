import { NextResponse } from "next/server"
import { setCachedModel } from "@/lib/ml/cache"
import { trainTabularModel } from "@/lib/ml/tabular-regression"

export const runtime = "nodejs"

export async function POST() {
  try {
    const trained = await trainTabularModel()
    setCachedModel(trained)
    return NextResponse.json(
      { ok: true, schema: trained.schema, metrics: trained.metrics },
      { status: 200 }
    )
  } catch (e) {
    return NextResponse.json(
      {
        ok: false,
        error: e instanceof Error ? e.message : "Unknown training error",
        hint:
          "Ensure your dataset exists at data/dataset.csv, has headers, and the target column is numeric (or set ML_TARGET_COLUMN).",
      },
      { status: 400 }
    )
  }
}

