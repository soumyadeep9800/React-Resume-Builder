//import React from 'react'
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
export default function Navbar(props) {
    const [isMobile, setIsMobile] = useState(false);

  return (
    <nav className="navbar" >
    <div className="logo">Resume-Builder</div>
    <ul className={isMobile ? "nav-links-mobile" : "nav-links"}>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/contact">Contact Us</Link>
      </li>
      <li>
        <Link to="/premium">Premium</Link>
      {/* <Link className="nav-link" to="/about">About</Link> */}
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <button className={isMobile ? "dark-mode-toggle-mobile" : "dark-mode-toggle"} onClick={()=>{props.toggleMode()}}>
      {props.mode==='light'? <span>🌙</span> : <span>🌞</span>}
      </button>
      {/* <div className={isMobile ? "dark-mode-toggle-mobile" : "dark-mode-toggle"} onClick={()=>{props.toggleMode()}}>
      <input class='tgl tgl-ios' id='toggle-34' type='checkbox'/>
      <label class='tgl-btn' for='toggle-34'></label>
      </div> */}
    </ul>
    <button
      className="mobile-menu-icon"
      onClick={() => setIsMobile(!isMobile)}
    >
      {isMobile ? "✖" : "☰"}
    </button>
  </nav>
  );
};

