import React from 'react';

const Hero = ({ id }) => {
  return (
    <section id={id} className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Chandan MN</h1>
          <h2>UI/UX Intern</h2>
          <p className="tagline">
            A motivated and detail-oriented professional with a passion for creating 
            intuitive user experiences and solving complex problems.
          </p>
          <div className="cta-buttons">
            <a href="#contact" className="btn btn-primary">Contact Me</a>
            <button 
              className="btn btn-secondary"
              onClick={() => {
                // Add resume download functionality here
                alert('Resume download will be available soon!');
              }}
              aria-label="Download Resume"
            >
              Download Resume
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-placeholder">
            {/* Add your profile photo here */}
            <span>Your Photo</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
