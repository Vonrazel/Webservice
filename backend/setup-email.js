const fs = require('fs');
const path = require('path');

console.log('📧 Setting up email configuration for bonyrazelmorales@gmail.com...\n');

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
SMTP_USER=bonyrazelmorales@gmail.com
SMTP_PASS=your_app_password

# Admin Configuration
ADMIN_EMAIL=bonyrazelmorales@gmail.com
ADMIN_PASSWORD=admin123

# Spam Prevention
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=3
`;

const envPath = path.join(__dirname, '.env');
fs.writeFileSync(envPath, envContent);

console.log('✅ Email configuration updated!');
console.log('📧 Admin email: bonyrazelmorales@gmail.com');
console.log('🔑 Admin password: admin123');
console.log('\n⚠️  To enable real email notifications:');
console.log('1. Go to your Gmail account settings');
console.log('2. Enable 2-factor authentication');
console.log('3. Generate an App Password');
console.log('4. Replace "your_app_password" in .env with the generated password');
console.log('\n🎯 For now, email notifications will appear in console logs');
console.log('\n🚀 Run: npm start to start the server'); 