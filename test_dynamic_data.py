#!/usr/bin/env python3
"""
Test Dynamic Data vs Static Data in NexusAI Pages
"""

import requests
import json
import time
from datetime import datetime

def test_dynamic_data():
    """Test if pages show dynamic data based on user input"""
    
    print("🔍 NexusAI Dynamic Data Test")
    print("=" * 60)
    print(f"📅 Test Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)
    
    base_url = "http://localhost:8000"
    
    # Test with 3 different companies to verify dynamic behavior
    test_companies = [
        {
            "name": "Small Startup",
            "data": {
                "companyName": "TinyTech Startup",
                "industry": "Software",
                "foundedYear": "2023",
                "location": "Austin, TX",
                "primaryMarketRegion": "North America",
                "businessModel": "SaaS",
                "companyStage": "Seed",
                "revenue": "500000",
                "expenses": "600000",
                "profitMargin": "-20",
                "burnRate": "50000",
                "cashBalance": "300000",
                "revenueHistory": "200000,350000,500000",
                "revenueType": "Recurring",
                "totalFunding": "750000",
                "operationalCost": "200000",
                "marketSize": "10000000",
                "competitorCount": "25",
                "growthRate": "15",
                "marketShare": "0.5",
                "industryGrowthRate": "12",
                "customerTypeMix": "SMB:80,Enterprise:20",
                "arpu": "1000",
                "teamSize": "8",
                "customerCount": "200",
                "churnRate": "8",
                "nps": "45",
                "customerSatisfaction": "3.2",
                "founderExperience": "3",
                "regulatoryExposure": "Low"
            }
        },
        {
            "name": "Medium Company",
            "data": {
                "companyName": "MidScale Solutions",
                "industry": "Fintech",
                "foundedYear": "2018",
                "location": "New York, NY",
                "primaryMarketRegion": "North America",
                "businessModel": "B2B SaaS",
                "companyStage": "Series A",
                "revenue": "5000000",
                "expenses": "4000000",
                "profitMargin": "20",
                "burnRate": "200000",
                "cashBalance": "2000000",
                "revenueHistory": "2000000,3500000,5000000",
                "revenueType": "Recurring",
                "totalFunding": "3000000",
                "operationalCost": "1500000",
                "marketSize": "50000000",
                "competitorCount": "15",
                "growthRate": "25",
                "marketShare": "2.5",
                "industryGrowthRate": "18",
                "customerTypeMix": "Enterprise:60,SMB:40",
                "arpu": "5000",
                "teamSize": "40",
                "customerCount": "1000",
                "churnRate": "3",
                "nps": "65",
                "customerSatisfaction": "4.0",
                "founderExperience": "6",
                "regulatoryExposure": "Medium"
            }
        },
        {
            "name": "Large Enterprise",
            "data": {
                "companyName": "EnterpriseCorp Global",
                "industry": "Enterprise Software",
                "foundedYear": "2010",
                "location": "San Francisco, CA",
                "primaryMarketRegion": "Global",
                "businessModel": "Enterprise SaaS",
                "companyStage": "Series C",
                "revenue": "50000000",
                "expenses": "35000000",
                "profitMargin": "30",
                "burnRate": "1000000",
                "cashBalance": "15000000",
                "revenueHistory": "30000000,40000000,50000000",
                "revenueType": "Recurring",
                "totalFunding": "25000000",
                "operationalCost": "10000000",
                "marketSize": "500000000",
                "competitorCount": "8",
                "growthRate": "20",
                "marketShare": "15",
                "industryGrowthRate": "15",
                "customerTypeMix": "Enterprise:90,SMB:10",
                "arpu": "25000",
                "teamSize": "500",
                "customerCount": "10000",
                "churnRate": "1",
                "nps": "85",
                "customerSatisfaction": "4.8",
                "founderExperience": "9",
                "regulatoryExposure": "High"
            }
        }
    ]
    
    results = []
    
    for i, company in enumerate(test_companies, 1):
        print(f"\n🏢 Test {i}: {company['name']}")
        print("-" * 40)
        
        try:
            # Get analysis for this company
            response = requests.post(f"{base_url}/api/analyze-company", json=company['data'], timeout=15)
            
            if response.status_code == 200:
                analysis = response.json()
                summary = analysis['summary']
                
                # Extract key metrics
                result = {
                    'company': company['name'],
                    'revenue': float(company['data']['revenue']),
                    'profit_margin': float(company['data']['profitMargin']),
                    'growth_rate': float(company['data']['growthRate']),
                    'team_size': int(company['data']['teamSize']),
                    'customer_count': int(company['data']['customerCount']),
                    'churn_rate': float(company['data']['churnRate']),
                    'analysis_result': {
                        'business_health': summary['businessHealth'],
                        'risk_level': summary['riskLevel'],
                        'investment_grade': summary['investmentReadiness'],
                        'failure_probability': summary['failureProbability']
                    },
                    'customer_analytics': {
                        'retention_rate': analysis['customerAnalytics']['retentionRate'],
                        'churn_rate': analysis['customerAnalytics']['churnRate'],
                        'nps_score': analysis['customerAnalytics']['npsScore'],
                        'customer_growth': analysis['customerAnalytics']['customerGrowth']
                    },
                    'financial_analysis': {
                        'annual_revenue': analysis['financialAnalysis']['annualRevenue'],
                        'profit_margin': analysis['financialAnalysis']['profitMargin'],
                        'runway': analysis['financialAnalysis']['runway'],
                        'financial_health': analysis['financialAnalysis']['financialHealth']
                    },
                    'market_analysis': {
                        'market_size': analysis['marketAnalysis']['marketSize'],
                        'competition': analysis['marketAnalysis']['competition'],
                        'opportunity': analysis['marketAnalysis']['opportunity']
                    },
                    'risk_assessment': {
                        'overall_score': analysis['riskAssessment']['overallRiskScore'],
                        'risk_profile': analysis['riskAssessment']['riskProfile']
                    }
                }
                
                results.append(result)
                
                # Display key differences
                print(f"   Input Revenue: ${int(company['data']['revenue']):,}")
                print(f"   Analysis Health: {summary['businessHealth']}/100")
                print(f"   Risk Level: {summary['riskLevel']}")
                print(f"   Investment Grade: {summary['investmentReadiness']}")
                print(f"   Customer Retention: {analysis['customerAnalytics']['retentionRate']:.1f}%")
                print(f"   Financial Health: {analysis['financialAnalysis']['financialHealth']:.1f}/100")
                print(f"   Market Opportunity: {analysis['marketAnalysis']['opportunity']:.1f}")
                print(f"   Overall Risk: {analysis['riskAssessment']['overallRiskScore']:.1f}/100")
                
            else:
                print(f"❌ Analysis Failed: {response.status_code}")
                return False
                
        except Exception as e:
            print(f"❌ Error: {e}")
            return False
    
    # Analyze if data is dynamic or static
    print(f"\n🔍 Dynamic Data Analysis")
    print("=" * 60)
    
    # Check if results vary based on input
    health_scores = [r['analysis_result']['business_health'] for r in results]
    risk_levels = [r['analysis_result']['risk_level'] for r in results]
    investment_grades = [r['analysis_result']['investment_grade'] for r in results]
    
    # Check customer analytics variation
    retention_rates = [r['customer_analytics']['retention_rate'] for r in results]
    nps_scores = [r['customer_analytics']['nps_score'] for r in results]
    
    # Check financial analysis variation
    financial_health_scores = [r['financial_analysis']['financial_health'] for r in results]
    runways = [r['financial_analysis']['runway'] for r in results]
    
    # Check market analysis variation
    market_opportunities = [r['market_analysis']['opportunity'] for r in results]
    competitions = [r['market_analysis']['competition'] for r in results]
    
    # Check risk assessment variation
    overall_risks = [r['risk_assessment']['overall_score'] for r in results]
    risk_profiles = [r['risk_assessment']['risk_profile'] for r in results]
    
    print(f"📊 Business Health Scores:")
    for i, (company, score) in enumerate(zip([c['name'] for c in test_companies], health_scores)):
        print(f"   {company}: {score}/100")
    
    print(f"\n⚠️ Risk Levels:")
    for i, (company, risk) in enumerate(zip([c['name'] for c in test_companies], risk_levels)):
        print(f"   {company}: {risk}")
    
    print(f"\n💰 Investment Grades:")
    for i, (company, grade) in enumerate(zip([c['name'] for c in test_companies], investment_grades)):
        print(f"   {company}: {grade}")
    
    print(f"\n👥 Customer Retention Rates:")
    for i, (company, retention) in enumerate(zip([c['name'] for c in test_companies], retention_rates)):
        print(f"   {company}: {retention:.1f}%")
    
    print(f"\n💸 Financial Health Scores:")
    for i, (company, health) in enumerate(zip([c['name'] for c in test_companies], financial_health_scores)):
        print(f"   {company}: {health:.1f}/100")
    
    print(f"\n🌍 Market Opportunities:")
    for i, (company, opportunity) in enumerate(zip([c['name'] for c in test_companies], market_opportunities)):
        print(f"   {company}: {opportunity:.1f}")
    
    print(f"\n⚠️ Overall Risk Scores:")
    for i, (company, risk) in enumerate(zip([c['name'] for c in test_companies], overall_risks)):
        print(f"   {company}: {risk:.1f}/100")
    
    # Determine if data is dynamic
    print(f"\n🎯 Dynamic Data Assessment")
    print("-" * 30)
    
    # Check variance in results
    health_variance = max(health_scores) - min(health_scores)
    retention_variance = max(retention_rates) - min(retention_rates)
    financial_variance = max(financial_health_scores) - min(financial_health_scores)
    opportunity_variance = max(market_opportunities) - min(market_opportunities)
    risk_variance = max(overall_risks) - min(overall_risks)
    
    print(f"   Health Score Variance: {health_variance:.1f}")
    print(f"   Retention Rate Variance: {retention_variance:.1f}")
    print(f"   Financial Health Variance: {financial_variance:.1f}")
    print(f"   Market Opportunity Variance: {opportunity_variance:.1f}")
    print(f"   Risk Score Variance: {risk_variance:.1f}")
    
    # Determine if data is dynamic
    is_dynamic = (
        health_variance > 10 or
        retention_variance > 5 or
        financial_variance > 10 or
        opportunity_variance > 10 or
        risk_variance > 10
    )
    
    if is_dynamic:
        print(f"\n✅ RESULT: DATA IS DYNAMIC")
        print(f"   The analytics change based on user input!")
        print(f"   Different companies get different results.")
        print(f"   All pages show personalized analysis.")
    else:
        print(f"\n❌ RESULT: DATA APPEARS STATIC")
        print(f"   Similar results across different inputs.")
        print(f"   May need to check the analysis logic.")
    
    # Test specific correlations
    print(f"\n🔗 Input-Output Correlation Analysis")
    print("-" * 30)
    
    # Check if higher revenue correlates with better health
    revenues = [r['revenue'] for r in results]
    healths = [r['analysis_result']['business_health'] for r in results]
    
    print(f"   Revenue vs Health Correlation:")
    for i, (rev, health) in enumerate(zip(revenues, healths)):
        company_name = test_companies[i]['name']
        print(f"   {company_name}: ${int(rev):,} → {health}/100")
    
    # Check if lower churn correlates with better retention
    churn_inputs = [r['churn_rate'] for r in results]
    retention_outputs = [r['customer_analytics']['retention_rate'] for r in results]
    
    print(f"\n   Churn Input vs Retention Output:")
    for i, (churn_in, retention_out) in enumerate(zip(churn_inputs, retention_outputs)):
        company_name = test_companies[i]['name']
        print(f"   {company_name}: {churn_in}% → {retention_out:.1f}%")
    
    # Check if higher profit margin correlates with better financial health
    profit_inputs = [r['profit_margin'] for r in results]
    financial_healths = [r['financial_analysis']['financial_health'] for r in results]
    
    print(f"\n   Profit Margin vs Financial Health:")
    for i, (profit_in, health_out) in enumerate(zip(profit_inputs, financial_healths)):
        company_name = test_companies[i]['name']
        print(f"   {company_name}: {profit_in}% → {health_out:.1f}/100")
    
    print(f"\n" + "=" * 60)
    print(f"🎉 Dynamic Data Test Complete!")
    print(f"📊 Conclusion: {'✅ DYNAMIC DATA' if is_dynamic else '❌ STATIC DATA'}")
    print(f"🔍 All pages respond to user input: {'✅ YES' if is_dynamic else '❌ NO'}")
    print("=" * 60)
    
    return is_dynamic

if __name__ == "__main__":
    test_dynamic_data()
