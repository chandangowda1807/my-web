import React from 'react';

const About = ({ id }) => {
  const skills = [
    { category: 'Programming', items: ['C', 'HTML', 'CSS', 'JavaScript', 'React.js', 'Java'] },
    { category: 'Tools & Technologies', items: ['VS Code', 'Canva', 'Microsoft Office'] },
    { category: 'Soft Skills', items: ['Team Leadership', 'Time Management', 'Problem Solving'] },
  ];

  return (
    <section id={id} className="about section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              A motivated and detail-oriented graduate with a Bachelor of Engineering in Information Science and 
              Engineering, seeking a dynamic role that offers opportunities for continuous learning and professional 
              growth. I am eager to apply my academic foundation, problem-solving abilities, and collaborative mindset to 
              contribute effectively in a forward-thinking organization.
            </p>
            <p>
              My goal is to strengthen my technical and interpersonal skills while delivering value through innovative 
              solutions, efficient teamwork, and a strong work ethic. I aspire to build a successful career that aligns 
              with both organizational goals and my personal development ambitions.
            </p>
          </div>
          
          <div className="skills">
            <h3>Skills</h3>
            <div className="skills-grid">
              {skills.map((skillGroup, index) => (
                <div key={index} className="skill-category">
                  <h4>{skillGroup.category}</h4>
                  <div className="skill-tags">
                    {skillGroup.items.map((skill, i) => (
                      <span key={i} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
