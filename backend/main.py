from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Literal


app = FastAPI(
    title="Business Analysis & Prediction Backend",
    version="0.1.0",
    description="FastAPI backend for the Business Analysis & Prediction System (BAPS).",
)


# Allow local Next.js dev server and typical frontends
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CompanyInput(BaseModel):
    # Company info
    companyName: str = ""
    industry: str = ""
    foundedYear: str = ""
    location: str = ""
    primaryMarketRegion: str = ""
    businessModel: str = ""
    companyStage: str = ""

    # Financial data
    revenue: str = ""
    expenses: str = ""
    profitMargin: str = ""
    burnRate: str = ""
    cashBalance: str = ""
    revenueHistory: str = ""
    revenueType: str = ""
    totalFunding: str = ""
    operationalCost: str = ""

    # Market & growth
    marketSize: str = ""
    competitorCount: str = ""
    growthRate: str = ""
    marketShare: str = ""
    industryGrowthRate: str = ""
    customerTypeMix: str = ""
    arpu: str = ""

    # Team & operations
    teamSize: str = ""
    customerCount: str = ""
    churnRate: str = ""
    nps: str = ""
    customerSatisfaction: str = ""
    founderExperience: str = ""
    regulatoryExposure: str = ""


class SummaryMetric(BaseModel):
    label: str
    value: str
    positive: bool
    change: float | None = None


class Prediction(BaseModel):
    period: str
    confidence: float
    status: Literal["success", "warning", "danger"]
    metrics: List[SummaryMetric]


class TrajectoryPoint(BaseModel):
    month: str
    revenue: float
    customers: int
    marketShare: float


class ScenarioPoint(BaseModel):
    period: str
    optimistic: float
    baseline: float
    conservative: float


class AnalysisSummary(BaseModel):
    businessHealth: float = Field(..., description="0-100 overall health score")
    riskLevel: Literal["Low", "Medium", "High"]
    investmentReadiness: str
    failureProbability: float


class AnalysisResult(BaseModel):
    input: CompanyInput
    summary: AnalysisSummary
    growthPredictions: List[Prediction]
    trajectory: List[TrajectoryPoint]
    scenarios: List[ScenarioPoint]


@app.get("/api/health")
def health_check() -> dict:
    return {"status": "ok", "message": "Backend is running"}


def _safe_float(value: str, default: float = 0.0) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return default


def _safe_int(value: str, default: int = 0) -> int:
    try:
        return int(float(value))
    except (TypeError, ValueError):
        return default


@app.post("/api/analyze-company", response_model=AnalysisResult)
def analyze_company(payload: CompanyInput) -> AnalysisResult:
    """
    Basic deterministic analysis of the company input.

    This is a placeholder implementation to be replaced with
    a proper machine learning model in the future.
    """

    # --- Heuristic scoring (placeholder instead of ML) ---
    revenue = _safe_float(payload.revenue)
    profit_margin = _safe_float(payload.profitMargin)
    churn = _safe_float(payload.churnRate)
    growth = _safe_float(payload.growthRate)
    industry_growth = _safe_float(payload.industryGrowthRate)
    runway_months = 0.0

    burn = _safe_float(payload.burnRate)
    cash = _safe_float(payload.cashBalance)
    if burn > 0:
        runway_months = cash / burn

    # Simple, explainable score components
    health_components: list[float] = []

    if revenue > 0:
        health_components.append(min(40.0, revenue ** 0.25))  # diminishing returns
    if profit_margin > 0:
        health_components.append(min(25.0, profit_margin * 0.6))
    if growth > 0:
        health_components.append(min(20.0, growth * 0.4))
    if industry_growth > 0:
        health_components.append(min(10.0, industry_growth * 0.4))
    if runway_months > 0:
        health_components.append(min(15.0, runway_months * 0.8))

    churn_penalty = min(20.0, max(0.0, churn - 1.5) * 4.0)
    health_raw = max(10.0, sum(health_components) - churn_penalty)
    business_health = float(max(0.0, min(100.0, health_raw)))

    if business_health >= 80:
        risk_level: Literal["Low", "Medium", "High"] = "Low"
        failure_prob = max(5.0, 25.0 - business_health * 0.1)
        investment_grade = "A-"
    elif business_health >= 55:
        risk_level = "Medium"
        failure_prob = max(10.0, 40.0 - business_health * 0.1)
        investment_grade = "B"
    else:
        risk_level = "High"
        failure_prob = max(20.0, 55.0 - business_health * 0.1)
        investment_grade = "C+"

    # --- Placeholder predictions based on heuristic scores ---
    base_rev_millions = revenue / 1_000_000 or 7.5
    base_customers = _safe_int(payload.customerCount) or 1500
    base_share = _safe_float(payload.marketShare) or 2.5

    def scale_factor(months: int) -> float:
        # boost factor if growth & industry are strong
        growth_boost = 1.0 + growth / 100.0
        industry_boost = 1.0 + industry_growth / 200.0
        health_boost = 0.8 + business_health / 200.0
        return (1 + (months / 36)) * growth_boost * industry_boost * health_boost

    trajectory = [
        TrajectoryPoint(
            month="Now",
            revenue=round(base_rev_millions, 1),
            customers=base_customers,
            marketShare=round(base_share, 1),
        ),
        TrajectoryPoint(
            month="3M",
            revenue=round(base_rev_millions * scale_factor(3), 1),
            customers=int(base_customers * scale_factor(3)),
            marketShare=round(base_share * (1 + growth / 400.0), 1),
        ),
        TrajectoryPoint(
            month="6M",
            revenue=round(base_rev_millions * scale_factor(6), 1),
            customers=int(base_customers * scale_factor(6)),
            marketShare=round(base_share * (1 + growth / 300.0), 1),
        ),
        TrajectoryPoint(
            month="12M",
            revenue=round(base_rev_millions * scale_factor(12), 1),
            customers=int(base_customers * scale_factor(12)),
            marketShare=round(base_share * (1 + growth / 200.0), 1),
        ),
        TrajectoryPoint(
            month="24M",
            revenue=round(base_rev_millions * scale_factor(24), 1),
            customers=int(base_customers * scale_factor(24)),
            marketShare=round(base_share * (1 + growth / 150.0), 1),
        ),
    ]

    scenarios = [
        ScenarioPoint(
            period="Q1 2026",
            optimistic=round(trajectory[1].revenue * 1.05, 1),
            baseline=round(trajectory[1].revenue, 1),
            conservative=round(trajectory[1].revenue * 0.9, 1),
        ),
        ScenarioPoint(
            period="Q2 2026",
            optimistic=round(trajectory[2].revenue * 1.08, 1),
            baseline=round(trajectory[2].revenue, 1),
            conservative=round(trajectory[2].revenue * 0.9, 1),
        ),
        ScenarioPoint(
            period="Q3 2026",
            optimistic=round(trajectory[3].revenue * 1.1, 1),
            baseline=round(trajectory[3].revenue * 0.9, 1),
            conservative=round(trajectory[3].revenue * 0.8, 1),
        ),
        ScenarioPoint(
            period="Q4 2026",
            optimistic=round(trajectory[4].revenue * 1.1, 1),
            baseline=round(trajectory[4].revenue * 0.9, 1),
            conservative=round(trajectory[4].revenue * 0.75, 1),
        ),
    ]

    growth_predictions: list[Prediction] = []
    for months, label in [(3, "3 Months"), (6, "6 Months"), (12, "12 Months"), (24, "24 Months")]:
        t = trajectory[{3: 1, 6: 2, 12: 3, 24: 4}[months]]
        confidence = max(50.0, min(95.0, business_health - months * 0.6))
        status: Literal["success", "warning", "danger"]
        if confidence >= 80:
            status = "success"
        elif confidence >= 65:
            status = "warning"
        else:
            status = "danger"

        growth_predictions.append(
            Prediction(
                period=label,
                confidence=round(confidence, 1),
                status=status,
                metrics=[
                    SummaryMetric(
                        label="Revenue",
                        value=f"${t.revenue:.1f}M",
                        positive=True,
                        change=round((t.revenue / base_rev_millions - 1) * 100, 1),
                    ),
                    SummaryMetric(
                        label="Customers",
                        value=f"{t.customers:,}",
                        positive=True,
                        change=round((t.customers / base_customers - 1) * 100, 1),
                    ),
                ],
            )
        )

    summary = AnalysisSummary(
        businessHealth=round(business_health, 1),
        riskLevel=risk_level,
        investmentReadiness=investment_grade,
        failureProbability=round(failure_prob, 1),
    )

    # NOTE: This is the main integration point for the future ML model.
    # Replace the heuristic scoring and trajectory generation above with your
    # trained model's outputs, keeping the response schema compatible.

    return AnalysisResult(
        input=payload,
        summary=summary,
        growthPredictions=growth_predictions,
        trajectory=trajectory,
        scenarios=scenarios,
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

