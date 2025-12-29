const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

router.post('/submit', upload.fields([
    { name: 'marksheet_10th', maxCount: 1 },
    { name: 'marksheet_12th', maxCount: 1 },
    { name: 'sports_cert', maxCount: 1 },
    { name: 'extra_curr_cert', maxCount: 1 }
]), async (req, res) => {
    try {
        const { username, name, age, education_path, marks_10th, marks_12th, sports_participation, sports_description, interested_keywords, extra_curricular } = req.body;

        const [users] = await db.query('SELECT id FROM users WHERE username = ?', [username]);
        if (users.length === 0) return res.status(404).json({ message: 'User not found' });
        const user_id = users[0].id;

        const marksheet_10th_path = req.files['marksheet_10th'] ? req.files['marksheet_10th'][0].path : null;
        const marksheet_12th_path = req.files['marksheet_12th'] ? req.files['marksheet_12th'][0].path : null;
        const sports_cert_path = req.files['sports_cert'] ? req.files['sports_cert'][0].path : null;
        const extra_curricular_cert_path = req.files['extra_curr_cert'] ? req.files['extra_curr_cert'][0].path : null;

        await db.query(`
            INSERT INTO student_details 
            (user_id, name, age, education_path, marks_10th, marks_12th, sports_participation, sports_description, interested_keywords, extra_curricular, extra_curricular_cert_path, marksheet_10th_path, marksheet_12th_path, sports_cert_path)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [user_id, name, age, education_path, marks_10th, marks_12th || null, sports_participation, sports_description, interested_keywords, extra_curricular, extra_curricular_cert_path, marksheet_10th_path, marksheet_12th_path, sports_cert_path]);

        res.json({ message: 'Details submitted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

router.get('/details/:username', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT sd.* FROM student_details sd
            JOIN users u ON u.id = sd.user_id
            WHERE u.username = ?
            ORDER BY sd.submission_date DESC LIMIT 1
        `, [req.params.username]);
        res.json(rows[0] || null);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
