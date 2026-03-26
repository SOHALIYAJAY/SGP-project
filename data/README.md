## Dataset for ML

Place your dataset file at:

- `data/dataset.csv`

Or (recommended) just drop your raw files (`.csv`, `.xls`, `.xlsx`) anywhere in the project root — the app will
auto-clean and write a training file to:

- `data/processed/dataset.csv`

### Requirements

- **CSV with a header row**
- **Numeric target column** (the value you want the model to predict)

### Target column selection

- By default, the model uses the **last column** in the CSV as the target.
- To explicitly choose a target, set an environment variable:

```bash
ML_TARGET_COLUMN="your_target_column_name"
```

### What the model does

- Treats mostly-numeric columns as numeric features
- One-hot encodes categorical/text columns (top 50 categories per column)
- Trains a **Random Forest Regressor**
- If the target looks like a small set of classes (e.g. `0/1`), it trains a **Random Forest Classifier**
- Exposes API endpoints:
  - `GET /api/ml/info`
  - `POST /api/ml/train`
  - `POST /api/ml/predict` with body `{ "input": { "colA": 123, "colB": "Retail", ... } }`

