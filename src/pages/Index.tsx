
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
import CursorTrail from "@/components/CursorTrail";
import ReadingProgress from "@/components/ReadingProgress";

const SECTION_IDS = ["home", "about", "projects", "tech-stack", "contact", "blog"];

const bgHelpers = [
  "", // Hero
  "bg-hero-pattern bg-fixed", // About
  "bg-projects-gradient", // Projects 
  "bg-hero-pattern bg-fixed", // Tech Stack
  "bg-contact-gradient", // Contact
  "bg-blog-gradient", // Blog
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

const SECTION_STYLES = [
  "min-h-[90vh] flex items-center justify-center relative overflow-hidden", // Hero
  "min-h-[80vh] py-20 flex items-center justify-center relative", // About
  "min-h-[90vh] py-24 flex items-center justify-center relative", // Projects
  "min-h-[80vh] py-20 flex items-center justify-center relative", // Tech Stack
  "min-h-[70vh] py-16 flex items-center justify-center relative", // Contact
  "min-h-[70vh] py-16 flex items-center justify-center relative", // Blog
];

const PARTICLE_VARIANTS = [
  "home", 
  "about", 
  "projects", 
  "techStack", 
  "contact", 
  "blog"
];

const PARTICLE_SHAPES: Array<Array<"square" | "circle" | "hexagon">> = [
  ["circle", "hexagon"], // Home section
  ["circle"], // About section
  ["square", "circle"], // Projects section
  ["hexagon"], // Tech Stack section
  ["circle"], // Contact section
  ["circle"] // Blog section
];

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolling, setIsScrolling] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Optimized scroll handler with better performance
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      
      ticking = true;
      requestAnimationFrame(() => {
        // Set scrolling state to disable heavy animations during scroll
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
        }, 150);
        
        // Find which section is currently in view with better performance
        const scrollPosition = window.scrollY + 250;
        
        for (let i = 0; i < SECTION_IDS.length; i++) {
          const section = document.getElementById(SECTION_IDS[i]);
          if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
              if (activeSection !== SECTION_IDS[i]) {
                setActiveSection(SECTION_IDS[i]);
              }
              break;
            }
          }
        }
        
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isScrolling, activeSection]);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <div className={`min-h-screen bg-darkBlue text-white transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Add cursor trail effect */}
      {!prefersReducedMotion && <CursorTrail />}
      
      {/* Add reading progress for blog section */}
      <ReadingProgress target="#blog" />
      
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
                willChange: isScrolling ? 'auto' : 'transform'
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Optimized particle backgrounds with reduced density during scroll */}
              {!prefersReducedMotion && i !== 0 && (
                <EnhancedParticleBackground 
                  variant={PARTICLE_VARIANTS[i] as any} 
                  density={isScrolling ? 24 : 32} // Reduce particles during scroll
                  shapes={PARTICLE_SHAPES[i]}
                />
              )}
              
              {sectionContent[i]}
            </motion.section>
          ))}
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Index;
