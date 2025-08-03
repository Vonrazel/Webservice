const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();

// Import services and middleware
const emailService = require('./src/services/emailService');
const { spamPrevention, detectSpam } = require('./src/middleware/spamPrevention');
const adminAuth = require('./src/middleware/adminAuth');

const app = express();
const PORT = process.env.PORT || 5000;

// In-memory storage for reviews (temporary until MongoDB is fixed)
let reviews = [];
let reviewId = 1;

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'CAPSTONE & THESIS Development Services API',
    version: '1.0.0',
    status: 'running',
    database: 'in-memory (MongoDB coming soon)',
    features: ['Admin Dashboard', 'Spam Prevention', 'Email Notifications', 'Enhanced Form Fields']
  });
});

// Get all reviews
app.get('/api/reviews', async (req, res) => {
  try {
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Submit a new review with enhanced fields and spam prevention
app.post('/api/reviews', spamPrevention, detectSpam, async (req, res) => {
  try {
    const {
      name,
      email,
      service,
      overallRating,
      satisfaction,
      quality,
      communication,
      timeliness,
      value,
      comments,
      // Enhanced fields
      projectType,
      projectDuration,
      budget,
      wouldRecommend,
      improvementSuggestions,
      contactPermission
    } = req.body;

    // Validation
    if (!name || !email || !service || !overallRating) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (overallRating < 1 || overallRating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const review = {
      id: reviewId++,
      name,
      email,
      service,
      overallRating,
      satisfaction,
      quality,
      communication,
      timeliness,
      value,
      comments,
      // Enhanced fields
      projectType: projectType || 'Not specified',
      projectDuration: projectDuration || 'Not specified',
      budget: budget || 'Not specified',
      wouldRecommend: wouldRecommend || false,
      improvementSuggestions: improvementSuggestions || '',
      contactPermission: contactPermission || false,
      createdAt: new Date(),
      status: 'pending' // For admin approval
    };

    reviews.unshift(review); // Add to beginning

    // Send email notification
    await emailService.sendNewReviewNotification(review);

    res.status(201).json({ message: 'Review submitted successfully', review });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

// Admin Dashboard Routes

// Get all reviews for admin (with pagination)
app.get('/api/admin/reviews', adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, service } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    
    let filteredReviews = [...reviews];
    
    // Filter by status
    if (status) {
      filteredReviews = filteredReviews.filter(review => review.status === status);
    }
    
    // Filter by service
    if (service) {
      filteredReviews = filteredReviews.filter(review => review.service === service);
    }
    
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = pageNum * limitNum;
    const paginatedReviews = filteredReviews.slice(startIndex, endIndex);
    
    res.json({
      reviews: paginatedReviews,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(filteredReviews.length / limitNum),
        totalReviews: filteredReviews.length,
        hasNext: endIndex < filteredReviews.length,
        hasPrev: pageNum > 1
      }
    });
  } catch (error) {
    console.error('Error fetching admin reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Update review status (approve/reject)
app.put('/api/admin/reviews/:id/status', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminResponse } = req.body;
    
    const review = reviews.find(r => r.id === parseInt(id));
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    review.status = status;
    review.adminResponse = adminResponse;
    review.updatedAt = new Date();
    
    // Send response notification to user if approved
    if (status === 'approved' && adminResponse && review.contactPermission) {
      await emailService.sendReviewResponseNotification(review, adminResponse);
    }
    
    res.json({ message: 'Review status updated successfully', review });
  } catch (error) {
    console.error('Error updating review status:', error);
    res.status(500).json({ error: 'Failed to update review status' });
  }
});

// Delete review
app.delete('/api/admin/reviews/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const reviewIndex = reviews.findIndex(r => r.id === parseInt(id));
    
    if (reviewIndex === -1) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    const deletedReview = reviews.splice(reviewIndex, 1)[0];
    res.json({ message: 'Review deleted successfully', review: deletedReview });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

// Get admin analytics
app.get('/api/admin/analytics', adminAuth, async (req, res) => {
  try {
    const totalReviews = reviews.length;
    const approvedReviews = reviews.filter(r => r.status === 'approved');
    const pendingReviews = reviews.filter(r => r.status === 'pending');
    const rejectedReviews = reviews.filter(r => r.status === 'rejected');
    
    const averageRating = approvedReviews.length > 0 
      ? approvedReviews.reduce((sum, review) => sum + review.overallRating, 0) / approvedReviews.length 
      : 0;

    const ratingDistribution = approvedReviews.reduce((acc, review) => {
      acc[review.overallRating] = (acc[review.overallRating] || 0) + 1;
      return acc;
    }, {});

    const serviceDistribution = approvedReviews.reduce((acc, review) => {
      acc[review.service] = (acc[review.service] || 0) + 1;
      return acc;
    }, {});

    const recommendationRate = approvedReviews.length > 0
      ? (approvedReviews.filter(r => r.wouldRecommend).length / approvedReviews.length) * 100
      : 0;

    const analytics = {
      totalReviews,
      approvedReviews: approvedReviews.length,
      pendingReviews: pendingReviews.length,
      rejectedReviews: rejectedReviews.length,
      averageRating,
      ratingDistribution,
      serviceDistribution,
      recommendationRate,
      recentReviews: approvedReviews.slice(0, 5).map(review => ({
        name: review.name,
        overallRating: review.overallRating,
        service: review.service,
        createdAt: review.createdAt
      }))
    };

    res.json(analytics);
  } catch (error) {
    console.error('Error fetching admin analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Get analytics data (public)
app.get('/api/analytics', async (req, res) => {
  try {
    const approvedReviews = reviews.filter(r => r.status === 'approved');
    const totalReviews = approvedReviews.length;
    const averageRating = totalReviews > 0 
      ? approvedReviews.reduce((sum, review) => sum + review.overallRating, 0) / totalReviews 
      : 0;

    const ratingDistribution = approvedReviews.reduce((acc, review) => {
      acc[review.overallRating] = (acc[review.overallRating] || 0) + 1;
      return acc;
    }, {});

    const recentReviews = approvedReviews.slice(0, 5).map(review => ({
      name: review.name,
      overallRating: review.overallRating,
      comments: review.comments,
      createdAt: review.createdAt
    }));

    const analytics = {
      totalReviews,
      averageRating,
      ratingDistribution,
      recentReviews
    };

    res.json(analytics);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Get reviews by service
app.get('/api/reviews/service/:service', async (req, res) => {
  try {
    const { service } = req.params;
    const approvedReviews = reviews.filter(review => 
      review.service === service && review.status === 'approved'
    );
    res.json(approvedReviews);
  } catch (error) {
    console.error('Error fetching reviews by service:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: 'in-memory',
    reviewsCount: reviews.length,
    features: {
      adminDashboard: true,
      spamPrevention: true,
      emailNotifications: !!process.env.SMTP_HOST,
      enhancedFormFields: true
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/api/health`);
      console.log(`💾 Using in-memory storage (${reviews.length} reviews)`);
      console.log(`🎯 Features enabled:`);
      console.log(`   - Admin Dashboard`);
      console.log(`   - Spam Prevention`);
      console.log(`   - Email Notifications: ${process.env.SMTP_HOST ? '✅' : '❌'}`);
      console.log(`   - Enhanced Form Fields`);
      console.log(`🎯 Ready to accept requests!`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app; 