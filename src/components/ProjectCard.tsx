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

type ProjectAction = {
  key: string;
  href: string;
  label: string;
  icon: typeof ExternalLink;
  surfaceClassName: string;
  haloClassName: string;
  iconClassName: string;
};

const actionButtonClassName =
  "relative inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.025)_100%)] text-white/90 backdrop-blur-xl shadow-[0_16px_30px_-24px_rgba(0,0,0,1),inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-12px_20px_rgba(255,255,255,0.02)] transition-[transform,border-color,background,box-shadow] duration-300 ease-out will-change-transform hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.035)_100%)] hover:shadow-[0_20px_36px_-24px_rgba(0,0,0,1),0_8px_24px_-18px_rgba(16,185,129,0.25),inset_0_1px_0_rgba(255,255,255,0.1)] focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-0 active:scale-[0.97]";

export const ProjectCard: FC<ProjectCardProps> = memo(({ project }) => {
  const actions: ProjectAction[] = [
    project.liveUrl
      ? {
          key: "live",
          href: project.liveUrl,
          label: `Live demo of ${project.title}`,
          icon: ExternalLink,
          surfaceClassName:
            "bg-[radial-gradient(circle_at_28%_28%,rgba(110,231,183,0.2),transparent_42%),radial-gradient(circle_at_72%_78%,rgba(34,211,238,0.18),transparent_48%),linear-gradient(180deg,rgba(6,10,12,0.16)_0%,rgba(6,10,12,0.42)_100%)]",
          haloClassName: "bg-emerald-400/10 group-hover:bg-emerald-300/16",
          iconClassName: "text-emerald-50/95",
        }
      : null,
    project.githubUrl
      ? {
          key: "github",
          href: project.githubUrl,
          label: `Source code for ${project.title}`,
          icon: Github,
          surfaceClassName:
            "bg-[radial-gradient(circle_at_28%_28%,rgba(148,163,184,0.18),transparent_44%),radial-gradient(circle_at_72%_78%,rgba(59,130,246,0.14),transparent_46%),linear-gradient(180deg,rgba(8,10,16,0.16)_0%,rgba(8,10,16,0.44)_100%)]",
          haloClassName: "bg-sky-300/10 group-hover:bg-sky-200/14",
          iconClassName: "text-slate-50/95",
        }
      : null,
  ].filter((action): action is ProjectAction => action !== null);

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.03] transition-all duration-500 will-change-transform hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7),0_0_30px_-5px_rgba(186,230,253,0.08)]">
      {/* Image */}
      <div className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.16),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        <div className="relative flex h-[220px] items-center justify-center p-3.5 sm:h-[280px] sm:p-5">
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
        <div className="absolute right-4 top-4 flex items-center gap-2 sm:right-5 sm:top-5 sm:gap-2.5">
          {actions.map(({ key, href, label, icon: Icon, surfaceClassName, haloClassName, iconClassName }) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={actionButtonClassName}
              aria-label={label}
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-[1px] rounded-full border border-white/[0.04] opacity-95",
                  surfaceClassName
                )}
              />
              <span
                aria-hidden="true"
                className="absolute inset-x-[22%] top-[2px] h-[34%] rounded-full bg-white/[0.12] blur-[1.5px]"
              />
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-[18%] bottom-[3px] h-[30%] rounded-full blur-md transition-colors duration-300",
                  haloClassName
                )}
              />
              <Icon
                className={cn(
                  "relative z-10 h-[15px] w-[15px] drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-[1.03] sm:h-4 sm:w-4",
                  iconClassName
                )}
                strokeWidth={1.9}
              />
            </a>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-grow flex-col p-4 sm:p-6">
        <div className="mb-3.5">
          <span className={cn(
            "inline-flex rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-300",
            project.category === "Personal Products" && "border border-emerald-400/20 bg-emerald-500/10 text-emerald-200/90 hover:bg-emerald-500/15 hover:border-emerald-400/30",
            project.category === "Client Work" && "border border-blue-400/20 bg-blue-500/10 text-blue-200/90 hover:bg-blue-500/15 hover:border-blue-400/30",
            project.category === "Showcase Project" && "border border-purple-400/20 bg-purple-500/10 text-purple-200/90 hover:bg-purple-500/15 hover:border-purple-400/30"
          )}>
            {project.category}
          </span>
        </div>
        <h3 className="mb-2 text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-emerald-400 md:text-2xl leading-snug">
          {project.title}
        </h3>
        <p className="mb-5 flex-grow text-sm font-light leading-relaxed text-gray-400 md:text-base">
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
