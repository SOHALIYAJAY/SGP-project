"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Footer from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
    revenue: "",
    expenses: "",
    profitMargin: "",
    burnRate: "",
    marketSize: "",
    competitorCount: "",
    growthRate: "",
    marketShare: "",
    teamSize: "",
    customerCount: "",
    churnRate: "",
    nps: "",
    companyStage: "",
    totalFunding: "",
    operationalCost: "",
    industryGrowthRate: "",
    customerSatisfaction: "",
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
    <div className="min-h-screen pt-24 pb-16">
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
              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isComplete
                          ? "bg-success text-success-foreground"
                          : isActive
                          ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {isComplete ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <span
                      className={`mt-2 text-xs font-medium ${
                        isActive || isComplete
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-12 sm:w-24 h-0.5 mx-2 transition-colors duration-300 ${
                        isComplete ? "bg-success" : "bg-secondary"
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 opacity-0 animate-fade-in-up stagger-2">
          {/* Step 1: Company Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
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
                    className="bg-secondary/50 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    placeholder="e.g., Technology, Healthcare"
                    value={formData.industry}
                    onChange={(e) => updateFormData("industry", e.target.value)}
                    className="bg-secondary/50 border-border"
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
                    className="bg-secondary/50 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Headquarters Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., San Francisco, CA"
                    value={formData.location}
                    onChange={(e) => updateFormData("location", e.target.value)}
                    className="bg-secondary/50 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyStage">Company Stage</Label>
                  <Input
                    id="companyStage"
                    placeholder="e.g., Seed, Series A, Growth"
                    value={formData.companyStage}
                    onChange={(e) => updateFormData("companyStage", e.target.value)}
                    className="bg-secondary/50 border-border"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Financial Data */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-success" />
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
                    className="bg-secondary/50 border-border"
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
                    className="bg-secondary/50 border-border"
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
                    className="bg-secondary/50 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="burnRate">Monthly Burn Rate ($)</Label>
                  <Input
                    id="burnRate"
                    placeholder="e.g., 150000"
                    type="number"
                    value={formData.burnRate}
                    onChange={(e) => updateFormData("burnRate", e.target.value)}
                    className="bg-secondary/50 border-border"
                  />
                </div>
                    <div className="space-y-2">
                      <Label htmlFor="totalFunding">Total Funding ($)</Label>
                      <Input
                        id="totalFunding"
                        placeholder="e.g., 12000000"
                        type="number"
                        value={formData.totalFunding}
                        onChange={(e) => updateFormData("totalFunding", e.target.value)}
                        className="bg-secondary/50 border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="operationalCost">Operational Cost ($/mo)</Label>
                      <Input
                        id="operationalCost"
                        placeholder="e.g., 150000"
                        type="number"
                        value={formData.operationalCost}
                        onChange={(e) => updateFormData("operationalCost", e.target.value)}
                        className="bg-secondary/50 border-border"
                      />
                    </div>
              </div>
            </div>
          )}

          {/* Step 3: Market & Growth */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
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
                    className="bg-secondary/50 border-border"
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
                    className="bg-secondary/50 border-border"
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
                    className="bg-secondary/50 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="marketShare">Current Market Share (%)</Label>
                  <Input
                    id="marketShare"
                    placeholder="e.g., 2.5"
                    type="number"
                    value={formData.marketShare}
                    onChange={(e) => updateFormData("marketShare", e.target.value)}
                    className="bg-secondary/50 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industryGrowthRate">Industry Growth Rate (%)</Label>
                  <Input
                    id="industryGrowthRate"
                    placeholder="e.g., 24"
                    type="number"
                    value={formData.industryGrowthRate}
                    onChange={(e) => updateFormData("industryGrowthRate", e.target.value)}
                    className="bg-secondary/50 border-border"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Team & Operations */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-warning" />
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
                    className="bg-secondary/50 border-border"
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
                    className="bg-secondary/50 border-border"
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
                    className="bg-secondary/50 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nps">Net Promoter Score</Label>
                  <Input
                    id="nps"
                    placeholder="e.g., 72"
                    type="number"
                    value={formData.nps}
                    onChange={(e) => updateFormData("nps", e.target.value)}
                    className="bg-secondary/50 border-border"
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
                    className="bg-secondary/50 border-border"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="gap-2 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="text-sm text-muted-foreground">
              Step {currentStep} of {steps.length}
            </div>
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground gap-2"
            >
              {currentStep === 4 ? "Generate Analysis" : "Next"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
