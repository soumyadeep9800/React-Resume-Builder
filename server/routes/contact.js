const express=require('express');
const nodemailer=require('nodemailer');
const router=express.Router();
const bcrypt = require('bcrypt');
require('dotenv').config();

const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
});

router.post('/send-message',async(req,res)=>{
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ message: 'All fields are required' });

    const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // You can also use another email where messages should come
    subject: `Contact Form Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };
    try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send message' });
    }
});

module.exports=router;