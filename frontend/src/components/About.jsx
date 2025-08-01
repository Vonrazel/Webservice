import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaAward, FaProjectDiagram, FaHandshake, FaLightbulb, FaRocket, FaCode, FaDatabase, FaMobile, FaGlobe, FaLaptop } from 'react-icons/fa';

const About = () => {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Lead Developer",
      expertise: "Full-Stack Development",
      experience: "8+ years",
      icon: <FaCode />
    },
    {
      name: "Sarah Chen",
      role: "Database Architect",
      expertise: "Database Design & Optimization",
      experience: "6+ years",
      icon: <FaDatabase />
    },
    {
      name: "Mike Rodriguez",
      role: "Mobile Developer",
      expertise: "iOS & Android Development",
      experience: "5+ years",
      icon: <FaMobile />
    },
    {
      name: "Emily Davis",
      role: "UI/UX Designer",
      expertise: "User Experience Design",
      experience: "4+ years",
      icon: <FaGlobe />
    }
  ];

  const achievements = [
    {
      number: "150+",
      label: "Projects Completed",
      icon: <FaProjectDiagram />
    },
    {
      number: "98%",
      label: "Client Satisfaction",
      icon: <FaHandshake />
    },
    {
      number: "5+",
      label: "Years Experience",
      icon: <FaAward />
    },
    {
      number: "24/7",
      label: "Support Available",
      icon: <FaUsers />
    }
  ];

  const values = [
    {
      icon: <FaLightbulb />,
      title: "Innovation",
      description: "We stay ahead of technology trends to deliver cutting-edge solutions"
    },
    {
      icon: <FaHandshake />,
      title: "Reliability",
      description: "Consistent delivery of high-quality projects on time and within budget"
    },
    {
      icon: <FaUsers />,
      title: "Collaboration",
      description: "Working closely with clients to understand and exceed their expectations"
    },
    {
      icon: <FaRocket />,
      title: "Excellence",
      description: "Commitment to delivering exceptional results that drive business growth"
    }
  ];

  const techStack = {
    frontend: [
      { name: "REACT", color: "bg-blue-800", icon: "⚛️" },
      { name: "ANGULAR", color: "bg-red-600", icon: "🅰️" },
      { name: "TYPESCRIPT", color: "bg-blue-600", icon: "TS" },
      { name: "JAVASCRIPT", color: "bg-yellow-500", icon: "JS" },
      { name: "HTML5", color: "bg-orange-500", icon: "HTML" },
      { name: "CSS3", color: "bg-blue-500", icon: "CSS" },
      { name: "TAILWIND CSS", color: "bg-teal-500", icon: "TW" },
      { name: "BOOTSTRAP", color: "bg-purple-600", icon: "B" },
      { name: "VITE", color: "bg-purple-400", icon: "⚡" }
    ],
    backend: [
      { name: "NODE.JS", color: "bg-green-600", icon: "🟢" },
      { name: "EXPRESS.JS", color: "bg-gray-800", icon: "ex" },
      { name: "PYTHON", color: "bg-blue-500", icon: "🐍" },
      { name: "FLASK", color: "bg-gray-800", icon: "🔥" },
      { name: "PHP", color: "bg-purple-600", icon: "PHP" },
      { name: "JAVA", color: "bg-teal-600", icon: "☕" },
      { name: "SPRING BOOT", color: "bg-green-500", icon: "🌱" },
      { name: "C#", color: "bg-green-700", icon: "C#" },
      { name: ".NET VB.NET", color: "bg-purple-700", icon: ".NET" },
      { name: "C++", color: "bg-blue-600", icon: "C++" }
    ]
  };

  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="about-hero-content"
          >
            <h1>About CAPSTONE & THESIS</h1>
            <p className="hero-subtitle">
              We are a team of passionate developers and designers dedicated to transforming ideas into powerful digital solutions. 
              Our mission is to help students and businesses achieve their goals through innovative technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="container">
          <div className="mission-vision-grid">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mission-card"
            >
              <h2>Our Mission</h2>
              <p>
                To provide exceptional development services that empower students and businesses to succeed in the digital age. 
                We believe in creating solutions that not only meet current needs but also scale for future growth.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="vision-card"
            >
              <h2>Our Vision</h2>
              <p>
                To be the leading development partner for academic and business projects, known for innovation, 
                reliability, and exceptional customer service. We strive to make technology accessible and impactful.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Expertise */}
      <section className="expertise-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Our Expertise</h2>
            <p>Professional system and website development services tailored for academic and business needs</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="expertise-content"
          >
            <div className="expertise-intro">
              <p className="expertise-description">
                We offer professional system and website development services tailored to meet both academic and business needs. 
                As fourth-year BSIT students, we are passionate about Information Technology and skilled in full-stack development. 
                Our expertise spans front-end technologies like React, TypeScript, JavaScript, HTML, CSS, Bootstrap, Tailwind, and Vite. 
                On the back end, we work with Node.js, Python, PHP, Java, Flask, Spring Boot, C#, VB.NET, and C++. 
                We are also proficient in managing databases such as MongoDB, PostgreSQL, MySQL, and PHPMyAdmin. 
                With hands-on experience in freelance design, we create visually engaging content and static ad designs. 
                Committed to quality, collaboration, and continuous learning, we turn your ideas into scalable, enterprise-grade digital solutions.
              </p>
            </div>

            <div className="expertise-highlights">
              <div className="highlight-card">
                <div className="highlight-icon">🎓</div>
                <h3>Academic Excellence</h3>
                <p>Fourth-year BSIT students with deep understanding of Information Technology principles</p>
              </div>
              
              <div className="highlight-card">
                <div className="highlight-icon">💻</div>
                <h3>Full-Stack Development</h3>
                <p>Comprehensive expertise in both frontend and backend technologies</p>
              </div>
              
              <div className="highlight-card">
                <div className="highlight-icon">🎨</div>
                <h3>Design Expertise</h3>
                <p>Freelance design experience creating visually engaging content and static ad designs</p>
              </div>
              
              <div className="highlight-card">
                <div className="highlight-icon">🚀</div>
                <h3>Enterprise Solutions</h3>
                <p>Scalable, enterprise-grade digital solutions for business and academic projects</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="philosophy-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Our Philosophy</h2>
            <p>Building a more collaborative and empowering tech community</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="philosophy-content"
          >
            <div className="philosophy-main">
              <div className="philosophy-text">
                <p>
                  We believe in uplifting others, especially fellow IT and Computer Science students who are still learning and may struggle with coding or building systems. Our goal is not to compete or judge — but to support. We offer help not just to deliver solutions, but to encourage growth, understanding, and confidence.
                </p>
                <p>
                  Every project we complete is a chance for someone to learn, improve, and move forward. We're not here to gatekeep knowledge or add toxicity to the industry — we're here to build a more collaborative and empowering tech community. We've been there, and we know that sometimes, all it takes is a little guidance.
                </p>
                <p>
                  By helping others now, we help shape a stronger, more inclusive future in IT.
                </p>
              </div>
            </div>

            <div className="philosophy-principles">
              <div className="principle-card">
                <div className="principle-icon">🤝</div>
                <h3>Support Over Competition</h3>
                <p>We focus on helping rather than competing, creating a supportive environment for learning</p>
              </div>
              
              <div className="principle-card">
                <div className="principle-icon">🌱</div>
                <h3>Growth & Understanding</h3>
                <p>Every solution we deliver is an opportunity for learning and skill development</p>
              </div>
              
              <div className="principle-card">
                <div className="principle-icon">💡</div>
                <h3>Knowledge Sharing</h3>
                <p>We believe in open knowledge sharing, not gatekeeping valuable information</p>
              </div>
              
              <div className="principle-card">
                <div className="principle-icon">🌟</div>
                <h3>Inclusive Future</h3>
                <p>Building a stronger, more collaborative tech community for everyone</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements */}
      <section className="achievements">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Our Achievements</h2>
            <p>Numbers that speak for themselves</p>
          </motion.div>

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

      {/* Values */}
      <section className="values">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Our Values</h2>
            <p>The principles that guide everything we do</p>
          </motion.div>

          <div className="values-grid">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="value-card"
              >
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="tech-stack">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <div className="header-with-icon">
              <FaLaptop className="section-icon" />
              <h2>Tech Stack</h2>
            </div>
            <p>The technologies and languages we master</p>
          </motion.div>

          <div className="tech-stack-content">
            {/* Frontend Technologies */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="tech-category"
            >
              <h3>Frontend</h3>
              <div className="tech-grid">
                {techStack.frontend.map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`tech-tag ${tech.color}`}
                  >
                    <span className="tech-icon">{tech.icon}</span>
                    <span className="tech-name">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Backend Technologies */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="tech-category"
            >
              <h3>Backend</h3>
              <div className="tech-grid">
                {techStack.backend.map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`tech-tag ${tech.color}`}
                  >
                    <span className="tech-icon">{tech.icon}</span>
                    <span className="tech-name">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="team">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Our Team</h2>
            <p>Meet the experts behind our success</p>
          </motion.div>

          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="team-card"
              >
                <div className="member-icon">{member.icon}</div>
                <h3>{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-expertise">{member.expertise}</p>
                <p className="member-experience">{member.experience}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="portfolio-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="portfolio-content"
          >
            <h2>Our Portfolio</h2>
            <p>Explore our latest projects and see the quality of our work</p>
            <div className="portfolio-features">
              <div className="portfolio-feature">
                <FaProjectDiagram />
                <span>150+ Projects Completed</span>
              </div>
              <div className="portfolio-feature">
                <FaAward />
                <span>Multiple Award-Winning Solutions</span>
              </div>
              <div className="portfolio-feature">
                <FaHandshake />
                <span>98% Client Satisfaction Rate</span>
              </div>
            </div>
            <button className="btn-primary">
              View Portfolio
            </button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="cta-content"
          >
            <h2>Ready to Work Together?</h2>
            <p>Let's discuss your project and create something amazing</p>
            <div className="cta-buttons">
              <button className="btn-primary">Start Your Project</button>
              <button className="btn-secondary">Contact Us</button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About; 