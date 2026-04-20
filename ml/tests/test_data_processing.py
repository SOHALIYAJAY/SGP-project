"""
Test cases for data processing modules
"""

import pytest
import pandas as pd
import numpy as np
from ml.src.data_processing.preprocessor import DataPreprocessor
from ml.src.data_processing.validator import DataValidator


class TestDataValidator:
    """Test cases for DataValidator class"""
    
    def setup_method(self):
        """Set up test fixtures"""
        self.validator = DataValidator()
        self.sample_data = {
            'revenue': '1000000',
            'expenses': '800000',
            'profitMargin': '0.2',
            'growthRate': '0.15',
            'companyName': 'Test Company',
            'industry': 'Technology'
        }
    
    def test_validate_valid_data(self):
        """Test validation of valid data"""
        is_valid, errors = self.validator.validate_single_record(self.sample_data)
        assert is_valid == True
        assert len(errors) == 0
    
    def test_validate_invalid_revenue(self):
        """Test validation of invalid revenue"""
        invalid_data = self.sample_data.copy()
        invalid_data['revenue'] = '-1000'
        
        is_valid, errors = self.validator.validate_single_record(invalid_data)
        assert is_valid == False
        assert any('revenue' in error for error in errors)
    
    def test_validate_dataframe(self):
        """Test validation of DataFrame"""
        df = pd.DataFrame([self.sample_data, self.sample_data])
        is_valid, errors = self.validator.validate_dataframe(df)
        assert is_valid == True
        assert len(errors) == 0
    
    def test_clean_data(self):
        """Test data cleaning"""
        df = pd.DataFrame([self.sample_data])
        cleaned_df = self.validator.clean_data(df)
        
        # Check that string fields are properly handled
        assert cleaned_df['revenue'].dtype in ['float64', 'int64']
        assert cleaned_df['companyName'].dtype == 'object'
    
    def test_generate_data_report(self):
        """Test data quality report generation"""
        df = pd.DataFrame([self.sample_data])
        report = self.validator.generate_data_report(df)
        
        assert 'total_records' in report
        assert 'total_columns' in report
        assert 'quality_score' in report
        assert report['total_records'] == 1


class TestDataPreprocessor:
    """Test cases for DataPreprocessor class"""
    
    def setup_method(self):
        """Set up test fixtures"""
        self.preprocessor = DataPreprocessor()
        
        # Create sample data
        np.random.seed(42)
        n_samples = 100
        
        self.sample_df = pd.DataFrame({
            'revenue': np.random.lognormal(15, 1, n_samples),
            'expenses': np.random.lognormal(14, 1, n_samples),
            'profitMargin': np.random.uniform(-0.2, 0.4, n_samples),
            'industry': np.random.choice(['Tech', 'Finance', 'Healthcare'], n_samples),
            'companyStage': np.random.choice(['Seed', 'Series A', 'Series B'], n_samples)
        })
    
    def test_fit_transform(self):
        """Test fitting and transforming data"""
        transformed_df = self.preprocessor.fit_transform(self.sample_df)
        
        # Check that transformed data has same shape
        assert transformed_df.shape == self.sample_df.shape
        
        # Check that numeric columns are scaled
        numeric_cols = ['revenue', 'expenses', 'profitMargin']
        for col in numeric_cols:
            assert transformed_df[col].mean() < 1.0  # Should be close to 0 after scaling
            assert abs(transformed_df[col].std() - 1.0) < 0.1  # Should be close to 1 after scaling
    
    def test_transform_only(self):
        """Test transforming with pre-fitted preprocessor"""
        # Fit on training data
        self.preprocessor.fit(self.sample_df)
        
        # Transform new data
        new_data = self.sample_df.iloc[:5].copy()
        transformed_new = self.preprocessor.transform(new_data)
        
        assert transformed_new.shape == new_data.shape
    
    def test_get_feature_names(self):
        """Test getting feature names"""
        self.preprocessor.fit(self.sample_df)
        feature_names = self.preprocessor.get_feature_names()
        
        assert len(feature_names) == len(self.sample_df.columns)
        assert all(col in feature_names for col in self.sample_df.columns)
    
    def test_save_load_preprocessing_params(self):
        """Test saving and loading preprocessing parameters"""
        import tempfile
        import os
        
        # Fit preprocessor
        self.preprocessor.fit(self.sample_df)
        
        # Save parameters
        with tempfile.NamedTemporaryFile(delete=False) as tmp:
            tmp_path = tmp.name
        
        try:
            self.preprocessor.save_preprocessing_params(tmp_path)
            
            # Create new preprocessor and load parameters
            new_preprocessor = DataPreprocessor()
            new_preprocessor.load_preprocessing_params(tmp_path)
            
            # Test that transformation gives same results
            original_transformed = self.preprocessor.transform(self.sample_df)
            new_transformed = new_preprocessor.transform(self.sample_df)
            
            pd.testing.assert_frame_equal(original_transformed, new_transformed)
        
        finally:
            os.unlink(tmp_path)


if __name__ == "__main__":
    pytest.main([__file__])
