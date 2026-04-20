"""
Data validation utilities for business analysis ML models
"""

import pandas as pd
import numpy as np
from typing import Dict, Any, List, Optional, Tuple
import logging

logger = logging.getLogger(__name__)


class DataValidator:
    """
    Validates company data for ML model training and inference
    """
    
    def __init__(self):
        self.validation_rules = self._get_default_validation_rules()
        
    def _get_default_validation_rules(self) -> Dict[str, Dict[str, Any]]:
        """
        Get default validation rules for company data fields
        
        Returns:
            Dictionary of validation rules
        """
        return {
            # Financial data validation
            'revenue': {'min': 0, 'max': 1e12, 'type': 'float'},
            'expenses': {'min': 0, 'max': 1e12, 'type': 'float'},
            'profitMargin': {'min': -1, 'max': 1, 'type': 'float'},
            'burnRate': {'min': 0, 'max': 1e9, 'type': 'float'},
            'cashBalance': {'min': 0, 'max': 1e12, 'type': 'float'},
            'totalFunding': {'min': 0, 'max': 1e12, 'type': 'float'},
            'operationalCost': {'min': 0, 'max': 1e12, 'type': 'float'},
            
            # Market & growth validation
            'marketSize': {'min': 0, 'max': 1e15, 'type': 'float'},
            'competitorCount': {'min': 0, 'max': 1e6, 'type': 'int'},
            'growthRate': {'min': -1, 'max': 10, 'type': 'float'},
            'marketShare': {'min': 0, 'max': 100, 'type': 'float'},
            'industryGrowthRate': {'min': -1, 'max': 10, 'type': 'float'},
            'arpu': {'min': 0, 'max': 1e9, 'type': 'float'},
            
            # Team & operations validation
            'teamSize': {'min': 1, 'max': 1e6, 'type': 'int'},
            'customerCount': {'min': 0, 'max': 1e12, 'type': 'int'},
            'churnRate': {'min': 0, 'max': 1, 'type': 'float'},
            'nps': {'min': -100, 'max': 100, 'type': 'int'},
            'customerSatisfaction': {'min': 0, 'max': 100, 'type': 'float'},
            
            # String fields validation
            'companyName': {'max_length': 200, 'type': 'str'},
            'industry': {'max_length': 100, 'type': 'str'},
            'location': {'max_length': 200, 'type': 'str'},
            'primaryMarketRegion': {'max_length': 100, 'type': 'str'},
            'businessModel': {'max_length': 100, 'type': 'str'},
            'companyStage': {'max_length': 50, 'type': 'str'},
            'foundedYear': {'min': 1800, 'max': 2030, 'type': 'int'},
            'revenueType': {'max_length': 50, 'type': 'str'},
            'customerTypeMix': {'max_length': 200, 'type': 'str'},
            'founderExperience': {'max_length': 200, 'type': 'str'},
            'regulatoryExposure': {'max_length': 200, 'type': 'str'},
        }
    
    def validate_single_record(self, data: Dict[str, Any]) -> Tuple[bool, List[str]]:
        """
        Validate a single company record
        
        Args:
            data: Dictionary containing company data
            
        Returns:
            Tuple of (is_valid, list_of_errors)
        """
        errors = []
        
        for field, value in data.items():
            if field not in self.validation_rules:
                continue
                
            rules = self.validation_rules[field]
            
            # Type validation
            if 'type' in rules:
                expected_type = rules['type']
                try:
                    if expected_type == 'float':
                        float_value = float(value) if value != '' else 0.0
                    elif expected_type == 'int':
                        int_value = int(float(value)) if value != '' else 0
                    elif expected_type == 'str':
                        str_value = str(value) if value != '' else ''
                except (ValueError, TypeError):
                    errors.append(f"Field '{field}' has invalid type: {value}")
                    continue
            
            # Range validation for numeric fields
            if 'min' in rules or 'max' in rules:
                try:
                    numeric_value = float(value) if value != '' else 0.0
                    if 'min' in rules and numeric_value < rules['min']:
                        errors.append(f"Field '{field}' value {numeric_value} is below minimum {rules['min']}")
                    if 'max' in rules and numeric_value > rules['max']:
                        errors.append(f"Field '{field}' value {numeric_value} is above maximum {rules['max']}")
                except (ValueError, TypeError):
                    pass
            
            # Length validation for string fields
            if 'max_length' in rules:
                try:
                    str_value = str(value) if value != '' else ''
                    if len(str_value) > rules['max_length']:
                        errors.append(f"Field '{field}' length {len(str_value)} exceeds maximum {rules['max_length']}")
                except (ValueError, TypeError):
                    pass
        
        is_valid = len(errors) == 0
        return is_valid, errors
    
    def validate_dataframe(self, df: pd.DataFrame) -> Tuple[bool, Dict[str, List[str]]]:
        """
        Validate a DataFrame of company records
        
        Args:
            df: DataFrame containing company data
            
        Returns:
            Tuple of (is_valid, dictionary_of_errors_by_row)
        """
        all_errors = {}
        
        for idx, row in df.iterrows():
            row_dict = row.to_dict()
            is_valid, errors = self.validate_single_record(row_dict)
            
            if not is_valid:
                all_errors[f"row_{idx}"] = errors
        
        is_valid = len(all_errors) == 0
        return is_valid, all_errors
    
    def clean_data(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Clean and standardize data according to validation rules
        
        Args:
            df: Input DataFrame
            
        Returns:
            Cleaned DataFrame
        """
        df_cleaned = df.copy()
        
        for column in df_cleaned.columns:
            if column not in self.validation_rules:
                continue
                
            rules = self.validation_rules[column]
            
            # Convert empty strings to appropriate default values
            df_cleaned[column] = df_cleaned[column].replace('', np.nan)
            
            # Apply type conversion
            if 'type' in rules:
                if rules['type'] == 'float':
                    df_cleaned[column] = pd.to_numeric(df_cleaned[column], errors='coerce').fillna(0.0)
                elif rules['type'] == 'int':
                    df_cleaned[column] = pd.to_numeric(df_cleaned[column], errors='coerce').fillna(0).astype(int)
                elif rules['type'] == 'str':
                    df_cleaned[column] = df_cleaned[column].fillna('').astype(str)
            
            # Apply range constraints
            if 'min' in rules:
                df_cleaned[column] = df_cleaned[column].clip(lower=rules['min'])
            if 'max' in rules:
                df_cleaned[column] = df_cleaned[column].clip(upper=rules['max'])
            
            # Apply string length constraints
            if 'max_length' in rules and df_cleaned[column].dtype == 'object':
                df_cleaned[column] = df_cleaned[column].str.slice(0, rules['max_length'])
        
        logger.info(f"Cleaned data: {len(df)} rows -> {len(df_cleaned)} rows")
        return df_cleaned
    
    def generate_data_report(self, df: pd.DataFrame) -> Dict[str, Any]:
        """
        Generate a comprehensive data quality report
        
        Args:
            df: Input DataFrame
            
        Returns:
            Dictionary containing data quality metrics
        """
        report = {
            'total_records': len(df),
            'total_columns': len(df.columns),
            'missing_values': {},
            'data_types': df.dtypes.to_dict(),
            'validation_errors': {},
            'quality_score': 0.0
        }
        
        # Missing values analysis
        for column in df.columns:
            missing_count = df[column].isnull().sum()
            if missing_count > 0:
                report['missing_values'][column] = {
                    'count': missing_count,
                    'percentage': (missing_count / len(df)) * 100
                }
        
        # Validation errors
        is_valid, validation_errors = self.validate_dataframe(df)
        report['validation_errors'] = validation_errors
        
        # Calculate quality score
        total_cells = len(df) * len(df.columns)
        missing_cells = sum(df.isnull().sum())
        error_rows = len(validation_errors)
        
        completeness_score = (total_cells - missing_cells) / total_cells
        validity_score = (len(df) - error_rows) / len(df)
        
        report['quality_score'] = (completeness_score * 0.6 + validity_score * 0.4) * 100
        
        return report
