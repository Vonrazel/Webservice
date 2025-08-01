# CAPSTONE & THESIS Development Services

A modern, professional website for CAPSTONE & THESIS Development Services built with React + Vite (Frontend) and Node.js + Express + MongoDB (Backend).

## 🚀 Features

### Frontend
- ✅ Modern, responsive UI with blue theme
- ✅ Dark mode support
- ✅ Smooth animations and transitions
- ✅ Interactive navigation with routing
- ✅ Hero section with call-to-action
- ✅ About Us section with company information
- ✅ Pricing plans with different service tiers
- ✅ Modern review form with rating system
- ✅ Analytics dashboard showing client satisfaction
- ✅ Customer testimonials and reviews
- ✅ Professional footer with contact information

### Backend
- ✅ RESTful API with Express.js
- ✅ MongoDB Atlas integration
- ✅ Review submission and management
- ✅ Analytics data aggregation
- ✅ CORS enabled for frontend communication
- ✅ Environment variable support
- ✅ Security middleware (Helmet, Compression)
- ✅ Error handling and validation

## 🛠️ Tech Stack

### Frontend
- **React 19** - JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with CSS variables and dark mode

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Compression** - Response compression
- **Nodemon** - Development server with auto-restart

## 📁 Project Structure

```
website/
├── frontend/                    # React + Vite application
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── Home.jsx       # Home page component
│   │   │   ├── Pricing.jsx    # Pricing page component
│   │   │   ├── About.jsx      # About page component
│   │   │   ├── ReviewForm.jsx # Review form component
│   │   │   └── AnalyticsDashboard.jsx # Analytics component
│   │   ├── App.jsx            # Main React component
│   │   ├── App.css            # Styling with CSS variables
│   │   └── main.jsx           # Entry point
│   └── package.json
├── backend/                    # Node.js + Express server
│   ├── server.js              # Express server with MongoDB
│   ├── env.example            # Environment variables template
│   └── package.json
├── MONGODB_SETUP.md           # MongoDB Atlas setup guide
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js)
- MongoDB Atlas account (free tier available)

### 1. Clone or Download the Project
```bash
# Navigate to your project directory
cd website
```

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies
```bash
cd ../backend
npm install
```

### 4. Set Up MongoDB Atlas
1. Follow the [MongoDB Setup Guide](MONGODB_SETUP.md)
2. Create your MongoDB Atlas cluster
3. Get your connection string
4. Configure environment variables

### 5. Configure Environment Variables
```bash
cd backend
cp env.example .env
```

Edit the `.env` file with your MongoDB connection string and other settings.

## 🚀 Running the Application

### Option 1: Run Both Servers (Recommended)

#### Terminal 1 - Backend Server
```bash
cd backend
npm run dev
```
Backend will run on: http://localhost:5000

#### Terminal 2 - Frontend Server
```bash
cd frontend
npm run dev
```
Frontend will run on: http://localhost:5173

### Option 2: Run Individual Servers

#### Backend Only
```bash
cd backend
npm start          # Production mode
npm run dev        # Development mode with auto-restart
```

#### Frontend Only
```bash
cd frontend
npm run dev        # Development server
npm run build      # Build for production
npm run preview    # Preview production build
```

## 🌐 Website Features

### Navigation
- **Home** - Hero section, about us, reviews, analytics
- **Pricing** - Service packages and pricing plans
- **About** - Company information, team, portfolio
- **Review** - Modern review submission form

### Home Page
- Hero section with "Get Started" call-to-action
- About Us section explaining services
- Analytics dashboard with client satisfaction metrics
- Customer reviews and testimonials
- Trust indicators and statistics

### Pricing Page
- Three pricing tiers (Basic, Professional, Enterprise)
- Service overview with individual pricing
- Additional services section
- Custom quote request

### About Page
- Company mission and vision
- Team member profiles
- Achievement statistics
- Portfolio section link
- Company values

### Review System
- Modern 5-star rating system
- Multiple rating categories (satisfaction, quality, communication, etc.)
- Satisfaction scale with emoji indicators
- Open-ended comments section
- Form validation and success feedback

### Analytics Dashboard
- Average rating display
- Total reviews count
- Rating distribution charts
- Recent reviews list
- Trust indicators

## 🔧 API Endpoints

### Backend API (http://localhost:5000)

#### Reviews
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Submit a new review
- `GET /api/reviews/service/:service` - Get reviews by service

#### Analytics
- `GET /api/analytics` - Get analytics data (average ratings, distribution, etc.)

#### Health Check
- `GET /api/health` - Server health status

#### General
- `GET /` - Server status and API information

## 🎨 Design Features

### Modern UI/UX
- Clean, professional design
- Blue color theme with gradients
- Smooth animations and transitions
- Responsive design for all devices
- Interactive hover effects

### Dark Mode Support
- Toggle between light and dark themes
- Persistent theme preference
- Automatic theme detection
- Smooth theme transitions

### Accessibility
- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- High contrast ratios
- Focus indicators

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (320px - 767px)

## 🔒 Security Features

- CORS configuration for secure cross-origin requests
- Input validation and sanitization
- Environment variable protection
- MongoDB injection prevention
- Rate limiting ready (can be added)

## 📊 Database Schema

### Reviews Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  service: String (required, enum),
  overallRating: Number (1-5, required),
  satisfaction: Number (1-5, required),
  quality: Number (1-5, required),
  communication: Number (1-5, required),
  timeliness: Number (1-5, required),
  value: Number (1-5, required),
  comments: String (optional, max 1000 chars),
  createdAt: Date (auto-generated)
}
```

## 🚀 Deployment

### Frontend Deployment
```bash
cd frontend
npm run build
```
Deploy the `dist` folder to your hosting service.

### Backend Deployment
1. Set up your production MongoDB Atlas cluster
2. Configure environment variables for production
3. Deploy to your preferred hosting service (Heroku, Vercel, etc.)

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check your connection string in `.env`
   - Verify IP whitelist in MongoDB Atlas
   - Ensure cluster is running

2. **CORS Errors**
   - Backend CORS is configured for development
   - Update CORS origins for production
   - Check if backend is running on port 5000

3. **Module Not Found Errors**
   - Run `npm install` in both frontend and backend directories
   - Check Node.js version compatibility

4. **Build Errors**
   - Clear node_modules and reinstall dependencies
   - Check for syntax errors in components
   - Verify all imports are correct

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions:
- Email: info@capstonethesis.com
- Phone: +1 (555) 123-4567
- Website: [CAPSTONE & THESIS Development Services](http://localhost:5173)

---

**Built with ❤️ for CAPSTONE & THESIS Development Services** 