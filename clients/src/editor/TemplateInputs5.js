import React, { useState } from 'react';
import { toast } from "react-toastify";

export default function Template5Inputs({ formData, setFormData }) {
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Education handlers
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
      toast.error("Please fill all fields before adding new education.");
    }
  };

  // Experience handlers
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
      toast.error("Please fill all fields before adding new experience.");
    }
  };

  // Bullets handlers for experience
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

  // Skills handlers (pill-shaped tags)
  const addSkill = () => {
    setFormData({ ...formData, skills: [...formData.skills, ''] });
  };

  const updateSkill = (index, value) => {
    const updated = [...formData.skills];
    updated[index] = value;
    setFormData({ ...formData, skills: updated });
  };

  const removeSkill = (index) => {
    const updated = [...formData.skills];
    updated.splice(index, 1);
    setFormData({ ...formData, skills: updated });
  };

  // Awards handlers
  const addAward = () => {
    setFormData({ ...formData, awards: [...formData.awards, ''] });
  };

  const updateAward = (index, value) => {
    const updated = [...formData.awards];
    updated[index] = value;
    setFormData({ ...formData, awards: updated });
  };

  return (
    <div>
      {step === 1 && (
        <>
          <input
            className="input_template5"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            value={formData.name}
          />
          <input
            className="input_template5"
            name="title"
            placeholder="Professional Title"
            onChange={handleChange}
            value={formData.title}
          />
          <input
            className="input_template5"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            className="input_template5"
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            value={formData.phone}
          />
          <input
            className="input_template5"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            value={formData.address}
          />
          <textarea
            className="input_template5 summary_input"
            name="summary"
            placeholder="Professional Summary"
            onChange={handleChange}
            value={formData.summary}
          />

          <h3 className="section-header-green">Education</h3>
          {formData.education.map((edu, idx) => (
            <div key={idx} className="education-group">
              <input
                className="input_template5"
                placeholder="University"
                value={edu.university}
                onChange={(e) => handleEducationChange(idx, 'university', e.target.value)}
              />
              <input
                className="input_template5"
                placeholder="Department"
                value={edu.department}
                onChange={(e) => handleEducationChange(idx, 'department', e.target.value)}
              />
              <input
                className="input_template5"
                placeholder="CGPA"
                value={edu.cgpa}
                onChange={(e) => handleEducationChange(idx, 'cgpa', e.target.value)}
              />
              <input
                className="input_template5"
                placeholder="Date"
                value={edu.date}
                onChange={(e) => handleEducationChange(idx, 'date', e.target.value)}
              />
              <input
                className="input_template5"
                placeholder="Location"
                value={edu.location}
                onChange={(e) => handleEducationChange(idx, 'location', e.target.value)}
              />
            </div>
          ))}
          <button className="btn_template5" onClick={addEducation}>Add Education</button>
        </>
      )}

      {step === 2 && (
        <>
          <h3 className="section-header-green">Experience</h3>
          {formData.experience.map((exp, idx) => (
            <div key={idx} className="experience-group">
              <input
                className="input_template5"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => handleExperienceChange(idx, 'company', e.target.value)}
              />
              <input
                className="input_template5"
                placeholder="Role"
                value={exp.role}
                onChange={(e) => handleExperienceChange(idx, 'role', e.target.value)}
              />
              <input
                className="input_template5"
                placeholder="Duration"
                value={exp.duration}
                onChange={(e) => handleExperienceChange(idx, 'duration', e.target.value)}
              />
              <input
                className="input_template5"
                placeholder="Location"
                value={exp.location}
                onChange={(e) => handleExperienceChange(idx, 'location', e.target.value)}
              />

              {exp.bullets.map((bullet, bIdx) => (
                <div key={bIdx} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    className="input_template5"
                    placeholder={`Bullet ${bIdx + 1}`}
                    value={bullet}
                    onChange={(e) => handleBulletChange(idx, bIdx, e.target.value)}
                  />
                  <button className="btn_remove_bullet" onClick={() => removeBullet(idx, bIdx)}>Remove</button>
                </div>
              ))}
              <button className="btn_add_bullet" onClick={() => addBullet(idx)}>Add Bullet</button>
            </div>
          ))}
          <button className="btn_template5" onClick={addExperience}>Add Experience</button>

          <h3 className="section-header-green">Skills</h3>
          <div className="skills-wrapper">
            {formData.skills.map((skill, idx) => (
              <div key={idx} className="skill-pill">
                <input
                  className="skill-input"
                  placeholder={`Skill ${idx + 1}`}
                  value={skill}
                  onChange={(e) => updateSkill(idx, e.target.value)}
                />
                <button className="btn_remove_skill" onClick={() => removeSkill(idx)}>×</button>
              </div>
            ))}
          </div>
          <button className="btn_template5" onClick={addSkill}>Add Skill</button>

          <h3 className="section-header-green">Awards</h3>
          {formData.awards.map((award, idx) => (
            <input
              key={idx}
              className="input_template5"
              placeholder={`Award ${idx + 1}`}
              value={award}
              onChange={(e) => updateAward(idx, e.target.value)}
            />
          ))}
          <button className="btn_template5" onClick={addAward}>Add Award</button>
        </>
      )}

      <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
        {step > 1 && (<button className="btn_edit" onClick={() => {setStep(step - 1); window.scrollTo({ top: 0, behavior: 'smooth'});}}>← Previous</button>)}
        {step < 2 && (<button className="btn_edit" onClick={() => {setStep(step + 1); window.scrollTo({ top: 0, behavior: 'smooth'});;}}>Next →</button>)}
      </div>
    </div>
  );
}
