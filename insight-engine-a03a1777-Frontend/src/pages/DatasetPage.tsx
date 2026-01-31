import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SectionHeader } from "@/components/ui/section-header";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Database,
  FileText,
  Cpu,
  GitBranch,
  Layers,
  ArrowRight,
  CheckCircle,
  Brain,
  BarChart3,
} from "lucide-react";

const datasetSources = [
  {
    name: "Financial Databases",
    description: "SEC filings, annual reports, and financial statements from public and private companies.",
    records: "50,000+",
    type: "Structured",
  },
  {
    name: "Market Research",
    description: "Industry reports, market size data, and competitive intelligence from research firms.",
    records: "10,000+",
    type: "Mixed",
  },
  {
    name: "Company Profiles",
    description: "Detailed company information including founding date, team size, funding history.",
    records: "100,000+",
    type: "Structured",
  },
  {
    name: "Economic Indicators",
    description: "Macro-economic data, industry growth rates, and market conditions.",
    records: "5,000+",
    type: "Time Series",
  },
];

const analysisFeatures = [
  { category: "Financial Metrics", features: ["Revenue", "Profit Margin", "Burn Rate", "Runway", "Growth Rate", "Operating Costs"] },
  { category: "Market Indicators", features: ["Market Size", "Competition Level", "Industry Growth", "Market Share", "Entry Barriers"] },
  { category: "Customer Metrics", features: ["Customer Base", "Retention Rate", "Churn Rate", "NPS Score", "Lifetime Value", "CAC"] },
  { category: "Operational Data", features: ["Employee Count", "Automation Level", "Tech Stack", "Scalability", "Efficiency"] },
  { category: "Risk Factors", features: ["Financial Risk", "Regulatory Risk", "Market Risk", "Operational Risk", "Dependency Risk"] },
];

const workflowSteps = [
  { step: 1, title: "Data Input", description: "User enters company data through the input form", icon: FileText },
  { step: 2, title: "Data Validation", description: "System validates and normalizes input data", icon: CheckCircle },
  { step: 3, title: "Feature Engineering", description: "Extract and compute analysis features", icon: Layers },
  { step: 4, title: "Non-ML Analysis", description: "Rule-based scoring and threshold analysis", icon: BarChart3 },
  { step: 5, title: "ML Prediction", description: "Machine learning models for predictions", icon: Brain },
  { step: 6, title: "Report Generation", description: "Compile insights and recommendations", icon: FileText },
];

export default function DatasetPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <SectionHeader
          title="Dataset & Model Overview"
          subtitle="Understanding the data sources and analysis methodology"
          icon={Database}
        />

        {/* Dataset Sources */}
        <div className="glass-card p-6">
          <SectionHeader
            title="Dataset Sources"
            subtitle="Primary data sources used for analysis"
            icon={Database}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {datasetSources.map((source, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-secondary/50 border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold">{source.name}</h4>
                  <StatusBadge label={source.type} variant="info" size="sm" />
                </div>
                <p className="text-sm text-muted-foreground mb-3">{source.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Records:</span>
                  <span className="text-sm font-medium text-primary">{source.records}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analysis Features */}
        <div className="glass-card p-6">
          <SectionHeader
            title="Analysis Features"
            subtitle="Key features used for business analysis and prediction"
            icon={Layers}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analysisFeatures.map((category, index) => (
              <div key={index} className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  {category.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {category.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs rounded-md bg-primary/10 border border-primary/20 text-primary"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ML vs Non-ML */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-info/20 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-info" />
              </div>
              <div>
                <h3 className="font-semibold">Non-ML Analysis Module</h3>
                <p className="text-sm text-muted-foreground">Rule-based scoring system</p>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                The non-ML module uses predefined rules and thresholds to calculate scores:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span>Business health score based on weighted financial metrics</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span>Risk level classification using industry benchmarks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span>Company stage detection based on growth indicators</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span>Investment readiness scoring with VC benchmarks</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">ML Prediction Module</h3>
                <p className="text-sm text-muted-foreground">Machine learning models</p>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                The ML module uses trained models for predictive analysis:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Growth prediction using regression models</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Failure probability using classification algorithms</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Revenue trend forecasting with time series models</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>AI-powered recommendation engine</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Workflow Diagram */}
        <div className="glass-card p-6">
          <SectionHeader
            title="Analysis Workflow"
            subtitle="End-to-end data processing and analysis pipeline"
            icon={GitBranch}
          />
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {workflowSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="glass-card-hover p-4 text-center h-full">
                    <div className="w-10 h-10 rounded-xl bg-gradient-primary mx-auto mb-3 flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center z-10">
                      {step.step}
                    </div>
                    <h4 className="text-sm font-semibold mb-1">{step.title}</h4>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                  {index < workflowSteps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-2 -translate-y-1/2 z-10">
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
