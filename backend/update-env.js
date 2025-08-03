const fs = require('fs');
const path = require('path');

console.log('🔧 Updating environment configuration with Gmail App Password...\n');

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
SMTP_PASS=wnhp rzre ybxv ozcf

# Admin Configuration
ADMIN_EMAIL=bonyrazelmorales@gmail.com
ADMIN_PASSWORD=admin123

# Spam Prevention
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=3
`;

const envPath = path.join(__dirname, '.env');
fs.writeFileSync(envPath, envContent);

console.log('✅ Environment file updated successfully!');
console.log('📧 Gmail App Password configured');
console.log('🔑 Admin credentials ready');
console.log('\n🧪 Testing email service...\n'); 