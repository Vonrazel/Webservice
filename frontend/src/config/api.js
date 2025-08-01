// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  REVIEWS: `${API_BASE_URL}/api/reviews`,
  ANALYTICS: `${API_BASE_URL}/api/analytics`,
  HEALTH: `${API_BASE_URL}/api/health`,
};

export default API_BASE_URL; 