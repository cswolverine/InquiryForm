const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public'))); // Serve static files

// Route to handle email
app.post('/send-mail', async (req, res) => {
    try {
        const { name, email, region, type, message } = req.body;

        console.log(name);

        if (!name || !email || !message) {
            return res.status(400).send('All fields are required.');
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'shahc5636@gmail.com',
                pass: 'ttqf ylqf kmmg urkp',
            },
            logger: true,
            debug: true,
        });

        const mailOptions = {
            from: email,
            to: 'shahc5636@gmail.com', // Your receiving email
            subject: 'New Inquiry',
            text: `Name: ${name}\nEmail: ${email}\nRegion: ${region}\nInquiry Type: ${type}\nMessage: ${message}`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent successfully!');
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send('Failed to send email.');
    }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
