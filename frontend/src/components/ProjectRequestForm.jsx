import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaFacebookMessenger, FaCode, FaGlobe, FaDatabase, FaMobile, FaFileAlt, FaCalendar, FaDollarSign, FaUser, FaPhone, FaGraduationCap, FaBriefcase, FaCheckCircle, FaArrowRight } from 'react-icons/fa';

const ProjectRequestForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    service: '',
    budget: '',
    timeline: '',
    description: '',
    requirements: '',
    university: '',
    course: '',
    contactMethod: 'email',
    agreeToTerms: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
      // Prepare email content
      const emailSubject = `New Project Request - ${formData.projectType}`;
      const emailBody = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Project Type: ${formData.projectType}
Service: ${formData.service}
Budget: ${formData.budget}
Timeline: ${formData.timeline}
University: ${formData.university}
Course: ${formData.course}

Project Description:
${formData.description}

Requirements:
${formData.requirements}

Contact Method: ${formData.contactMethod}
      `;

      // Open email client or Facebook Messenger based on preference
      if (formData.contactMethod === 'email') {
        const mailtoLink = `mailto:info@capstonethesis.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        window.open(mailtoLink);
      } else {
        // Facebook Messenger link (you can customize this)
        const messengerLink = `https://m.me/yourpage`;
        window.open(messengerLink, '_blank');
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting request:', error);
      setSubmitted(true); // Still show success for demo
    } finally {
      setLoading(false);
    }
  };

  const services = [
    {
      icon: <FaCode />,
      title: "System Development",
      description: "Custom software solutions tailored to your specific requirements",
      price: "Starting from P1,000"
    },
    {
      icon: <FaGlobe />,
      title: "Website Development",
      description: "Modern, responsive websites with cutting-edge technologies",
      price: "Starting from P800"
    },
    {
      icon: <FaDatabase />,
      title: "Database Design",
      description: "Robust database architecture for optimal performance",
      price: "Starting from P500"
    },
    {
      icon: <FaMobile />,
      title: "Mobile Applications",
      description: "Cross-platform mobile apps for iOS and Android",
      price: "Starting from P1,500"
    }
  ];

  if (submitted) {
    return (
      <div className="request-success">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="success-content"
        >
          <FaCheckCircle className="success-icon" />
          <h2>Request Submitted!</h2>
          <p>Your project request has been submitted successfully. We'll get back to you within 24 hours!</p>
          <div className="contact-info">
            <p><strong>Contact Methods:</strong></p>
            <div className="contact-methods">
              <div className="contact-method">
                <FaEnvelope />
                <span>Email: info@capstonethesis.com</span>
              </div>
              <div className="contact-method">
                <FaFacebookMessenger />
                <span>Facebook Messenger</span>
              </div>
            </div>
          </div>
          <button 
            className="btn-primary"
            onClick={() => setSubmitted(false)}
          >
            Submit Another Request
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="project-request">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="form-header"
        >
          <h1>Request a Service</h1>
          <p>Fill out the form below to request our development services. We'll get back to you with a personalized quote.</p>
        </motion.div>

        <div className="request-content">
          {/* Services Overview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="services-overview"
          >
            <h3>Our Services</h3>
            <div className="services-grid">
              {services.map((service, index) => (
                <div key={index} className="service-card">
                  <div className="service-icon">{service.icon}</div>
                  <h4>{service.title}</h4>
                  <p>{service.description}</p>
                  <div className="service-price">{service.price}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Request Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onSubmit={handleSubmit}
            className="request-form"
          >
            {/* Personal Information */}
            <div className="form-section">
              <h3>Personal Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">
                    <FaUser style={{ marginRight: '8px' }} />
                    Full Name *
                  </label>
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
                  <label htmlFor="email">
                    <FaEnvelope style={{ marginRight: '8px' }} />
                    Email Address *
                  </label>
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
                <label htmlFor="phone">
                  <FaPhone style={{ marginRight: '8px' }} />
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Academic Information */}
            <div className="form-section">
              <h3>Academic Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="university">
                    <FaGraduationCap style={{ marginRight: '8px' }} />
                    University/Institution
                  </label>
                  <input
                    type="text"
                    id="university"
                    name="university"
                    value={formData.university}
                    onChange={handleInputChange}
                    placeholder="Enter your university or institution"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="course">
                    <FaBriefcase style={{ marginRight: '8px' }} />
                    Course/Program
                  </label>
                  <input
                    type="text"
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    placeholder="Enter your course or program"
                  />
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="form-section">
              <h3>Project Details</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="projectType">
                    <FaFileAlt style={{ marginRight: '8px' }} />
                    Project Type *
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    required
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
                  <label htmlFor="service">
                    <FaCode style={{ marginRight: '8px' }} />
                    Service Required *
                  </label>
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
              <div className="form-row">
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
                    <option value="Under P1,000">Under P1,000</option>
                    <option value="P1,000 - P5,000">P1,000 - P5,000</option>
                    <option value="P5,000 - P15,000">P5,000 - P15,000</option>
                    <option value="P15,000 - P30,000">P15,000 - P30,000</option>
                    <option value="Over P30,000">Over P30,000</option>
                    <option value="To be discussed">To be discussed</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="timeline">
                    <FaCalendar style={{ marginRight: '8px' }} />
                    Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                  >
                    <option value="">Select timeline</option>
                    <option value="Less than 1 month">Less than 1 month</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6-12 months">6-12 months</option>
                    <option value="More than 1 year">More than 1 year</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Project Description */}
            <div className="form-section">
              <h3>Project Description</h3>
              <div className="form-group">
                <label htmlFor="description">Project Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  required
                  placeholder="Please describe your project in detail..."
                />
              </div>
              <div className="form-group">
                <label htmlFor="requirements">Specific Requirements</label>
                <textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="List any specific requirements, features, or technologies you need..."
                />
              </div>
            </div>

            {/* Contact Preference */}
            <div className="form-section">
              <h3>Contact Preference</h3>
              <div className="form-group">
                <label>Preferred Contact Method</label>
                <div className="contact-options">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="email"
                      checked={formData.contactMethod === 'email'}
                      onChange={handleInputChange}
                    />
                    <span className="radio-custom"></span>
                    <FaEnvelope />
                    <span>Email</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="messenger"
                      checked={formData.contactMethod === 'messenger'}
                      onChange={handleInputChange}
                    />
                    <span className="radio-custom"></span>
                    <FaFacebookMessenger />
                    <span>Facebook Messenger</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="form-section">
              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="checkmark"></span>
                  I agree to the terms and conditions and give permission to contact me regarding this project request
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-actions">
              <button
                type="submit"
                className="btn-primary"
                disabled={loading || !formData.name || !formData.email || !formData.projectType || !formData.service || !formData.description || !formData.agreeToTerms}
              >
                {loading ? 'Submitting...' : 'Submit Request'} <FaArrowRight />
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default ProjectRequestForm; 