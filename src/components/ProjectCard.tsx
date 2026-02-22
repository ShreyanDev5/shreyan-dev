import { memo, type FC } from "react";
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

export const ProjectCard: FC<ProjectCardProps> = memo(({ project }) => {
  return (
    <div className="group relative rounded-3xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-white/20 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7),0_0_30px_-5px_rgba(186,230,253,0.1)] transition-all duration-500 hover:-translate-y-2 h-full flex flex-col will-change-transform">
      {/* Image */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        {/* Removed dark overlay for crystal clear images as requested */}

        {/* Hover action icons */}
        <div className="absolute top-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/90 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 hover:scale-110"
              aria-label={`Live demo of ${project.title}`}
            >
              <ExternalLink size={16} strokeWidth={2} />
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/90 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 hover:scale-110"
            aria-label={`Source code for ${project.title}`}
          >
            <Github size={16} strokeWidth={2} />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-emerald-400 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 flex-grow font-light">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 md:py-1.5 text-xs md:text-sm font-medium tracking-wide rounded-full bg-white/[0.03] text-gray-300 border border-white/[0.08] hover:bg-white/[0.08] hover:border-emerald-500/20 transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});
