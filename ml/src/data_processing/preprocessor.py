"""
Data preprocessing utilities for business analysis ML models
"""

import pandas as pd
import numpy as np
from typing import Dict, Any, Optional, List
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.impute import SimpleImputer
import logging

logger = logging.getLogger(__name__)


class DataPreprocessor:
    """
    Handles preprocessing of company data for ML model training and inference
    """
    
    def __init__(self):
        self.scalers = {}
        self.encoders = {}
        self.imputers = {}
        self.feature_columns = []
        self.numeric_features = []
        self.categorical_features = []
        
    def fit(self, df: pd.DataFrame) -> 'DataPreprocessor':
        """
        Fit preprocessing parameters on training data
        
        Args:
            df: Training data DataFrame
            
        Returns:
            Self for method chaining
        """
        logger.info("Fitting data preprocessor...")
        
        # Identify numeric and categorical columns
        self.numeric_features = df.select_dtypes(include=[np.number]).columns.tolist()
        self.categorical_features = df.select_dtypes(include=['object']).columns.tolist()
        self.feature_columns = self.numeric_features + self.categorical_features
        
        # Fit numeric imputer and scaler
        if self.numeric_features:
            self.imputers['numeric'] = SimpleImputer(strategy='median')
            self.imputers['numeric'].fit(df[self.numeric_features])
            
            self.scalers['numeric'] = StandardScaler()
            self.scalers['numeric'].fit(self.imputers['numeric'].transform(df[self.numeric_features]))
        
        # Fit categorical encoders
        for col in self.categorical_features:
            self.encoders[col] = LabelEncoder()
            # Handle missing values before encoding
            col_data = df[col].fillna('unknown')
            self.encoders[col].fit(col_data)
        
        logger.info(f"Fitted preprocessor with {len(self.numeric_features)} numeric and {len(self.categorical_features)} categorical features")
        return self
    
    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Transform data using fitted preprocessing parameters
        
        Args:
            df: Data to transform
            
        Returns:
            Transformed DataFrame
        """
        logger.info("Transforming data...")
        
        df_transformed = df.copy()
        
        # Process numeric features
        if self.numeric_features:
            # Impute missing values
            df_transformed[self.numeric_features] = self.imputers['numeric'].transform(df[self.numeric_features])
            # Scale features
            df_transformed[self.numeric_features] = self.scalers['numeric'].transform(df_transformed[self.numeric_features])
        
        # Process categorical features
        for col in self.categorical_features:
            if col in df_transformed.columns:
                # Handle missing values
                df_transformed[col] = df_transformed[col].fillna('unknown')
                # Encode categorical variables
                df_transformed[col] = self.encoders[col].transform(df_transformed[col])
        
        return df_transformed
    
    def fit_transform(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Fit preprocessor and transform data in one step
        
        Args:
            df: Training data
            
        Returns:
            Transformed DataFrame
        """
        return self.fit(df).transform(df)
    
    def inverse_transform(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Inverse transform data back to original scale
        
        Args:
            df: Transformed data
            
        Returns:
            Original scale DataFrame
        """
        df_original = df.copy()
        
        # Inverse transform numeric features
        if self.numeric_features and 'numeric' in self.scalers:
            df_original[self.numeric_features] = self.scalers['numeric'].inverse_transform(df[self.numeric_features])
            if 'numeric' in self.imputers:
                df_original[self.numeric_features] = self.imputers['numeric'].inverse_transform(df_original[self.numeric_features])
        
        # Inverse transform categorical features
        for col in self.categorical_features:
            if col in df_original.columns and col in self.encoders:
                df_original[col] = self.encoders[col].inverse_transform(df[col].astype(int))
        
        return df_original
    
    def get_feature_names(self) -> List[str]:
        """
        Get list of feature names after preprocessing
        
        Returns:
            List of feature names
        """
        return self.feature_columns.copy()
    
    def save_preprocessing_params(self, filepath: str) -> None:
        """
        Save preprocessing parameters to file
        
        Args:
            filepath: Path to save parameters
        """
        import pickle
        
        params = {
            'scalers': self.scalers,
            'encoders': self.encoders,
            'imputers': self.imputers,
            'feature_columns': self.feature_columns,
            'numeric_features': self.numeric_features,
            'categorical_features': self.categorical_features
        }
        
        with open(filepath, 'wb') as f:
            pickle.dump(params, f)
        
        logger.info(f"Saved preprocessing parameters to {filepath}")
    
    def load_preprocessing_params(self, filepath: str) -> 'DataPreprocessor':
        """
        Load preprocessing parameters from file
        
        Args:
            filepath: Path to load parameters from
            
        Returns:
            Self for method chaining
        """
        import pickle
        
        with open(filepath, 'rb') as f:
            params = pickle.load(f)
        
        self.scalers = params['scalers']
        self.encoders = params['encoders']
        self.imputers = params['imputers']
        self.feature_columns = params['feature_columns']
        self.numeric_features = params['numeric_features']
        self.categorical_features = params['categorical_features']
        
        logger.info(f"Loaded preprocessing parameters from {filepath}")
        return self
