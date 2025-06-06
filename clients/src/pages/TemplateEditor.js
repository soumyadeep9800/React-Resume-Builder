import React, { useState, useRef } from 'react';
import { toast } from "react-toastify";
import { useParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

import Template1 from '../template/template1';
import Template2 from '../template/template2';
import Template3 from '../template/template3';
import Template4 from '../template/template4';
import Template5 from '../template/template5';

import Template1Inputs from '../editor/TemplateInputs1';
import Template2Inputs from '../editor/TemplateInputs2';
import Template3Inputs from '../editor/TemplateInputs3';
import Template4Inputs from '../editor/TemplateInputs4';
import Template5Inputs from '../editor/TemplateInputs5';

export default function TemplateEditor() {
  const { templateId } = useParams();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const pdfRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    education: [{ university: '', department: '', cgpa: '', location: '', date: '' }],
    experience: [{ role: '', company: '', duration: '', location: '', bullets: [''] }],
    skills: [],
    removedSkills: [],
    customSkill: '',
    awards: [],
    certifications: [],
    languages: [],
  });


const generatePDF = async () => {
  const element = pdfRef.current;
  if (!element) return;
  setIsGenerating(true);
  const opt = {
    margin:       [0, 0, 20, 0],
    filename:     'resume.pdf',
    image:        { type: 'jpeg', quality: 1 },
    html2canvas:  {
      scale: 2,
      useCORS: true,
      scrollX: 0,
      scrollY: 0,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  };
  try {
    await new Promise(resolve => setTimeout(resolve, 500)); // wait for layout/render
    await html2pdf().set(opt).from(element).save();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast.success("PDF generated and downloaded!");
  } catch (err) {
    toast.error("PDF generation failed.");
  }
  setIsGenerating(false);
};

  const renderInputs = () => {
    switch (templateId) {
      case 'template1': return <Template1Inputs formData={formData} setFormData={setFormData} />;
      case 'template2': return <Template2Inputs formData={formData} setFormData={setFormData} />;
      case 'template3': return <Template3Inputs formData={formData} setFormData={setFormData} />;
      case 'template4': return <Template4Inputs formData={formData} setFormData={setFormData} />;
      case 'template5': return <Template5Inputs formData={formData} setFormData={setFormData} />;
      default: return <div>Please select a valid template to start editing.</div>;
    }
  };

  const renderTemplate = (fullScale = false) => {
    const props = { data: formData, fullScale };
    switch (templateId) {
      case 'template1': return <Template1 {...props} />;
      case 'template2': return <Template2 {...props} />;
      case 'template3': return <Template3 {...props} />;
      case 'template4': return <Template4 {...props} />;
      case 'template5': return <Template5 {...props} />;
      default: return <div>Preview will appear here once a template is selected.</div>;
    }
  };

  return (
    <div className="template-editor-container">
      <div className="form-sectionxyzxyz">
        <h2 className="editor_h2">Fill Your Resume Details</h2>
        {renderInputs()}
      </div>

      <div className="preview-sectionxyzxyz">
        <h2 className="editor_h2">Live Preview</h2>
        <div className="resume-container">
          {renderTemplate()}
        </div>

        <div className='pdf_button_parent'>
          <button className="pdf_button" onClick={() => generatePDF()} disabled={isGenerating}>
            {isGenerating ? 'Generating...' : 'Download PDF'}
          </button>
          <button className="view_button" onClick={() => {
            if (window.innerWidth < 900) {
            toast.info("Switch to desktop view to see a better preview.");
            setShowPreview(true);
            } else {
            setShowPreview(true);
            }
          }}>
          🔍 View
          </button>
        </div>
      </div>

      {showPreview && (
        <div className="modal-overlay" onClick={() => setShowPreview(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
        onClick={() => setShowPreview(false)}
        className="close-button"
        aria-label="Close preview"
        >
        ✖
        </button>
      <div className="a4-preview">
        {renderTemplate(true)}
      </div>
      </div>
    </div>
    )}
    {/* Hidden full-size preview for PDF */}
    <div style={{ visibility: 'hidden', position: 'fixed', top: 0, left: 0, zIndex: -1 }}>
        <div ref={pdfRef} className="a4-preview">
          {renderTemplate(true)}
        </div>
    </div>
    </div>
  );
}