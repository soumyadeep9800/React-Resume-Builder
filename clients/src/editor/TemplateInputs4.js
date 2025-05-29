import React, { useState } from 'react';
import { toast } from "react-toastify";

export default function Template4Inputs({ formData, setFormData }) {
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEducationChange = (index, field, value) => {
    const updated = [...formData.education];
    updated[index][field] = value;
    setFormData({ ...formData, education: updated });
  };

  const addEducation = () => {
    const last = formData.education[formData.education.length - 1];
    if (last.university && last.department && last.cgpa) {
      setFormData({
        ...formData,
        education: [...formData.education, { university: '', department: '', cgpa: '', date: '', location: '' }]
      });
    } else {
      toast.error("Fill all fields before adding new education.");
    }
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...formData.experience];
    updated[index][field] = value;
    setFormData({ ...formData, experience: updated });
  };

  const addExperience = () => {
    const last = formData.experience[formData.experience.length - 1];
    if (last.role && last.company && last.duration) {
      setFormData({
        ...formData,
        experience: [...formData.experience, { role: '', company: '', duration: '', location: '', bullets: [''] }]
      });
    } else {
      toast.error("Fill all fields before adding new experience.");
    }
  };

  const handleBulletChange = (expIndex, bulletIndex, value) => {
    const updated = [...formData.experience];
    updated[expIndex].bullets[bulletIndex] = value;
    setFormData({ ...formData, experience: updated });
  };

  const addBullet = (expIndex) => {
    const updated = [...formData.experience];
    updated[expIndex].bullets.push('');
    setFormData({ ...formData, experience: updated });
  };

  const removeBullet = (expIndex, bulletIndex) => {
    const updated = [...formData.experience];
    if (updated[expIndex].bullets.length > 1) {
      updated[expIndex].bullets.splice(bulletIndex, 1);
      setFormData({ ...formData, experience: updated });
    }
  };

  const addCertification = () => {
    setFormData({ ...formData, certifications: [...formData.certifications, ''] });
  };

  const updateCertification = (index, value) => {
    const updated = [...formData.certifications];
    updated[index] = value;
    setFormData({ ...formData, certifications: updated });
  };

  const addLanguage = () => {
    setFormData({ ...formData, languages: [...formData.languages, ''] });
  };

  const updateLanguage = (index, value) => {
    const updated = [...formData.languages];
    updated[index] = value;
    setFormData({ ...formData, languages: updated });
  };

  return (
    <div>
      {step === 1 && (
        <>
          <input className="input_template4" name="name" placeholder="Full Name" onChange={handleChange} value={formData.name} />
          <input className="input_template4" name="title" placeholder="Title" onChange={handleChange} value={formData.title} />
          <input className="input_template4" name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
          <input className="input_template4" name="phone" placeholder="Phone" onChange={handleChange} value={formData.phone} />
          <input className="input_template4" name="address" placeholder="Address" onChange={handleChange} value={formData.address} />
          <textarea className="input_template4" name="summary" placeholder="Professional Summary" onChange={handleChange} value={formData.summary} />

          <h3 className="section-header-dotted">Education</h3>
          {formData.education.map((edu, idx) => (
            <div key={idx}>
              <input className="input_template4" placeholder="University" value={edu.university} onChange={(e) => handleEducationChange(idx, 'university', e.target.value)} />
              <input className="input_template4" placeholder="Department" value={edu.department} onChange={(e) => handleEducationChange(idx, 'department', e.target.value)} />
              <input className="input_template4" placeholder="CGPA" value={edu.cgpa} onChange={(e) => handleEducationChange(idx, 'cgpa', e.target.value)} />
              <input className="input_template4" placeholder="Date" value={edu.date} onChange={(e) => handleEducationChange(idx, 'date', e.target.value)} />
              <input className="input_template4" placeholder="Location" value={edu.location} onChange={(e) => handleEducationChange(idx, 'location', e.target.value)} />
            </div>
          ))}
          <button className="btn_template4" onClick={addEducation}>Add Education</button>
        </>
      )}

      {step === 2 && (
        <>
          <h3 className="section-header-dotted">Experience</h3>
          {formData.experience.map((exp, idx) => (
            <div key={idx}>
              <input className="input_template4" placeholder="Company" value={exp.company} onChange={(e) => handleExperienceChange(idx, 'company', e.target.value)} />
              <input className="input_template4" placeholder="Role" value={exp.role} onChange={(e) => handleExperienceChange(idx, 'role', e.target.value)} />
              <input className="input_template4" placeholder="Duration" value={exp.duration} onChange={(e) => handleExperienceChange(idx, 'duration', e.target.value)} />
              <input className="input_template4" placeholder="Location" value={exp.location} onChange={(e) => handleExperienceChange(idx, 'location', e.target.value)} />
              {exp.bullets.map((bullet, bIdx) => (
                <div key={bIdx} style={{ display: 'flex', gap: '8px' }}>
                  <input className="input_template4" placeholder={`Bullet ${bIdx + 1}`} value={bullet} onChange={(e) => handleBulletChange(idx, bIdx, e.target.value)} />
                  <button className="btn_remove_bullet" onClick={() => removeBullet(idx, bIdx)}>Remove</button>
                </div>
              ))}
              <button className="btn_add_bullet" onClick={() => addBullet(idx)}>Add Bullet</button>
            </div>
          ))}
          <button className="btn_template4" onClick={addExperience}>Add Experience</button>

          <h3 className="section-header-dotted">Certifications</h3>
          {formData.certifications.map((cert, idx) => (
            <input key={idx} className="input_template4" placeholder={`Certification ${idx + 1}`} value={cert} onChange={(e) => updateCertification(idx, e.target.value)} />
          ))}
          <button className="btn_template4" onClick={addCertification}>Add Certification</button>

          <h3 className="section-header-dotted">Languages</h3>
          {formData.languages.map((lang, idx) => (
            <input key={idx} className="input_template4" placeholder={`Language ${idx + 1}`} value={lang} onChange={(e) => updateLanguage(idx, e.target.value)} />
          ))}
          <button className="btn_template4" onClick={addLanguage}>Add Language</button>
        </>
      )}

      <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
        {step > 1 && <button className="btn_template4" onClick={() => { setStep(step - 1); window.scrollTo({ top: 0 }); }}>← Previous</button>}
        {step < 2 && <button className="btn_template4" onClick={() => { setStep(step + 1); window.scrollTo({ top: 0 }); }}>Next →</button>}
      </div>
    </div>
  );
}
