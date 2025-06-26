import React from 'react';

const Experience = ({ id }) => {
  const experiences = [
    {
      role: 'UI/UX Intern',
      company: 'Talisma Corporations Pvt Ltd',
      duration: 'Mar 2025 — Jun 2025',
      location: 'Bangalore',
      description: 'Worked on designing and implementing user interfaces, conducting user research, and creating wireframes and prototypes.'
    },
    {
      role: 'Intern',
      company: 'Government Tool Room and Training Centre',
      duration: 'Nov 2023 — Dec 2023',
      location: 'Bangalore',
      description: 'Worked on IoT and PLC technologies, gaining hands-on experience in industrial automation systems.'
    },
    {
      role: 'Virtual Intern',
      company: 'Salesforce',
      duration: 'Oct 2023 — Nov 2023',
      location: 'Remote',
      description: 'Completed Salesforce Administrator virtual experience program, learning about CRM administration and configuration.'
    }
  ];

  return (
    <section id={id} className="experience section">
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-content">
                <h3>{exp.role}</h3>
                <h4>{exp.company}</h4>
                <div className="timeline-meta">
                  <span className="duration">{exp.duration}</span>
                  <span className="location">{exp.location}</span>
                </div>
                <p>{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
