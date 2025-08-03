const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
  try {
    console.log('🔗 Testing MongoDB connection...');
    console.log('Connection string found:', !!process.env.MONGODB_URI);
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected Successfully!');
    console.log('Host:', mongoose.connection.host);
    console.log('Database:', mongoose.connection.name);
    
    // Test database operations
    const testCollection = mongoose.connection.collection('test');
    await testCollection.insertOne({ test: true, timestamp: new Date() });
    console.log('✅ Database write test successful!');
    
    await testCollection.deleteOne({ test: true });
    console.log('✅ Database cleanup successful!');
    
    await mongoose.disconnect();
    console.log('✅ Connection closed successfully!');
    console.log('\n🎉 MongoDB is working perfectly!');
    
  } catch (error) {
    console.log('❌ MongoDB connection failed!');
    console.log('Error:', error.message);
    console.log('\n🔧 Please check your .env file and connection string');
  }
}

testConnection(); 