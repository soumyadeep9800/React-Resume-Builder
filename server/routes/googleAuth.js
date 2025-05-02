const express=require('express');
const router=express.Router();
const {generateToken}=require('../jwt');
const User=require('../models/userModel');
require('dotenv').config();

router.post("/google-signup", async (req, res) => {
    const { name, email, picture } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    try {
        let user = await User.findOne({ email });
        if(user) return res.status(400).json({message:'Email already registered. Please login.'});
        
        user = new User({name,email,picture,signupMethod: "google",});
        const payload = { id: user.id };
        const token = generateToken(payload);

        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        user.devices.push({ token,ip });
        await user.save();
        res.json({ message: 'Google signup/login successful', token });
    } catch (err) {
        console.error('Google signup error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post("/google-signin", async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found. Please sign up first.' });
        }
        if (user.devices.length >= 2) {
            return res.status(403).json({ message: 'Login limit exceeded. Please logout from another device first.' });
        }
        const payload = { id: user.id };
        const token = generateToken(payload);
        user.devices.push({ token });
        await user.save();
        res.json({ message: 'Google login successful', token });
    } catch (err) {
        console.error('Google login error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports=router;