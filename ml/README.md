# Business Analysis & Prediction System (BAPS) ML Components

A comprehensive machine learning system for business analysis, prediction, and forecasting.

## 🚀 Features

- **Data Processing & Validation**: Robust data preprocessing and validation pipelines
- **Model Training**: Support for multiple ML algorithms with hyperparameter tuning
- **Model Evaluation**: Comprehensive evaluation metrics and visualization
- **Inference Engine**: Real-time prediction and business analysis
- **Feature Engineering**: Automated feature creation and selection
- **Model Management**: Version control and deployment management

## 📁 Project Structure

```
ml/
├── src/                          # Source code
│   ├── data_processing/          # Data preprocessing and validation
│   ├── training/                  # Model training and evaluation
│   ├── inference/                 # Prediction and inference
│   ├── utils/                     # Utilities and configuration
│   └── features/                  # Feature engineering
├── data/                          # Data directories
│   ├── raw/                       # Raw data files
│   ├── processed/                 # Processed data
│   └── external/                  # External data sources
├── models/                        # Trained models
├── notebooks/                     # Jupyter notebooks
├── configs/                       # Configuration files
├── tests/                         # Unit tests
└── requirements.txt               # Python dependencies
```

## 🛠️ Installation

### Prerequisites

- Python 3.8 or higher
- pip or conda

### Install from Source

1. Clone the repository:
```bash
git clone https://github.com/sgp-project/baps-ml.git
cd baps-ml
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Install the package:
```bash
pip install -e .
```

## 📖 Quick Start

### Basic Usage

```python
from ml.src.inference.predictor import BusinessPredictor
from ml.src.utils.data_loader import DataLoader

# Load data
loader = DataLoader("path/to/data")
companies_data = loader.load_company_data()

# Initialize predictor
predictor = BusinessPredictor(
    model_path="models/best_model.joblib",
    preprocessor_path="models/preprocessor.pkl"
)

# Make predictions
results = predictor.predict_batch(companies_data.to_dict('records'))
```

### Training a Model

```python
from ml.src.training.trainer import ModelTrainer
from ml.src.data_processing.preprocessor import DataPreprocessor
from ml.src.utils.data_loader import DataLoader

# Load and prepare data
loader = DataLoader("path/to/data")
df = loader.load_company_data()

# Preprocess data
preprocessor = DataPreprocessor()
df_processed = preprocessor.fit_transform(df)

# Split data
train_df, val_df, test_df = loader.split_data(df_processed)

# Train models
trainer = ModelTrainer()
results = trainer.train_multiple_models(
    X_train=train_df.drop('target', axis=1),
    y_train=train_df['target'],
    X_val=val_df.drop('target', axis=1),
    y_val=val_df['target']
)
```

## 📊 Data Format

The system expects company data with the following fields:

### Financial Data
- `revenue`: Annual revenue
- `expenses`: Annual expenses
- `profitMargin`: Profit margin (0-1)
- `burnRate`: Monthly burn rate
- `cashBalance`: Current cash balance
- `totalFunding`: Total funding received
- `operationalCost`: Operational costs

### Market & Growth
- `marketSize`: Total market size
- `competitorCount`: Number of competitors
- `growthRate`: Revenue growth rate
- `marketShare`: Market share percentage
- `industryGrowthRate`: Industry growth rate
- `arpu`: Average revenue per user

### Team & Operations
- `teamSize`: Number of employees
- `customerCount`: Number of customers
- `churnRate`: Customer churn rate
- `nps`: Net Promoter Score
- `customerSatisfaction`: Customer satisfaction score

### Company Information
- `companyName`: Company name
- `industry`: Industry sector
- `foundedYear`: Year founded
- `location`: Geographic location
- `businessModel`: Business model type
- `companyStage`: Current stage (seed, series A, etc.)

## 🔧 Configuration

The system uses YAML/JSON configuration files. Example:

```yaml
data:
  raw_data_path: "data/raw"
  processed_data_path: "data/processed"
  test_size: 0.2
  validation_size: 0.1
  random_state: 42

model:
  models_dir: "models"
  default_model_type: "xgboost"
  cross_validation_folds: 5
  hyperparameter_tuning: true

training:
  max_iter: 1000
  early_stopping: true
  n_jobs: -1

evaluation:
  metrics: ["mse", "mae", "r2", "mape"]
  save_plots: true
  plots_dir: "plots"
```

## 🤖 Supported Models

- Linear Regression
- Ridge Regression
- Lasso Regression
- Random Forest
- Gradient Boosting
- XGBoost
- LightGBM

## 📈 Evaluation Metrics

- **Regression Metrics**: MSE, RMSE, MAE, R², MAPE
- **Business Metrics**: Revenue prediction accuracy, Growth prediction accuracy
- **Custom Metrics**: Within 10%/20% accuracy, Business health score correlation

## 🧪 Testing

Run the test suite:

```bash
pytest tests/
```

Run with coverage:

```bash
pytest --cov=src tests/
```

## 📚 Documentation

- [API Documentation](docs/api.md)
- [Training Guide](docs/training.md)
- [Inference Guide](docs/inference.md)
- [Feature Engineering](docs/features.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, please contact:
- Email: team@sgp-project.com
- Issues: [GitHub Issues](https://github.com/sgp-project/baps-ml/issues)

## 🗺️ Roadmap

- [ ] Add deep learning models
- [ ] Implement automated hyperparameter optimization
- [ ] Add real-time prediction API
- [ ] Create web interface for model management
- [ ] Add support for time series forecasting
- [ ] Implement model explainability tools

## 📊 Performance

Current model performance on validation set:
- R² Score: 0.85
- RMSE: $2.3M
- MAE: $1.8M
- Within 10% accuracy: 78%
- Within 20% accuracy: 92%
