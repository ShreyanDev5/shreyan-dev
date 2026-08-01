import { memo, type FC } from "react";
import projectsData from "@/data/projects.json";
import { ProjectCard, type Project } from "./ProjectCard";
import { motion } from "framer-motion";

const getProjectDomId = (title: string) => {
  return `project-${title.toLowerCase().replace(/'s/g, "s").replace(/[^a-z0-9]+/g, "-")}`;
};

export const ProjectsSection: FC = memo(() => {
  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Projects
          </h2>
        </motion.div>

        {/* Grid - show all projects */}
        <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7">
          {(projectsData as Project[]).map((project, index) => (
            <motion.div
              key={project.id}
              id={getProjectDomId(project.title)}
              className="w-full max-w-[25.5rem] sm:max-w-[26.5rem] scroll-mt-24"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (index % 2) * 0.08 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});
