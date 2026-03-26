#!/usr/bin/env python3
"""
Script to update all analytics pages with company data protection
"""

pages = [
    "customer-analytics",
    "financial-analysis", 
    "market-analysis",
    "risk-assessment"
]

imports_to_add = [
    "import { useCompanyData } from '@/hooks/useCompanyData'",
    "import { FillCompanyFirst } from '@/components/ui/fill-company-first'"
]

hook_usage = "const { hasCompanyData, isLoading: companyDataLoading } = useCompanyData()"

loading_check = """if (loading || companyDataLoading) {
    return (
      <div className="min-h-screen py-2">
        <SectionWrapper>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading analysis...</p>
          </div>
        </SectionWrapper>
      </div>
    )
  }

  if (!hasCompanyData) {
    return <FillCompanyFirst />
  }"""

print("Manual update required for remaining pages:")
print("1. customer-analytics/page.tsx")
print("2. financial-analysis/page.tsx") 
print("3. market-analysis/page.tsx")
print("4. risk-assessment/page.tsx")
print("\nAdd the imports and company data check to each page.")
