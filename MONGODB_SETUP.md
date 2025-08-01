# MongoDB Atlas Setup Guide

This guide will help you set up MongoDB Atlas for the CAPSTONE & THESIS Development Services website.

## Prerequisites

- A MongoDB Atlas account (free tier available)
- Node.js and npm installed
- Basic understanding of database concepts

## Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Click "Try Free" or "Sign Up"
3. Fill in your details and create an account
4. Verify your email address

## Step 2: Create a New Cluster

1. **Choose a Plan:**
   - Select "FREE" tier (M0 Sandbox)
   - This gives you 512MB storage and shared RAM
   - Perfect for development and small projects

2. **Choose a Provider & Region:**
   - Select your preferred cloud provider (AWS, Google Cloud, or Azure)
   - Choose a region close to your users for better performance
   - Click "Create"

3. **Configure Cluster:**
   - Cluster Name: `capstone-thesis-cluster` (or your preferred name)
   - Click "Create Cluster"

## Step 3: Set Up Database Access

1. **Create Database User:**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Username: `capstone-thesis-user` (or your preferred username)
   - Password: Create a strong password (save it securely!)
   - Database User Privileges: Select "Read and write to any database"
   - Click "Add User"

2. **Network Access:**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add your specific IP addresses
   - Click "Confirm"

## Step 4: Get Your Connection String

1. **Connect to Your Cluster:**
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Select "Node.js" as your driver
   - Copy the connection string

2. **Connection String Format:**
   ```
   mongodb+srv://capstone-thesis-user:<password>@cluster0.xxxxx.mongodb.net/capstone-thesis?retryWrites=true&w=majority
   ```

## Step 5: Configure Your Application

1. **Create Environment File:**
   ```bash
   cd backend
   cp env.example .env
   ```

2. **Update .env File:**
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # MongoDB Configuration
   MONGODB_URI=mongodb+srv://capstone-thesis-user:your_password@cluster0.xxxxx.mongodb.net/capstone-thesis?retryWrites=true&w=majority

   # JWT Secret (for future authentication)
   JWT_SECRET=your_jwt_secret_here

   # CORS Origins
   ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
   ```

3. **Replace Placeholders:**
   - Replace `your_password` with the password you created
   - Replace `cluster0.xxxxx.mongodb.net` with your actual cluster URL
   - Generate a strong JWT_SECRET (you can use a random string generator)

## Step 6: Install Dependencies

```bash
cd backend
npm install
```

## Step 7: Test the Connection

1. **Start the Backend Server:**
   ```bash
   npm run dev
   ```

2. **Check Console Output:**
   - You should see: "MongoDB Connected: cluster0.xxxxx.mongodb.net"
   - If you see any errors, check your connection string and network access

## Step 8: Verify Database Setup

1. **Check MongoDB Atlas Dashboard:**
   - Go to "Database" in your Atlas dashboard
   - Click "Browse Collections"
   - You should see a `capstone-thesis` database created automatically

2. **Test API Endpoints:**
   ```bash
   # Test the health endpoint
   curl http://localhost:5000/api/health

   # Test the reviews endpoint
   curl http://localhost:5000/api/reviews
   ```

## Database Schema

The application uses the following MongoDB collections:

### Reviews Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  service: String (required, enum),
  overallRating: Number (1-5, required),
  satisfaction: Number (1-5, required),
  quality: Number (1-5, required),
  communication: Number (1-5, required),
  timeliness: Number (1-5, required),
  value: Number (1-5, required),
  comments: String (optional, max 1000 chars),
  createdAt: Date (auto-generated)
}
```

### Service Types
- System Development
- Website Development
- Database Design
- API Integration
- Mobile Development
- Other

## API Endpoints

### Reviews
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Submit a new review
- `GET /api/reviews/service/:service` - Get reviews by service

### Analytics
- `GET /api/analytics` - Get analytics data (average ratings, distribution, etc.)

### Health Check
- `GET /api/health` - Server health status

## Security Best Practices

1. **Environment Variables:**
   - Never commit `.env` files to version control
   - Use different connection strings for development and production

2. **Network Security:**
   - In production, restrict IP access to your server's IP
   - Use VPC peering for enhanced security

3. **Database Security:**
   - Use strong passwords for database users
   - Regularly rotate database credentials
   - Enable MongoDB Atlas security features

4. **Application Security:**
   - Validate all input data
   - Implement rate limiting
   - Use HTTPS in production

## Monitoring and Maintenance

1. **MongoDB Atlas Monitoring:**
   - Monitor your cluster performance in the Atlas dashboard
   - Set up alerts for unusual activity
   - Monitor storage usage

2. **Backup Strategy:**
   - MongoDB Atlas provides automatic backups
   - Configure backup retention policies
   - Test restore procedures regularly

3. **Scaling Considerations:**
   - Monitor your application's database usage
   - Consider upgrading your cluster as your application grows
   - Implement database indexing for better performance

## Troubleshooting

### Common Issues

1. **Connection Refused:**
   - Check your IP address is whitelisted
   - Verify your connection string
   - Ensure your cluster is running

2. **Authentication Failed:**
   - Verify username and password
   - Check database user privileges
   - Ensure the database user exists

3. **Network Timeout:**
   - Check your internet connection
   - Verify firewall settings
   - Try connecting from a different network

### Debug Commands

```bash
# Test MongoDB connection
node -e "
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));
"

# Check environment variables
node -e "console.log(process.env.MONGODB_URI)"
```

## Production Deployment

1. **Environment Setup:**
   - Use production-grade MongoDB Atlas cluster
   - Set up proper environment variables
   - Configure CORS for your domain

2. **Security:**
   - Restrict IP access to your server
   - Use strong passwords and secrets
   - Enable MongoDB Atlas security features

3. **Monitoring:**
   - Set up application monitoring
   - Monitor database performance
   - Set up alerts for issues

## Support Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [MongoDB Node.js Driver](https://docs.mongodb.com/drivers/node/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)

## Next Steps

1. Set up your MongoDB Atlas cluster
2. Configure your environment variables
3. Test the connection
4. Deploy your application
5. Monitor and maintain your database

For additional support, refer to the MongoDB Atlas documentation or contact your development team. 