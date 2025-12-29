const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/recommend', async (req, res) => {
    const { education_path, marks_10th, marks_12th, keywords } = req.body;
    console.log('Recommendation Request:', { education_path, marks_10th, marks_12th, keywords });

    let avgMarks = 0;
    // Handle potential NaN or missing marks
    const m10 = parseFloat(marks_10th);
    const m12 = parseFloat(marks_12th);

    if (education_path === '11th') {
        // If both exist, average them. If one exists, use it. If neither, 0.
        if (!isNaN(m10) && !isNaN(m12)) avgMarks = (m10 + m12) / 2;
        else if (!isNaN(m10)) avgMarks = m10;
        else if (!isNaN(m12)) avgMarks = m12;
    } else {
        avgMarks = !isNaN(m10) ? m10 : 0;
    }

    // Split by comma OR space to handle "articulture design plan" correctly even if no commas
    const keywordList = (keywords || '').toLowerCase().split(/[, ]+/).map(k => k.trim()).filter(k => k);

    try {
        const [courses] = await db.query('SELECT * FROM courses');

        const scoredCourses = courses.map(course => {
            let score = 0;
            const courseKeywords = (course.keywords || '').toLowerCase();
            const courseCode = course.course_code;

            // 1. General Keyword Match (Database Driven)
            // Split course keywords specificially to match word-for-word if possible for higher accuracy
            const dbCourseKeywords = (course.keywords || '').toLowerCase().split(/[, ]+/).map(x => x.trim());

            keywordList.forEach(k => {
                // Exact word match in DB keywords gets high score
                if (dbCourseKeywords.includes(k)) {
                    score += 40;
                }
                // Partial match in description or name gets smaller score
                else if (k && (course.course_name.toLowerCase().includes(k) || course.description.toLowerCase().includes(k))) {
                    score += 20;
                }
            });

            // 2. Rule-Based Scoring (Booster for specific categories)
            const rules = [
                {
                    triggers: ['mech', 'car', 'engine', 'robot', 'auto', 'manufacturing', 'machine'],
                    targets: ['MECH', 'AUTO', 'ROBO', 'MARINE', 'AERO']
                },
                {
                    triggers: ['circuit', 'electric', 'current', 'power', 'electro', 'wiring'],
                    targets: ['EEE', 'ECE']
                },
                {
                    triggers: ['architecture', 'articulture', 'home', 'plan', 'design', 'cad', 'civil', 'building', 'construct'],
                    targets: ['CIVIL']
                },
                {
                    triggers: ['coding', 'tech', 'software', 'web', 'app', 'mobile', 'computer', 'program', 'develop'],
                    targets: ['IT', 'CSC', 'AIDS']
                },
                {
                    triggers: ['security', 'secure', 'hack', 'encoding', 'data', 'protect', 'cyber'],
                    targets: ['CYBER']
                },
                {
                    triggers: ['doctor', 'medicine', 'health', 'hospital', 'biology'],
                    targets: ['BIO-MED', 'BIO']
                },
                {
                    triggers: ['farm', 'agriculture', 'plants', 'food', 'nature'],
                    targets: ['AGRI']
                },
                {
                    triggers: ['fashion', 'clothes', 'style', 'textile', 'fabric'],
                    targets: ['FASHION', 'TEXTILE']
                },
                {
                    triggers: ['fly', 'flying', 'plane', 'space', 'aircraft', 'pilot', 'sky', 'rocket'],
                    targets: ['AERO']
                }
            ];

            // Check if ANY keyword matches ANY trigger
            let ruleMatched = false;
            keywordList.forEach(userWord => {
                rules.forEach(rule => {
                    if (rule.triggers.some(trigger => userWord.includes(trigger))) {
                        if (rule.targets.includes(courseCode)) {
                            score += 80; // Adjusted Booster
                            ruleMatched = true;
                        }
                    }
                });
            });

            score += avgMarks / 10;

            return { ...course, score };
        });

        scoredCourses.sort((a, b) => b.score - a.score);
        const top3 = scoredCourses.slice(0, 3);

        res.json(top3);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM courses WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Course not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
