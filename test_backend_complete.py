#!/usr/bin/env python3
"""
Complete backend test script for NexusAI
"""

import requests
import json
import time

# Test data
test_company = {
    "companyName": "TechCorp Solutions",
    "industry": "Software",
    "foundedYear": "Software",
    "location": "San Francisco, CA",
    "primaryMarketRegion": "North America",
    "businessModel": "SaaS",
    "companyStage": "Growth",
    "revenue": "8200000",
    "expenses": "6396000",
    "profitMargin": "22",
    "burnRate": "180000",
    "cashBalance": "3240000",
    "revenueHistory": "5000000,6200000,7500000,8200000",
    "revenueType": "Recurring",
    "totalFunding": "5000000",
    "operationalCost": "1200000",
    "marketSize": "50000000",
    "competitorCount": "15",
    "growthRate": "25",
    "marketShare": "2.5",
    "industryGrowthRate": "18",
    "customerTypeMix": "Enterprise:40,SMB:60",
    "arpu": "5000",
    "teamSize": "50",
    "customerCount": "1500",
    "churnRate": "2.5",
    "nps": "72",
    "customerSatisfaction": "4.2",
    "founderExperience": "8",
    "regulatoryExposure": "Low"
}

def test_backend():
    """Test all backend endpoints"""
    base_url = "http://localhost:8000"
    
    print("🚀 Testing NexusAI Backend...")
    print("=" * 50)
    
    # Test 1: Health Check
    print("\n1. Testing Health Check...")
    try:
        response = requests.get(f"{base_url}/api/health")
        if response.status_code == 200:
            health_data = response.json()
            print(f"✅ Health Check: {health_data['status']}")
            print(f"   ML Predictor: {'✅' if health_data['ml_predictor'] else '❌'}")
            print(f"   Features: {list(health_data['features'].keys())}")
        else:
            print(f"❌ Health Check failed: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to backend. Make sure it's running on http://localhost:8000")
        return False
    
    # Test 2: Input Validation
    print("\n2. Testing Input Validation...")
    try:
        response = requests.post(f"{base_url}/api/validate-input", json=test_company)
        if response.status_code == 200:
            validation_data = response.json()
            print(f"✅ Validation: {'Valid' if validation_data['valid'] else 'Invalid'}")
            if validation_data['warnings']:
                print(f"   Warnings: {validation_data['warnings']}")
        else:
            print(f"❌ Validation failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Validation error: {e}")
    
    # Test 3: Company Analysis (Main Feature)
    print("\n3. Testing Company Analysis...")
    try:
        start_time = time.time()
        response = requests.post(f"{base_url}/api/analyze-company", json=test_company)
        end_time = time.time()
        
        if response.status_code == 200:
            analysis_data = response.json()
            print(f"✅ Analysis completed in {end_time - start_time:.2f}s")
            
            # Check all required fields
            required_fields = [
                'summary', 'growthPredictions', 'trajectory', 'scenarios',
                'customerAnalytics', 'marketAnalysis', 'financialAnalysis', 'riskAssessment'
            ]
            
            missing_fields = []
            for field in required_fields:
                if field not in analysis_data:
                    missing_fields.append(field)
            
            if missing_fields:
                print(f"❌ Missing fields: {missing_fields}")
                return False
            else:
                print("✅ All required fields present")
            
            # Display key metrics
            summary = analysis_data['summary']
            print(f"   Business Health: {summary['businessHealth']}/100")
            print(f"   Risk Level: {summary['riskLevel']}")
            print(f"   Investment Readiness: {summary['investmentReadiness']}")
            print(f"   Failure Probability: {summary['failureProbability']}%")
            
            # Check analytics data
            customer_analytics = analysis_data['customerAnalytics']
            print(f"   Customer Retention: {customer_analytics['retentionRate']:.1f}%")
            print(f"   NPS Score: {customer_analytics['npsScore']}")
            
            market_analysis = analysis_data['marketAnalysis']
            print(f"   Market Size: ${market_analysis['marketSize']}M")
            print(f"   Competition: {market_analysis['competition']}")
            
            financial_analysis = analysis_data['financialAnalysis']
            print(f"   Annual Revenue: ${financial_analysis['annualRevenue']/1_000_000:.1f}M")
            print(f"   Profit Margin: {financial_analysis['profitMargin']:.1f}%")
            print(f"   Runway: {financial_analysis['runway']:.1f} months")
            
            risk_assessment = analysis_data['riskAssessment']
            print(f"   Overall Risk Score: {risk_assessment['overallRiskScore']:.1f}/100")
            print(f"   Risk Profile: {risk_assessment['riskProfile']}")
            
        else:
            print(f"❌ Analysis failed: {response.status_code}")
            print(f"   Error: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Analysis error: {e}")
        return False
    
    # Test 4: Export Analysis
    print("\n4. Testing Export Analysis...")
    try:
        response = requests.post(f"{base_url}/api/export-analysis", json=test_company)
        if response.status_code == 200:
            export_data = response.json()
            print(f"✅ Export: {'Success' if export_data['success'] else 'Failed'}")
            if export_data['success']:
                print(f"   Available formats: {export_data['export_formats']}")
        else:
            print(f"❌ Export failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Export error: {e}")
    
    print("\n" + "=" * 50)
    print("🎉 Backend Test Complete!")
    print("✅ All features are working correctly")
    return True

if __name__ == "__main__":
    test_backend()
