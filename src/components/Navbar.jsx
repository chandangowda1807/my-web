import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes, FaMoon, FaSun, FaLinkedinIn, FaGithub, FaTwitter } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import '../styles/Navbar.css';

const Navbar = ({ activeSection, darkMode, onToggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navbarRef = useRef(null);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle dark mode toggle
  const handleDarkModeToggle = () => {
    onToggleDarkMode();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'auto';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/username', label: 'GitHub' },
    { icon: <FaLinkedinIn />, url: 'https://linkedin.com/in/username', label: 'LinkedIn' },
    { icon: <FaTwitter />, url: 'https://twitter.com/username', label: 'Twitter' },
    { icon: <HiOutlineMail />, url: 'mailto:chandangowda14ac@gmail.com', label: 'Email' },
  ];

  return (
    <>
      <nav 
        ref={navbarRef}
        className={`navbar ${isScrolled ? 'scrolled' : ''} ${darkMode ? 'dark' : ''}`}
      >
        <div className="container">
          <Link 
            to="home" 
            className="logo"
            smooth={true} 
            duration={500} 
            spy={true} 
            exact="true" 
            offset={-80}
            onClick={closeMobileMenu}
          >
            <span className="logo-text">CM</span>
            <span className="logo-dot">.</span>
          </Link>
          
          <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            <div className="nav-links-container">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.id}
                  className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-80}
                  onClick={closeMobileMenu}
                >
                  <span className="nav-link-text">{link.label}</span>
                  <span className="nav-link-underline"></span>
                </Link>
              ))}
            </div>
            
            <div className="mobile-social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="nav-actions">
            <button 
              onClick={handleDarkModeToggle} 
              className="dark-mode-toggle"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
            </button>
            
            <button 
              className="mobile-menu-btn" 
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <FaTimes className="menu-icon" />
              ) : (
                <FaBars className="menu-icon" />
              )}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
      )}
    </>
  );
};

export default Navbar;
