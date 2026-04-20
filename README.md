# Business Analysis & Prediction System (BAPS)

A comprehensive full-stack application for business analysis, prediction, and forecasting using machine learning and modern web technologies.

## 🚀 Features

- **AI-Powered Business Analysis**: ML-driven company evaluation and risk assessment
- **Financial Forecasting**: Revenue prediction and financial health analysis
- **Customer Analytics**: Churn prediction and customer lifetime value analysis
- **Market Intelligence**: Competitive analysis and market opportunity assessment
- **Interactive Dashboard**: Modern React-based UI with real-time analytics
- **PDF Report Generation**: Automated business analysis reports
- **RESTful API**: FastAPI backend with comprehensive endpoints
- **Database Integration**: MongoDB with efficient data storage and retrieval

## 🏗️ Architecture

```
├── frontend/          # Next.js React application
├── backend/           # FastAPI Python backend
├── ml/               # Machine learning models and training
├── data/             # Datasets and processed data
├── tests/            # Comprehensive test suite
└── docs/             # Documentation and reports
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python 3.11, Pydantic
- **Database**: MongoDB with Motor (async driver)
- **ML**: scikit-learn, XGBoost, pandas, numpy
- **Deployment**: Manual terminal setup
- **Testing**: pytest, Jest, Playwright
- **CI/CD**: GitHub Actions

## 📋 Prerequisites

- Node.js 18+ (for frontend development)
- Python 3.11+ (for backend and ML)
- MongoDB (local installation or Atlas)

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/business-analysis-system.git
   cd business-analysis-system
   ```

2. **Environment Setup**
   ```bash
   cp backend/.env.example backend/.env
   # Edit backend/.env with your configuration
   ```

3. **Train ML Models** (one-time setup)
   ```bash
   cd ml
   pip install -r requirements.txt
   python train_enhanced_models.py
   cd ..
   ```

4. **Database Setup**
   ```bash
   # Start local MongoDB
   mongod
   # Or use MongoDB Atlas and update .env
   ```

5. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn main:app --reload --port 8000
   ```

6. **Frontend Setup** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

7. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## 🧪 Testing

### Run All Tests
```bash
# Backend tests
cd backend && python -m pytest tests/ -v --cov=.

# ML tests
cd ml && python -m pytest tests/ -v

# Frontend tests
cd frontend && npm test

# Integration tests
cd tests && python test_complete_workflow.py
```

### Test Coverage
```bash
# Backend coverage
cd backend && python -m pytest --cov=. --cov-report=html

# Frontend coverage
cd frontend && npm test -- --coverage
```

## 📊 ML Model Training

```bash
cd ml
python train_enhanced_models.py
```

This will:
- Generate synthetic training data
- Perform hyperparameter tuning
- Train models with cross-validation
- Generate validation plots
- Save models and metadata

## 🔒 Security

- Rate limiting on API endpoints
- Input validation and sanitization
- CORS configuration
- Environment-based configuration
- Security headers in production

## 🚢 Deployment

### Production Deployment

1. **Build and deploy with Docker**
   ```bash
   docker-compose -f docker-compose.prod.yml up --build -d
   ```

2. **Environment Variables**
   ```env
   DEBUG=false
   MONGODB_URL=mongodb+srv://user:pass@cluster.mongodb.net/production
   ALLOWED_ORIGINS=https://yourdomain.com
   SECRET_KEY=your-production-secret
   ```

3. **SSL/TLS Setup**
   - Configure SSL certificates in nginx.conf
   - Update ALLOWED_ORIGINS for HTTPS

### CI/CD

The project includes GitHub Actions workflows for:
- Automated testing (backend, frontend, ML)
- Security scanning
- Docker image building
- Staging and production deployment

## 📈 API Endpoints

### Core Endpoints
- `POST /api/analyze-company` - Analyze company data
- `POST /api/validate-input` - Validate input data
- `POST /api/export-pdf` - Generate PDF reports
- `GET /api/health` - Health check

### Database Endpoints
- `GET /api/companies` - List companies
- `GET /api/companies/{id}` - Get company details
- `GET /api/database-stats` - Database statistics

## 🔧 Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `MONGODB_URL` | `mongodb://localhost:27017` | MongoDB connection URL |
| `DATABASE_NAME` | `business_analysis` | Database name |
| `DEBUG` | `false` | Enable debug mode |
| `ALLOWED_ORIGINS` | `http://localhost:3000` | CORS allowed origins |
| `RATE_LIMIT` | `100` | Requests per minute limit |
| `LOG_LEVEL` | `INFO` | Logging level |

## 📚 Documentation

- [API Documentation](http://localhost:8000/docs) - Interactive API docs
- [ML Model Documentation](./ml/README.md) - ML components guide
- [Database Setup](./backend/DATABASE_SETUP.md) - Database configuration
- [Bug Fixes](./docs/BUG_FIXES_SUMMARY.md) - Known issues and fixes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow PEP 8 for Python code
- Use TypeScript for frontend code
- Write tests for new features
- Update documentation
- Ensure CI/CD passes


## 🙏 Acknowledgments

- Built with FastAPI, Next.js, and MongoDB
- ML models powered by scikit-learn and XGBoost
- UI components from shadcn/ui

