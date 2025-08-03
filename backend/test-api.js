const axios = require('axios');

const baseURL = 'http://localhost:5000';

async function testAPI() {
  try {
    console.log('🧪 Testing API Endpoints...\n');
    
    // Test health endpoint
    console.log('1️⃣ Testing health endpoint...');
    const healthResponse = await axios.get(`${baseURL}/api/health`);
    console.log('✅ Health endpoint working!');
    console.log('Response:', healthResponse.data);
    
    // Test reviews endpoint
    console.log('\n2️⃣ Testing reviews endpoint...');
    const reviewsResponse = await axios.get(`${baseURL}/api/reviews`);
    console.log('✅ Reviews endpoint working!');
    console.log(`Found ${reviewsResponse.data.length} reviews`);
    
    // Test submitting a review
    console.log('\n3️⃣ Testing review submission...');
    const testReview = {
      name: 'Test User',
      email: 'test@example.com',
      service: 'Website Development',
      overallRating: 5,
      satisfaction: 5,
      quality: 5,
      communication: 5,
      timeliness: 5,
      value: 5,
      comments: 'This is a test review!'
    };
    
    const submitResponse = await axios.post(`${baseURL}/api/reviews`, testReview);
    console.log('✅ Review submission working!');
    console.log('Response:', submitResponse.data);
    
    // Test analytics endpoint
    console.log('\n4️⃣ Testing analytics endpoint...');
    const analyticsResponse = await axios.get(`${baseURL}/api/analytics`);
    console.log('✅ Analytics endpoint working!');
    console.log('Analytics:', analyticsResponse.data);
    
    console.log('\n🎉 All API tests passed! Your backend is working perfectly!');
    
  } catch (error) {
    console.log('❌ API test failed!');
    console.log('Error:', error.message);
    console.log('\n💡 Make sure your server is running: node server.js');
  }
}

testAPI(); 