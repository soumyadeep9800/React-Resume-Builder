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

export default function Template5({ data, fullScale = false }) {
  const resume = {
    name: fallback(data?.name, "Barbara Wilson"),
    title: fallback(data?.title, "Software Development Manager"),
    email: fallback(data?.email, "barbara.wilson@resumegemini.com"),
    phone: fallback(data?.phone, "+1 (555) 555-555, +1 (123) 456-789"),
    location: fallback(data?.address, "Seattle, WA, 98101"),
    summary: fallback(
      data?.summary,
      "Highly motivated and result-oriented Software Development Manager with over 10 years of experience in the full software development lifecycle (SDLC). Proven track record of designing and building highly scalable, secure, and performant software systems. Passionate about leading and mentoring high-performing development teams to deliver innovative and high-quality software solutions that consistently exceed business objectives."
    ),
    education: !isEmptyArray(data?.education)
      ? data.education.map((edu) => ({
          university: fallback(edu.university, "The University of Chicago"),
          department: fallback(edu.department, "MS - Computer Science"),
          cgpa: fallback(edu.cgpa, "9.0"),
          date: fallback(edu.date, "Jun 2012"),
          location: fallback(edu.location, "San Francisco, California"),
        }))
      : [],
    experience: !isEmptyArray(data?.experience)
      ? data.experience.map((exp) => ({
          company: fallback(exp.company, "Accenture Services"),
          title: fallback(exp.role, "Software Development Manager"),
          date: fallback(exp.duration, "Jun 2018 - Jan 2024"),
          location: fallback(exp.location, "San Francisco, California"),
          bullets: !isEmptyArray(exp.bullets)
            ? exp.bullets
            : [
                "Delivered critical $5 million project on time, within budget, exceeding stakeholder expectations.",
                "Successfully led a cross-functional team of developers, designers, and stakeholders to achieve key project milestones.",
                "Identified and implemented cloud cost-saving strategies, resulting in $50,000 annual savings.",
                "Migrated legacy project architecture to an event-driven, highly scalable solution, increasing system throughput by 50%.",
                "Leveraged modern development frameworks and technologies to improve application performance and maintainability."
              ],
        }))
      : [
          {
            company: "PieSoft Technologies",
            title: "Senior Software Development Engineer",
            date: "Aug 2012 - May 2018",
            location: "San Jose, California",
            bullets: [
              "Design or develop software systems using scientific models to predict and measure outcome and consequences of design.",
              "Optimized and improved the performance of my application by 50% and uplifted conversion numbers by 10%.",
              "Reduced the project cost by moving away from licensed software & moving to open source.",
              "Mentoring junior developers, performing code reviews and driving performance optimizations.",
              "Coordinated with multiple stakeholders from business team and closed the requirement gaps."
            ]
          }
        ],
    skills: !isEmptyArray(data?.skills)
      ? data.skills
      : [
          "Apache Solr", "Apache Maven", "Apache Hadoop", "NoSQL", "PostgreSQL",
          "Oracle Java", "Apache Cassandra", "Apache Pig", "Python",
          "LAMP Stack", "API Development"
        ],
    awards: !isEmptyArray(data?.awards)
    ? data.awards : [
        "Employee of the Year - Accenture, 2023",
        "Top Innovator Award - Infosys, 2022",
        "Best Team Lead - TCS, 2021",
        "Dean’s List - Columbia University, 2014",
    ],
  };

  return (
    <div className={`template5_main_div ${fullScale ? "full-scale" : "small-scale"}`}>
      <div className={`template5 ${fullScale ? "full-scale" : "small-scale"}`}>
        <div className="template5-header">
          <div>
            <h1><span className="black">{resume.name.split(" ")[0]}</span> <span className="green">{resume.name.split(" ")[1]}</span></h1>
            <h2>{resume.title}</h2>
          </div>
          <div className="template5-contact">
            <p><FaEnvelope /> {resume.email}</p>
            <p><FaPhone /> {resume.phone}</p>
            <p><FaMapMarkerAlt /> {resume.location}</p>
          </div>
        </div>

        <section className="summary-section">
          <h3 className="green-bar">Summary</h3>
          <p>{resume.summary}</p>
        </section>

        <section>
          <h3 className="green-bar"><FaGraduationCap /> Education</h3>
          {resume.education.map((edu, i) => (
            <div key={i} className="edu-entry">
              <p><strong>{edu.university}</strong></p>
              <p>{edu.department}, CGPA: {edu.cgpa}</p>
              <p className="edu-meta"><span className="pill">{edu.date}</span> {edu.location}</p>
            </div>
          ))}
        </section>

        <section>
          <h3 className="green-bar"><FaBriefcase /> Experience</h3>
          {resume.experience.map((exp, i) => (
            <div key={i} className="exp-entry">
              <p><strong>{exp.company}</strong> — {exp.title}</p>
              <p className="exp-meta"><span className="pill">{exp.date}</span> {exp.location}</p>
              <ul>
                {exp.bullets.map((b, idx) => <li key={idx}>{b}</li>)}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h3 className="green-bar"><FaWrench /> Skills</h3>
          <div className="skill-tags">
            {resume.skills.map((skill, i) => (
              <span key={i} className="skill-tag">{skill}</span>
            ))}
          </div>
        </section>

        <section>
          <h3 className="green-bar"><FaAward /> Awards</h3>
          <ul>
            {resume.awards.length === 0
              ? <li>No awards listed</li>
              : resume.awards.map((a, i) => <li key={i}>{a}</li>)
            }
          </ul>
        </section>
      </div>
    </div>
  );
}
