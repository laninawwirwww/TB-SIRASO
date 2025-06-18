const express = require('express');
const router = express.Router();
const { registerUser } = require('../controller/registerController');
const { loginUser } = require('../controller/loginController');

// Register Route
router.post('/register', registerUser);

// Login Route
router.post('/login', loginUser);

module.exports = router;
