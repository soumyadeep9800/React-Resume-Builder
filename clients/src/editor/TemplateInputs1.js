import React from 'react';
import { toast } from "react-toastify";

const predefinedSkills = [
  'JavaScript', 'React', 'Node.js', 'HTML', 'CSS',
  'MongoDB', 'Express', 'Git', 'Docker', 'Python'
];

export default function Template1Inputs({ formData, setFormData }) {

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEducationChange = (index, field, value) => {
    console.log(`Updating education[${index}].${field} = ${value}`);  // debug log
    const updated = [...formData.education];
    updated[index][field] = value;
    setFormData({ ...formData, education: updated });
  };

  const addEducation = () => {
    const last = formData.education[formData.education.length - 1];
    if (last.university && last.department && last.cgpa) {
      setFormData({
        ...formData,
        education: [...formData.education, { university: '', department: '', cgpa: '' }]
      });
    } else {
      toast.error("Please fill all fields before adding another education entry.");
    }
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { role: '', company: '', duration: '' }]
    });
  };

const handleExperienceChange = (index, field, value) => {
  console.log(`Updating experience[${index}].${field} = ${value}`);
  const updated = [...formData.experience];
  updated[index][field] = value;
  setFormData({ ...formData, experience: updated });
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
      <input className="input_edit123" type="text" name="name" placeholder="Full Name" onChange={handleChange} value={formData.name} />
      <input className="input_edit123" type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
      <input className="input_edit123" type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} value={formData.phone} />
      <input className="input_edit123" type="text" name="address" placeholder="Address" onChange={handleChange} value={formData.address} />
      <textarea className="input_edit123" name="summary" placeholder="Professional Summary" onChange={handleChange} value={formData.summary} />

      <h3 className="h3_editor">Education</h3>
      {formData.education.map((edu, idx) => (
        <div key={idx}>
          <input
            className="input_edit123"
            placeholder="University"
            value={edu.university}
            onChange={(e) => handleEducationChange(idx, 'university', e.target.value)}
          />
          <input
            className="input_edit123"
            placeholder="Department"
            value={edu.department}
            onChange={(e) => handleEducationChange(idx, 'department', e.target.value)}
          />
          <input
            className="input_edit123"
            placeholder="CGPA"
            value={edu.cgpa || ''}  // fallback to empty string
            onChange={(e) => handleEducationChange(idx, 'cgpa', e.target.value)}
          />
        </div>
      ))}
      <button className="btn_edit" onClick={addEducation}>Add Education</button>

      <h3 className="h3_editor">Experience</h3>
      {formData.experience.map((exp, idx) => (
        <div key={idx}>
          <input
            className="input_edit123"
            placeholder="Role"
            value={exp.role}
            onChange={(e) => handleExperienceChange(idx, 'role', e.target.value)}
          />
          <input
            className="input_edit123"
            placeholder="Company"
            value={exp.company}
            onChange={(e) => handleExperienceChange(idx, 'company', e.target.value)}
          />
          <input
            className="input_edit123"
            placeholder="Duration"
            value={exp.duration}
            onChange={(e) => handleExperienceChange(idx, 'duration', e.target.value)}
          />
          <input
          className="input_edit123"
          placeholder="What did you do during this period?"
          value={exp.durationDescription || ""}
          onChange={(e) => handleExperienceChange(idx, 'durationDescription', e.target.value)}
    />
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
