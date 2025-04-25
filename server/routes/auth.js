const express=require('express');
const nodemailer=require('nodemailer');
const router=express.Router();
const {generateToken}=require('../jwt');
const User=require('../models/userModel');
const Otp=require('../models/otpModel');
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
    const mailOptions={
        from:process.env.EMAIL_USER,
        to:email,
        subject:'your OTP for Resume-Builder',
        text: `This is Soumyadeep Ghosh, your OTP is: ${otp}. it is valid for 1 minutes.`
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
    console.log(`Verifying OTP for ${email} with OTP: ${otp}`);
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

router.post('/login', async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email:email});
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:'invalid username or password'});
        }
        const payload={
            id:user.id
        }
        const token=generateToken(payload);
        res.status(200).json({token});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'internal server error'});
    }
});


module.exports = router;