const db = require('./db');

const courses = [
    {
        course_code: 'CHEM',
        course_name: 'Chemical Engineering',
        description: 'Branch that applies physical sciences and life sciences together with applied mathematics and economics to produce, transform, transport, and properly use chemicals, materials and energy.',
        benefits: 'High paying jobs in oil & gas, pharmaceuticals, and manufacturing.',
        scope: 'Chemical Engineer, Process Engineer, Plant Manager.',
        roadmap: 'Sem 1: Chemistry, Sem 2: Material Science, Sem 3: Thermodynamics, Sem 4: Fluid Mechanics, Sem 5: Heat Transfer, Sem 6: Reactions, Sem 7: Process Control, Sem 8: Project',
        keywords: 'chemical, chemistry, oil, gas, manufacturing'
    },
    {
        course_code: 'AERO',
        course_name: 'Aerospace Engineering',
        description: 'Primary field of engineering concerned with the development of aircraft and spacecraft.',
        benefits: 'Exciting work in aviation, defense, and space exploration.',
        scope: 'Aerospace Engineer, Flight Analyst, Sytems Engineer.',
        roadmap: 'Sem 1: Physics, Sem 2: Aero Basics, Sem 3: Aerodynamics, Sem 4: Propulsion, Sem 5: Flight Mechanics, Sem 6: Structures, Sem 7: Avionics, Sem 8: Project',
        keywords: 'space, aircraft, flying, rocket, design'
    },
    {
        course_code: 'AGRI',
        course_name: 'Agricultural Engineering',
        description: 'Engineering discipline that applies engineering science and technology to agricultural production and processing.',
        benefits: 'Impact on food security, blend of nature and technology.',
        scope: 'Agricultural Engineer, Irrigation Specialist, Food Processing.',
        roadmap: 'Sem 1: Biology, Sem 2: Soil Science, Sem 3: Hydrology, Sem 4: Farm Machinery, Sem 5: Processing, Sem 6: Soil Conservation, Sem 7: Bio-Renewable, Sem 8: Project',
        keywords: 'farming, nature, food, plants, agriculture'
    },
    {
        course_code: 'MARINE',
        course_name: 'Marine Engineering',
        description: 'Discipline of engineering that deals with the design, development, production and maintenance of the equipments used at sea.',
        benefits: 'Travel the world, high salary in merchant navy.',
        scope: 'Marine Engineer, Ship Captain, Navy Office.',
        roadmap: 'Sem 1: Physics, Sem 2: Ship Basics, Sem 3: Marine Mechanics, Sem 4: Fluid Dynamics, Sem 5: Naval Architecture, Sem 6: Ship Safety, Sem 7: Automation, Sem 8: Project',
        keywords: 'sea, ship, ocean, travel, navy'
    },
    {
        course_code: 'AUTO',
        course_name: 'Automobile Engineering',
        description: 'Branch of engineering which deals with the designing, developing, manufacturing, testing and repairing and servicing automobiles.',
        benefits: 'Passion for cars, booming EV industry.',
        scope: 'Automotive Engineer, Design Engineer, Service Manager.',
        roadmap: 'Sem 1: Mechanics, Sem 2: IC Engines, Sem 3: Thermodynamics, Sem 4: Auto Chassis, Sem 5: EV Tech, Sem 6: Vehicle Dynamics, Sem 7: Safety, Sem 8: Project',
        keywords: 'cars, bikes, engine, vehicle, driving'
    },
    {
        course_code: 'BIO-MED',
        course_name: 'Biomedical Engineering',
        description: 'Application of engineering principles and design concepts to medicine and biology for healthcare purposes (e.g., diagnostic or therapeutic).',
        benefits: 'Saving lives through technology, high innovation.',
        scope: 'Biomedical Engineer, Clinical Engineer, Researcher.',
        roadmap: 'Sem 1: Anatomy, Sem 2: Sensors, Sem 3: Bio-Signals, Sem 4: Med Instruments, Sem 5: Biomechanics, Sem 6: Imaging, Sem 7: Prosthetics, Sem 8: Project',
        keywords: 'doctor, medicine, health, hospital, biology'
    },
    {
        course_code: 'ROBO',
        course_name: 'Robotics and Automation',
        description: 'Interdisciplinary branch of engineering and science that includes mechanical engineering, electronic engineering, information engineering, computer science.',
        benefits: 'Future-proof career, high-tech industry demand.',
        scope: 'Robotics Engineer, Automation Specialist, Control Engineer.',
        roadmap: 'Sem 1: C++, Sem 2: Electronics, Sem 3: Kinematics, Sem 4: Sensors, Sem 5: AI for Robotics, Sem 6: Control Systems, Sem 7: Industrial Auto, Sem 8: Project',
        keywords: 'robot, ai, automation, machines, future'
    },
    {
        course_code: 'ENV',
        course_name: 'Environmental Engineering',
        description: 'Job of protecting people from the effects of adverse environmental effects, such as pollution, as well as improving environmental quality.',
        benefits: 'Global impact, sustainability focus.',
        scope: 'Environmental Consultant, Water Engineer, Green Tech.',
        roadmap: 'Sem 1: Chemistry, Sem 2: Ecology, Sem 3: Water Treatment, Sem 4: Air Pollution, Sem 5: Waste Mgmt, Sem 6: Sustainable Design, Sem 7: EIA, Sem 8: Project',
        keywords: 'nature, green, earth, sustainable, environment'
    },
    {
        course_code: 'FASHION',
        course_name: 'Fashion Technology',
        description: 'Art of applying design, aesthetics, clothing construction and natural beauty to clothing and its accessories.',
        benefits: 'Creative career, glamour industry, global travel.',
        scope: 'Fashion Designer, Merchandiser, Apparel Manager.',
        roadmap: 'Sem 1: Drawing, Sem 2: Textiles, Sem 3: Pattern Making, Sem 4: Fashion History, Sem 5: Garment Tech, Sem 6: CAD for Fashion, Sem 7: Retail, Sem 8: Project',
        keywords: 'design, art, clothes, style, creative'
    },
    {
        course_code: 'TEXTILE',
        course_name: 'Textile Technology',
        description: 'Study of textile materials and their production, including fibers, yarns, fabrics, and finishes.',
        benefits: 'Strong manufacturing sector, exports focus.',
        scope: 'Textile Engineer, Production Manager, Quality Tech.',
        roadmap: 'Sem 1: Fibers, Sem 2: Yarn Mfg, Sem 3: Fabric Mfg, Sem 4: Dyeing, Sem 5: Testing, Sem 6: Technical Textiles, Sem 7: Garment Tech, Sem 8: Project',
        keywords: 'fabric, clothes, manufacturing, material'
    }
];

const seed = async () => {
    console.log('Seeding courses...');
    for (const course of courses) {
        try {
            await db.query(`
                INSERT IGNORE INTO courses 
                (course_code, course_name, description, benefits, scope, roadmap, keywords) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `, [
                course.course_code,
                course.course_name,
                course.description,
                course.benefits,
                course.scope,
                course.roadmap,
                course.keywords
            ]);
            console.log(`Added/Checked: ${course.course_name}`);
        } catch (err) {
            console.error(`Error adding ${course.course_name}:`, err.message);
        }
    }
    console.log('Seeding complete.');
    process.exit();
};

seed();
