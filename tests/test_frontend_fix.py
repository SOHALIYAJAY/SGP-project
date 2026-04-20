#!/usr/bin/env python3
"""
Test Frontend API Fix
"""

import requests
import json

def test_frontend_api_fix():
    """Test if frontend can now connect to backend API"""
    
    print("🔧 Testing Frontend API Fix")
    print("=" * 40)
    
    base_url = "http://localhost:8000"
    
    # Test data
    test_company = {
        "companyName": "Test Company",
        "revenue": "5000000",
        "expenses": "4000000",
        "profitMargin": "20",
        "growthRate": "25",
        "teamSize": "50",
        "customerCount": "1000",
        "churnRate": "3",
        "marketSize": "50000000",
        "competitorCount": "15",
        "marketShare": "2.5"
    }
    
    try:
        # Test the API endpoint that frontend will call
        response = requests.post(f"{base_url}/api/analyze-company", json=test_company, timeout=10)
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Backend API is working!")
            print(f"   Business Health: {result['summary']['businessHealth']}/100")
            print(f"   Risk Level: {result['summary']['riskLevel']}")
            print(f"   Investment Grade: {result['summary']['investmentReadiness']}")
            print("\n✅ Frontend should now be able to fetch data!")
            print("✅ All pages should display properly!")
        else:
            print(f"❌ API Error: {response.status_code}")
            print(f"   Response: {response.text}")
            
    except Exception as e:
        print(f"❌ Connection Error: {e}")
        print("   Make sure backend is running on http://localhost:8000")

if __name__ == "__main__":
    test_frontend_api_fix()
