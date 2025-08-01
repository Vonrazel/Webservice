import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaCode } from 'react-icons/fa';
import './App.css';

// Components
import Home from './components/Home';
import Pricing from './components/Pricing';
import About from './components/About';
import ReviewForm from './components/ReviewForm';
import AnalyticsDashboard from './components/AnalyticsDashboard';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark' : ''}`}>
        {/* Navigation */}
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              <FaCode className="logo-icon" />
              <span>CAPSTONE & THESIS</span>
            </Link>

            <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
              <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/pricing" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Pricing
              </Link>
              <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link to="/review" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Review
              </Link>
            </div>

            <div className="nav-actions">
              <button className="theme-toggle" onClick={toggleDarkMode}>
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
              <div className="hamburger" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="main-content">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/review" element={<ReviewForm />} />
            </Routes>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>CAPSTONE & THESIS</h3>
              <p>Professional development services for your academic and business needs.</p>
            </div>
            <div className="footer-section">
              <h4>Services</h4>
              <ul>
                <li>System Development</li>
                <li>Website Development</li>
                <li>Database Design</li>
                <li>API Integration</li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>Email: info@capstonethesis.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 CAPSTONE & THESIS Development Services. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
