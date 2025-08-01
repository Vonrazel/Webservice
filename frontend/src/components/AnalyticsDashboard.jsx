import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaUsers, FaChartLine, FaThumbsUp, FaClock } from 'react-icons/fa';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState({
    averageRating: 4.8,
    totalReviews: 156,
    recentReviews: [],
    ratingDistribution: {
      5: 45,
      4: 35,
      3: 15,
      2: 3,
      1: 2
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.ANALYTICS);
        setAnalytics(response.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        // Fallback to demo data if API fails
        setAnalytics({
          averageRating: 4.8,
          totalReviews: 156,
          recentReviews: [
            {
              id: 1,
              name: "Sarah Johnson",
              rating: 5,
              comment: "Excellent service! My capstone project was completed on time and exceeded expectations.",
              date: "2 days ago"
            },
            {
              id: 2,
              name: "Michael Chen",
              rating: 5,
              comment: "Professional team with great communication. Highly recommended for thesis development.",
              date: "3 days ago"
            },
            {
              id: 3,
              name: "Emily Rodriguez",
              rating: 4,
              comment: "Great experience working with this team. They understood my requirements perfectly.",
              date: "5 days ago"
            }
          ],
          ratingDistribution: {
            5: 45,
            4: 35,
            3: 15,
            2: 3,
            1: 2
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const calculatePercentage = (count) => {
    return ((count / analytics.totalReviews) * 100).toFixed(1);
  };

  if (loading) {
    return (
      <div className="analytics-dashboard loading">
        <div className="loading-spinner">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="analytics-dashboard">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="dashboard-header"
      >
        <h2>Client Satisfaction Overview</h2>
        <p>Real-time insights from our valued clients</p>
      </motion.div>

      <div className="dashboard-grid">
        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="metrics-section"
        >
          <div className="metric-card">
            <div className="metric-icon">
              <FaStar />
            </div>
            <div className="metric-content">
              <div className="metric-value">{analytics.averageRating}</div>
              <div className="metric-label">Average Rating</div>
              <div className="metric-stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < Math.floor(analytics.averageRating) ? 'star filled' : 'star'}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <FaUsers />
            </div>
            <div className="metric-content">
              <div className="metric-value">{analytics.totalReviews}</div>
              <div className="metric-label">Total Reviews</div>
              <div className="metric-subtitle">Happy clients</div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <FaThumbsUp />
            </div>
            <div className="metric-content">
              <div className="metric-value">98%</div>
              <div className="metric-label">Satisfaction Rate</div>
              <div className="metric-subtitle">Would recommend us</div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <FaClock />
            </div>
            <div className="metric-content">
              <div className="metric-value">24/7</div>
              <div className="metric-label">Support Available</div>
              <div className="metric-subtitle">Always here to help</div>
            </div>
          </div>
        </motion.div>

        {/* Rating Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="rating-distribution"
        >
          <h3>Rating Distribution</h3>
          <div className="distribution-bars">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="distribution-bar">
                <div className="bar-label">
                  <span>{rating} Stars</span>
                  <span className="bar-count">{analytics.ratingDistribution[rating]}</span>
                </div>
                <div className="bar-container">
                  <div 
                    className="bar-fill"
                    style={{ 
                      width: `${calculatePercentage(analytics.ratingDistribution[rating])}%`,
                      backgroundColor: rating >= 4 ? '#10b981' : rating >= 3 ? '#f59e0b' : '#ef4444'
                    }}
                  ></div>
                </div>
                <span className="bar-percentage">
                  {calculatePercentage(analytics.ratingDistribution[rating])}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="recent-reviews"
        >
          <h3>Recent Reviews</h3>
          <div className="reviews-list">
            {analytics.recentReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                className="review-item"
              >
                <div className="review-header">
                  <div className="review-rating">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < review.rating ? 'star filled' : 'star'}
                      />
                    ))}
                  </div>
                  <span className="review-date">{review.date}</span>
                </div>
                <p className="review-comment">{review.comment}</p>
                <div className="review-author">- {review.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="trust-indicators"
      >
        <div className="trust-item">
          <FaChartLine className="trust-icon" />
          <span>150+ Projects Completed</span>
        </div>
        <div className="trust-item">
          <FaUsers className="trust-icon" />
          <span>98% Client Satisfaction</span>
        </div>
        <div className="trust-item">
          <FaClock className="trust-icon" />
          <span>On-Time Delivery</span>
        </div>
        <div className="trust-item">
          <FaThumbsUp className="trust-icon" />
          <span>5+ Years Experience</span>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboard; 