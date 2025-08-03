# MongoDB Setup Guide

## Option 1: MongoDB Atlas (Recommended - Cloud Database)

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/atlas
2. Click "Try Free" and create an account
3. Choose "Free" tier (M0)
4. Select your preferred cloud provider (AWS, Google Cloud, or Azure)
5. Choose a region close to you
6. Click "Create Cluster"

### Step 2: Configure Database Access
1. In Atlas dashboard, go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and password (save these!)
5. Select "Read and write to any database"
6. Click "Add User"

### Step 3: Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

### Step 4: Get Connection String
1. Go to "Database" in the left sidebar
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with your database name (e.g., `capstone-thesis`)

### Step 5: Update Environment Variables
Create a `.env` file in the backend directory with your connection string:

```env
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/capstone-thesis?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

## Option 2: Local MongoDB Installation

### Step 1: Install MongoDB Community Server
Download from: https://www.mongodb.com/try/download/community

### Step 2: Install MongoDB Shell (mongosh)
Download from: https://www.mongodb.com/try/download/shell

### Step 3: Start MongoDB Service
```bash
# Windows (run as Administrator)
net start MongoDB

# Or start manually
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath="C:\data\db"
```

### Step 4: Connect to MongoDB
```bash
# Connect to local MongoDB
mongosh

# Or connect to a specific database
mongosh "mongodb://localhost:27017/capstone-thesis"
```

### Step 5: Update Environment Variables
For local MongoDB, use:
```env
MONGODB_URI=mongodb://localhost:27017/capstone-thesis
PORT=5000
NODE_ENV=development
```

## Testing the Connection

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Start the Server
```bash
npm run dev
```

### Step 3: Test API Endpoints
```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test reviews endpoint
curl http://localhost:5000/api/reviews

# Submit a test review
curl -X POST http://localhost:5000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "service": "Website Development",
    "overallRating": 5,
    "satisfaction": 5,
    "quality": 5,
    "communication": 5,
    "timeliness": 5,
    "value": 5,
    "comments": "Great service!"
  }'
```

## Troubleshooting

### Common Issues:

1. **Connection Timeout**
   - Check your internet connection
   - Try changing DNS to 8.8.8.8 and 1.1.1.1
   - Try connecting from a different network

2. **Authentication Failed**
   - Double-check username and password
   - Ensure database user has correct permissions

3. **Network Access Denied**
   - Add your IP address to Atlas Network Access
   - Or use "Allow Access from Anywhere" for development

4. **Local MongoDB Issues**
   - Ensure MongoDB service is running
   - Check if port 27017 is available
   - Verify data directory exists

### Useful Commands:

```bash
# Check if MongoDB is running (Windows)
netstat -an | findstr 27017

# Check MongoDB service status
sc query MongoDB

# Start MongoDB service
net start MongoDB

# Stop MongoDB service
net stop MongoDB
```

## Database Operations

### Using MongoDB Shell (mongosh):

```javascript
// Connect to database
use capstone-thesis

// View all collections
show collections

// View all reviews
db.reviews.find()

// View reviews with formatting
db.reviews.find().pretty()

// Count total reviews
db.reviews.countDocuments()

// Find reviews by service
db.reviews.find({service: "Website Development"})

// Find reviews with rating 5
db.reviews.find({overallRating: 5})

// Delete all reviews (be careful!)
db.reviews.deleteMany({})
```

## Next Steps

1. **Test the connection** by starting your backend server
2. **Submit test reviews** through your frontend
3. **Monitor the database** using MongoDB Atlas dashboard or mongosh
4. **Set up proper security** for production deployment

## Security Notes

- Never commit `.env` files to version control
- Use strong passwords for database users
- Restrict network access in production
- Regularly backup your database
- Monitor database usage and performance 