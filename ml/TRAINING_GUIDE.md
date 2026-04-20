# 📊 How to Train Your BAPS ML Model

## 🎯 Quick Training Guide

### **Step 1: Place Your Dataset**
```
ml/data/raw/your_dataset.csv
```

### **Step 2: Update the Training Script**
Open `ml/train_with_your_data.py` and update this line:
```python
csv_path = "../data/raw/your_dataset.csv"  # <-- CHANGE TO YOUR FILE NAME
```

### **Step 3: Run Training**
```bash
cd ml
python train_with_your_data.py
```

## 📋 Required Data Format

Your CSV should have these columns (or similar):

### **Required Financial Columns:**
- `revenue` - Company revenue
- `expenses` - Company expenses  
- `profitMargin` - Profit margin (0-1)
- `growthRate` - Growth rate (0-1)

### **Optional Columns (Recommended):**
- `churnRate` - Customer churn rate
- `teamSize` - Number of employees
- `customerCount` - Number of customers
- `industry` - Industry sector
- `companyType` - Company type (Startup, SME, etc.)
- `burnRate` - Monthly burn rate
- `cashBalance` - Available cash

### **Target Columns (Optional):**
- `businessHealth` - Health score (0-100)
- `riskLevel` - Risk level (Low/Medium/High)
- `investmentReadiness` - Investment grade (A+, A, B+, etc.)

## 🚀 Training Commands

### **Option 1: Quick Training**
```bash
cd ml
python train_with_your_data.py
```

### **Option 2: Advanced Training**
```bash
cd ml/src/training
python train_models.py
```

### **Option 3: Jupyter Notebook**
```bash
cd ml/notebooks
jupyter notebook 01_data_exploration.ipynb
```

## 📁 Where Models Are Saved

After training, models will be saved to:
```
ml/models/
├── best_model.joblib          # Main health prediction model
├── risk_model.joblib          # Risk classification model
├── investment_model.joblib   # Investment grade model
├── scalers.pkl               # Feature scalers
├── encoders.pkl              # Category encoders
└── feature_columns.pkl       # Feature list
```

## ✅ Verification

After training, test your models:

### **Test Backend Integration**
```bash
cd backend
python -c "
import main
from fastapi.testclient import TestClient
client = TestClient(main.app)
response = client.post('/api/analyze-company', json={
    'companyName': 'Test',
    'revenue': '1000000',
    'growthRate': '0.15'
})
print('Status:', response.status_code)
print('Health Score:', response.json()['summary']['businessHealth'])
"
```

## 🔧 Troubleshooting

### **Common Issues:**

1. **Missing Columns**: The trainer will create synthetic targets if needed
2. **Data Format**: Ensure numeric columns are numbers, not strings
3. **File Path**: Update the csv_path in the training script
4. **Dependencies**: Install with `pip install -r requirements.txt`

### **Error Solutions:**

- **ModuleNotFoundError**: Run `cd ml && pip install -r requirements.txt`
- **FileNotFoundError**: Check your CSV file path
- **ValueError**: Ensure numeric columns contain numbers

## 🎉 Success Indicators

When training is successful, you'll see:
```
🚀 Starting BAPS Model Training
==================================================
📁 Loading data from your_dataset.csv
📊 Loaded 1000 records
🎯 Training Business Health Model...
   RMSE: 5.234
   R²: 0.856
⚠️  Training Risk Level Model...
   Accuracy: 0.892
💰 Training Investment Readiness Model...
   Accuracy: 0.847
💾 Models saved to ../models
🎉 Training Complete!
```

## 📞 Need Help?

If you encounter issues:
1. Check your CSV file format
2. Verify column names match the requirements
3. Ensure all dependencies are installed
4. Check file paths in the training script

Your ML models will be automatically integrated into the FastAPI backend once training is complete!
