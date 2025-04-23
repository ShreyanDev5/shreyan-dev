
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Play } from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  isFeatured: boolean;
  status: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
};

interface ProjectCardProps {
  project: Project;
}

const statusStyles: Record<string, string> = {
  Active: "bg-blue-600/80 text-white",
  Beta: "bg-yellow-500/70 text-black",
  Inactive: "bg-gray-600/80 text-white"
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div
      className={`
        group relative rounded-xl bg-gradient-to-tr from-background to-blue-950/60 shadow-md overflow-hidden border border-white/10
        transition-shadow duration-300 hover:shadow-[0_8px_48px_0_rgba(30,180,255,0.18)]
        hover:scale-[1.018]
      `}
      style={{ minHeight: 340 }}
    >
      {/* Image Section */}
      <div className="relative w-full h-44 bg-black/40 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        {/* Glow Action Buttons */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-blue-900/70 via-transparent to-transparent">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-white/10 border border-blue-400/20 p-3 shadow
              hover:bg-blue-700/70 hover:border-blue-400 hover:shadow-[0_0_12px_3px_rgba(51,195,240,0.40)]
              transition-all duration-300"
            aria-label="Live Demo"
            tabIndex={0}
          >
            <Play className="text-blue-300" size={22} />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-white/10 border border-blue-400/20 p-3 shadow
              hover:bg-blue-800/80 hover:border-blue-500 hover:shadow-[0_0_12px_3px_rgba(30,174,219,0.48)]
              transition-all duration-300"
            aria-label="GitHub"
            tabIndex={0}
          >
            <Github className="text-blue-100" size={22} />
          </a>
        </div>
        {/* Status/Featured badge */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className={`${statusStyles[project.status] ?? ""} glass-morphism border-none shadow-md`}>{project.status}</Badge>
          {project.isFeatured && (
            <Badge className="bg-gradient-to-tr from-[#13b9fd]/80 to-blue-500/70 text-white border-none shadow pulse">Featured</Badge>
          )}
        </div>
      </div>
      {/* Info Section */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          {project.title}
        </h3>
        <p className="mt-1 text-gray-300 text-base mb-2">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {project.tags.map((tag) => (
            <Badge key={tag} className="bg-blue-900/80 text-blue-100 border-none px-2 py-0.5 text-xs">{tag}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
