"""
Configuration management for BAPS ML system
"""

import os
import json
import yaml
from typing import Dict, Any, Optional
from pathlib import Path
import logging

logger = logging.getLogger(__name__)


class Config:
    """
    Configuration manager for ML system
    """
    
    def __init__(self, config_path: Optional[str] = None):
        """
        Initialize configuration
        
        Args:
            config_path: Path to configuration file
        """
        self.config_data = {}
        self.config_path = config_path
        
        # Default configuration
        self.default_config = {
            'data': {
                'raw_data_path': 'data/raw',
                'processed_data_path': 'data/processed',
                'external_data_path': 'data/external',
                'test_size': 0.2,
                'validation_size': 0.1,
                'random_state': 42
            },
            'model': {
                'models_dir': 'models',
                'default_model_type': 'xgboost',
                'cross_validation_folds': 5,
                'hyperparameter_tuning': True,
                'feature_selection': True
            },
            'training': {
                'max_iter': 1000,
                'early_stopping': True,
                'n_jobs': -1,
                'verbose': 1
            },
            'evaluation': {
                'metrics': ['mse', 'mae', 'r2', 'mape'],
                'save_plots': True,
                'plots_dir': 'plots',
                'cross_validate': True
            },
            'inference': {
                'batch_size': 1000,
                'cache_models': True,
                'confidence_threshold': 0.7
            },
            'logging': {
                'level': 'INFO',
                'format': '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                'file': 'logs/ml_system.log'
            }
        }
        
        if config_path:
            self.load_config(config_path)
        else:
            self.config_data = self.default_config.copy()
    
    def load_config(self, config_path: str) -> None:
        """
        Load configuration from file
        
        Args:
            config_path: Path to configuration file
        """
        config_file = Path(config_path)
        
        if not config_file.exists():
            logger.warning(f"Config file {config_path} not found, using defaults")
            self.config_data = self.default_config.copy()
            return
        
        try:
            with open(config_file, 'r') as f:
                if config_file.suffix.lower() == '.json':
                    file_config = json.load(f)
                elif config_file.suffix.lower() in ['.yml', '.yaml']:
                    file_config = yaml.safe_load(f)
                else:
                    raise ValueError(f"Unsupported config file format: {config_file.suffix}")
            
            # Merge with defaults
            self.config_data = self._merge_configs(self.default_config, file_config)
            logger.info(f"Loaded configuration from {config_path}")
            
        except Exception as e:
            logger.error(f"Failed to load config from {config_path}: {str(e)}")
            self.config_data = self.default_config.copy()
    
    def save_config(self, config_path: str) -> None:
        """
        Save current configuration to file
        
        Args:
            config_path: Path to save configuration
        """
        config_file = Path(config_path)
        config_file.parent.mkdir(parents=True, exist_ok=True)
        
        try:
            with open(config_file, 'w') as f:
                if config_file.suffix.lower() == '.json':
                    json.dump(self.config_data, f, indent=2)
                elif config_file.suffix.lower() in ['.yml', '.yaml']:
                    yaml.dump(self.config_data, f, default_flow_style=False)
                else:
                    raise ValueError(f"Unsupported config file format: {config_file.suffix}")
            
            logger.info(f"Saved configuration to {config_path}")
            
        except Exception as e:
            logger.error(f"Failed to save config to {config_path}: {str(e)}")
    
    def get(self, key: str, default: Any = None) -> Any:
        """
        Get configuration value using dot notation
        
        Args:
            key: Configuration key (e.g., 'data.raw_data_path')
            default: Default value if key not found
            
        Returns:
            Configuration value
        """
        keys = key.split('.')
        value = self.config_data
        
        try:
            for k in keys:
                value = value[k]
            return value
        except (KeyError, TypeError):
            return default
    
    def set(self, key: str, value: Any) -> None:
        """
        Set configuration value using dot notation
        
        Args:
            key: Configuration key (e.g., 'data.raw_data_path')
            value: Value to set
        """
        keys = key.split('.')
        config = self.config_data
        
        # Navigate to the parent of the target key
        for k in keys[:-1]:
            if k not in config:
                config[k] = {}
            config = config[k]
        
        # Set the final value
        config[keys[-1]] = value
    
    def _merge_configs(self, default: Dict[str, Any], override: Dict[str, Any]) -> Dict[str, Any]:
        """
        Recursively merge configuration dictionaries
        
        Args:
            default: Default configuration
            override: Override configuration
            
        Returns:
            Merged configuration
        """
        merged = default.copy()
        
        for key, value in override.items():
            if key in merged and isinstance(merged[key], dict) and isinstance(value, dict):
                merged[key] = self._merge_configs(merged[key], value)
            else:
                merged[key] = value
        
        return merged
    
    def get_data_paths(self) -> Dict[str, str]:
        """
        Get all data-related paths
        
        Returns:
            Dictionary of data paths
        """
        return {
            'raw_data': self.get('data.raw_data_path'),
            'processed_data': self.get('data.processed_data_path'),
            'external_data': self.get('data.external_data_path')
        }
    
    def get_model_config(self) -> Dict[str, Any]:
        """
        Get model-related configuration
        
        Returns:
            Model configuration dictionary
        """
        return self.get('model', {})
    
    def get_training_config(self) -> Dict[str, Any]:
        """
        Get training-related configuration
        
        Returns:
            Training configuration dictionary
        """
        return self.get('training', {})
    
    def get_evaluation_config(self) -> Dict[str, Any]:
        """
        Get evaluation-related configuration
        
        Returns:
            Evaluation configuration dictionary
        """
        return self.get('evaluation', {})
    
    def get_inference_config(self) -> Dict[str, Any]:
        """
        Get inference-related configuration
        
        Returns:
            Inference configuration dictionary
        """
        return self.get('inference', {})
    
    def get_logging_config(self) -> Dict[str, Any]:
        """
        Get logging-related configuration
        
        Returns:
            Logging configuration dictionary
        """
        return self.get('logging', {})
    
    def validate_config(self) -> bool:
        """
        Validate configuration values
        
        Returns:
            True if configuration is valid
        """
        try:
            # Check required paths
            required_paths = [
                'data.raw_data_path',
                'data.processed_data_path',
                'model.models_dir'
            ]
            
            for path_key in required_paths:
                path_value = self.get(path_key)
                if not path_value:
                    logger.error(f"Required configuration missing: {path_key}")
                    return False
            
            # Check numeric values
            test_size = self.get('data.test_size')
            if not isinstance(test_size, (int, float)) or not 0 < test_size < 1:
                logger.error("data.test_size must be a number between 0 and 1")
                return False
            
            validation_size = self.get('data.validation_size')
            if not isinstance(validation_size, (int, float)) or not 0 <= validation_size < 1:
                logger.error("data.validation_size must be a number between 0 and 1")
                return False
            
            if test_size + validation_size >= 1:
                logger.error("Sum of test_size and validation_size must be less than 1")
                return False
            
            logger.info("Configuration validation passed")
            return True
            
        except Exception as e:
            logger.error(f"Configuration validation failed: {str(e)}")
            return False
    
    def create_directories(self) -> None:
        """
        Create necessary directories based on configuration
        """
        directories = [
            self.get('data.raw_data_path'),
            self.get('data.processed_data_path'),
            self.get('data.external_data_path'),
            self.get('model.models_dir'),
            self.get('evaluation.plots_dir'),
            os.path.dirname(self.get('logging.file'))
        ]
        
        for directory in directories:
            if directory:
                Path(directory).mkdir(parents=True, exist_ok=True)
        
        logger.info("Created necessary directories")
    
    def to_dict(self) -> Dict[str, Any]:
        """
        Get configuration as dictionary
        
        Returns:
            Configuration dictionary
        """
        return self.config_data.copy()
    
    def __str__(self) -> str:
        """
        String representation of configuration
        
        Returns:
            Configuration as JSON string
        """
        return json.dumps(self.config_data, indent=2)
