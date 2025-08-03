const axios = require('axios');

async function testSystem() {
  console.log('🧪 Testing CAPSTONE & THESIS Review System...\n');

  try {
    // Test backend health
    console.log('1. Testing Backend Health...');
    const healthResponse = await axios.get('http://localhost:5000');
    console.log('✅ Backend is running:', healthResponse.data.message);
    
    // Test admin authentication
    console.log('\n2. Testing Admin Authentication...');
    const adminResponse = await axios.get('http://localhost:5000/api/admin/reviews', {
      headers: {
        email: 'admin@capstone-thesis.com',
        password: 'admin123'
      }
    });
    console.log('✅ Admin authentication working');
    
    // Test review submission
    console.log('\n3. Testing Review Submission...');
    const reviewData = {
      name: 'Test User',
      email: 'test@example.com',
      service: 'System Development',
      overallRating: 5,
      satisfaction: 5,
      quality: 5,
      communication: 5,
      timeliness: 5,
      value: 5,
      comments: 'This is a test review for the system.',
      projectType: 'Test Project',
      projectDuration: '1 month',
      budget: '$1000',
      wouldRecommend: true,
      improvementSuggestions: 'Great system!',
      contactPermission: true
    };
    
    const reviewResponse = await axios.post('http://localhost:5000/api/reviews', reviewData);
    console.log('✅ Review submitted successfully');
    console.log('📧 Email notification should appear in console logs');
    
    console.log('\n🎉 All tests passed! System is working correctly.');
    console.log('\n📋 Next Steps:');
    console.log('1. Open http://localhost:5173 in your browser');
    console.log('2. Navigate to Admin Dashboard');
    console.log('3. Login with: admin@capstone-thesis.com / admin123');
    console.log('4. You should see the test review in the admin panel');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testSystem(); 