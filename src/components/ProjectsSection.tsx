
import React from "react";
import projectsData from "@/data/projects.json";
import { ProjectCard } from "./ProjectCard";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

export const ProjectsSection: React.FC = () => {
  return (
    <section className="relative">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-1 text-white">My Creations</h2>
        <p className="text-gray-400 text-lg">Showcase your real estate projects, share updates in real time, and collaborate across teams with ease.</p>
      </div>
      <div className="pb-6">
        {/* Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
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
                className="h-full transform-gpu" // Added for hardware acceleration
              >
                <div className="card-purple-hover h-full">
                  <ProjectCard project={project} />
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Background pattern overlay */}
      <div 
        className="absolute inset-0 -z-10 opacity-10 bg-circuit-pattern"
        aria-hidden="true"
      />
    </section>
  );
};
