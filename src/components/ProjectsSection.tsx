import React from "react";
import projectsData from "@/data/projects.json";
import { ProjectCard } from "./ProjectCard";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

export const ProjectsSection: React.FC = () => {
  return (
    <section className="relative py-8 sm:py-12 px-3 sm:px-6 lg:px-8">
      {/* Enhanced responsive section header */}
      <div className="max-w-7xl mx-auto mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 tracking-tight bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] bg-clip-text text-transparent">
          My Creations
        </h2>
        <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl leading-relaxed font-light">
          Explore a curated selection of my work—ranging from hobby builds and experimental tools to practical, real-world applications. Each project represents a step in my software development journey, reflecting what I've learned, created, and enjoyed building.
        </p>
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
                tiltEnable={window.innerWidth > 768} // Disable tilt on mobile
              >
                <div className="card-purple-hover h-full">
                  <ProjectCard project={project} />
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Single background pattern overlay */}
      <div 
        className="absolute inset-0 -z-10 opacity-10 bg-circuit-pattern"
        aria-hidden="true"
      />
    </section>
  );
};
