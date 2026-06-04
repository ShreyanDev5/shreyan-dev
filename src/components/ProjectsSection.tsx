import { memo, type FC } from "react";
import projectsData from "@/data/projects.json";
import { ProjectCard, type Project } from "./ProjectCard";
import { motion } from "framer-motion";

export const ProjectsSection: FC = memo(() => {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
            Projects
          </h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto font-light leading-snug">
            Showcase applications, personal tools, and client projects.
          </p>
        </motion.div>

        {/* Grid - show all projects */}
        <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7">
          {(projectsData as Project[]).map((project, index) => (
            <motion.div
              key={project.id}
              className="w-full max-w-[25.5rem] sm:max-w-[26.5rem]"
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
