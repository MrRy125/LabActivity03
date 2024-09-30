// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Initialize the Express application
const app = express();
app.use(bodyParser.json());

// In-memory array to store user data
const users = [];

// Define the port
const PORT = 3000;

// POST /register endpoint
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Use a switch statement to handle different validation checks
    switch (true) {
        // Check if any field is missing
        case !name || !email || !password:
            return res.status(400).json({ error: 'All fields are required.' });

        // Validate email format using a simple regex
        case !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email):
            return res.status(400).json({ error: 'Invalid email format.' });

        // 3 password length
        case password.length < 6:
            return res.status(400).json({ error: 'Password must be at least 6 characters long.' });

        // Check for unique email
        case users.some(user => user.email === email):
            return res.status(409).json({ error: 'Email already exists.' });

        // Default case when all validations pass
        default:
            // Add the user to the users array
            users.push({ name, email, password });
            return res.status(201).json({ message: 'User registered successfully' });
    }
});

// GET /users endpoint to retrieve all registered users
app.get('/users', (req, res) => {
    return res.status(200).json(users);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});