const express = require('express');
const router = express.Router();

// Import controllers
const { getHello, getUsers } = require('../controllers/userController');

// Routes
router.get('/hello', getHello);
router.get('/users', getUsers);

module.exports = router; 