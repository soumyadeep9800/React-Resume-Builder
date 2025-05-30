import React, { useState } from 'react'
import { useNavigate ,useLocation} from "react-router-dom";
import { toast } from 'react-toastify';
import OTPInput from "react-otp-input";
export default function OTP() {
  const navigate=useNavigate();
  const [otp,setOtp]=useState("");
  const location = useLocation();
  const email = location.state?.email;
  function maskEmail(email) {
    const [local, domain] = email.split('@');
    if (local.length <= 2) {
      return `${local[0]}****@${domain}`;
    }
    const first = local[0];
    const last = local[local.length - 1];
    return `${first}****${last}@${domain}`;
  }
  const maskedEmail = email ? maskEmail(email) : '';
  const API_BASE=process.env.REACT_APP_API_BASE_URL;
    const handleVerifyOtp= async(e)=>{
      e.preventDefault();
      if (!otp) {
        return toast.error('OTP  are required');
      }
      try {
        const res=await fetch(`${API_BASE}/api/verify-otp`,{
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body:JSON.stringify({ email, otp })
        });
        const data = await res.json();
        if (res.ok) {
          toast.success("OTP Verified Successful! 🎉");
          navigate('/Newpassword',{ state: { email } });
        }else{
          toast.error(data.message || "OTP Verification failed");
          navigate('/Forget');
        }
      } catch (error) {
        console.error(error);
        toast.error("OTP Verification failed");
        navigate('/Forget');
      }
    };

    const handleResendOtp = async () => {
      try {
        const res = await fetch(`${API_BASE}/forget/send`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),  // Ensure the email is passed
        });
    
        const data = await res.json();
        if (res.ok) {
          toast.success("OTP Resent Successfully! 🎉");
        } else {
          toast.error(data.message || "Failed to resend OTP");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to resend OTP");
      }
    };
  return (
    <div className='Forget_page_mainbox1'>
    <div className='Forget_page_mainbox2'>
    <div className="otp-box_Forget">
      <div className='title_Forget'>Please enter the One-Time Password to verify your account</div>
      <div className='title_Forget_nextdiv_forget'>
      <div className="subtitle_Forget">A One-Time Password has been sent to your<p className='subtitle_Forget_email'>{maskedEmail}</p></div>
      <div className='OTPINPUT_forget'><OTPInput
        value={otp}
        onChange={(otp)=>setOtp(otp)}
        isInputNum
        shouldAutoFocus
        inputStyle="otp-input"
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
      /></div>
      <div className='validate_button_forget'>
      <button  className="validate-btn" onClick={handleVerifyOtp}>Validate</button>
      </div>
      <div className='resend_OTP_Forget_main'>
        <div className='resend_OTP_Forget_Text'>Not received an OTP?</div>
        <div className="resend_Button_forget_maindiv"><button className='resend_OTP_Forget_button'onClick={handleResendOtp}>Resend OTP</button></div>
      </div>
      </div>
  </div>
  </div>
  </div>
  )
}
