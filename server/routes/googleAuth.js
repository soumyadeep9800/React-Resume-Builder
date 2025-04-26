const express=require('express');
const router=express.Router();
const {generateToken}=require('../jwt');
const User=require('../models/userModel');
require('dotenv').config


router.post("/google-signup", async (req, res) => {
    const { name, email, picture } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    try {
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({name,email,picture,signupMethod: "google",
            });
            await user.save();
        }
        const payload = { id: user.id };
        const token = generateToken(payload);
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
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found. Please sign up first.' });
        }
        const payload = { id: user.id };
        const token = generateToken(payload);
        res.json({ message: 'Google login successful', token });
    } catch (err) {
        console.error('Google login error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports=router;