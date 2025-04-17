import React from 'react'
import { Link } from "react-router-dom";
import photo from '../images/Forget.jpg';
export default function Forget() {
  return (
    <div className='F1'>
          <div className='F2'>
            <div className='Forget'><h2>Forget Password</h2></div>
            <div className='F3'>
              <form className='Forget_From'>
                <div className='forget_head'>Enter your Email:</div>
                <input className='e1F' placeholder='&#128231; Enter Your Email' type='emil'/>
                {/* <div className='verify'><button>Send OTP</button></div> */}
                <div className='Forgetbutton'>
                  <button className='Forgetbutton2' type='submit'><Link to="/OTP" className='Forget_Link'>Reset Password</Link></button>
                </div>
              </form>
            </div>
            <div className='condition'>
              <p>Back to <Link to="/login">Login</Link> page</p>
            </div>
          </div>
          <img src={photo} alt="background_photo" className='back-img'/>
        </div>
  )
}
