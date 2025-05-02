import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import photo from "../images/back.jpg";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
// import { handleTokenExpiration } from './Sign';
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handelLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("All fields are required");
    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data=await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        //handleTokenExpiration(data.token,navigate);
        toast.success("Login successful! 🎉");
        navigate("/");
        window.location.reload();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed");
      //alert("Signup failed");
    }
  };
  return (
    <div className="back">
      <div className="content">
        <div className="login">
          <h2>Login</h2>
        </div>
        <div className="EP">
          <form>
            <input
              className="Email"
              placeholder="&#128231; Enter Your Email"
              type="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="Password"
              placeholder="🔒 Enter Your Password"
              type="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="forget">
              <Link to="/Forget">Forget Password?</Link>
            </div>
            <div className="loginbutton1">
              <button
                type="submit"
                className="loginbutton"
                onClick={handelLogin}
              >
                Login
              </button>
            </div>
          </form>
        </div>
        <div className="lf">
          <p>
            Need an account? <Link to="/Sign">SIGN UP</Link>
          </p>
          <div className="or">------OR------</div>
        </div>
        {/*<div className='google'>
              <Link to="#google"><img src={photo2} alt='google_icon' className='google_icon_login'/></Link>
          </div> */}
        <div className="google">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              const decoded = jwtDecode(credentialResponse.credential);
              // console.log(decoded); // { name, email, picture, ... }
              try {
                const response = await fetch("http://localhost:3001/api/google-signin",{
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: decoded.email }),
                  }
                );
                const data = await response.json();
                if (!response.ok) {
                  throw new Error(data.message || "Google Sign-In failed!");
                }
                const { token } = data;
                
                localStorage.setItem("token", token);
                localStorage.setItem('photoURL', decoded.picture);
                //handleTokenExpiration(token,navigate);
                navigate("/");
                //toast.success("Google Sign-In successful!");
                window.location.reload();
              } catch (error) {
                console.error("Google sign-in error:", error.message);
                toast.error(error.message || "Google Sign-In failed!");
              }
            }}
            onError={() => {
              toast.error("Google Sign-In failed!");
            }}
          />
        </div>
      </div>
      <img src={photo} alt="background" className="background-image" />
    </div>
  );
}
