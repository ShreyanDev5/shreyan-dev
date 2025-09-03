
import { useState, useEffect, useRef, useMemo, useCallback, memo } from "react";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import ContactForm from "@/components/ContactForm";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import TechStackCarousel from "@/components/TechStackCarousel";
import GrowthTimeline from "@/components/GrowthTimeline";
import { motion, AnimatePresence } from "framer-motion";
import EnhancedParticleBackground from "@/components/EnhancedParticleBackground";
import ReadingProgress from "@/components/ReadingProgress";
import BackToTop from "@/components/BackToTop";

const SECTION_IDS = ["home", "about", "projects", "tech-stack", "journey", "contact", "blog"];

const bgHelpers = [
  "", // Hero
  "", // About - removed background to prevent flickering
  "bg-projects-gradient", // Projects 
  "", // Tech Stack - removed background to prevent flickering
  "bg-journey-gradient", // Journey
  "bg-contact-gradient", // Contact
  "bg-blog-gradient", // Blog
];

// Memoized section components to prevent unnecessary re-renders
const SectionComponents = [
  memo(Hero),
  memo(AboutSection),
  memo(() => (
    <div className="max-w-7xl mx-auto w-full">
      <ProjectsSection />
    </div>
  )),
  memo(TechStackCarousel),
  memo(GrowthTimeline),
  memo(ContactForm),
  memo(BlogSection),
];

const SECTION_STYLES = [
  "min-h-[90vh] flex items-center justify-center relative overflow-hidden", // Hero
  "min-h-[80vh] py-8 flex items-center justify-center relative overflow-visible", // About
  "min-h-[90vh] py-16 flex items-center justify-center relative", // Projects
  "min-h-[80vh] py-14 flex items-center justify-center relative", // Tech Stack
  "min-h-screen flex items-center justify-center relative py-20", // Journey
  "min-h-[70vh] py-20 flex items-center justify-center relative", // Contact
  "min-h-[auto] py-20 flex items-center justify-center relative", // Blog
];

const PARTICLE_VARIANTS = [
  "home", 
  "about", 
  "projects", 
  "techStack", 
  "journey",
  "contact", 
  "blog"
];

const PARTICLE_SHAPES: Array<Array<"square" | "circle" | "hexagon">> = [
  ["circle", "hexagon"], // Home section
  ["circle"], // About section
  ["square", "circle"], // Projects section
  ["hexagon"], // Tech Stack section
  ["circle"], // Journey section
  ["circle"], // Contact section
  ["circle"] // Blog section
];

// Memoized section renderer to prevent unnecessary re-renders
const SectionRenderer = memo(({ 
  id, 
  index, 
  Component, 
  prefersReducedMotion, 
  isScrolling 
}: { 
  id: string; 
  index: number; 
  Component: React.ComponentType; 
  prefersReducedMotion: boolean; 
  isScrolling: boolean; 
}) => (
  <motion.section
    id={id}
    key={id}
    className={`${SECTION_STYLES[index]} ${bgHelpers[index] || ""}`}
    style={{ 
      scrollMarginTop: 80,
      position: "relative"
    }}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.4 }}
  >
    {/* Conditional particle backgrounds with reduced animation overhead */}
    {!prefersReducedMotion && index !== 0 && !isScrolling && (
      <EnhancedParticleBackground 
        variant={PARTICLE_VARIANTS[index] as any} 
        density={24}
        shapes={PARTICLE_SHAPES[index]}
      />
    )}
    
    <Component />
  </motion.section>
));

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolling, setIsScrolling] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Optimized scroll handler with better performance and throttling
  const handleScroll = useCallback(() => {
    if (ticking.current || !window) return;
    
    ticking.current = true;
    
    // Use a more efficient scroll handler
    const currentScrollY = window.scrollY;
    
    // Only update if scroll difference is significant (reduces unnecessary updates)
    if (Math.abs(currentScrollY - lastScrollY.current) < 5) {
      ticking.current = false;
      return;
    }
    
    lastScrollY.current = currentScrollY;
    
    // Set scrolling state with debouncing and slower transition
    if (!isScrolling) {
      setIsScrolling(true);
    }
    
    // Clear timeout if it exists
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Optimized timeout to detect when scrolling stops with slower transition
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 200);
    
    // Optimized section detection with early exit
    const scrollPosition = currentScrollY + 200;
    let newActiveSection = activeSection;
    
    for (let i = 0; i < SECTION_IDS.length; i++) {
      const section = document.getElementById(SECTION_IDS[i]);
      if (section) {
        const rect = section.getBoundingClientRect();
        const sectionTop = currentScrollY + rect.top;
        const sectionHeight = rect.height;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          newActiveSection = SECTION_IDS[i];
          break;
        }
      }
    }
    
    // Only update state if section actually changed
    if (newActiveSection !== activeSection) {
      setActiveSection(newActiveSection);
    }
    
    ticking.current = false;
  }, [isScrolling, activeSection]);

  useEffect(() => {
    // Use passive event listener for better performance
    window.addEventListener('scroll', handleScroll, { 
      passive: true
    });
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Memoize sections to prevent unnecessary re-renders
  const memoizedSections = useMemo(() => 
    SECTION_IDS.map((id, i) => (
      <SectionRenderer 
        key={id}
        id={id}
        index={i}
        Component={SectionComponents[i]}
        prefersReducedMotion={prefersReducedMotion}
        isScrolling={isScrolling}
      />
    )), 
    [prefersReducedMotion, isScrolling]
  );
  
  return (
    <div className={`min-h-screen bg-darkBlue text-white transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Add reading progress for blog section */}
      <ReadingProgress target="#blog" />
      
      <AnimatePresence>
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Optimized sections rendering */}
          {memoizedSections}
        </motion.main>
      </AnimatePresence>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default memo(Index);
