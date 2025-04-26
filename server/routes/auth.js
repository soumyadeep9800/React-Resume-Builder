const express=require('express');
const nodemailer=require('nodemailer');
const router=express.Router();
const {generateToken}=require('../jwt');
const User=require('../models/userModel');
const Otp=require('../models/otpModel');
const bcrypt = require('bcrypt');
require('dotenv').config();
const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
});

router.post('/send-otp',async(req,res)=>{
    const {email}=req.body;
    if(!email) return res.status(400).json({message:'email is required'});
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Unable to proceed with this email'});
    }
    const otp=Math.floor(1000+Math.random()*9000).toString();
    //console.log(`OTP for ${email} set to: ${otp}`);
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
            <p style="font-size: 13px; color: #999;">If you didn't request this email, you can safely ignore it.</p>
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

router.post('/verify-otp', async(req,res)=>{
    const {email,otp}=req.body;
    // console.log(`Verifying OTP for ${email} with OTP: ${otp}`);
    try {
        const record = await Otp.findOne({ email });

        if (record && record.otp === otp) {
            await Otp.deleteOne({ email });
            return res.status(200).json({ message: 'OTP verified' });
        }

        return res.status(400).json({ message: 'Invalid or expired OTP' });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ message: 'Server error during OTP verification' });
    }
});

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const checkUser= await User.findOne({email:email});
        if(checkUser) return res.status(400).json({message:'Email already registered. Please login.'});

        const newUser = new User({ name, email, password });
        const payload={
            id:newUser.id
        }
        const token = generateToken(payload);
        newUser.devices.push({ token });
        await newUser.save();
        res.json({ message: 'Signup successful', token });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email:email});
        if (!user.password && user) {
            return res.status(402).json({message: 'Please login using Google Sign-In' });
        }
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({message:'invalid username or password'});
        }
        if (user.devices.length >= 2) {
            return res.status(403).json({ message: 'Login limit exceeded. Please logout from another device first.' });
        }
        const payload={
            id:user.id
        }
        const token=generateToken(payload);
        user.devices.push({token});
        await user.save();
        res.status(200).json({token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'internal server error'});
    }
});

router.put('/update-password',async(req,res)=>{
    const {email, newPassword}=req.body;
    try {
        const user =await User.findOne({email:email});
        if(!user) return res.status(400).json({message:'User not found'});
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findOneAndUpdate({ email },{ password: hashedPassword },{
            new: true,
            runValidators: true
            }
        );
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Failed to update password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;