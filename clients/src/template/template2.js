import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const fallback = (value, defaultVal) =>
  value && value.trim() !== "" ? value : defaultVal;

const isEmptyArray = (arr) =>
  !arr || arr.length === 0 || arr.every((item) => !item || (typeof item === "string" && item.trim() === ""));

export default function Template2({ data, fullScale = false }) {
const resume = {
  name: fallback(data?.name, "Susan Williams"),
  title: fallback(data?.title, "Software Development Manager"),
  email: fallback(data?.email, "susan.williams@resumegemini.com"),
  phone: fallback(data?.phone, "+1 (555) 555-555, +1 (123) 456-789"),
  location: fallback(data?.address, "Atlanta, GA, 30301"),
  summary: fallback(
    data?.summary,
    "Highly motivated and results-oriented Software Development Manager with over 10 years of experience leading teams and delivering enterprise software solutions. Skilled in Agile methodologies, team leadership, and cloud technologies."
  ),
  education: !isEmptyArray(data?.education)
    ? data.education.map((edu) => ({
        university: fallback(edu.university, "The University of Chicago"),
        department: fallback(edu.department, "MS - Computer Science"),
        cgpa: fallback(edu.cgpa, "9.0"),
        date: fallback(edu.date, "Jun 2012"),
        location: fallback(edu.location, "San Francisco, California"),
      }))
    : [
        {
          university: "The University of Chicago",
          department: "MS - Computer Science",
          cgpa: "9.0",
          date: "Jun 2012",
          location: "San Francisco, California",
        },
        {
          university: "University of Washington",
          department: "BS - Computer Engineering",
          cgpa: "8.7",
          date: "May 2010",
          location: "Seattle, Washington",
        },
      ],
  experience: !isEmptyArray(data?.experience)
    ? data.experience.map((exp) => ({
        company: fallback(exp.company, "Accenture Services"),
        title: fallback(exp.role, "Software Development Manager"),
        date: fallback(exp.duration, "Jun 2018 - Jan 2024"),
        location: fallback(exp.location, "San Francisco, California"),
        bullets: !isEmptyArray(exp.bullets)
          ? exp.bullets
          : [
              "Delivered a $5M mission-critical cloud migration project ahead of schedule and under budget.",
              "Led a team of 15 engineers across frontend, backend, and DevOps disciplines.",
              "Collaborated with cross-functional stakeholders to define project roadmaps and KPIs.",
            ],
      }))
    : [
        {
          company: "Accenture Services",
          title: "Software Development Manager",
          date: "Jun 2018 - Jan 2024",
          location: "San Francisco, California",
          bullets: [
            "Delivered a $5M mission-critical cloud migration project ahead of schedule and under budget.",
            "Led a team of 15 engineers across frontend, backend, and DevOps disciplines.",
            "Collaborated with cross-functional stakeholders to define project roadmaps and KPIs.",
          ],
        },
      ],
  skills: !isEmptyArray(data?.skills)
    ? data.skills
    : [
        "JavaScript", "React", "Node.js", "HTML", "CSS",
        "MongoDB", "Express", "Git", "Docker", "Python",
        "Agile", "AWS", "CI/CD", "JIRA"
      ],
  awards: !isEmptyArray(data?.awards)
    ? data.awards
    : [
        "CEO’s Choice Award, 2023",
        "Excellence in Customer Partnership Award, 2021",
        "Spot Recognition for Technical Excellence, 2020",
      ],
};

  return (
    <div className={`template2_main_div ${fullScale ? "full-scale" : "small-scale"}`}>
      <div className={`template2 ${fullScale ? "full-scale" : "small-scale"}`}>
        <div className="template2-header">
          <div>
            <h1>{resume.name}</h1>
            <span className="job-title">{resume.title}</span>
          </div>
          <div className="template2-contact">
            <p><FaEnvelope /> {resume.email}</p>
            <p><FaPhone /> {resume.phone}</p>
            <p><FaMapMarkerAlt /> {resume.location}</p>
          </div>
        </div>

        <p className="summary">{resume.summary}</p>

        <section>
          <h2 className="template2-section-title">Education</h2>
          {resume.education.map((edu, idx) => (
            <div key={idx} className="edu-entry">
              <p><strong>{edu.university}</strong></p>
              <p>{edu.department}, CGPA: {edu.cgpa}</p>
              <p className="edu-meta"><i>{edu.date}  {edu.location}</i></p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="template2-section-title">Experience</h2>
          {resume.experience.map((exp, idx) => (
            <div key={idx} className="exp-entry">
              <p><strong>{exp.company}</strong></p>
              <p>{exp.title}</p>
              <p className="exp-meta"><i>{exp.date}  {exp.location}</i></p>
              <ul>
                {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2 className="template2-section-title">Skills</h2>
          <div className="skills">
            {resume.skills.map((s, i) => (
              <span key={i} className="skill">{s}</span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="template2-section-title">Awards</h2>
          <ul>
            {resume.awards.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </section>
      </div>
    </div>
  );
}