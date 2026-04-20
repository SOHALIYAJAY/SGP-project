#!/usr/bin/env python3
"""
Debug PDF Export Test
"""

import requests
import json

def test_pdf_export():
    """Test the PDF export endpoint directly"""
    
    print("🧪 Testing PDF Export Endpoint")
    print("=" * 40)
    
    # Test company data
    company_data = {
        "companyName": "Test PDF Company",
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
        print("📤 Sending request to /api/export-pdf...")
        
        response = requests.post(
            "http://localhost:8000/api/export-pdf",
            json=company_data,
            timeout=30
        )
        
        print(f"📊 Response Status: {response.status_code}")
        print(f"📋 Response Headers: {dict(response.headers)}")
        print(f"📄 Content Type: {response.headers.get('content-type', 'Unknown')}")
        print(f"📦 Content Length: {response.headers.get('content-length', 'Unknown')} bytes")
        
        if response.status_code == 200:
            content_type = response.headers.get('content-type', '')
            
            if 'application/pdf' in content_type:
                print("✅ PDF generated successfully!")
                
                # Save PDF to file for verification
                with open('test_output.pdf', 'wb') as f:
                    f.write(response.content)
                print("💾 PDF saved as 'test_output.pdf'")
                
                # Check PDF content
                if response.content.startswith(b'%PDF'):
                    print("✅ Valid PDF header detected")
                else:
                    print("⚠️  Invalid PDF header")
                    print(f"🔍 First 100 bytes: {response.content[:100]}")
                    
            else:
                print("❌ Response is not a PDF!")
                print(f"🔍 Content Type: {content_type}")
                print(f"🔍 Response Content: {response.text[:500]}")
                
        else:
            print(f"❌ Request failed with status: {response.status_code}")
            print(f"🔍 Error Response: {response.text}")
            
    except requests.exceptions.Timeout:
        print("❌ Request timed out")
    except requests.exceptions.ConnectionError:
        print("❌ Connection error - is backend running?")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")

if __name__ == "__main__":
    test_pdf_export()
