import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Template1 from '../editor/template1';
import Template2 from '../editor/template2';
import Template3 from '../editor/template3';
import Template4 from '../editor/template4';
import Template5 from '../editor/template5';

const predefinedSkills = [
  'JavaScript', 'React', 'Node.js', 'HTML', 'CSS',
  'MongoDB', 'Express', 'Git', 'Docker', 'Python'
];

export default function TemplateEditor() {
  const { templateId } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    summary: '',
    education: [{ university: '', department: '', cgpa: '' }],
    experience: [{ role: '', company: '', duration: '' }],
    skills: [],
    customSkill: '',
    awards: [''],
    removedSkills: []
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEducationChange = (index, field, value) => {
    const updated = [...formData.education];
    updated[index][field] = value;
    setFormData({ ...formData, education: updated });
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...formData.experience];
    updated[index][field] = value;
    setFormData({ ...formData, experience: updated });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { role: '', company: '', duration: '' }]
    });
  };

  const addAward = () => {
    setFormData({ ...formData, awards: [...formData.awards, ''] });
  };

  const updateAward = (index, value) => {
    const updated = [...formData.awards];
    updated[index] = value;
    setFormData({ ...formData, awards: updated });
  };

  const handleSkillToggle = (skill) => {
    if (formData.skills.includes(skill)) {
      setFormData({
        ...formData,
        skills: formData.skills.filter(s => s !== skill),
        removedSkills: [...formData.removedSkills, skill]
      });
    } else {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill],
        removedSkills: formData.removedSkills.filter(s => s !== skill)
      });
    }
  };

  const addCustomSkill = () => {
    if (formData.customSkill.trim()) {
      setFormData({
        ...formData,
        skills: [...formData.skills, formData.customSkill.trim()],
        customSkill: ''
      });
    }
  };

  const renderInputsForTemplate1 = () => (
    <>
      <input className="input_edit123" type="text" name="name" placeholder="Full Name" onChange={handleChange} />
      <input className="input_edit123" type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input className="input_edit123" type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} />
      <input className="input_edit123" type="text" name="address" placeholder="Address" onChange={handleChange} />
      <textarea className="input_edit123" name="summary" placeholder="Professional Summary" onChange={handleChange} />

      <h3 className="h3_editor">Education</h3>
      {formData.education.map((edu, idx) => (
        <div key={idx}>
          <input className="input_edit123" placeholder="University" onChange={(e) => handleEducationChange(idx, 'university', e.target.value)} />
          <input className="input_edit123" placeholder="Department" onChange={(e) => handleEducationChange(idx, 'department', e.target.value)} />
          <input className="input_edit123" placeholder="CGPA" onChange={(e) => handleEducationChange(idx, 'cgpa', e.target.value)} />
        </div>
      ))}

      <h3 className="h3_editor">Experience</h3>
      {formData.experience.map((exp, idx) => (
        <div key={idx}>
          <input className="input_edit123" placeholder="Role" onChange={(e) => handleExperienceChange(idx, 'role', e.target.value)} />
          <input className="input_edit123" placeholder="Company" onChange={(e) => handleExperienceChange(idx, 'company', e.target.value)} />
          <input className="input_edit123" placeholder="Duration" onChange={(e) => handleExperienceChange(idx, 'duration', e.target.value)} />
        </div>
      ))}
      <button className="btn_edit" onClick={addExperience}>Add Experience</button>

      <h3 className="h3_editor">Skills</h3>
      <div className="skill-selection12">
        {predefinedSkills.map(skill => (
          !formData.removedSkills.includes(skill) && (
            <button key={skill} className={`skill-btn_edit ${formData.skills.includes(skill) ? 'selected' : ''}`} onClick={() => handleSkillToggle(skill)}>
              {skill}
            </button>
          )
        ))}
      </div>
      <input className="input_edit123" type="text" value={formData.customSkill} placeholder="Add Custom Skill"
        onChange={(e) => setFormData({ ...formData, customSkill: e.target.value })} />
      <button className="btn_edit" onClick={addCustomSkill}>Add Skill</button>

      <h3 className="h3_editor">Awards</h3>
      {formData.awards.map((award, idx) => (
        <input
          key={idx}
          className="input_edit123"
          placeholder={`Award ${idx + 1}`}
          value={award}
          onChange={(e) => updateAward(idx, e.target.value)}
        />
      ))}
      <button className="btn_edit" onClick={addAward}>Add Award</button>
    </>
  );

  const renderTemplate = () => {
    const props = { data: formData };
    switch (templateId) {
      case 'template1': return <Template1 {...props} />;
      case 'template2': return <Template2 {...props} />;
      case 'template3': return <Template3 {...props} />;
      case 'template4': return <Template4 {...props} />;
      case 'template5': return <Template5 {...props} />;
      default: return <div>Template not found</div>;
    }
  };

  return (
    <div className="editor-page">
      <div className="form-sectionxyzxyz">
        <h2 className="editor_h2">Fill Your Resume Details</h2>
        {templateId === 'template1' ? renderInputsForTemplate1() : (
          <>
            <input className="input_edit123" name="name" placeholder="Full Name" onChange={handleChange} />
            <input className="input_edit123" name="title" placeholder="Job Title" onChange={handleChange} />
            <textarea className="input_edit123" name="summary" placeholder="Professional Summary" onChange={handleChange} />
            <textarea className="input_edit123" name="experience" placeholder="Experience" onChange={handleChange} />
            <textarea className="input_edit123" name="education" placeholder="Education" onChange={handleChange} />
            <textarea className="input_edit123" name="skills" placeholder="Skills (comma-separated)" onChange={handleChange} />
            <input className="input_edit123" name="phone" placeholder="Phone" onChange={handleChange} />
            <input className="input_edit123" name="email" placeholder="Email" onChange={handleChange} />
            <input className="input_edit123" name="address" placeholder="Address" onChange={handleChange} />
          </>
        )}
      </div>

      <div className="preview-section123">
        {/* <h2 className="editor_h2">Live Preview</h2> */}
        {renderTemplate()}
      </div>
    </div>
  );
}
