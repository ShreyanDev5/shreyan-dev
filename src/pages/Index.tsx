import { useState, useEffect } from "react";
import IntelligentNavbar from "@/components/IntelligentNavbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import ContactForm from "@/components/ContactForm";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import TechStackCarousel from "@/components/TechStackCarousel";
import { motion, AnimatePresence } from "framer-motion";

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

// Different background styles for each section with smoother transitions
const bgHelpers = [
  "bg-transparent", // Hero
  "bg-section-gradient", // About
  "bg-gradient-to-b from-background via-background/95 to-background", // Projects
  "bg-section-gradient", // Tech Stack
  "bg-white/5 backdrop-blur-md border-t border-emerald-900/10", // Contact
  "bg-section-gradient", // Blog
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

// Section styling
const SECTION_STYLES = [
  "min-h-[90vh] flex items-center justify-center relative overflow-hidden", // Hero - taller
  "min-h-[80vh] py-20 flex items-center justify-center relative", // About
  "min-h-[90vh] py-24 flex items-center justify-center relative", // Projects - more padding
  "min-h-[80vh] py-20 flex items-center justify-center relative", // Tech Stack
  "min-h-[70vh] py-16 flex items-center justify-center relative", // Contact - slightly shorter
  "min-h-[70vh] py-16 flex items-center justify-center relative", // Blog
];

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
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
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Simple mount animation for the whole page
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <div className={`min-h-screen bg-background text-white transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      
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
              className={`${SECTION_STYLES[i]} ${bgHelpers[i] || ""} transition-all duration-500`}
              style={{ 
                scrollMarginTop: 100,
                position: "relative",
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              {/* Decorative elements for some sections */}
              {(i === 2 || i === 3) && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div 
                    className="absolute -top-[30%] -right-[10%] w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[120px]"
                    aria-hidden="true"
                  />
                  <div 
                    className="absolute -bottom-[30%] -left-[10%] w-[500px] h-[500px] rounded-full bg-emerald-400/5 blur-[120px]"
                    aria-hidden="true"
                  />
                </div>
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
