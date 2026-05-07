import { memo, type FC } from "react";
import projectsData from "@/data/projects.json";
import { ProjectCard } from "./ProjectCard";
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            Projects
          </h2>
          <div className="w-12 h-[2.5px] bg-emerald-500 rounded-full mx-auto mb-6" />
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            A collection of personal projects solving real problems, showcases demonstrating backend fundamentals with integrated frontends completely built with AI tools, and one live, real-world web project.
          </p>
        </motion.div>

        {/* Grid - show all projects */}
        <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              className="w-full max-w-[26rem] sm:max-w-[27rem]"
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
