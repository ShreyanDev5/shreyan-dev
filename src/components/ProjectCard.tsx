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
  "relative inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)] text-white/90 transition-transform duration-300 ease-out will-change-transform hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.09)_0%,rgba(255,255,255,0.03)_100%)] focus-visible:ring-2 focus-visible:ring-emerald-400/50 active:scale-[0.985]";

export const ProjectCard: FC<ProjectCardProps> = memo(({ project }) => {
  const tone = CATEGORY_TONES[project.category] ?? DEFAULT_TONE;

  const actions: ProjectAction[] = [
    project.liveUrl
      ? {
          key: "live",
          href: project.liveUrl,
          label: `Open live demo for ${project.title}`,
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
          label: `Open source code for ${project.title}`,
          icon: Github,
          surfaceClassName:
            "bg-[radial-gradient(circle_at_28%_28%,rgba(148,163,184,0.18),transparent_44%),radial-gradient(circle_at_72%_78%,rgba(59,130,246,0.14),transparent_46%),linear-gradient(180deg,rgba(8,10,16,0.16)_0%,rgba(8,10,16,0.44)_100%)]",
          haloClassName: "bg-sky-300/10 group-hover:bg-sky-200/14",
          iconClassName: "text-slate-50/95",
        }
      : null,
  ].filter((action): action is ProjectAction => action !== null);

  return (
    <div className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.03] transition-all duration-500 will-change-transform hover:-translate-y-2 hover:border-white/20 ${tone.cardHover}`}>
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
                "h-full w-auto"
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
              {actions.map(({ key, href, label, icon: Icon, surfaceClassName, haloClassName, iconClassName }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(actionButtonClassName, "group")}
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
                    className="absolute inset-x-[22%] top-[2px] h-[32%] rounded-full bg-white/[0.12] blur-[1px]"
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-[18%] bottom-[3px] h-[28%] rounded-full blur-sm transition-colors duration-200",
                      haloClassName
                    )}
                  />
                  <Icon
                    className={cn(
                      "relative z-10 h-[14px] w-[14px] drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)] transition-transform duration-200 group-hover:scale-[1.03]",
                      iconClassName
                    )}
                    strokeWidth={1.9}
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
