const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const app = express();
//const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sample data for dynamic rendering
const portfolioData = {
    name: 'Harsh Raj',
    title: '',
    description: 'Digital Creator and Programmer with 4 years of experience',
    skills: ['Python', 'Machine Learning', 'JavaScript', 'C++', 'SQL', 'React'],
    projects: [
        {
            title: 'Codej',
            description: 'Innovative IT solutions and projects',
            github: 'https://github.com/HarshRaj239531'
        }
    ],
    experiences: [
        {
            role: '',
            duration: '2022 - Present',
            description: 'Led the development of innovative IT solutions and startup products, focusing on scalable and user-centric applications.'
        }
    ],
    about: [
        'My name is Harsh Raj, I am 21 years old. I am a passionate digital creator and programmer with 4 years of experience in building innovative solutions. As the Founder and CEO of Codej, I focus on developing impactful IT projects and startups.',
        'My expertise spans Python, JavaScript, C++, SQL, and React, with a strong emphasis on creating scalable and user-friendly applications. I am dedicated to continuous learning and pushing the boundaries of technology.'
    ]
};

// Routes
app.get('/',async (req, res) => {
    res.render('index', { data: portfolioData });
});

app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
    const contact = { name, email, message, timestamp: new Date().toISOString() };

    try {
        const contacts = JSON.parse(await fs.readFile(path.join(__dirname, 'data', 'contacts.json'), 'utf8') || '[]');
        contacts.push(contact);
        await fs.writeFile(path.join(__dirname, 'data', 'contacts.json'), JSON.stringify(contacts, null, 2));
        res.json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ success: false, message: 'Failed to send message.' });
    }
});

/*app.listen(port, () => {
    console.log(`Server running at hraj.unaux.com`);
});
*/