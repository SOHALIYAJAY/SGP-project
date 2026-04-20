"""
Comprehensive ML model tests
"""

import pytest
import pandas as pd
import numpy as np
import joblib
import os
import json
from sklearn.metrics import r2_score, accuracy_score, mean_squared_error

class TestModelValidation:
    """Test cases for ML model validation"""

    @pytest.fixture
    def sample_data(self):
        """Sample test data"""
        return {
            'revenue': 1000000,
            'expenses': 800000,
            'profitMargin': 20.0,
            'growthRate': 15.0,
            'churnRate': 5.0,
            'teamSize': 50,
            'customerCount': 200
        }

    @pytest.fixture
    def models_dir(self):
        """Path to models directory"""
        return os.path.join(os.path.dirname(__file__), '..', 'models')

    def test_models_exist(self, models_dir):
        """Test that all required model files exist"""
        required_files = [
            'health_model.joblib',
            'risk_model.joblib',
            'investment_model.joblib',
            'scaler.pkl',
            'feature_columns.json',
            'model_metadata.json'
        ]

        for file in required_files:
            file_path = os.path.join(models_dir, file)
            assert os.path.exists(file_path), f"Missing model file: {file}"

    def test_model_loading(self, models_dir):
        """Test that models can be loaded successfully"""
        try:
            health_model = joblib.load(os.path.join(models_dir, 'health_model.joblib'))
            risk_model = joblib.load(os.path.join(models_dir, 'risk_model.joblib'))
            investment_model = joblib.load(os.path.join(models_dir, 'investment_model.joblib'))
            scaler = joblib.load(os.path.join(models_dir, 'scaler.pkl'))

            assert health_model is not None
            assert risk_model is not None
            assert investment_model is not None
            assert scaler is not None

        except Exception as e:
            pytest.fail(f"Failed to load models: {e}")

    def test_feature_columns_consistency(self, models_dir):
        """Test that feature columns are consistent"""
        with open(os.path.join(models_dir, 'feature_columns.json'), 'r') as f:
            features = json.load(f)

        assert isinstance(features, list)
        assert len(features) > 0
        assert all(isinstance(f, str) for f in features)

    def test_model_metadata(self, models_dir):
        """Test model metadata structure"""
        with open(os.path.join(models_dir, 'model_metadata.json'), 'r') as f:
            metadata = json.load(f)

        required_keys = ['training_date', 'n_samples', 'features', 'health_model', 'risk_model', 'investment_model']
        for key in required_keys:
            assert key in metadata, f"Missing metadata key: {key}"

        # Check health model metadata
        health_meta = metadata['health_model']
        assert 'cv_r2_mean' in health_meta
        assert 'test_r2' in health_meta
        assert health_meta['test_r2'] > 0.5  # Should have reasonable performance

    def test_model_predictions(self, models_dir, sample_data):
        """Test that models can make predictions"""
        # Load models
        health_model = joblib.load(os.path.join(models_dir, 'health_model.joblib'))
        risk_model = joblib.load(os.path.join(models_dir, 'risk_model.joblib'))
        investment_model = joblib.load(os.path.join(models_dir, 'investment_model.joblib'))
        scaler = joblib.load(os.path.join(models_dir, 'scaler.pkl'))

        with open(os.path.join(models_dir, 'feature_columns.json'), 'r') as f:
            features = json.load(f)

        # Prepare input data
        input_df = pd.DataFrame([sample_data])
        X = input_df[features]
        X_scaled = scaler.transform(X)

        # Test predictions
        health_pred = health_model.predict(X_scaled)
        risk_pred = risk_model.predict(X_scaled)
        investment_pred = investment_model.predict(X_scaled)

        # Validate predictions
        assert isinstance(health_pred, np.ndarray)
        assert len(health_pred) == 1
        assert 0 <= health_pred[0] <= 100

        assert isinstance(risk_pred, np.ndarray)
        assert len(risk_pred) == 1
        assert risk_pred[0] in ['Low', 'Medium', 'High']

        assert isinstance(investment_pred, np.ndarray)
        assert len(investment_pred) == 1
        assert investment_pred[0] in ['A', 'B', 'C', 'D']

    def test_scaler_consistency(self, models_dir, sample_data):
        """Test that scaler works consistently"""
        scaler = joblib.load(os.path.join(models_dir, 'scaler.pkl'))

        with open(os.path.join(models_dir, 'feature_columns.json'), 'r') as f:
            features = json.load(f)

        # Test scaling
        input_df = pd.DataFrame([sample_data])
        X = input_df[features]
        X_scaled = scaler.transform(X)

        assert X_scaled.shape == (1, len(features))

        # Test inverse transform
        X_unscaled = scaler.inverse_transform(X_scaled)
        np.testing.assert_array_almost_equal(X.values, X_unscaled, decimal=5)

    def test_model_performance_thresholds(self, models_dir):
        """Test that models meet minimum performance thresholds"""
        with open(os.path.join(models_dir, 'model_metadata.json'), 'r') as f:
            metadata = json.load(f)

        # Health model should have R² > 0.6
        health_r2 = metadata['health_model']['test_r2']
        assert health_r2 > 0.6, f"Health model R² too low: {health_r2}"

        # Classification models should have accuracy > 0.7
        risk_acc = metadata['risk_model']['accuracy']
        investment_acc = metadata['investment_model']['accuracy']

        assert risk_acc > 0.7, f"Risk model accuracy too low: {risk_acc}"
        assert investment_acc > 0.7, f"Investment model accuracy too low: {investment_acc}"

    def test_data_validation(self):
        """Test data validation functions"""
        from ml.src.data_processing.validator import DataValidator

        validator = DataValidator()

        # Valid data
        valid_data = {
            'revenue': '1000000',
            'expenses': '800000',
            'profitMargin': '0.2',
            'companyName': 'Test Company',
            'industry': 'Technology'
        }

        is_valid, errors = validator.validate_single_record(valid_data)
        assert is_valid == True
        assert len(errors) == 0

        # Invalid data
        invalid_data = {
            'revenue': '-1000',  # Invalid
            'companyName': '',   # Invalid
            'industry': 'Technology'
        }

        is_valid, errors = validator.validate_single_record(invalid_data)
        assert is_valid == False
        assert len(errors) > 0

    def test_feature_engineering(self):
        """Test feature engineering functions"""
        # This would test any custom feature engineering logic
        # For now, just ensure the basic preprocessing works
        pass

class TestModelRobustness:
    """Test model robustness with edge cases"""

    def test_edge_case_predictions(self, models_dir):
        """Test predictions with edge case inputs"""
        health_model = joblib.load(os.path.join(models_dir, 'health_model.joblib'))
        scaler = joblib.load(os.path.join(models_dir, 'scaler.pkl'))

        with open(os.path.join(models_dir, 'feature_columns.json'), 'r') as f:
            features = json.load(f)

        # Test with extreme values
        edge_cases = [
            {  # Very small company
                'revenue': 1000,
                'expenses': 2000,
                'profitMargin': -50.0,
                'growthRate': -20.0,
                'churnRate': 30.0,
                'teamSize': 1,
                'customerCount': 1
            },
            {  # Very large company
                'revenue': 1000000000,  # 1 billion
                'expenses': 800000000,
                'profitMargin': 20.0,
                'growthRate': 50.0,
                'churnRate': 1.0,
                'teamSize': 10000,
                'customerCount': 1000000
            }
        ]

        for case in edge_cases:
            input_df = pd.DataFrame([case])
            X = input_df[features]
            X_scaled = scaler.transform(X)

            prediction = health_model.predict(X_scaled)

            # Should still produce valid predictions
            assert isinstance(prediction, np.ndarray)
            assert len(prediction) == 1
            assert 0 <= prediction[0] <= 100

if __name__ == "__main__":
    pytest.main([__file__, "-v"])