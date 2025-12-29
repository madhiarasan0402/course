const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

        const user = rows[0];
        if (password !== user.password) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, username: user.username, message: `${user.username} logged in successfully` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if user exists
        const [exists] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (exists.length > 0) return res.status(400).json({ message: 'Username already taken' });

        // Insert new user
        const [result] = await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);

        // Auto login or just return success
        const token = jwt.sign({ id: result.insertId, username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token, username, message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
