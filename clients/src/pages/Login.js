import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import photo from '../images/back.jpg';
import photo2 from '../images/google.png';


export default function Login() {
 const[email,setEmail]=useState("");
 const[password,setPassword]=useState("");

 const handleSubmit = (e) => {
  e.preventDefault(); // Prevents page reload

  // Dummy validation (Replace with actual authentication logic)
  if (!email || !password) {
    toast.warn("Please fill in all fields! ⚠️");
  } else if (email === "soumyadeepghosh9800@gmail.com" && password === "12345") {
    toast.success("Login Successful! 🎉");
  } else {
    toast.error("Invalid Email or Password! ❌");
  }
};
  return (
    <div className='back'>
      <div className='content'>
          <div className='login'><h2>Login</h2></div>
          <div className='EP'>
          <form onSubmit={handleSubmit}>
            <input className='Email' placeholder='&#128231; Enter Your Email' type='Email'  value={email}
            onChange={(e) => setEmail(e.target.value)}/>
            <input className='Password' placeholder='🔒 Enter Your Password' type='Password' value={password}
            onChange={(e) => setPassword(e.target.value)}/>
            <div className='forget'><Link to="/Forget">Forget Password?</Link></div>
            <div className='loginbutton1'>
            <button type='submit'  className='loginbutton'>Login</button> 
            </div>
          </form>
          </div>
          <div className='lf'>
            <p>Need an account? <Link to="/Sign">SIGN UP</Link></p>
            <div className='or'>------OR------</div>
          </div>
          <div className='google'>
              <Link to="#google"><img src={photo2} alt='google_icon' className='google_icon_login'/></Link>
          </div>
      </div>
      <img src={photo} alt="background" className="background-image"/>
      </div>
  )
}
