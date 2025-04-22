const express=require('express');
const nodemailer=require('nodemailer');
const router=express.Router();
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
        text: `your OTP is: ${otp}. it is valid for 1 minutes.`
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

module.exports = router;