import React, { memo } from "react";
import { ExternalLink, Github } from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  isFeatured: boolean;
  status: string;
  tags: string[];
  liveUrl: string | null;
  githubUrl: string;
};

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = memo(({ project }) => {
  return (
    <div className="group relative rounded-2xl overflow-hidden bg-[#111] border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] h-full flex flex-col">
      {/* Image */}
      <div className="relative w-full aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-60" />

        {/* Hover action icons */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white hover:bg-emerald-500/20 hover:border-emerald-500/30 transition-colors"
              aria-label={`Live demo of ${project.title}`}
            >
              <ExternalLink size={14} />
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-colors"
            aria-label={`Source code for ${project.title}`}
          >
            <Github size={14} />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-white/5 text-gray-400 border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});
