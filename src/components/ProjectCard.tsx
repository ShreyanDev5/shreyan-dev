import { memo, type FC } from "react";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  imageVariant?: "landscape" | "portrait";
};

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: FC<ProjectCardProps> = memo(({ project }) => {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.03] transition-all duration-500 will-change-transform hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7),0_0_30px_-5px_rgba(186,230,253,0.08)]">
      {/* Image */}
      <div className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.16),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        <div className="relative flex h-[240px] items-center justify-center p-4 sm:h-[280px] sm:p-5">
          <div
            className={cn(
              "flex h-full w-full items-center justify-center rounded-[22px] border border-white/10 bg-[#050505]/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
              project.imageVariant === "portrait" ? "px-7 sm:px-10" : "px-3 sm:px-4"
            )}
          >
            <img
              src={project.image}
              alt={project.title}
              className={cn(
                "max-h-full max-w-full object-contain drop-shadow-[0_18px_32px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-out group-hover:scale-[1.02]",
                project.imageVariant === "portrait" ? "h-full w-auto" : "h-full w-full"
              )}
              loading="lazy"
            />
          </div>
        </div>

        {/* Hover action icons */}
        <div className="absolute right-4 top-4 flex gap-3">
          {project.liveUrl && (
            <div className="md:pointer-events-none md:translate-y-1.5 md:opacity-0 md:transition-[opacity,transform] md:duration-300 md:ease-out md:transform-gpu md:will-change-[transform,opacity] md:group-hover:pointer-events-auto md:group-hover:translate-y-0 md:group-hover:opacity-100">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-[linear-gradient(160deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.04)_38%),linear-gradient(180deg,rgba(9,9,12,0.76)_0%,rgba(5,5,8,0.58)_100%)] text-white/95 backdrop-blur-sm shadow-[0_14px_30px_-18px_rgba(0,0,0,1),inset_0_1px_0_rgba(255,255,255,0.24)] transition-[transform,border-color,background] duration-200 ease-out transform-gpu hover:scale-105 hover:border-white/35 hover:bg-[linear-gradient(160deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.05)_40%),linear-gradient(180deg,rgba(10,10,14,0.84)_0%,rgba(6,6,9,0.68)_100%)]"
                aria-label={`Live demo of ${project.title}`}
              >
                <ExternalLink className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>
          )}
          {project.githubUrl && (
            <div className="md:pointer-events-none md:translate-y-1.5 md:opacity-0 md:transition-[opacity,transform] md:duration-300 md:ease-out md:transform-gpu md:will-change-[transform,opacity] md:delay-75 md:group-hover:pointer-events-auto md:group-hover:translate-y-0 md:group-hover:opacity-100">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-[linear-gradient(160deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.04)_38%),linear-gradient(180deg,rgba(9,9,12,0.76)_0%,rgba(5,5,8,0.58)_100%)] text-white/95 backdrop-blur-sm shadow-[0_14px_30px_-18px_rgba(0,0,0,1),inset_0_1px_0_rgba(255,255,255,0.24)] transition-[transform,border-color,background] duration-200 ease-out transform-gpu hover:scale-105 hover:border-white/35 hover:bg-[linear-gradient(160deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.05)_40%),linear-gradient(180deg,rgba(10,10,14,0.84)_0%,rgba(6,6,9,0.68)_100%)]"
                aria-label={`Source code for ${project.title}`}
              >
                <Github className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-grow flex-col p-5 sm:p-6">
        <div className="mb-4">
          <span className={cn(
            "inline-flex rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-300",
            project.category === "Personal Products" && "border border-emerald-400/20 bg-emerald-500/10 text-emerald-200/90 hover:bg-emerald-500/15 hover:border-emerald-400/30",
            project.category === "Client Work" && "border border-blue-400/20 bg-blue-500/10 text-blue-200/90 hover:bg-blue-500/15 hover:border-blue-400/30",
            project.category === "Showcase Project" && "border border-purple-400/20 bg-purple-500/10 text-purple-200/90 hover:bg-purple-500/15 hover:border-purple-400/30"
          )}>
            {project.category}
          </span>
        </div>
        <h3 className="mb-2 text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-emerald-400 md:text-2xl">
          {project.title}
        </h3>
        <p className="mb-6 flex-grow text-sm font-light leading-relaxed text-gray-400 md:text-base">
          {project.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs font-medium tracking-wide text-gray-300 transition-colors duration-300 hover:border-emerald-500/20 hover:bg-white/[0.08] md:py-1.5 md:text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});
