const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Backend API is running!' });
});

// Import routes
const apiRoutes = require('./routes/api');

// Use routes
app.use('/api', apiRoutes);

module.exports = { app, PORT }; 