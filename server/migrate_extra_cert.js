const db = require('./db');

async function migrate() {
    try {
        console.log('Running migration...');
        await db.query("ALTER TABLE student_details ADD COLUMN extra_curricular_cert_path VARCHAR(255) AFTER extra_curricular;");
        console.log('Migration successful: Added extra_curricular_cert_path column.');
        process.exit(0);
    } catch (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
            console.log('Column already exists.');
        } else {
            console.error('Migration failed:', err);
        }
        process.exit(1);
    }
}

migrate();
