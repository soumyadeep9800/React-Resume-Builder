import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaUser, FaGraduationCap, FaBriefcase, FaTools, FaAward } from 'react-icons/fa';

export default function Template1({ data }) {
  const resume = {
    name: data?.name || 'Jennifer Brown',
    email: data?.email || 'jennifer.brown@resumegemini.com',
    phone: data?.phone || '+1 (555) 555-555, +1 (123) 456-789',
    location: data?.location || 'Dallas, TX, 75201',
    summary:
      data?.summary ||
      `Highly motivated and result-oriented Software Development Manager with over 10 years of experience...`,
    education: {
      degree: 'MS - Computer Science, CGPA: 9.0',
      school: 'The University of Chicago',
      date: 'Jun 2012',
      location: 'San Francisco, California',
    },
    experience: [
      {
        company: 'Accenture Services',
        title: 'Software Development Manager',
        date: 'Jun 2018 - Jan 2024',
        location: 'San Francisco, California',
        bullets: [
          'Delivered critical $5 million project on time and within budget...',
          'Successfully led a cross-functional team...',
          'Identified and implemented cloud cost-saving strategies...',
          'Spearheaded the launch of friends & family referral program...',
          'Migrated legacy project architecture...',
          'Leveraged modern development frameworks...',
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
          'Mentoring junior developers...',
          'Coordinating with multiple stakeholders...',
        ],
      },
    ],
    skills: [
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
    awards: ['CEO’s Choice Award, 2023', 'Excellence in Customer Partnership Award, 2021'],
  };

  return (
    <div className="resume-template">
      <div className="header">
        <h1>{resume.name}</h1>
        <div className="contact">
          <p><FaEnvelope /> {resume.email}</p>
          <p><FaPhone /> {resume.phone}</p>
          <p><FaMapMarkerAlt /> {resume.location}</p>
        </div>
      </div>

      <hr className="divider" />

      <section>
        <h2><FaUser /> Summary</h2>
        <p>{resume.summary}</p>
      </section>

      <section>
        <h2><FaGraduationCap /> Education</h2>
        <p><strong>{resume.education.school}</strong></p>
        <p>{resume.education.degree}</p>
        <p className="location-date">{resume.education.date} <i>{resume.education.location}</i></p>
      </section>

      <section>
        <h2><FaBriefcase /> Experience</h2>
        {resume.experience.map((job, index) => (
          <div key={index} className="job">
            <p><strong>{job.company}</strong></p>
            <p>{job.title}</p>
            <p>{job.date} <i>{job.location}</i></p>
            <ul>
              {job.bullets.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2><FaTools /> Skills</h2>
        <div className="skills">
          {resume.skills.map((skill, index) => (
            <span className="skill" key={index}>{skill}</span>
          ))}
        </div>
      </section>

      <section>
        <h2><FaAward /> Awards</h2>
        <ul>
          {resume.awards.map((award, index) => (
            <li key={index}>{award}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}