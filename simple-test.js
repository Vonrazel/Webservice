#!/usr/bin/env node

const path = require('path');

// Add backend node_modules to the path
const backendPath = path.join(__dirname, 'backend');
process.env.NODE_PATH = path.join(backendPath, 'node_modules');

// Load environment variables
require('dotenv').config({ path: path.join(backendPath, '.env') });

// Now require mongoose from backend
const mongoose = require('mongoose');

console.log('🧪 Simple MongoDB Connection Test');
console.log('================================\n');

async function testConnection() {
  try {
    console.log('🔗 Testing MongoDB connection...');
    console.log('Connection string:', process.env.MONGODB_URI ? 'Found' : 'Missing');
    
    if (!process.env.MONGODB_URI) {
      console.log('❌ MONGODB_URI not found in .env file');
      console.log('Please check your backend/.env file');
      return;
    }
    
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 15000,
    });
    
    console.log('✅ MongoDB connected successfully!');
    console.log(`📊 Host: ${mongoose.connection.host}`);
    console.log(`📊 Database: ${mongoose.connection.name}`);
    
    // Test a simple database operation
    const testCollection = mongoose.connection.collection('test');
    await testCollection.insertOne({ test: true, timestamp: new Date() });
    console.log('✅ Database write test successful!');
    
    // Clean up
    await testCollection.deleteOne({ test: true });
    console.log('✅ Database cleanup successful!');
    
    await mongoose.disconnect();
    console.log('✅ Connection closed successfully!');
    
    console.log('\n🎉 MongoDB connection is working perfectly!');
    console.log('\n📝 Next steps:');
    console.log('1. Start your backend: cd backend && npm run dev');
    console.log('2. Test your API endpoints');
    console.log('3. Submit reviews through your frontend');
    
  } catch (error) {
    console.log('❌ MongoDB connection failed!');
    console.log('Error:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check your connection string in backend/.env');
    console.log('2. Verify your MongoDB Atlas credentials');
    console.log('3. Check network access settings');
    console.log('4. Try changing DNS to 8.8.8.8 and 1.1.1.1');
  }
}

testConnection(); 