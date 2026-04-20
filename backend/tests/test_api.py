"""
Unit tests for backend API endpoints
"""

import pytest
from fastapi.testclient import TestClient
from main import app
import json

client = TestClient(app)

class TestValidationEndpoint:
    """Test cases for input validation"""

    def test_valid_company_input(self):
        """Test validation with valid company data"""
        valid_data = {
            "companyName": "Test Company",
            "industry": "Technology",
            "revenue": "1000000",
            "profitMargin": "20",
            "growthRate": "15",
            "teamSize": "50"
        }

        response = client.post("/api/validate-input", json=valid_data)
        assert response.status_code == 200
        data = response.json()
        assert data["valid"] == True
        assert len(data["errors"]) == 0

    def test_invalid_company_input_missing_required(self):
        """Test validation with missing required fields"""
        invalid_data = {
            "revenue": "1000000",
            "profitMargin": "20"
        }

        response = client.post("/api/validate-input", json=invalid_data)
        assert response.status_code == 200
        data = response.json()
        assert data["valid"] == False
        assert "Company name is required" in data["errors"]
        assert "Industry is required" in data["errors"]

    def test_invalid_financial_data(self):
        """Test validation with invalid financial data"""
        invalid_data = {
            "companyName": "Test Company",
            "industry": "Technology",
            "revenue": "-1000",  # Invalid negative revenue
            "profitMargin": "150"  # Invalid profit margin > 100%
        }

        response = client.post("/api/validate-input", json=invalid_data)
        assert response.status_code == 200
        data = response.json()
        assert data["valid"] == False
        assert any("Revenue must be a positive number" in error for error in data["errors"])

class TestAnalysisEndpoint:
    """Test cases for company analysis"""

    def test_successful_analysis(self):
        """Test successful company analysis"""
        company_data = {
            "companyName": "Test Company",
            "industry": "Technology",
            "foundedYear": "2020",
            "location": "San Francisco, CA",
            "primaryMarketRegion": "North America",
            "businessModel": "SaaS",
            "companyStage": "Growth",
            "revenue": "2000000",
            "expenses": "1500000",
            "profitMargin": "25",
            "burnRate": "50000",
            "cashBalance": "1000000",
            "revenueHistory": "1000000,1500000,2000000",
            "revenueType": "Recurring",
            "totalFunding": "2000000",
            "operationalCost": "500000",
            "marketSize": "10000000",
            "competitorCount": "20",
            "growthRate": "30",
            "marketShare": "2",
            "industryGrowthRate": "20",
            "customerTypeMix": "Enterprise:50,SMB:50",
            "arpu": "10000",
            "teamSize": "100",
            "customerCount": "200",
            "churnRate": "5",
            "nps": "70",
            "customerSatisfaction": "4.5",
            "founderExperience": "10",
            "regulatoryExposure": "Low"
        }

        response = client.post("/api/analyze-company", json=company_data)
        assert response.status_code == 200
        data = response.json()

        # Check response structure
        assert "input" in data
        assert "summary" in data
        assert "growthPredictions" in data
        assert "trajectory" in data
        assert "scenarios" in data
        assert "customerAnalytics" in data
        assert "marketAnalysis" in data
        assert "financialAnalysis" in data
        assert "riskAssessment" in data

        # Check summary data
        summary = data["summary"]
        assert "businessHealth" in summary
        assert isinstance(summary["businessHealth"], (int, float))
        assert 0 <= summary["businessHealth"] <= 100

        assert "riskLevel" in summary
        assert summary["riskLevel"] in ["Low", "Medium", "High"]

    def test_analysis_with_invalid_data(self):
        """Test analysis with invalid data"""
        invalid_data = {
            "companyName": "",  # Empty company name
            "industry": "Technology",
            "revenue": "invalid_number"
        }

        response = client.post("/api/analyze-company", json=invalid_data)
        # Should still work with fallback analysis
        assert response.status_code == 200

class TestPDFExport:
    """Test cases for PDF export"""

    def test_pdf_export_success(self):
        """Test successful PDF export"""
        company_data = {
            "companyName": "Test Company",
            "industry": "Technology",
            "revenue": "1000000",
            "profitMargin": "20"
        }

        response = client.post("/api/export-pdf", json=company_data)
        assert response.status_code == 200
        assert response.headers["content-type"] == "application/pdf"
        assert "attachment" in response.headers.get("content-disposition", "")

    def test_pdf_export_invalid_data(self):
        """Test PDF export with invalid data"""
        invalid_data = {
            "companyName": "",
            "industry": "",
            "revenue": "-1000"
        }

        response = client.post("/api/export-pdf", json=invalid_data)
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == False
        assert "error" in data

class TestHealthEndpoint:
    """Test cases for health check"""

    def test_health_check(self):
        """Test health check endpoint"""
        response = client.get("/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "timestamp" in data

class TestDatabaseEndpoints:
    """Test cases for database operations"""

    def test_get_companies(self):
        """Test getting companies list"""
        response = client.get("/api/companies")
        assert response.status_code == 200
        data = response.json()
        assert "success" in data
        assert "data" in data
        assert "count" in data

if __name__ == "__main__":
    pytest.main([__file__])