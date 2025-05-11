import React, { useEffect , useState } from 'react';
import { useLocation } from "react-router-dom";
import photo from '../images/about.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { toast } from 'react-toastify';
export default function Contact() {
    const googleMapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.1766443915435!2d88.81054759999999!3d23.0172855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff35b7a96e917d%3A0x6e8f298d5967f822!2sBongaon%20Kalupur.%20West%20Bengal!5e0!3m2!1sen!2sin!4v1742133973597!5m2!1sen!2sin";
        const location = useLocation();
        useEffect(() => {
            if (location.hash === "#about_us") {
                const aboutSection = document.getElementById("about_us");
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: "smooth" });
                }
            }
        },[location]);

        const [name,setName]=useState('');
        const [email,setEmail]=useState('');
        const [message,setMessage]=useState('');

        const handleSubmit= async (e)=>{
            e.preventDefault();
            if(!email && !name && !message) return toast.error('Fill all the fields');
            const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
            if (!email) return toast.error('Please fill the email first');
            if (!gmailRegex.test(email)) return toast.error('Email must be a valid Gmail address');
            if(!name) return toast.error('please fill your name!');
            if(!message) return toast.error('Fill your query!');
            try {
                const res = await fetch("http://localhost:3001/api/send-message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, name, message }),
                });
                const data = await res.json();
                if(res.ok)  toast.success("Message sent successfully! 🎉" || data.message);
                else toast.error('Failed to send Message' || data.message);
            } catch (error) {
                console.error(error);
                toast.error("Failed to send Message");
            }
        }
    return (
    <>
    <div className='contact_us_main'>
    <div className='contact_us'>
      <div className='contact_heading'>Where to find us</div>
      <div className='contact_map_head'>
        <div className='contact_map'>
        <p>📍 Bangaon, West Bengal, India</p>
        <iframe
        src={googleMapSrc}
        width="100%"
        height="350"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        title="Google Map Location"
        ></iframe></div>
        <div className='contact_address'>
            <div className='contact_address1'>
                <div className='contact_address2'>Address</div>
                <div className='contact_address3'>Bangaon,West Bengal,PIN-743235</div>
            </div>
            <div className='contact_address4'>
                <div className='contact_address5'>Give Us a Call</div>
                <div className='contact_address6'>(985) 301-856</div>
            </div>
            <div className='contact_address7'>
               <div className='contact_address8'>
                    <div className='contact_address9'>Monday-Friday:</div>
                    <div className='contact_address10'>8:00 am- 5:00 pm IST</div>
               </div>
               <div className='contact_address11'>
                    <div className='contact_address12'>Saturday-sunday:</div>
                    <div className='contact_address13'>11:00 am- 5:00 pm IST</div>
               </div>
            </div>
            <div className='contact_address_link_main'>
                <div className='contact_address_link'><a href="https://www.facebook.com/soumya.ghosh.33865" target="_blank" rel="noreferrer" title="Facebook">
                    <FontAwesomeIcon icon={faFacebook} className="icon_contact_us" /></a></div>
                
                <div className='contact_address_link'><a href="https://www.instagram.com/soumya.ghosh.33865/" target="_blank" rel="noreferrer" title="Instagram">
                    <FontAwesomeIcon icon={faInstagram} className="icon_contact_us" /></a></div>
                
                <div className='contact_address_link'><a href="https://www.linkedin.com/in/soumyadeep-ghosh-704a93289/" target="_blank" rel="noreferrer" title="LinkedIn">
                    <FontAwesomeIcon icon={faLinkedin} className="icon_contact_us" /></a></div>
                
                <div className='contact_address_link'><a href="https://www.twitter.com" target="_blank" rel="noreferrer" title="Twitter">
                    <FontAwesomeIcon icon={faTwitter} className="icon_contact_us" />
                </a></div>
            </div>
        </div>
        
      </div>
    </div>

 {/* Have a question about resumes or need more help with your resume?  */}
 {/* className='From_contact'  */}
<div className='From_contact'>
<div className='From_contact_us_heading'>Have a question about resumes or need more help with your resume?</div>
<div className='From_contact_us_heading2'>Let us know by filling our contact form.</div>
<div className='From_contact_us_main'>
<div className='From_contact_us'>
    <div className='From_contact_us_left'>
      <textarea type='text' className='From_contact_your' value={message} placeholder='Your Message' onChange={(e)=>setMessage(e.target.value)}></textarea>
    </div>
    <div className='From_contact_us_right'>
        <div className='From_contact_your_name'>
            <input className='From_contact_your_name2' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}></input>
        </div>
        <div className='From_contact_your_email'>
            <input className='From_contact_your_email2' placeholder='E-Mail Address' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
        </div>
        <div className='From_contact_your_button'><button className='From_contact_your_button2' onClick={handleSubmit}>Submit</button></div>
    </div>
</div>
</div>
</div>
{/* About Us */}

<div id='about_us' className='About_us'>
    <div className='About_us_img'><img src={photo} alt='About_us_related' className='About_us_img2'/></div>
    <div className='About_us_contant'>
        <div className='About_us_heading'>About Us</div>
        <div className='About_us_contant2'>Resume Builder is the premier resource for job seekers. You can get access to:</div>
        <div className='About_us_contant_ul_parent'>
            <ul className='About_us_ul'>
                <li className='About_us_li'>Our cutting-edge resume builder app</li>
                <li className='About_us_li'>Specialized resume templates and examples crafted by certified resume writers</li>
                <li className='About_us_li'>Advice from industry recruiters and career coaches</li>
            </ul>
        </div>
        <div className='About_us_p_parent'><p className='About_us_p'>The Resume Builder app shows you how to make an ideal resume, including what keywords and relevant 
            experience you should use.</p>
        </div>
    </div>
</div>
</div>
</>
  )
}
