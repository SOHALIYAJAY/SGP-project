import requests

# Test the API with a simple request
response = requests.post("http://localhost:8000/api/analyze-company", 
                       json={"companyName": "Test", "revenue": "1000000"})

if response.status_code == 200:
    result = response.json()
    print("✅ API Response:")
    print(f"Keys: {list(result.keys())}")
    
    # Check for each new field
    for field in ['customerAnalytics', 'marketAnalysis', 'financialAnalysis', 'riskAssessment']:
        if field in result:
            print(f"✅ {field}: Found")
        else:
            print(f"❌ {field}: Missing")
else:
    print(f"❌ API Error: {response.status_code}")
    print(response.text)
