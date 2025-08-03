#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 MongoDB Setup Script for CAPSTONE & THESIS');
console.log('==============================================\n');

async function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function setupMongoDB() {
  try {
    // Check if .env file exists
    const envPath = path.join(__dirname, 'backend', '.env');
    const envExists = fs.existsSync(envPath);
    
    if (envExists) {
      console.log('✅ .env file already exists');
      const overwrite = await askQuestion('Do you want to overwrite it? (y/n): ');
      if (overwrite.toLowerCase() !== 'y') {
        console.log('Setup cancelled.');
        rl.close();
        return;
      }
    }

    console.log('\n📋 MongoDB Connection Setup');
    console.log('==========================\n');
    
    console.log('Choose your MongoDB setup:');
    console.log('1. MongoDB Atlas (Cloud - Recommended)');
    console.log('2. Local MongoDB Installation');
    
    const choice = await askQuestion('\nEnter your choice (1 or 2): ');
    
    let mongoUri = '';
    
    if (choice === '1') {
      console.log('\n🌐 MongoDB Atlas Setup');
      console.log('=====================\n');
      
      console.log('To get your MongoDB Atlas connection string:');
      console.log('1. Go to https://www.mongodb.com/atlas');
      console.log('2. Create a free account and cluster');
      console.log('3. Set up database access and network access');
      console.log('4. Get your connection string from the "Connect" button');
      console.log('5. Replace <password> with your database user password');
      console.log('6. Replace <dbname> with "capstone-thesis"\n');
      
      mongoUri = await askQuestion('Enter your MongoDB Atlas connection string: ');
      
      if (!mongoUri.includes('mongodb+srv://')) {
        console.log('❌ Invalid MongoDB Atlas connection string format');
        console.log('Expected format: mongodb+srv://username:password@cluster.mongodb.net/database');
        rl.close();
        return;
      }
      
    } else if (choice === '2') {
      console.log('\n💻 Local MongoDB Setup');
      console.log('=====================\n');
      
      console.log('Make sure MongoDB is installed and running on your system.');
      console.log('You can download it from: https://www.mongodb.com/try/download/community\n');
      
      const host = await askQuestion('Enter MongoDB host (default: localhost): ') || 'localhost';
      const port = await askQuestion('Enter MongoDB port (default: 27017): ') || '27017';
      const database = await askQuestion('Enter database name (default: capstone-thesis): ') || 'capstone-thesis';
      
      mongoUri = `mongodb://${host}:${port}/${database}`;
      
    } else {
      console.log('❌ Invalid choice. Please run the script again.');
      rl.close();
      return;
    }

    // Create .env content
    const envContent = `# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=${mongoUri}

# JWT Secret (for future authentication)
JWT_SECRET=your_jwt_secret_here_${Math.random().toString(36).substring(2, 15)}

# CORS Origins (for production)
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Optional: Email configuration for notifications
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
`;

    // Write .env file
    fs.writeFileSync(envPath, envContent);
    console.log('\n✅ .env file created successfully!');
    
    // Test connection
    console.log('\n🧪 Testing MongoDB Connection...');
    console.log('===============================\n');
    
    // Load environment variables
    require('dotenv').config({ path: envPath });
    
    // Test connection
    const mongoose = require('mongoose');
    
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 15000,
      });
      
      console.log('✅ MongoDB connection successful!');
      console.log(`📊 Connected to: ${mongoose.connection.host}`);
      
      // Test creating a collection
      const testCollection = mongoose.connection.collection('test');
      await testCollection.insertOne({ test: true, timestamp: new Date() });
      console.log('✅ Database write test successful!');
      
      // Clean up test data
      await testCollection.deleteOne({ test: true });
      console.log('✅ Database cleanup successful!');
      
      await mongoose.disconnect();
      console.log('✅ Connection closed successfully!');
      
    } catch (error) {
      console.log('❌ MongoDB connection failed!');
      console.log('Error:', error.message);
      console.log('\n🔧 Troubleshooting tips:');
      console.log('1. Check your connection string');
      console.log('2. Ensure MongoDB is running');
      console.log('3. Check network access settings');
      console.log('4. Verify username and password');
      
      // Don't exit on error, let user fix and retry
    }
    
    console.log('\n📝 Next Steps:');
    console.log('1. Start your backend server: cd backend && npm run dev');
    console.log('2. Test the API endpoints');
    console.log('3. Submit reviews through your frontend');
    console.log('4. Monitor your database');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  } finally {
    rl.close();
  }
}

setupMongoDB(); 