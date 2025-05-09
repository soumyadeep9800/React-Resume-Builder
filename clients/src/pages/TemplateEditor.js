import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Template1 from '../editor/template1';
import Template2 from '../editor/template2';
import Template3 from '../editor/template3';
import Template4 from '../editor/template4';
import Template5 from '../editor/template5';

export default function TemplateEditor() {
    const { templateId } = useParams();

  // Common form data
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    skills: '',
    });

    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    };

const renderTemplate = () => {
    const props = { data: formData };
    switch (templateId) {
      case 'template1':
        return <Template1 {...props} />;
      case 'template2':
        return <Template2 {...props} />;
      case 'template3':
        return <Template3 {...props} />;
      case 'template4':
        return <Template4 {...props} />;
      case 'template5':
        return <Template5 {...props} />;
      default:
        return <div>Template not found</div>;
    }
};

    return (
    <div className="editor-page">
        <div className="form-section">
        <h2 className='editor_h2'>Fill Your Resume Details</h2>
        <input className='input_edit' type="text" name="name" placeholder="Full Name" onChange={handleChange} />
        <input className='input_edit' type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input className='input_edit' type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} />
        <textarea className='input_edit' name="education" placeholder="Education" onChange={handleChange}></textarea>
        <textarea className='input_edit' name="experience" placeholder="Experience" onChange={handleChange}></textarea>
        <textarea className='input_edit' name="skills" placeholder="Skills" onChange={handleChange}></textarea>
        </div>

      <div className="preview-section">
        <h2>Live Preview</h2>
        {renderTemplate()}
      </div>
    </div>
);
}


