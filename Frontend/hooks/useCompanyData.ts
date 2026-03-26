import { useState, useEffect } from 'react'

interface CompanyData {
  companyName: string
  industry: string
  foundedYear: string
  location: string
  primaryMarketRegion: string
  businessModel: string
  companyStage: string
  revenue: string
  expenses: string
  profitMargin: string
  burnRate: string
  cashBalance: string
  revenueHistory: string
  revenueType: string
  totalFunding: string
  operationalCost: string
  marketSize: string
  competitorCount: string
  growthRate: string
  marketShare: string
  industryGrowthRate: string
  customerTypeMix: string
  arpu: string
  teamSize: string
  customerCount: string
  churnRate: string
  nps: string
  customerSatisfaction: string
  founderExperience: string
  regulatoryExposure: string
}

export function useCompanyData() {
  const [hasCompanyData, setHasCompanyData] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if company data exists in localStorage
    const storedData = localStorage.getItem('companyAnalysisData')
    const hasData = storedData && storedData !== '{}' && storedData !== 'null'
    
    setHasCompanyData(hasData)
    setIsLoading(false)
  }, [])

  const clearCompanyData = () => {
    localStorage.removeItem('companyAnalysisData')
    setHasCompanyData(false)
  }

  return {
    hasCompanyData,
    isLoading,
    clearCompanyData
  }
}
