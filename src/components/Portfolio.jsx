import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Portfolio.css';
import './styles/ContactForm.css';

const locationInfo = {
  chikmagalur: {
    title: 'Chikmagalur - The Land of Coffee',
    description: 'Chikmagalur, located in the foothills of the Mullayanagiri range, is famous for its coffee plantations, scenic beauty, and pleasant climate. Known as the "Coffee Land of Karnataka," it offers a perfect blend of nature, history, and adventure.',
    attractions: [
      'Mullayanagiri - Highest peak in Karnataka',
      'Baba Budangiri - Famous for coffee plantations and the shrine of Dattatreya',
      'Kudremukh National Park - A biodiversity hotspot',
      'Hebbe Falls - Beautiful waterfalls in the middle of a dense forest',
      'Bhadra Wildlife Sanctuary - Home to diverse flora and fauna',
      'Kemmangundi - Hill station with beautiful gardens and waterfalls',
      'Jhari Waterfalls - Also known as Buttermilk Falls',
      'Bhadra River - Perfect for river rafting and coracle rides'
    ],
    bestTimeToVisit: 'September to March',
    famousFor: ['Coffee Plantations', 'Scenic Beauty', 'Trekking', 'Wildlife', 'Waterfalls'],
    mapUrl: 'https://www.google.com/maps/place/Chikmagalur,+Karnataka/'
  },
  balehonnur: {
    title: 'Balehonnur - The Land of Temples and Nature',
    description: 'Balehonnur is a serene town in Chikmagalur district, known for its spiritual significance and natural beauty. It is home to the famous Sri Adichunchanagiri Mahasamsthana Math and surrounded by lush green forests and coffee plantations.',
    attractions: [
      'Sri Adichunchanagiri Mahasamsthana Math - Famous pilgrimage center',
      'Bhadra River - Scenic river flowing through the town',
      'Coffee Plantations - Surrounded by lush coffee estates',
      'Shri Kalaseshwara Swamy Temple - Ancient temple with beautiful architecture',
      'Kadambi Waterfalls - Beautiful seasonal waterfalls nearby',
      'Kudremukh National Park - Located in close proximity',
      'Bhadra Wildlife Sanctuary - Nearby wildlife sanctuary',
      'Mullayanagiri - Highest peak in Karnataka is easily accessible'
    ],
    bestTimeToVisit: 'October to February',
    famousFor: ['Pilgrimage', 'Coffee Plantations', 'Natural Beauty', 'Wildlife', 'Temples'],
    mapUrl: 'https://www.google.com/maps/place/Balehonnur,+Karnataka/'
  }
};

const Portfolio = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  
  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message with details
      setMessage({
        type: 'success',
        text: (
          <div className="message-details">
            <h4>New Message Received:</h4>
            <p><strong>From:</strong> {formData.name} 
              (<a href={`mailto:${formData.email}`} onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(formData.email);
                e.target.textContent = 'Copied!';
                setTimeout(() => {
                  e.target.textContent = formData.email;
                }, 2000);
              }}>
                {formData.email}
              </a>)
            </p>
            {formData.subject && <p><strong>Subject:</strong> {formData.subject}</p>}
            <div className="message-content">
              <strong>Message:</strong>
              <div className="message-text">{formData.message}</div>
            </div>
            <div className="message-note">
              <i className="fas fa-info-circle"></i> This is a demo. In a real setup, this would be sent to your email.
            </div>
          </div>
        )
      });
      
      // Log the form data to console (for testing)
      console.log('New message received:', formData);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openCertificate = (certificate) => {
    setSelectedCertificate(certificate);
    setIsCertificateModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeCertificate = () => {
    setSelectedCertificate(null);
    setIsCertificateModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const openLocationModal = () => {
    setIsLocationModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLocationModal = () => {
    setIsLocationModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleBackdropClick = (e, modalType) => {
    if (e.target === e.currentTarget) {
      if (modalType === 'certificate') {
        closeCertificate();
      } else if (modalType === 'location') {
        closeLocationModal();
      }
    }
  };

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeCertificate();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);
  const [activeSection, setActiveSection] = useState('home');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Scroll to section with smooth behavior and offset for fixed header
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Height of your fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setActiveSection(sectionId);
      setIsMenuOpen(false);
      
      // Update URL without page reload
      window.history.pushState({}, '', `#${sectionId}`);
    }
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'work', label: 'Work' },
    { id: 'contact', label: 'Contact' },
  ];

  // Social links with proper Font Awesome icon classes
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/chandangowda18', icon: 'github' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/chandan-m-n/', icon: 'linkedin-in' },
    { name: 'Instagram', url: 'https://instagram.com/_chandan_gowda18', icon: 'instagram' },
    { name: 'CodeChef', url: 'https://www.codechef.com/users/chandangowda18', icon: 'code' },
  ];

  // Projects data
  const [projects] = useState([
    {
      title: 'Automated Restaurant Management System',
      description: 'Streamlined order management, billing, table booking, and inventory system that reduces manual work and improves efficiency through a centralized platform.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      date: 'Mar - Jun 2025'
    },
    {
      title: 'Network Security with CNN',
      description: 'Developed a network security project using Convolutional Neural Networks for enhanced real-time intrusion detection and automated attack classification.',
      technologies: ['Python', 'TensorFlow', 'Keras', 'Scikit-learn'],
      date: 'Jul 2024'
    },
    {
      title: 'Cyber Cafe Management System',
      description: 'A comprehensive solution for managing computer usage, user logins, billing, and time tracking in cyber cafes with efficient monitoring features.',
      technologies: ['Java', 'JavaFX', 'MySQL'],
      date: 'Jun 2024'
    },
    {
      title: 'Online Ticket QR Code Generator',
      description: 'Web-based application that generates unique QR codes for event tickets, enabling secure, contactless, and real-time verification during check-ins.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
      date: 'Apr 2023',
      github: '#'
    },
    {
      title: 'Review on Design,Implementation and Validation of a receiver-driven less-than-best-effort Transport',
      description: 'Research paper on Design, Implementation and Validation of a Receiver-Driven Less-Than-Best-Effort Transport protocol.',
      technologies: ['Research', 'Networking', 'Algorithms'],
      date: 'Jul 2024',
      publication: 'International Conference on AI: From Theory to Impact'
    }
  ]);

  return (
    <div className="portfolio">
      {/* Navigation */}
      <nav className="navbar">
        <div className="container">
          <motion.div 
            className="logo"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span>CG</span>
          </motion.div>
          
          {/* Desktop Navigation */}
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <button 
                  className={activeSection === item.id ? 'active' : ''}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          
          {/* Mobile Menu Button */}
          <button 
            className={`menu-btn ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {navItems.map((item) => (
              <button 
                key={`mobile-${item.id}`}
                className={activeSection === item.id ? 'active' : ''}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '4rem',
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 2
        }}>
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                fontSize: '3.5rem',
                fontWeight: 800,
                lineHeight: 1.2,
                marginBottom: '1.5rem',
                color: '#111827',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
              }}
            >
              Hi, I'm <span style={{ color: '#4f46e5' }}>Chandan Gowda</span>
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                fontSize: '1.75rem',
                fontWeight: 600,
                color: '#374151',
                marginBottom: '1.5rem',
                lineHeight: 1.3
              }}
            >
UI/UX Enthusiast & Web Developer
            </motion.h2>
            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                fontSize: '1.25rem',
                color: '#4b5563',
                marginBottom: '2.5rem',
                lineHeight: 1.8,
                maxWidth: '700px',
                fontWeight: 400
              }}
            >
I create intuitive digital experiences with a focus on clean design and user-centered solutions. Let's build something amazing together!
            </motion.p>
            <motion.div 
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <a 
                href="#projects" 
                className="hero-button primary-button"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('projects');
                }}
              >
                View My Work
                <i className="fas fa-arrow-right" style={{ marginLeft: '8px' }}></i>
              </a>
              <a 
                href="#contact" 
                className="hero-button secondary-button"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
              >
                Contact Me
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="hero-image"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <img 
              src="/assets/profile-photo.jpg" 
              alt="Chandan Gowda" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/500x650/f8f9ff/4f46e5?text=CG';
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <motion.div 
            className="about-content"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <div className="about-image">
              <img 
                src="/assets/about-image.jpg" 
                alt="About Me" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/600x800/4f46e5/f8f9ff?text=About+Me';
                }}
                style={{ backgroundColor: '#f8f9ff' }}
              />
            </div>
            
            <div className="about-text">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                style={{ color: '#111827' }}
              >
                About <span style={{ color: '#4f46e5' }}>Me</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                style={{ color: '#374151' }}
              >
                I'm Chandan Gowda, a recent Information Science & Engineering graduate with hands-on experience in UI/UX design and web development. 
                I specialize in creating responsive, user-friendly interfaces and have a strong foundation in front-end technologies.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                style={{ color: '#4b5563' }}
              >
                As a motivated and detail-oriented professional, I'm eager to apply my academic knowledge and internship experiences to real-world challenges. 
                I'm passionate about continuous learning and excited to contribute to innovative projects that make a difference.
              </motion.p>
              
              <div className="about-details">
                <motion.div 
                  className="detail-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <h4 style={{ color: '#111827' }}>Name:</h4>
                  <p style={{ color: '#4b5563' }}>Chandan Gowda</p>
                </motion.div>
                
                <motion.div 
                  className="detail-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <h4 style={{ color: '#111827' }}>Email:</h4>
                  <a href="mailto:chandangowda14ac@gmail.com" style={{ color: '#4f46e5', textDecoration: 'none' }}>chandangowda14ac@gmail.com</a>
                </motion.div>
                
                <motion.div 
                  className="detail-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                >
                  <h4 style={{ color: '#111827' }}>Education:</h4>
                  <p style={{ color: '#4b5563' }}>BE in Information Science & Engineering (2021-2025)</p>
                </motion.div>
                
                <motion.div 
                  className="detail-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                >
                  <h4 style={{ color: '#111827' }}>Location:</h4>
                  <p style={{ color: '#4b5563', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    Muduguni, B.Kanabur, Balehonnur, Chikmagalur, Karnataka - 577112
                    <button 
                      onClick={openLocationModal}
                      style={{
                        background: 'transparent',
                        border: '1px solid #4f46e5',
                        color: '#4f46e5',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'all 0.2s ease',
                        marginTop: '8px'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.background = '#4f46e5';
                        e.target.style.color = 'white';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.color = '#4f46e5';
                      }}
                    >
                      <i className="fas fa-map-marked-alt"></i> Explore Locations
                    </button>
                  </p>
                </motion.div>
              </div>
              
              <motion.a 
                href="#contact" 
                className="about-button"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
              >
                Contact Me <i className="fas fa-paper-plane"></i>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Location Modal */}
      <AnimatePresence>
        {isLocationModalOpen && (
          <motion.div 
            className="location-modal-backdrop"
            onClick={(e) => handleBackdropClick(e, 'location')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="location-modal split-view"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
            >

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <button 
                  onClick={closeLocationModal}
                  style={{
                    background: 'transparent',
                    border: '1px solid #d1d5db',
                    color: '#4b5563',
                    padding: '0.4rem 1rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s ease',
                    fontSize: '0.95rem'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = '#f3f4f6';
                    e.target.style.color = '#1f2937';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#4b5563';
                  }}
                >
                  <i className="fas fa-arrow-left"></i> Back to Portfolio
                </button>
                <button 
                  className="close-modal" 
                  onClick={closeLocationModal}
                  style={{
                    position: 'static',
                    background: 'transparent',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    color: '#6b7280',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = '#f3f4f6';
                    e.target.style.color = '#1f2937';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#6b7280';
                  }}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <h2>My Hometown Region</h2>
              <p className="location-description">Explore the beautiful places that shaped my childhood and surroundings.</p>
              
              <div className="split-view-container">
                {/* Chikmagalur Section */}
                <div className="location-panel">
                  <div className="location-header" style={{ backgroundColor: '#4f46e5' }}>
                    <h3><i className="fas fa-mountain"></i> {locationInfo.chikmagalur.title}</h3>
                  </div>
                  <div className="location-content">
                    <p>{locationInfo.chikmagalur.description}</p>
                    <div className="location-section">
                      <h4><i className="fas fa-map-marked-alt"></i> Must-Visit Places</h4>
                      <ul>
                        {locationInfo.chikmagalur.attractions.slice(0, 4).map((attraction, index) => (
                          <li key={index}>
                            <i className="fas fa-map-marker-alt"></i> {attraction}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="location-highlights">
                      <div className="highlight-box">
                        <h5><i className="far fa-calendar-alt"></i> Best Time</h5>
                        <p>{locationInfo.chikmagalur.bestTimeToVisit}</p>
                      </div>
                      <div className="highlight-box">
                        <h5><i className="fas fa-star"></i> Famous For</h5>
                        <div className="tags">
                          {locationInfo.chikmagalur.famousFor.map((item, index) => (
                            <span key={index} className="tag">{item}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <a 
                      href={locationInfo.chikmagalur.mapUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="map-button"
                      style={{ backgroundColor: '#4f46e5' }}
                    >
                      <i className="fas fa-map-marked"></i> View Chikmagalur on Map
                    </a>
                  </div>
                </div>

                {/* Balehonnur Section */}
                <div className="location-panel">
                  <div className="location-header" style={{ backgroundColor: '#10b981' }}>
                    <h3><i className="fas fa-temple"></i> {locationInfo.balehonnur.title}</h3>
                  </div>
                  <div className="location-content">
                    <p>{locationInfo.balehonnur.description}</p>
                    <div className="location-section">
                      <h4><i className="fas fa-map-marked-alt"></i> Must-Visit Places</h4>
                      <ul>
                        {locationInfo.balehonnur.attractions.slice(0, 4).map((attraction, index) => (
                          <li key={index}>
                            <i className="fas fa-map-marker-alt"></i> {attraction}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="location-highlights">
                      <div className="highlight-box">
                        <h5><i className="far fa-calendar-alt"></i> Best Time</h5>
                        <p>{locationInfo.balehonnur.bestTimeToVisit}</p>
                      </div>
                      <div className="highlight-box">
                        <h5><i className="fas fa-star"></i> Famous For</h5>
                        <div className="tags">
                          {locationInfo.balehonnur.famousFor.map((item, index) => (
                            <span key={index} className="tag">{item}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <a 
                      href={locationInfo.balehonnur.mapUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="map-button"
                      style={{ backgroundColor: '#10b981' }}
                    >
                      <i className="fas fa-map-marked"></i> View Balehonnur on Map
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Experience Section */}
      <section id="experience" className="experience">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            My <span>Experience</span>
          </motion.h2>
          
          <div className="timeline">
            {/* Talisma Internship */}
            <motion.div 
              className="timeline-item"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="timeline-content">
                <h3>UI/UX Intern</h3>
                <h4>
                  <a href="https://talisma.com/" target="_blank" rel="noopener noreferrer" className="company-link">
                    Talisma Corporations Pvt Ltd, Bangalore
                  </a>
                </h4>
                <span className="date">Mar 2025 - Jun 2025</span>
                <p>Gained hands-on experience in UI/UX design principles and tools while contributing to real-world projects.</p>
              </div>
            </motion.div>

            {/* GTTC Internship */}
            <motion.div 
              className="timeline-item"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="timeline-content">
                <h3>Intern</h3>
                <h4>
                  <a href="https://gttc.karnataka.gov.in/en" target="_blank" rel="noopener noreferrer" className="company-link">
                    Government Tool Room and Training Centre, Bangalore
                  </a>
                </h4>
                <span className="date">Nov 2023 - Dec 2023</span>
                <p>Worked on IoT and PLC technologies, gaining practical experience in industrial automation systems.</p>
              </div>
            </motion.div>

            {/* Salesforce Virtual Internship */}
            <motion.div 
              className="timeline-item"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="timeline-content">
                <h3>Salesforce Administrator Trainee</h3>
                <h4>
                  <a href="https://trailhead.salesforce.com/" target="_blank" rel="noopener noreferrer" className="company-link">
                    Salesforce Virtual Internship
                  </a>
                </h4>
                <span className="date">Oct 2023 - Nov 2023</span>
                <p>Completed comprehensive training in Salesforce administration, earning relevant badges and certifications.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            My <span>Projects</span>
          </motion.h2>
          
          <div className="project-grid">
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                className="project-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="project-date">{project.date}</div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  
                  <div className="project-technologies">
                    {project.technologies && project.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  
                  {project.publication && (
                    <div className="project-publication">
                      <i className="fas fa-book"></i>
                      <span>{project.publication}</span>
                    </div>
                  )}
                  
                  <div className="project-links">
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn">
                        <i className="fas fa-external-link-alt"></i> Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                        <i className="fab fa-github"></i> View Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="certifications">
        <motion.h2>My <span>Certifications</span></motion.h2>
        <div className="certification-grid">
          {/* Salesforce */}
          <motion.div 
            className="certification-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="certification-image">
              <img 
                src="/assets/certificates/salesforce-logo.png" 
                alt="Salesforce Logo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/certificates/certificate-placeholder.png';
                }}
              />
            </div>
            <h3>Salesforce</h3>
            <p>Earned Administrative Trailmax Badges | Jan 2024</p>
            <button className="view-certificate" onClick={() => openCertificate({img: '/assets/certificates/salesforce-certificate.jpg', title: 'Salesforce'})}>
              View Certificate <i className="fas fa-external-link-alt"></i>
            </button>
          </motion.div>
          {/* Postman */}
          <motion.div 
            className="certification-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="certification-image">
              <img 
                src="/assets/certificates/postman-logo.png" 
                alt="Postman Logo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/certificates/certificate-placeholder.png';
                }}
              />
            </div>
            <h3>Postman</h3>
            <p>API Fundamental Student Expert | Dec 2022</p>
            <button className="view-certificate" onClick={() => openCertificate({img: '/assets/certificates/postman-certificate.jpg', title: 'Postman'})}>
              View Certificate <i className="fas fa-external-link-alt"></i>
            </button>
          </motion.div>
          {/* UiPath */}
          <motion.div 
            className="certification-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="certification-image">
              <img 
                src="/assets/certificates/uipath-logo.png" 
                alt="UiPath Logo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/certificates/certificate-placeholder.png';
                }}
              />
            </div>
            <h3>UiPath</h3>
            <p>Automation Explorer | Dec 2023</p>
            <button className="view-certificate" onClick={() => openCertificate({img: '/assets/certificates/uipath-certificate.jpg', title: 'UiPath'})}>
              View Certificate <i className="fas fa-external-link-alt"></i>
            </button>
          </motion.div>
          {/* CodeChef */}
          <motion.div 
            className="certification-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="certification-image">
              <img 
                src="/assets/certificates/codechef-logo.png" 
                alt="CodeChef Logo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/certificates/certificate-placeholder.png';
                }}
              />
            </div>
            <h3>Code Chef</h3>
            <p>Basic Programming | Mar 2024</p>
            <button className="view-certificate" onClick={() => openCertificate({img: '/assets/certificates/codechef-certificate.jpg', title: 'CodeChef'})}>
              View Certificate <i className="fas fa-external-link-alt"></i>
            </button>
          </motion.div>
        </div>
        {/* Certificate Modal */}
        {isCertificateModalOpen && selectedCertificate && (
          <div className="certificate-modal-backdrop" onClick={handleBackdropClick}>
            <div className="certificate-modal">
              <button className="close-modal" onClick={closeCertificate}>&larr; Back</button>
              <img 
                src={selectedCertificate.img} 
                alt={selectedCertificate.title + ' Certificate'} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/800x600?text=Certificate+Not+Found';
                }}
              />
            </div>
          </div>
        )}
      </section>

      {/* Academics Section */}
      <section id="academics" className="academics">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            My <span>Academics</span>
          </motion.h2>
          
          <div className="academics-timeline">
            <motion.div 
              className="academic-item"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="academic-content">
                <h3>Bachelor of Engineering in Information Science & Engineering</h3>
                <h4>
                  <a 
                    href="https://www.aiet.org.in/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="institution-link"
                  >
                    Alva's Institute of Engineering & Technology, Mangalore
                  </a>
                </h4>
                <span className="date">2021 - 2025</span>
                <p>CGPA: 7.3/10</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="academic-item"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="academic-content">
                <h3>Pre-University College (PCMB)</h3>
                <h4>
                  <a 
                    href="https://bgssringeri.org/balehonnur_highschool.html#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="institution-link"
                  >
                    BGS Science & Commerce PU College, Balehonnur
                  </a>
                </h4>
                <span className="date">2019 - 2021</span>
                <p>Percentage: 77%</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="academic-item"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="academic-content">
                <h3>Secondary School (SSLC)</h3>
                <h4>
                  <a 
                    href="https://bgssringeri.org/balehonnur_highschool.html#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="institution-link"
                  >
                    BGS High School, Balehonnur
                  </a>
                </h4>
                <span className="date">2018 - 2019</span>
                <p>Percentage: 82.72%</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Volunteering Section */}
      <section id="volunteering" className="volunteering">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            My <span>Volunteering</span>
          </motion.h2>
          
          <div className="volunteering-grid">
            <motion.div 
              className="volunteer-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="volunteer-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Student Co-Ordinator</h3>
              <h4>Institution's Innovation Council</h4>
              <p>2023 - 2024</p>
              <p>Led initiatives and coordinated activities for the Institution's Innovation Council, fostering innovation and entrepreneurship among students.</p>
            </motion.div>
            
            <motion.div 
              className="volunteer-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="volunteer-icon">
                <i className="fas fa-hands-helping"></i>
              </div>
              <h3>Volunteer</h3>
              <h4>Community Service</h4>
              <p>2021 - 2023</p>
              <ul className="volunteer-list">
                <li>Beach cleaning initiatives around Mangalore</li>
                <li>Blood donation camp volunteer</li>
                <li>International Cultural Jamboree participant</li>
                <li>National Service Scheme (NSS) member</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section id="languages" className="languages">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Languages <span>I Speak</span>
          </motion.h2>
           <div className="languages-card-grid">
            {[
              { name: 'Kannada', icon: 'ಕನ್ನಡ', proficiency: 'Mother Tongue', badge: 'native' },
              { name: 'English', icon: 'EN', proficiency: 'Fluent', badge: 'professional' },
              { name: 'Hindi', icon: 'हिंदी', proficiency: 'Good', badge: 'conversational' },
              { name: 'Tulu', icon: 'ತುಳು', proficiency: 'Good', badge: 'conversational' },
              { name: 'Tamil', icon: 'தமிழ்', proficiency: 'Basic', badge: 'basic' },
              { name: 'Telugu', icon: 'తెలుగు', proficiency: 'Basic', badge: 'basic' }
            ].map((lang, idx) => (
              <div className="language-card" key={idx}>
                <div className="language-flag" style={{ fontFamily: 'inherit', fontWeight: 'bold', fontSize: '1.7rem' }}>{lang.icon}</div>
                <div className="language-info">
                  <span className="language-title">{lang.name}</span>
                  <span className={`language-badge ${lang.badge}`}>{lang.proficiency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Let's Connect</h3>
              <p>I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll get back to you as soon as possible!</p>
              
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-details">
                    <h4>Email</h4>
                    <a href="mailto:chandangowda14ac@gmail.com">chandangowda14ac@gmail.com</a>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-icon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div className="contact-details">
                    <h4>Phone</h4>
                    <a href="tel:+917019188873">+91 70191 88873</a>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="contact-details">
                    <h4>Location</h4>
                    <p>Balehonnur, Chikmagaluru, Karnataka, India</p>
                  </div>
                </div>
              </div>
              
              <div className="social-links">
                {socialLinks.map((social) => (
                  <a 
                    key={social.name}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-link" 
                    title={social.name}
                  >
                    {social.name === 'CodeChef' ? (
                      <i className="fas fa-code"></i>
                    ) : (
                      <i className={`fab fa-${social.icon}`}></i>
                    )}
                  </a>
                ))}
              </div>
            </div>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  placeholder="Your Name" 
                  required 
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  placeholder="your.email@example.com" 
                  required 
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  rows="5" 
                  placeholder="Your message here..." 
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              
              {message && (
                <div className={`form-message ${message.type}`}>
                  {message.text}
                </div>
              )}
              
              <button type="submit" className="btn primary" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <span>CG</span>
              <p>Chandan Gowda</p>
            </div>
            <div className="footer-links">
              {navItems.map((item) => (
                <button 
                  key={`footer-${item.id}`}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="footer-social">
              {socialLinks.map((social) => (
                <a 
                  key={`footer-${social.name}`}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <i className={`fab fa-${social.icon}`}></i>
                </a>
              ))}
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Chandan Gowda. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
