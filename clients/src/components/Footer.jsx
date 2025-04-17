import React from 'react'
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
export default function Footer() {
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
                    <a href='#cookiepolicy'>Cookie Policy</a>
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

