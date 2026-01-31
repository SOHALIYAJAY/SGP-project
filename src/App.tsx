import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CompanyInputPage from "./pages/CompanyInputPage";
import DashboardPage from "./pages/DashboardPage";
import PredictionsPage from "./pages/PredictionsPage";
import CustomerAnalyticsPage from "./pages/CustomerAnalyticsPage";
import MarketAnalysisPage from "./pages/MarketAnalysisPage";
import FinancialAnalysisPage from "./pages/FinancialAnalysisPage";
import RiskAssessmentPage from "./pages/RiskAssessmentPage";
import AIRecommendationsPage from "./pages/AIRecommendationsPage";
import InvestmentInsightsPage from "./pages/InvestmentInsightsPage";
import HistoryPage from "./pages/HistoryPage";
import DatasetPage from "./pages/DatasetPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/input" element={<CompanyInputPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/predictions" element={<PredictionsPage />} />
          <Route path="/customer-analytics" element={<CustomerAnalyticsPage />} />
          <Route path="/market-analysis" element={<MarketAnalysisPage />} />
          <Route path="/financial-analysis" element={<FinancialAnalysisPage />} />
          <Route path="/risk-assessment" element={<RiskAssessmentPage />} />
          <Route path="/ai-recommendations" element={<AIRecommendationsPage />} />
          <Route path="/investment-insights" element={<InvestmentInsightsPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/dataset" element={<DatasetPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
