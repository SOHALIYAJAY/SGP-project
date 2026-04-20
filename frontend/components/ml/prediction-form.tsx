"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader } from "@/components/ui/loader"

type InfoResponse =
  | { trained: false; message: string }
  | {
      trained: true
      schema: {
        targetColumn: string
        problemType: "regression" | "classification"
        rawFeatureColumns: string[]
        classLabels?: string[]
      }
      metrics:
        | { problemType: "regression"; rmse: number; r2: number; rows: number; testRows: number; features: number }
        | { problemType: "classification"; accuracy: number; rows: number; testRows: number; features: number; classLabels: string[] }
    }

type PredictResponse =
  | { ok: false; error: string }
  | {
      ok: true
      problemType: "regression" | "classification"
      targetColumn: string
      prediction: { value?: number; classIndex?: number; classLabel?: string }
    }

function smartLabel(s: string) {
  return s
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase())
}

function coerceValue(v: string) {
  const s = v.trim()
  if (s === "") return ""
  // if it looks numeric, send as number; otherwise keep string
  if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s)
  return s
}

export function MlPredictionForm() {
  const [info, setInfo] = React.useState<InfoResponse | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [training, setTraining] = React.useState(false)
  const [predicting, setPredicting] = React.useState(false)
  const [values, setValues] = React.useState<Record<string, string>>({})
  const [result, setResult] = React.useState<PredictResponse | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  const refreshInfo = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/ml/info", { cache: "no-store" })
      const j = (await res.json()) as InfoResponse
      setInfo(j)
      if ("trained" in j && j.trained) {
        setValues((prev) => {
          const next = { ...prev }
          for (const k of j.schema.rawFeatureColumns) if (next[k] === undefined) next[k] = ""
          return next
        })
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load ML info")
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    void refreshInfo()
  }, [refreshInfo])

  const onTrain = async () => {
    setTraining(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch("/api/ml/train", { method: "POST" })
      const j = await res.json()
      if (!res.ok || !j.ok) throw new Error(j.error || "Training failed")
      await refreshInfo()
    } catch (e) {
      setError(e instanceof Error ? e.message : "Training failed")
    } finally {
      setTraining(false)
    }
  }

  const onPredict = async () => {
    setPredicting(true)
    setError(null)
    setResult(null)
    try {
      const input: Record<string, unknown> = {}
      for (const [k, v] of Object.entries(values)) input[k] = coerceValue(v)

      const res = await fetch("/api/ml/predict", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ input, autoTrain: true }),
      })
      const j = (await res.json()) as PredictResponse
      if (!res.ok || !("ok" in j) || j.ok === false) {
        throw new Error((j as any)?.error || "Prediction failed")
      }
      setResult(j)
      await refreshInfo()
    } catch (e) {
      setError(e instanceof Error ? e.message : "Prediction failed")
    } finally {
      setPredicting(false)
    }
  }

  const trained = info?.trained === true
  const featureCols = trained ? info.schema.rawFeatureColumns : []

  return (
    <Card className="glass-card rounded-2xl p-6 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-card-foreground">ML Prediction</h2>
            {trained ? <Badge>Ready</Badge> : <Badge className="opacity-80">Not trained</Badge>}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Enter the required features and get the model’s predicted business output.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={refreshInfo} disabled={loading || training || predicting}>
            Refresh
          </Button>
          <Button onClick={onTrain} disabled={loading || training || predicting}>
            {training ? "Training..." : "Train"}
          </Button>
        </div>
      </div>

      {(loading || training || predicting) && <Loader />}

      {trained && (
        <div className="mt-4 grid md:grid-cols-3 gap-4 text-sm">
          <div className="glass rounded-lg p-3">
            <div className="text-muted-foreground">Target</div>
            <div className="font-semibold text-card-foreground">{info.schema.targetColumn}</div>
          </div>
          <div className="glass rounded-lg p-3">
            <div className="text-muted-foreground">Type</div>
            <div className="font-semibold text-card-foreground">{info.schema.problemType}</div>
          </div>
          <div className="glass rounded-lg p-3">
            <div className="text-muted-foreground">Quality (test)</div>
            <div className="font-semibold text-card-foreground">
              {"problemType" in info.metrics && info.metrics.problemType === "classification"
                ? `Accuracy ${(info.metrics.accuracy * 100).toFixed(1)}%`
                : `RMSE ${(info.metrics as any).rmse.toFixed(4)} · R² ${(info.metrics as any).r2.toFixed(4)}`}
            </div>
          </div>
        </div>
      )}

      {!trained && info && !("schema" in info) && (
        <div className="mt-4 text-sm text-muted-foreground">{info.message}</div>
      )}

      <div className="mt-6">
        <div className="grid md:grid-cols-2 gap-6">
          {featureCols.slice(0, 12).map((col) => (
            <div key={col} className="space-y-2">
              <Label htmlFor={`ml-${col}`}>{smartLabel(col)}</Label>
              <Input
                id={`ml-${col}`}
                value={values[col] ?? ""}
                onChange={(e) => setValues((prev) => ({ ...prev, [col]: e.target.value }))}
                placeholder={col.toLowerCase().includes("rate") ? "e.g., 0.12" : "Enter value"}
                className="form-input-premium"
              />
            </div>
          ))}
        </div>

        {trained && featureCols.length > 12 && (
          <div className="mt-3 text-xs text-muted-foreground">
            Showing first 12 fields. The dataset has {featureCols.length} features; you can extend the form easily if you want all fields visible.
          </div>
        )}

        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            {trained ? "Fill inputs and predict." : "Train first (or predict will auto-train)."}
          </div>
          <Button onClick={onPredict} disabled={loading || training || predicting}>
            {predicting ? "Predicting..." : "Predict"}
          </Button>
        </div>

        {(error || (result && result.ok)) && (
          <div className="mt-4 glass rounded-xl p-4">
            {error && <div className="text-sm text-destructive">{error}</div>}
            {result && result.ok && (
              <div>
                <div className="text-sm text-muted-foreground">Prediction</div>
                {result.problemType === "regression" ? (
                  <div className="text-3xl font-bold text-card-foreground">{result.prediction.value}</div>
                ) : (
                  <div className="text-3xl font-bold text-card-foreground">
                    {result.prediction.classLabel ?? result.prediction.classIndex}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}

