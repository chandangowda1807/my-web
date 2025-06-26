import React from 'react';
import { FaGithub, FaLinkedinIn, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/username', label: 'GitHub' },
    { icon: <FaLinkedinIn />, url: 'https://linkedin.com/in/username', label: 'LinkedIn' },
    { icon: <FaTwitter />, url: 'https://twitter.com/username', label: 'Twitter' },
    { icon: <FaInstagram />, url: 'https://instagram.com/username', label: 'Instagram' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-about">
            <div className="footer-logo">
              <a href="#home">Chandan MN</a>
            </div>
            <p>
              A passionate UI/UX Intern dedicated to creating beautiful, 
              functional, and user-centered digital experiences that make an impact.
            </p>
            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Chandan MN. All rights reserved.</p>
          <p>Designed & Built with ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
