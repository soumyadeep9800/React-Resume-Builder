import React, { useState } from 'react'
import { useNavigate ,useLocation} from "react-router-dom";
import { toast } from 'react-toastify';
export default function Newpassword() {
  const navigate=useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  console.log(email);

  const [newPassword,setNewPassword]=useState("");
  const [confirmNewpassword,setConfirmNewPassword]=useState("");
  const API_BASE=process.env.REACT_APP_API_BASE_URL;
  const handleUpdatePassword= async(e)=>{
        e.preventDefault();
        if(!newPassword || !confirmNewpassword) return toast.warning('All fields are required');
        if (newPassword !== confirmNewpassword) {
          return toast.error('Passwords do not match');
        }
        try {
          const res=await fetch(`${API_BASE}/api/update-password`,{
            method: "PUT",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify({ email , newPassword})
          });
          const data=await res.json();
          if(res.ok){
            toast.success('Password update successful');
            navigate('/');
          }else{
            toast.error(data?.message || 'Failed to update password');
          }
        } catch (error) {
          console.log(error);
          toast.error('Failed to update password');
        }
      };

  return (
    <div  className='Newpassword_main'>
      <div className='Newpassword_2'>
        <div className='Newpassword_heading'>Set New Passwod</div>
        <div className='New_password_input'>
            <div className='New_password_input1'>
                <div className='New_password_input11'>New Password</div>
                <div className='New_password_input12'><input className='New_password_input13' type="password" placeholder='New Password' onChange={(e)=>setNewPassword(e.target.value)}></input></div>
            </div>
            <div className='New_password_input2'>
                <div className='New_password_input21'>Confirm New Password</div>
                <div className='New_password_input22'><input className='New_password_input23' type="password" placeholder='Confirm New Password' onChange={(e)=>setConfirmNewPassword(e.target.value)}></input></div>
            </div>
        </div>
        <div className='New_password_button1'><button className='New_password_button2' onClick={handleUpdatePassword}>Change Password</button></div>
      </div>
    </div>
  )
}
