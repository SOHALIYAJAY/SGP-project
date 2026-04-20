"""
Data loading utilities for BAPS ML system
"""

import pandas as pd
import numpy as np
from typing import Dict, Any, List, Optional, Tuple
import logging
from pathlib import Path
import json

logger = logging.getLogger(__name__)


class DataLoader:
    """
    Handles loading and saving of data for ML system
    """
    
    def __init__(self, data_dir: str = "data"):
        """
        Initialize data loader
        
        Args:
            data_dir: Base directory for data files
        """
        self.data_dir = Path(data_dir)
        self.raw_data_dir = self.data_dir / "raw"
        self.processed_data_dir = self.data_dir / "processed"
        self.external_data_dir = self.data_dir / "external"
        
        # Create directories if they don't exist
        self.raw_data_dir.mkdir(parents=True, exist_ok=True)
        self.processed_data_dir.mkdir(parents=True, exist_ok=True)
        self.external_data_dir.mkdir(parents=True, exist_ok=True)
    
    def load_csv(self, filename: str, data_type: str = "raw", **kwargs) -> pd.DataFrame:
        """
        Load CSV data
        
        Args:
            filename: Name of the CSV file
            data_type: Type of data ('raw', 'processed', 'external')
            **kwargs: Additional arguments for pd.read_csv
            
        Returns:
            Loaded DataFrame
        """
        if data_type == "raw":
            file_path = self.raw_data_dir / filename
        elif data_type == "processed":
            file_path = self.processed_data_dir / filename
        elif data_type == "external":
            file_path = self.external_data_dir / filename
        else:
            raise ValueError(f"Invalid data type: {data_type}")
        
        if not file_path.exists():
            raise FileNotFoundError(f"Data file not found: {file_path}")
        
        try:
            df = pd.read_csv(file_path, **kwargs)
            logger.info(f"Loaded CSV data from {file_path}: {len(df)} rows, {len(df.columns)} columns")
            return df
        except Exception as e:
            logger.error(f"Failed to load CSV from {file_path}: {str(e)}")
            raise
    
    def save_csv(self, df: pd.DataFrame, filename: str, data_type: str = "processed", **kwargs) -> None:
        """
        Save DataFrame to CSV
        
        Args:
            df: DataFrame to save
            filename: Name of the CSV file
            data_type: Type of data ('raw', 'processed', 'external')
            **kwargs: Additional arguments for df.to_csv
        """
        if data_type == "raw":
            file_path = self.raw_data_dir / filename
        elif data_type == "processed":
            file_path = self.processed_data_dir / filename
        elif data_type == "external":
            file_path = self.external_data_dir / filename
        else:
            raise ValueError(f"Invalid data type: {data_type}")
        
        try:
            df.to_csv(file_path, index=False, **kwargs)
            logger.info(f"Saved CSV data to {file_path}: {len(df)} rows, {len(df.columns)} columns")
        except Exception as e:
            logger.error(f"Failed to save CSV to {file_path}: {str(e)}")
            raise
    
    def load_json(self, filename: str, data_type: str = "raw") -> Dict[str, Any]:
        """
        Load JSON data
        
        Args:
            filename: Name of the JSON file
            data_type: Type of data ('raw', 'processed', 'external')
            
        Returns:
            Loaded JSON data
        """
        if data_type == "raw":
            file_path = self.raw_data_dir / filename
        elif data_type == "processed":
            file_path = self.processed_data_dir / filename
        elif data_type == "external":
            file_path = self.external_data_dir / filename
        else:
            raise ValueError(f"Invalid data type: {data_type}")
        
        if not file_path.exists():
            raise FileNotFoundError(f"Data file not found: {file_path}")
        
        try:
            with open(file_path, 'r') as f:
                data = json.load(f)
            logger.info(f"Loaded JSON data from {file_path}")
            return data
        except Exception as e:
            logger.error(f"Failed to load JSON from {file_path}: {str(e)}")
            raise
    
    def save_json(self, data: Dict[str, Any], filename: str, data_type: str = "processed") -> None:
        """
        Save data to JSON
        
        Args:
            data: Data to save
            filename: Name of the JSON file
            data_type: Type of data ('raw', 'processed', 'external')
        """
        if data_type == "raw":
            file_path = self.raw_data_dir / filename
        elif data_type == "processed":
            file_path = self.processed_data_dir / filename
        elif data_type == "external":
            file_path = self.external_data_dir / filename
        else:
            raise ValueError(f"Invalid data type: {data_type}")
        
        try:
            with open(file_path, 'w') as f:
                json.dump(data, f, indent=2)
            logger.info(f"Saved JSON data to {file_path}")
        except Exception as e:
            logger.error(f"Failed to save JSON to {file_path}: {str(e)}")
            raise
    
    def load_company_data(self, filename: str = "companies.csv") -> pd.DataFrame:
        """
        Load company data with standard column mapping
        
        Args:
            filename: Name of the company data file
            
        Returns:
            DataFrame with company data
        """
        df = self.load_csv(filename, data_type="raw")
        
        # Standardize column names if needed
        column_mapping = {
            'company_name': 'companyName',
            'industry': 'industry',
            'founded_year': 'foundedYear',
            'location': 'location',
            'primary_market_region': 'primaryMarketRegion',
            'business_model': 'businessModel',
            'company_stage': 'companyStage',
            'revenue': 'revenue',
            'expenses': 'expenses',
            'profit_margin': 'profitMargin',
            'burn_rate': 'burnRate',
            'cash_balance': 'cashBalance',
            'revenue_history': 'revenueHistory',
            'revenue_type': 'revenueType',
            'total_funding': 'totalFunding',
            'operational_cost': 'operationalCost',
            'market_size': 'marketSize',
            'competitor_count': 'competitorCount',
            'growth_rate': 'growthRate',
            'market_share': 'marketShare',
            'industry_growth_rate': 'industryGrowthRate',
            'customer_type_mix': 'customerTypeMix',
            'arpu': 'arpu',
            'team_size': 'teamSize',
            'customer_count': 'customerCount',
            'churn_rate': 'churnRate',
            'nps': 'nps',
            'customer_satisfaction': 'customerSatisfaction',
            'founder_experience': 'founderExperience',
            'regulatory_exposure': 'regulatoryExposure'
        }
        
        # Apply column mapping if columns exist
        for old_name, new_name in column_mapping.items():
            if old_name in df.columns and new_name not in df.columns:
                df = df.rename(columns={old_name: new_name})
        
        logger.info(f"Loaded company data with {len(df)} companies")
        return df
    
    def save_company_data(self, df: pd.DataFrame, filename: str = "companies_processed.csv") -> None:
        """
        Save processed company data
        
        Args:
            df: DataFrame with company data
            filename: Name of the output file
        """
        self.save_csv(df, filename, data_type="processed")
    
    def load_training_data(self) -> Tuple[pd.DataFrame, pd.Series]:
        """
        Load training data with features and target
        
        Returns:
            Tuple of (features_df, target_series)
        """
        try:
            # Load features
            features_df = self.load_csv("features.csv", data_type="processed")
            
            # Load target
            target_df = self.load_csv("target.csv", data_type="processed")
            target_series = target_df.iloc[:, 0]  # Assume first column is target
            
            logger.info(f"Loaded training data: {len(features_df)} samples, {len(features_df.columns)} features")
            
            return features_df, target_series
            
        except FileNotFoundError as e:
            logger.error(f"Training data not found: {str(e)}")
            raise
    
    def save_training_data(self, features_df: pd.DataFrame, target_series: pd.Series) -> None:
        """
        Save training data
        
        Args:
            features_df: Feature DataFrame
            target_series: Target series
        """
        self.save_csv(features_df, "features.csv", data_type="processed")
        
        # Save target as DataFrame with proper column name
        target_df = pd.DataFrame({'target': target_series})
        self.save_csv(target_df, "target.csv", data_type="processed")
        
        logger.info(f"Saved training data: {len(features_df)} samples, {len(features_df.columns)} features")
    
    def split_data(self, df: pd.DataFrame, test_size: float = 0.2, validation_size: float = 0.1, 
                   random_state: int = 42) -> Tuple[pd.DataFrame, pd.DataFrame, pd.DataFrame]:
        """
        Split data into train, validation, and test sets
        
        Args:
            df: Input DataFrame
            test_size: Proportion of data for testing
            validation_size: Proportion of training data for validation
            random_state: Random seed for reproducibility
            
        Returns:
            Tuple of (train_df, val_df, test_df)
        """
        from sklearn.model_selection import train_test_split
        
        # First split: separate test set
        train_val_df, test_df = train_test_split(
            df, test_size=test_size, random_state=random_state
        )
        
        # Second split: separate validation set from training set
        val_size_adjusted = validation_size / (1 - test_size)
        train_df, val_df = train_test_split(
            train_val_df, test_size=val_size_adjusted, random_state=random_state
        )
        
        logger.info(f"Data split - Train: {len(train_df)}, Val: {len(val_df)}, Test: {len(test_df)}")
        
        return train_df, val_df, test_df
    
    def get_data_info(self, filename: str, data_type: str = "raw") -> Dict[str, Any]:
        """
        Get information about a data file
        
        Args:
            filename: Name of the data file
            data_type: Type of data ('raw', 'processed', 'external')
            
        Returns:
            Dictionary with data information
        """
        if data_type == "raw":
            file_path = self.raw_data_dir / filename
        elif data_type == "processed":
            file_path = self.processed_data_dir / filename
        elif data_type == "external":
            file_path = self.external_data_dir / filename
        else:
            raise ValueError(f"Invalid data type: {data_type}")
        
        if not file_path.exists():
            raise FileNotFoundError(f"Data file not found: {file_path}")
        
        try:
            if file_path.suffix.lower() == '.csv':
                df = pd.read_csv(file_path, nrows=5)  # Read only first 5 rows for info
                info = {
                    'filename': filename,
                    'file_path': str(file_path),
                    'file_size': file_path.stat().st_size,
                    'columns': list(df.columns),
                    'num_columns': len(df.columns),
                    'sample_data': df.head().to_dict('records')
                }
            elif file_path.suffix.lower() == '.json':
                with open(file_path, 'r') as f:
                    data = json.load(f)
                info = {
                    'filename': filename,
                    'file_path': str(file_path),
                    'file_size': file_path.stat().st_size,
                    'data_type': type(data).__name__,
                    'keys': list(data.keys()) if isinstance(data, dict) else None
                }
            else:
                info = {
                    'filename': filename,
                    'file_path': str(file_path),
                    'file_size': file_path.stat().st_size,
                    'file_type': file_path.suffix
                }
            
            return info
            
        except Exception as e:
            logger.error(f"Failed to get info for {file_path}: {str(e)}")
            raise
    
    def list_files(self, data_type: str = "raw") -> List[str]:
        """
        List all files in a data directory
        
        Args:
            data_type: Type of data ('raw', 'processed', 'external')
            
        Returns:
            List of file names
        """
        if data_type == "raw":
            directory = self.raw_data_dir
        elif data_type == "processed":
            directory = self.processed_data_dir
        elif data_type == "external":
            directory = self.external_data_dir
        else:
            raise ValueError(f"Invalid data type: {data_type}")
        
        files = []
        for file_path in directory.iterdir():
            if file_path.is_file():
                files.append(file_path.name)
        
        return sorted(files)
