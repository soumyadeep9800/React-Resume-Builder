require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS  // App Password, NOT your Gmail password
    }
});

const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'your-email@gmail.com',  // Replace with the email you want to test
    subject: 'Test Email from Resume-Builder',
    html: `<p>Hello, this is a test email from <strong>Resume-Builder</strong>!</p>`
};

transporter.sendMail(mailOptions)
    .then(() => console.log('✅ Test email sent successfully!'))
    .catch(err => console.error('❌ Error sending email:', err));
