const express=require('express');
const nodemailer=require('nodemailer');
const router=express.Router();
const {jwtAuthMiddleware,generateToken}=require('../jwt');
const User=require('../models/userModel');
require('dotenv').config();
const otpStore=new Map(); //temporary in-memory storage

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
    const otp=Math.floor(1000+Math.random()*9000).toString();
    otpStore.set(email,otp);

    const mailOptions={
        from:process.env.EMAIL_USER,
        to:email,
        subject:'your OTP for Resume-Builder',
        text: `This is Soumyadeep Ghosh, your OTP is: ${otp}. it is valid for 1 minutes.`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({message:'OTP sent Succesfully'});
        setTimeout(()=>otpStore.delete(email),60*1000);
    } catch (error) {
        console.error("Error sending OTP:");
        res.status(500).json({ message: 'Failed to send OTP' });
    }
});

router.post('/verify-otp', (req,res)=>{
    const {email,otp}=req.body;
    const storeOtp=otpStore.get(email);

    if(storeOtp && storeOtp===otp){
        otpStore.delete(email);
        return res.status(200).json({message:'OTP verified'});
    }

    return res.status(400).json({message:'Invalid or expired OTP'});
});

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        const newUser = new User({ name, email, password });
        const saveUser=await newUser.save();
        const payload={
            id:saveUser.id
        }
        const token = generateToken(payload);
        res.json({ message: 'Signup successful', token });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;