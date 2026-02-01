import { createContext, useContext, useState, ReactNode } from "react";

export interface CompanyAnalysis {
  id: string;
  companyName: string;
  industry: string;
  stage: string;
  healthScore: number;
  riskLevel: string;
  date: string;
  formData: Record<string, unknown>;
}

interface CompanyContextType {
  analyses: CompanyAnalysis[];
  addAnalysis: (analysis: CompanyAnalysis) => void;
  clearAnalyses: () => void;
  getAnalysis: (id: string) => CompanyAnalysis | undefined;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [analyses, setAnalyses] = useState<CompanyAnalysis[]>(() => {
    // Load from localStorage on initial render
    const saved = localStorage.getItem("companyAnalyses");
    return saved ? JSON.parse(saved) : [];
  });

  const addAnalysis = (analysis: CompanyAnalysis) => {
    const updated = [analysis, ...analyses];
    setAnalyses(updated);
    localStorage.setItem("companyAnalyses", JSON.stringify(updated));
  };

  const clearAnalyses = () => {
    setAnalyses([]);
    localStorage.removeItem("companyAnalyses");
  };

  const getAnalysis = (id: string) => {
    return analyses.find((a) => a.id === id);
  };

  return (
    <CompanyContext.Provider value={{ analyses, addAnalysis, clearAnalyses, getAnalysis }}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
}
