const express=require('express');
const { Resend } = require('resend');
// const nodemailer=require('nodemailer');
const router=express.Router();
// const bcrypt = require('bcrypt');
require('dotenv').config();
const resend = new Resend(process.env.RESEND_API_KEY);
// const transporter=nodemailer.createTransport({
//     service:'gmail',
//     auth:{
//         user:process.env.EMAIL_USER,
//         pass:process.env.EMAIL_PASS
//     }
// });

// router.post('/send-message',async(req,res)=>{
//     const { name, email, message } = req.body;
//     if (!name || !email || !message) return res.status(400).json({ message: 'All fields are required' });

//     const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: process.env.EMAIL_USER, // You can also use another email where messages should come
//     subject: `Contact Form Message from ${name}`,
//     text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
//     };
//     try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: 'Message sent successfully!' });
//     } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to send message' });
//     }
// });

router.post('/send-message', async (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Send email using Resend API
    await resend.emails.send({
      from: process.env.EMAIL_USER, // must be verified sender on Resend
      to: process.env.EMAIL_USER, // your email to receive the message
      subject: `Contact Form Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    });

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
});


module.exports=router;