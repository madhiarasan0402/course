const fs = require('fs');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

// Read the SQL file
const sql = fs.readFileSync(path.join(__dirname, 'database.sql'), 'utf8');

async function seed() {
    console.log('Connecting to database...');
    try {
        // Connect without database selected first to create it
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            multipleStatements: true
        });

        console.log('Running SQL script...');
        await connection.query(sql);
        console.log('Database seeded successfully.');
        await connection.end();
        process.exit(0);
    } catch (err) {
        console.error('Seeding failed:', err.message);
        process.exit(1);
    }
}

seed();
