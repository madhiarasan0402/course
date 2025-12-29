CREATE DATABASE IF NOT EXISTS college_admission;
USE college_admission;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT IGNORE INTO users (username, password) VALUES 
('madhi', 'password123!'),
('pragadesh', 'password123!'),
('balaji', 'password123!');

CREATE TABLE IF NOT EXISTS student_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100),
    age INT,
    education_path ENUM('11th', 'Diploma'),
    marks_10th FLOAT,
    marks_12th FLOAT,
    sports_participation ENUM('Yes', 'No'),
    sports_description TEXT,
    interested_keywords TEXT,
    extra_curricular TEXT,
    extra_curricular_cert_path VARCHAR(255),
    marksheet_10th_path VARCHAR(255),
    marksheet_12th_path VARCHAR(255),
    sports_cert_path VARCHAR(255),
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_code VARCHAR(20) UNIQUE,
    course_name VARCHAR(100),
    description TEXT,
    benefits TEXT,
    scope TEXT,
    roadmap TEXT,
    keywords TEXT
);

INSERT IGNORE INTO courses (course_code, course_name, description, benefits, scope, roadmap, keywords) VALUES 
('IT', 'Information Technology', 'Focuses on computing technology, software development, and network management.', 'High salary, remote work options, versatile skills.', 'Web Dev, System Admin, Data Analyst.', 'Sem 1: C++, Sem 2: Java, Sem 3: DSA, Sem 4: OS, Sem 5: DB, Sem 6: Web, Sem 7: Cloud, Sem 8: Project', 'coding, software, web, computer'),
('CSC', 'Computer Science and Engineering', 'Core engineering discipline that integrates computer science with electronic engineering.', 'Strong foundation in hardware and software, global opportunities.', 'Software Engineer, R&D, System Architect.', 'Sem 1: Physics, Sem 2: Python, Sem 3: Digital Logic, Sem 4: Algo, Sem 5: Networks, Sem 6: AI, Sem 7: Security, Sem 8: Project', 'coding, computer, algorithm, hardware'),
('AIDS', 'Artificial Intelligence and Data Science', 'Specialized field focusing on AI, ML, and Data Analytics.', 'Cutting-edge career, high demand in future tech.', 'AI Engineer, Data Scientist, ML Specialist.', 'Sem 1: Math, Sem 2: Python, Sem 3: Stats, Sem 4: ML, Sem 5: Deep Learning, Sem 6: NLP, Sem 7: Big Data, Sem 8: Project', 'ai, data, intelligence, analytics'),
('EEE', 'Electrical and Electronics Engineering', 'Deals with electricity, electronics, and electromagnetism.', 'Opportunities in power sector, electronics design.', 'Electrical Engineer, Power Grid, Control Systems.', 'Sem 1: Circuits, Sem 2: Fields, Sem 3: Machines, Sem 4: Power Systems, Sem 5: Control, Sem 6: Power Electronics, Sem 7: Drives, Sem 8: Project', 'electrical, power, circuits, energy'),
('ECE', 'Electronics and Communication Engineering', 'Focuses on electronic devices, circuits, and communication equipment.', 'Bridge between hardware and software, telecom industry jobs.', 'Electronics Engineer, Telecom, VLSI Design.', 'Sem 1: Electronics, Sem 2: Signals, Sem 3: Digital, Sem 4: Analog, Sem 5: Microprocessors, Sem 6: VLSI, Sem 7: Embedded, Sem 8: Project', 'electronics, communication, hardware, telecom'),
('CYBER', 'Cyber Security', 'Protection of computer systems and networks from information disclosure, theft of or damage.', 'Critical for national security and corporate data.', 'Security Analyst, Pentester, CISO.', 'Sem 1: Networking, Sem 2: Scripting, Sem 3: Cryptography, Sem 4: NetSec, Sem 5: Forensics, Sem 6: AppSec, Sem 7: CloudSec, Sem 8: Project', 'security, hacking, network, protection'),
('BIO', 'Biotechnology', 'Use of living systems and organisms to develop or make products.', 'Research oriented, pharma and healthcare impact.', 'Biotech Researcher, Lab Technician, Quality Control.', 'Sem 1: Biology, Sem 2: Chemistry, Sem 3: Genetics, Sem 4: MicroBio, Sem 5: BioChem, Sem 6: Immuno, Sem 7: BioInformatics, Sem 8: Project', 'biology, nature, medicine, research'),
('MECH', 'Mechanical Engineering', 'Engineering branch that combines engineering physics and mathematics principles with materials science.', 'Evergreen branch, manufacturing and auto industry.', 'Mechanical Engineer, Design, Manufacturing.', 'Sem 1: Mechanics, Sem 2: Thermo, Sem 3: Fluids, Sem 4: DOM, Sem 5: Heat Transfer, Sem 6: CAD/CAM, Sem 7: Auto, Sem 8: Project', 'mechanical, machines, auto, manufacturing'),
('CIVIL', 'Civil Engineering', 'Design, construction, and maintenance of the physical and naturally built environment.', 'Government jobs, construction sector, tangible impact.', 'Civil Engineer, Structural Engineer, Surveyor.', 'Sem 1: Mechanics, Sem 2: Materials, Sem 3: Surveying, Sem 4: Structures, Sem 5: Soil, Sem 6: Concrete, Sem 7: Transport, Sem 8: Project', 'civil, construction, building, infrastructure');

CREATE TABLE IF NOT EXISTS recommendations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    course_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);
