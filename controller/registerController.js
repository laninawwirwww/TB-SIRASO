const prisma = require('../generated/prisma-client');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in the database
        const newUser = await prisma.createUser({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        // Redirect to login page after successful registration
        res.status(201).redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Registration failed. Please try again.' });
    }
};

module.exports = { registerUser };
