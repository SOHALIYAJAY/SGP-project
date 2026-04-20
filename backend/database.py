from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import ConnectionFailure
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from bson import ObjectId
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Database configuration
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "business_analysis")

class MongoDB:
    client: AsyncIOMotorClient = None
    database = None

    @classmethod
    async def connect(cls):
        """Connect to MongoDB"""
        try:
            cls.client = AsyncIOMotorClient(MONGODB_URL)
            cls.database = cls.client[DATABASE_NAME]
            # Test the connection
            await cls.client.admin.command('ping')
            print("✅ Connected to MongoDB")
        except ConnectionFailure as e:
            print(f"❌ Failed to connect to MongoDB: {e}")
            raise

    @classmethod
    async def disconnect(cls):
        """Disconnect from MongoDB"""
        if cls.client:
            cls.client.close()
            print("✅ Disconnected from MongoDB")

    @classmethod
    def get_database(cls):
        """Get database instance"""
        if cls.database is None:
            raise RuntimeError("Database not initialized. Call connect() first.")
        return cls.database

# Pydantic models for MongoDB documents
class PyObjectId(ObjectId):
    @classmethod
    def __get_pydantic_core_schema__(cls, source_type, handler):
        from pydantic_core import core_schema
        return core_schema.no_info_plain_validator_function(cls.validate)

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, core_schema, handler):
        return {"type": "string"}

class CompanyDocument(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    company_name: str
    industry: str
    founded_year: Optional[str] = None
    location: Optional[str] = None
    primary_market_region: Optional[str] = None
    business_model: Optional[str] = None
    company_stage: Optional[str] = None

    # Financial data
    revenue: Optional[float] = None
    expenses: Optional[float] = None
    profit_margin: Optional[float] = None
    burn_rate: Optional[float] = None
    cash_balance: Optional[float] = None
    revenue_history: Optional[List[float]] = None
    revenue_type: Optional[str] = None
    total_funding: Optional[float] = None
    operational_cost: Optional[float] = None

    # Market & growth
    market_size: Optional[float] = None
    competitor_count: Optional[int] = None
    growth_rate: Optional[float] = None
    market_share: Optional[float] = None
    industry_growth_rate: Optional[float] = None
    customer_type_mix: Optional[Dict[str, Any]] = None
    arpu: Optional[float] = None

    # Team & operations
    team_size: Optional[int] = None
    customer_count: Optional[int] = None
    churn_rate: Optional[float] = None
    nps: Optional[int] = None
    customer_satisfaction: Optional[float] = None
    founder_experience: Optional[int] = None
    regulatory_exposure: Optional[str] = None

    # Metadata
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    created_by: Optional[str] = "system"

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class AnalysisResultDocument(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    company_id: PyObjectId
    analysis_type: str  # "comprehensive", "financial", "market", etc.
    confidence_score: float
    business_health_score: float

    # Analysis results
    summary: Dict[str, Any]
    predictions: List[Dict[str, Any]]
    recommendations: List[Dict[str, Any]]
    risk_assessment: Dict[str, Any]

    # Metadata
    created_at: datetime = Field(default_factory=datetime.utcnow)
    model_version: Optional[str] = "1.0"

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

# Database collections
companies_collection = None
analyses_collection = None

async def init_collections():
    """Initialize database collections"""
    global companies_collection, analyses_collection
    db = MongoDB.get_database()
    companies_collection = db.companies
    analyses_collection = db.analyses

    # Create indexes
    await companies_collection.create_index("company_name")
    await companies_collection.create_index("industry")
    await companies_collection.create_index("created_at")
    await analyses_collection.create_index("company_id")
    await analyses_collection.create_index("created_at")
    await analyses_collection.create_index("analysis_type")

    print("✅ Database collections initialized")