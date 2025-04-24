
import { useState, useEffect } from "react";
import IntelligentNavbar from "@/components/IntelligentNavbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactForm from "@/components/ContactForm";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";

// Section configuration
const SECTION_IDS = ["home", "about", "projects", "skills", "contact", "blog"];
const SECTION_NAMES = [
  "Creative Developer", // Changed to a more personal brand statement
  "About",
  "Projects",
  "Skills & Tech",
  "Contact",
  "Blog",
];

// Different background styles for each section
const bgHelpers = [
  "bg-transparent", // Hero
  "bg-background/95 backdrop-blur-sm", // About
  "bg-gradient-to-b from-background via-blue-950/90 to-background/95 text-white", // Projects
  "bg-background/90", // Skills
  "bg-white/5 backdrop-blur-md text-gray-100 border-t border-b border-blue-900/10", // Contact
  "bg-background/85", // Blog
];

const sectionContent = [
  // Hero (Home)
  <Hero key="herosection" />,
  // About
  <AboutSection key="about-section" />,
  // Projects
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
    <ProjectsSection key="proj-section"/>
  </div>,
  // Skills & Tech
  <SkillsSection key="skills-section" />,
  // Contact (ContactForm)
  (
    <div className="max-w-3xl mx-auto px-4">
      <ContactForm />
    </div>
  ),
  // Blog
  (
    <BlogSection key="blog-section" />
  ),
];

// Section styling
const SECTION_STYLES = [
  "min-h-[90vh] flex items-center justify-center relative overflow-hidden", // Hero - taller
  "min-h-[80vh] py-20 flex items-center justify-center relative", // About
  "min-h-[90vh] py-24 flex items-center justify-center relative", // Projects - more padding
  "min-h-[80vh] py-20 flex items-center justify-center relative", // Skills
  "min-h-[70vh] py-16 flex items-center justify-center relative", // Contact - slightly shorter
  "min-h-[70vh] py-16 flex items-center justify-center relative", // Blog
];

const Index = () => {
  const [mounted, setMounted] = useState(false);

  // Simple mount animation for the whole page
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`min-h-screen bg-background text-white transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      {/* Responsive pill navbar */}
      <IntelligentNavbar />
      <main>
        {/* Sections */}
        {SECTION_IDS.map((id, i) => (
          <section
            id={id}
            key={id}
            className={`${SECTION_STYLES[i]} ${bgHelpers[i] || ""} transition-all duration-500`}
            style={{ 
              scrollMarginTop: 100,
              position: "relative",
            }}
          >
            {/* Decorative elements for some sections */}
            {(i === 2 || i === 4) && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div 
                  className="absolute -top-[30%] -right-[10%] w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px]"
                  aria-hidden="true"
                />
                <div 
                  className="absolute -bottom-[30%] -left-[10%] w-[500px] h-[500px] rounded-full bg-blue-400/5 blur-[120px]"
                  aria-hidden="true"
                />
              </div>
            )}
            {sectionContent[i]}
          </section>
        ))}
      </main>

      {/* Add a proper footer */}
      <Footer />
    </div>
  );
};

export default Index;
