import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion';
import './styles/ScrollIndicator3D.css';

const ScrollIndicator3D = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const indicatorRef = useRef(null);
  
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
    restDelta: 0.001,
  });

  // Update progress and check if scrolled
  useEffect(() => {
    const updateProgress = (value) => {
      setProgress(Math.min(Math.max(value, 0), 1));
      setIsScrolled(value > 0.05);
    };

    const unsubscribe = smoothProgress.onChange(updateProgress);
    return () => unsubscribe();
  }, [smoothProgress]);

  // Handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // 3D rotation based on scroll progress
  const rotateX = useTransform(smoothProgress, [0, 1], [0, 360]);
  const rotateY = useTransform(smoothProgress, [0, 1], [0, 180]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.2, 1]);
  
  // Background color based on scroll progress
  const backgroundColor = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    ['#3b82f6', '#8b5cf6', '#ec4899']
  );

  // Box shadow based on scroll
  const boxShadow = useTransform(
    smoothProgress,
    [0, 1],
    [
      '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      '0 10px 25px -5px rgba(0, 0, 0, 0.2)'
    ]
  );

  // Hover effect with fallback for mobile
  const hoverScale = useMotionValue(1);
  
  // Update hover scale with proper cleanup
  useEffect(() => {
    const scaleValue = isHovered ? 1.1 : 1;
    hoverScale.set(scaleValue);
    
    return () => {
      hoverScale.stop();
    };
  }, [isHovered, hoverScale]);
  
  // Combine scale effects with fallback
  const combinedScale = useTransform(
    [scale, hoverScale],
    ([scaleVal, hoverVal]) => scaleVal * (hoverVal || 1)
  );

  // Arrow path animation
  const arrowPath = useTransform(smoothProgress, [0, 1], [
    'M12 4l8 8-8 8m-1-8h9',
    'M12 20l-8-8 8-8m-1 8h9',
  ]);

  return (
    <motion.div 
      className={`scroll-indicator-3d ${isScrolled ? 'visible' : ''} ${isHovered ? 'hovered' : ''}`}
      onClick={scrollToTop}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      ref={indicatorRef}
      style={{
        '--progress': progress,
        '--rotate-x': rotateX,
        '--rotate-y': rotateY,
        '--scale': combinedScale,
        '--background': backgroundColor,
        '--box-shadow': boxShadow,
      }}
      aria-label={isScrolled ? 'Scroll to top' : 'Scroll indicator'}
      title={isScrolled ? 'Back to top' : 'Scroll down'}
    >
      <div className="scroll-indicator-inner">
        <svg 
          className="scroll-arrow" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <motion.path 
            d={arrowPath} 
            style={{
              pathLength: smoothProgress,
              pathOffset: smoothProgress,
            }}
          />
        </svg>
      </div>
    </motion.div>
  );
};

export default ScrollIndicator3D;
