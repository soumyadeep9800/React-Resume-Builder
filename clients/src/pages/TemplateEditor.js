import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    education: [{ university: '', department: '', cgpa: '' }],
    experience: [{ role: '', company: '', duration: '' ,location: '',bullets: [''],}],
    skills: [],
    removedSkills: [],
    customSkill: '',
    awards: [],
  });

  const renderInputs = () => {
    switch (templateId) {
      case 'template1':
        return <Template1Inputs formData={formData} setFormData={setFormData} />;
      case 'template2':
        return <Template2Inputs formData={formData} setFormData={setFormData} />;
      case 'template3':
        return <Template3Inputs formData={formData} setFormData={setFormData} />;
      case 'template4':
        return <Template4Inputs formData={formData} setFormData={setFormData} />;
      case 'template5':
        return <Template5Inputs formData={formData} setFormData={setFormData} />;
      default:
        return <div>Please select a valid template to start editing.</div>;
    }
  };

  const renderTemplate = () => {
    switch (templateId) {
      case 'template1':
        return <Template1 data={formData} />;
      case 'template2':
        return <Template2 data={formData} />;
      case 'template3':
        return <Template3 data={formData} />;
      case 'template4':
        return <Template4 data={formData} />;
      case 'template5':
        return <Template5 data={formData} />;
      default:
        return <div>Preview will appear here once a template is selected.</div>;
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
        {renderTemplate()}
      </div>
    </div>
  );
}
