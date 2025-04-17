import React from 'react'

export default function Newpassword() {
  return (
    <div  className='Newpassword_main'>
      <div className='Newpassword_2'>
        <div className='Newpassword_heading'>Set New Passwod</div>
        <div className='New_password_input'>
            <div className='New_password_input1'>
                <div className='New_password_input11'>New Password</div>
                <div className='New_password_input12'><input className='New_password_input13' placeholder='New Password'></input></div>
            </div>
            <div className='New_password_input2'>
                <div className='New_password_input21'>Confirm New Password</div>
                <div className='New_password_input22'><input className='New_password_input23' placeholder='Confirm New Password'></input></div>
            </div>
        </div>
        <div className='New_password_button1'><button className='New_password_button2'>Change Password</button></div>
      </div>
    </div>
  )
}
