"""
Multiple ML Models for Different Business Aspects
"""

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score, accuracy_score
import joblib
import os

class MultiModelTrainer:
    """Train separate ML models for different business aspects"""
    
    def __init__(self):
        self.models = {}
        self.scalers = {}
        self.encoders = {}
        
    def train_growth_model(self, csv_path):
        """Train Growth Prediction Model"""
        print("🚀 Training Growth Prediction Model...")
        
        # Load growth-specific dataset
        df = pd.read_csv(csv_path)
        print(f"📊 Loaded {len(df)} growth records")
        
        # Define growth features
        growth_features = [
            'currentGrowthRate', 'industryGrowthRate', 'marketSize', 
            'marketShare', 'competitorCount', 'customerGrowthRate',
            'revenueGrowthRate', 'teamGrowthRate'
        ]
        
        # Filter available features
        available_features = [f for f in growth_features if f in df.columns]
        print(f"🎯 Growth features: {available_features}")
        
        # Create target if missing
        if 'futureGrowthRate' not in df.columns:
            print("📈 Creating future growth target...")
            df['futureGrowthRate'] = df.get('currentGrowthRate', 0.15) * np.random.uniform(0.8, 1.3, len(df))
        
        X = df[available_features].fillna(0)
        y = df['futureGrowthRate']
        
        # Train model
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)
        
        model = RandomForestRegressor(n_estimators=200, random_state=42)
        model.fit(X_train_scaled, y_train)
        
        # Evaluate
        y_pred = model.predict(X_test_scaled)
        rmse = np.sqrt(mean_squared_error(y_test, y_pred))
        r2 = r2_score(y_test, y_pred)
        
        print(f"   Growth Model - RMSE: {rmse:.3f}, R²: {r2:.3f}")
        
        # Save model
        self.models['growth'] = model
        self.scalers['growth'] = scaler
        
        return rmse, r2
    
    def train_profitability_model(self, csv_path):
        """Train Profitability Model"""
        print("💰 Training Profitability Model...")
        
        # Load profitability-specific dataset
        df = pd.read_csv(csv_path)
        print(f"📊 Loaded {len(df)} profitability records")
        
        # Define profitability features
        profitability_features = [
            'revenue', 'expenses', 'profitMargin', 'operationalCost',
            'costOfGoodsSold', 'overheadCosts', 'laborCosts',
            'marketingCosts', 'rdCosts', 'grossMargin', 'netMargin'
        ]
        
        # Filter available features
        available_features = [f for f in profitability_features if f in df.columns]
        print(f"🎯 Profitability features: {available_features}")
        
        # Create target if missing
        if 'profitabilityScore' not in df.columns:
            print("📈 Creating profitability score...")
            # Calculate profitability score from available metrics
            profit_margin = df.get('profitMargin', 0)
            gross_margin = df.get('grossMargin', profit_margin)
            net_margin = df.get('netMargin', profit_margin)
            
            # Composite profitability score
            df['profitabilityScore'] = (
                profit_margin * 0.4 + 
                gross_margin * 0.3 + 
                net_margin * 0.3
            ) * 100  # Convert to percentage
        
        X = df[available_features].fillna(0)
        y = df['profitabilityScore']
        
        # Train model
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)
        
        model = RandomForestRegressor(n_estimators=200, random_state=42)
        model.fit(X_train_scaled, y_train)
        
        # Evaluate
        y_pred = model.predict(X_test_scaled)
        rmse = np.sqrt(mean_squared_error(y_test, y_pred))
        r2 = r2_score(y_test, y_pred)
        
        print(f"   Profitability Model - RMSE: {rmse:.3f}, R²: {r2:.3f}")
        
        # Save model
        self.models['profitability'] = model
        self.scalers['profitability'] = scaler
        
        return rmse, r2
    
    def train_risk_model(self, csv_path):
        """Train Risk Assessment Model"""
        print("⚠️  Training Risk Assessment Model...")
        
        # Load risk-specific dataset
        df = pd.read_csv(csv_path)
        print(f"📊 Loaded {len(df)} risk records")
        
        # Define risk features
        risk_features = [
            'debtRatio', 'cashFlow', 'burnRate', 'runwayMonths',
            'churnRate', 'marketVolatility', 'regulatoryRisk',
            'competitivePressure', 'customerConcentration', 'revenueStability'
        ]
        
        # Filter available features
        available_features = [f for f in risk_features if f in df.columns]
        print(f"🎯 Risk features: {available_features}")
        
        # Create target if missing
        if 'riskLevel' not in df.columns:
            print("📈 Creating risk levels...")
            # Calculate risk score from available metrics
            risk_score = 50  # Base risk
            
            # Add risk factors
            debt_ratio = df.get('debtRatio', 0)
            if debt_ratio > 0.5:
                risk_score += debt_ratio * 20
            
            churn_rate = df.get('churnRate', 0)
            if churn_rate > 0.1:
                risk_score += churn_rate * 50
            
            runway = df.get('runwayMonths', 12)
            if runway < 6:
                risk_score += (6 - runway) * 5
            
            # Convert to risk levels
            risk_levels = []
            for score in risk_score:
                if score >= 80:
                    risk_levels.append("High")
                elif score >= 60:
                    risk_levels.append("Medium")
                else:
                    risk_levels.append("Low")
            
            df['riskLevel'] = risk_levels
        
        X = df[available_features].fillna(0)
        y = df['riskLevel']
        
        # Train model
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)
        
        model = RandomForestClassifier(n_estimators=200, random_state=42)
        model.fit(X_train_scaled, y_train)
        
        # Evaluate
        y_pred = model.predict(X_test_scaled)
        accuracy = accuracy_score(y_test, y_pred)
        
        print(f"   Risk Model - Accuracy: {accuracy:.3f}")
        
        # Save model
        self.models['risk'] = model
        self.scalers['risk'] = scaler
        
        return accuracy
    
    def train_investment_model(self, csv_path):
        """Train Investment Readiness Model"""
        print("🏆 Training Investment Readiness Model...")
        
        # Load investment-specific dataset
        df = pd.read_csv(csv_path)
        print(f"📊 Loaded {len(df)} investment records")
        
        # Define investment features
        investment_features = [
            'revenueGrowth', 'profitMargin', 'marketShare',
            'teamSize', 'fundingRaised', 'valuation',
            'customerGrowth', 'technologyScore', 'marketTiming',
            'teamExperience', 'competitiveAdvantage'
        ]
        
        # Filter available features
        available_features = [f for f in investment_features if f in df.columns]
        print(f"🎯 Investment features: {available_features}")
        
        # Create target if missing
        if 'investmentGrade' not in df.columns:
            print("📈 Creating investment grades...")
            # Calculate investment score
            investment_score = 50  # Base score
            
            revenue_growth = df.get('revenueGrowth', 0)
            if revenue_growth > 0.2:
                investment_score += 20
            
            profit_margin = df.get('profitMargin', 0)
            if profit_margin > 0.15:
                investment_score += 15
            
            market_share = df.get('marketShare', 0)
            if market_share > 0.05:
                investment_score += 10
            
            # Convert to investment grades
            grades = []
            for score in investment_score:
                if score >= 85:
                    grades.append("A+")
                elif score >= 75:
                    grades.append("A")
                elif score >= 65:
                    grades.append("B+")
                elif score >= 55:
                    grades.append("B")
                elif score >= 45:
                    grades.append("C+")
                else:
                    grades.append("C")
            
            df['investmentGrade'] = grades
        
        X = df[available_features].fillna(0)
        y = df['investmentGrade']
        
        # Train model
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)
        
        model = RandomForestClassifier(n_estimators=200, random_state=42)
        model.fit(X_train_scaled, y_train)
        
        # Evaluate
        y_pred = model.predict(X_test_scaled)
        accuracy = accuracy_score(y_test, y_pred)
        
        print(f"   Investment Model - Accuracy: {accuracy:.3f}")
        
        # Save model
        self.models['investment'] = model
        self.scalers['investment'] = scaler
        
        return accuracy
    
    def save_all_models(self, model_dir="../models"):
        """Save all trained models"""
        os.makedirs(model_dir, exist_ok=True)
        
        # Save each model
        for model_name, model in self.models.items():
            joblib.dump(model, os.path.join(model_dir, f'{model_name}_model.joblib'))
            print(f"💾 Saved {model_name} model")
        
        # Save scalers
        joblib.dump(self.scalers, os.path.join(model_dir, 'multi_model_scalers.pkl'))
        
        # Save model info
        model_info = {
            'available_models': list(self.models.keys()),
            'feature_sets': {
                'growth': ['currentGrowthRate', 'industryGrowthRate', 'marketSize'],
                'profitability': ['revenue', 'expenses', 'profitMargin', 'operationalCost'],
                'risk': ['debtRatio', 'cashFlow', 'burnRate', 'churnRate'],
                'investment': ['revenueGrowth', 'profitMargin', 'marketShare', 'teamSize']
            }
        }
        joblib.dump(model_info, os.path.join(model_dir, 'model_info.pkl'))
        
        print(f"💾 All models saved to {model_dir}")
    
    def train_all_models(self, datasets):
        """Train all models with different datasets"""
        print("🌍 Training Multiple ML Models")
        print("=" * 50)
        
        results = {}
        
        # Train Growth Model
        if 'growth' in datasets:
            growth_csv = datasets['growth']
            if os.path.exists(growth_csv):
                rmse, r2 = self.train_growth_model(growth_csv)
                results['growth'] = {'rmse': rmse, 'r2': r2}
        
        # Train Profitability Model
        if 'profitability' in datasets:
            profit_csv = datasets['profitability']
            if os.path.exists(profit_csv):
                rmse, r2 = self.train_profitability_model(profit_csv)
                results['profitability'] = {'rmse': rmse, 'r2': r2}
        
        # Train Risk Model
        if 'risk' in datasets:
            risk_csv = datasets['risk']
            if os.path.exists(risk_csv):
                accuracy = self.train_risk_model(risk_csv)
                results['risk'] = {'accuracy': accuracy}
        
        # Train Investment Model
        if 'investment' in datasets:
            investment_csv = datasets['investment']
            if os.path.exists(investment_csv):
                accuracy = self.train_investment_model(investment_csv)
                results['investment'] = {'accuracy': accuracy}
        
        # Save all models
        self.save_all_models()
        
        print("\n🎉 Multi-Model Training Complete!")
        print("=" * 50)
        
        for model_name, metrics in results.items():
            print(f"📊 {model_name.title()} Model: {metrics}")
        
        return results

def main():
    """Main training function"""
    trainer = MultiModelTrainer()
    
    # Define your datasets - UPDATE THESE PATHS
    datasets = {
        'growth': '../data/raw/growth_dataset.csv',        # Field #2
        'profitability': '../data/raw/profitability_dataset.csv',  # Field #3  
        'risk': '../data/raw/risk_dataset.csv',              # Field #7
        'investment': '../data/raw/investment_dataset.csv'        # Field #9
    }
    
    print("🎯 Training Separate ML Models for Different Business Aspects")
    print("\n📁 Expected Datasets:")
    for model_type, path in datasets.items():
        print(f"   {model_type}: {path}")
    
    # Train all models
    results = trainer.train_all_models(datasets)
    
    if results:
        print("\n✅ Multiple ML Models Ready!")
        print("🚀 Each model specializes in its business aspect")
        print("🎯 Use specific model for specific predictions")

if __name__ == "__main__":
    main()
