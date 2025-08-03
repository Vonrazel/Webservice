const emailService = require('./src/services/emailService');

async function testEmailService() {
  console.log('🧪 Testing Email Service Configuration...\n');
  
  try {
    // Test email configuration
    const isConfigured = await emailService.testEmailConfiguration();
    
    if (isConfigured) {
      console.log('✅ Email service is properly configured!');
      console.log('📧 Test email sent successfully');
    } else {
      console.log('⚠️  Email service is not configured');
      console.log('📧 Using console logging for email notifications');
    }
    
    // Test sending a mock review notification
    console.log('\n📧 Testing Review Notification...');
    const mockReview = {
      id: 999,
      name: 'Test User',
      email: 'test@example.com',
      service: 'System Development',
      overallRating: 5,
      satisfaction: 5,
      quality: 5,
      communication: 5,
      timeliness: 5,
      value: 5,
      comments: 'This is a test review for email notification testing.',
      projectType: 'Test Project',
      projectDuration: '1 month',
      budget: 'Test Budget',
      wouldRecommend: true,
      improvementSuggestions: 'No suggestions needed.',
      contactPermission: true,
      createdAt: new Date(),
      status: 'pending'
    };
    
    await emailService.sendNewReviewNotification(mockReview);
    console.log('✅ Review notification test completed!');
    
  } catch (error) {
    console.error('❌ Email service test failed:', error.message);
  }
}

// Run the test
testEmailService(); 