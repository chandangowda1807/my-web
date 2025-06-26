import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './styles/FloatingAction3D.css';

const FloatingAction3D = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Calculate tilt based on mouse position relative to window center
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const tiltX = (e.clientY - centerY) / 50;
      const tiltY = (centerX - e.clientX) / 50;
      
      setTilt({
        x: Math.max(-10, Math.min(10, tiltX)),
        y: Math.max(-10, Math.min(10, tiltY))
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const actionItems = [
    {
      id: 'email',
      icon: <FaEnvelope />,
      label: 'Email',
      url: 'mailto:chandangowda14ac@gmail.com',
      color: '#EA4335',
      delay: 0.1
    },
    {
      id: 'github',
      icon: <FaGithub />,
      label: 'GitHub',
      url: 'https://github.com/username',
      color: '#333',
      delay: 0.2
    },
    {
      id: 'linkedin',
      icon: <FaLinkedin />,
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/username',
      color: '#0077B5',
      delay: 0.3
    },
    {
      id: 'twitter',
      icon: <FaTwitter />,
      label: 'Twitter',
      url: 'https://twitter.com/username',
      color: '#1DA1F2',
      delay: 0.4
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (delay) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
        delay: delay
      }
    })
  };

  return (
    <div className="fab-container">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fab-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.div 
        className="fab-menu"
        variants={containerVariants}
        initial="hidden"
        animate={isOpen ? 'visible' : 'hidden'}
        style={{
          '--tilt-x': `${tilt.x}deg`,
          '--tilt-y': `${tilt.y}deg`,
          '--glow-color': hoveredItem || '#3b82f6'
        }}
      >
        <AnimatePresence>
          {isOpen && actionItems.map((item) => (
            <motion.a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="fab-item"
              style={{ '--item-color': item.color }}
              custom={item.delay}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onMouseEnter={() => setHoveredItem(item.color)}
              onMouseLeave={() => setHoveredItem(null)}
              aria-label={item.label}
            >
              <span className="fab-icon">{item.icon}</span>
              <span className="fab-tooltip">{item.label}</span>
            </motion.a>
          ))}
        </AnimatePresence>
      </motion.div>

      <motion.button
        className={`fab-button ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close menu' : 'Open contact menu'}
        aria-expanded={isOpen}
        style={{
          transform: `rotate(${isOpen ? '45deg' : '0deg'})`,
          '--glow-color': hoveredItem || '#3b82f6'
        }}
      >
        <FaPlus className="fab-plus" />
      </motion.button>

      {/* 3D Cursor Effect */}
      <div 
        className="cursor-effect"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          '--tilt-x': `${-tilt.y * 0.5}px`,
          '--tilt-y': `${tilt.x * 0.5}px`,
          '--glow-color': hoveredItem || 'rgba(59, 130, 246, 0.5)'
        }}
      />
    </div>
  );
};

export default FloatingAction3D;
