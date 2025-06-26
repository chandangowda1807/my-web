import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import './styles/Animated3DBackground.css';

const Animated3DBackground = ({ activeLocation = 0 }) => {
  // Define locations for the background
  const LOCATIONS = [
    { name: 'Chikmagaluru', distance: '0 km' },
    { name: 'Bangalore', distance: '245 km' },
    { name: 'Mysore', distance: '120 km' },
    { name: 'Mangalore', distance: '150 km' },
  ];
  const mountRef = useRef(null);
  const frameId = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const isMobile = window.innerWidth < 768;
  const particlesRef = useRef([]);
  const glitchPassRef = useRef(null);
  const currentLocation = LOCATIONS[activeLocation % LOCATIONS.length];
  
  // Add global styles and fonts
  useEffect(() => {
    // Add Font Awesome
    const fontAwesomeLink = document.createElement('link');
    fontAwesomeLink.rel = 'stylesheet';
    fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
    
    // Add Google Fonts
    const googleFontsLink = document.createElement('link');
    googleFontsLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
    googleFontsLink.rel = 'stylesheet';
    
    // Create style element for our custom styles
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Poppins', sans-serif;
        overflow-x: hidden;
      }
      
      .animated-bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        pointer-events: none;
      }
      
      /* Location Info Styling */
      .location-info {
        position: fixed;
        bottom: 40px;
        right: 40px;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(10px);
        border-radius: 16px;
        padding: 20px;
        max-width: 300px;
        color: #fff;
        text-align: right;
        font-family: 'Poppins', sans-serif;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.1);
        transform: translateY(20px);
        opacity: 0;
        animation: fadeInUp 0.8s ease-out forwards;
        animation-delay: 0.5s;
      }
      
      .location-icon {
        font-size: 2.5em;
        margin-bottom: 10px;
        text-align: center;
      }
      
      .location-details h3 {
        margin: 0;
        font-size: 1.6em;
        font-weight: 600;
        letter-spacing: 0.5px;
        color: #fff;
      }
      
      .location-details p {
        margin: 5px 0 0;
        font-size: 0.95em;
        opacity: 0.9;
        font-weight: 300;
        line-height: 1.5;
      }
      
      .distance {
        display: inline-block;
        margin-top: 8px;
        padding: 3px 10px;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 20px;
        font-size: 0.8em;
        font-weight: 500;
      }
      
      /* Personal Info Styling */
      .personal-info {
        position: fixed;
        bottom: 40px;
        left: 40px;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(10px);
        border-radius: 16px;
        padding: 20px;
        max-width: 300px;
        color: #fff;
        font-family: 'Poppins', sans-serif;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.1);
        transform: translateY(20px);
        opacity: 0;
        animation: fadeInUp 0.8s ease-out forwards;
        animation-delay: 0.7s;
      }
      
      .personal-info h3 {
        margin: 0 0 10px 0;
        font-size: 1.6em;
        font-weight: 600;
        letter-spacing: 0.5px;
        color: #fff;
      }
      
      .personal-info p {
        margin: 0 0 15px 0;
        font-size: 0.95em;
        opacity: 0.9;
        font-weight: 300;
        line-height: 1.5;
      }
      
      .social-links {
        display: flex;
        gap: 15px;
        margin-top: 15px;
      }
      
      .social-links a {
        color: #fff;
        font-size: 1.2em;
        opacity: 0.8;
        transition: all 0.3s ease;
      }
      
      .social-links a:hover {
        opacity: 1;
        transform: translateY(-2px);
      }
      
      /* Animations */
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      /* Responsive */
      @media (max-width: 768px) {
        .location-info,
        .personal-info {
          left: 20px;
          right: 20px;
          max-width: none;
          text-align: center;
        }
        
        .location-details h3,
        .personal-info h3 {
          font-size: 1.4em;
        }
      }
    `;
    
    // Append all to head
    document.head.appendChild(fontAwesomeLink);
    document.head.appendChild(googleFontsLink);
    document.head.appendChild(styleElement);
    
    // Cleanup function
    return () => {
      document.head.removeChild(fontAwesomeLink);
      document.head.removeChild(googleFontsLink);
      document.head.removeChild(styleElement);
    };
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    // Capture mountRef.current in a variable for cleanup
    const mountNode = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Post-processing
    const renderScene = new RenderPass(scene, camera);
    // Less intense bloom effect
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.5, // Reduced strength
      0.2, // Reduced radius
      0.6  // Increased threshold
    );

    // Reduce film grain effect
    const filmPass = new FilmPass(0.1, 0.15, 1000, false);
    const glitchPass = new GlitchPass({
      // Make glitch effect much more subtle
      dt_size: 1.0,    // Lower value = less distortion
      columns: 0.01,   // Very small value to reduce column glitching
      strength: {      // Reduce strength of glitch effect
        x: 0.05,
        y: 0.05
      }
    });
    glitchPass.goWild = false;
    glitchPass.curF = 0;  // Reset frame counter
    glitchPass.randX = 0; // Reset random X offset
    
    const outputPass = new OutputPass();
    
    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);
    composer.addPass(filmPass);
    
    // Only enable glitch effect on desktop and with very low probability
    if (!isMobile && Math.random() < 0.1) {  // 10% chance to enable glitch
      composer.addPass(glitchPass);
    }
    
    // Add FXAA for better antialiasing
    const effectFXAA = new ShaderPass(FXAAShader);
    effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
    composer.addPass(effectFXAA);
    
    composer.addPass(outputPass);

    // Geometry and materials
    const geometry = new THREE.IcosahedronGeometry(1, 1);
    const material = new THREE.MeshPhongMaterial({
      color: 0x3b82f6,
      shininess: 100,
      flatShading: true,
      transparent: true,
      opacity: 0.9,
    });

    // Create particles with reduced count for better performance
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = isMobile ? 500 : 2000; // Reduced particle count
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
      if (i % 3 === 0) {
        scaleArray[i / 3] = Math.random() * 0.5 + 0.1;
      }
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1));

    const particlesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color1: { value: new THREE.Color(0x3b82f6) },
        color2: { value: new THREE.Color(0x8b5cf6) },
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      },
      vertexShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        attribute float aScale;
        varying vec3 vColor;
        
        void main() {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          
          // Animate particles with noise
          float t = time * 0.1;
          modelPosition.x += sin(modelPosition.y * 0.5 + t) * 0.5;
          modelPosition.y += cos(modelPosition.z * 0.5 + t) * 0.5;
          modelPosition.z += sin(modelPosition.x * 0.5 + t) * 0.5;
          
          vec4 viewPosition = viewMatrix * modelPosition;
          gl_Position = projectionMatrix * viewPosition;
          
          // Size attenuation
          gl_PointSize = aScale * 10.0 * (1.0 / -viewPosition.z);
          
          // Vary color based on position
          vColor = mix(color1, color2, aScale);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          // Create a circular point
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5, 0.5));
          if (distanceToCenter > 0.5) {
            discard;
          }
          
          // Very subtle glow effect
          float alpha = 1.0 - smoothstep(0.2, 0.5, distanceToCenter);
          gl_FragColor = vec4(vColor, alpha * 0.1); // Very low alpha for better text visibility
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x3b82f6, 1, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 1, 50);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    // Animation
    const clock = new THREE.Clock();
    let time = 0;

    const animate = () => {
      time = clock.getElapsedTime();
      
      // Update particles
      if (particlesMaterial.uniforms) {
        particlesMaterial.uniforms.time.value = time;
      }
      
      // Rotate particles
      particlesMesh.rotation.x = time * 0.1;
      particlesMesh.rotation.y = time * 0.1;
      
      // Move particles with mouse
      if (mouse.current) {
        particlesMesh.rotation.x += (mouse.current.y * 0.5 - particlesMesh.rotation.x) * 0.01;
        particlesMesh.rotation.y += (mouse.current.x * 0.5 - particlesMesh.rotation.y) * 0.01;
      }
      
      // Update lights
      pointLight1.position.x = Math.sin(time * 0.5) * 20;
      pointLight1.position.z = Math.cos(time * 0.5) * 20;
      
      pointLight2.position.x = Math.cos(time * 0.3) * 15;
      pointLight2.position.z = Math.sin(time * 0.3) * 15;
      
      // Render
      composer.render();
      frameId.current = requestAnimationFrame(animate);
    };

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
      effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
      particlesMaterial.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
    };

    // Mouse move interaction
    const handleMouseMove = (event) => {
      mouse.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Start animation
    animate();

    // Store the glitchPass reference
    glitchPassRef.current = glitchPass;
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      // Cancel any pending animation frame
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      
      // Clean up glitch pass first - handle it separately
      try {
        if (glitchPassRef.current && glitchPassRef.current.dispose) {
          // Remove from composer first to prevent access during disposal
          if (composer && composer.passes) {
            const index = composer.passes.indexOf(glitchPassRef.current);
            if (index !== -1) {
              composer.passes.splice(index, 1);
            }
          }
          // Then dispose
          glitchPassRef.current.dispose();
          glitchPassRef.current = null;
        }
      } catch (e) {
        console.warn('Error cleaning up GlitchPass:', e);
      }
      
      // Clean up other effects
      if (composer) {
        // Create a copy of passes array to safely iterate
        const passes = [...(composer.passes || [])];
        passes.forEach(pass => {
          try {
            if (pass && pass.dispose) {
              pass.dispose();
            }
          } catch (e) {
            console.warn('Error cleaning up pass:', e);
          }
        });
        composer.passes = [];
      }
      
      // Dispose of geometries and materials
      if (geometry) geometry.dispose();
      if (particlesGeometry) particlesGeometry.dispose();
      if (material) material.dispose();
      if (particlesMaterial) particlesMaterial.dispose();
      
      // Dispose of renderer last
      if (renderer) {
        if (mountNode && mountNode.contains(renderer.domElement)) {
          mountNode.removeChild(renderer.domElement);
        }
        renderer.dispose();
      }
    };
  }, [isMobile]);

  return (
    <div 
      ref={mountRef} 
      className="travel-bg" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        opacity: 1,
        pointerEvents: 'none',
        background: 'linear-gradient(to bottom, #000428, #004e92)'
      }}
    >
      <div className="location-info">
        <h3>{currentLocation.name}</h3>
        <p>Chikmagaluru, Karnataka</p>
      </div>
    </div>
  );
};

export default Animated3DBackground;
