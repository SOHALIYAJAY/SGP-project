# Database Setup Guide

This guide explains how to set up MongoDB for the Business Analysis & Prediction System.

## Prerequisites

### Option 1: Local MongoDB Installation

#### Windows
1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the setup wizard
3. Add MongoDB to your PATH environment variable
4. Create data directory: `mkdir C:\data\db`
5. Start MongoDB: `mongod` (in a separate terminal)

#### Linux/macOS
```bash
# Using package manager
sudo apt update && sudo apt install -y mongodb  # Ubuntu/Debian
# OR
brew install mongodb-community                  # macOS with Homebrew

# Start MongoDB service
sudo systemctl start mongodb  # Linux
brew services start mongodb-community  # macOS
```

### Option 2: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free account and cluster
3. Get your connection string from the "Connect" button
4. Update the `.env` file with your Atlas connection string

## Configuration

1. **Environment Variables**: Update `backend/.env` with your MongoDB settings:

```env
# For local MongoDB
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=business_analysis

# For MongoDB Atlas
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
DATABASE_NAME=business_analysis
```

2. **Install Dependencies**:
```bash
cd backend
pip install -r requirements.txt
```

## Database Schema

The application uses two main collections:

### Companies Collection
- Stores company profile data
- Indexed on: `company_name`, `industry`, `created_at`

### Analyses Collection
- Stores analysis results for each company
- Indexed on: `company_id`, `created_at`, `analysis_type`

## API Endpoints

New database endpoints are available:

- `GET /api/companies` - List stored companies
- `GET /api/companies/{id}` - Get specific company
- `GET /api/companies/{id}/analyses` - Get analyses for a company
- `GET /api/analyses/recent` - Get recent analyses

## Testing the Setup

1. **Start the backend**:
```bash
cd backend
python main.py
```

2. **Check health endpoint**:
```bash
curl http://localhost:8000/api/health
```
Should show `"database_connected": true`

3. **Test data storage**: Submit a company analysis and check if it's saved:
```bash
curl -X GET "http://localhost:8000/api/companies"
```

## Troubleshooting

### Connection Issues
- Ensure MongoDB is running (`mongod` process)
- Check firewall settings (port 27017)
- Verify connection string in `.env`

### Import Errors
- Install missing packages: `pip install motor pymongo python-dotenv`
- Check Python path and virtual environment

### Data Not Saving
- Check MongoDB logs for errors
- Verify database name and collection names
- Ensure proper permissions for database writes

## Migration from SQLite

If you have existing data in the SQLite database (`nexusai.db`), you can migrate it to MongoDB by running:

```python
# Add migration script here if needed
```

The new system maintains backward compatibility with the existing SQLite stats logging.