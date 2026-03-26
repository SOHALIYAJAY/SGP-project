"""
Business prediction engine for BAPS ML system
"""

import pandas as pd
import numpy as np
from typing import Dict, Any, List, Optional, Tuple
import logging

try:
    import joblib
    HAS_JOBLIB = True
except ImportError:
    HAS_JOBLIB = False

try:
    from ..data_processing.preprocessor import DataPreprocessor
    from ..data_processing.validator import DataValidator
    HAS_PROCESSING = True
except ImportError:
    HAS_PROCESSING = False

logger = logging.getLogger(__name__)


class BusinessPredictor:
    """
    Main prediction engine for business analysis and forecasting
    """
    
    def __init__(self, model_path: Optional[str] = None, preprocessor_path: Optional[str] = None):
        """
        Initialize the predictor
        
        Args:
            model_path: Path to saved model
            preprocessor_path: Path to saved preprocessor
        """
        self.model = None
        self.model_type = None
        
        if not HAS_JOBLIB:
            logger.warning("joblib not available, ML features disabled")
            return
            
        if not HAS_PROCESSING:
            logger.warning("Data processing modules not available, using fallback")
            self.preprocessor = None
            self.validator = None
        else:
            self.preprocessor = DataPreprocessor()
            self.validator = DataValidator()
        
        if model_path:
            self.load_model(model_path)
        if preprocessor_path and HAS_PROCESSING:
            self.preprocessor.load_preprocessing_params(preprocessor_path)
    
    def load_model(self, model_path: str) -> None:
        """
        Load a trained model
        
        Args:
            model_path: Path to the saved model
        """
        try:
            self.model = joblib.load(model_path)
            logger.info(f"Successfully loaded model from {model_path}")
        except Exception as e:
            logger.error(f"Failed to load model: {str(e)}")
            raise
    
    def save_model(self, model_path: str) -> None:
        """
        Save the current model
        
        Args:
            model_path: Path to save the model
        """
        if self.model is None:
            raise ValueError("No model to save")
        
        try:
            joblib.dump(self.model, model_path)
            logger.info(f"Successfully saved model to {model_path}")
        except Exception as e:
            logger.error(f"Failed to save model: {str(e)}")
            raise
    
    def predict_single_company(self, company_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Predict business metrics for a single company
        
        Args:
            company_data: Dictionary containing company information
            
        Returns:
            Dictionary with prediction results
        """
        if not self.model:
            raise ValueError("No model loaded")
        
        # Prepare features
        features = self._prepare_features(company_data)
        
        # Make predictions
        health_score = self.model.predict(features)[0]
        health_score = max(0, min(100, health_score))  # Clamp to 0-100
        
        # Generate risk and investment levels based on health score
        risk_level = self._predict_risk_level(health_score, company_data)
        investment_readiness = self._predict_investment_readiness(health_score, company_data)
        
        # Generate additional predictions
        growth_predictions = self._generate_growth_predictions(company_data, health_score)
        trajectory = self._generate_trajectory(company_data, health_score)
        scenarios = self._generate_scenarios(company_data, health_score)
        
        return {
            "input": company_data,
            "summary": {
                "businessHealth": round(health_score, 1),
                "riskLevel": risk_level,
                "investmentReadiness": investment_readiness,
                "failureProbability": round(max(5.0, 100 - health_score), 1)
            },
            "growthPredictions": growth_predictions,
            "trajectory": trajectory,
            "scenarios": scenarios
        }
    
    def _prepare_features(self, company_data: Dict[str, Any]) -> np.ndarray:
        """
        Prepare features for prediction
        
        Args:
            company_data: Company data dictionary
            
        Returns:
            Numpy array of features
        """
        # Define feature mapping
        feature_mapping = {
            'revenue': 'revenue',
            'expenses': 'expenses', 
            'profitMargin': 'profitMargin',
            'growthRate': 'growthRate',
            'churnRate': 'churnRate',
            'teamSize': 'teamSize',
            'customerCount': 'customerCount'
        }
        
        # Extract features
        features = []
        for feature_name in feature_mapping.values():
            value = company_data.get(feature_name, 0)
            if isinstance(value, str):
                try:
                    value = float(value)
                except (ValueError, TypeError):
                    value = 0.0
            features.append(value)
        
        # Convert to numpy array and reshape
        features_array = np.array(features).reshape(1, -1)
        
        # Load scaler if available
        try:
            import joblib
            scalers = joblib.load("../models/scalers.pkl")
            if 'health' in scalers:
                features_array = scalers['health'].transform(features_array)
        except:
            pass  # Use unscaled features if scaler not available
        
        return features_array
    
    def _predict_risk_level(self, health_score: float, company_data: Dict[str, Any]) -> str:
        """Predict risk level based on health score"""
        if health_score >= 80:
            return "Low"
        elif health_score >= 60:
            return "Medium"
        else:
            return "High"
    
    def _predict_investment_readiness(self, health_score: float, company_data: Dict[str, Any]) -> str:
        """Predict investment readiness based on health score"""
        if health_score >= 85:
            return "A+"
        elif health_score >= 75:
            return "A"
        elif health_score >= 65:
            return "B+"
        elif health_score >= 55:
            return "B"
        elif health_score >= 45:
            return "C+"
        else:
            return "C"
    
    def _generate_growth_predictions(self, company_data: Dict[str, Any], health_score: float) -> List[Dict]:
        """Generate growth predictions"""
        predictions = []
        base_revenue = float(company_data.get('revenue', 0)) / 1_000_000 or 7.5
        growth_rate = float(company_data.get('growthRate', 0)) or 0.15
        
        for months, label in [(3, "3 Months"), (6, "6 Months"), (12, "12 Months"), (24, "24 Months")]:
            confidence = max(50.0, min(95.0, health_score - months * 0.6))
            status = "success" if confidence >= 80 else "warning" if confidence >= 65 else "danger"
            
            future_revenue = base_revenue * (1 + growth_rate) ** (months / 12)
            
            predictions.append({
                "period": label,
                "confidence": round(confidence, 1),
                "status": status,
                "metrics": [
                    {
                        "label": "Revenue",
                        "value": f"${future_revenue:.1f}M",
                        "positive": True,
                        "change": round((future_revenue / base_revenue - 1) * 100, 1)
                    }
                ]
            })
        
        return predictions
    
    def _generate_trajectory(self, company_data: Dict[str, Any], health_score: float) -> List[Dict]:
        """Generate trajectory points"""
        trajectory = []
        base_revenue = float(company_data.get('revenue', 0)) / 1_000_000 or 7.5
        base_customers = int(float(company_data.get('customerCount', 0))) or 1500
        growth_rate = float(company_data.get('growthRate', 0)) or 0.15
        
        for month in ["Now", "3M", "6M", "12M", "24M"]:
            months = {"Now": 0, "3M": 3, "6M": 6, "12M": 12, "24M": 24}[month]
            revenue = base_revenue * (1 + growth_rate) ** (months / 12)
            customers = int(base_customers * (1 + growth_rate) ** (months / 12))
            
            trajectory.append({
                "month": month,
                "revenue": round(revenue, 1),
                "customers": customers,
                "marketShare": round(2.5 * (1 + growth_rate / 400), 1)
            })
        
        return trajectory
    
    def _generate_scenarios(self, company_data: Dict[str, Any], health_score: float) -> List[Dict]:
        """Generate scenario predictions"""
        scenarios = []
        base_revenue = float(company_data.get('revenue', 0)) / 1_000_000 or 7.5
        growth_rate = float(company_data.get('growthRate', 0)) or 0.15
        
        quarters = ["Q1 2026", "Q2 2026", "Q3 2026", "Q4 2026"]
        for i, quarter in enumerate(quarters):
            months = (i + 1) * 3
            baseline = base_revenue * (1 + growth_rate) ** (months / 12)
            
            scenarios.append({
                "period": quarter,
                "optimistic": round(baseline * 1.1, 1),
                "baseline": round(baseline, 1),
                "conservative": round(baseline * 0.9, 1)
            })
        
        return scenarios
    
    def predict_batch(self, companies_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Make predictions for multiple companies
        
        Args:
            companies_data: List of company data dictionaries
            
        Returns:
            List of prediction results
        """
        if self.model is None:
            raise ValueError("No model loaded")
        
        # Convert to DataFrame
        df = pd.DataFrame(companies_data)
        
        # Validate and clean data
        is_valid, validation_errors = self.validator.validate_dataframe(df)
        if not is_valid:
            logger.warning(f"Validation errors found: {validation_errors}")
        
        df_cleaned = self.validator.clean_data(df)
        df_processed = self.preprocessor.transform(df_cleaned)
        
        # Make predictions
        predictions = self._make_predictions(df_processed)
        
        # Generate analysis for each company
        results = []
        for i, company_data in enumerate(companies_data):
            company_predictions = {key: values[i] for key, values in predictions.items()}
            analysis = self._generate_analysis(company_data, company_predictions)
            results.append(analysis)
        
        return results
    
    def _make_predictions(self, df_processed: pd.DataFrame) -> Dict[str, np.ndarray]:
        """
        Make model predictions
        
        Args:
            df_processed: Preprocessed feature DataFrame
            
        Returns:
            Dictionary of predictions
        """
        predictions = {}
        
        # Revenue prediction
        if hasattr(self.model, 'predict'):
            revenue_pred = self.model.predict(df_processed)
            predictions['revenue'] = revenue_pred
        
        # Generate additional business metrics
        predictions.update(self._generate_business_metrics(df_processed))
        
        return predictions
    
    def _generate_business_metrics(self, df_processed: pd.DataFrame) -> Dict[str, np.ndarray]:
        """
        Generate additional business metrics based on predictions
        
        Args:
            df_processed: Preprocessed features
            
        Returns:
            Dictionary of business metrics
        """
        n_samples = len(df_processed)
        metrics = {}
        
        # Business health score (0-100) - IMPROVED: More realistic scoring
        # This is a simplified calculation - in practice, you might use a separate model
        if 'revenue' in df_processed.columns:
            # Better revenue scoring - scale more appropriately
            revenue_score = np.clip(df_processed['revenue'].values * 15, 0, 50)
        else:
            revenue_score = np.zeros(n_samples)
        
        if 'profitMargin' in df_processed.columns:
            # Better profit scoring - reward positive margins more
            profit_score = np.clip(df_processed['profitMargin'].values * 35, 0, 35)
        else:
            profit_score = np.zeros(n_samples)
        
        if 'growthRate' in df_processed.columns:
            # Better growth scoring - reward high growth more
            growth_score = np.clip(df_processed['growthRate'].values * 6, 0, 30)
        else:
            growth_score = np.zeros(n_samples)
        
        # Add base score and reduce randomness - MORE REALISTIC
        health_score = revenue_score + profit_score + growth_score + np.random.uniform(5, 10, n_samples)
        metrics['business_health'] = np.clip(health_score, 0, 100)
        
        # Risk level
        risk_levels = []
        for health in metrics['business_health']:
            if health >= 80:
                risk_levels.append("Low")
            elif health >= 55:
                risk_levels.append("Medium")
            else:
                risk_levels.append("High")
        metrics['risk_level'] = np.array(risk_levels)
        
        # Failure probability - IMPROVED: Less pessimistic
        failure_prob = np.maximum(3.0, 40.0 - metrics['business_health'] * 0.4)
        metrics['failure_probability'] = np.clip(failure_prob, 3.0, 40.0)
        
        # Investment readiness - IMPROVED: More realistic grading
        investment_grades = []
        for health in metrics['business_health']:
            if health >= 85:
                investment_grades.append("A")
            elif health >= 70:
                investment_grades.append("A-")
            elif health >= 55:
                investment_grades.append("B+")
            elif health >= 40:
                investment_grades.append("B")
            else:
                investment_grades.append("C+")
        metrics['investment_readiness'] = np.array(investment_grades)
        
        return metrics
    
    def _generate_analysis(self, company_data: Dict[str, Any], predictions: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate comprehensive business analysis
        
        Args:
            company_data: Original company data
            predictions: Model predictions
            
        Returns:
            Comprehensive analysis dictionary
        """
        analysis = {
            'input': company_data,
            'predictions': predictions,
            'summary': self._create_summary(predictions),
            'growth_predictions': self._create_growth_predictions(company_data, predictions),
            'trajectory': self._create_trajectory(company_data, predictions),
            'scenarios': self._create_scenarios(predictions),
            'recommendations': self._generate_recommendations(company_data, predictions),
            'timestamp': datetime.now().isoformat()
        }
        
        return analysis
    
    def _create_summary(self, predictions: Dict[str, Any]) -> Dict[str, Any]:
        """
        Create analysis summary
        
        Args:
            predictions: Model predictions
            
        Returns:
            Summary dictionary
        """
        return {
            'businessHealth': round(float(predictions['business_health']), 1),
            'riskLevel': predictions['risk_level'],
            'investmentReadiness': predictions['investment_readiness'],
            'failureProbability': round(float(predictions['failure_probability']), 1)
        }
    
    def _create_growth_predictions(self, company_data: Dict[str, Any], predictions: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        Create growth predictions for different time periods
        
        Args:
            company_data: Original company data
            predictions: Model predictions
            
        Returns:
            List of growth predictions
        """
        base_revenue = predictions.get('revenue', 0)
        business_health = predictions.get('business_health', 50)
        
        growth_predictions = []
        
        for months, label in [(3, "3 Months"), (6, "6 Months"), (12, "12 Months"), (24, "24 Months")]:
            # Calculate growth factor based on business health and time
            growth_factor = 1 + (months / 36) * (business_health / 100)
            future_revenue = base_revenue * growth_factor
            
            # Calculate confidence
            confidence = max(50.0, min(95.0, business_health - months * 0.6))
            
            # Determine status
            if confidence >= 80:
                status = "success"
            elif confidence >= 65:
                status = "warning"
            else:
                status = "danger"
            
            # Calculate percentage change
            revenue_change = ((future_revenue - base_revenue) / base_revenue * 100) if base_revenue > 0 else 0
            
            prediction = {
                'period': label,
                'confidence': round(confidence, 1),
                'status': status,
                'metrics': [
                    {
                        'label': 'Revenue',
                        'value': f"${future_revenue/1_000_000:.1f}M" if future_revenue >= 1_000_000 else f"${future_revenue:,.0f}",
                        'positive': True,
                        'change': round(revenue_change, 1)
                    }
                ]
            }
            
            growth_predictions.append(prediction)
        
        return growth_predictions
    
    def _create_trajectory(self, company_data: Dict[str, Any], predictions: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        Create business trajectory points
        
        Args:
            company_data: Original company data
            predictions: Model predictions
            
        Returns:
            List of trajectory points
        """
        base_revenue = predictions.get('revenue', 0)
        business_health = predictions.get('business_health', 50)
        base_customers = int(company_data.get('customerCount', 0)) or 1500
        base_market_share = float(company_data.get('marketShare', 0)) or 2.5
        
        trajectory = []
        
        for months, label in [(0, "Now"), (3, "3M"), (6, "6M"), (12, "12M"), (24, "24M")]:
            growth_factor = 1 + (months / 36) * (business_health / 100)
            
            point = {
                'month': label,
                'revenue': round(base_revenue * growth_factor, 1),
                'customers': int(base_customers * growth_factor),
                'marketShare': round(base_market_share * (1 + months * 0.01), 1)
            }
            
            trajectory.append(point)
        
        return trajectory
    
    def _create_scenarios(self, predictions: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        Create scenario analysis
        
        Args:
            predictions: Model predictions
            
        Returns:
            List of scenario points
        """
        base_revenue = predictions.get('revenue', 0)
        business_health = predictions.get('business_health', 50)
        
        scenarios = []
        quarters = ["Q1 2026", "Q2 2026", "Q3 2026", "Q4 2026"]
        
        for i, quarter in enumerate(quarters):
            months = (i + 1) * 3
            growth_factor = 1 + (months / 36) * (business_health / 100)
            quarter_revenue = base_revenue * growth_factor
            
            scenario = {
                'period': quarter,
                'optimistic': round(quarter_revenue * 1.1, 1),
                'baseline': round(quarter_revenue, 1),
                'conservative': round(quarter_revenue * 0.9, 1)
            }
            
            scenarios.append(scenario)
        
        return scenarios
    
    def _generate_recommendations(self, company_data: Dict[str, Any], predictions: Dict[str, Any]) -> List[str]:
        """
        Generate business recommendations based on analysis
        
        Args:
            company_data: Original company data
            predictions: Model predictions
            
        Returns:
            List of recommendations
        """
        recommendations = []
        business_health = predictions.get('business_health', 50)
        risk_level = predictions.get('risk_level', 'Medium')
        
        # Health-based recommendations
        if business_health < 55:
            recommendations.append("Focus on improving revenue growth and profitability")
            recommendations.append("Consider cost optimization measures")
            recommendations.append("Seek additional funding to extend runway")
        elif business_health < 80:
            recommendations.append("Maintain current growth trajectory")
            recommendations.append("Explore market expansion opportunities")
        else:
            recommendations.append("Consider scaling operations")
            recommendations.append("Evaluate strategic acquisition opportunities")
        
        # Risk-based recommendations
        if risk_level == "High":
            recommendations.append("Implement strong cash flow management")
            recommendations.append("Diversify revenue streams")
        elif risk_level == "Medium":
            recommendations.append("Monitor key performance indicators closely")
            recommendations.append("Build contingency plans")
        
        # Financial recommendations
        revenue = float(company_data.get('revenue', 0)) or 0
        profit_margin = float(company_data.get('profitMargin', 0)) or 0
        
        if profit_margin < 0:
            recommendations.append("Urgently address negative profitability")
        elif profit_margin < 0.1:
            recommendations.append("Focus on improving profit margins")
        
        if revenue < 1000000:
            recommendations.append("Develop strategies to accelerate revenue growth")
        
        return recommendations
    
    def get_feature_importance(self, feature_names: List[str]) -> Optional[pd.DataFrame]:
        """
        Get feature importance from the loaded model
        
        Args:
            feature_names: List of feature names
            
        Returns:
            DataFrame with feature importance or None if not available
        """
        if self.model is None:
            raise ValueError("No model loaded")
        
        if hasattr(self.model, 'feature_importances_'):
            importance_df = pd.DataFrame({
                'feature': feature_names,
                'importance': self.model.feature_importances_
            }).sort_values('importance', ascending=False)
            
            return importance_df
        else:
            logger.warning("Model does not support feature importance")
            return None
