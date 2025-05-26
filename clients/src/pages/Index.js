import React, { useEffect, useState ,useRef} from 'react';
import myImage from '../images/Resume.jpg';
import ibm from '../images/ibm.png';
import infosys from '../images/Infosys.png';
import cognizant from '../images/cognizant.png';
import google from '../images/googlep.png';
import microsoft from '../images/microsoft.png';
import flipkart from '../images/flipkart.png';
import template1 from '../images/template1.webp';
import template2 from '../images/template2.webp';
import template3 from '../images/template3.webp';
import template4 from '../images/template4.webp';
import template5 from '../images/template5.webp';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
export default function Index() {

const templateRef = useRef(null);
const partnerRef = useRef(null);
const [templateVisible, setTemplateVisible] = useState(false);
const [partnerVisible, setPartnerVisible] = useState(false);

  useEffect(() => {
    const observer1 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTemplateVisible(true); // do not reset to false
        }
      },
      { threshold: 0.1 }
    );
    const currentTemplateRef = templateRef.current;
    if (currentTemplateRef) observer1.observe(currentTemplateRef);

    return () => {
      if (currentTemplateRef) observer1.unobserve(currentTemplateRef);
    };
  }, []);

  useEffect(() => {
    const observer2 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPartnerVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    const currentPartnerRef = partnerRef.current;
    if (currentPartnerRef) observer2.observe(currentPartnerRef);

    return () => {
      if (currentPartnerRef) observer2.unobserve(currentPartnerRef);
    };
  }, []);

  const templateMap = {
    template1: '/editor/template1',
    template2: '/editor/template2',
    template3: '/editor/template3',
    template4: '/editor/template4',
    template5: '/editor/template5',
  };
  
  const navigate = useNavigate();

  const handleUseTemplate = (templateId) => {
  const path = templateMap[templateId];
  if (path) {
    window.scrollTo({ top: 0 });
    navigate(path);
  }
  };

  return (
    <>
<div className='index'>
        <div className='left'>

          <div className='left1B'>
          <div className='left-1'>Land your dream job—create your resume now.</div>
          <div className='frontpage-1st-button'><button className='left-button' onClick={() => navigate('../editor/template1')}>Create new resume  <FontAwesomeIcon icon={faArrowRight}/></button></div>
          </div>

          <div className='left-2'>From fresh graduates to seasoned professionals,our resume
          builder helps you create stunning resumes that lead to interviews and offers.</div>
        
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
      <p>Build your resume effortlessly with an intuitive and user-friendly interface.</p>
    </div>

    <div className='love-2'>
      <div className='love-2H'><h3>Professionals And ATS Friendly Templates</h3></div>
      <p>Choose from a variety of modern and ATS-friendly templates designed to impress recruiters.</p>
      <button className='love-button12'>Create new resume <FontAwesomeIcon icon={faArrowRight}/></button>
    </div>
  
    <div className='love-3'>
      <div className='love-3H'><h3>Instant Download Options</h3></div>
      <p>Save your resume in multiple formats like PDF,WORD with just one click.</p>
    </div>
  </div>
</div>

{/* 3rd */}
<div ref={templateRef} className={`show_Template ${templateVisible ? 'visible' : ''}`}>
<h2 className='template-header'>Choose Your Resume Template</h2>
  <div className='template-gallery'>
    <div className='template-card'>
      <img src={template1} alt='Template 1' className='template-thumb' />
      <button className='template-btn' onClick={()=>handleUseTemplate('template1')}>Use Template</button>
    </div>
    <div className='template-card'>
      <img src={template2} alt='Template 2' className='template-thumb' />
      <button className='template-btn' onClick={()=>handleUseTemplate('template2')}>Use Template</button>
    </div>
    <div className='template-card'>
      <img src={template3} alt='Template 3' className='template-thumb' />
      <button className='template-btn' onClick={()=>handleUseTemplate('template3')}>Use Template</button>
    </div>
    <div className='template-card'>
      <img src={template4} alt='Template 4' className='template-thumb' />
      <button className='template-btn' onClick={()=>handleUseTemplate('template4')}>Use Template</button>
    </div>
    <div className='template-card'>
      <img src={template5} alt='Template 5' className='template-thumb' />
      <button className='template-btn' onClick={()=>handleUseTemplate('template5')}>Use Template</button>
    </div>
  </div>
</div>


{/* 4rd */}

<div ref={partnerRef} className={`partner-customer ${partnerVisible ? 'visible' : ''}`}>
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


