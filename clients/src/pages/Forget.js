import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import photo from '../images/Forget.jpg';
import { toast } from 'react-toastify';

export default function Forget() {
  const [email, setEmail] = useState('');
  const [otpClicked, setOtpClicked] = useState(false);
  const [otpDisabled, setOtpDisabled] = useState(false);
  const navigate = useNavigate();
  const API_BASE=process.env.REACT_APP_API_BASE_URL;
  const handleSendOtp = async (e) => {
    e.preventDefault();
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!email) return toast.error('Please fill the email first');
    if (!gmailRegex.test(email)) return toast.error('Email must be a valid Gmail address');
    
    setOtpClicked(true);
    setOtpDisabled(true);

    try {
      const res = await fetch(`${API_BASE}/api/forget/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      await res.json();
      if (res.ok) {
        toast.success("OTP sent successfully! 🎉");
        setTimeout(() => {
          navigate('/OTP', { state: { email } });
        }, 1500);
      } else {
        toast.error('Enter valid Email!');
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to send OTP");
    }

    // Reset states after 1.5 seconds
    setTimeout(() => {
      setOtpClicked(false);
      setOtpDisabled(false);
    }, 1500);
  };

  return (
    <div className='F1'>
      <div className='F2'>
        <div className='Forget'><h2>Forget Password</h2></div>
        <div className='F3'>
          <form className='Forget_From'>
            <div className='forget_head'>Enter your Email:</div>
            <input
              className='e1F'
              placeholder='&#128231; Enter Your Email'
              onChange={(e) => setEmail(e.target.value)}
              type='email'
            />
            <div className='Forgetbutton'>
              <button
                className={`Forgetbutton2 ${otpClicked ? 'clicked' : ''}`}
                disabled={otpDisabled}
                type='button'
                onClick={handleSendOtp}
              >
                {otpDisabled ? 'Please Wait...' : 'Reset Password'}
              </button>
            </div>
          </form>
        </div>
        <div className='condition'>
          <p>Back to <Link to="/login">Login</Link> page</p>
        </div>
      </div>
      <img src={photo} alt="background_photo" className='back-img' />
    </div>
  );
}

