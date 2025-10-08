
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
  "Main Project": "bg-amber-500/90 text-white",
  "Side Project": "bg-purple-500/90 text-white",
  Active: "bg-amber-500/90 text-white",
  Beta: "bg-amber-500/90 text-white",
  Inactive: "bg-gray-600/90 text-white"
};

// Memoized Button Components
const LiveDemoButton = memo(({ url, title }: { url: string; title: string }) => (
  <MagneticButton strength={0.25} className="flex-1">
    <Button 
      variant="secondary" 
      size="sm" 
      className={`w-full sm:w-full rounded-xl bg-gradient-to-r from-emerald-700/80 to-emerald-800/80 
        hover:from-emerald-600/85 hover:to-emerald-700/85 
        transition-all duration-300 ease-out transform-gpu
        border border-emerald-500/30 hover:border-emerald-400/40
        text-white hover:text-white
        text-xs sm:text-sm font-medium
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900
        px-3 py-3 sm:px-4 sm:py-3
        shadow-sm hover:shadow-md
      `}
      onClick={() => window.open(url, '_blank')}
      style={{ 
        textRendering: 'optimizeLegibility'
      }}
      aria-label={`Open live demo for ${title}`}
    >
      <ExternalLink className="mr-1 h-3.5 w-3.5 sm:h-4 sm:w-4" />
      <span className="text-xs sm:text-sm">Live Demo</span>
    </Button>
  </MagneticButton>
));

const CodeButton = memo(({ url, title }: { url: string; title: string }) => (
  <MagneticButton strength={0.25} className="flex-1 sm:mt-0 mt-1">
    <Button 
      variant="outline" 
      size="sm" 
      className={`w-full sm:w-full rounded-xl 
        bg-gradient-to-r from-gray-800/40 to-gray-900/40
        hover:from-blue-900/90 hover:to-purple-900/90
        border border-white/15 hover:border-purple-500/50
        transition-all duration-300 ease-out transform-gpu
        text-white hover:text-white
        text-xs sm:text-sm font-medium
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900
        px-3 py-3 sm:px-4 sm:py-3
        shadow-sm hover:shadow-md
      `}
      onClick={() => window.open(url, '_blank')}
      style={{ 
        textRendering: 'optimizeLegibility'
      }}
      aria-label={`Open source code for ${title} on GitHub`}
    >
      <Github className="mr-1 h-3.5 w-3.5 sm:h-4 sm:w-4" />
      <span className="text-xs sm:text-sm">Code</span>
    </Button>
  </MagneticButton>
));

// Memoized Tag Component
const TagBadge = memo(({ tag }: { tag: string }) => (
  <Badge 
    className={`${
      tag === 'Client Project' 
        ? 'bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-200' 
        : 'bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-200'
    } backdrop-blur-sm text-[10px] sm:text-xs font-medium px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full transition-all duration-300 shadow-sm`}
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

  // State for mobile touch effect
  const [isTouched, setIsTouched] = React.useState(false);

  return (
    <div
        ref={elementRef}
        className={`
          group relative rounded-2xl bg-gradient-to-tr from-gray-900/30 to-gray-900/10 
          border border-white/15
          transition-all duration-500 ease-out transform-gpu
          shadow-[0_4px_20px_-5px_rgba(0,0,0,0.3)] 
          hover:shadow-[0_8px_30px_-5px_rgba(255,215,0,0.25),0_0_0_1px_rgba(255,215,0,0.2)]
          hover:border-[#FFD700]/50
          ${isTouched ? 'shadow-[0_8px_30px_-5px_rgba(255,215,0,0.25),0_0_0_1px_rgba(255,215,0,0.2)] border-[#FFD700]/50 scale-[1.01]' : ''}
          h-full flex flex-col
          mx-auto w-full
          px-2 sm:px-0
          overflow-hidden
        `}
        style={{ minHeight: 'auto' }}
        // Touch handlers for mobile devices to implement hover effect
        onTouchStart={() => {
          if (isMobile) setIsTouched(true);
        }}
        onTouchEnd={() => {
          if (isMobile) setIsTouched(false);
        }}
        onTouchCancel={() => {
          if (isMobile) setIsTouched(false);
        }}
        // Mouse handlers for desktop devices
        onMouseEnter={() => {
          if (!isMobile) setIsTouched(true);
        }}
        onMouseLeave={() => {
          if (!isMobile) setIsTouched(false);
        }}
      >
      {/* Image Section with enhanced styling and increased height on mobile */}
      <div className="relative w-full h-48 sm:h-56 bg-gradient-to-br from-gray-800/20 to-black/40 overflow-hidden rounded-t-2xl rounded-b-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 via-transparent to-black/80"></div>
        <img
          src={project.image}
          alt={project.title}
          loading={isMobile ? "eager" : "lazy"}
          decoding="async"
          className={`w-full h-full object-cover ${project.image.includes('StudentManagementSystem') ? 'object-top' : 'object-center'} transition-all duration-500 transform-gpu
            ${isMobile ? 'scale-105' : (isInView ? 'group-hover:scale-105 group-hover:brightness-105' : 'scale-100')}
          `}
          style={{ willChange: 'transform' }}
        />
        
        {/* Status/Featured badges with premium styling */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge className={`${statusStyles[project.status] ?? ""} backdrop-blur-sm border-none shadow-lg rounded-full text-[10px] sm:text-xs font-medium px-2 py-0.5 sm:px-3 sm:py-1 transition-all duration-300`}>
            {project.status}
          </Badge>
          {project.isFeatured && (
            <Badge className={`bg-gradient-to-r from-[#FFD700] to-amber-600 text-white border-none shadow-lg rounded-full text-[10px] sm:text-xs font-medium px-2 py-0.5 sm:px-3 sm:py-1 flex items-center transition-all duration-300`}>
              <Star className="w-2.5 h-2.5 mr-0.5 sm:w-3 sm:h-3 sm:mr-1" />
              Featured
            </Badge>
          )}
        </div>
      </div>
      
      {/* Info Section with enhanced design */}
      <div className={`px-5 sm:px-5 py-3 sm:py-4 flex flex-col flex-grow transition-all duration-500 bg-gradient-to-b from-transparent to-white/2`}>
        <h3 className={`px-1 sm:px-0 text-lg sm:text-xl font-semibold sm:font-bold text-white mb-3 tracking-tight transition-all duration-300
          ${isTouched ? 'text-[#FFD700] scale-105' : (isInView ? 'md:group-hover:text-[#FFD700]' : 'text-white')}
        `}
        style={{ 
          textRendering: 'optimizeLegibility'
        }}>
          {project.title}
        </h3>
        
        <p className={`px-1 sm:px-0 text-gray-300/90 text-sm sm:text-sm mb-4 leading-relaxed flex-grow transition-colors duration-300
          ${isTouched ? 'text-gray-200' : (isInView ? 'md:group-hover:text-gray-200' : 'text-gray-300')}
        `}
        style={{ 
          textRendering: 'optimizeLegibility'
        }}>
          {project.description}
        </p>
        
        {/* Tags with enhanced styling */}
        <div className="flex flex-wrap gap-2 mb-4 px-1 sm:px-0">
          {project.tags.map((tag, index) => (
            <TagBadge key={index} tag={tag} />
          ))}
        </div>
        
        {/* Enhanced Action Buttons with premium design */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-auto pt-1 px-1 sm:px-0">
          <LiveDemoButton url={project.liveUrl} title={project.title} />
          
          <div className="hidden sm:block sm:min-w-2"></div>
          
          <CodeButton url={project.githubUrl} title={project.title} />
        </div>
      </div>
    </div>
  );
});
