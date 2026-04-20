#!/usr/bin/env python3
"""
Test Improved ML Model Accuracy
"""

import sys
import os
import requests
import json

# Add ML system to path
sys.path.append(os.path.join(os.path.dirname(__file__), 'ml', 'src'))

from inference.predictor import BusinessPredictor

def test_cloudscale_improved():
    """Test the improved model with CloudScale Solutions data"""
    
    print("🧪 Testing Improved ML Model")
    print("=" * 50)
    
    # CloudScale Solutions data
    company_data = {
        "companyName": "CloudScale Solutions",
        "industry": "Cloud Computing",
        "foundedYear": "2019",
        "location": "San Francisco, CA",
        "primaryMarketRegion": "North America",
        "businessModel": "B2B SaaS",
        "companyStage": "Series A",
        "revenue": "2500000",
        "expenses": "2000000",
        "profitMargin": "20",
        "burnRate": "150000",
        "cashBalance": "1800000",
        "revenueHistory": "1000000,1750000,2500000",
        "revenueType": "Recurring",
        "totalFunding": "3000000",
        "operationalCost": "800000",
        "marketSize": "25000000",
        "competitorCount": "20",
        "growthRate": "30",
        "marketShare": "3.5",
        "industryGrowthRate": "22",
        "customerTypeMix": "Enterprise:40,SMB:60",
        "arpu": "3000",
        "teamSize": "25",
        "customerCount": "500",
        "churnRate": "4",
        "nps": "60",
        "customerSatisfaction": "4.1",
        "founderExperience": "6",
        "regulatoryExposure": "Medium"
    }
    
    try:
        print("📊 Input Company Data:")
        print(f"   Company: {company_data['companyName']}")
        print(f"   Revenue: ${int(company_data['revenue']):,}")
        print(f"   Profit Margin: {company_data['profitMargin']}%")
        print(f"   Growth Rate: {company_data['growthRate']}%")
        print(f"   Customer Count: {company_data['customerCount']}")
        print(f"   Team Size: {company_data['teamSize']}")
        print()
        
        # Test with improved ML model
        print("🤖 Running Improved ML Model...")
        predictor = BusinessPredictor()
        
        # Test prediction
        result = predictor.predict_single_company(company_data)
        
        print("📈 Improved Model Results:")
        print(f"   Business Health: {result['summary']['businessHealth']}/100")
        print(f"   Risk Level: {result['summary']['riskLevel']}")
        print(f"   Investment Readiness: {result['summary']['investmentReadiness']}")
        print(f"   Failure Probability: {result['summary']['failureProbability']}%")
        print()
        
        # Test with backend API
        print("🌐 Testing Backend API...")
        response = requests.post(
            "http://localhost:8000/api/analyze-company",
            json=company_data,
            timeout=30
        )
        
        if response.status_code == 200:
            api_result = response.json()
            print("📊 Backend API Results:")
            print(f"   Business Health: {api_result['summary']['businessHealth']}/100")
            print(f"   Risk Level: {api_result['summary']['riskLevel']}")
            print(f"   Investment Readiness: {api_result['summary']['investmentReadiness']}")
            print(f"   Failure Probability: {api_result['summary']['failureProbability']}%")
            print()
            
            # Compare results
            print("🔍 Model Comparison:")
            health_diff = abs(result['summary']['businessHealth'] - api_result['summary']['businessHealth'])
            print(f"   Health Score Difference: {health_diff:.1f}")
            
            if health_diff < 5:
                print("   ✅ Consistent results between direct model and API")
            else:
                print("   ⚠️  Inconsistent results detected")
        
        else:
            print(f"❌ Backend API failed: {response.status_code}")
        
        print()
        print("📋 Expected vs Actual Analysis:")
        print("   CloudScale Solutions Expected Performance:")
        print("   ✅ Business Health: 70-85/100 (Strong company)")
        print("   ✅ Risk Level: Low-Medium (Profitable, growing)")
        print("   ✅ Investment Readiness: A- to B+ (Series A ready)")
        print("   ✅ Failure Probability: 10-20% (Low for profitable company)")
        print()
        
        # Analyze improvement
        health_score = result['summary']['businessHealth']
        print("🎯 Improvement Analysis:")
        if health_score >= 70:
            print("   ✅ GOOD: Health score now realistic (70+)")
        else:
            print("   ⚠️  STILL LOW: Health score needs more improvement")
            
        if result['summary']['failureProbability'] <= 25:
            print("   ✅ GOOD: Failure probability now realistic")
        else:
            print("   ⚠️  STILL HIGH: Failure probability needs more adjustment")
            
        if result['summary']['investmentReadiness'] in ['A', 'A-', 'B+']:
            print("   ✅ GOOD: Investment grade now appropriate")
        else:
            print("   ⚠️  STILL LOW: Investment grade needs improvement")
        
    except Exception as e:
        print(f"❌ Error testing improved model: {e}")

if __name__ == "__main__":
    test_cloudscale_improved()
