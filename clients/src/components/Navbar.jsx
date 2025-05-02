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
    const photoURL = localStorage.getItem("photoURL"); // Retrieve the photo URL (from Google sign-up)
    // console.log("Token:", token);
    // console.log("Photo URL:", photoURL);
    if (token && photoURL) {
      setUserPhoto(photoURL); // Google photo URL
    } else if (token && !photoURL) {
      setUserPhoto(user); // Use placeholder image (manual sign-up);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found");
        return;
      }
      const response = await fetch("http://localhost:3001/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        // Clear localStorage and update UI
        localStorage.removeItem("token");
        localStorage.removeItem("photoURL");
        setUserPhoto(null);
        setIsMobile(false);
        navigate("/");
        toast.success("Log Out Successfully!");
      } else {
        console.error("Logout failed:", data.message);
        // Optionally still clear localStorage if token invalid
        localStorage.removeItem("token");
        localStorage.removeItem("photoURL");
        setUserPhoto(null);
        setIsMobile(false);
        navigate("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear localStorage on error
      localStorage.removeItem("token");
      localStorage.removeItem("photoURL");
      setUserPhoto(null);
      setIsMobile(false);
      navigate("/");
    }
  };

  return (
    <nav className="navbar">
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
              onError={(e) => { console.error("Image failed to load", e);
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
