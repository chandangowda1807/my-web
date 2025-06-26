import React from 'react';

const Education = ({ id }) => {
  const education = [
    {
      degree: 'Bachelor of Engineering in Information Science & Engineering',
      institution: 'Alva\'s Institute of Engineering & Technology, Mangalore',
      duration: '2021 — 2025',
      score: 'CGPA: 7.3'
    },
    {
      degree: 'PUC in Science (PCMB)',
      institution: 'BGS Science & Commerce PU College, Balehonnur',
      duration: '2019 — 2021',
      score: 'Percentage: 77%'
    },
    {
      degree: 'SSLC',
      institution: 'BGS High School, Balehonnur',
      duration: '2018 — 2019',
      score: 'Percentage: 82.72%'
    }
  ];

  const certifications = [
    { name: 'Salesforce (Earned Administrative Trailmax Badges)', date: 'Jan 2024' },
    { name: 'Postman (API Fundamental Student Expert)', date: 'Dec 2022' },
    { name: 'UiPath (Automation Explorer)', date: 'Dec 2023' },
    { name: 'Code Chef (Basic Programming)', date: 'Mar 2024' }
  ];

  return (
    <section id={id} className="education section">
      <div className="container">
        <h2 className="section-title">Education</h2>
        <div className="education-timeline">
          {education.map((edu, index) => (
            <div key={index} className="education-item">
              <div className="education-content">
                <h3>{edu.degree}</h3>
                <h4>{edu.institution}</h4>
                <div className="education-meta">
                  <span className="duration">{edu.duration}</span>
                  <span className="score">{edu.score}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="certifications">
          <h3>Certifications</h3>
          <ul className="certification-list">
            {certifications.map((cert, index) => (
              <li key={index}>
                <span className="cert-name">{cert.name}</span>
                <span className="cert-date">{cert.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Education;
