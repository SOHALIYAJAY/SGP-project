"""
Model training utilities for business analysis ML models
"""

import pandas as pd
import numpy as np
from typing import Dict, Any, List, Optional, Tuple
import joblib
import logging
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.model_selection import train_test_split, GridSearchCV, cross_val_score
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import xgboost as xgb
import lightgbm as lgb

logger = logging.getLogger(__name__)


class ModelTrainer:
    """
    Handles training of ML models for business analysis and prediction
    """
    
    def __init__(self):
        self.models = {}
        self.best_model = None
        self.best_model_name = None
        self.training_history = {}
        
    def get_available_models(self) -> Dict[str, Any]:
        """
        Get dictionary of available models with their default parameters
        
        Returns:
            Dictionary of model configurations
        """
        return {
            'linear_regression': {
                'model': LinearRegression(),
                'param_grid': {
                    'fit_intercept': [True, False],
                    'positive': [True, False]
                }
            },
            'ridge': {
                'model': Ridge(),
                'param_grid': {
                    'alpha': [0.1, 1.0, 10.0, 100.0],
                    'fit_intercept': [True, False]
                }
            },
            'lasso': {
                'model': Lasso(),
                'param_grid': {
                    'alpha': [0.001, 0.01, 0.1, 1.0, 10.0],
                    'fit_intercept': [True, False]
                }
            },
            'random_forest': {
                'model': RandomForestRegressor(random_state=42),
                'param_grid': {
                    'n_estimators': [50, 100, 200],
                    'max_depth': [10, 20, None],
                    'min_samples_split': [2, 5, 10],
                    'min_samples_leaf': [1, 2, 4]
                }
            },
            'gradient_boosting': {
                'model': GradientBoostingRegressor(random_state=42),
                'param_grid': {
                    'n_estimators': [50, 100, 200],
                    'learning_rate': [0.01, 0.1, 0.2],
                    'max_depth': [3, 5, 7],
                    'subsample': [0.8, 1.0]
                }
            },
            'xgboost': {
                'model': xgb.XGBRegressor(random_state=42),
                'param_grid': {
                    'n_estimators': [50, 100, 200],
                    'learning_rate': [0.01, 0.1, 0.2],
                    'max_depth': [3, 5, 7],
                    'subsample': [0.8, 1.0],
                    'colsample_bytree': [0.8, 1.0]
                }
            },
            'lightgbm': {
                'model': lgb.LGBMRegressor(random_state=42, verbose=-1),
                'param_grid': {
                    'n_estimators': [50, 100, 200],
                    'learning_rate': [0.01, 0.1, 0.2],
                    'max_depth': [3, 5, 7],
                    'subsample': [0.8, 1.0]
                }
            }
        }
    
    def train_single_model(self, 
                          model_name: str,
                          X_train: pd.DataFrame, 
                          y_train: pd.Series,
                          X_val: Optional[pd.DataFrame] = None,
                          y_val: Optional[pd.Series] = None,
                          hyperparameter_tuning: bool = False) -> Dict[str, Any]:
        """
        Train a single model
        
        Args:
            model_name: Name of the model to train
            X_train: Training features
            y_train: Training target
            X_val: Validation features (optional)
            y_val: Validation target (optional)
            hyperparameter_tuning: Whether to perform hyperparameter tuning
            
        Returns:
            Dictionary containing training results
        """
        logger.info(f"Training model: {model_name}")
        
        available_models = self.get_available_models()
        
        if model_name not in available_models:
            raise ValueError(f"Model {model_name} not available. Choose from: {list(available_models.keys())}")
        
        model_config = available_models[model_name]
        model = model_config['model']
        
        if hyperparameter_tuning and X_val is not None and y_val is not None:
            # Perform hyperparameter tuning
            param_grid = model_config['param_grid']
            grid_search = GridSearchCV(
                model, 
                param_grid, 
                cv=3, 
                scoring='neg_mean_squared_error',
                n_jobs=-1,
                verbose=0
            )
            grid_search.fit(X_train, y_train)
            model = grid_search.best_estimator_
            best_params = grid_search.best_params_
            logger.info(f"Best parameters for {model_name}: {best_params}")
        else:
            model.fit(X_train, y_train)
            best_params = model.get_params()
        
        # Make predictions
        train_predictions = model.predict(X_train)
        val_predictions = model.predict(X_val) if X_val is not None else None
        
        # Calculate metrics
        train_mse = mean_squared_error(y_train, train_predictions)
        train_mae = mean_absolute_error(y_train, train_predictions)
        train_r2 = r2_score(y_train, train_predictions)
        
        results = {
            'model': model,
            'model_name': model_name,
            'best_params': best_params,
            'train_metrics': {
                'mse': train_mse,
                'mae': train_mae,
                'r2': train_r2,
                'rmse': np.sqrt(train_mse)
            }
        }
        
        if X_val is not None and y_val is not None:
            val_mse = mean_squared_error(y_val, val_predictions)
            val_mae = mean_absolute_error(y_val, val_predictions)
            val_r2 = r2_score(y_val, val_predictions)
            
            results['val_metrics'] = {
                'mse': val_mse,
                'mae': val_mae,
                'r2': val_r2,
                'rmse': np.sqrt(val_mse)
            }
        
        self.models[model_name] = results
        logger.info(f"Successfully trained {model_name}")
        
        return results
    
    def train_multiple_models(self,
                             X_train: pd.DataFrame,
                             y_train: pd.Series,
                             X_val: Optional[pd.DataFrame] = None,
                             y_val: Optional[pd.Series] = None,
                             model_names: Optional[List[str]] = None,
                             hyperparameter_tuning: bool = False) -> Dict[str, Dict[str, Any]]:
        """
        Train multiple models and compare performance
        
        Args:
            X_train: Training features
            y_train: Training target
            X_val: Validation features (optional)
            y_val: Validation target (optional)
            model_names: List of model names to train (default: all available)
            hyperparameter_tuning: Whether to perform hyperparameter tuning
            
        Returns:
            Dictionary containing results for all trained models
        """
        if model_names is None:
            model_names = list(self.get_available_models().keys())
        
        logger.info(f"Training {len(model_names)} models...")
        
        all_results = {}
        
        for model_name in model_names:
            try:
                results = self.train_single_model(
                    model_name=model_name,
                    X_train=X_train,
                    y_train=y_train,
                    X_val=X_val,
                    y_val=y_val,
                    hyperparameter_tuning=hyperparameter_tuning
                )
                all_results[model_name] = results
            except Exception as e:
                logger.error(f"Failed to train {model_name}: {str(e)}")
                all_results[model_name] = {'error': str(e)}
        
        # Select best model based on validation R2 score (or training R2 if no validation)
        best_score = -float('inf')
        best_model_name = None
        
        for model_name, results in all_results.items():
            if 'error' in results:
                continue
                
            if 'val_metrics' in results:
                score = results['val_metrics']['r2']
            else:
                score = results['train_metrics']['r2']
            
            if score > best_score:
                best_score = score
                best_model_name = model_name
        
        if best_model_name:
            self.best_model = all_results[best_model_name]['model']
            self.best_model_name = best_model_name
            logger.info(f"Best model: {best_model_name} with R2 score: {best_score:.4f}")
        
        self.training_history = all_results
        return all_results
    
    def cross_validate_model(self,
                            model_name: str,
                            X: pd.DataFrame,
                            y: pd.Series,
                            cv_folds: int = 5) -> Dict[str, Any]:
        """
        Perform cross-validation on a model
        
        Args:
            model_name: Name of the model
            X: Features
            y: Target
            cv_folds: Number of cross-validation folds
            
        Returns:
            Dictionary containing cross-validation results
        """
        available_models = self.get_available_models()
        
        if model_name not in available_models:
            raise ValueError(f"Model {model_name} not available")
        
        model = available_models[model_name]['model']
        
        # Perform cross-validation
        cv_scores = cross_val_score(
            model, X, y, 
            cv=cv_folds, 
            scoring='neg_mean_squared_error',
            n_jobs=-1
        )
        
        cv_rmse_scores = np.sqrt(-cv_scores)
        
        results = {
            'model_name': model_name,
            'cv_folds': cv_folds,
            'cv_rmse_scores': cv_rmse_scores.tolist(),
            'mean_rmse': cv_rmse_scores.mean(),
            'std_rmse': cv_rmse_scores.std(),
            'cv_mse_scores': (-cv_scores).tolist(),
            'mean_mse': (-cv_scores).mean(),
            'std_mse': (-cv_scores).std()
        }
        
        logger.info(f"Cross-validation for {model_name}: RMSE = {results['mean_rmse']:.4f} ± {results['std_rmse']:.4f}")
        
        return results
    
    def save_model(self, model_name: str, filepath: str) -> None:
        """
        Save a trained model to file
        
        Args:
            model_name: Name of the model to save
            filepath: Path to save the model
        """
        if model_name not in self.models:
            raise ValueError(f"Model {model_name} not found in trained models")
        
        model = self.models[model_name]['model']
        joblib.dump(model, filepath)
        logger.info(f"Saved model {model_name} to {filepath}")
    
    def load_model(self, model_name: str, filepath: str) -> None:
        """
        Load a trained model from file
        
        Args:
            model_name: Name to assign to the loaded model
            filepath: Path to the saved model
        """
        model = joblib.load(filepath)
        
        self.models[model_name] = {
            'model': model,
            'model_name': model_name,
            'loaded_from': filepath
        }
        
        logger.info(f"Loaded model {model_name} from {filepath}")
    
    def get_feature_importance(self, model_name: str, feature_names: List[str]) -> Optional[pd.DataFrame]:
        """
        Get feature importance for a trained model
        
        Args:
            model_name: Name of the trained model
            feature_names: List of feature names
            
        Returns:
            DataFrame with feature importance or None if not available
        """
        if model_name not in self.models:
            raise ValueError(f"Model {model_name} not found in trained models")
        
        model = self.models[model_name]['model']
        
        if hasattr(model, 'feature_importances_'):
            importance_df = pd.DataFrame({
                'feature': feature_names,
                'importance': model.feature_importances_
            }).sort_values('importance', ascending=False)
            
            return importance_df
        else:
            logger.warning(f"Model {model_name} does not support feature importance")
            return None
