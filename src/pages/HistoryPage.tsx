import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SectionHeader } from "@/components/ui/section-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import {
  History,
  Building2,
  Eye,
  Download,
  Calendar,
  TrendingUp,
  Clock,
} from "lucide-react";

const analysisHistory = [
  {
    id: 1,
    companyName: "TechVenture Inc.",
    industry: "Technology",
    stage: "Growth",
    healthScore: 78,
    riskLevel: "Medium",
    date: "2024-01-15",
    status: "complete",
  },
  {
    id: 2,
    companyName: "HealthFirst Solutions",
    industry: "Healthcare",
    stage: "Early Stage",
    healthScore: 65,
    riskLevel: "Medium",
    date: "2024-01-12",
    status: "complete",
  },
  {
    id: 3,
    companyName: "GreenEnergy Corp",
    industry: "Energy",
    stage: "Mature",
    healthScore: 85,
    riskLevel: "Low",
    date: "2024-01-10",
    status: "complete",
  },
  {
    id: 4,
    companyName: "FinanceFlow Ltd",
    industry: "Finance",
    stage: "Growth",
    healthScore: 72,
    riskLevel: "Medium",
    date: "2024-01-08",
    status: "complete",
  },
  {
    id: 5,
    companyName: "RetailMax Inc.",
    industry: "Retail",
    stage: "Expansion",
    healthScore: 58,
    riskLevel: "High",
    date: "2024-01-05",
    status: "complete",
  },
];

const summaryStats = {
  totalAnalyses: 24,
  thisMonth: 5,
  avgHealthScore: 72,
  topIndustry: "Technology",
};

export default function HistoryPage() {
  const getHealthScoreVariant = (score: number) => {
    if (score >= 75) return "success";
    if (score >= 50) return "warning";
    return "danger";
  };

  const getRiskVariant = (risk: string) => {
    switch (risk) {
      case "Low":
        return "success";
      case "Medium":
        return "warning";
      case "High":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <SectionHeader
          title="Analysis History"
          subtitle="View and manage your previously analyzed companies"
          icon={History}
        />

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass-card-hover p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <History className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{summaryStats.totalAnalyses}</p>
                <p className="text-sm text-muted-foreground">Total Analyses</p>
              </div>
            </div>
          </div>
          <div className="glass-card-hover p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{summaryStats.thisMonth}</p>
                <p className="text-sm text-muted-foreground">This Month</p>
              </div>
            </div>
          </div>
          <div className="glass-card-hover p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-info/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold">{summaryStats.avgHealthScore}%</p>
                <p className="text-sm text-muted-foreground">Avg Health Score</p>
              </div>
            </div>
          </div>
          <div className="glass-card-hover p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{summaryStats.topIndustry}</p>
                <p className="text-sm text-muted-foreground">Top Industry</p>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis List */}
        <div className="glass-card overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold">Recent Analyses</h3>
          </div>
          <div className="divide-y divide-border">
            {analysisHistory.map((analysis) => (
              <div
                key={analysis.id}
                className="p-4 hover:bg-secondary/30 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{analysis.companyName}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-muted-foreground">{analysis.industry}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{analysis.stage}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{analysis.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Health Score</p>
                        <StatusBadge
                          label={`${analysis.healthScore}/100`}
                          variant={getHealthScoreVariant(analysis.healthScore) as "success" | "warning" | "danger"}
                          size="sm"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Risk Level</p>
                        <StatusBadge
                          label={analysis.riskLevel}
                          variant={getRiskVariant(analysis.riskLevel) as "success" | "warning" | "danger"}
                          size="sm"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Download className="w-4 h-4" />
                        Export
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Note */}
        <div className="glass-card p-4 flex items-start gap-3 border border-info/30 bg-info/5">
          <Download className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Export Reports</p>
            <p className="text-xs text-muted-foreground mt-1">
              Click the export button to download a detailed PDF report of any analysis. 
              Reports include all metrics, charts, and AI recommendations.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
