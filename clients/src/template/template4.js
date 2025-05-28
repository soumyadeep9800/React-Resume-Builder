// import React from "react";
// import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

// const fallback = (value, defaultVal) => (value?.trim() ? value : defaultVal);
// const isEmptyArray = (arr) =>
//   !arr || arr.length === 0 || arr.every((item) => !item || (typeof item === "string" && item.trim() === ""));

// export default function Template4({ data }) {
//   const resume = {
//     name: fallback(data?.name, "Mary Garcia"),
//     title: fallback(data?.title, "Software Development Manager"),
//     phone: fallback(data?.phone, "+1 (555) 555-555, +1 (123) 456-789"),
//     email: fallback(data?.email, "mary.garcia@resumegemini.com"),
//     address: fallback(data?.address, "Houston, TX, 77001"),
//     summary: fallback(
//       data?.summary,
//       "Highly motivated and result-oriented Software Development Manager with over 10 years of experience in the full software development lifecycle (SDLC). Proven track record of designing and building highly scalable, secure, and performant software systems."
//     ),
//     education: !isEmptyArray(data?.education)
//       ? data.education
//       : [
//           {
//             university: "The University of Chicago",
//             department: "MS - Computer Science, CGPA: 9.0",
//             location: "San Francisco, California",
//             date: "Jun 2012",
//           },
//         ],
//     experience: !isEmptyArray(data?.experience)
//       ? data.experience
//       : [
//           {
//             company: "Accenture Services",
//             role: "Software Development Manager",
//             location: "San Francisco, California",
//             duration: "Jun 2018 - Jan 2024",
//             bullets: [
//               "Delivered critical $5 million project on time and within budget, exceeding stakeholder expectations.",
//               "Successfully led a cross-functional team of developers, designers, and stakeholders.",
//               "Identified and implemented cloud cost-saving strategies, saving $50,000 annually.",
//               "Migrated legacy project to event-driven architecture, improving throughput by 50%.",
//             ],
//           },
//           {
//             company: "PieSoft Technologies",
//             role: "Senior Software Development Engineer",
//             location: "San Jose, California",
//             duration: "Aug 2012 - May 2018",
//             bullets: [
//               "Optimized performance of core applications by 50%.",
//               "Mentored junior developers and improved code quality through reviews.",
//               "Reduced project costs by switching to open-source solutions.",
//             ],
//           },
//         ],
//     skills: !isEmptyArray(data?.skills)
//       ? data.skills
//       : [
//           "Agile PLM", "Apache Solr", "Apache Maven", "Apache Hadoop", "NoSQL",
//           "PostgreSQL", "Oracle Java", "PHP", "Apache Cassandra", "Apache Pig",
//           "Python", "LAMP Stack",
//         ],
//     awards: !isEmptyArray(data?.awards)
//       ? data.awards
//       : [
//           "CEO's Choice Award, 2023",
//           "Excellence in Customer Partnership Award, 2021",
//         ],
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <div>
//           <h1>{resume.name}</h1>
//           <p className={styles.title}>{resume.title}</p>
//         </div>
//         <div className={styles.contact}>
//           <p><FaPhone /> {resume.phone}</p>
//           <p><FaEnvelope /> {resume.email}</p>
//           <p><FaMapMarkerAlt /> {resume.address}</p>
//         </div>
//       </div>

//       <p className={styles.summary}>{resume.summary}</p>
//       <hr className={styles.divider} />

//       <section>
//         <h2 className={styles.sectionTitle}>🎓 Education</h2>
//         {resume.education.map((edu, i) => (
//           <div key={i} className={styles.educationItem}>
//             <p><strong>{edu.university}</strong> — {edu.department}</p>
//             <p className={styles.subtext}>{edu.location}</p>
//             <span className={styles.tag}>{edu.date}</span>
//           </div>
//         ))}
//       </section>

//       <section>
//         <h2 className={styles.sectionTitle}>💼 Experience</h2>
//         <div className={styles.timeline}>
//           {resume.experience.map((exp, i) => (
//             <div key={i} className={styles.timelineItem}>
//               <div className={styles.timelineDot} />
//               <div className={styles.timelineContent}>
//                 <p><strong>{exp.company}</strong> — {exp.role}</p>
//                 <p className={styles.subtext}>{exp.location}</p>
//                 <ul>
//                   {exp.bullets.map((b, j) => (
//                     <li key={j}>{b}</li>
//                   ))}
//                 </ul>
//                 <span className={styles.tag}>{exp.duration}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section>
//         <h2 className={styles.sectionTitle}>🧠 Skills</h2>
//         <div className={styles.skills}>
//           {resume.skills.map((skill, i) => (
//             <span key={i} className={styles.skillTag}>{skill}</span>
//           ))}
//         </div>
//       </section>

//       <section>
//         <h2 className={styles.sectionTitle}>🏆 Awards</h2>
//         <ul>
//           {resume.awards.map((award, i) => (
//             <li key={i}>{award}</li>
//           ))}
//         </ul>
//       </section>
//     </div>
//   );
// }
