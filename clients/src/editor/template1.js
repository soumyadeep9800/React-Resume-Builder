export default function Template1({ data }) {
  return (
    <div className="resume-template">
      <h1>{data.name || 'Your Name'}</h1>
      <p>Email: {data.email || 'example@email.com'}</p>
      <p>Phone: {data.phone || '123-456-7890'}</p>

      <section>
        <h2>Education</h2>
        <p>{data.education || 'Your education details'}</p>
      </section>

      <section>
        <h2>Experience</h2>
        <p>{data.experience || 'Your work experience'}</p>
      </section>

      <section>
        <h2>Skills</h2>
        <p>{data.skills || 'Your skills'}</p>
      </section>
    </div>
  );
}


