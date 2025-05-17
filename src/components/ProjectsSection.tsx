import React from "react";
import projectsData from "@/data/projects.json";
import { ProjectCard } from "./ProjectCard";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

export const ProjectsSection: React.FC = () => {
  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8">
      {/* Enhanced responsive section header */}
      <div className="max-w-7xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] bg-clip-text text-transparent">
          My Creations
        </h2>
        <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed font-light">
          Explore a curated selection of my work—ranging from hobby builds and experimental tools to practical, real-world applications. Each project represents a step in my software development journey, reflecting what I've learned, created, and enjoyed building.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
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
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                glareEnable={true}
                glareMaxOpacity={0.1}
                glareColor="#7c3aed"
                glarePosition="all"
                glareBorderRadius="12px"
                className="h-full transform-gpu"
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
