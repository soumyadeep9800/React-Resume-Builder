import React, { useEffect, useState ,useRef} from 'react';
import myImage from '../images/Resume.jpg';
import ibm from '../images/ibm.png';
import infosys from '../images/Infosys.png';
import cognizant from '../images/cognizant.png';
import google from '../images/googlep.png';
import microsoft from '../images/microsoft.png';
import flipkart from '../images/flipkart.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
export default function Index() {

  const [isVisible, setIsVisible] = useState(false);
  const myDivRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    const currentRef = myDivRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);


  return (
    <>
<div className='index'>
        <div className='left'>

          <div className='left1B'>
          <div className='left-1'>Land your dream job—create your resume now.</div>
          <div className='frontpage-1st-button'><button className='left-button'>Create new resume  <FontAwesomeIcon icon={faArrowRight}/></button></div>
          </div>

          <div className='left-2'>From fresh graduates to seasoned professionals,our resume
          builder helds you create stunning resumes that lead to interviews and offers.</div>
        


<div className='left3'>
        <div className='left-31'>
          <div className='left-311'>39%</div>
          <div className='left-312'>more likely to get hired</div>
        </div>
        <div className='left-32'>
          <div className='left-321'>9%</div>
          <div className='left-322'>better pay with your next job</div>
        </div>
</div>
        </div>


<div className='right'>
    <div className='right-img'>
      <img src={myImage} alt="Description" />
    </div>
</div>
</div>
{/* 2nd part */}
<div className='love-2nd'>
<div className='love'>
  <div className='love-H'><h2>Why our customers love our resume builder</h2></div>
</div>

<div className='love-tree'>
    <div className='love-1'>
      <div className='love-1H'><h3>Powerful Resume Builder</h3>
      </div>
      <p>Build your resume effortlessly with an intuitive and user-frendly interface.</p>
    </div>

    <div className='love-2'>
      <div className='love-2H'><h3>Professionals And ATS Frendly Templates</h3></div>
      <p>Choose from a variety of modern and ATS-frendly templates designed to impress recruiters.</p>
      <button className='love-button12'>Create new resume <FontAwesomeIcon icon={faArrowRight}/></button>
    </div>
  
    <div className='love-3'>
      <div className='love-3H'><h3>Instant Download Options</h3></div>
      <p>Save your resume in multiple formats like PDF,WORD with just one click.</p>
    </div>
  </div>
</div>
{/* 3rd */}

<div ref={myDivRef}  className={`partner-customer ${isVisible ? 'visible' : ''}`}>
  <div className='partners'>
    <div className='partners-h1'>Our Partners</div>
    <div className='partner-img'>
      <div className='partner-img1'>
        <img src={ibm} alt="ibm" />
      </div>
      <div className='partner-img2'>
        <img src={infosys} alt="infosys" />
      </div>
      <div className='partner-img3'>
        <img src={cognizant} alt="cognizant" />
      </div>
    </div>
  </div>


  <div className='customer'>
    <div className='customers-h1'>Our customer have been hired at</div>
    <div className='customer-img'>
      <div className='customer-img1'>
        <img src={google} alt="google" />
      </div>
      <div className='customer-img2'>
        <img src={microsoft} alt="microsoft" />
      </div>
      <div className='customer-img3'>
        <img src={flipkart} alt="flipkart" />
      </div>
    </div>
  </div>
</div>
</>
  )
}


