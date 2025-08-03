import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCheck, FaUserPlus, FaStar, FaCode, FaEnvelope, FaFacebookMessenger, FaArrowRight, FaHandshake, FaGraduationCap } from 'react-icons/fa';

const ClientIdentification = () => {
  const [clientType, setClientType] = useState('');
  const navigate = useNavigate();

  const handleClientTypeSelect = (type) => {
    setClientType(type);
  };

  const handleContinue = () => {
    if (clientType === 'previous') {
      navigate('/review');
    } else if (clientType === 'new') {
      navigate('/request');
    }
  };

  return (
    <div className="client-identification">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="identification-header"
        >
          <h1>Welcome to CAPSTONE & THESIS Development Services</h1>
          <p>Please let us know how we can help you today</p>
        </motion.div>

        <div className="identification-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="client-type-selection"
          >
            <h2>Are you a previous client or a new client?</h2>
            <p>This helps us provide you with the most relevant experience</p>

            <div className="client-type-grid">
              {/* Previous Client Option */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className={`client-type-card ${clientType === 'previous' ? 'selected' : ''}`}
                onClick={() => handleClientTypeSelect('previous')}
              >
                <div className="client-type-icon">
                  <FaUserCheck />
                </div>
                <h3>Previous Client</h3>
                <p>I've worked with CAPSTONE & THESIS before and want to submit a review</p>
                <div className="client-type-features">
                  <div className="feature">
                    <FaStar />
                    <span>Share your experience</span>
                  </div>
                  <div className="feature">
                    <FaGraduationCap />
                    <span>Rate our services</span>
                  </div>
                  <div className="feature">
                    <FaHandshake />
                    <span>Help other clients</span>
                  </div>
                </div>
              </motion.div>

              {/* New Client Option */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className={`client-type-card ${clientType === 'new' ? 'selected' : ''}`}
                onClick={() => handleClientTypeSelect('new')}
              >
                <div className="client-type-icon">
                  <FaUserPlus />
                </div>
                <h3>New Client</h3>
                <p>I'm interested in requesting development services for my project</p>
                <div className="client-type-features">
                  <div className="feature">
                    <FaCode />
                    <span>Get a custom quote</span>
                  </div>
                  <div className="feature">
                    <FaGraduationCap />
                    <span>Discuss your project</span>
                  </div>
                  <div className="feature">
                    <FaHandshake />
                    <span>Start collaboration</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Continue Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="continue-section"
            >
              {clientType && (
                <button
                  className="btn-primary"
                  onClick={handleContinue}
                >
                  Continue {clientType === 'previous' ? 'to Review' : 'to Service Request'} <FaArrowRight />
                </button>
              )}
            </motion.div>
          </motion.div>

          {/* Direct Contact Options */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="direct-contact-section"
          >
            <h3>Or contact us directly</h3>
            <p>Prefer to reach out directly? We're here to help!</p>
            <div className="contact-methods-grid">
              <a href="mailto:info@capstonethesis.com" className="contact-method-btn">
                <FaEnvelope />
                <span>Email Us</span>
              </a>
              <a href="https://m.me/yourpage" target="_blank" rel="noopener noreferrer" className="contact-method-btn">
                <FaFacebookMessenger />
                <span>Facebook Messenger</span>
              </a>
            </div>
          </motion.div>

          {/* Services Overview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="services-overview-section"
          >
            <h3>Our Services</h3>
            <div className="services-preview">
              <div className="service-preview-item">
                <FaCode />
                <span>System Development</span>
              </div>
              <div className="service-preview-item">
                <FaGraduationCap />
                <span>Capstone Projects</span>
              </div>
              <div className="service-preview-item">
                <FaHandshake />
                <span>Thesis Support</span>
              </div>
              <div className="service-preview-item">
                <FaStar />
                <span>Website Development</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ClientIdentification; 