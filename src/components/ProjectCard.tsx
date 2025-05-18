import React from "react";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        group relative rounded-xl bg-gradient-to-tr from-background to-blue-950/60 
        shadow-md overflow-hidden border border-white/10
        transition-all duration-300 ease-in-out
        hover:shadow-[0_8px_48px_0_rgba(30,180,255,0.18)]
        hover:scale-[1.018]
        hover:border-white/20
      `}
      style={{ minHeight: 340 }}
    >
      {/* Image Section */}
      <div className="relative w-full h-44 bg-black/40 overflow-hidden rounded-t-xl">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        {/* Status/Featured badge */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className={`${statusStyles[project.status] ?? ""} glass-morphism border-none shadow-md rounded-lg`}>
            {project.status}
          </Badge>
          {project.isFeatured && (
            <Badge className="bg-gradient-to-tr from-[#13b9fd]/80 to-blue-500/70 text-white border-none shadow pulse rounded-lg">
              Featured
            </Badge>
          )}
        </div>
      </div>
      
      {/* Info Section */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-white mb-2 tracking-tight">
          {project.title}
        </h3>
        <p className="mt-1 text-gray-300 text-sm mb-4 leading-relaxed">{project.description}</p>
        
        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <Button 
            variant="secondary" 
            size="sm" 
            className="flex-1 rounded-lg bg-gradient-to-r from-green-500/40 to-emerald-400/40 
              hover:from-green-500/60 hover:to-emerald-400/60 
              hover:shadow-[0_0_16px_rgba(34,197,94,0.4)] 
              transition-all duration-300 ease-in-out
              border border-green-400/40 hover:border-green-400/60
              text-white hover:text-white/90"
            onClick={() => window.open(project.liveUrl, '_blank')}
          >
            <ExternalLink className="mr-1.5 h-4 w-4" />
            Live Demo
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 rounded-lg 
              bg-gradient-to-r from-gray-800/20 to-gray-700/20
              hover:from-gray-800/40 hover:to-gray-700/40
              border border-white/20 hover:border-white/40
              hover:shadow-[0_0_12px_rgba(255,255,255,0.15)]
              transition-all duration-300 ease-in-out
              text-white hover:text-white/90"
            onClick={() => window.open(project.githubUrl, '_blank')}
          >
            <Github className="mr-1.5 h-4 w-4" />
            GitHub
          </Button>
        </div>
      </div>
    </div>
  );
};
