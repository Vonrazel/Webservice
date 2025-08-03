const { RateLimiterMemory } = require('rate-limiter-flexible');

// Rate limiter for review submissions
const rateLimiter = new RateLimiterMemory({
  keyGenerator: (req) => {
    // Use IP address and email combination for rate limiting
    const ip = req.ip || req.connection.remoteAddress;
    const email = req.body.email || 'unknown';
    return `${ip}:${email}`;
  },
  points: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 3, // Number of requests
  duration: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes in milliseconds
});

const spamPrevention = async (req, res, next) => {
  try {
    await rateLimiter.consume(req);
    next();
  } catch (rejRes) {
    const secs = Math.round(rejRes.msBeforeNext / 1000) || 1;
    res.set('Retry-After', String(secs));
    res.status(429).json({
      error: 'Too many review submissions. Please try again later.',
      retryAfter: secs
    });
  }
};

// Additional spam detection logic
const detectSpam = (req, res, next) => {
  const { name, email, comments } = req.body;
  
  // Check for suspicious patterns
  const suspiciousPatterns = [
    /[A-Z]{10,}/, // Too many consecutive uppercase letters
    /(.)\1{5,}/, // Repeated characters
    /(https?:\/\/[^\s]+)/, // URLs in comments
    /[^\w\s@.-]/g // Special characters in name
  ];

  // Check name for suspicious patterns
  if (name && suspiciousPatterns.some(pattern => pattern.test(name))) {
    return res.status(400).json({ 
      error: 'Invalid name format detected' 
    });
  }

  // Check comments for spam indicators
  if (comments) {
    const commentLower = comments.toLowerCase();
    const spamIndicators = [
      'buy now',
      'click here',
      'free money',
      'make money fast',
      'work from home',
      'earn money',
      'get rich quick'
    ];

    if (spamIndicators.some(indicator => commentLower.includes(indicator))) {
      return res.status(400).json({ 
        error: 'Comment contains suspicious content' 
      });
    }

    // Check for excessive repetition
    const words = comments.split(/\s+/);
    const uniqueWords = new Set(words);
    if (words.length > 10 && uniqueWords.size / words.length < 0.3) {
      return res.status(400).json({ 
        error: 'Comment appears to be spam' 
      });
    }
  }

  // Check email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    return res.status(400).json({ 
      error: 'Invalid email format' 
    });
  }

  next();
};

module.exports = {
  spamPrevention,
  detectSpam
}; 