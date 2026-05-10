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
  iconClassName: string;
};

type ProjectCategoryTone = {
  pill: string;
  titleHover: string;
  cardHover: string;
};

const CATEGORY_TONES: Record<string, ProjectCategoryTone> = {
  "Personal Project": {
    pill: "border-emerald-400/20 bg-emerald-500/10 text-emerald-200/90 hover:bg-emerald-500/15 hover:border-emerald-400/30",
    titleHover: "group-hover:text-emerald-400",
    cardHover: "hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7),0_0_30px_-5px_rgba(16,185,129,0.08)]",
  },
  "Real-World Project": {
    pill: "border-blue-400/20 bg-blue-500/10 text-blue-200/90 hover:bg-blue-500/15 hover:border-blue-400/30",
    titleHover: "group-hover:text-sky-400",
    cardHover: "hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7),0_0_30px_-5px_rgba(56,189,248,0.08)]",
  },
  "Showcase Project": {
    pill: "border-amber-400/20 bg-amber-500/10 text-amber-200/90 hover:bg-amber-500/15 hover:border-amber-400/30",
    titleHover: "group-hover:text-amber-400",
    cardHover: "hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7),0_0_30px_-5px_rgba(245,158,11,0.08)]",
  },
};

const DEFAULT_TONE: ProjectCategoryTone = {
  pill: "border-white/10 bg-white/[0.03] text-gray-300 hover:border-white/15 hover:bg-white/[0.06]",
  titleHover: "group-hover:text-white",
  cardHover: "hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]",
};

const actionButtonClassName =
  "relative inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/[0.08] bg-white/[0.03] text-white/90 transition-all duration-300 hover:scale-105 hover:bg-white/[0.08] hover:border-white/[0.15] focus-visible:ring-2 focus-visible:ring-emerald-400/50 active:scale-95";

export const ProjectCard: FC<ProjectCardProps> = memo(({ project }) => {
  const tone = CATEGORY_TONES[project.category] ?? DEFAULT_TONE;
  const isStudent = project.id === "6" || project.title === "Student Management System";

  const actions: ProjectAction[] = [
    project.liveUrl
      ? {
        key: "live",
        href: project.liveUrl,
        label: `Open live demo for ${project.title}`,
        icon: ExternalLink,
        iconClassName: "text-emerald-50/95 group-hover:text-emerald-300",
      }
      : null,
    project.githubUrl
      ? {
        key: "github",
        href: project.githubUrl,
        label: `Open source code for ${project.title}`,
        icon: Github,
        iconClassName: "text-slate-50/95 group-hover:text-sky-300",
      }
      : null,
  ].filter((action): action is ProjectAction => action !== null);

  return (
    <div className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.03] transition-all duration-500 will-change-transform hover:-translate-y-2 hover:border-white/20 ${tone.cardHover}`}>
      {/* Image */}
      <div className="relative overflow-hidden border-b border-white/[0.06] bg-white/[0.01]">
        <div
          className={cn(
            "relative flex h-[220px] items-center justify-center p-3 sm:h-[280px] sm:p-4",
            !isStudent && "overflow-hidden"
          )}
        >
          <div
            className={cn(
              "flex h-full w-full items-center justify-center overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#0a0a0a] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]",
              isStudent ? "px-3 sm:px-4" : "px-0"
            )}
          >
            <img
              src={project.image}
              alt={project.title}
              className={cn(
                "transition-transform duration-500 ease-out group-hover:scale-[1.02]",
                isStudent
                  ? "max-h-[194px] max-w-full object-contain sm:max-h-[252px]"
                  : "h-full w-full object-cover object-center"
              )}
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-grow flex-col p-4 sm:p-6">
        <h3 className={`mb-2 text-xl font-bold tracking-tight text-white transition-colors duration-300 md:text-2xl leading-snug ${tone.titleHover}`}>
          {project.title}
        </h3>
        <p className="mb-5 flex-grow text-sm font-light leading-relaxed text-gray-400 md:text-base">
          {project.description}
        </p>
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between gap-3">
            <span className={cn(
              "inline-flex rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300",
              tone.pill
            )}>
              {project.category}
            </span>
            <div className="flex items-center gap-2">
              {actions.map(({ key, href, label, icon: Icon, iconClassName }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(actionButtonClassName, "group")}
                  aria-label={label}
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  <Icon
                    className={cn(
                      "relative z-10 h-[15px] w-[15px] drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)] transition-colors duration-200",
                      iconClassName
                    )}
                    strokeWidth={2}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
