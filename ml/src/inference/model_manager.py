"""
Model management utilities for BAPS ML system
"""

import os
import json
import joblib
import pandas as pd
from typing import Dict, Any, List, Optional, Tuple
import logging
from datetime import datetime
from pathlib import Path

logger = logging.getLogger(__name__)


class ModelManager:
    """
    Manages ML model lifecycle, versioning, and deployment
    """
    
    def __init__(self, models_dir: str = "models"):
        """
        Initialize the model manager
        
        Args:
            models_dir: Directory to store models
        """
        self.models_dir = Path(models_dir)
        self.models_dir.mkdir(exist_ok=True)
        self.model_registry = {}
        self.load_registry()
    
    def load_registry(self) -> None:
        """
        Load the model registry from file
        """
        registry_path = self.models_dir / "registry.json"
        
        if registry_path.exists():
            try:
                with open(registry_path, 'r') as f:
                    self.model_registry = json.load(f)
                logger.info("Loaded model registry")
            except Exception as e:
                logger.error(f"Failed to load registry: {str(e)}")
                self.model_registry = {}
        else:
            self.model_registry = {}
    
    def save_registry(self) -> None:
        """
        Save the model registry to file
        """
        registry_path = self.models_dir / "registry.json"
        
        try:
            with open(registry_path, 'w') as f:
                json.dump(self.model_registry, f, indent=2)
            logger.info("Saved model registry")
        except Exception as e:
            logger.error(f"Failed to save registry: {str(e)}")
    
    def register_model(self,
                      model_name: str,
                      model_object: Any,
                      model_type: str,
                      metrics: Dict[str, float],
                      feature_names: List[str],
                      preprocessor_path: Optional[str] = None,
                      description: str = "") -> str:
        """
        Register a new model
        
        Args:
            model_name: Name of the model
            model_object: Trained model object
            model_type: Type of model (e.g., 'regression', 'classification')
            metrics: Model performance metrics
            feature_names: List of feature names
            preprocessor_path: Path to preprocessor (optional)
            description: Model description
            
        Returns:
            Model version ID
        """
        # Generate version ID
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        version_id = f"{model_name}_{timestamp}"
        
        # Save model
        model_path = self.models_dir / f"{version_id}.joblib"
        joblib.dump(model_object, model_path)
        
        # Create model metadata
        metadata = {
            'version_id': version_id,
            'model_name': model_name,
            'model_type': model_type,
            'metrics': metrics,
            'feature_names': feature_names,
            'preprocessor_path': preprocessor_path,
            'description': description,
            'created_at': datetime.now().isoformat(),
            'model_path': str(model_path),
            'status': 'active'
        }
        
        # Update registry
        if model_name not in self.model_registry:
            self.model_registry[model_name] = []
        
        self.model_registry[model_name].append(metadata)
        
        # Mark previous versions as inactive
        for prev_model in self.model_registry[model_name][:-1]:
            prev_model['status'] = 'inactive'
        
        self.save_registry()
        
        logger.info(f"Registered model {model_name} with version {version_id}")
        
        return version_id
    
    def load_model(self, model_name: str, version_id: Optional[str] = None) -> Tuple[Any, Dict[str, Any]]:
        """
        Load a model from registry
        
        Args:
            model_name: Name of the model
            version_id: Specific version to load (optional, loads latest if not provided)
            
        Returns:
            Tuple of (model_object, model_metadata)
        """
        if model_name not in self.model_registry:
            raise ValueError(f"Model {model_name} not found in registry")
        
        models = self.model_registry[model_name]
        
        if version_id:
            # Load specific version
            model_metadata = None
            for model in models:
                if model['version_id'] == version_id:
                    model_metadata = model
                    break
            
            if not model_metadata:
                raise ValueError(f"Version {version_id} not found for model {model_name}")
        else:
            # Load latest active version
            active_models = [m for m in models if m['status'] == 'active']
            if not active_models:
                raise ValueError(f"No active versions found for model {model_name}")
            
            model_metadata = active_models[-1]  # Get the latest
        
        # Load model object
        model_path = Path(model_metadata['model_path'])
        if not model_path.exists():
            raise FileNotFoundError(f"Model file not found: {model_path}")
        
        model_object = joblib.load(model_path)
        
        logger.info(f"Loaded model {model_name} version {model_metadata['version_id']}")
        
        return model_object, model_metadata
    
    def list_models(self) -> Dict[str, List[Dict[str, Any]]]:
        """
        List all registered models
        
        Returns:
            Dictionary of models and their versions
        """
        return self.model_registry.copy()
    
    def get_model_info(self, model_name: str, version_id: Optional[str] = None) -> Dict[str, Any]:
        """
        Get information about a specific model
        
        Args:
            model_name: Name of the model
            version_id: Specific version (optional)
            
        Returns:
            Model metadata
        """
        if model_name not in self.model_registry:
            raise ValueError(f"Model {model_name} not found in registry")
        
        models = self.model_registry[model_name]
        
        if version_id:
            for model in models:
                if model['version_id'] == version_id:
                    return model
            raise ValueError(f"Version {version_id} not found for model {model_name}")
        else:
            # Return latest active version
            active_models = [m for m in models if m['status'] == 'active']
            if not active_models:
                raise ValueError(f"No active versions found for model {model_name}")
            return active_models[-1]
    
    def compare_models(self, model_name: str) -> pd.DataFrame:
        """
        Compare all versions of a model
        
        Args:
            model_name: Name of the model
            
        Returns:
            DataFrame with model comparison
        """
        if model_name not in self.model_registry:
            raise ValueError(f"Model {model_name} not found in registry")
        
        models = self.model_registry[model_name]
        comparison_data = []
        
        for model in models:
            row = {
                'version_id': model['version_id'],
                'created_at': model['created_at'],
                'status': model['status']
            }
            row.update(model['metrics'])
            comparison_data.append(row)
        
        comparison_df = pd.DataFrame(comparison_data)
        
        # Sort by creation date
        comparison_df['created_at'] = pd.to_datetime(comparison_df['created_at'])
        comparison_df = comparison_df.sort_values('created_at', ascending=False)
        
        return comparison_df
    
    def promote_model(self, model_name: str, version_id: str) -> None:
        """
        Promote a model version to active status
        
        Args:
            model_name: Name of the model
            version_id: Version to promote
        """
        if model_name not in self.model_registry:
            raise ValueError(f"Model {model_name} not found in registry")
        
        models = self.model_registry[model_name]
        
        # Find the model to promote
        target_model = None
        for model in models:
            if model['version_id'] == version_id:
                target_model = model
                break
        
        if not target_model:
            raise ValueError(f"Version {version_id} not found for model {model_name}")
        
        # Mark all versions as inactive
        for model in models:
            model['status'] = 'inactive'
        
        # Mark target model as active
        target_model['status'] = 'active'
        
        self.save_registry()
        
        logger.info(f"Promoted model {model_name} version {version_id} to active")
    
    def delete_model(self, model_name: str, version_id: str) -> None:
        """
        Delete a model version
        
        Args:
            model_name: Name of the model
            version_id: Version to delete
        """
        if model_name not in self.model_registry:
            raise ValueError(f"Model {model_name} not found in registry")
        
        models = self.model_registry[model_name]
        
        # Find the model to delete
        model_to_delete = None
        model_index = -1
        
        for i, model in enumerate(models):
            if model['version_id'] == version_id:
                model_to_delete = model
                model_index = i
                break
        
        if not model_to_delete:
            raise ValueError(f"Version {version_id} not found for model {model_name}")
        
        # Don't allow deletion of active models
        if model_to_delete['status'] == 'active':
            raise ValueError(f"Cannot delete active model version {version_id}")
        
        # Delete model file
        model_path = Path(model_to_delete['model_path'])
        if model_path.exists():
            model_path.unlink()
        
        # Remove from registry
        models.pop(model_index)
        
        # Clean up if no versions left
        if not models:
            del self.model_registry[model_name]
        
        self.save_registry()
        
        logger.info(f"Deleted model {model_name} version {version_id}")
    
    def export_model(self, model_name: str, version_id: str, export_path: str) -> None:
        """
        Export a model version to a specified path
        
        Args:
            model_name: Name of the model
            version_id: Version to export
            export_path: Path to export the model
        """
        model_object, model_metadata = self.load_model(model_name, version_id)
        
        # Create export directory
        export_dir = Path(export_path)
        export_dir.mkdir(parents=True, exist_ok=True)
        
        # Export model
        model_export_path = export_dir / f"{version_id}.joblib"
        joblib.dump(model_object, model_export_path)
        
        # Export metadata
        metadata_export_path = export_dir / f"{version_id}_metadata.json"
        with open(metadata_export_path, 'w') as f:
            json.dump(model_metadata, f, indent=2)
        
        logger.info(f"Exported model {model_name} version {version_id} to {export_path}")
    
    def get_best_model(self, model_name: str, metric: str = 'r2') -> Tuple[Any, Dict[str, Any]]:
        """
        Get the best performing model version based on a metric
        
        Args:
            model_name: Name of the model
            metric: Metric to use for comparison (default: 'r2')
            
        Returns:
            Tuple of (model_object, model_metadata)
        """
        if model_name not in self.model_registry:
            raise ValueError(f"Model {model_name} not found in registry")
        
        models = self.model_registry[model_name]
        
        if not models:
            raise ValueError(f"No versions found for model {model_name}")
        
        # Find best model based on metric
        best_model = None
        best_value = -float('inf') if metric in ['r2', 'explained_variance'] else float('inf')
        
        for model in models:
            if metric not in model['metrics']:
                continue
            
            value = model['metrics'][metric]
            
            if metric in ['r2', 'explained_variance']:
                if value > best_value:
                    best_value = value
                    best_model = model
            else:
                if value < best_value:
                    best_value = value
                    best_model = model
        
        if not best_model:
            raise ValueError(f"No models found with metric {metric}")
        
        # Load the best model
        model_object, _ = self.load_model(model_name, best_model['version_id'])
        
        logger.info(f"Best model for {model_name} based on {metric}: {best_model['version_id']} ({best_value:.4f})")
        
        return model_object, best_model
