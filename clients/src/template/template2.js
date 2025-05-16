import React from 'react';

export default function template2({ data }) {
  return (
    <div className="template template1">
      <h1>{data.name}</h1>
      <p>Email: {data.email}</p>
      <p>Phone: {data.phone}</p>
      <h3>Education</h3>
      <p>{data.education}</p>
      <h3>Experience</h3>
      <p>{data.experience}</p>
      <h3>Skills</h3>
      <p>{data.skills}</p>
    </div>
  );
}