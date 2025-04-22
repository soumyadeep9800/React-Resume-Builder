import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import photo from '../images/abcd.jpg';
import photo2 from '../images/google.png';
import OTPInput from "react-otp-input";
export default function Sign() {
  const [otp,setOtp]=useState("");
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const res=await fetch("http://localhost:3001/api/send-otp",{
        method: "POST",
        headers: {"content-Type":"application/json"},
        body:JSON.stringify({email})
      });
      const data= await res.json();
      toast.success("OTP send Successful! 🎉");
      alert(data.message);
    } catch (err) {
      console.error(err);
      // alert("Failed to send OTP");
      toast.error("Failed to send OTP");
    }
  };
  
  const handleVerifyOtp= async(e)=>{
    e.preventDefault();
    try {
      const res=await fetch("http://localhost:3001/api/verify-otp",{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify({email,otp})
      });
      const data=await res.json();
      toast.success("OTP Verified Succesful! 🎉");
      alert(data.message);
    } catch (error) {
      console.error(error);
      //alert("OTP Verification failed");
      toast.error("OTP Verification failed");
    }
  };

  const handelSignUp=async (e)=>{
    e.preventDefault();
    try {
      const res= await fetch("http://localhost:3001/api/signup",{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify({email,otp,password})
      });
      const data=res.json();
      if(res.ok){
        toast.success("Signup successful! 🎉");
      }else{
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Signup failed");
      //alert("Signup failed");
    }
  }
  
    return (
        <div className='a1'>
          <div className='a2'>
            <div className='sign'><h2>Sign Up</h2></div>
            <div className='a3'>
              <form onSubmit={handelSignUp}>
                <div className='e1_head'>
                  <div className='e1_head_newadd'>
                    <input className='e1' id='e11' placeholder='🧑‍💼 Enter Your Name' type='text' autoComplete='name' value={name} onChange={(e)=>setName(e.target.value)}/>
                    <input className='e1' placeholder='&#128231; Enter Your Email' type='email' autoComplete='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                  </div>
                <div className='e1_send_otp'><button className='e1_send_otp_button' onClick={handleSendOtp}>Send OTP</button></div>
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
              <div className='p1_verify'><button className='p1_verify_button' onClick={handleVerifyOtp}>Verify</button></div>
                </div>
                <div className='p1_head'>
                <input className='p1' placeholder='🔒 Set Your Password' type='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
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
                <Link to="#google"><img src={photo2} alt='google_icon' className='google_icon_login'/></Link>
            </div>
          </div>
          <img src={photo} alt="background_photo" className='back-img'/>
        </div>
      )
}
