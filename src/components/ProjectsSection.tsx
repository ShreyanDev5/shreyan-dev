import React, { memo } from "react";
import projectsData from "@/data/projects.json";
import { ProjectCard } from "./ProjectCard";
import { motion } from "framer-motion";

export const ProjectsSection: React.FC = memo(() => {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-3 tracking-[-0.02em]">
            Projects
          </h2>
          <div className="w-12 h-0.5 bg-emerald-500 rounded-full mx-auto mb-6" />
          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            A showcase of technical depth and creative solutions — from scalable applications to experimental interfaces.
          </p>
        </motion.div>

        {/* Grid - show all projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});
