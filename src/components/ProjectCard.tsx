
import React, { memo } from "react";
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

// Memoized Button Components
const LiveDemoButton = memo(({ url, title }: { url: string; title: string }) => (
  <MagneticButton strength={0.25} className="flex-1">
    <Button 
      variant="secondary" 
      size="sm" 
      className={`w-full rounded-xl bg-gradient-to-r from-emerald-700/80 to-emerald-800/80 
        hover:from-emerald-600/85 hover:to-emerald-700/85 
        transition-all duration-300 ease-out transform-gpu
        border border-emerald-500/30 hover:border-emerald-400/40
        text-white hover:text-white
        text-xs sm:text-sm font-medium
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50
        px-2.5 py-2.5 sm:px-4 sm:py-2.5
        shadow-sm hover:shadow-md
        h-9 sm:h-auto
      `}
      onClick={() => window.open(url, '_blank')}
      style={{ 
        textRendering: 'optimizeLegibility'
      }}
      aria-label={`Open live demo for ${title}`}
    >
      <ExternalLink className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
      <span className="text-xs sm:text-sm">Live Demo</span>
    </Button>
  </MagneticButton>
));

const CodeButton = memo(({ url, title }: { url: string; title: string }) => (
  <MagneticButton strength={0.25} className="flex-1 sm:mt-0 mt-4">
    <Button 
      variant="outline" 
      size="sm" 
      className={`w-full rounded-xl 
        bg-gradient-to-r from-gray-800/40 to-gray-900/40
        hover:from-blue-900/90 hover:to-purple-900/90
        border border-white/15 hover:border-purple-500/50
        transition-all duration-300 ease-out transform-gpu
        text-white hover:text-white
        text-xs sm:text-sm font-medium
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/50
        px-2.5 py-2.5 sm:px-4 sm:py-2.5
        shadow-sm hover:shadow-md
        h-9 sm:h-auto
      `}
      onClick={() => window.open(url, '_blank')}
      style={{ 
        textRendering: 'optimizeLegibility'
      }}
      aria-label={`Open source code for ${title} on GitHub`}
    >
      <Github className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
      <span className="text-xs sm:text-sm">Code</span>
    </Button>
  </MagneticButton>
));

// Memoized Tag Component
const TagBadge = memo(({ tag }: { tag: string }) => (
  <Badge 
    className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 text-gray-300 text-[10px] sm:text-xs font-medium px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full transition-all duration-300"
  >
    {tag}
  </Badge>
));

export const ProjectCard: React.FC<ProjectCardProps> = memo(({ project }) => {
  // Simplify intersection observer for mobile performance
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const { elementRef, isInView } = isMobile 
    ? { elementRef: React.useRef(null), isInView: true } 
    : useIntersectionHover({
        threshold: 0.4,
        rootMargin: '-10% 0px'
      });

  return (
    <div
      ref={elementRef}
      className={`
        group relative rounded-2xl bg-gradient-to-tr from-gray-900/30 to-gray-900/10 
        border border-white/10
        transition-all duration-400 ease-out transform-gpu
        md:hover:shadow-lg md:hover:border-white/15
        shadow-md md:shadow-lg border-white/15
        h-full flex flex-col
        mx-auto w-full
        sm:mx-0
      `}
      style={{ minHeight: 'auto' }}
    >
      {/* Image Section with enhanced styling and increased height on mobile */}
      <div className="relative w-full h-36 sm:h-48 bg-black/40 overflow-hidden rounded-t-2xl">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover object-center transition-transform ${isMobile ? 'duration-200' : 'motion-safe:duration-500'} transform-gpu
            ${isMobile ? '' : (isInView ? 'scale-[1.02] motion-reduce:transform-none' : '')}
          `}
          style={{ willChange: 'transform' }}
        />
        
        {/* Status/Featured badges with premium styling */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge className={`${statusStyles[project.status] ?? ""} backdrop-blur-sm border-none shadow-lg rounded-full text-[10px] sm:text-xs font-medium px-2 py-0.5 sm:px-3 sm:py-1`}>
            {project.status}
          </Badge>
          {project.isFeatured && (
            <Badge className={`bg-gradient-to-r from-amber-400 to-amber-600 text-white border-none shadow-lg rounded-full text-[10px] sm:text-xs font-medium px-2 py-0.5 sm:px-3 sm:py-1 flex items-center`}>
              <Star className="w-2.5 h-2.5 mr-0.5 sm:w-3 sm:h-3 sm:mr-1" />
              Featured
            </Badge>
          )}
        </div>
      </div>
      
      {/* Info Section with enhanced design */}
      <div className={`px-3 py-3.5 sm:p-5 flex flex-col flex-grow transition-all duration-500`}>
        <h3 className={`text-lg sm:text-xl font-semibold sm:font-bold text-white mb-2 tracking-tight transition-colors duration-200
          ${isMobile ? 'text-white' : (isInView ? 'md:group-hover:text-slate-50/90' : 'text-white')}
        `}
        style={{ 
          textRendering: 'optimizeLegibility'
        }}>
          {project.title}
        </h3>
        
        <p className={`text-gray-300 text-sm sm:text-sm mb-4 leading-relaxed flex-grow transition-colors duration-200
          ${isMobile ? 'text-gray-400' : (isInView ? 'md:group-hover:text-gray-200/90' : 'text-gray-400')}
        `}
        style={{ 
          textRendering: 'optimizeLegibility'
        }}>
          {project.description}
        </p>
        
        {/* Tags with enhanced styling */}
        <div className="flex flex-wrap gap-1.5 mb-3.5">
          {project.tags.map((tag, index) => (
            <TagBadge key={index} tag={tag} />
          ))}
        </div>
        
        {/* Enhanced Action Buttons with premium design */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-0 mt-auto">
          <LiveDemoButton url={project.liveUrl} title={project.title} />
          
          <div className="hidden sm:block sm:min-w-8"></div>
          
          <CodeButton url={project.githubUrl} title={project.title} />
        </div>
      </div>
    </div>
  );
});
