const db = require('./db.js');

const updates = [
    {
        code: 'IT',
        benefits: 'High salary potential and rapid career growth, Vast remote work options globaly, Versatile skills applicable in finance healthcare and tech, Constant innovation ensures lifelong learning opportunities'
    },
    {
        code: 'CSC',
        benefits: 'Strong foundation in both hardware and software systems, Global career opportunities in top tech firms, Essential pathway for leadership roles in technology, Ability to create scalable solutions affecting millions'
    },
    {
        code: 'AIDS',
        benefits: 'Cutting-edge career path in a rapidly evolving field, High demand in AI-driven industries and startups, Opportunity to work on the forefront of future technology, Impact across diverse sectors from finance to healthcare'
    },
    {
        code: 'EEE',
        benefits: 'Key role in the renewable energy and sustainability sector, Diverse opportunities in power grid and energy management, Essential for the electric vehicle (EV) revolution, Foundation for developing smart home and city technologies'
    },
    {
        code: 'ECE',
        benefits: 'Critical role in the telecommunications advancement, Acts as a bridge between software logic and hardware reliability, Opportunities in the booming semiconductor and IoT industries, Integral to modern consumer electronics development'
    },
    {
        code: 'CYBER',
        benefits: 'High demand due to increasing digital threats worldwide, Critical role in national security and corporate data protection, Lucrative consulting and ethical hacking opportunities, Dynamic work environment ensuring no two days are alike'
    },
    {
        code: 'BIO',
        benefits: 'Impactful career in healthcare and pharmaceutical sectors, Research-oriented field with potential to cure diseases, Opportunity to improve quality of life through bio-innovation, Rapidly growing industry with diverse biotech applications'
    },
    {
        code: 'MECH',
        benefits: 'Evergreen engineering branch with stability, Essential for manufacturing automation and automotive industries, Versatile career paths from robotics to thermal systems, Hands-on work involving design prototyping and testing'
    },
    {
        code: 'CIVIL',
        benefits: 'Stable government and public sector job opportunities, Essential for infrastructure development and urbanization, Tangible impact on society through long-lasting construction, Opportunities to work on monumental global projects'
    },
    {
        code: 'CHEM',
        benefits: 'High paying jobs in oil & gas and pharmaceuticals, Crucial for sustainable manufacturing and green energy, Versatile role in process engineering and materials science, Pathway to research and development in new materials'
    },
    {
        code: 'AERO',
        benefits: 'Exciting career in aviation defense and space sectors, Opportunity to work on satellite and space exploration missions, Engaging high-tech engineering challenges, Global career prospects with major aerospace giants'
    },
    {
        code: 'AGRI',
        benefits: 'Direct impact on solving global food security issues, Perfect blend of biology nature and advanced technology, Crucial for sustainable farming and resource management, Opportunities in agro-tech startups and innovation'
    },
    {
        code: 'MARINE',
        benefits: 'Opportunity to travel the world while working, High tax-free salary potential in merchant navy, Adventurous and unique career path at sea, Strong demand in global shipping and logistics'
    },
    {
        code: 'AUTO',
        benefits: 'Ideal career for passionate car enthusiasts, Booming career in the Electric Vehicle (EV) industry, Forefront of autonomous driving and smart transport technology, Opportunities in high-performance and luxury vehicle design'
    },
    {
        code: 'BIO-MED',
        benefits: 'Directly contribute to saving lives through medical technology, High innovation field bridging medicine and engineering, developing life-saving devices and prosthetics, Growing demand in hospitals and medical device companies'
    },
    {
        code: 'ROBO',
        benefits: 'Future-proof career in the age of automation, High demand in manufacturing logistics and consumer tech, Interdisciplinary field combining AI mechanics and electronics, Chance to shape the future of human-robot interaction'
    },
    {
        code: 'ENV',
        benefits: 'Global impact on fighting climate change, Focus on sustainability renewable energy and green tech, Essential for regulatory compliance and public health protection, Growing importance in corporate social responsibility (CSR)'
    },
    {
        code: 'FASHION',
        benefits: 'Creative career in the dynamic glamour industry, Opportunities for global travel and trend setting, Combining artistic expression with commercial business success, Ability to launch independent brands or labels'
    },
    {
        code: 'TEXTILE',
        benefits: 'Strong presence in the global manufacturing sector, Key role in export economy and material science, Opportunities in technical textiles and smart fabrics, Essential industry for fashion and industrial applications'
    }
];

const updateBenefits = async () => {
    console.log('Updating benefits...');
    for (const update of updates) {
        try {
            await db.query(`UPDATE courses SET benefits = ? WHERE course_code = ?`, [update.benefits, update.code]);
            console.log(`Updated benefits for: ${update.code}`);
        } catch (err) {
            console.error(`Error updating ${update.code}:`, err.message);
        }
    }
    console.log('Update complete.');
    process.exit();
};

updateBenefits();
