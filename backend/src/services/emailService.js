const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = null;
    this.isConfigured = false;
    this.initializeTransporter();
  }

  initializeTransporter() {
    // Check if SMTP is properly configured
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        this.transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT || 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          },
          tls: {
            rejectUnauthorized: false
          }
        });
        
        // Test the connection
        this.transporter.verify((error, success) => {
          if (error) {
            console.log('❌ Email service configuration error:', error.message);
            console.log('📧 Using console logging for email notifications');
            this.isConfigured = false;
          } else {
            console.log('✅ Email service configured successfully');
            console.log('📧 Server is ready to send emails');
            this.isConfigured = true;
          }
        });
      } catch (error) {
        console.log('❌ Email service initialization error:', error.message);
        this.isConfigured = false;
      }
    } else {
      console.log('📧 Email service not configured - using console logging instead');
      this.isConfigured = false;
    }

    // Create a mock transporter for development/testing
    if (!this.isConfigured) {
      this.transporter = {
        sendMail: async (mailOptions) => {
          console.log('\n=== 📧 EMAIL NOTIFICATION (MOCK) ===');
          console.log('📤 From:', mailOptions.from);
          console.log('📥 To:', mailOptions.to);
          console.log('📋 Subject:', mailOptions.subject);
          console.log('📄 Content Preview:', mailOptions.html.substring(0, 200) + '...');
          console.log('=== END EMAIL NOTIFICATION ===\n');
          return { messageId: 'mock-message-id-' + Date.now() };
        }
      };
    }
  }

  async sendNewReviewNotification(review) {
    try {
      const mailOptions = {
        from: `"CAPSTONE & THESIS Services" <${process.env.SMTP_USER || 'noreply@capstone-thesis.com'}>`,
        to: process.env.ADMIN_EMAIL || process.env.SMTP_USER || 'bonyrazelmorales@gmail.com',
        subject: `🎉 New Review Submitted - ${review.service}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
            <div style="background-color: white; border-radius: 10px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <h2 style="color: #2c3e50; text-align: center; margin-bottom: 30px;">🎉 New Review Received</h2>
              
              <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
                <h3 style="margin-top: 0; color: #155724;">📋 Review Details</h3>
                <p><strong>👤 Name:</strong> ${review.name}</p>
                <p><strong>📧 Email:</strong> ${review.email}</p>
                <p><strong>🛠️ Service:</strong> ${review.service}</p>
                <p><strong>⭐ Overall Rating:</strong> ${review.overallRating}/5</p>
                <p><strong>📅 Submitted:</strong> ${new Date(review.createdAt).toLocaleString()}</p>
              </div>
              
              <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
                <h3 style="margin-top: 0; color: #856404;">📊 Detailed Ratings</h3>
                <p><strong>😊 Satisfaction:</strong> ${review.satisfaction}/5</p>
                <p><strong>🎯 Quality:</strong> ${review.quality}/5</p>
                <p><strong>💬 Communication:</strong> ${review.communication}/5</p>
                <p><strong>⏰ Timeliness:</strong> ${review.timeliness}/5</p>
                <p><strong>💰 Value:</strong> ${review.value}/5</p>
              </div>
              
              ${review.comments ? `
                <div style="background-color: #d1ecf1; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #17a2b8;">
                  <h3 style="margin-top: 0; color: #0c5460;">💭 Comments</h3>
                  <p style="font-style: italic; margin: 0;">"${review.comments}"</p>
                </div>
              ` : ''}
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #495057;">📈 Additional Information</h3>
                <p><strong>📁 Project Type:</strong> ${review.projectType || 'Not specified'}</p>
                <p><strong>⏱️ Project Duration:</strong> ${review.projectDuration || 'Not specified'}</p>
                <p><strong>💵 Budget:</strong> ${review.budget || 'Not specified'}</p>
                <p><strong>👍 Would Recommend:</strong> ${review.wouldRecommend ? 'Yes' : 'No'}</p>
                <p><strong>📞 Contact Permission:</strong> ${review.contactPermission ? 'Yes' : 'No'}</p>
              </div>
              
              ${review.improvementSuggestions ? `
                <div style="background-color: #f8d7da; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc3545;">
                  <h3 style="margin-top: 0; color: #721c24;">💡 Improvement Suggestions</h3>
                  <p style="margin: 0;">${review.improvementSuggestions}</p>
                </div>
              ` : ''}
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
                <p style="color: #6c757d; font-size: 14px; margin: 0;">
                  This is an automated notification from your review system.
                </p>
                <p style="color: #6c757d; font-size: 12px; margin: 5px 0 0 0;">
                  Review ID: ${review.id} | Status: ${review.status}
                </p>
              </div>
            </div>
          </div>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('✅ New review notification sent successfully');
      if (this.isConfigured) {
        console.log('📧 Email sent to:', mailOptions.to);
      }
      return result;
    } catch (error) {
      console.error('❌ Error sending email notification:', error.message);
      // Don't throw error to prevent breaking the review submission
      return null;
    }
  }

  async sendReviewResponseNotification(review, response) {
    try {
      const mailOptions = {
        from: `"CAPSTONE & THESIS Services" <${process.env.SMTP_USER || 'noreply@capstone-thesis.com'}>`,
        to: review.email,
        subject: `💬 Response to Your Review - ${review.service}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
            <div style="background-color: white; border-radius: 10px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <h2 style="color: #2c3e50; text-align: center; margin-bottom: 30px;">💬 Thank You for Your Review</h2>
              
              <p style="font-size: 16px; line-height: 1.6;">Dear <strong>${review.name}</strong>,</p>
              
              <p style="font-size: 16px; line-height: 1.6;">
                Thank you for taking the time to share your feedback about our <strong>${review.service}</strong> service. 
                We value your input and are committed to continuously improving our services.
              </p>
              
              <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
                <h3 style="margin-top: 0; color: #155724;">💭 Our Response</h3>
                <p style="font-size: 16px; line-height: 1.6; margin: 0;">${response}</p>
              </div>
              
              <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
                <h3 style="margin-top: 0; color: #856404;">📊 Your Review Summary</h3>
                <p><strong>Service:</strong> ${review.service}</p>
                <p><strong>Rating:</strong> ${review.overallRating}/5 ⭐</p>
                <p><strong>Submitted:</strong> ${new Date(review.createdAt).toLocaleDateString()}</p>
              </div>
              
              <p style="font-size: 16px; line-height: 1.6;">
                We appreciate your trust in our services and look forward to serving you again in the future.
              </p>
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
                <p style="color: #6c757d; font-size: 14px; margin: 0;">
                  Best regards,<br>
                  <strong>The CAPSTONE & THESIS Development Team</strong>
                </p>
              </div>
            </div>
          </div>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('✅ Review response notification sent successfully');
      if (this.isConfigured) {
        console.log('📧 Response email sent to:', mailOptions.to);
      }
      return result;
    } catch (error) {
      console.error('❌ Error sending response notification:', error.message);
      return null;
    }
  }

  // Method to test email configuration
  async testEmailConfiguration() {
    if (!this.isConfigured) {
      console.log('📧 Email service is not configured. Using console logging.');
      return false;
    }

    try {
      const testMailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.ADMIN_EMAIL,
        subject: '🧪 Email Service Test - CAPSTONE & THESIS Services',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2c3e50;">🧪 Email Service Test</h2>
            <p>This is a test email to verify that the email service is working correctly.</p>
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
            <p>If you received this email, the email service is configured properly!</p>
          </div>
        `
      };

      await this.transporter.sendMail(testMailOptions);
      console.log('✅ Email service test successful!');
      return true;
    } catch (error) {
      console.error('❌ Email service test failed:', error.message);
      return false;
    }
  }
}

module.exports = new EmailService(); 