const adminAuth = (req, res, next) => {
  const { email, password } = req.headers;

  // Simple admin authentication (in production, use proper JWT tokens)
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (email === adminEmail && password === adminPassword) {
    req.isAdmin = true;
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized access' });
  }
};

module.exports = adminAuth; 