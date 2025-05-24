import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUser,
  FaGraduationCap,
  FaBriefcase,
  FaTools,
  FaAward
} from 'react-icons/fa';

// Helper to check if a value is non-empty, otherwise return a default
const fallback = (value, defaultVal) =>
  value && value.trim() !== '' ? value : defaultVal;

// Helper to check if array is empty or contains only empty strings
const isEmptyArray = (arr) =>
  !arr || arr.length === 0 || arr.every(item => !item || (typeof item === 'string' && item.trim() === ''));

export default function Template1({ data, fullScale = false }) {
  const resume = {
    name: fallback(data?.name, 'Jennifer Brown'),
    email: fallback(data?.email, 'jennifer.brown@resumegemini.com'),
    phone: fallback(data?.phone, '+1 (555) 555-555, +1 (123) 456-789'),
    location: fallback(data?.address, 'Dallas, TX, 75201'),
    summary: fallback(data?.summary, 'Highly motivated and result-oriented Software Development Manager with over 10 years of experience...'),

    education: !isEmptyArray(data?.education)
      ? data.education.map((edu) => ({
          university: fallback(edu.university, 'The University of Chicago'),
          department: fallback(edu.department, 'MS - Computer Science'),
          cgpa: fallback(edu.cgpa, '9.0'),
          date: fallback(edu.date, 'Jun 2012'),
          location: fallback(edu.location, 'San Francisco, California'),
        }))
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
      ? data.experience.map((exp) => {
          const location = fallback(exp.location, 'San Francisco, California');
          const bullets = !isEmptyArray(exp.bullets)
            ? exp.bullets
            : [
                'Delivered critical $5 million project on time and within budget...',
                'Successfully led a cross-functional team...',
                'Identified and implemented cloud cost-saving strategies...',
              ];
          return {
            company: fallback(exp.company, 'Accenture Services'),
            title: fallback(exp.role, 'Software Development Manager'),
            date: fallback(exp.duration, 'Jun 2018 - Jan 2024'),
            location,
            bullets,
          };
        })
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
    // <div className="resume-template_main_div">
    //   <div className="resume-template">
    <div className={`resume-template_main_div ${fullScale ? 'full-scale' : 'small-scale'}`}>
      <div className={`resume-template ${fullScale ? 'full-scale' : 'small-scale'}`}>
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
              <p><strong>{edu.university}</strong></p>
              <p>{edu.department}, CGPA: {edu.cgpa}</p>
              <p className="location-date">
                {edu.date} <i>{edu.location}</i>
              </p>
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
                {job.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
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