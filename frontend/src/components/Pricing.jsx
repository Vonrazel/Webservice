import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCheck, FaStar, FaRocket, FaCrown, FaCode, FaDatabase, FaMobile, FaGlobe, FaLaptop, FaFileAlt, FaShieldAlt, FaComments, FaMobileAlt, FaChartLine, FaEnvelope, FaFacebookMessenger, FaArrowRight } from 'react-icons/fa';

const Pricing = () => {
  const pricingPlans = [
    {
      id: 1,
      name: "Freelance Projects",
      price: "P1,000 - P7,000",
      description: "Landing pages, portfolios, and basic systems",
      icon: <FaLaptop />,
      features: [
        "Free Deployment",
        "Modern UI Design (Tailwind, Shadcn)",
        "Minor Revisions Included"
      ],
      popular: false,
      buttonText: "MESSAGE ME"
    },
    {
      id: 2,
      name: "Capstone / Final Projects",
      price: "P15,000 - P30,000",
      description: "Full system with documentation & user guide",
      icon: <FaCrown />,
      features: [
        "Complete Web System",
        "Diagram (SRS, ERD, UML)",
        "Free Deployment",
        "Admin & User Dashboard",
        "Mobile Responsiveness",
        "Free Consultation",
        "Basic Security & Auth",
        "2 Major Revisions Included"
      ],
      popular: true,
      buttonText: "MESSAGE NOW"
    }
  ];

  const technologies = [
    "JavaScript", "HTML5", "CSS3", "Bootstrap", "React", "Tailwind CSS", 
    "PHP", "Node.js", "Express", "EJS", "Python (Flask)", "Java", 
    "Jinja2", "MySQL", "PostgreSQL", "MongoDB", "Next.js"
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
    <div className="pricing">
      {/* Header */}
      <section className="pricing-header">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h1>My Web System Pricing</h1>
            <p>
              We specialize in building modern web systems using a wide range of technologies including{' '}
              {technologies.slice(0, 8).join(', ')}, and more. We have expertise in the MERN stack for full-stack development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="pricing-plans">
        <div className="container">
          <div className="plans-grid">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`plan-card ${plan.popular ? 'popular' : ''}`}
              >
                {plan.popular && (
                  <div className="popular-badge">
                    <FaStar />
                    Most Popular
                  </div>
                )}
                
                <div className="plan-header">
                  <div className="plan-icon">{plan.icon}</div>
                  <h3>{plan.name}</h3>
                  <div className="plan-price">
                    <span className="price">{plan.price}</span>
                  </div>
                  <p className="plan-description">{plan.description}</p>
                </div>

                <ul className="plan-features">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>
                      <FaCheck className="check-icon" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link to="/request" className={`plan-button ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}>
                  {plan.buttonText}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Overview */}
      <section className="technologies-overview">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Technologies We Use</h2>
            <p>We work with the latest technologies to deliver modern, scalable solutions</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="technologies-grid"
          >
            {technologies.map((tech, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="tech-tag"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="services-overview">
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
                className="service-card"
              >
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-price">{service.price}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="additional-services">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Additional Services</h2>
            <p>Enhance your project with our specialized services</p>
          </motion.div>

          <div className="additional-grid">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="additional-card"
            >
              <div className="additional-icon">
                <FaFileAlt />
              </div>
              <h3>Documentation & Diagrams</h3>
              <p>Complete documentation including SRS, ERD, and UML diagrams</p>
              <span className="price">Included in Capstone Projects</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="additional-card"
            >
              <div className="additional-icon">
                <FaShieldAlt />
              </div>
              <h3>Security & Authentication</h3>
              <p>Basic security implementation and user authentication</p>
              <span className="price">Included in Capstone Projects</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="additional-card"
            >
              <div className="additional-icon">
                <FaComments />
              </div>
              <h3>Free Consultation</h3>
              <p>Initial consultation to understand your project requirements</p>
              <span className="price">Free</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="additional-card"
            >
              <div className="additional-icon">
                <FaMobileAlt />
              </div>
              <h3>Mobile Responsiveness</h3>
              <p>Ensure your system works perfectly on all devices</p>
              <span className="price">Included in Capstone Projects</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pricing-cta">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="cta-content"
          >
            <h2>Ready to Get Started?</h2>
            <p>Let us know how we can help you with your project</p>
            <div className="cta-buttons">
              <Link to="/identify" className="btn-primary">
                Get Started <FaArrowRight />
              </Link>
              <Link to="/about" className="btn-secondary">
                Learn More
              </Link>
            </div>
            <div className="contact-methods-cta">
              <p>Or contact us directly:</p>
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
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Pricing; 