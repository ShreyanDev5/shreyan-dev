
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
        border border-white/10
        transition-all duration-400 ease-out transform-gpu
        md:hover:shadow-lg md:hover:border-white/15
        shadow-md md:shadow-lg border-white/15
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
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover object-center transition-transform motion-safe:duration-500 transform-gpu
            ${isInView ? 'scale-[1.02] motion-reduce:transform-none' : ''}
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
        <h3 className={`text-[18px] sm:text-xl font-semibold sm:font-bold text-white mb-2 tracking-tight transition-colors duration-200
          ${isInView ? 'md:group-hover:text-slate-50/90' : 'text-white'}
        `}
        style={{ 
          textRendering: 'optimizeLegibility'
        }}>
          {project.title}
        </h3>
        
        <p className={`text-gray-300 text-[13.5px] sm:text-sm mb-4 leading-relaxed flex-grow transition-colors duration-200
          ${isInView ? 'md:group-hover:text-gray-200/90' : 'text-gray-400'}
        `}
        style={{ 
          textRendering: 'optimizeLegibility'
        }}>
          {project.description}
        </p>
        
        {/* Tags with enhanced styling */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag, index) => (
            <Badge 
              key={index} 
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 text-gray-300 text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-300"
            >
              {tag}
            </Badge>
          ))}
        </div>
        
        {/* Enhanced Action Buttons with premium design */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-0 mt-auto">
          <MagneticButton strength={0.25} className="flex-1">
            <Button 
              variant="secondary" 
              size="sm" 
              className={`w-full rounded-xl bg-gradient-to-r from-emerald-600/80 to-emerald-500/80 
                hover:from-emerald-600/90 hover:to-emerald-500/90 
                transition-all duration-300 ease-out transform-gpu
                border border-emerald-400/30 hover:border-emerald-300/50
                text-white hover:text-white
                text-sm font-medium
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50
                px-4 py-2.5
                shadow-sm hover:shadow-md
              `}
              onClick={() => window.open(project.liveUrl, '_blank')}
              style={{ 
                textRendering: 'optimizeLegibility'
              }}
              aria-label={`Open live demo for ${project.title}`}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </Button>
          </MagneticButton>
          
          <div className="hidden sm:block sm:min-w-8"></div>
          
          <MagneticButton strength={0.25} className="flex-1 sm:mt-0 mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              className={`w-full rounded-xl 
                bg-gradient-to-r from-white/5 to-white/0
                hover:from-blue-900/80 hover:to-purple-900/80
                border border-white/15 hover:border-purple-400/30
                transition-all duration-300 ease-out transform-gpu
                text-white hover:text-white
                text-sm font-medium
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/50
                px-4 py-2.5
                shadow-sm hover:shadow-md
              `}
              onClick={() => window.open(project.githubUrl, '_blank')}
              style={{ 
                textRendering: 'optimizeLegibility'
              }}
              aria-label={`Open source code for ${project.title} on GitHub`}
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
