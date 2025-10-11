import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import user from "../images/user.png";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const photoURL = localStorage.getItem("photoURL");
    if (token && photoURL) {
      setUserPhoto(photoURL);
    } else if (token && !photoURL) {
      setUserPhoto(user);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      localStorage.removeItem("token");
      localStorage.removeItem("photoURL");
      setUserPhoto(null);
      setIsMobile(false);
      navigate("/");
      toast.success("Log Out Successfully!" || data.message);
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("photoURL");
      setUserPhoto(null);
      setIsMobile(false);
      navigate("/");
    }
  };

  const handleLinkClick = () => {
    if (isMobile) setIsMobile(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">Resume-Builder</div>

      <div className={`nav-menu-wrapper ${isMobile ? "open" : ""}`}>
        <ul className="nav-links-mobile">
          <li onClick={handleLinkClick}>
            <Link to="/">Home</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link to="/premium">Premium</Link>
          </li>
          {!userPhoto && (
            <li onClick={handleLinkClick}>
              <Link to="/sign">Sign Up</Link>
            </li>
          )}
          {userPhoto && (
            <div className="user-photo-container">
              <img
                src={userPhoto}
                alt="User"
                className="user-photo"
                onError={(e) => {
                  console.error("Image failed to load", e);
                  e.target.src = user;
                }}
                referrerPolicy="no-referrer"
              />
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </ul>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
        <li>
          <Link to="/premium">Premium</Link>
        </li>
        {!userPhoto && (
          <li>
            <Link to="/sign">Sign Up</Link>
          </li>
        )}
        {userPhoto && (
          <div className="user-photo-container">
            <img
              src={userPhoto}
              alt="User"
              className="user-photo"
              onError={(e) => {
                console.error("Image failed to load", e);
                e.target.src = user;
              }}
              referrerPolicy="no-referrer"
            />
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </ul>

      <button
        className="mobile-menu-icon"
        onClick={() => setIsMobile(!isMobile)}
      >
        {isMobile ? "✖" : "☰"}
      </button>
    </nav>
  );
}