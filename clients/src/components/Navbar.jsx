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
      </li>
      {/* <li>
      <a href='Contact#about_us'>About Us</a>
      </li> */}
      <li>
        <Link to="/login">Login</Link>
      </li>
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

