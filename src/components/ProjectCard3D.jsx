import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './styles/ProjectCard3D.css';

const ProjectCard3D = ({ title, description, tags, githubUrl, liveUrl }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / 20);
    const rotateX = ((centerY - y) / 20);
    
    setMousePosition({ x, y });
    
    controls.start({
      rotateX: -rotateX,
      rotateY: rotateY,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    document.body.style.cursor = 'none';
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    document.body.style.cursor = 'auto';
    controls.start({
      rotateX: 0,
      rotateY: 0,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    });
  };

  // Custom cursor effect
  useEffect(() => {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) return;

    const handleMouseMove = (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <motion.div 
        className="project-card-3d"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={controls}
        initial={{ rotateX: 0, rotateY: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="card-inner">
          <div className="card-front">
            <div className="card-content">
              <h3 className="card-title">{title}</h3>
              <p className="card-description">{description}</p>
              <div className="card-tags">
                {tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="card-back">
            <div className="card-links">
              {githubUrl && (
                <a 
                  href={githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="card-link"
                  aria-label={`View ${title} on GitHub`}
                >
                  <FaGithub className="link-icon" />
                  <span>View Code</span>
                </a>
              )}
              {liveUrl && (
                <a 
                  href={liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="card-link"
                  aria-label={`View ${title} live demo`}
                >
                  <FaExternalLinkAlt className="link-icon" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="card-shine" />
      </motion.div>
      
      {isHovered && (
        <div 
          className="custom-cursor"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
          }}
        />
      )}
    </>
  );
};

export default ProjectCard3D;
