import { memo, type FC } from "react";
import projectsData from "@/data/projects.json";
import { ProjectCard, type Project } from "./ProjectCard";
import { motion } from "framer-motion";

const getProjectDomId = (title: string) => {
  return `project-${title.toLowerCase().replace(/'s/g, "s").replace(/[^a-z0-9]+/g, "-")}`;
};

export const ProjectsSection: FC = memo(() => {
  return (
    <section className="pt-12 pb-20 sm:pt-20 sm:pb-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-9 sm:mb-11"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
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
