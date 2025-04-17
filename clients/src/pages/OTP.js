import React, { useState } from 'react'
import { Link } from "react-router-dom";
import OTPInput from "react-otp-input";
export default function OTP() {
  const [otp,setOtp]=useState("");
  return (
    <div className='Forget_page_mainbox1'>
    <div className='Forget_page_mainbox2'>
    <div className="otp-box_Forget">
      <div className='title_Forget'>Please enter the One-Time Password to verify your account</div>
      <div className='title_Forget_nextdiv_forget'>
      <div className="subtitle_Forget">A One-Time Password has been sent to your Soumyadeepghosh***@gmail.com</div>
      <div className='OTPINPUT_forget'><OTPInput
        value={otp}
        onChange={setOtp}
        isInputNum
        shouldAutoFocus
        inputStyle="otp-input"
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
      /></div>
      <div className='validate_button_forget'>
      <button  className="validate-btn"><Link to="/Newpassword">Validate</Link></button>
      </div>
      <div className='resend_OTP_Forget_main'>
        <div className='resend_OTP_Forget_Text'>Not received an OTP?</div>
        <div className="resend_Button_forget_maindiv"><button className='resend_OTP_Forget_button'>Resend OTP</button></div>
      </div> 
      </div>
  </div>
  </div>
  </div>
  )
}
