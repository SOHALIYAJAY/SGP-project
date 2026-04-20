import requests
import json

# Test the API with sample data
test_data = {
    "companyName": "Test Company",
    "revenue": "5000000",
    "growthRate": "25",
    "customerCount": "1000",
    "churnRate": "3",
    "profitMargin": "18"
}

try:
    response = requests.post("http://localhost:8000/api/analyze-company", 
                           json=test_data,
                           headers={"Content-Type": "application/json"})
    
    if response.status_code == 200:
        result = response.json()
        print("✅ API Test Successful!")
        print(f"Response keys: {list(result.keys())}")
        print(f"Full response: {result}")
        if 'customerAnalytics' in result:
            print(f"Customer Analytics Retention Rate: {result['customerAnalytics']['retentionRate']:.1f}%")
        else:
            print("❌ customerAnalytics not found in response")
        if 'marketAnalysis' in result:
            print(f"Market Analysis Size: ${result['marketAnalysis']['marketSize']}B")
        else:
            print("❌ marketAnalysis not found in response")
        if 'financialAnalysis' in result:
            print(f"Financial Analysis Health: {result['financialAnalysis']['financialHealth']:.1f}")
        else:
            print("❌ financialAnalysis not found in response")
        if 'riskAssessment' in result:
            print(f"Risk Assessment Score: {result['riskAssessment']['overallRiskScore']:.1f}")
        else:
            print("❌ riskAssessment not found in response")
        print(f"Business Health: {result['summary']['businessHealth']:.1f}")
        print(f"Risk Level: {result['summary']['riskLevel']}")
        print(f"Investment Readiness: {result['summary']['investmentReadiness']}")
    else:
        print(f"❌ API Test Failed: {response.status_code}")
        print(response.text)
        
except Exception as e:
    print(f"❌ Error: {e}")
