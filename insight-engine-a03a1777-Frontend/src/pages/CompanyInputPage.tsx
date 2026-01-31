import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { SectionHeader } from "@/components/ui/section-header";
import {
  Building2,
  DollarSign,
  Users,
  Globe,
  Shield,
  Loader2,
  Send,
  Info,
  TrendingUp,
  Factory,
} from "lucide-react";
import { toast } from "sonner";

export default function CompanyInputPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Info
    companyName: "",
    industry: "",
    foundedYear: "",
    headquarters: "",
    description: "",
    // Scale & Stage
    employeeCount: "",
    companyStage: "",
    fundingRound: "",
    totalFunding: "",
    // Financial
    annualRevenue: "",
    revenueGrowth: [15],
    profitMargin: [10],
    operationalCost: "",
    burnRate: "",
    // Market
    marketSize: "",
    competitionLevel: "",
    marketShare: [5],
    industryGrowth: [8],
    // Customer
    customerBase: "",
    customerSatisfaction: [75],
    retentionRate: [80],
    churnRate: "",
    // Operations
    techStack: "",
    automationLevel: [50],
    regulatoryCompliance: "",
    riskFactors: "",
  });

  const handleInputChange = (field: string, value: string | number[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast.success("Analysis complete!", {
      description: "Your business data has been processed successfully.",
    });
    
    setIsSubmitting(false);
    navigate("/dashboard");
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          title="Company Data Input"
          subtitle="Enter comprehensive business information for analysis"
          icon={Building2}
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Company Information */}
          <div className="form-section">
            <div className="form-section-title">
              <Building2 className="w-5 h-5 text-primary" />
              Basic Company Information
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  placeholder="Enter company name"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry Sector *</Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) => handleInputChange("industry", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance & Banking</SelectItem>
                    <SelectItem value="retail">Retail & E-commerce</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="energy">Energy & Utilities</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="foundedYear">Founded Year</Label>
                <Input
                  id="foundedYear"
                  type="number"
                  placeholder="e.g., 2015"
                  min="1900"
                  max="2024"
                  value={formData.foundedYear}
                  onChange={(e) => handleInputChange("foundedYear", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="headquarters">Headquarters Location</Label>
                <Input
                  id="headquarters"
                  placeholder="City, Country"
                  value={formData.headquarters}
                  onChange={(e) => handleInputChange("headquarters", e.target.value)}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the company's business model and operations..."
                  rows={3}
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Company Scale & Stage */}
          <div className="form-section">
            <div className="form-section-title">
              <TrendingUp className="w-5 h-5 text-primary" />
              Company Scale & Stage
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employeeCount">Employee Count</Label>
                <Select
                  value={formData.employeeCount}
                  onValueChange={(value) => handleInputChange("employeeCount", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10</SelectItem>
                    <SelectItem value="11-50">11-50</SelectItem>
                    <SelectItem value="51-200">51-200</SelectItem>
                    <SelectItem value="201-500">201-500</SelectItem>
                    <SelectItem value="501-1000">501-1000</SelectItem>
                    <SelectItem value="1000+">1000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyStage">Company Stage</Label>
                <Select
                  value={formData.companyStage}
                  onValueChange={(value) => handleInputChange("companyStage", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="idea">Idea Stage</SelectItem>
                    <SelectItem value="mvp">MVP / Prototype</SelectItem>
                    <SelectItem value="early">Early Stage</SelectItem>
                    <SelectItem value="growth">Growth Stage</SelectItem>
                    <SelectItem value="expansion">Expansion</SelectItem>
                    <SelectItem value="mature">Mature</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fundingRound">Latest Funding Round</Label>
                <Select
                  value={formData.fundingRound}
                  onValueChange={(value) => handleInputChange("fundingRound", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select round" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bootstrap">Bootstrapped</SelectItem>
                    <SelectItem value="pre-seed">Pre-Seed</SelectItem>
                    <SelectItem value="seed">Seed</SelectItem>
                    <SelectItem value="series-a">Series A</SelectItem>
                    <SelectItem value="series-b">Series B</SelectItem>
                    <SelectItem value="series-c">Series C+</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalFunding">Total Funding (USD)</Label>
                <Input
                  id="totalFunding"
                  placeholder="e.g., 5000000"
                  type="number"
                  value={formData.totalFunding}
                  onChange={(e) => handleInputChange("totalFunding", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Financial Metrics */}
          <div className="form-section">
            <div className="form-section-title">
              <DollarSign className="w-5 h-5 text-primary" />
              Financial Metrics
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="annualRevenue">Annual Revenue (USD)</Label>
                <Input
                  id="annualRevenue"
                  placeholder="e.g., 1000000"
                  type="number"
                  value={formData.annualRevenue}
                  onChange={(e) => handleInputChange("annualRevenue", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="operationalCost">Monthly Operational Cost (USD)</Label>
                <Input
                  id="operationalCost"
                  placeholder="e.g., 50000"
                  type="number"
                  value={formData.operationalCost}
                  onChange={(e) => handleInputChange("operationalCost", e.target.value)}
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label>Revenue Growth Rate (%)</Label>
                  <span className="text-sm font-medium text-primary">{formData.revenueGrowth[0]}%</span>
                </div>
                <Slider
                  value={formData.revenueGrowth}
                  onValueChange={(value) => handleInputChange("revenueGrowth", value)}
                  max={100}
                  min={-50}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label>Profit Margin (%)</Label>
                  <span className="text-sm font-medium text-primary">{formData.profitMargin[0]}%</span>
                </div>
                <Slider
                  value={formData.profitMargin}
                  onValueChange={(value) => handleInputChange("profitMargin", value)}
                  max={50}
                  min={-50}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="burnRate">Monthly Burn Rate (USD)</Label>
                <Input
                  id="burnRate"
                  placeholder="e.g., 100000"
                  type="number"
                  value={formData.burnRate}
                  onChange={(e) => handleInputChange("burnRate", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Market & Business Model */}
          <div className="form-section">
            <div className="form-section-title">
              <Globe className="w-5 h-5 text-primary" />
              Market & Business Model
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="marketSize">Target Market Size (USD)</Label>
                <Select
                  value={formData.marketSize}
                  onValueChange={(value) => handleInputChange("marketSize", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select market size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">&lt; $100M</SelectItem>
                    <SelectItem value="medium">$100M - $1B</SelectItem>
                    <SelectItem value="large">$1B - $10B</SelectItem>
                    <SelectItem value="massive">&gt; $10B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="competitionLevel">Competition Level</Label>
                <Select
                  value={formData.competitionLevel}
                  onValueChange={(value) => handleInputChange("competitionLevel", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (Few competitors)</SelectItem>
                    <SelectItem value="medium">Medium (Some competitors)</SelectItem>
                    <SelectItem value="high">High (Many competitors)</SelectItem>
                    <SelectItem value="intense">Intense (Saturated market)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label>Market Share (%)</Label>
                  <span className="text-sm font-medium text-primary">{formData.marketShare[0]}%</span>
                </div>
                <Slider
                  value={formData.marketShare}
                  onValueChange={(value) => handleInputChange("marketShare", value)}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label>Industry Growth Rate (%)</Label>
                  <span className="text-sm font-medium text-primary">{formData.industryGrowth[0]}%</span>
                </div>
                <Slider
                  value={formData.industryGrowth}
                  onValueChange={(value) => handleInputChange("industryGrowth", value)}
                  max={50}
                  min={-20}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Customer & Brand Metrics */}
          <div className="form-section">
            <div className="form-section-title">
              <Users className="w-5 h-5 text-primary" />
              Customer & Brand Metrics
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="customerBase">Customer Base Size</Label>
                <Input
                  id="customerBase"
                  placeholder="e.g., 10000"
                  type="number"
                  value={formData.customerBase}
                  onChange={(e) => handleInputChange("customerBase", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="churnRate">Monthly Churn Rate (%)</Label>
                <Input
                  id="churnRate"
                  placeholder="e.g., 5"
                  type="number"
                  max={100}
                  value={formData.churnRate}
                  onChange={(e) => handleInputChange("churnRate", e.target.value)}
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label>Customer Satisfaction Score</Label>
                  <span className="text-sm font-medium text-primary">{formData.customerSatisfaction[0]}%</span>
                </div>
                <Slider
                  value={formData.customerSatisfaction}
                  onValueChange={(value) => handleInputChange("customerSatisfaction", value)}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label>Customer Retention Rate</Label>
                  <span className="text-sm font-medium text-primary">{formData.retentionRate[0]}%</span>
                </div>
                <Slider
                  value={formData.retentionRate}
                  onValueChange={(value) => handleInputChange("retentionRate", value)}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Operational & Risk Factors */}
          <div className="form-section">
            <div className="form-section-title">
              <Shield className="w-5 h-5 text-primary" />
              Operational & Risk Factors
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="techStack">Primary Technology Stack</Label>
                <Input
                  id="techStack"
                  placeholder="e.g., Cloud, AI/ML, SaaS"
                  value={formData.techStack}
                  onChange={(e) => handleInputChange("techStack", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="regulatoryCompliance">Regulatory Compliance Status</Label>
                <Select
                  value={formData.regulatoryCompliance}
                  onValueChange={(value) => handleInputChange("regulatoryCompliance", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Fully Compliant</SelectItem>
                    <SelectItem value="partial">Partially Compliant</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                    <SelectItem value="na">Not Applicable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label>Automation Level</Label>
                  <span className="text-sm font-medium text-primary">{formData.automationLevel[0]}%</span>
                </div>
                <Slider
                  value={formData.automationLevel}
                  onValueChange={(value) => handleInputChange("automationLevel", value)}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="riskFactors">Known Risk Factors</Label>
                <Textarea
                  id="riskFactors"
                  placeholder="Describe any known risks, dependencies, or vulnerabilities..."
                  rows={3}
                  value={formData.riskFactors}
                  onChange={(e) => handleInputChange("riskFactors", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Info Note */}
          <div className="glass-card p-4 flex items-start gap-3 border border-info/30 bg-info/5">
            <Info className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground font-medium">Data Privacy Notice</p>
              <p className="text-xs text-muted-foreground mt-1">
                All data entered is processed locally for analysis purposes. No information is stored permanently or shared with third parties.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate("/")}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-primary hover:opacity-90 text-primary-foreground min-w-[160px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Run Analysis
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
