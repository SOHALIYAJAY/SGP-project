import fs from "node:fs/promises"
import path from "node:path"
import Papa from "papaparse"
import * as XLSX from "xlsx"

export type CleanedDataset = {
  inputFiles: string[]
  outputPath: string
  headers: string[]
  rows: Record<string, string>[]
}

function isMissing(v: unknown) {
  if (v === null || v === undefined) return true
  const s = String(v).trim()
  return s === "" || s.toLowerCase() === "nan" || s.toLowerCase() === "null" || s.toLowerCase() === "none"
}

function normalizeCell(v: unknown): string {
  if (isMissing(v)) return ""
  const s = String(v).trim()

  // "12.3%" -> "0.123"
  if (/^-?\d+(\.\d+)?%$/.test(s)) {
    const n = Number(s.slice(0, -1))
    if (Number.isFinite(n)) return String(n / 100)
  }

  // "-1,800.85%" -> "-18.0085" or "-1800.85%" weird formatted with commas
  if (/%$/.test(s) && /,/.test(s)) {
    const cleaned = s.replace(/,/g, "")
    if (/^-?\d+(\.\d+)?%$/.test(cleaned)) {
      const n = Number(cleaned.slice(0, -1))
      if (Number.isFinite(n)) return String(n / 100)
    }
  }

  // remove thousand separators for numeric-like strings: "1,234.56" -> "1234.56"
  if (/^-?\d{1,3}(,\d{3})+(\.\d+)?$/.test(s)) return s.replace(/,/g, "")

  return s
}

function dropIndexLikeColumns(headers: string[], rows: Record<string, string>[]) {
  const toDrop = new Set<string>()
  for (const h of headers) {
    const hn = h.trim().toLowerCase()
    if (!hn || hn === "unnamed: 0" || hn === "index" || hn === "id") {
      // only drop if it looks like a simple row index (mostly sequential integers)
      const nums = rows
        .slice(0, 200)
        .map((r) => Number(normalizeCell(r[h])))
        .filter((n) => Number.isFinite(n))
      if (nums.length >= 50) toDrop.add(h)
    }
  }
  const keptHeaders = headers.filter((h) => !toDrop.has(h))
  const keptRows = rows.map((r) => {
    const out: Record<string, string> = {}
    for (const h of keptHeaders) out[h] = r[h] ?? ""
    return out
  })
  return { headers: keptHeaders, rows: keptRows }
}

async function readCsvFile(filePath: string) {
  const csv = await fs.readFile(filePath, "utf8")
  const parsed = Papa.parse<Record<string, string>>(csv, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false,
  })
  if (parsed.errors?.length) {
    const msg = parsed.errors.map((e) => e.message).join("; ")
    throw new Error(`CSV parse error (${path.basename(filePath)}): ${msg}`)
  }
  const rows = (parsed.data || []).filter((r) => r && Object.keys(r).length > 0)
  const headers = (parsed.meta?.fields || []).filter(Boolean)
  return { headers, rows }
}

async function readExcelFile(filePath: string) {
  const buf = await fs.readFile(filePath)
  const wb = XLSX.read(buf, { type: "buffer" })
  const sheetName = wb.SheetNames[0]
  if (!sheetName) throw new Error(`No sheets found in ${path.basename(filePath)}`)
  const ws = wb.Sheets[sheetName]
  const json = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, {
    defval: "",
    raw: false,
  })
  const headers = json.length ? Object.keys(json[0]) : []
  const rows = json.map((r) => {
    const out: Record<string, string> = {}
    for (const h of headers) out[h] = normalizeCell(r[h])
    return out
  })
  return { headers, rows }
}

function scoreDataset(headers: string[]) {
  const h = headers.map((x) => x.toLowerCase())
  const has = (name: string) => h.includes(name.toLowerCase())
  // prefer datasets with a clear target column
  if (has("high_risk_flag")) return 100
  if (has("startup_status")) return 95
  if (has("target_anomaly_class")) return 90
  if (has("revenue")) return 60
  return 10
}

export async function cleanAndSelectDataset(options?: {
  inputFiles?: string[]
  outputPath?: string
}) : Promise<CleanedDataset> {
  const repoRoot = process.cwd()
  const outputPath =
    options?.outputPath || path.join(repoRoot, "data", "processed", "dataset.csv")

  const defaultInputs = [
    path.join(repoRoot, "business_failure_engineered.csv"),
    path.join(repoRoot, "future_revenue_trend_data (2).csv"),
    path.join(repoRoot, "2-modifty.xls"),
    path.join(repoRoot, "3-Modify-data.xls"),
    path.join(repoRoot, "7-Modify-data.xls"),
  ]
  const inputFiles = (options?.inputFiles || defaultInputs).filter(Boolean)

  const loaded: { file: string; headers: string[]; rows: Record<string, string>[] }[] = []
  for (const f of inputFiles) {
    try {
      await fs.access(f)
    } catch {
      continue
    }
    const ext = path.extname(f).toLowerCase()
    const { headers, rows } =
      ext === ".csv" ? await readCsvFile(f) : await readExcelFile(f)

    const normalizedRows = rows.map((r) => {
      const out: Record<string, string> = {}
      for (const k of headers) out[k] = normalizeCell(r[k])
      return out
    })

    const dropped = dropIndexLikeColumns(headers, normalizedRows)
    loaded.push({ file: f, headers: dropped.headers, rows: dropped.rows })
  }

  if (!loaded.length) {
    throw new Error("No dataset files found. Add a CSV/XLS/XLSX file to the project root or data/ folder.")
  }

  loaded.sort((a, b) => scoreDataset(b.headers) - scoreDataset(a.headers))
  const selected = loaded[0]

  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  const csvOut = Papa.unparse(selected.rows, { columns: selected.headers })
  await fs.writeFile(outputPath, csvOut, "utf8")

  return {
    inputFiles: loaded.map((x) => x.file),
    outputPath,
    headers: selected.headers,
    rows: selected.rows,
  }
}

