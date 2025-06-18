const prisma = require('../generated/prisma-client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login user and generate a JWT token
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await prisma.user({ email });

        // If user not found, return error
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Compare the entered password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // If password is invalid, return error
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });

        // Set token in cookie or session, or send it in the response
        res.cookie('token', token, { httpOnly: true });

        // Redirect to home page after successful login
        res.redirect('/home');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed. Please try again.' });
    }
};

module.exports = { loginUser };
