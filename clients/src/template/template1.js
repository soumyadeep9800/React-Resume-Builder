import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaUser, FaGraduationCap, FaBriefcase, FaTools, FaAward } from 'react-icons/fa';

export default function Template1({ data }) {
  // Helper to check if array is empty or all empty strings
  const isEmptyArray = (arr) => !arr || arr.length === 0 || arr.every(item => !item || (typeof item === 'string' && item.trim() === ''));

  // Use user data if present, otherwise fallback to defaults
  const resume = {
    name: data?.name?.trim() || 'Jennifer Brown',
    email: data?.email?.trim() || 'jennifer.brown@resumegemini.com',
    phone: data?.phone?.trim() || '+1 (555) 555-555, +1 (123) 456-789',
    location: data?.address?.trim() || 'Dallas, TX, 75201',
    summary:
      data?.summary?.trim() ||
      `Highly motivated and result-oriented Software Development Manager with over 10 years of experience...`,
    
    education: !isEmptyArray(data?.education)
      ? data.education
      : [
          {
            university: 'The University of Chicago',
            department: 'MS - Computer Science',
            cgpa: '9.0',
            date: 'Jun 2012',
            location: 'San Francisco, California',
          },
        ],

    experience: !isEmptyArray(data?.experience)
      ? data.experience.map((exp) => ({
          company: exp.company || 'Accenture Services',
          title: exp.role || 'Software Development Manager',
          date: exp.duration || 'Jun 2018 - Jan 2024',
          location: 'San Francisco, California',
          bullets: [
            'Delivered critical $5 million project on time and within budget...',
            'Successfully led a cross-functional team...',
            'Identified and implemented cloud cost-saving strategies...',
          ],
        }))
      : [
          {
            company: 'Accenture Services',
            title: 'Software Development Manager',
            date: 'Jun 2018 - Jan 2024',
            location: 'San Francisco, California',
            bullets: [
              'Delivered critical $5 million project on time and within budget...',
              'Successfully led a cross-functional team...',
              'Identified and implemented cloud cost-saving strategies...',
            ],
          },
          {
            company: 'PieSoft Technologies',
            title: 'Senior Software Development Engineer',
            date: 'Aug 2012 - May 2018',
            location: 'San Jose, California',
            bullets: [
              'Design or develop software systems...',
              'Optimized and improved the performance...',
              'Reduced the project cost...',
            ],
          },
        ],

    skills: !isEmptyArray(data?.skills)
      ? data.skills
      : [
          'Agile Product Lifecycle Management PLM',
          'Apache Solr',
          'Apache Maven',
          'Apache Hadoop',
          'NoSQL',
          'PostgreSQL',
          'Oracle Java',
          'PHP: Hypertext Preprocessor',
          'Apache Cassandra',
          'Apache Pig',
          'Python',
          'LAMP Stack',
        ],

    awards: !isEmptyArray(data?.awards)
      ? data.awards
      : ['CEO’s Choice Award, 2023', 'Excellence in Customer Partnership Award, 2021'],
  };

  return (
    <div className="resume-template_main_div">
      <div className="resume-template">
        <div className="headerxyz">
          <h1>{resume.name}</h1>
          <div className="contact">
            <p><FaEnvelope /> {resume.email}</p>
            <p><FaPhone /> {resume.phone}</p>
            <p><FaMapMarkerAlt /> {resume.location}</p>
          </div>
        </div>

        <hr className="divider" />

        <section className="section_template1">
          <h2><FaUser /> Summary</h2>
          <p>{resume.summary}</p>
        </section>

        <section className="section_template1">
          <h2><FaGraduationCap /> Education</h2>
          {resume.education.map((edu, idx) => (
            <div key={idx}>
              <p><strong>{edu.university || 'University Name'}</strong></p>
              <p>{edu.department || 'Degree, CGPA'}</p>
              <p className="location-date">{edu.date || ''} <i>{edu.location || ''}</i></p>
            </div>
          ))}
        </section>

        <section className="section_template1">
          <h2 className="section_template1_h2"><FaBriefcase /> Experience</h2>
          {resume.experience.map((job, idx) => (
            <div key={idx} className="job">
              <p><strong>{job.company}</strong></p>
              <p>{job.title}</p>
              <p>{job.date} <i>{job.location}</i></p>
              <ul>
                {job.bullets && job.bullets.map((bullet, i) => <li key={i}>{bullet}</li>)}
              </ul>
            </div>
          ))}
        </section>

        <section className="section_template1">
          <h2 className="section_template1_h2"><FaTools /> Skills</h2>
          <div className="skills">
            {resume.skills.map((skill, idx) => (
              <span className="skill" key={idx}>{skill}</span>
            ))}
          </div>
        </section>

        <section className="section_template1">
          <h2 className="section_template1_h2"><FaAward /> Awards</h2>
          <ul>
            {resume.awards.map((award, idx) => (
              <li key={idx}>{award}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
