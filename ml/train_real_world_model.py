"""
Train ML Model with Your Real-World Dataset
"""

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score, accuracy_score
import joblib
import os

class RealWorldMLTrainer:
    """Train ML model with your actual business data"""
    
    def __init__(self):
        self.models = {}
        self.scalers = {}
        self.encoders = {}
        self.feature_columns = []
    
    def load_and_prepare_data(self, csv_path):
        """Load your real dataset"""
        print(f"📁 Loading real-world data from {csv_path}")
        
        try:
            df = pd.read_csv(csv_path)
            print(f"📊 Loaded {len(df)} real company records")
            print(f"📋 Columns: {list(df.columns)}")
            return df
        except Exception as e:
            print(f"❌ Error loading data: {e}")
            return None
    
    def define_features(self, df):
        """Define comprehensive features from your real data"""
        
        # Core financial features
        financial_features = [
            'revenue', 'expenses', 'profitMargin', 'burnRate', 
            'cashBalance', 'totalFunding', 'operationalCost'
        ]
        
        # Growth & market features
        growth_features = [
            'growthRate', 'industryGrowthRate', 'marketSize', 
            'marketShare', 'competitorCount', 'arpu'
        ]
        
        # Operational features
        operational_features = [
            'teamSize', 'customerCount', 'churnRate', 'nps',
            'customerSatisfaction', 'founderExperience'
        ]
        
        # Categorical features
        categorical_features = ['industry', 'companyStage', 'businessModel']
        
        # Combine all features
        all_features = financial_features + growth_features + operational_features + categorical_features
        
        # Filter to only available columns
        available_features = [f for f in all_features if f in df.columns]
        
        print(f"🎯 Using {len(available_features)} features:")
        for feature in available_features:
            print(f"   - {feature}")
        
        return available_features, categorical_features
    
    def preprocess_data(self, df, feature_columns, categorical_columns):
        """Preprocess your real data"""
        print("🔄 Preprocessing real-world data...")
        
        df_processed = df.copy()
        
        # Handle categorical variables
        for col in categorical_columns:
            if col in df_processed.columns:
                if col not in self.encoders:
                    self.encoders[col] = LabelEncoder()
                    df_processed[f'{col}_encoded'] = self.encoders[col].fit_transform(
                        df_processed[col].fillna('Unknown')
                    )
                else:
                    df_processed[f'{col}_encoded'] = self.encoders[col].transform(
                        df_processed[col].fillna('Unknown')
                    )
        
        # Select final features
        exclude_columns = categorical_columns + ['companyName']
        
        # Add target columns if they exist
        target_columns = ['businessHealth', 'riskLevel', 'investmentReadiness']
        exclude_columns.extend([col for col in target_columns if col in df_processed.columns])
        
        self.feature_columns = [col for col in df_processed.columns 
                             if col not in exclude_columns]
        
        # Handle missing values
        df_processed[self.feature_columns] = df_processed[self.feature_columns].fillna(0)
        
        print(f"✅ Final feature count: {len(self.feature_columns)}")
        return df_processed
    
    def create_targets_if_missing(self, df):
        """Create target variables if not in your dataset"""
        
        # Create business health score if missing
        if 'businessHealth' not in df.columns:
            print("📈 Creating business health score from your data...")
            health_scores = []
            
            for _, row in df.iterrows():
                score = 50.0  # Base score
                
                # Revenue contribution
                revenue = row.get('revenue', 0)
                if revenue > 0:
                    score += min(20, np.log10(revenue + 1) * 4)
                
                # Profit margin contribution
                profit_margin = row.get('profitMargin', 0)
                if profit_margin > 0:
                    score += min(15, profit_margin * 100)
                
                # Growth contribution
                growth_rate = row.get('growthRate', 0)
                if growth_rate > 0:
                    score += min(15, growth_rate * 50)
                
                # Market position contribution
                market_share = row.get('marketShare', 0)
                if market_share > 0:
                    score += min(10, market_share * 20)
                
                # Team size contribution
                team_size = row.get('teamSize', 0)
                if team_size > 0:
                    score += min(10, np.log10(team_size + 1) * 2)
                
                # Cash runway contribution
                burn_rate = row.get('burnRate', 0)
                cash_balance = row.get('cashBalance', 0)
                if burn_rate > 0 and cash_balance > 0:
                    runway = cash_balance / burn_rate
                    score += min(10, runway * 0.5)
                
                # Customer base contribution
                customer_count = row.get('customerCount', 0)
                if customer_count > 0:
                    score += min(10, np.log10(customer_count + 1) * 1.5)
                
                # NPS contribution
                nps = row.get('nps', 0)
                if nps > 0:
                    score += min(10, max(0, (nps + 100) * 0.05))
                
                health_scores.append(max(0, min(100, score)))
            
            df['businessHealth'] = health_scores
        
        # Create risk levels
        if 'riskLevel' not in df.columns:
            print("⚠️  Creating risk levels from health scores...")
            risk_levels = []
            for health in df['businessHealth']:
                if health >= 80:
                    risk_levels.append("Low")
                elif health >= 60:
                    risk_levels.append("Medium")
                else:
                    risk_levels.append("High")
            df['riskLevel'] = risk_levels
        
        # Create investment grades
        if 'investmentReadiness' not in df.columns:
            print("💰 Creating investment grades from health scores...")
            investment_grades = []
            for health in df['businessHealth']:
                if health >= 85:
                    investment_grades.append("A+")
                elif health >= 75:
                    investment_grades.append("A")
                elif health >= 65:
                    investment_grades.append("B+")
                elif health >= 55:
                    investment_grades.append("B")
                elif health >= 45:
                    investment_grades.append("C+")
                else:
                    investment_grades.append("C")
            df['investmentReadiness'] = investment_grades
        
        return df
    
    def train_models(self, df):
        """Train models with your real data"""
        print("🚀 Training models with real-world data...")
        
        X = df[self.feature_columns]
        
        # Train health model
        print("🎯 Training Business Health Model...")
        y_health = df['businessHealth']
        
        X_train, X_test, y_train, y_test = train_test_split(
            X, y_health, test_size=0.2, random_state=42
        )
        
        # Scale features
        self.scalers['health'] = StandardScaler()
        X_train_scaled = self.scalers['health'].fit_transform(X_train)
        X_test_scaled = self.scalers['health'].transform(X_test)
        
        # Train model
        health_model = RandomForestRegressor(
            n_estimators=200, 
            max_depth=15, 
            random_state=42
        )
        health_model.fit(X_train_scaled, y_train)
        
        # Evaluate
        y_pred = health_model.predict(X_test_scaled)
        rmse = np.sqrt(mean_squared_error(y_test, y_pred))
        r2 = r2_score(y_test, y_pred)
        
        print(f"   Health Model - RMSE: {rmse:.3f}, R²: {r2:.3f}")
        self.models['health'] = health_model
        
        # Train risk model
        print("⚠️  Training Risk Classification Model...")
        y_risk = df['riskLevel']
        
        X_train, X_test, y_train, y_test = train_test_split(
            X, y_risk, test_size=0.2, random_state=42
        )
        
        self.scalers['risk'] = StandardScaler()
        X_train_scaled = self.scalers['risk'].fit_transform(X_train)
        X_test_scaled = self.scalers['risk'].transform(X_test)
        
        risk_model = RandomForestClassifier(
            n_estimators=200, 
            max_depth=15, 
            random_state=42
        )
        risk_model.fit(X_train_scaled, y_train)
        
        risk_accuracy = accuracy_score(y_test, risk_model.predict(X_test_scaled))
        print(f"   Risk Model - Accuracy: {risk_accuracy:.3f}")
        self.models['risk'] = risk_model
        
        # Train investment model
        print("💰 Training Investment Readiness Model...")
        y_investment = df['investmentReadiness']
        
        X_train, X_test, y_train, y_test = train_test_split(
            X, y_investment, test_size=0.2, random_state=42
        )
        
        self.scalers['investment'] = StandardScaler()
        X_train_scaled = self.scalers['investment'].fit_transform(X_train)
        X_test_scaled = self.scalers['investment'].transform(X_test)
        
        investment_model = RandomForestClassifier(
            n_estimators=200, 
            max_depth=15, 
            random_state=42
        )
        investment_model.fit(X_train_scaled, y_train)
        
        investment_accuracy = accuracy_score(y_test, investment_model.predict(X_test_scaled))
        print(f"   Investment Model - Accuracy: {investment_accuracy:.3f}")
        self.models['investment'] = investment_model
        
        return {
            'health_rmse': rmse,
            'health_r2': r2,
            'risk_accuracy': risk_accuracy,
            'investment_accuracy': investment_accuracy
        }
    
    def save_models(self, model_dir="../models"):
        """Save trained models"""
        os.makedirs(model_dir, exist_ok=True)
        
        # Save models
        joblib.dump(self.models['health'], 
                   os.path.join(model_dir, 'best_model.joblib'))
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
        
        # Create preprocessor.pkl for compatibility
        preprocessor_data = {
            'scalers': self.scalers,
            'feature_columns': self.feature_columns,
            'encoders': self.encoders
        }
        joblib.dump(preprocessor_data, 
                   os.path.join(model_dir, 'preprocessor.pkl'))
        
        print(f"💾 Real-world models saved to {model_dir}")
    
    def train_with_real_data(self, csv_path):
        """Complete training pipeline with your data"""
        print("🌍 Training ML Model with Your Real-World Data")
        print("=" * 60)
        
        # Load your data
        df = self.load_and_prepare_data(csv_path)
        if df is None:
            return None
        
        # Define features
        feature_columns, categorical_columns = self.define_features(df)
        
        # Preprocess data
        df_processed = self.preprocess_data(df, feature_columns, categorical_columns)
        
        # Create targets if missing
        df_processed = self.create_targets_if_missing(df_processed)
        
        # Train models
        results = self.train_models(df_processed)
        
        # Save models
        self.save_models()
        
        print("\n🎉 Real-World Model Training Complete!")
        print("=" * 60)
        print(f"📊 Trained on {len(df)} real companies")
        print(f"🎯 Used {len(self.feature_columns)} features")
        if results:
            print(f"📈 Health Model R²: {results['health_r2']:.3f}")
            print(f"⚠️  Risk Model Accuracy: {results['risk_accuracy']:.3f}")
            print(f"💰 Investment Model Accuracy: {results['investment_accuracy']:.3f}")
        
        return results

def main():
    """Main training function"""
    trainer = RealWorldMLTrainer()
    
    # UPDATE THIS PATH to your real dataset
    csv_path = "../data/raw/your_real_companies.csv"
    
    # Check if file exists
    if not os.path.exists(csv_path):
        print(f"❌ Dataset not found at {csv_path}")
        print("Please update csv_path to your real dataset location")
        print("\n📋 Expected columns in your CSV:")
        print("   - revenue, expenses, profitMargin")
        print("   - growthRate, marketSize, marketShare")
        print("   - teamSize, customerCount, churnRate")
        print("   - industry, companyStage (optional)")
        print("   - businessHealth, riskLevel, investmentReadiness (optional)")
        return
    
    # Train with real data
    results = trainer.train_with_real_data(csv_path)
    
    if results:
        print("\n✅ Your real-world ML model is ready!")
        print("🚀 Restart your backend to use the new model")

if __name__ == "__main__":
    main()
