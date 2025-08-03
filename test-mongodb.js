#!/usr/bin/env node

const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config({ path: './backend/.env' });

console.log('🧪 MongoDB & API Test Script');
console.log('============================\n');

async function testMongoDBConnection() {
  console.log('1️⃣ Testing MongoDB Connection...');
  
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 15000,
    });
    
    console.log('✅ MongoDB connected successfully!');
    console.log(`📊 Host: ${mongoose.connection.host}`);
    console.log(`📊 Database: ${mongoose.connection.name}`);
    
    return true;
  } catch (error) {
    console.log('❌ MongoDB connection failed!');
    console.log('Error:', error.message);
    return false;
  }
}

async function testDatabaseOperations() {
  console.log('\n2️⃣ Testing Database Operations...');
  
  try {
    // Create a test collection
    const testCollection = mongoose.connection.collection('test');
    
    // Test insert
    const insertResult = await testCollection.insertOne({
      test: true,
      message: 'Database write test',
      timestamp: new Date()
    });
    console.log('✅ Database write successful!');
    
    // Test read
    const readResult = await testCollection.findOne({ test: true });
    console.log('✅ Database read successful!');
    
    // Test update
    await testCollection.updateOne(
      { test: true },
      { $set: { updated: true } }
    );
    console.log('✅ Database update successful!');
    
    // Test delete
    await testCollection.deleteOne({ test: true });
    console.log('✅ Database delete successful!');
    
    return true;
  } catch (error) {
    console.log('❌ Database operations failed!');
    console.log('Error:', error.message);
    return false;
  }
}

async function testReviewSchema() {
  console.log('\n3️⃣ Testing Review Schema...');
  
  try {
    // Define review schema
    const reviewSchema = new mongoose.Schema({
      name: { type: String, required: true },
      email: { type: String, required: true },
      service: { type: String, required: true },
      overallRating: { type: Number, required: true, min: 1, max: 5 },
      satisfaction: { type: Number, required: true, min: 1, max: 5 },
      quality: { type: Number, required: true, min: 1, max: 5 },
      communication: { type: Number, required: true, min: 1, max: 5 },
      timeliness: { type: Number, required: true, min: 1, max: 5 },
      value: { type: Number, required: true, min: 1, max: 5 },
      comments: { type: String, maxlength: 1000 },
      createdAt: { type: Date, default: Date.now }
    });
    
    const Review = mongoose.model('Review', reviewSchema);
    
    // Test creating a review
    const testReview = new Review({
      name: 'Test User',
      email: 'test@example.com',
      service: 'Website Development',
      overallRating: 5,
      satisfaction: 5,
      quality: 5,
      communication: 5,
      timeliness: 5,
      value: 5,
      comments: 'This is a test review for database testing.'
    });
    
    await testReview.save();
    console.log('✅ Review creation successful!');
    
    // Test finding reviews
    const reviews = await Review.find();
    console.log(`✅ Found ${reviews.length} review(s) in database`);
    
    // Test finding by service
    const websiteReviews = await Review.find({ service: 'Website Development' });
    console.log(`✅ Found ${websiteReviews.length} website development review(s)`);
    
    // Clean up test data
    await Review.deleteMany({ email: 'test@example.com' });
    console.log('✅ Test data cleaned up successfully!');
    
    return true;
  } catch (error) {
    console.log('❌ Review schema test failed!');
    console.log('Error:', error.message);
    return false;
  }
}

async function testAPIEndpoints() {
  console.log('\n4️⃣ Testing API Endpoints...');
  
  const baseURL = 'http://localhost:5000';
  
  try {
    // Test health endpoint
    console.log('Testing health endpoint...');
    const healthResponse = await axios.get(`${baseURL}/api/health`);
    console.log('✅ Health endpoint working!');
    console.log('Response:', healthResponse.data);
    
    // Test reviews endpoint
    console.log('\nTesting reviews endpoint...');
    const reviewsResponse = await axios.get(`${baseURL}/api/reviews`);
    console.log('✅ Reviews endpoint working!');
    console.log(`Found ${reviewsResponse.data.length} reviews`);
    
    // Test analytics endpoint
    console.log('\nTesting analytics endpoint...');
    const analyticsResponse = await axios.get(`${baseURL}/api/analytics`);
    console.log('✅ Analytics endpoint working!');
    console.log('Analytics data:', analyticsResponse.data);
    
    return true;
  } catch (error) {
    console.log('❌ API endpoint test failed!');
    console.log('Error:', error.message);
    console.log('\n💡 Make sure your backend server is running:');
    console.log('   cd backend && npm run dev');
    return false;
  }
}

async function runAllTests() {
  console.log('🚀 Starting comprehensive MongoDB & API tests...\n');
  
  const results = {
    connection: false,
    operations: false,
    schema: false,
    api: false
  };
  
  // Test 1: MongoDB Connection
  results.connection = await testMongoDBConnection();
  
  if (results.connection) {
    // Test 2: Database Operations
    results.operations = await testDatabaseOperations();
    
    // Test 3: Review Schema
    results.schema = await testReviewSchema();
    
    // Test 4: API Endpoints
    results.api = await testAPIEndpoints();
  }
  
  // Summary
  console.log('\n📊 Test Results Summary');
  console.log('========================');
  console.log(`MongoDB Connection: ${results.connection ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Database Operations: ${results.operations ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Review Schema: ${results.schema ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`API Endpoints: ${results.api ? '✅ PASS' : '❌ FAIL'}`);
  
  const allPassed = Object.values(results).every(result => result);
  
  if (allPassed) {
    console.log('\n🎉 All tests passed! Your MongoDB setup is working correctly.');
    console.log('\n📝 Next steps:');
    console.log('1. Your backend is ready to accept review submissions');
    console.log('2. Start your frontend to test the complete flow');
    console.log('3. Monitor your database for new reviews');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the errors above.');
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Verify your MongoDB connection string');
    console.log('2. Ensure MongoDB is running');
    console.log('3. Check network access settings');
    console.log('4. Start your backend server if API tests failed');
  }
  
  // Cleanup
  if (results.connection) {
    await mongoose.disconnect();
    console.log('\n✅ MongoDB connection closed.');
  }
}

// Run the tests
runAllTests().catch(console.error); 