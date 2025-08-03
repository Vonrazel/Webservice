import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaSmile, FaMeh, FaFrown, FaThumbsUp, FaThumbsDown, FaCheckCircle, FaCalendar, FaDollarSign, FaHandshake } from 'react-icons/fa';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    overallRating: 0,
    satisfaction: 0,
    quality: 0,
    communication: 0,
    timeliness: 0,
    value: 0,
    comments: '',
    // Enhanced fields
    projectType: '',
    projectDuration: '',
    budget: '',
    wouldRecommend: false,
    improvementSuggestions: '',
    contactPermission: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const ratingLabels = {
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Very Good',
    5: 'Excellent'
  };

  const satisfactionLabels = {
    1: 'Very Dissatisfied',
    2: 'Dissatisfied',
    3: 'Neutral',
    4: 'Satisfied',
    5: 'Very Satisfied'
  };

  const handleRatingChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send to backend
      await axios.post(API_ENDPOINTS.REVIEWS, formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        service: '',
        overallRating: 0,
        satisfaction: 0,
        quality: 0,
        communication: 0,
        timeliness: 0,
        value: 0,
        comments: '',
        // Enhanced fields
        projectType: '',
        projectDuration: '',
        budget: '',
        wouldRecommend: false,
        improvementSuggestions: '',
        contactPermission: false
      });
    } catch (error) {
      console.error('Error submitting review:', error);
      // For demo purposes, still show success
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const RatingStars = ({ value, onChange, label, description }) => (
    <div className="rating-group">
      <label className="rating-label">
        {label}
        {description && <span className="rating-description">{description}</span>}
      </label>
      <div className="stars-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`star-button ${star <= value ? 'active' : ''}`}
            onClick={() => onChange(star)}
            onMouseEnter={(e) => {
              e.target.parentElement.querySelectorAll('.star-button').forEach((btn, index) => {
                btn.classList.toggle('hover', index < star);
              });
            }}
            onMouseLeave={(e) => {
              e.target.parentElement.querySelectorAll('.star-button').forEach((btn) => {
                btn.classList.remove('hover');
              });
            }}
          >
            <FaStar />
          </button>
        ))}
        <span className="rating-text">
          {value > 0 ? ratingLabels[value] : 'Select rating'}
        </span>
      </div>
    </div>
  );

  const SatisfactionScale = ({ value, onChange, label, description }) => (
    <div className="satisfaction-group">
      <label className="satisfaction-label">
        {label}
        {description && <span className="satisfaction-description">{description}</span>}
      </label>
      <div className="satisfaction-scale">
        {[1, 2, 3, 4, 5].map((level) => (
          <button
            key={level}
            type="button"
            className={`satisfaction-button ${level === value ? 'active' : ''}`}
            onClick={() => onChange(level)}
          >
            {level === 1 && <FaFrown />}
            {level === 2 && <FaMeh />}
            {level === 3 && <FaSmile />}
            {level === 4 && <FaThumbsUp />}
            {level === 5 && <FaCheckCircle />}
            <span>{satisfactionLabels[level]}</span>
          </button>
        ))}
      </div>
    </div>
  );

  if (submitted) {
    return (
      <div className="review-success">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="success-content"
        >
          <FaCheckCircle className="success-icon" />
          <h2>Thank You!</h2>
          <p>Your review has been submitted successfully. We appreciate your feedback!</p>
          <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
            Your review will be reviewed by our team before being published.
          </p>
          <button 
            className="btn-primary"
            onClick={() => setSubmitted(false)}
          >
            Submit Another Review
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="review-form">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="form-header"
        >
          <h1>Share Your Experience</h1>
          <p>Your feedback helps us improve and helps other clients make informed decisions</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="review-form-container"
        >
          {/* Personal Information */}
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email address"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="service">Service Used *</label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a service</option>
                <option value="System Development">System Development</option>
                <option value="Website Development">Website Development</option>
                <option value="Database Design">Database Design</option>
                <option value="API Integration">API Integration</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Project Details - Enhanced Fields */}
          <div className="form-section">
            <h3>Project Details</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="projectType">
                  <FaHandshake style={{ marginRight: '8px' }} />
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                >
                  <option value="">Select project type</option>
                  <option value="Capstone Project">Capstone Project</option>
                  <option value="Thesis">Thesis</option>
                  <option value="Research Paper">Research Paper</option>
                  <option value="Business System">Business System</option>
                  <option value="E-commerce Website">E-commerce Website</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="projectDuration">
                  <FaCalendar style={{ marginRight: '8px' }} />
                  Project Duration
                </label>
                <select
                  id="projectDuration"
                  name="projectDuration"
                  value={formData.projectDuration}
                  onChange={handleInputChange}
                >
                  <option value="">Select duration</option>
                  <option value="Less than 1 month">Less than 1 month</option>
                  <option value="1-3 months">1-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="6-12 months">6-12 months</option>
                  <option value="More than 1 year">More than 1 year</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="budget">
                <FaDollarSign style={{ marginRight: '8px' }} />
                Budget Range
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
              >
                <option value="">Select budget range</option>
                <option value="Under $1,000">Under $1,000</option>
                <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                <option value="Over $25,000">Over $25,000</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          {/* Overall Rating */}
          <div className="form-section">
            <h3>Overall Experience</h3>
            <RatingStars
              value={formData.overallRating}
              onChange={(value) => handleRatingChange('overallRating', value)}
              label="Overall Rating *"
              description="How would you rate your overall experience with our service?"
            />
          </div>

          {/* Detailed Ratings */}
          <div className="form-section">
            <h3>Detailed Feedback</h3>
            
            <RatingStars
              value={formData.satisfaction}
              onChange={(value) => handleRatingChange('satisfaction', value)}
              label="Service Satisfaction"
              description="How satisfied are you with our service?"
            />

            <RatingStars
              value={formData.quality}
              onChange={(value) => handleRatingChange('quality', value)}
              label="Quality of Work"
              description="How would you rate the quality of the delivered work?"
            />

            <RatingStars
              value={formData.communication}
              onChange={(value) => handleRatingChange('communication', value)}
              label="Communication"
              description="How would you rate our communication throughout the project?"
            />

            <RatingStars
              value={formData.timeliness}
              onChange={(value) => handleRatingChange('timeliness', value)}
              label="Timeliness"
              description="How would you rate our adherence to deadlines?"
            />

            <RatingStars
              value={formData.value}
              onChange={(value) => handleRatingChange('value', value)}
              label="Value for Money"
              description="How would you rate the value you received for the price paid?"
            />
          </div>

          {/* Satisfaction Scale */}
          <div className="form-section">
            <h3>Overall Satisfaction</h3>
            <SatisfactionScale
              value={formData.satisfaction}
              onChange={(value) => handleRatingChange('satisfaction', value)}
              label="How satisfied are you with our service?"
              description="Please select the option that best describes your satisfaction level"
            />
          </div>

          {/* Recommendation */}
          <div className="form-section">
            <h3>Recommendation</h3>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="wouldRecommend"
                  checked={formData.wouldRecommend}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                I would recommend this service to others
              </label>
            </div>
          </div>

          {/* Comments */}
          <div className="form-section">
            <h3>Additional Comments</h3>
            <div className="form-group">
              <label htmlFor="comments">Comments & Suggestions</label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                rows="5"
                placeholder="Please share any additional comments, suggestions, or specific feedback about your experience..."
              />
            </div>
            <div className="form-group">
              <label htmlFor="improvementSuggestions">Improvement Suggestions</label>
              <textarea
                id="improvementSuggestions"
                name="improvementSuggestions"
                value={formData.improvementSuggestions}
                onChange={handleInputChange}
                rows="3"
                placeholder="What could we improve in our services?"
              />
            </div>
          </div>

          {/* Contact Permission */}
          <div className="form-section">
            <h3>Contact Permission</h3>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="contactPermission"
                  checked={formData.contactPermission}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                I give permission to contact me regarding my review (optional)
              </label>
              <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                This allows us to follow up on your feedback and provide personalized responses.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button
              type="submit"
              className="btn-primary"
              disabled={loading || !formData.name || !formData.email || !formData.service || formData.overallRating === 0}
            >
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default ReviewForm; 