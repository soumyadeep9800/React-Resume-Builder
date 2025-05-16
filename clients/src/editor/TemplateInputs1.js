import React from 'react';

const predefinedSkills = [
  'JavaScript', 'React', 'Node.js', 'HTML', 'CSS',
  'MongoDB', 'Express', 'Git', 'Docker', 'Python'
];

export default function Template1Inputs({ formData, setFormData }) {

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

  return (
    <div>
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
            <button
              key={skill}
              className={`skill-btn_edit ${formData.skills.includes(skill) ? 'selected' : ''}`}
              onClick={() => handleSkillToggle(skill)}
            >
              {skill}
            </button>
          )
        ))}
      </div>
      <input
        className="input_edit123"
        type="text"
        value={formData.customSkill}
        placeholder="Add Custom Skill"
        onChange={(e) => setFormData({ ...formData, customSkill: e.target.value })}
      />
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
    </div>
  );
}
