
import React from "react";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIntersectionHover } from "@/hooks/useIntersectionHover";
import MagneticButton from "@/components/MagneticButton";

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
  Active: "bg-emerald-500/90 text-white",
  Beta: "bg-amber-500/90 text-white",
  Inactive: "bg-gray-600/90 text-white"
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { elementRef, isInView } = useIntersectionHover({
    threshold: 0.4,
    rootMargin: '-10% 0px'
  });

  return (
    <div
      ref={elementRef}
      className={`
        group relative rounded-2xl bg-gradient-to-tr from-white/5 to-white/0 
        overflow-hidden border border-white/10
        transition-all duration-500 ease-out transform-gpu
        ${isInView ? 'hover:shadow-2xl hover:scale-[1.02] hover:border-white/20' : ''}
        ${isInView ? 'shadow-xl scale-[1.01] border-white/15' : ''}
        h-full flex flex-col
      `}
      style={{ minHeight: 'auto' }}
    >
      {/* Image Section with enhanced styling */}
      <div className="relative w-full h-48 bg-black/20 overflow-hidden rounded-t-2xl">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover object-center transition-transform duration-700 transform-gpu
            ${isInView ? 'group-hover:scale-110' : ''}
            ${isInView ? 'scale-105' : ''}
          `}
          style={{ willChange: 'transform' }}
        />
        
        {/* Status/Featured badges with premium styling */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge className={`${statusStyles[project.status] ?? ""} backdrop-blur-sm border-none shadow-lg rounded-full text-xs font-medium px-3 py-1`}>
            {project.status}
          </Badge>
          {project.isFeatured && (
            <Badge className={`bg-gradient-to-r from-amber-400 to-amber-600 text-white border-none shadow-lg rounded-full text-xs font-medium px-3 py-1 flex items-center`}>
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>
      </div>
      
      {/* Info Section with enhanced design */}
      <div className={`p-5 flex flex-col flex-grow transition-all duration-500`}>
        <h3 className={`text-xl font-bold text-white mb-2 tracking-tight transition-all duration-300
          ${isInView ? 'group-hover:text-emerald-100' : 'text-white'}
        `}
        style={{ 
          textRendering: 'optimizeLegibility',
          backfaceVisibility: 'hidden'
        }}>
          {project.title}
        </h3>
        
        <p className={`text-gray-300 text-sm mb-4 leading-relaxed flex-grow transition-all duration-300
          ${isInView ? 'group-hover:text-gray-200' : 'text-gray-400'}
        `}
        style={{ 
          textRendering: 'optimizeLegibility',
          backfaceVisibility: 'hidden'
        }}>
          {project.description}
        </p>
        
        {/* Tags with enhanced styling */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag, index) => (
            <Badge 
              key={index} 
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-300"
            >
              {tag}
            </Badge>
          ))}
        </div>
        
        {/* Enhanced Action Buttons with premium design */}
        <div className="flex gap-3 mt-auto">
          <MagneticButton strength={0.3}>
            <Button 
              variant="secondary" 
              size="sm" 
              className={`flex-1 rounded-xl bg-gradient-to-r from-emerald-600/80 to-emerald-500/80 
                hover:from-emerald-500 hover:to-emerald-400 
                hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] 
                transition-all duration-300 ease-out transform-gpu
                border border-emerald-400/30 hover:border-emerald-300
                text-white hover:text-white
                text-sm py-2.5 font-medium
                ${isInView ? 'shadow-[0_0_12px_rgba(16,185,129,0.2)]' : ''}
              `}
              onClick={() => window.open(project.liveUrl, '_blank')}
              style={{ 
                textRendering: 'optimizeLegibility',
                backfaceVisibility: 'hidden'
              }}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </Button>
          </MagneticButton>
          
          <MagneticButton strength={0.3}>
            <Button 
              variant="outline" 
              size="sm" 
              className={`flex-1 rounded-xl 
                bg-gradient-to-r from-white/10 to-white/5
                hover:from-white/20 hover:to-white/10
                border border-white/20 hover:border-white/30
                hover:shadow-[0_0_16px_rgba(255,255,255,0.2)]
                transition-all duration-300 ease-out transform-gpu
                text-white hover:text-white
                text-sm py-2.5 font-medium
                ${isInView ? 'shadow-[0_0_8px_rgba(255,255,255,0.15)]' : ''}
              `}
              onClick={() => window.open(project.githubUrl, '_blank')}
              style={{ 
                textRendering: 'optimizeLegibility',
                backfaceVisibility: 'hidden'
              }}
            >
              <Github className="mr-2 h-4 w-4" />
              Code
            </Button>
          </MagneticButton>
        </div>
      </div>
    </div>
  );
};
