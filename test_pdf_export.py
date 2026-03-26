#!/usr/bin/env python3
"""
Test PDF Export Functionality
"""

import requests
import json

def test_pdf_export():
    """Test if PDF export works without errors"""
    
    print("🧪 Testing PDF Export Functionality")
    print("=" * 40)
    
    # First, submit company data
    company_data = {
        "companyName": "Test Export Company",
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
        # Submit company data to backend
        response = requests.post("http://localhost:8000/api/analyze-company", json=company_data, timeout=10)
        
        if response.status_code == 200:
            print("✅ Backend API working correctly")
            print("✅ Company data processed successfully")
            print("\n📋 Manual Test Required:")
            print("1. Go to frontend: http://localhost:3000")
            print("2. Fill company form with test data")
            print("3. Navigate to dashboard")
            print("4. Click 'Export PDF' button")
            print("5. Check browser console for errors")
            print("\n🐛 If error still occurs:")
            print("- Clear browser cache")
            print("- Restart frontend server (npm run dev)")
            print("- Check for any remaining SGPStatusCard references")
        else:
            print(f"❌ Backend API Error: {response.status_code}")
            
    except Exception as e:
        print(f"❌ Connection Error: {e}")
        print("Make sure backend is running on http://localhost:8000")

if __name__ == "__main__":
    test_pdf_export()
