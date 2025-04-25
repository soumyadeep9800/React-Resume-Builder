const express=require('express');
const router=express.Router();
const User=require('../models/userModel');
const Otp=require('../models/otpModel');
require('dotenv').config();
const nodemailer=require('nodemailer');

const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
});

router.post('/send', async (req, res) => {
  const { email } = req.body;
  const findEmail = await User.findOne({ email });
  if (!findEmail) {
    console.log("❌ Email NOT found in DB");
    return res.status(404).json({ message: 'This email is not registered' });
  }

  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  await Otp.findOneAndUpdate(
          { email },
          { otp, createdAt: new Date() },
          { upsert: true, new: true }
  );
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for Resume-Builder',
    text: `Hi ${findEmail.name},\n\nYour OTP is: ${otp}. It is valid for 1 minute.\n\n- Soumyadeep Ghosh`,
  };
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({message:'OTP sent Succesfully'});
  } catch (error) {
    console.error("Error sending OTP:");
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});



module.exports = router;