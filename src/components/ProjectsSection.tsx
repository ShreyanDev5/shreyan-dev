
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
    background: linear-gradient(
      90deg,
      #e2e8f0 0%,
      #cbd5e1 25%,
      #e2e8f0 50%,
      #cbd5e1 75%,
      #e2e8f0 100%
    );
    background-size: 200% auto;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 8s linear infinite;
    font-weight: 500;
  }

  .heading-glow {
    text-shadow: 0 0 20px rgba(88, 28, 135, 0.6),
                 0 0 40px rgba(88, 28, 135, 0.3);
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
      <section className="relative py-8 sm:py-12 px-3 sm:px-6 lg:px-8">
        {/* Enhanced responsive section header with improved vibrant purple colors */}
        <div className="max-w-7xl mx-auto mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="relative text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 tracking-tight heading-glow">
              <span className="bg-gradient-to-r from-[#581c87] via-[#7c3aed] to-[#6b21a8] bg-clip-text text-transparent bg-size-200 animate-gradient">
                My Creations
              </span>
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="space-y-3"
            >
              <p className="text-gray-300 text-base sm:text-base md:text-lg lg:text-xl max-w-3xl leading-relaxed font-light tracking-wide">
                Things I've built—and loved building
              </p>
              <p className="text-gray-300 text-base sm:text-base md:text-lg lg:text-xl max-w-3xl leading-relaxed font-light tracking-wide">
                From{" "}
                <span className="highlight-phrase">productivity tools</span>{" "}
                to{" "}
                <span className="highlight-phrase">real-world solutions</span>
                , each project reflects a chapter of my{" "}
                <span className="highlight-phrase">growth</span>{" "}
                as a developer. They showcase not just what I've learned, but how I turn ideas into working software using technologies like{" "}
                <span className="highlight-phrase">Java</span>,{" "}
                <span className="highlight-phrase">Spring Boot</span>, and{" "}
                <span className="highlight-phrase">React</span>.
              </p>
            </motion.div>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Cards Grid - Adjusted gap for mobile */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-7"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.15 }}
          >
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1
                }}
              >
                <Tilt
                  tiltMaxAngleX={3}
                  tiltMaxAngleY={3}
                  glareEnable={true}
                  glareMaxOpacity={0.1}
                  glareColor="#7c3aed"
                  glarePosition="all"
                  glareBorderRadius="12px"
                  className="h-full transform-gpu"
                  tiltEnable={window.innerWidth > 768}
                >
                  <div className="card-purple-hover h-full">
                    <ProjectCard project={project} />
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <div 
          className="absolute inset-0 -z-10 opacity-10 bg-circuit-pattern"
          aria-hidden="true"
        />
      </section>
    </>
  );
};
