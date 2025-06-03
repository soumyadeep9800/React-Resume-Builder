import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import photo from "../images/abcd.jpg";
import OTPInput from "react-otp-input";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function Sign() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpClicked, setOtpClicked] = useState(false);
  const [otpDisabled, setOtpDisabled] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const API_BASE=process.env.REACT_APP_API_BASE_URL;
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!name) return toast.error("Please Enter Your Name");
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!email) return toast.error("Please fill the email first");
    if (!gmailRegex.test(email))
      return toast.error("Email must be a valid Gmail address");
    setOtpClicked(true);
    setOtpDisabled(true);
    try {
      const res = await fetch(`${API_BASE}/api/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      console.log("base",API_BASE)
      const data = await res.json();
      if (res.ok) {
        toast.success("OTP send Successful! 🎉");
      } else if (res.status === 400) {
        toast.error("Email already registered. Please login.");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to send OTP");
    }
    setTimeout(() => {
      setOtpClicked(false);
      setOtpDisabled(false);
    }, 2000);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!email || !otp || !name) {
      return toast.error("Email , OTP and Name are required");
    }
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(email))
      return toast.error("Email must be a valid Gmail address");
    try {
      const res = await fetch(`${API_BASE}/api/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "OTP Verification failed");
        return;
      }
      toast.success("OTP Verified Successful! 🎉");
      setIsOtpVerified(true);
      //alert(data.message);
    } catch (error) {
      console.error(error);
      //alert("OTP Verification failed");
      toast.error("OTP Verification failed");
    }
  };

  const isPasswordValid = (value) => {
    const lengthValid = value.length >= 8;
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    return lengthValid && hasUpper && hasLower && hasNumber && hasSpecial;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !otp) {
      toast.error("All fields are required");
      return;
    }
    if (otp.length !== 4) {
      toast.error("OTP must be 4 digit!");
      return;
    }
    if (!isOtpVerified) {
      toast.error("Please verify OTP before signing up!");
      return;
    }
    if (!isPasswordValid(password)) {
      toast.error(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
      );
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        //handleTokenExpiration(data.token,navigate);
        toast.success("Signup successful! 🎉");
        navigate("/");
        window.location.reload();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Signup failed");
      //alert("Signup failed");
    }
  };

  return (
    <div className="a1">
      <div className="a2">
        <div className="sign">
          <h2>Sign Up</h2>
        </div>
        <div className="a3">
          <form onSubmit={handleSignUp}>
            <div className="e1_head">
              <div className="e1_head_newadd">
                <input
                  className="e1"
                  id="e11"
                  placeholder="🧑‍💼 Enter Your Name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="e1"
                  placeholder="&#128231; Enter Your Email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="e1_send_otp">
                <button
                  className={`e1_send_otp_button ${
                    otpClicked ? "clicked" : ""
                  }`}
                  disabled={otpDisabled}
                  onClick={handleSendOtp}
                >
                  {otpDisabled ? "Wait..." : "Send OTP"}
                </button>
              </div>
            </div>
            <div className="Sign_OTP">
              <div className="Sign_OTP2">
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  isInputNum
                  inputStyle="otp-input2"
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => <input {...props} />}
                />
              </div>
              <div className="p1_verify">
                <button className="p1_verify_button" onClick={handleVerifyOtp}>
                  Verify
                </button>
              </div>
            </div>
            <div className="p1_head">
              <input
                className="p1"
                placeholder="🔒 Set Your Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="signbutton">
              <button className="signbutton2" type="submit">
                Sign up
              </button>
            </div>
          </form>
        </div>
        <div className="condition">
          <p>
            Have an account? <Link to="/login">Login</Link>
          </p>
          <div className="Or">-----OR-----</div>
        </div>
        {/* <div className='google'>
                <Link to="#google"><img src={photo2} alt='google_icon' className='google_icon_login'/></Link>
            </div> */}
        <div className="google">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              const decoded = jwtDecode(credentialResponse.credential);
              // console.log(decoded); // {name, email, picture, etc.}
              try {
                const res = await fetch(
                  `${API_BASE}/api/google-signup`,
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                    idToken: credentialResponse.credential, // send the actual Google ID token
                    }),
                  }
                );
                const data = await res.json();
                if (res.ok) {
                  localStorage.setItem("token", data.token); // the JWT token
                  localStorage.setItem("photoURL", decoded.picture);
                  navigate("/");
                  window.location.reload();
                } else {
                  toast.error(data.message || "Something went wrong");
                }
              } catch (error) {
                console.error(error);
                toast.error("Google Sign-In failed!");
              }
            }}
            onError={() => {
              toast.error("Google Sign-In failed!");
            }}
          />
        </div>
      </div>
      <img src={photo} alt="background_photo" className="back-img" />
    </div>
  );
}
