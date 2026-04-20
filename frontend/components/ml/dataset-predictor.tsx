"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Loader } from "@/components/ui/loader"

type InfoResponse =
  | { trained: false; message: string }
  | {
      trained: true
      schema: {
        targetColumn: string
        problemType?: "regression" | "classification"
        rawFeatureColumns: string[]
      }
      metrics:
        | { problemType: "regression"; rmse: number; r2: number; rows: number; testRows: number; features: number }
        | { problemType: "classification"; accuracy: number; rows: number; testRows: number; features: number; classLabels: string[] }
    }

export function DatasetPredictor() {
  const [info, setInfo] = React.useState<InfoResponse | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [training, setTraining] = React.useState(false)
  const [predicting, setPredicting] = React.useState(false)
  const [inputJson, setInputJson] = React.useState<string>('{}')
  const [prediction, setPrediction] = React.useState<number | null>(null)
  const [predictionLabel, setPredictionLabel] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  const refreshInfo = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/ml/info", { cache: "no-store" })
      const j = (await res.json()) as InfoResponse
      setInfo(j)
      if ("trained" in j && j.trained) {
        const template = Object.fromEntries(j.schema.rawFeatureColumns.map((k) => [k, ""]))
        setInputJson((prev) => (prev.trim() === "{}" ? JSON.stringify(template, null, 2) : prev))
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load model info")
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
    setPrediction(null)
    setPredictionLabel(null)
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
    setPrediction(null)
    setPredictionLabel(null)
    try {
      const input = JSON.parse(inputJson) as Record<string, unknown>
      const res = await fetch("/api/ml/predict", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ input, autoTrain: true }),
      })
      const j = await res.json()
      if (!res.ok || !j.ok) throw new Error(j.error || "Prediction failed")
      if (j.problemType === "regression") {
        setPrediction(j.prediction?.value ?? null)
      } else {
        // show class index as numeric; class label shown in text below
        setPrediction(j.prediction?.classIndex ?? null)
        setPredictionLabel(j.prediction?.classLabel ?? null)
      }
      await refreshInfo()
    } catch (e) {
      setError(e instanceof Error ? e.message : "Prediction failed")
    } finally {
      setPredicting(false)
    }
  }

  const trained = info?.trained === true

  return (
    <Card className="glass-card rounded-xl p-6 mb-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-card-foreground">Dataset ML Prediction</h3>
            {trained ? <Badge>Trained</Badge> : <Badge variant="secondary">Not trained</Badge>}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Trains a model on your `data/dataset.csv` and predicts your business output target.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={refreshInfo} disabled={loading || training || predicting}>
            Refresh
          </Button>
          <Button onClick={onTrain} disabled={loading || training || predicting}>
            {training ? "Training..." : "Train model"}
          </Button>
        </div>
      </div>

      {(loading || training || predicting) && (
        <div className="mt-4">
          <Loader />
        </div>
      )}

      {info && info.trained && (
        <div className="mt-4 grid md:grid-cols-3 gap-4 text-sm">
          <div className="glass rounded-lg p-3">
            <div className="text-muted-foreground">Target</div>
            <div className="font-semibold text-card-foreground">{info.schema.targetColumn}</div>
          </div>
          <div className="glass rounded-lg p-3">
            <div className="text-muted-foreground">Quality (test)</div>
            <div className="font-semibold text-card-foreground">
              {"problemType" in info.metrics && info.metrics.problemType === "classification"
                ? `Accuracy ${(info.metrics.accuracy * 100).toFixed(1)}%`
                : `RMSE ${(info.metrics as any).rmse.toFixed(4)} · R² ${(info.metrics as any).r2.toFixed(4)}`}
            </div>
          </div>
          <div className="glass rounded-lg p-3">
            <div className="text-muted-foreground">Data</div>
            <div className="font-semibold text-card-foreground">
              {info.metrics.rows} rows · {info.metrics.features} features
            </div>
          </div>
        </div>
      )}

      {!trained && info && !("schema" in info) && (
        <div className="mt-4 text-sm text-muted-foreground">
          {info.message}
        </div>
      )}

      <div className="mt-5 grid lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-card-foreground">Input (JSON)</div>
            <Button variant="secondary" onClick={onPredict} disabled={loading || training || predicting}>
              {predicting ? "Predicting..." : "Predict"}
            </Button>
          </div>
          <Textarea
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            className="min-h-[180px] font-mono text-xs"
            placeholder='{"featureA": 123, "featureB": "Retail"}'
          />
        </div>

        <div className="glass rounded-xl p-4">
          <div className="text-sm font-medium text-card-foreground mb-2">Output</div>
          {prediction !== null ? (
            <div>
              <div className="text-3xl font-bold text-card-foreground">{prediction}</div>
              {predictionLabel && (
                <div className="mt-1 text-sm text-muted-foreground">Class: {predictionLabel}</div>
              )}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              Run a prediction to see the estimated target value.
            </div>
          )}
          {error && <div className="mt-3 text-sm text-destructive">{error}</div>}
          <div className="mt-4 text-xs text-muted-foreground">
            Tip: set `ML_TARGET_COLUMN` to choose your output column.
          </div>
        </div>
      </div>
    </Card>
  )
}

