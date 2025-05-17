const express = require('express');
const router = express.Router();
const { generateToken } = require('../jwt');
const User = require('../models/userModel');
require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.Client_id);

async function verifyGoogleToken(idToken) {
    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.Client_id,
    });
  return ticket.getPayload(); // Contains email, name, picture, etc.
}

// ✅ Google Sign-In Route
router.post("/google-signin", async (req, res) => {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ message: 'idToken is required' });

    try {
    const payload = await verifyGoogleToken(idToken);
    const { email } = payload;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'User not found. Please sign up first.' });
    }
    if (user.devices.length >= 2) {
        return res.status(403).json({ message: 'Login limit exceeded. Please logout from another device first.' });
    }
    const appToken = generateToken({ id: user.id });
    user.devices.push({ token: appToken });
    await user.save();
    res.json({ message: 'Google login successful', token: appToken });
    } catch (err) {
    console.error('Google login error:', err);
    res.status(500).json({ message: 'Server error' });
    }
});

// ✅ Google Sign-Up Route
router.post("/google-signup", async (req, res) => {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ message: 'idToken is required' });
try {
    const payload = await verifyGoogleToken(idToken);
    const { email, name, picture } = payload;
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: 'Email already registered. Please login.' });
    }
    user = new User({ name, email, picture, signupMethod: "google" });
    const appToken = generateToken({ id: user.id });

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    user.devices.push({ token: appToken, ip });
    await user.save();
    res.json({ message: 'Google signup/login successful', token: appToken });
} catch (err) {
    console.error('Google signup error:', err);
    res.status(500).json({ message: 'Server error' });
}
});

module.exports = router;