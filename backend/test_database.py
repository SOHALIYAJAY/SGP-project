#!/usr/bin/env python3
"""
Database Connection Test Script
Tests MongoDB connection and basic operations
"""

import asyncio
import sys
import os
from datetime import datetime

# Add current directory to path
sys.path.append(os.path.dirname(__file__))

from database import MongoDB, CompanyDocument, AnalysisResultDocument, init_collections

async def test_database():
    """Test database connection and operations"""
    print("🧪 Testing MongoDB connection...")

    try:
        # Test connection
        await MongoDB.connect()
        print("✅ Connected to MongoDB")

        # Initialize collections
        await init_collections()
        print("✅ Collections initialized")

        # Test inserting a sample company
        sample_company = CompanyDocument(
            company_name="Test Company Inc.",
            industry="Technology",
            founded_year="2020",
            location="San Francisco, CA",
            revenue=5000000.0,
            team_size=50
        )

        from database import companies_collection
        result = await companies_collection.insert_one(sample_company.model_dump(by_alias=True))
        print(f"✅ Sample company inserted with ID: {result.inserted_id}")

        # Test retrieving the company
        retrieved = await companies_collection.find_one({"_id": result.inserted_id})
        print(f"✅ Company retrieved: {retrieved['company_name']}")

        # Clean up test data
        await companies_collection.delete_one({"_id": result.inserted_id})
        print("✅ Test data cleaned up")

        print("\n🎉 All database tests passed!")

    except Exception as e:
        print(f"❌ Database test failed: {e}")
        return False

    finally:
        # Close connection
        await MongoDB.disconnect()
        print("✅ Database connection closed")

    return True

if __name__ == "__main__":
    success = asyncio.run(test_database())
    sys.exit(0 if success else 1)