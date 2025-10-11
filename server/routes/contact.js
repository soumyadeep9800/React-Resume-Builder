const express = require('express');
const { Resend } = require('resend');
const router = express.Router();
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/send-message', async (req, res) => {
  const { name, email, message } = req.body;
  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; background:#f9f9f9; border-radius:10px; border:1px solid #ddd;">
        <h2 style="color:#4CAF50;">New Contact Form Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message.replace(/\n/g,'<br>')}</p>
        <hr style="margin:20px 0;" />
        <p style="font-size:13px; color:#999;">This message was sent via Resume-Builder Contact Form.</p>
      </div>
    `;

    await resend.emails.send({
      from:'Resume Builder <onboarding@resend.dev>', // verified sender
      to: process.env.EMAIL_USER, // your receiving email
      subject: `Contact Form Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`, // fallback for plain text
      html: htmlTemplate,
    });

    console.log(`✅ Message from ${name} sent successfully`);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('❌ Email send error:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

module.exports = router;
