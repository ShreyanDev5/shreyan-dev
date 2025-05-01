
import React from "react";
import projectsData from "@/data/projects.json";
import { ProjectCard } from "./ProjectCard";

export const ProjectsSection: React.FC = () => {
  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-1">Projects</h2>
        <p className="text-gray-400 text-lg">Showcase your real estate projects, share updates in real time, and collaborate across teams with ease.</p>
      </div>
      <div className="pb-6">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {projectsData.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};
