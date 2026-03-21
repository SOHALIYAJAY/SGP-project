"""
Model evaluation utilities for business analysis ML models
"""

import pandas as pd
import numpy as np
from typing import Dict, Any, List, Optional, Tuple
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import (
    mean_squared_error, mean_absolute_error, r2_score,
    mean_absolute_percentage_error, explained_variance_score
)
import logging

logger = logging.getLogger(__name__)


class ModelEvaluator:
    """
    Comprehensive model evaluation for business analysis ML models
    """
    
    def __init__(self):
        self.evaluation_results = {}
        
    def calculate_regression_metrics(self, 
                                    y_true: np.ndarray, 
                                    y_pred: np.ndarray) -> Dict[str, float]:
        """
        Calculate comprehensive regression metrics
        
        Args:
            y_true: True target values
            y_pred: Predicted values
            
        Returns:
            Dictionary of regression metrics
        """
        metrics = {
            'mse': mean_squared_error(y_true, y_pred),
            'rmse': np.sqrt(mean_squared_error(y_true, y_pred)),
            'mae': mean_absolute_error(y_true, y_pred),
            'mape': mean_absolute_percentage_error(y_true, y_pred),
            'r2': r2_score(y_true, y_pred),
            'explained_variance': explained_variance_score(y_true, y_pred),
            'max_error': np.max(np.abs(y_true - y_pred)),
            'mean_error': np.mean(y_true - y_pred),
            'std_error': np.std(y_true - y_pred)
        }
        
        # Custom business metrics
        residuals = y_true - y_pred
        
        # Percentage of predictions within 10% of actual values
        within_10_percent = np.mean(np.abs(residuals / y_true) <= 0.1) * 100
        metrics['within_10_percent'] = within_10_percent
        
        # Percentage of predictions within 20% of actual values
        within_20_percent = np.mean(np.abs(residuals / y_true) <= 0.2) * 100
        metrics['within_20_percent'] = within_20_percent
        
        return metrics
    
    def evaluate_model(self,
                      model: Any,
                      X_test: pd.DataFrame,
                      y_test: pd.Series,
                      model_name: str = "model") -> Dict[str, Any]:
        """
        Comprehensive model evaluation
        
        Args:
            model: Trained model to evaluate
            X_test: Test features
            y_test: Test target
            model_name: Name of the model for reporting
            
        Returns:
            Dictionary containing evaluation results
        """
        logger.info(f"Evaluating model: {model_name}")
        
        # Make predictions
        y_pred = model.predict(X_test)
        
        # Calculate metrics
        metrics = self.calculate_regression_metrics(y_test.values, y_pred)
        
        # Create residual analysis
        residuals = y_test.values - y_pred
        
        evaluation_results = {
            'model_name': model_name,
            'metrics': metrics,
            'predictions': y_pred,
            'actual': y_test.values,
            'residuals': residuals,
            'sample_size': len(y_test)
        }
        
        self.evaluation_results[model_name] = evaluation_results
        
        logger.info(f"Model {model_name} - R2: {metrics['r2']:.4f}, RMSE: {metrics['rmse']:.4f}")
        
        return evaluation_results
    
    def compare_models(self, 
                      model_results: Dict[str, Dict[str, Any]]) -> pd.DataFrame:
        """
        Compare multiple models side by side
        
        Args:
            model_results: Dictionary of evaluation results for multiple models
            
        Returns:
            DataFrame with model comparison
        """
        comparison_data = []
        
        for model_name, results in model_results.items():
            if 'metrics' not in results:
                continue
                
            metrics = results['metrics']
            row = {'model': model_name}
            row.update(metrics)
            comparison_data.append(row)
        
        comparison_df = pd.DataFrame(comparison_data)
        
        # Sort by R2 score (descending)
        if 'r2' in comparison_df.columns:
            comparison_df = comparison_df.sort_values('r2', ascending=False)
        
        return comparison_df
    
    def generate_residual_plots(self, 
                              model_results: Dict[str, Dict[str, Any]],
                              save_path: Optional[str] = None) -> None:
        """
        Generate residual analysis plots
        
        Args:
            model_results: Dictionary of evaluation results
            save_path: Path to save plots (optional)
        """
        num_models = len(model_results)
        fig, axes = plt.subplots(2, 2, figsize=(15, 12))
        fig.suptitle('Residual Analysis', fontsize=16)
        
        colors = plt.cm.Set3(np.linspace(0, 1, num_models))
        
        # Plot 1: Residuals vs Predicted
        ax1 = axes[0, 0]
        for i, (model_name, results) in enumerate(model_results.items()):
            if 'residuals' not in results:
                continue
            ax1.scatter(results['predictions'], results['residuals'], 
                       alpha=0.6, label=model_name, color=colors[i])
        
        ax1.axhline(y=0, color='r', linestyle='--')
        ax1.set_xlabel('Predicted Values')
        ax1.set_ylabel('Residuals')
        ax1.set_title('Residuals vs Predicted')
        ax1.legend()
        
        # Plot 2: Actual vs Predicted
        ax2 = axes[0, 1]
        for i, (model_name, results) in enumerate(model_results.items()):
            if 'predictions' not in results:
                continue
            ax2.scatter(results['actual'], results['predictions'], 
                       alpha=0.6, label=model_name, color=colors[i])
        
        # Perfect prediction line
        min_val = min([min(results['actual'].min(), results['predictions'].min()) 
                      for results in model_results.values() if 'actual' in results])
        max_val = max([max(results['actual'].max(), results['predictions'].max()) 
                      for results in model_results.values() if 'actual' in results])
        ax2.plot([min_val, max_val], [min_val, max_val], 'r--', alpha=0.8)
        
        ax2.set_xlabel('Actual Values')
        ax2.set_ylabel('Predicted Values')
        ax2.set_title('Actual vs Predicted')
        ax2.legend()
        
        # Plot 3: Residual Distribution
        ax3 = axes[1, 0]
        for i, (model_name, results) in enumerate(model_results.items()):
            if 'residuals' not in results:
                continue
            ax3.hist(results['residuals'], alpha=0.6, label=model_name, 
                    bins=30, color=colors[i], density=True)
        
        ax3.set_xlabel('Residuals')
        ax3.set_ylabel('Density')
        ax3.set_title('Residual Distribution')
        ax3.legend()
        
        # Plot 4: Q-Q Plot for best model
        ax4 = axes[1, 1]
        best_model = max(model_results.keys(), 
                        key=lambda x: model_results[x].get('metrics', {}).get('r2', -float('inf')))
        
        if 'residuals' in model_results[best_model]:
            from scipy import stats
            stats.probplot(model_results[best_model]['residuals'], dist="norm", plot=ax4)
            ax4.set_title(f'Q-Q Plot - {best_model}')
        
        plt.tight_layout()
        
        if save_path:
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
            logger.info(f"Saved residual plots to {save_path}")
        
        plt.show()
    
    def generate_feature_importance_plot(self,
                                       feature_importance_df: pd.DataFrame,
                                       model_name: str = "model",
                                       top_n: int = 20,
                                       save_path: Optional[str] = None) -> None:
        """
        Generate feature importance plot
        
        Args:
            feature_importance_df: DataFrame with feature importance
            model_name: Name of the model
            top_n: Number of top features to show
            save_path: Path to save plot (optional)
        """
        plt.figure(figsize=(12, 8))
        
        # Get top N features
        top_features = feature_importance_df.head(top_n)
        
        # Create horizontal bar plot
        plt.barh(range(len(top_features)), top_features['importance'])
        plt.yticks(range(len(top_features)), top_features['feature'])
        plt.xlabel('Importance')
        plt.title(f'Top {top_n} Feature Importance - {model_name}')
        plt.gca().invert_yaxis()
        
        # Add value labels on bars
        for i, v in enumerate(top_features['importance']):
            plt.text(v + 0.001, i, f'{v:.3f}', va='center')
        
        plt.tight_layout()
        
        if save_path:
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
            logger.info(f"Saved feature importance plot to {save_path}")
        
        plt.show()
    
    def generate_evaluation_report(self, 
                                  model_results: Dict[str, Dict[str, Any]],
                                  save_path: Optional[str] = None) -> str:
        """
        Generate comprehensive evaluation report
        
        Args:
            model_results: Dictionary of evaluation results
            save_path: Path to save report (optional)
            
        Returns:
            Evaluation report as string
        """
        report_lines = []
        report_lines.append("=" * 60)
        report_lines.append("MODEL EVALUATION REPORT")
        report_lines.append("=" * 60)
        report_lines.append("")
        
        # Model comparison table
        comparison_df = self.compare_models(model_results)
        report_lines.append("MODEL COMPARISON")
        report_lines.append("-" * 40)
        report_lines.append(comparison_df.to_string(index=False))
        report_lines.append("")
        
        # Detailed analysis for each model
        for model_name, results in model_results.items():
            if 'metrics' not in results:
                continue
                
            report_lines.append(f"DETAILED ANALYSIS - {model_name.upper()}")
            report_lines.append("-" * 40)
            
            metrics = results['metrics']
            report_lines.append(f"R² Score: {metrics['r2']:.4f}")
            report_lines.append(f"RMSE: {metrics['rmse']:.4f}")
            report_lines.append(f"MAE: {metrics['mae']:.4f}")
            report_lines.append(f"MAPE: {metrics['mape']:.4f}")
            report_lines.append(f"Explained Variance: {metrics['explained_variance']:.4f}")
            report_lines.append(f"Predictions within 10%: {metrics['within_10_percent']:.2f}%")
            report_lines.append(f"Predictions within 20%: {metrics['within_20_percent']:.2f}%")
            report_lines.append("")
        
        # Recommendations
        report_lines.append("RECOMMENDATIONS")
        report_lines.append("-" * 40)
        
        best_model = comparison_df.iloc[0]['model'] if len(comparison_df) > 0 else "None"
        best_r2 = comparison_df.iloc[0]['r2'] if len(comparison_df) > 0 else 0
        
        report_lines.append(f"Best performing model: {best_model}")
        report_lines.append(f"Best R² score: {best_r2:.4f}")
        
        if best_r2 > 0.8:
            report_lines.append("Model performance is excellent (R² > 0.8)")
        elif best_r2 > 0.6:
            report_lines.append("Model performance is good (R² > 0.6)")
        elif best_r2 > 0.4:
            report_lines.append("Model performance is moderate (R² > 0.4)")
        else:
            report_lines.append("Model performance needs improvement (R² ≤ 0.4)")
        
        report_lines.append("")
        report_lines.append("=" * 60)
        
        report = "\n".join(report_lines)
        
        if save_path:
            with open(save_path, 'w') as f:
                f.write(report)
            logger.info(f"Saved evaluation report to {save_path}")
        
        return report
    
    def calculate_business_metrics(self,
                                  y_true: np.ndarray,
                                  y_pred: np.ndarray,
                                  revenue_threshold: float = 1000000) -> Dict[str, Any]:
        """
        Calculate business-specific metrics
        
        Args:
            y_true: True values (e.g., revenue)
            y_pred: Predicted values
            revenue_threshold: Threshold for high-revenue companies
            
        Returns:
            Dictionary of business metrics
        """
        # Calculate prediction accuracy by revenue tier
        high_revenue_mask = y_true >= revenue_threshold
        low_revenue_mask = ~high_revenue_mask
        
        if high_revenue_mask.sum() > 0:
            high_revenue_mae = mean_absolute_error(y_true[high_revenue_mask], y_pred[high_revenue_mask])
            high_revenue_mape = mean_absolute_percentage_error(y_true[high_revenue_mask], y_pred[high_revenue_mask])
        else:
            high_revenue_mae = 0
            high_revenue_mape = 0
        
        if low_revenue_mask.sum() > 0:
            low_revenue_mae = mean_absolute_error(y_true[low_revenue_mask], y_pred[low_revenue_mask])
            low_revenue_mape = mean_absolute_percentage_error(y_true[low_revenue_mask], y_pred[low_revenue_mask])
        else:
            low_revenue_mae = 0
            low_revenue_mape = 0
        
        # Business impact metrics
        total_actual_revenue = y_true.sum()
        total_predicted_revenue = y_pred.sum()
        revenue_prediction_error = abs(total_predicted_revenue - total_actual_revenue) / total_actual_revenue
        
        business_metrics = {
            'high_revenue_mae': high_revenue_mae,
            'high_revenue_mape': high_revenue_mape,
            'low_revenue_mae': low_revenue_mae,
            'low_revenue_mape': low_revenue_mape,
            'total_actual_revenue': total_actual_revenue,
            'total_predicted_revenue': total_predicted_revenue,
            'revenue_prediction_error': revenue_prediction_error,
            'high_revenue_companies': high_revenue_mask.sum(),
            'low_revenue_companies': low_revenue_mask.sum()
        }
        
        return business_metrics
