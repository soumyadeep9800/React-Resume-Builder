const express=require('express');
const { Resend } = require('resend');
const router=express.Router();
require('dotenv').config();
const resend = new Resend(process.env.RESEND_API_KEY);

// router.post('/send-message', async (req, res) => {
//   const { name, email, message } = req.body;

//   // Validation
//   if (!name || !email || !message) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }
//   try {
//     const htmlTemplate = `
//       <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 30px;">
//         <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
//           <div style="background-color: #007bff; color: white; padding: 20px 30px;">
//             <h2 style="margin: 0;">📬 New Message from Resume-Builder</h2>
//           </div>
//           <div style="padding: 25px 30px; color: #333;">
//             <p style="font-size: 16px;">Hi <strong>Soumyadeep</strong>,</p>
//             <p style="font-size: 15px;">You’ve received a new message through the Resume-Builder contact form.</p>

//             <div style="background: #f8f9fa; border: 1px solid #e0e0e0; border-radius: 8px; padding: 15px; margin-top: 20px;">
//               <p><strong>👤 Name:</strong> ${name}</p>
//               <p><strong>📧 Email:</strong> <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a></p>
//               <p><strong>💬 Message:</strong></p>
//               <blockquote style="border-left: 4px solid #007bff; margin: 10px 0; padding-left: 10px; color: #555;">
//                 ${message}
//               </blockquote>
//             </div>

//             <p style="font-size: 14px; margin-top: 25px; color: #777;">
//               🔔 Please respond to the sender if needed. This is an automated notification.
//             </p>

//             <hr style="border: none; border-top: 1px solid #ddd; margin: 25px 0;" />

//             <p style="font-size: 13px; color: #999; text-align: center;">
//               Sent via <strong>Resume-Builder</strong> • Simplify your professional journey 🚀
//             </p>
//           </div>
//         </div>
//       </div>
//     `;

//     await resend.emails.send({
//       from: process.env.EMAIL_USER, // must be verified sender on Resend
//       to: process.env.EMAIL_USER,   // your inbox
//       subject: `📩 Contact Message from ${name}`,
//       html: htmlTemplate
//     });

//     res.status(200).json({ message: 'Message sent successfully!' });
//   } catch (error) {
//     console.error('Email send error:', error);
//     res.status(500).json({ message: 'Failed to send message' });
//   }
// });

router.post('/send-message', async (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Send email using Resend API
    await resend.emails.send({
      from: process.env.EMAIL_USER, // must be verified sender on Resend
      to: process.env.EMAIL_USER, // your email to receive the message
      subject: `Contact Form Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    });

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

module.exports=router;