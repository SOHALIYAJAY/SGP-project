"""
Train BAPS ML Model with Your Dataset
"""

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score, accuracy_score
from sklearn.preprocessing import StandardScaler, LabelEncoder
import joblib
import os

class BAPSTrainer:
    """Custom trainer for BAPS ML system"""
    
    def __init__(self):
        self.models = {}
        self.scalers = {}
        self.encoders = {}
        self.feature_columns = []
        
    def load_and_prepare_data(self, csv_path):
        """Load your dataset and prepare for training"""
        print(f"📁 Loading data from {csv_path}")
        
        # Load your data
        df = pd.read_csv(csv_path)
        print(f"📊 Loaded {len(df)} records")
        
        # Display basic info
        print("\n📋 Dataset Info:")
        print(f"Columns: {list(df.columns)}")
        print(f"Shape: {df.shape}")
        print(f"Missing values: {df.isnull().sum().sum()}")
        
        return df
    
    def preprocess_data(self, df):
        """Preprocess data for ML training"""
        print("🔄 Preprocessing data...")
        
        # Make a copy
        df_processed = df.copy()
        
        # Handle categorical variables
        categorical_columns = df_processed.select_dtypes(include=['object']).columns
        
        for col in categorical_columns:
            if col not in ['companyName', 'riskLevel', 'investmentReadiness']:
                if col not in self.encoders:
                    self.encoders[col] = LabelEncoder()
                    # Handle unseen values
                    df_processed[col] = df_processed[col].fillna('Unknown')
                    df_processed[f'{col}_encoded'] = self.encoders[col].fit_transform(df_processed[col])
                else:
                    df_processed[f'{col}_encoded'] = self.encoders[col].transform(df_processed[col])
        
        # Select feature columns (exclude targets and identifiers)
        exclude_columns = ['companyName', 'riskLevel', 'investmentReadiness']
        exclude_columns.extend(categorical_columns)
        
        # Add businessHealth if it exists
        if 'businessHealth' in df_processed.columns:
            exclude_columns.append('businessHealth')
        
        self.feature_columns = [col for col in df_processed.columns 
                               if col not in exclude_columns]
        
        # Handle missing values
        df_processed[self.feature_columns] = df_processed[self.feature_columns].fillna(0)
        
        print(f"✅ Features prepared: {len(self.feature_columns)}")
        return df_processed
    
    def train_health_model(self, df):
        """Train business health prediction model"""
        print("🎯 Training Business Health Model...")
        
        # Check if target exists
        if 'businessHealth' not in df.columns:
            print("⚠️  No 'businessHealth' column found. Creating synthetic target...")
            df['businessHealth'] = self._create_synthetic_health_score(df)
        
        X = df[self.feature_columns]
        y = df['businessHealth']
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        # Scale features
        self.scalers['health'] = StandardScaler()
        X_train_scaled = self.scalers['health'].fit_transform(X_train)
        X_test_scaled = self.scalers['health'].transform(X_test)
        
        # Train model
        model = RandomForestRegressor(n_estimators=100, random_state=42)
        model.fit(X_train_scaled, y_train)
        
        # Evaluate
        y_pred = model.predict(X_test_scaled)
        rmse = np.sqrt(mean_squared_error(y_test, y_pred))
        r2 = r2_score(y_test, y_pred)
        
        print(f"   RMSE: {rmse:.3f}")
        print(f"   R²: {r2:.3f}")
        
        self.models['health'] = model
        return rmse, r2
    
    def train_risk_model(self, df):
        """Train risk level classification model"""
        print("⚠️  Training Risk Level Model...")
        
        # Check if target exists
        if 'riskLevel' not in df.columns:
            print("⚠️  No 'riskLevel' column found. Creating synthetic target...")
            df['riskLevel'] = self._create_synthetic_risk_levels(df)
        
        X = df[self.feature_columns]
        y = df['riskLevel']
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        # Scale features
        self.scalers['risk'] = StandardScaler()
        X_train_scaled = self.scalers['risk'].fit_transform(X_train)
        X_test_scaled = self.scalers['risk'].transform(X_test)
        
        # Train model
        model = RandomForestClassifier(n_estimators=100, random_state=42)
        model.fit(X_train_scaled, y_train)
        
        # Evaluate
        y_pred = model.predict(X_test_scaled)
        accuracy = accuracy_score(y_test, y_pred)
        
        print(f"   Accuracy: {accuracy:.3f}")
        
        self.models['risk'] = model
        return accuracy
    
    def train_investment_model(self, df):
        """Train investment readiness model"""
        print("💰 Training Investment Readiness Model...")
        
        # Check if target exists
        if 'investmentReadiness' not in df.columns:
            print("⚠️  No 'investmentReadiness' column found. Creating synthetic target...")
            df['investmentReadiness'] = self._create_synthetic_investment_grades(df)
        
        X = df[self.feature_columns]
        y = df['investmentReadiness']
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        # Scale features
        self.scalers['investment'] = StandardScaler()
        X_train_scaled = self.scalers['investment'].fit_transform(X_train)
        X_test_scaled = self.scalers['investment'].transform(X_test)
        
        # Train model
        model = RandomForestClassifier(n_estimators=100, random_state=42)
        model.fit(X_train_scaled, y_train)
        
        # Evaluate
        y_pred = model.predict(X_test_scaled)
        accuracy = accuracy_score(y_test, y_pred)
        
        print(f"   Accuracy: {accuracy:.3f}")
        
        self.models['investment'] = model
        return accuracy
    
    def _create_synthetic_health_score(self, df):
        """Create business health score from available features"""
        print("   Creating health score from financial metrics...")
        
        scores = []
        for _, row in df.iterrows():
            score = 50.0  # Base score
            
            # Revenue contribution
            revenue = row.get('revenue', 0)
            if revenue > 0:
                score += min(20, np.log10(revenue + 1) * 4)
            
            # Profit margin
            profit_margin = row.get('profitMargin', 0)
            if profit_margin > 0:
                score += min(15, profit_margin * 100)
            
            # Growth rate
            growth_rate = row.get('growthRate', 0)
            if growth_rate > 0:
                score += min(15, growth_rate * 50)
            
            # Churn penalty
            churn_rate = row.get('churnRate', 0)
            score -= min(10, churn_rate * 100)
            
            scores.append(max(0, min(100, score)))
        
        return scores
    
    def _create_synthetic_risk_levels(self, df):
        """Create risk levels from health scores"""
        health_scores = self._create_synthetic_health_score(df)
        risk_levels = []
        
        for score in health_scores:
            if score >= 80:
                risk_levels.append("Low")
            elif score >= 60:
                risk_levels.append("Medium")
            else:
                risk_levels.append("High")
        
        return risk_levels
    
    def _create_synthetic_investment_grades(self, df):
        """Create investment grades from health scores"""
        health_scores = self._create_synthetic_health_score(df)
        grades = []
        
        for score in health_scores:
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
        
        return grades
    
    def save_models(self, model_dir="../models"):
        """Save all trained models"""
        os.makedirs(model_dir, exist_ok=True)
        
        # Save main model
        joblib.dump(self.models['health'], 
                   os.path.join(model_dir, 'best_model.joblib'))
        
        # Save classification models
        joblib.dump(self.models['risk'], 
                   os.path.join(model_dir, 'risk_model.joblib'))
        joblib.dump(self.models['investment'], 
                   os.path.join(model_dir, 'investment_model.joblib'))
        
        # Save preprocessing components
        joblib.dump(self.scalers, 
                   os.path.join(model_dir, 'scalers.pkl'))
        joblib.dump(self.encoders, 
                   os.path.join(model_dir, 'encoders.pkl'))
        joblib.dump(self.feature_columns, 
                   os.path.join(model_dir, 'feature_columns.pkl'))
        
        print(f"💾 Models saved to {model_dir}")
    
    def train_all_models(self, csv_path):
        """Complete training pipeline"""
        print("🚀 Starting BAPS Model Training")
        print("=" * 50)
        
        # Load and prepare data
        df = self.load_and_prepare_data(csv_path)
        df_processed = self.preprocess_data(df)
        
        # Train all models
        health_rmse, health_r2 = self.train_health_model(df_processed)
        risk_accuracy = self.train_risk_model(df_processed)
        investment_accuracy = self.train_investment_model(df_processed)
        
        # Save models
        self.save_models()
        
        print("\n🎉 Training Complete!")
        print(f"Health Model - RMSE: {health_rmse:.3f}, R²: {health_r2:.3f}")
        print(f"Risk Model - Accuracy: {risk_accuracy:.3f}")
        print(f"Investment Model - Accuracy: {investment_accuracy:.3f}")
        
        return {
            'health_rmse': health_rmse,
            'health_r2': health_r2,
            'risk_accuracy': risk_accuracy,
            'investment_accuracy': investment_accuracy
        }

def main():
    """Main training function"""
    # Initialize trainer
    trainer = BAPSTrainer()
    
    # Path to your dataset
    csv_path = "C:/Users/Admin/Downloads/1,2,3.csv"
    
    # Check if file exists
    if not os.path.exists(csv_path):
        print(f"❌ Dataset not found at {csv_path}")
        print("Please update the csv_path variable with your dataset location")
        return
    
    # Train models
    results = trainer.train_all_models(csv_path)
    
    print("\n✅ Models are ready for use!")

if __name__ == "__main__":
    main()
