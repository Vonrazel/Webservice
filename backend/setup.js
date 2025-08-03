const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up CAPSTONE & THESIS Review System...\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file...');
  const envContent = `# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration (for future use)
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/capstone-thesis?retryWrites=true&w=majority

# JWT Secret (for future authentication)
JWT_SECRET=your_jwt_secret_here

# CORS Origins (for production)
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Email Configuration for Notifications
# For Gmail, use App Password instead of regular password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Admin Configuration
ADMIN_EMAIL=admin@capstone-thesis.com
ADMIN_PASSWORD=admin123

# Spam Prevention
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=3
`;
  
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully!');
  console.log('⚠️  Please update the email settings in .env file for real email notifications');
} else {
  console.log('✅ .env file already exists');
}

console.log('\n📋 Setup Instructions:');
console.log('1. Update the .env file with your email settings (optional)');
console.log('2. Run: npm install (if not already done)');
console.log('3. Run: npm start');
console.log('\n🔑 Admin Login Credentials:');
console.log('Email: admin@capstone-thesis.com');
console.log('Password: admin123');
console.log('\n🌐 Access URLs:');
console.log('Frontend: http://localhost:5173');
console.log('Backend API: http://localhost:5000');
console.log('Admin Dashboard: http://localhost:5173/admin');
console.log('\n📧 Email Notifications:');
console.log('- Currently using console logging (mock emails)');
console.log('- To enable real emails, configure SMTP settings in .env');
console.log('\n✨ Setup complete! You can now start the server.'); 