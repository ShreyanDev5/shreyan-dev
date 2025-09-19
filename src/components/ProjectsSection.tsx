
import React, { memo } from "react";
import projectsData from "@/data/projects.json";
import { ProjectCard } from "./ProjectCard";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

const styles = `
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-2px); }
    100% { transform: translateY(0px); }
  }

  .bg-size-200 {
    background-size: 200% 200%;
  }

  .animate-gradient {
    animation: gradient 8s ease infinite;
  }

  .text-shimmer {
    color: #e2e8f0;
    animation: shimmer 10s linear infinite;
    font-weight: 600;
  }

  .highlight-phrase {
    position: relative;
    display: inline-block;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: #ffffff;
    transition: opacity 0.3s ease;
  }

  .highlight-phrase:hover {
    opacity: 0.9;
  }

  .artistic-text {
    background: linear-gradient(
      120deg,
      #e2e8f0 0%,
      #cbd5e1 25%,
      #94a3b8 50%,
      #cbd5e1 75%,
      #e2e8f0 100%
    );
    background-size: 200% auto;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 8s linear infinite;
  }

  @media (max-width: 640px) {
    .text-shimmer {
      font-weight: 600;
    }
    .highlight-phrase {
      font-weight: 800;
      color: #ffffff;
    }
  }
  
  /* Mobile-specific project section optimizations */
  @media (max-width: 768px) {
    .projects-grid {
      gap: 1rem;
    }
    
    .project-card-wrapper {
      padding-left: 0;
      padding-right: 0;
    }
  }
  
  @media (max-width: 640px) {
    .projects-section-mobile {
      padding-left: 0.75rem;
      padding-right: 0.75rem;
    }
    
    .projects-section-mobile .px-4 {
      padding-left: 0;
      padding-right: 0;
    }
  }
`;

// Memoized ProjectCard wrapper to prevent unnecessary re-renders
const ProjectCardWrapper = memo(({ project, index }: { project: any; index: number }) => {
  const [isTouchActive, setIsTouchActive] = React.useState(false);
  
  // Reduce animation complexity on mobile for better performance
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  // Simplified card component without Tilt effect on mobile for better performance
  const CardContent = () => (
    <div className="relative h-full rounded-2xl overflow-hidden">
      {/* Simplified card glow effect for better performance */}
      <div className={`absolute inset-0 bg-gradient-to-br from-emerald-900/25 via-blue-900/20 to-purple-900/25 rounded-2xl transition-opacity duration-300 ${isTouchActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
      <div className={`relative h-full bg-gradient-to-br from-white/3 to-white/0 border rounded-2xl overflow-hidden transition-all duration-200 ${isTouchActive ? 'border-white/35' : 'border-white/20 group-hover:border-white/25'}`}>
        <ProjectCard project={project} />
      </div>
    </div>
  );
  
  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: isMobile ? 0.3 : 0.6,
        delay: isMobile ? index * 0.05 : index * 0.1,
        ease: "easeOut"
      }}
      className="group px-2 sm:px-2 project-card-wrapper"
      onTouchStart={() => setIsTouchActive(true)}
      onTouchEnd={() => setIsTouchActive(false)}
      onTouchCancel={() => setIsTouchActive(false)}
    >
      {isMobile ? (
        <div className="h-full transform-gpu">
          <CardContent />
        </div>
      ) : (
        <Tilt
          tiltMaxAngleX={3}
          tiltMaxAngleY={3}
          glareEnable={true}
          glareMaxOpacity={0.1}
          glareColor="#475569"
          glarePosition="all"
          glareBorderRadius="16px"
          className="h-full transform-gpu"
          tiltEnable={true}
        >
          <CardContent />
        </Tilt>
      )}
    </motion.div>
  );
});

export const ProjectsSection: React.FC = memo(() => {
  const [visibleProjects, setVisibleProjects] = React.useState(6);
  const totalProjects = projectsData.length;
  
  const showMoreProjects = () => {
    setVisibleProjects(prev => Math.min(prev + 3, totalProjects));
  };
  
  const visibleProjectsData = projectsData.slice(0, visibleProjects);
  
  return (
    <>
      <style>{styles}</style>
      <section className="relative py-16 sm:py-24 md:py-28 px-0 sm:px-6 lg:px-8 projects-section section-mobile-padding">
        {/* Premium unique gradient background for projects section */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Unique gradient orbs for projects section - responsive positioning */}
          <div className="absolute -top-32 left-1/4 w-64 h-64 sm:w-96 sm:h-96 sm:-top-40 bg-gradient-radial from-cyan-900/30 via-blue-950/20 to-transparent rounded-full blur-3xl opacity-70"></div>
          <div className="absolute -bottom-32 right-1/4 w-64 h-64 sm:w-96 sm:h-96 sm:-bottom-40 bg-gradient-radial from-purple-900/30 via-purple-950/20 to-transparent rounded-full blur-3xl opacity-70"></div>
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] sm:w-[600px] sm:h-[400px] bg-gradient-radial from-emerald-900/25 via-cyan-900/15 to-transparent rounded-full blur-3xl opacity-50"></div>
        </div>
        
        {/* Enhanced responsive section header with premium design */}
        <div className="max-w-7xl mx-auto mb-10 sm:mb-16 relative z-10 pt-8 sm:pt-10 px-4 sm:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-5">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-emerald-500 blur-md opacity-30"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-emerald-400 relative z-10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-white/90 text-[13px] sm:text-sm font-medium tracking-wide bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Portfolio Showcase</span>
            </div>
            
            <h2 className="relative text-3xl sm:text-5xl md:text-6xl leading-[1.1] font-heading font-semibold sm:font-bold mb-4 sm:mb-6 tracking-tight heading-gradient-neutral">
              My Creations
            </h2>
            
            <div className="w-24 sm:w-32 h-[3px] bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mx-auto mb-6 sm:mb-8"></div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="max-w-3xl mx-auto space-y-3 sm:space-y-4 px-6 sm:px-0"
            >
              <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl font-light tracking-wide" style={{ lineHeight: '1.6' }}>
                Thoughtfully crafted apps and experiments
              </p>
              <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl font-light tracking-wide" style={{ lineHeight: '1.6' }}>
                From{" "}
                <span className="highlight-phrase">productivity tools</span>{" "}
                to{" "}
                <span className="highlight-phrase">real-world solutions</span>
                , each project reflects a chapter of my growth. They highlight not just what I've learned, but how I{" "}
                <span className="highlight-phrase">turn ideas into working software</span>{" "}
                using technologies like Java, Spring Boot, and React.
              </p>
            </motion.div>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 px-2 sm:px-0 projects-section-mobile">
          {/* Premium Cards Grid with enhanced spacing and design - optimized for mobile */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-7 lg:gap-8 projects-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.2 }}
          >
            {visibleProjectsData.map((project, index) => (
              <ProjectCardWrapper key={project.id} project={project} index={index} />
            ))}
          </motion.div>
          
          {/* Show More Button */}
          {visibleProjects < totalProjects && (
            <div className="flex justify-center mt-8 sm:mt-10">
              <button
                onClick={showMoreProjects}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-full font-medium hover:from-emerald-500 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 shadow-lg hover:shadow-xl"
              >
                Show More Projects
              </button>
            </div>
          )}
        </div>
        
        {/* Add spacing after the last project card on mobile */}
        <div className="pb-8 sm:pb-10"></div>
        
        
      </section>
    </>
  );
});
