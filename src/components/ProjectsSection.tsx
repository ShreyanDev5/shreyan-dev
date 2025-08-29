
import React from "react";
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
`;

export const ProjectsSection: React.FC = () => {
  return (
    <>
      <style>{styles}</style>
      <section className="relative py-16 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8">
        {/* Premium background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-80 sm:w-96 h-80 sm:h-96 bg-gradient-radial from-emerald-500/10 via-emerald-500/5 to-transparent rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-gradient-radial from-blue-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl opacity-50"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[560px] h-[360px] bg-gradient-radial from-purple-500/10 via-transparent to-transparent rounded-full blur-3xl opacity-30"></div>
        </div>
        
        {/* Enhanced responsive section header with premium design */}
        <div className="max-w-7xl mx-auto mb-10 sm:mb-16 relative z-10">
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
            
            <h2 className="relative text-4xl sm:text-5xl md:text-6xl leading-[1.08] font-heading font-semibold sm:font-bold mb-4 sm:mb-6 tracking-tight heading-gradient-neutral">
              My Creations
            </h2>
            
            <div className="w-24 sm:w-32 h-[3px] bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mx-auto mb-6 sm:mb-8"></div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="max-w-3xl mx-auto space-y-3 sm:space-y-4"
            >
              <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl font-light tracking-wide" style={{ lineHeight: '1.7' }}>
                Thoughtfully crafted apps and experiments
              </p>
              <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl font-light tracking-wide" style={{ lineHeight: '1.7' }}>
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

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Premium Cards Grid with enhanced spacing and design */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 lg:gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.2 }}
          >
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                className="group"
              >
                <Tilt
                  tiltMaxAngleX={3}
                  tiltMaxAngleY={3}
                  glareEnable={true}
                  glareMaxOpacity={0.1}
                  glareColor="#475569"
                  glarePosition="all"
                  glareBorderRadius="16px"
                  className="h-full transform-gpu"
                  tiltEnable={window.innerWidth > 768}
                >
                  <div className="relative h-full rounded-2xl overflow-hidden">
                    {/* Card glow effect (more subtle on hover) */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/2 via-blue-500/2 to-purple-500/2 rounded-2xl blur-sm opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    <div className="relative h-full bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/15 rounded-2xl overflow-hidden transition-colors duration-300 group-hover:border-white/20">
                      <ProjectCard project={project} />
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Premium minimal background overlays */}
        <div className="absolute inset-0 -z-10 bg-noise-subtle" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-grid-subtle" aria-hidden="true" />
      </section>
    </>
  );
};
