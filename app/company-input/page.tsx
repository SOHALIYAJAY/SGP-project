"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Footer from "@/components/footer"
import {
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  Globe,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react"

const steps = [
  { id: 1, title: "Company Info", icon: Building2 },
  { id: 2, title: "Financial Data", icon: DollarSign },
  { id: 3, title: "Market & Growth", icon: TrendingUp },
  { id: 4, title: "Team & Operations", icon: Users },
]

export default function CompanyInputPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    foundedYear: "",
    location: "",
    primaryMarketRegion: "",
    businessModel: "",
    revenue: "",
    expenses: "",
    profitMargin: "",
    burnRate: "",
    cashBalance: "",
    revenueHistory: "",
    revenueType: "",
    marketSize: "",
    competitorCount: "",
    growthRate: "",
    marketShare: "",
    customerTypeMix: "",
    arpu: "",
    teamSize: "",
    customerCount: "",
    churnRate: "",
    nps: "",
    companyStage: "",
    totalFunding: "",
    operationalCost: "",
    industryGrowthRate: "",
    customerSatisfaction: "",
    founderExperience: "",
    regulatoryExposure: "",
  })

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1)
    } else {
      router.push("/dashboard")
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  return (
    <div className="pt-24 pb-0 onboarding-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 opacity-0 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Company Analysis Input
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Provide your company details to generate comprehensive analysis and predictions
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12 opacity-0 animate-fade-in-up stagger-1">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isComplete = currentStep > step.id
              const stepClass = `step-${step.id}`
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center relative ${
                        isComplete
                          ? "step-indicator-complete"
                          : isActive
                          ? `step-indicator-active ${stepClass} animate-step-active`
                          : "step-indicator-inactive"
                      }`}
                    >
                      {isComplete ? (
                        <CheckCircle2 className="w-6 h-6 animate-step-checkmark" />
                      ) : (
                        <Icon className={`w-5 h-5 ${isActive ? 'animate-step-bounce' : ''}`} />
                      )}
                    </div>
                    <span
                      className={`mt-2 text-xs font-medium transition-colors duration-300 ${
                        isActive || isComplete
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 mx-2 h-0.5 bg-secondary/40 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isComplete 
                            ? `step-connector-active step-${step.id}-connector animate-connector-fill` 
                            : 'w-0'
                        }`}
                        style={{
                          width: isComplete ? '100%' : '0%',
                        }}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Form Card */}
        <div className="form-card-glow rounded-2xl p-6 md:p-8 opacity-0 animate-fade-in-up stagger-2">
          {/* Step 1: Company Info */}
          {currentStep === 1 && (
            <div key={currentStep} className="space-y-6 section-cyan animate-step-content-in">
              <div className="flex items-center gap-3 mb-6 animate-title-change">
                <div className="w-10 h-10 rounded-lg section-icon flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-card-foreground">
                    Company Information
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Basic details about your company
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    placeholder="Enter company name"
                    value={formData.companyName}
                    onChange={(e) => updateFormData("companyName", e.target.value)}
                    className="form-input-premium form-input-cyan"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    placeholder="e.g., Technology, Healthcare"
                    value={formData.industry}
                    onChange={(e) => updateFormData("industry", e.target.value)}
                    className="form-input-premium form-input-cyan"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="foundedYear">Founded Year</Label>
                  <Input
                    id="foundedYear"
                    placeholder="e.g., 2020"
                    type="number"
                    value={formData.foundedYear}
                    onChange={(e) => updateFormData("foundedYear", e.target.value)}
                    className="form-input-premium form-input-cyan"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Headquarters Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., San Francisco, CA"
                    value={formData.location}
                    onChange={(e) => updateFormData("location", e.target.value)}
                    className="form-input-premium form-input-cyan"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyStage">Company Stage</Label>
                  <Input
                    id="companyStage"
                    placeholder="e.g., Seed, Series A, Growth"
                    value={formData.companyStage}
                    onChange={(e) => updateFormData("companyStage", e.target.value)}
                    className="form-input-premium form-input-cyan"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primaryMarketRegion">Primary Market Region</Label>
                  <Input
                    id="primaryMarketRegion"
                    placeholder="e.g., North America, Europe, Asia"
                    value={formData.primaryMarketRegion}
                    onChange={(e) => updateFormData("primaryMarketRegion", e.target.value)}
                    className="form-input-premium form-input-cyan"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="businessModel">Business Model</Label>
                  <Input
                    id="businessModel"
                    placeholder="e.g., SaaS, Marketplace, E-commerce"
                    value={formData.businessModel}
                    onChange={(e) => updateFormData("businessModel", e.target.value)}
                    className="form-input-premium form-input-cyan"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Financial Data */}
          {currentStep === 2 && (
            <div key={currentStep} className="space-y-6 section-green animate-step-content-in">
              <div className="flex items-center gap-3 mb-6 animate-title-change">
                <div className="w-10 h-10 rounded-lg section-icon flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-card-foreground">
                    Financial Data
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Key financial metrics and performance
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="revenue">Annual Revenue ($)</Label>
                  <Input
                    id="revenue"
                    placeholder="e.g., 5000000"
                    type="number"
                    value={formData.revenue}
                    onChange={(e) => updateFormData("revenue", e.target.value)}
                    className="form-input-premium form-input-green"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expenses">Annual Expenses ($)</Label>
                  <Input
                    id="expenses"
                    placeholder="e.g., 3500000"
                    type="number"
                    value={formData.expenses}
                    onChange={(e) => updateFormData("expenses", e.target.value)}
                    className="form-input-premium form-input-green"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profitMargin">Profit Margin (%)</Label>
                  <Input
                    id="profitMargin"
                    placeholder="e.g., 25"
                    type="number"
                    value={formData.profitMargin}
                    onChange={(e) => updateFormData("profitMargin", e.target.value)}
                    className="form-input-premium form-input-green"
                  />
                  <p className="form-field-hint">% of revenue after expenses</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="burnRate">Monthly Burn Rate ($)</Label>
                  <Input
                    id="burnRate"
                    placeholder="e.g., 150000"
                    type="number"
                    value={formData.burnRate}
                    onChange={(e) => updateFormData("burnRate", e.target.value)}
                    className="form-input-premium form-input-green"
                  />
                  <p className="form-field-hint">Cash spent monthly on operations</p>
                </div>
                    <div className="space-y-2">
                      <Label htmlFor="totalFunding">Total Funding ($)</Label>
                      <Input
                        id="totalFunding"
                        placeholder="e.g., 12000000"
                        type="number"
                        value={formData.totalFunding}
                        onChange={(e) => updateFormData("totalFunding", e.target.value)}
                        className="form-input-premium form-input-green"
                      />
                      <p className="form-field-hint">All capital raised to date</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="operationalCost">Operational Cost ($/mo)</Label>
                      <Input
                        id="operationalCost"
                        placeholder="e.g., 150000"
                        type="number"
                        value={formData.operationalCost}
                        onChange={(e) => updateFormData("operationalCost", e.target.value)}
                        className="form-input-premium form-input-green"
                      />
                      <p className="form-field-hint">Total monthly operating expenses</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cashBalance">Cash Balance ($)</Label>
                      <Input
                        id="cashBalance"
                        placeholder="e.g., 2500000"
                        type="number"
                        value={formData.cashBalance}
                        onChange={(e) => updateFormData("cashBalance", e.target.value)}
                        className="form-input-premium form-input-green"
                      />
                      <p className="form-field-hint">Current cash on hand</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="revenueHistory">Revenue History (last 6-12 months)</Label>
                      <Input
                        id="revenueHistory"
                        placeholder="e.g., 400k, 450k, 500k, 550k, 600k, 650k"
                        value={formData.revenueHistory}
                        onChange={(e) => updateFormData("revenueHistory", e.target.value)}
                        className="form-input-premium form-input-green"
                      />
                      <p className="form-field-hint">Comma-separated monthly revenue</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="revenueType">Revenue Type</Label>
                      <Input
                        id="revenueType"
                        placeholder="e.g., Recurring, One-time, Mixed"
                        value={formData.revenueType}
                        onChange={(e) => updateFormData("revenueType", e.target.value)}
                        className="form-input-premium form-input-green"
                      />
                    </div>
              </div>
            </div>
          )}

          {/* Step 3: Market & Growth */}
          {currentStep === 3 && (
            <div key={currentStep} className="space-y-6 section-purple animate-step-content-in">
              <div className="flex items-center gap-3 mb-6 animate-title-change">
                <div className="w-10 h-10 rounded-lg section-icon flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-card-foreground">
                    Market & Growth
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Market position and growth metrics
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="marketSize">Total Addressable Market ($B)</Label>
                  <Input
                    id="marketSize"
                    placeholder="e.g., 50"
                    type="number"
                    value={formData.marketSize}
                    onChange={(e) => updateFormData("marketSize", e.target.value)}
                    className="form-input-premium form-input-purple"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="competitorCount">Number of Competitors</Label>
                  <Input
                    id="competitorCount"
                    placeholder="e.g., 15"
                    type="number"
                    value={formData.competitorCount}
                    onChange={(e) => updateFormData("competitorCount", e.target.value)}
                    className="form-input-premium form-input-purple"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="growthRate">YoY Growth Rate (%)</Label>
                  <Input
                    id="growthRate"
                    placeholder="e.g., 85"
                    type="number"
                    value={formData.growthRate}
                    onChange={(e) => updateFormData("growthRate", e.target.value)}
                    className="form-input-premium form-input-purple"
                  />
                  <p className="form-field-hint">Year-over-year percentage increase</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="marketShare">Current Market Share (%)</Label>
                  <Input
                    id="marketShare"
                    placeholder="e.g., 2.5"
                    type="number"
                    value={formData.marketShare}
                    onChange={(e) => updateFormData("marketShare", e.target.value)}
                    className="form-input-premium form-input-purple"
                  />
                  <p className="form-field-hint">Percentage of addressable market</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industryGrowthRate">Industry Growth Rate (%)</Label>
                  <Input
                    id="industryGrowthRate"
                    placeholder="e.g., 24"
                    type="number"
                    value={formData.industryGrowthRate}
                    onChange={(e) => updateFormData("industryGrowthRate", e.target.value)}
                    className="form-input-premium form-input-purple"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerTypeMix">Customer Type Mix</Label>
                  <Input
                    id="customerTypeMix"
                    placeholder="e.g., 70% B2B, 30% B2C"
                    value={formData.customerTypeMix}
                    onChange={(e) => updateFormData("customerTypeMix", e.target.value)}
                    className="form-input-premium form-input-purple"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="arpu">Average Revenue per Customer ($)</Label>
                  <Input
                    id="arpu"
                    placeholder="e.g., 5000"
                    type="number"
                    value={formData.arpu}
                    onChange={(e) => updateFormData("arpu", e.target.value)}
                    className="form-input-premium form-input-purple"
                  />
                  <p className="form-field-hint">ARPU or ARPA</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Team & Operations */}
          {currentStep === 4 && (
            <div key={currentStep} className="space-y-6 section-amber animate-step-content-in">
              <div className="flex items-center gap-3 mb-6 animate-title-change">
                <div className="w-10 h-10 rounded-lg section-icon flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-card-foreground">
                    Team & Operations
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Team size and customer metrics
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="teamSize">Team Size</Label>
                  <Input
                    id="teamSize"
                    placeholder="e.g., 50"
                    type="number"
                    value={formData.teamSize}
                    onChange={(e) => updateFormData("teamSize", e.target.value)}
                    className="form-input-premium form-input-amber"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerCount">Total Customers</Label>
                  <Input
                    id="customerCount"
                    placeholder="e.g., 1500"
                    type="number"
                    value={formData.customerCount}
                    onChange={(e) => updateFormData("customerCount", e.target.value)}
                    className="form-input-premium form-input-amber"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="churnRate">Monthly Churn Rate (%)</Label>
                  <Input
                    id="churnRate"
                    placeholder="e.g., 2.5"
                    type="number"
                    value={formData.churnRate}
                    onChange={(e) => updateFormData("churnRate", e.target.value)}
                    className="form-input-premium form-input-amber"
                  />
                  <p className="form-field-hint">% of customers lost monthly</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nps">Net Promoter Score</Label>
                  <Input
                    id="nps"
                    placeholder="e.g., 72"
                    type="number"
                    value={formData.nps}
                    onChange={(e) => updateFormData("nps", e.target.value)}
                    className="form-input-premium form-input-amber"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerSatisfaction">Customer Satisfaction (0-100)</Label>
                  <Input
                    id="customerSatisfaction"
                    placeholder="e.g., 88"
                    type="number"
                    value={formData.customerSatisfaction}
                    onChange={(e) => updateFormData("customerSatisfaction", e.target.value)}
                    className="form-input-premium form-input-amber"
                  />
                  <p className="form-field-hint">NPS or CSAT score</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="founderExperience">Founder Experience (years)</Label>
                  <Input
                    id="founderExperience"
                    placeholder="e.g., 10"
                    type="number"
                    value={formData.founderExperience}
                    onChange={(e) => updateFormData("founderExperience", e.target.value)}
                    className="form-input-premium form-input-amber"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regulatoryExposure">Regulatory Exposure Level</Label>
                  <Input
                    id="regulatoryExposure"
                    placeholder="e.g., Low, Medium, High"
                    value={formData.regulatoryExposure}
                    onChange={(e) => updateFormData("regulatoryExposure", e.target.value)}
                    className="form-input-premium form-input-amber"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="btn-secondary-outline gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="text-sm text-muted-foreground">
              Step {currentStep} of {steps.length}
            </div>
            <Button
              onClick={handleNext}
              className={`gap-2 ${
                currentStep === 4
                  ? "btn-generate-analysis"
                  : currentStep === 1
                  ? "btn-primary-cta"
                  : currentStep === 2
                  ? "btn-primary-cta btn-green"
                  : currentStep === 3
                  ? "btn-primary-cta btn-purple"
                  : "btn-primary-cta btn-amber"
              }`}
            >
              {currentStep === 4 ? "Generate Analysis" : "Next"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
       <br /><br /><br /><br /><br />
      </div>
      <Footer />
    </div>
  )
}
