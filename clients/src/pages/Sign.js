import React, { useState } from 'react'
import { Link } from "react-router-dom";
import photo from '../images/abcd.jpg';
import photo2 from '../images/google.png';
import OTPInput from "react-otp-input";
export default function Sign() {
  const [otp,setOtp]=useState("");
    return (
        <div className='a1'>
          <div className='a2'>
            <div className='sign'><h2>Sign Up</h2></div>
            <div className='a3'>
              <form>
                <div className='e1_head'>
                <input className='e1' placeholder='&#128231; Enter Your Email' type='emil'/>
                <div className='e1_send_otp'><button className='e1_send_otp_button'>Send OTP</button></div>
                </div>
                <div className='Sign_OTP'>
              <div className='Sign_OTP2'>
                <OTPInput
                value={otp}
                onChange={setOtp}
                isInputNum
                shouldAutoFocus
                inputStyle="otp-input2"
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
                />
              </div>
              <div className='p1_verify'><button className='p1_verify_button'>Verify</button></div>
                </div>
                <div className='p1_head'>
                <input className='p1' placeholder='🔒 Set Your Password' type='Password'/>
                </div>
                <div className='signbutton'>
                  <button className='signbutton2' type='submit'>Sign up</button>
                </div>
              </form>
            </div>
            <div className='condition'>
              <p>Have an account? <Link to="/login">Login</Link></p>
              <div className='Or'>-----OR-----</div>
            </div>
             <div className='google'>
                <Link to="/#google"><img src={photo2} alt='google_icon' className='google_icon_login'/></Link>
             </div>
          </div>
          <img src={photo} alt="background_photo" className='back-img'/>
        </div>
      )
}
