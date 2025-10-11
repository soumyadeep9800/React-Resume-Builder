require('dotenv').config();
const express = require('express');
const router = express.Router();
const { generateToken, jwtAuthMiddleware } = require('../jwt');
const User = require('../models/userModel');
const Otp = require('../models/otpModel');
const bcrypt = require('bcrypt');
const { Resend } = require('resend'); // ✅ Import Resend

// ✅ Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// ---------------- SEND OTP ----------------
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'email is required' });

  try {
    console.log("📩 POST /send-otp hit with:", email);

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    await Otp.findOneAndUpdate(
      { email },
      { otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f9f9f9; border-radius: 10px; border: 1px solid #ddd;">
        <h2 style="color: #4CAF50;">Welcome 👋</h2>
        <p style="font-size: 16px;">Thank you for signing up at <strong>Resume-Builder</strong>.</p>
        <p style="font-size: 16px; color: #333;">Here is your <strong style="color: #d6336c;">One-Time Password (OTP)</strong>:</p>
        <div style="font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #2c3e50; background: #eaf4ff; padding: 10px 20px; border-radius: 8px; text-align: center;">
          ${otp}
        </div>
        <p style="font-size: 14px; margin-top: 20px;">⚠️ This OTP is valid for only <strong>2 minutes</strong>. Do not share it with anyone.</p>
        <hr style="margin: 30px 0;" />
        <p style="font-size: 13px; color: #999;">If you didn’t request this email, you can safely ignore it.</p>
        <p style="font-size: 13px; color: #999;">Best regards,<br><strong>Resume-Builder Team</strong></p>
      </div>
    `;

    // ✅ Send email via Resend
    await resend.emails.send({
      from: 'Resume Builder <onboarding@resend.dev>',
      to: email,
      subject: '🔐 Your OTP for Resume-Builder',
      html: htmlTemplate,
    });

    console.log(`✅ OTP ${otp} sent to ${email}`);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error("❌ Error in /send-otp:", err);
    res.status(500).json({ message: 'Failed to send OTP', error: err.message });
  }
});

// ---------------- VERIFY OTP ----------------
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const record = await Otp.findOne({ email });
    if (record && record.otp === otp) {
      await Otp.deleteOne({ email });
      return res.status(200).json({ message: 'OTP verified' });
    }
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  } catch (error) {
    console.error("❌ Error verifying OTP:", error);
    res.status(500).json({ message: 'Server error during OTP verification' });
  }
});

// ---------------- SIGNUP ----------------
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.status(400).json({ message: 'Email already registered. Please login.' });

    const newUser = new User({ name, email, password });
    const payload = { id: newUser.id };
    const token = generateToken(payload);

    newUser.devices.push({ token });
    await newUser.save();
    res.json({ message: 'Signup successful', token });
  } catch (err) {
    console.error('❌ Signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ---------------- LOGIN ----------------
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user && !user.password)
      return res.status(402).json({ message: 'Please login using Google Sign-In' });

    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: 'Invalid username or password' });

    if (user.devices.length >= 2)
      return res.status(403).json({ message: 'Login limit exceeded. Logout from another device first.' });

    const payload = { id: user.id };
    const token = generateToken(payload);
    user.devices.push({ token });
    await user.save();

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ---------------- UPDATE PASSWORD ----------------
router.put('/update-password', async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('❌ Failed to update password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ---------------- LOGOUT ----------------
// router.post('/logout', jwtAuthMiddleware, async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     // Remove current device token
//     user.devices = user.devices.filter(
//       (device) => device.token !== req.headers.authorization.split(' ')[1]
//     );
//     await user.save();

//     res.status(200).json({ message: 'Logout successful' });
//   } catch (error) {
//     console.error('❌ Logout error:', error);
//     res.status(500).json({ message: 'Server error during logout' });
//   }
// });
router.post('/logout', jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

    if (!token) return res.status(400).json({ message: 'No token provided' });

    const beforeCount = user.devices.length;

    user.devices = user.devices.filter(device => device.token.trim() !== token.trim());
    await user.save();

    const afterCount = user.devices.length;

    if (beforeCount === afterCount) {
      console.warn('⚠️ Token not found in devices array.');
    }

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('❌ Logout error:', error);
    res.status(500).json({ message: 'Server error during logout' });
  }
});


module.exports = router;
