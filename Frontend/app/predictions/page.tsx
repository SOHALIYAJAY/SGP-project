"use client"

import React, { useState, useEffect } from "react"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { useExportPDF } from "@/hooks/use-export-pdf"
import { StatusSpotlightCard } from "@/components/ui/status-spotlight-card"
import { CustomTooltip } from "@/components/ui/custom-tooltip"

import {
  TrendingUp,
  Target,
  DollarSign,
  Users,
  Download,
  Plus,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  ComposedChart,
  Bar,
  Legend,
} from "recharts"
import ChartInsight from '@/components/chart-insight'

export default function PredictionsPage() {
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { isExporting, handleExport } = useExportPDF(
    "predictions-content",
    "Growth_Predictions_Report.pdf",
  )

  useEffect(() => {
    // Fetch ML-powered predictions data
    const fetchPredictionsData = async () => {
      try {
        // Get stored company data or use demo data
        const storedData = localStorage.getItem('companyAnalysisData')
        const companyData = storedData ? JSON.parse(storedData) : {
          companyName: "TechCorp Inc.",
          revenue: "8200000",
          growthRate: "85",
          customerCount: "1500",
          marketShare: "2.5"
        }

        const response = await fetch('/api/analyze-company', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(companyData)
        })
        
        if (response.ok) {
          const result = await response.json()
          setAnalysisData(result)
        }
      } catch (error) {
        console.error('Failed to fetch predictions data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPredictionsData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen py-2">
        <SectionWrapper>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading ML-powered predictions...</p>
          </div>
        </SectionWrapper>
      </div>
    )
  }

  if (!analysisData) {
    return (
      <div className="min-h-screen py-2">
        <SectionWrapper>
          <div className="text-center">
            <p className="text-muted-foreground">No predictions data available</p>
          </div>
        </SectionWrapper>
      </div>
    )
  }

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
    return `$${value.toFixed(0)}`
  }

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-xl">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm flex items-center gap-2" style={{ color: entry.color }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              {entry.name}: {typeof entry.value === 'number' ? formatCurrency(entry.value) : entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  // Use ML-generated data
  const trajectoryData = analysisData.trajectory
  const scenarioData = analysisData.scenarios
  const growthPredictions = analysisData.growthPredictions

  return (
    <div className="min-h-screen py-2">
      <SectionWrapper>
        {/* Header */}
        <div className="mb-8 opacity-0 animate-fade-in-up">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Growth Predictions
              </h1>
              <p className="text-xs text-success mt-2">🤖 Powered by ML Analysis</p>
            </div>
            <Button
              onClick={handleExport}
              disabled={isExporting}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              {isExporting ? "Exporting..." : "Export PDF"}
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatusSpotlightCard
            title="Growth"
            value={`${growthPredictions[0]?.confidence || 85}%`}
            subtitle="Confidence level"
            status="success"
            icon={TrendingUp}
            delay={100}
          />
          <StatusSpotlightCard
            title="Revenue Target"
            value={formatCurrency(trajectoryData[trajectoryData.length - 1]?.revenue || 28.2)}
            subtitle="24-month projection"
            status="success"
            icon={DollarSign}
            delay={200}
          />
          <StatusSpotlightCard
            title="Customer Target"
            value={(trajectoryData[trajectoryData.length - 1]?.customers || 5800).toLocaleString()}
            subtitle="24-month projection"
            status="success"
            icon={Users}
            delay={300}
          />
          <StatusSpotlightCard
            title="Confidence"
            value={`${growthPredictions[growthPredictions.length - 1]?.confidence || 75}%`}
            subtitle="Prediction accuracy"
            status="warning"
            icon={Target}
            delay={400}
          />
        </div>

        {/* Growth Trajectory */}
        <div className="glass-card rounded-xl p-6 mb-8 opacity-0 animate-fade-in-up stagger-5 relative">
          <div className="absolute top-4 right-4">
            <ChartInsight
              title="Growth Trajectory"
              level="High"
              summary="Strong growth trajectory predicted."
              bullets={["Revenue projected to grow 276%", "Customer base expected to expand 287%", "Market share to triple"]}
            />
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-card-foreground">
              Growth Trajectory
            </h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={trajectoryData}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="customerGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis
                  dataKey="month"
                  stroke="#64748B"
                  tick={{ fill: "#64748B", fontSize: 12 }}
                />
                <YAxis
                  yAxisId="left"
                  stroke="#64748B"
                  tick={{ fill: "#64748B", fontSize: 12 }}
                  tickFormatter={(value) => formatCurrency(value)}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#64748B"
                  tick={{ fill: "#64748B", fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#06B6D4"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#revenueGrad)"
                  name="Revenue ($M)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="customers"
                  stroke="#22C55E"
                  strokeWidth={3}
                  dot={{ fill: "#22C55E", strokeWidth: 2, r: 6 }}
                  name="Customers"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="marketShare"
                  stroke="#22D3EE"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: "#22D3EE", strokeWidth: 2, r: 4 }}
                  name="Market Share (%)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Growth Factors */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Growth Factors
              </h3>
            </div>
            <div className="space-y-4">
              {[
                { factor: "Market Expansion", score: 92, impact: "High" },
                { factor: "Product Innovation", score: 88, impact: "High" },
                { factor: "Customer Acquisition", score: 85, impact: "High" },
                { factor: "Operational Efficiency", score: 78, impact: "Medium" },
                { factor: "Brand Recognition", score: 82, impact: "Medium" },
              ].map((item, index) => (
                <div key={item.factor} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{item.factor}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          item.score >= 90 ? "bg-success" :
                          item.score >= 80 ? "bg-warning" :
                          "bg-destructive"
                        }`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-card-foreground">{item.score}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.impact === "High" ? "bg-success/10 text-success" :
                      "bg-warning/10 text-warning"
                    }`}>
                      {item.impact}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scenario Analysis */}
          <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in-up stagger-7">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Scenario Analysis
              </h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scenarioData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                  <XAxis
                    dataKey="period"
                    stroke="#64748B"
                    tick={{ fill: "#64748B", fontSize: 11 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis
                    stroke="#64748B"
                    tick={{ fill: "#64748B", fontSize: 12 }}
                    tickFormatter={(value) => formatCurrency(value)}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ paddingTop: "20px" }}
                    formatter={(value: any) => (
                      <span className="text-muted-foreground text-sm">{value}</span>
                    )}
                  />
                  <Bar dataKey="optimistic" name="Optimistic" fill="#22C55E" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="baseline" name="Baseline" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="conservative" name="Conservative" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Prediction Timeline */}
        <div className="glass-card rounded-xl p-6 mb-8 opacity-0 animate-fade-in-up stagger-8">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-card-foreground">
              Prediction Timeline
            </h3>
          </div>
          <div className="space-y-4">
            {growthPredictions.map((prediction: any, index: number) => (
              <div key={prediction.period} className="border-l-4 border-l-primary/20 pl-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-card-foreground">{prediction.period}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    prediction.status === "success" ? "bg-success/10 text-success" :
                    prediction.status === "warning" ? "bg-warning/10 text-warning" :
                    "bg-destructive/10 text-destructive"
                  }`}>
                    {prediction.confidence}% Confidence
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {prediction.metrics.map((metric: any, metricIndex: number) => (
                    <div key={metric.label} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{metric.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-card-foreground">{metric.value}</span>
                        {metric.change && (
                          <span className={`text-sm font-medium ${
                            metric.positive ? "text-success" : "text-destructive"
                          }`}>
                            {metric.positive ? "+" : ""}{metric.change}%
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}
