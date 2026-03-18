import path from "node:path"
import Papa from "papaparse"
import { RandomForestClassifier, RandomForestRegression } from "ml-random-forest"
import { cleanAndSelectDataset } from "./dataset-clean"

export type MlProblemType = "regression" | "classification"

export type MlSchema = {
  problemType: MlProblemType
  datasetPath: string
  targetColumn: string
  rawFeatureColumns: string[]
  expandedFeatureNames: string[]
  categorical: Record<string, { categories: string[] }>
  classLabels?: string[]
}

export type TrainMetrics =
  | {
      problemType: "regression"
      rows: number
      features: number
      testRows: number
      rmse: number
      r2: number
    }
  | {
      problemType: "classification"
      rows: number
      features: number
      testRows: number
      accuracy: number
      classLabels: string[]
    }

export type TrainedModel = {
  schema: MlSchema
  model: RandomForestRegression | RandomForestClassifier
  metrics: TrainMetrics
}

type ParsedCsv = {
  headers: string[]
  rows: Record<string, string>[]
}

function toNumberOrNull(v: unknown): number | null {
  if (v === null || v === undefined) return null
  if (typeof v === "number" && Number.isFinite(v)) return v
  const s = String(v).trim()
  if (!s) return null
  const n = Number(s)
  return Number.isFinite(n) ? n : null
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function mean(xs: number[]) {
  return xs.reduce((a, b) => a + b, 0) / Math.max(1, xs.length)
}

function rmse(yTrue: number[], yPred: number[]) {
  const n = Math.min(yTrue.length, yPred.length)
  let sse = 0
  for (let i = 0; i < n; i++) {
    const e = yTrue[i] - yPred[i]
    sse += e * e
  }
  return Math.sqrt(sse / Math.max(1, n))
}

function r2(yTrue: number[], yPred: number[]) {
  const n = Math.min(yTrue.length, yPred.length)
  const yBar = mean(yTrue.slice(0, n))
  let ssRes = 0
  let ssTot = 0
  for (let i = 0; i < n; i++) {
    const e = yTrue[i] - yPred[i]
    ssRes += e * e
    const d = yTrue[i] - yBar
    ssTot += d * d
  }
  return ssTot === 0 ? 0 : 1 - ssRes / ssTot
}

function accuracy(yTrue: number[], yPred: number[]) {
  const n = Math.min(yTrue.length, yPred.length)
  if (n === 0) return 0
  let ok = 0
  for (let i = 0; i < n; i++) if (yTrue[i] === yPred[i]) ok++
  return ok / n
}

async function readCsv(datasetPath: string): Promise<ParsedCsv> {
  const csv = await import("node:fs/promises").then((m) => m.readFile(datasetPath, "utf8"))
  const parsed = Papa.parse<Record<string, string>>(csv, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false,
  })
  if (parsed.errors?.length) {
    const msg = parsed.errors.map((e) => e.message).join("; ")
    throw new Error(`CSV parse error: ${msg}`)
  }
  const rows = (parsed.data || []).filter((r) => r && Object.keys(r).length > 0)
  const headers = (parsed.meta?.fields || []).filter(Boolean)
  if (!headers.length) throw new Error("CSV must include a header row.")
  if (!rows.length) throw new Error("CSV has no data rows.")
  return { headers, rows }
}

function inferTarget(headers: string[]) {
  const envTarget = process.env.ML_TARGET_COLUMN?.trim()
  if (envTarget && headers.includes(envTarget)) return envTarget
  return headers[headers.length - 1]
}

function inferProblemType(rows: Record<string, string>[], targetColumn: string): MlProblemType {
  const ys = rows
    .map((r) => r[targetColumn])
    .map((v) => String(v ?? "").trim())
    .filter((v) => v.length > 0)
  const uniq = new Set(ys)
  if (uniq.size <= 10) return "classification"

  const nums = ys.map((v) => toNumberOrNull(v)).filter((n): n is number => n !== null)
  const numericRatio = nums.length / Math.max(1, ys.length)
  return numericRatio >= 0.9 ? "regression" : "classification"
}

function buildEncoders(
  headers: string[],
  rows: Record<string, string>[],
  targetColumn: string
) {
  const rawFeatureColumns = headers.filter((h) => h !== targetColumn)
  const categorical: MlSchema["categorical"] = {}
  const expandedFeatureNames: string[] = []

  for (const col of rawFeatureColumns) {
    const values = rows.map((r) => r[col])
    const numericCount = values.reduce((acc, v) => acc + (toNumberOrNull(v) === null ? 0 : 1), 0)
    const numericRatio = numericCount / Math.max(1, values.length)
    const treatAsNumeric = numericRatio >= 0.9

    if (treatAsNumeric) {
      expandedFeatureNames.push(col)
      continue
    }

    const freq = new Map<string, number>()
    for (const v of values) {
      const s = String(v ?? "").trim()
      if (!s) continue
      freq.set(s, (freq.get(s) || 0) + 1)
    }
    const categories = [...freq.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 50)
      .map(([k]) => k)

    categorical[col] = { categories }
    for (const cat of categories) expandedFeatureNames.push(`${col}=${cat}`)
  }

  return { rawFeatureColumns, categorical, expandedFeatureNames }
}

function encodeRow(
  row: Record<string, unknown>,
  schema: Pick<MlSchema, "rawFeatureColumns" | "categorical">
): number[] {
  const out: number[] = []
  for (const col of schema.rawFeatureColumns) {
    const cat = schema.categorical[col]
    if (!cat) {
      out.push(toNumberOrNull(row[col]) ?? 0)
      continue
    }
    const s = String(row[col] ?? "").trim()
    for (const c of cat.categories) out.push(s === c ? 1 : 0)
  }
  return out
}

export async function trainTabularModel(options?: {
  datasetPath?: string
  seed?: number
}): Promise<TrainedModel> {
  const datasetPath = options?.datasetPath || (await (async () => {
    const cleaned = await cleanAndSelectDataset()
    return cleaned.outputPath
  })())

  const { headers, rows } = await readCsv(datasetPath)
  const targetColumn = inferTarget(headers)
  const problemType = inferProblemType(rows, targetColumn)

  const { rawFeatureColumns, categorical, expandedFeatureNames } = buildEncoders(
    headers,
    rows,
    targetColumn
  )

  const usable = rows
    .map((r) => ({
      x: r,
      yRaw: String(r[targetColumn] ?? "").trim(),
      yNum: toNumberOrNull(r[targetColumn]),
    }))
    .filter((p) => p.yRaw.length > 0 && (problemType === "classification" || p.yNum !== null))

  if (usable.length < 50) {
    throw new Error(`Not enough usable rows to train (need >= 50). Usable rows: ${usable.length}.`)
  }

  const seed = options?.seed ?? 42
  const rand = mulberry32(seed)
  const idx = usable.map((_, i) => i)
  idx.sort(() => rand() - 0.5)

  const testSize = Math.max(1, Math.floor(usable.length * 0.2))
  const testIdx = new Set(idx.slice(0, testSize))

  const xTrain: number[][] = []
  const yTrain: number[] = []
  const xTest: number[][] = []
  const yTest: number[] = []

  const schema: MlSchema = {
    problemType,
    datasetPath,
    targetColumn,
    rawFeatureColumns,
    expandedFeatureNames,
    categorical,
  }

  let classLabels: string[] | undefined
  let labelToIndex: Map<string, number> | undefined
  if (problemType === "classification") {
    const labels = usable.map((u) => u.yRaw)
    const uniq = [...new Set(labels)].slice(0, 20)
    classLabels = uniq
    labelToIndex = new Map(uniq.map((l, i) => [l, i]))
    schema.classLabels = classLabels
  }

  for (let i = 0; i < usable.length; i++) {
    const x = encodeRow(usable[i].x, schema)
    const y =
      problemType === "classification"
        ? (labelToIndex!.get(usable[i].yRaw) ?? 0)
        : (usable[i].yNum as number)
    if (testIdx.has(i)) {
      xTest.push(x)
      yTest.push(y)
    } else {
      xTrain.push(x)
      yTrain.push(y)
    }
  }

  const common = {
    seed,
    maxFeatures: Math.max(1, Math.floor(Math.sqrt(xTrain[0]?.length || 1))),
    replacement: true,
    nEstimators: 120,
    treeOptions: {
      maxDepth: 18,
      minNumSamples: 3,
    },
  }

  if (problemType === "regression") {
    const model = new RandomForestRegression(common)
    model.train(xTrain, yTrain)
    const yPred = model.predict(xTest) as number[]
    const metrics: TrainMetrics = {
      problemType: "regression",
      rows: usable.length,
      features: xTrain[0]?.length || 0,
      testRows: yTest.length,
      rmse: rmse(yTest, yPred),
      r2: r2(yTest, yPred),
    }
    return { schema, model, metrics }
  }

  const model = new RandomForestClassifier(common)
  model.train(xTrain, yTrain)
  const yPred = model.predict(xTest) as number[]
  const metrics: TrainMetrics = {
    problemType: "classification",
    rows: usable.length,
    features: xTrain[0]?.length || 0,
    testRows: yTest.length,
    accuracy: accuracy(yTest, yPred),
    classLabels: classLabels || [],
  }

  return { schema, model, metrics }
}

export function predictTabular(model: TrainedModel, input: Record<string, unknown>) {
  const x = encodeRow(input, model.schema)
  const y = model.model.predict([x]) as number[]
  if (model.schema.problemType === "classification") {
    const idx = y[0] ?? 0
    const label = model.schema.classLabels?.[idx] ?? String(idx)
    return { classIndex: idx, classLabel: label }
  }
  return { value: y[0] }
}

// Backwards-compatible alias (older imports)
export const trainTabularRegression = trainTabularModel
export const predictTabularRegression = (m: TrainedModel, input: Record<string, unknown>) =>
  predictTabular(m, input)

