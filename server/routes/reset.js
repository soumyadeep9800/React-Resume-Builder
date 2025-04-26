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
    subject: '🔐 Your OTP for Resume-Builder',
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f9f9f9; border-radius: 10px; border: 1px solid #ddd;">
        <h2 style="color: #4CAF50;">Hi there 👋,</h2>
        <p style="font-size: 16px;">This is <strong>Soumyadeep Ghosh</strong> from <strong>Resume-Builder</strong>.</p>
        <p style="font-size: 16px; color: #333;">
        Here is your <strong style="color: #d6336c;">One-Time Password (OTP)</strong>:
        </p>
        <div style="font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #2c3e50; background: #eaf4ff; padding: 10px 20px; border-radius: 8px; text-align: center;">
        ${otp}
        </div>
        <p style="font-size: 14px; margin-top: 20px;">⚠️ This OTP is valid for only <strong>2 minute</strong>. Please do not share it with anyone.</p>
        <hr style="margin: 30px 0;" />
        <p style="font-size: 13px; color: #999;">If you didn’t request this email, you can safely ignore it.</p>
        <p style="font-size: 13px; color: #999;">Best regards,<br><strong>Resume-Builder Team</strong></p>
    </div>
    `
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