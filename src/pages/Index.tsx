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
import EnhancedParticleBackground from "@/components/EnhancedParticleBackground";

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

// Updated background styles: Remove bg-hero-pattern for Hero section
const bgHelpers = [
  "", // Hero - No background pattern needed anymore
  "bg-hero-pattern bg-fixed", // About
  "bg-hero-pattern bg-fixed", // Projects
  "bg-hero-pattern bg-fixed", // Tech Stack
  "bg-hero-pattern bg-fixed", // Contact
  "bg-hero-pattern bg-fixed", // Blog
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
  "min-h-[90vh] flex items-center justify-center relative overflow-hidden will-change-transform", // Hero - simplified class
  "min-h-[80vh] py-20 flex items-center justify-center relative will-change-transform", // About
  "min-h-[90vh] py-24 flex items-center justify-center relative will-change-transform", // Projects - more padding
  "min-h-[80vh] py-20 flex items-center justify-center relative will-change-transform", // Tech Stack
  "min-h-[70vh] py-16 flex items-center justify-center relative will-change-transform", // Contact
  "min-h-[70vh] py-16 flex items-center justify-center relative will-change-transform", // Blog
];

// Section particle variants
const PARTICLE_VARIANTS = [
  "home", 
  "about", 
  "projects", 
  "techStack", 
  "contact", 
  "blog"
];

// Define particle shapes for each section - fixing the TypeScript error
const PARTICLE_SHAPES: Array<Array<"square" | "circle" | "hexagon">> = [
  ["circle", "hexagon"], // Home section
  ["circle"], // About section
  ["square", "circle"], // Projects section
  ["hexagon"], // Tech Stack section
  ["circle"], // Contact section
  ["circle"] // Blog section
];

// Section glow classes
const SECTION_GLOW_CLASSES = [
  "", // Removed unnecessary glows for performance
  "",
  "",
  "",
  "",
  ""
];

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolling, setIsScrolling] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  // Fix TypeScript error by using useRef instead of window property
  const scrollTimeoutRef = useRef<number | null>(null);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
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
    <div className={`min-h-screen bg-darkBlue text-white transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      
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
              className={`${SECTION_STYLES[i]} ${bgHelpers[i] || ""} ${SECTION_GLOW_CLASSES[i]} transition-all duration-300`}
              style={{ 
                scrollMarginTop: 100,
                position: "relative",
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Section-specific particle backgrounds with reduced motion option - removed for Hero section */}
              {!prefersReducedMotion && i !== 0 && (
                <EnhancedParticleBackground 
                  variant={PARTICLE_VARIANTS[i] as any} 
                  density={i === 0 ? 48 : 36} // Further density reduction for non-hero sections
                  shapes={PARTICLE_SHAPES[i]}
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
