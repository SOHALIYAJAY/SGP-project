"""
Enhanced ML Model Creation with Validation and Cross-Validation
"""

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import cross_val_score, train_test_split, GridSearchCV
from sklearn.metrics import mean_squared_error, r2_score, classification_report, accuracy_score
import joblib
import os
import json
from datetime import datetime
import matplotlib.pyplot as plt
import seaborn as sns

def generate_training_data(n_samples=2000):
    """Generate more realistic training data"""
    np.random.seed(42)

    data = []
    for i in range(n_samples):
        # Financial metrics with realistic distributions
        revenue = max(10000, np.random.lognormal(13, 1.2))  # Mean ~$500k
        expenses = revenue * np.random.beta(2, 1.5)  # Expenses as fraction of revenue
        profit_margin = ((revenue - expenses) / revenue) * 100

        # Growth and operational metrics
        growth_rate = np.random.normal(0.20, 0.15)  # 20% mean growth
        churn_rate = min(0.50, max(0.001, np.random.exponential(0.08)))  # Churn rate

        # Team and customer metrics
        team_size = max(1, int(np.random.lognormal(3.5, 0.8)))  # Mean ~30 employees
        customer_count = max(1, int(np.random.lognormal(5.5, 1.2)))  # Mean ~200 customers

        # Calculate health score with more sophisticated logic
        revenue_score = min(25, np.log10(revenue) * 3)
        profit_score = min(25, profit_margin * 0.4)
        growth_score = min(20, growth_rate * 100 * 0.3)
        churn_penalty = min(20, churn_rate * 100 * 0.5)
        team_score = min(10, np.log(team_size) * 2)
        customer_score = min(20, np.log(customer_count) * 2)

        health_score = max(0, min(100, revenue_score + profit_score + growth_score + team_score + customer_score - churn_penalty))

        # Risk and investment levels based on health score
        if health_score >= 75:
            risk_level = "Low"
            investment_grade = "A"
        elif health_score >= 60:
            risk_level = "Medium"
            investment_grade = "B"
        elif health_score >= 45:
            risk_level = "Medium"
            investment_grade = "C"
        else:
            risk_level = "High"
            investment_grade = "D"

        data.append({
            'revenue': revenue,
            'expenses': expenses,
            'profitMargin': profit_margin,
            'growthRate': growth_rate * 100,  # Convert to percentage
            'churnRate': churn_rate * 100,  # Convert to percentage
            'teamSize': team_size,
            'customerCount': customer_count,
            'businessHealth': health_score,
            'riskLevel': risk_level,
            'investmentReadiness': investment_grade
        })

    return pd.DataFrame(data)

def train_and_validate_models():
    """Train models with proper validation and cross-validation"""

    print("🚀 Enhanced ML Model Training with Validation")
    print("=" * 60)

    # Generate training data
    df = generate_training_data(3000)
    print(f"📊 Generated {len(df)} training samples")

    # Prepare features
    feature_columns = ['revenue', 'expenses', 'profitMargin', 'growthRate', 'churnRate', 'teamSize', 'customerCount']
    X = df[feature_columns]
    y_health = df['businessHealth']
    y_risk = df['riskLevel']
    y_investment = df['investmentReadiness']

    print(f"🔍 Features: {feature_columns}")
    print(f"📈 Target distributions:")
    print(f"   Health Score: {y_health.mean():.1f} ± {y_health.std():.1f}")
    print(f"   Risk Levels: {y_risk.value_counts().to_dict()}")
    print(f"   Investment Grades: {y_investment.value_counts().to_dict()}")

    # Split data
    X_train, X_test, y_health_train, y_health_test = train_test_split(X, y_health, test_size=0.2, random_state=42)
    _, _, y_risk_train, y_risk_test = train_test_split(X, y_risk, test_size=0.2, random_state=42)
    _, _, y_inv_train, y_inv_test = train_test_split(X, y_investment, test_size=0.2, random_state=42)

    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # Hyperparameter tuning for health model
    print("\n🎯 Training Health Score Model...")
    health_param_grid = {
        'n_estimators': [100, 200, 300],
        'max_depth': [10, 20, None],
        'min_samples_split': [2, 5, 10]
    }

    health_model = RandomForestRegressor(random_state=42)
    health_grid = GridSearchCV(health_model, health_param_grid, cv=5, scoring='r2', n_jobs=-1)
    health_grid.fit(X_train_scaled, y_health_train)

    best_health_model = health_grid.best_estimator_
    print(f"   Best parameters: {health_grid.best_params_}")
    print(".3f")

    # Cross-validation scores
    health_cv_scores = cross_val_score(best_health_model, X_train_scaled, y_health_train, cv=5, scoring='r2')
    print(".3f")

    # Test performance
    health_pred = best_health_model.predict(X_test_scaled)
    health_mse = mean_squared_error(y_health_test, health_pred)
    health_r2 = r2_score(y_health_test, health_pred)
    print(".3f")

    # Risk model training
    print("\n⚠️  Training Risk Classification Model...")
    risk_model = RandomForestClassifier(n_estimators=200, random_state=42)
    risk_model.fit(X_train_scaled, y_risk_train)

    risk_pred = risk_model.predict(X_test_scaled)
    risk_accuracy = accuracy_score(y_risk_test, risk_pred)
    print(".3f")
    print("\nRisk Classification Report:")
    print(classification_report(y_risk_test, risk_pred))

    # Investment model training
    print("\n💰 Training Investment Grade Model...")
    investment_model = RandomForestClassifier(n_estimators=200, random_state=42)
    investment_model.fit(X_train_scaled, y_inv_train)

    inv_pred = investment_model.predict(X_test_scaled)
    inv_accuracy = accuracy_score(y_inv_test, inv_pred)
    print(".3f")
    print("\nInvestment Classification Report:")
    print(classification_report(y_inv_test, inv_pred))

    # Feature importance analysis
    print("\n📊 Feature Importance Analysis:")
    health_importance = pd.DataFrame({
        'feature': feature_columns,
        'importance': best_health_model.feature_importances_
    }).sort_values('importance', ascending=False)

    print("Health Model Feature Importance:")
    for _, row in health_importance.iterrows():
        print(".3f")

    # Create models directory
    os.makedirs("../models", exist_ok=True)

    # Save models and metadata
    print("\n💾 Saving Models and Metadata...")

    # Save models
    joblib.dump(best_health_model, "../models/health_model.joblib")
    joblib.dump(risk_model, "../models/risk_model.joblib")
    joblib.dump(investment_model, "../models/investment_model.joblib")
    joblib.dump(scaler, "../models/scaler.pkl")

    # Save feature columns
    with open("../models/feature_columns.json", "w") as f:
        json.dump(feature_columns, f)

    # Save model metadata
    metadata = {
        "training_date": datetime.now().isoformat(),
        "n_samples": len(df),
        "features": feature_columns,
        "health_model": {
            "type": "RandomForestRegressor",
            "best_params": health_grid.best_params_,
            "cv_r2_mean": float(health_cv_scores.mean()),
            "cv_r2_std": float(health_cv_scores.std()),
            "test_r2": float(health_r2),
            "test_mse": float(health_mse)
        },
        "risk_model": {
            "type": "RandomForestClassifier",
            "accuracy": float(risk_accuracy)
        },
        "investment_model": {
            "type": "RandomForestClassifier",
            "accuracy": float(inv_accuracy)
        },
        "feature_importance": health_importance.to_dict('records')
    }

    with open("../models/model_metadata.json", "w") as f:
        json.dump(metadata, f, indent=2)

    # Create validation plots
    create_validation_plots(df, best_health_model, scaler, feature_columns)

    print("✅ Model training completed successfully!")
    print(f"📁 Models saved to: {os.path.abspath('../models')}")

    return {
        "health_r2": health_r2,
        "risk_accuracy": risk_accuracy,
        "investment_accuracy": inv_accuracy
    }

def create_validation_plots(df, model, scaler, features):
    """Create validation plots for model analysis"""
    plt.style.use('default')

    # Feature correlation heatmap
    plt.figure(figsize=(10, 8))
    correlation_matrix = df[features + ['businessHealth']].corr()
    sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0)
    plt.title('Feature Correlation Matrix')
    plt.tight_layout()
    plt.savefig('../models/correlation_matrix.png', dpi=150, bbox_inches='tight')
    plt.close()

    # Feature importance plot
    plt.figure(figsize=(10, 6))
    importance_df = pd.DataFrame({
        'feature': features,
        'importance': model.feature_importances_
    }).sort_values('importance', ascending=True)

    plt.barh(importance_df['feature'], importance_df['importance'])
    plt.xlabel('Importance')
    plt.ylabel('Feature')
    plt.title('Feature Importance (Health Model)')
    plt.tight_layout()
    plt.savefig('../models/feature_importance.png', dpi=150, bbox_inches='tight')
    plt.close()

    # Prediction vs Actual scatter plot
    X_scaled = scaler.transform(df[features])
    predictions = model.predict(X_scaled)

    plt.figure(figsize=(8, 6))
    plt.scatter(df['businessHealth'], predictions, alpha=0.6)
    plt.plot([0, 100], [0, 100], 'r--', label='Perfect Prediction')
    plt.xlabel('Actual Health Score')
    plt.ylabel('Predicted Health Score')
    plt.title('Model Predictions vs Actual Values')
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig('../models/prediction_scatter.png', dpi=150, bbox_inches='tight')
    plt.close()

if __name__ == "__main__":
    results = train_and_validate_models()
    print("
🎉 Training Results Summary:")
    print(".3f")
    print(".3f")
    print(".3f")