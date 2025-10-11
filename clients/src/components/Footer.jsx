import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { toast } from "react-toastify";
export default function Footer() {
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.warning('You already logged out!');
        return;
      }
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        // Clear localStorage and update UI
        localStorage.removeItem('token');
        localStorage.removeItem('photoURL');
        toast.success('Log Out Successfully!');
        window.location.reload();
        window.scrollTo(0, 0);
      } else {
        console.error('Logout failed:', data.message);
        // Optionally still clear localStorage if token invalid
        localStorage.removeItem('token');
        localStorage.removeItem('photoURL');
        window.location.reload();
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear localStorage on error
      localStorage.removeItem('token');
      localStorage.removeItem('photoURL');
      window.location.reload();
      window.scrollTo(0, 0);
    }
  };
  return (
    <div className='footer'>
      <div className='f-1'>
      <div className='f-11'><a href="https://www.facebook.com/soumya.ghosh.33865" target="_blank" rel="noreferrer" title="Facebook">
        <FontAwesomeIcon icon={faFacebook} className="icon1" /></a></div>

      <div className='f-11'><a href="https://www.instagram.com/soumya.ghosh.33865/" target="_blank" rel="noreferrer" title="Instagram">
        <FontAwesomeIcon icon={faInstagram} className="icon2" /></a></div>
      
      <div className='f-11'><a href="https://www.linkedin.com/in/soumyadeep-ghosh-704a93289/" target="_blank" rel="noreferrer" title="LinkedIn">
        <FontAwesomeIcon icon={faLinkedin} className="icon3" /></a></div>

      <div className='f-11'><a href="https://www.twitter.com" target="_blank" rel="noreferrer" title="Twitter">
        <FontAwesomeIcon icon={faTwitter} className="icon4" />
      </a></div>
      </div>

      <div className='f-2'>
            <div className='f-2left'>
              <div className='f-2left-H'>Company Support</div>
              <div className='f-2left-HH'>
                <ul>
                  <li>
                    <a href='/contact'>Contect Us</a>
                  </li>
                  <li>
                    <Link to='/premium#faq'>FAQe</Link>
                  </li>
                  <li>
                    <a href='#privacypolicy'>Privacy Policy</a>
                  </li>
                  <li>
                    <button onClick={handleLogout} className='footer_logout_button'>Log Out</button>
                  </li>
                </ul>
              </div>
            </div>


            <div className='f-2right'>
            <div className='f-2right-H'>Quick Links</div>
            <div className='f-2right-HH'>
                <ul>
                  <li>
                  {/* <Link to='/Contact#about_us'>About Us</Link> */}
                  <a href='Contact#about_us'>About Us</a>
                  </li>
                  <li>
                  <a href='/premium'>premium</a>
                  </li>
                  <li>
                  <a href='/login'>Login</a>
                  </li>
                  <li>
                  <a href='#create'>Create Resume</a>
                  </li>
                </ul>
              </div>
            </div>
      </div>

<div className='f-3'>
  <div className='copyright'>Copyright &copy; 2024 - All Right Reserved By</div>
  <div className='copyright'>Resumebuilder.pv.ltd</div>
</div>
    </div>
  )
}

