import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaUsers, FaStar, FaCheckCircle, FaArrowRight, FaCode, FaDatabase, FaMobile, FaGlobe, FaAward, FaTrophy, FaMedal, FaCertificate, FaGraduationCap, FaBriefcase, FaHandshake, FaLightbulb, FaShieldAlt } from 'react-icons/fa';
import AnalyticsDashboard from './AnalyticsDashboard';

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching reviews from backend
    setTimeout(() => {
      setReviews([
        {
          id: 1,
          name: "Sarah Johnson",
          rating: 5,
          comment: "Exceptional work! My capstone project was delivered ahead of schedule with outstanding quality. The team's attention to detail and professional communication exceeded all expectations. Highly recommended!",
          service: "System Development",
          university: "University of Technology",
          project: "E-Learning Management System",
          avatar: "SJ"
        },
        {
          id: 2,
          name: "Michael Chen",
          rating: 5,
          comment: "Outstanding service! They transformed my thesis into a professional-grade application. The documentation was comprehensive and the system is production-ready. Truly impressed with their expertise.",
          service: "Website Development",
          university: "State University",
          project: "Inventory Management System",
          avatar: "MC"
        },
        {
          id: 3,
          name: "Emily Rodriguez",
          rating: 5,
          comment: "Professional team with exceptional technical skills. They understood my requirements perfectly and delivered a robust database design that exceeded my expectations. Excellent communication throughout.",
          service: "Database Design",
          university: "Technical Institute",
          project: "Healthcare Database System",
          avatar: "ER"
        },
        {
          id: 4,
          name: "David Kim",
          rating: 5,
          comment: "Outstanding quality and attention to detail. The API integration was flawless and the documentation was crystal clear. Will definitely work with them again for future projects.",
          service: "API Integration",
          university: "Engineering University",
          project: "E-Commerce Platform",
          avatar: "DK"
        },
        {
          id: 5,
          name: "Lisa Thompson",
          rating: 5,
          comment: "Incredible experience! The team delivered a sophisticated mobile application that perfectly met my thesis requirements. The code quality and user interface design are exceptional.",
          service: "Mobile Development",
          university: "Computer Science University",
          project: "Fitness Tracking App",
          avatar: "LT"
        },
        {
          id: 6,
          name: "Robert Wilson",
          rating: 5,
          comment: "Professional excellence! They built a comprehensive web system with advanced features that impressed my thesis committee. The technical implementation is outstanding.",
          service: "Full-Stack Development",
          university: "Information Technology Institute",
          project: "Student Portal System",
          avatar: "RW"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const achievements = [
    { icon: <FaTrophy />, number: "500+", label: "Projects Completed" },
    { icon: <FaAward />, number: "98%", label: "Client Satisfaction" },
    { icon: <FaMedal />, number: "50+", label: "Universities Served" },
    { icon: <FaCertificate />, number: "100%", label: "Success Rate" }
  ];

  const features = [
    {
      icon: <FaCode />,
      title: "Modern Development",
      description: "Cutting-edge technologies and industry best practices for scalable, maintainable solutions."
    },
    {
      icon: <FaDatabase />,
      title: "Robust Architecture",
      description: "Enterprise-grade database design with optimized performance and security."
    },
    {
      icon: <FaMobile />,
      title: "Cross-Platform",
      description: "Responsive design that works seamlessly across all devices and platforms."
    },
    {
      icon: <FaGlobe />,
      title: "Global Standards",
      description: "Following international best practices and security standards for enterprise-level solutions."
    },
    {
      icon: <FaShieldAlt />,
      title: "Security First",
      description: "Built-in security measures and data protection protocols for peace of mind."
    },
    {
      icon: <FaLightbulb />,
      title: "Innovation Driven",
      description: "Creative solutions that push boundaries and deliver exceptional user experiences."
    }
  ];

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

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-text"
          >
            <h1 className="hero-title">
              CAPSTONE & THESIS
              <span className="gradient-text"> Development Services</span>
            </h1>
            <p className="hero-subtitle">
              Professional system and website development services for your academic and business needs. 
              We transform your ideas into powerful, scalable solutions with enterprise-grade quality.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => scrollToSection('about')}>
                Get Started <FaArrowRight />
              </button>
              <button className="btn-secondary" onClick={() => scrollToSection('pricing')}>
                View Pricing
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-visual"
          >
            <div className="hero-card">
              <FaCode className="hero-icon" />
              <h3>Modern Development</h3>
              <p>Cutting-edge technologies and best practices</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achievements-section">
        <div className="container">
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="achievement-card"
              >
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-number">{achievement.number}</div>
                <div className="achievement-label">{achievement.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Our Services</h2>
            <p>Comprehensive development solutions for all your needs</p>
          </motion.div>

          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="service-box"
              >
                <div className="service-box-header">
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                </div>
                <p className="service-description">{service.description}</p>
                <div className="service-price">{service.price}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="about-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Why Choose Us?</h2>
            <p>We combine technical excellence with academic understanding to deliver outstanding results</p>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="feature-card"
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Dashboard */}
      <section className="analytics-section">
        <div className="container">
          <AnalyticsDashboard />
        </div>
      </section>

      {/* Enhanced Reviews Section */}
      <section id="reviews" className="reviews-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Client Success Stories</h2>
            <p>Real feedback from satisfied clients who trusted us with their academic and business projects</p>
          </motion.div>

          <div className="reviews-grid">
            {loading ? (
              <div className="loading">Loading reviews...</div>
            ) : (
              reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="review-card"
                >
                  <div className="review-header">
                    <div className="review-avatar">
                      <span>{review.avatar}</span>
                    </div>
                    <div className="review-info">
                      <h4 className="review-name">{review.name}</h4>
                      <p className="review-university">{review.university}</p>
                      <p className="review-project">{review.project}</p>
                    </div>
                    <div className="review-rating">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < review.rating ? 'star filled' : 'star'}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="review-service-badge">
                    <FaGraduationCap />
                    <span>{review.service}</span>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                  <div className="review-footer">
                    <div className="review-verification">
                      <FaCheckCircle />
                      <span>Verified Client</span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
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
              <FaHandshake className="trust-icon" />
              <span>100% Satisfaction Guarantee</span>
            </div>
            <div className="trust-item">
              <FaBriefcase className="trust-icon" />
              <span>Professional Service</span>
            </div>
            <div className="trust-item">
              <FaShieldAlt className="trust-icon" />
              <span>Secure & Confidential</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="cta-content"
          >
            <h2>Ready to Start Your Project?</h2>
            <p>Join hundreds of satisfied clients who trusted us with their academic and business projects</p>
            <div className="cta-buttons">
              <button className="btn-primary" onClick={() => scrollToSection('pricing')}>
                View Pricing <FaArrowRight />
              </button>
              <button className="btn-secondary">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 