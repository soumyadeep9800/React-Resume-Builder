import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const fallback = (value, defaultVal) =>
  value && value.trim() !== "" ? value : defaultVal;

const isEmptyArray = (arr) =>
  !arr || arr.length === 0 || arr.every((item) => !item || (typeof item === "string" && item.trim() === ""));

export default function Template3({ data, fullScale = false }) {
  const resume = {
  name: fallback(data?.name, "Michael Johnson"),
  title: fallback(data?.title, "Software Development Manager"),
  email: fallback(data?.email, "michael.johnson@resumegemini.com"),
  phone: fallback(data?.phone, "+1 (555) 555-555, +1 (123) 456-789"),
  location: fallback(data?.address, "New York, NY, 10001"),
  summary: fallback(
    data?.summary,
    "Highly motivated and results-oriented Software Development Manager with over 10 years of experience leading teams in agile software development environments. Proven track record of delivering high-quality products on time and within budget while fostering a culture of innovation and continuous improvement."
  ),
  education: !isEmptyArray(data?.education)
    ? data.education.map((edu) => ({
        university: fallback(edu.university, "Boston University"),
        department: fallback(edu.department, "Bachelor of Arts - Marketing"),
        cgpa: fallback(edu.cgpa, "8.0"),
        date: fallback(edu.date, "Jun 2012"),
        location: fallback(edu.location, "Boston, MA"),
      }))
    : [
        {
          university: "Boston University",
          department: "Bachelor of Arts - Marketing",
          cgpa: "8.0",
          date: "Jun 2012",
          location: "Boston, MA",
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
              "Led a team of 20+ software developers in delivering enterprise-level applications.",
              "Implemented Agile methodologies to improve productivity and project visibility.",
              "Collaborated with stakeholders to define product roadmaps and project milestones.",
            ],
      }))
    : [
        {
          company: "Accenture Services",
          title: "Software Development Manager",
          date: "Jun 2018 - Jan 2024",
          location: "San Francisco, California",
          bullets: [
            "Led a team of 20+ software developers in delivering enterprise-level applications.",
            "Implemented Agile methodologies to improve productivity and project visibility.",
            "Collaborated with stakeholders to define product roadmaps and project milestones.",
          ],
        },
      ],
  awards: !isEmptyArray(data?.awards)
    ? data.awards
    : [
        "Employee of the Year, Accenture (2020)",
        "Excellence in Leadership, Accenture (2022)",
      ],
  certifications: !isEmptyArray(data?.certifications)
    ? data.certifications
    : [
        "Certified Scrum Master (CSM)",
        "AWS Certified Solutions Architect",
        "PMP – Project Management Professional",
      ],
  languages: !isEmptyArray(data?.languages)
    ? data.languages
    : ["English", "French", "German"],
};

  return (
    <div className={`template3_main_div ${fullScale ? "full-scale" : "small-scale"}`}>
      <div className={`template3 ${fullScale ? "full-scale" : "small-scale"}`}>
        <div className="template3-header">
          <h1>{resume.name}</h1>
          <h2>{resume.title}</h2>
          <div className="template3-contact">
            <span><FaMapMarkerAlt /> {resume.location}</span>
            <span><FaPhone /> {resume.phone}</span>
            <span><FaEnvelope /> {resume.email}</span>
          </div>
        </div>

        <p className="summary">{resume.summary}</p>

        <section>
          <h3 className="template3-section-title">Education</h3>
          {resume.education.map((edu, i) => (
            <div key={i} className="edu-entry">
              <p><strong>{edu.university}</strong></p>
              <p>{edu.department}, CGPA: {edu.cgpa}</p>
              <p className="edu-meta"><i>{edu.date} {edu.location}</i></p>
            </div>
          ))}
        </section>

        <section>
          <h3 className="template3-section-title">Experience</h3>
          {resume.experience.map((exp, i) => (
            <div key={i} className="exp-entry">
              <p><strong>{exp.company}</strong></p>
              <p>{exp.title}</p>
              <p className="exp-meta"><i>{exp.date} {exp.location}</i></p>
              <ul>
                {exp.bullets.map((b, idx) => <li key={idx}>{b}</li>)}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h3 className="template3-section-title">Awards</h3>
          <ul>
            {resume.awards.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </section>

        <section>
          <h3 className="template3-section-title">Certifications</h3>
          <ul>
            {resume.certifications.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </section>

        <section>
          <h3 className="template3-section-title">Language</h3>
          <div className="language-badges">
            {resume.languages.map((lang, i) => (
              <span key={i} className="lang-badge">{lang}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
