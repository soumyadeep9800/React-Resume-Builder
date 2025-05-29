import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
  FaAward,
  FaWrench
} from "react-icons/fa";

const fallback = (value, defaultVal) =>
  value && value.trim() !== "" ? value : defaultVal;

const isEmptyArray = (arr) =>
  !arr || arr.length === 0 || arr.every((item) => !item || (typeof item === "string" && item.trim() === ""));

export default function Template4({ data, fullScale = false }) {
  const resume = {
  name: fallback(data?.name, "Michael Johnson"),
  title: fallback(data?.title, "Software Development Manager"),
  email: fallback(data?.email, "michael.johnson@resumegemini.com"),
  phone: fallback(data?.phone, "+1 (555) 555-555, +1 (123) 456-789"),
  location: fallback(data?.address, "New York, NY, 10001"),
  summary: fallback(
    data?.summary,
    "Dynamic and detail-oriented Software Development Manager with over 10 years of experience in managing full software development life cycles, leading cross-functional teams, and delivering enterprise-grade applications. Proven track record in agile project management, cloud architecture, and team mentorship."
  ),
  education: !isEmptyArray(data?.education)
    ? data.education.map((edu) => ({
        university: fallback(edu.university, "Boston University"),
        department: fallback(edu.department, "B.A. in Marketing & Strategy"),
        cgpa: fallback(edu.cgpa, "8.5"),
        date: fallback(edu.date, "May 2012"),
        location: fallback(edu.location, "Boston, MA"),
      }))
    : [
        {
          university: "Boston University",
          department: "B.A. in Marketing & Strategy",
          cgpa: "8.5",
          date: "May 2012",
          location: "Boston, MA",
        },
        {
          university: "Columbia University",
          department: "M.S. in Computer Science",
          cgpa: "9.1",
          date: "May 2014",
          location: "New York, NY",
        },
      ],
  experience: !isEmptyArray(data?.experience)
    ? data.experience.map((exp) => ({
        company: fallback(exp.company, "Accenture Services"),
        title: fallback(exp.role, "Software Development Manager"),
        date: fallback(exp.duration, "Jun 2018 - Jan 2024"),
        location: fallback(exp.location, "San Francisco, CA"),
        bullets: !isEmptyArray(exp.bullets)
          ? exp.bullets
          : [
              "Led a team of 12 software engineers across multiple projects.",
              "Migrated legacy applications to microservices architecture.",
              "Improved CI/CD pipelines using Jenkins and GitHub Actions.",
            ],
      }))
    : [
        {
          company: "Accenture Services",
          title: "Software Development Manager",
          date: "Jun 2018 – Jan 2024",
          location: "San Francisco, CA",
          bullets: [
            "Led a team of 12 engineers in agile sprints and quarterly releases.",
            "Oversaw cloud transformation for enterprise clients using AWS.",
            "Mentored junior developers and implemented peer review culture.",
          ],
        },
      ],
  skills: !isEmptyArray(data?.skills)
    ? data.skills
    : [
        "JavaScript", "React", "Node.js", "Python", "AWS", "Docker", "Kubernetes",
        "Git", "CI/CD", "MongoDB", "SQL", "Agile", "Scrum", "JIRA"
      ],
  awards: !isEmptyArray(data?.awards)
    ? data.awards
    : [
        "Employee of the Year - Accenture, 2023",
        "Top Innovator Award - Infosys, 2022",
        "Best Team Lead - TCS, 2021",
        "Dean’s List - Columbia University, 2014",
      ],
};

  return (
    <div className={`template4_main_div ${fullScale ? "full-scale" : "small-scale"}`}>
      <div className={`template4 ${fullScale ? "full-scale" : "small-scale"}`}>
        <div className="template4-header">
          <h1>{resume.name}</h1>
          <h2>{resume.title}</h2>
          <div className="template4-contact">
            <span><FaMapMarkerAlt /> {resume.location}</span>
            <span><FaPhone /> {resume.phone}</span>
            <span><FaEnvelope /> {resume.email}</span>
          </div>
        </div>

        <p className="summary">{resume.summary}</p>

        <section>
          <h3 className="template4-section-title"><FaGraduationCap /> Education</h3>
          {resume.education.map((edu, i) => (
            <div key={i} className="edu-entry">
              <p><strong>{edu.university}</strong></p>
              <p>{edu.department}, CGPA: {edu.cgpa}</p>
              <p className="edu-meta"><i>{edu.date} | {edu.location}</i></p>
            </div>
          ))}
        </section>

        <section>
          <h3 className="template4-section-title"><FaBriefcase /> Experience</h3>
          <div className="timeline">
            {resume.experience.map((exp, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <p><strong>{exp.company}</strong></p>
                  <p>{exp.title}</p>
                  <p className="exp-meta"><i>{exp.date} | {exp.location}</i></p>
                  <ul>
                    {exp.bullets.map((b, idx) => <li key={idx}>{b}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="template4-section-title"><FaWrench /> Skills</h3>
          <div className="skill-tags">
            {resume.skills.map((skill, i) => (
              <span key={i} className="skill-tag">{skill}</span>
            ))}
          </div>
        </section>

        <section>
          <h3 className="template4-section-title"><FaAward /> Awards</h3>
          <ul>
            {resume.awards.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </section>
      </div>
    </div>
  );
}
