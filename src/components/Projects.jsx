import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard3D from './ProjectCard3D';
import '../styles/Projects.css';

const Projects = ({ id }) => {
  const projects = [
    {
      title: 'Automated Restaurant Management System',
      date: 'Mar 2025 — Jun 2025',
      description: 'Streamlines tasks like order management, billing, table booking, and inventory. It reduces manual work and improves overall efficiency through a centralized platform.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux'],
      github: '#',
      live: '#'
    },
    {
      title: 'Revolutionizing Network Security with CNN',
      date: 'Jul 2024',
      description: 'Developed and implemented a network security project leveraging Convolutional Neural Networks for enhanced real-time intrusion detection and automated attack classification.',
      technologies: ['Python', 'TensorFlow', 'Keras', 'Network Security'],
      github: '#',
      live: '#'
    },
    {
      title: 'Cyber Cafe Management System',
      date: 'Jun 2024',
      description: 'Helps manage computer usage, user logins, billing, and time tracking in a cyber cafe. Ensures efficient monitoring and prevents misuse.',
      technologies: ['Java', 'MySQL', 'Swing', 'JDBC'],
      github: '#',
      live: '#'
    },
    {
      title: 'Online Ticket QR Code Generator',
      date: 'Apr 2023',
      description: 'Web-based application that generates unique QR codes for event tickets, enabling secure, contactless verification during event check-ins.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'QR Code API'],
      github: '#',
      live: '#'
    }
  ];


  return (
    <section id={id} className="projects section">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <motion.div 
          className="projects-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            visible: { transition: { staggerChildren: 0.18 } },
            hidden: {}
          }}
        >
          <motion.div 
            className="projects-3d-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              visible: { transition: { staggerChildren: 0.18 } },
              hidden: {}
            }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className={`project-card-3d-wrapper${index % 2 === 1 ? ' offset-card' : ''}`}
                variants={{
                  hidden: { opacity: 0, y: 60, scale: 0.93 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: 'anticipate' } }
                }}
                style={{ marginTop: index % 2 === 1 ? 48 : 0 }}
              >
                <ProjectCard3D
                  title={project.title}
                  description={project.description}
                  tags={project.technologies}

                  githubUrl={project.github}
                  liveUrl={project.live}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
