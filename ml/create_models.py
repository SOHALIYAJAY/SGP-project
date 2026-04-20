"""
Quick ML Model Creation for BAPS
"""

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.preprocessing import StandardScaler, LabelEncoder
import joblib
import os

def create_and_train_models():
    """Create and train ML models now"""
    
    print("🚀 Creating ML Models for BAPS...")
    
    # Generate sample training data
    np.random.seed(42)
    n_samples = 1000
    
    data = []
    for i in range(n_samples):
        # Financial metrics
        revenue = max(1000, np.random.lognormal(10, 1.5))
        expenses = revenue * np.random.uniform(0.6, 1.2)
        profit_margin = (revenue - expenses) / revenue
        growth_rate = np.random.normal(0.15, 0.25)
        churn_rate = np.random.exponential(0.05)
        
        # Operational metrics
        team_size = max(1, int(np.random.lognormal(3, 1)))
        customer_count = max(1, int(np.random.lognormal(6, 1.5)))
        
        # Calculate health score
        health_score = 50 + min(20, np.log10(revenue + 1) * 4) + min(15, profit_margin * 100) + min(15, growth_rate * 50) - min(10, churn_rate * 100)
        health_score = max(0, min(100, health_score))
        
        # Risk and investment levels
        risk_level = "Low" if health_score >= 80 else "Medium" if health_score >= 60 else "High"
        investment_grade = "A+" if health_score >= 85 else "A" if health_score >= 75 else "B+" if health_score >= 65 else "B" if health_score >= 55 else "C+"
        
        data.append({
            'revenue': revenue,
            'expenses': expenses,
            'profitMargin': profit_margin,
            'growthRate': growth_rate,
            'churnRate': churn_rate,
            'teamSize': team_size,
            'customerCount': customer_count,
            'businessHealth': health_score,
            'riskLevel': risk_level,
            'investmentReadiness': investment_grade
        })
    
    df = pd.DataFrame(data)
    print(f"📊 Generated {len(df)} training samples")
    
    # Prepare features
    feature_columns = ['revenue', 'expenses', 'profitMargin', 'growthRate', 'churnRate', 'teamSize', 'customerCount']
    X = df[feature_columns]
    
    # Train Health Model
    print("🎯 Training Health Model...")
    health_model = RandomForestRegressor(n_estimators=100, random_state=42)
    health_scaler = StandardScaler()
    X_scaled = health_scaler.fit_transform(X)
    health_model.fit(X_scaled, df['businessHealth'])
    
    # Train Risk Model
    print("⚠️  Training Risk Model...")
    risk_model = RandomForestClassifier(n_estimators=100, random_state=42)
    risk_scaler = StandardScaler()
    X_risk_scaled = risk_scaler.fit_transform(X)
    risk_model.fit(X_risk_scaled, df['riskLevel'])
    
    # Train Investment Model
    print("💰 Training Investment Model...")
    investment_model = RandomForestClassifier(n_estimators=100, random_state=42)
    investment_scaler = StandardScaler()
    X_investment_scaled = investment_scaler.fit_transform(X)
    investment_model.fit(X_investment_scaled, df['investmentReadiness'])
    
    # Create models directory
    os.makedirs("../models", exist_ok=True)
    
    # Save all models
    print("💾 Saving Models...")
    joblib.dump(health_model, "../models/best_model.joblib")
    joblib.dump(risk_model, "../models/risk_model.joblib")
    joblib.dump(investment_model, "../models/investment_model.joblib")
    
    # Save scalers
    scalers = {
        'health': health_scaler,
        'risk': risk_scaler,
        'investment': investment_scaler
    }
    joblib.dump(scalers, "../models/scalers.pkl")
    
    # Save feature columns
    joblib.dump(feature_columns, "../models/feature_columns.pkl")
    
    # Create preprocessor.pkl for compatibility
    preprocessor_data = {
        'scalers': scalers,
        'feature_columns': feature_columns,
        'encoders': {}
    }
    joblib.dump(preprocessor_data, "../models/preprocessor.pkl")
    
    print("✅ Models Created Successfully!")
    print(f"📁 Models saved to: {os.path.abspath('../models')}")
    
    # Test the models
    print("\n🧪 Testing Models...")
    test_data = [[1000000, 800000, 0.2, 0.15, 0.05, 50, 1000]]
    
    # Health prediction
    health_pred = health_model.predict(health_scaler.transform(test_data))[0]
    print(f"Health Score: {health_pred:.1f}")
    
    # Risk prediction
    risk_pred = risk_model.predict(risk_scaler.transform(test_data))[0]
    print(f"Risk Level: {risk_pred}")
    
    # Investment prediction
    investment_pred = investment_model.predict(investment_scaler.transform(test_data))[0]
    print(f"Investment Grade: {investment_pred}")
    
    return True

if __name__ == "__main__":
    create_and_train_models()
