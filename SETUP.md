# CAPSTONE & THESIS Development Services - Setup Guide

## Project Overview
This is a full-stack web application for CAPSTONE & THESIS Development Services, featuring a React frontend and Node.js/Express backend with MongoDB.

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud)

## Quick Start

### 1. Clone and Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Environment Setup

#### Backend (.env file)
Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/capstone-thesis

# JWT Secret (for future authentication)
JWT_SECRET=your_jwt_secret_here_change_in_production

# CORS Origins
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

#### Frontend (.env file)
Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000
```

### 3. Start Development Servers

#### Backend
```bash
cd backend
npm run dev
```
The backend will start on http://localhost:5000

#### Frontend
```bash
cd frontend
npm run dev
```
The frontend will start on http://localhost:5173

## Project Structure

```
website/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── config/          # API configuration
│   │   └── App.jsx         # Main app component
│   └── package.json
├── backend/                  # Node.js backend
│   ├── server.js            # Main server file
│   ├── src/                 # Modular structure (future use)
│   └── package.json
└── README.md
```

## Features

### Frontend
- ✅ Responsive design with dark/light theme
- ✅ React Router for navigation
- ✅ Framer Motion animations
- ✅ Review submission system
- ✅ Analytics dashboard
- ✅ Pricing page
- ✅ About page with team info

### Backend
- ✅ Express.js REST API
- ✅ MongoDB with Mongoose
- ✅ Review submission and retrieval
- ✅ Analytics endpoints
- ✅ CORS configuration
- ✅ Error handling middleware

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Submit a new review
- `GET /api/analytics` - Get analytics data
- `GET /api/reviews/service/:service` - Get reviews by service

## Development

### Running Tests
```bash
# Frontend
cd frontend
npm run lint

# Backend
cd backend
npm run lint
```

### Building for Production
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm start
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running locally or update MONGODB_URI in .env
   - For development, the app will continue without MongoDB

2. **CORS Errors**
   - Check that the frontend URL is in the CORS origins list
   - Update ALLOWED_ORIGINS in backend .env

3. **Port Already in Use**
   - Change PORT in backend .env file
   - Update VITE_API_URL in frontend .env accordingly

## Contributing

1. Follow the existing code structure
2. Use the centralized API configuration
3. Test both frontend and backend changes
4. Update documentation as needed

## License

This project is for educational purposes. 