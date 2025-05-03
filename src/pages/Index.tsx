
import { useState, useEffect, useRef } from "react";
import IntelligentNavbar from "@/components/IntelligentNavbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import ContactForm from "@/components/ContactForm";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import TechStackCarousel from "@/components/TechStackCarousel";
import { motion, AnimatePresence } from "framer-motion";
import TechParticles from "@/components/TechParticles";

// Remove unused sections
const SECTION_IDS = ["home", "about", "projects", "tech-stack", "contact", "blog"];
const SECTION_NAMES = [
  "Creative Developer",
  "About",
  "Projects",
  "Tech Stack",
  "Contact",
  "Blog",
];

// Updated background styles with tech-inspired patterns
const bgHelpers = [
  "bg-tech-pattern bg-fixed", // Hero - tech gradient
  "bg-tech-pattern bg-fixed", // About
  "bg-tech-pattern bg-fixed", // Projects
  "bg-tech-pattern bg-fixed", // Tech Stack
  "bg-tech-pattern bg-fixed", // Contact
  "bg-tech-pattern bg-fixed", // Blog
];

const sectionContent = [
  <Hero key="hero-section" />,
  <AboutSection key="about-section" />,
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full" key="projects-container">
    <ProjectsSection />
  </div>,
  <TechStackCarousel key="tech-stack-section" />,
  <ContactForm key="contact-section" />,
  <BlogSection key="blog-section" />,
];

// Section styling with improved performance
const SECTION_STYLES = [
  "min-h-[90vh] flex items-center justify-center relative overflow-hidden will-change-transform", // Hero - performance optimized
  "min-h-[80vh] py-20 flex items-center justify-center relative will-change-transform", // About
  "min-h-[90vh] py-24 flex items-center justify-center relative will-change-transform", // Projects - more padding
  "min-h-[80vh] py-20 flex items-center justify-center relative will-change-transform", // Tech Stack
  "min-h-[70vh] py-16 flex items-center justify-center relative will-change-transform", // Contact
  "min-h-[70vh] py-16 flex items-center justify-center relative will-change-transform", // Blog
];

// Section particle configurations
const PARTICLE_CONFIGS = [
  { // Hero section
    count: 60,
    color: ['#00FFFF', '#39FF14', '#FFFFFF'],
    minSize: 1,
    maxSize: 3,
    speed: 0.3,
    opacity: 0.4,
    shapes: ['circle', 'hexagon']
  }, 
  { // About section
    count: 40,
    color: ['#00FFFF', '#FFFFFF'],
    minSize: 1,
    maxSize: 2,
    speed: 0.2,
    opacity: 0.3,
    shapes: ['circle']
  }, 
  { // Projects section
    count: 50,
    color: ['#39FF14', '#00FFFF'],
    minSize: 1,
    maxSize: 2.5,
    speed: 0.25,
    opacity: 0.35,
    shapes: ['circle', 'square']
  }, 
  { // Tech Stack section
    count: 55,
    color: ['#00FFFF', '#40E0D0'],
    minSize: 1,
    maxSize: 3,
    speed: 0.3,
    opacity: 0.35,
    shapes: ['hexagon', 'circle']
  }, 
  { // Contact section
    count: 35,
    color: ['#00FFFF', '#FFFFFF'],
    minSize: 1,
    maxSize: 2,
    speed: 0.2,
    opacity: 0.3,
    shapes: ['circle']
  }, 
  { // Blog section
    count: 45,
    color: ['#39FF14', '#00FFFF'],
    minSize: 1,
    maxSize: 2,
    speed: 0.25,
    opacity: 0.35,
    shapes: ['circle', 'hexagon']
  }
];

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolling, setIsScrolling] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  // Fix TypeScript error by using useRef instead of window property
  const scrollTimeoutRef = useRef<number | null>(null);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleReducedMotionChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleReducedMotionChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleReducedMotionChange);
    };
  }, []);

  // Detect active section on scroll - optimized for performance
  useEffect(() => {
    const handleScroll = () => {
      // Set scrolling state to disable animations during scroll
      if (!isScrolling) {
        setIsScrolling(true);
      }
      
      // Clear timeout if it exists
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Set timeout to detect when scrolling stops
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 100);
      
      // Use requestAnimationFrame for scroll performance
      requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + 250; // offset for more natural transitions
        
        // Find which section is currently in view
        const sections = SECTION_IDS.map(id => document.getElementById(id));
        
        const currentSection = sections.find((section) => {
          if (!section) return false;
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          return scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight;
        });
        
        if (currentSection) {
          setActiveSection(currentSection.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true }); // passive for better performance
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isScrolling]);

  // Simple mount animation for the whole page
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <div className={`min-h-screen bg-navy-dark text-white transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Responsive pill navbar */}
      <IntelligentNavbar />
      
      <AnimatePresence>
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Sections */}
          {SECTION_IDS.map((id, i) => (
            <motion.section
              id={id}
              key={id}
              className={`${SECTION_STYLES[i]} ${bgHelpers[i] || ""} transition-all duration-300`}
              style={{ 
                scrollMarginTop: 100,
                position: "relative",
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Section-specific particle backgrounds with reduced density for performance */}
              {!reducedMotion && (
                <TechParticles
                  count={PARTICLE_CONFIGS[i].count}
                  color={PARTICLE_CONFIGS[i].color}
                  minSize={PARTICLE_CONFIGS[i].minSize}
                  maxSize={PARTICLE_CONFIGS[i].maxSize}
                  speed={PARTICLE_CONFIGS[i].speed}
                  opacity={PARTICLE_CONFIGS[i].opacity}
                  shapes={PARTICLE_CONFIGS[i].shapes}
                  interactive={true}
                />
              )}
              
              {sectionContent[i]}
            </motion.section>
          ))}
        </motion.main>
      </AnimatePresence>

      {/* Add a proper footer */}
      <Footer />
    </div>
  );
};

export default Index;
