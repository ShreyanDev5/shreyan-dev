import { memo, type FC, useState } from "react";
import { ArrowUpRight, Github, Info, X, Copy, Check, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

export type Project = {
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
  icon: typeof ArrowUpRight;
  iconClassName: string;
};

type ProjectCategoryTone = {
  pill: string;
  titleHover: string;
  cardHover: string;
  actionButton: string;
};

const UNIFIED_PROJECT_TONE: ProjectCategoryTone = {
  pill: "border border-white/10 bg-white/[0.025] text-gray-400 font-medium",
  titleHover: "group-hover:text-white",
  cardHover: "hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.035] hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.6)] transition-all duration-300",
  actionButton: "border-white/15 bg-transparent text-white hover:bg-white hover:text-black hover:border-white transition-all duration-200",
};

const CATEGORY_TONES: Record<string, ProjectCategoryTone> = {
  "Personal Project": UNIFIED_PROJECT_TONE,
  "Real-World Project": UNIFIED_PROJECT_TONE,
  "Showcase Project": UNIFIED_PROJECT_TONE,
};

const DEFAULT_TONE: ProjectCategoryTone = UNIFIED_PROJECT_TONE;

const CATEGORY_LABELS: Record<string, string> = {
  "Personal Project": "Personal",
  "Real-World Project": "Client",
  "Showcase Project": "Showcase",
};

const actionButtonClassName =
  "relative inline-flex h-6 w-6 sm:h-6.5 sm:w-6.5 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.025] transition-all duration-200 active:scale-95";

export const ProjectCard: FC<ProjectCardProps> = memo(({ project }) => {
  const tone = CATEGORY_TONES[project.category] ?? DEFAULT_TONE;
  const isStudent = project.id === "6" || project.title === "Student Management System";
  const metadataLabel = CATEGORY_LABELS[project.category] ?? project.category;

  const [showInfo, setShowInfo] = useState(false);
  const [copiedType, setCopiedType] = useState<"username" | "password" | null>(null);

  const handleCopy = (text: string, type: "username" | "password") => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2000);
  };

  const actions: ProjectAction[] = [
    project.liveUrl
      ? {
        key: "live",
        href: project.liveUrl,
        label: `Open live demo for ${project.title}`,
        icon: ArrowUpRight,
        iconClassName: "transition-colors duration-200",
      }
      : null,
    project.githubUrl
      ? {
        key: "github",
        href: project.githubUrl,
        label: `Open source code for ${project.title}`,
        icon: Github,
        iconClassName: "transition-colors duration-200",
      }
      : null,
  ].filter((action): action is ProjectAction => action !== null);

  return (
    <div
      id={`project-${project.title.toLowerCase().replace(/'s/g, "s").replace(/[^a-z0-9]+/g, "-")}`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] ${tone.cardHover}`}
    >
      {/* Glassmorphic Info Overlay */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-0 z-30 flex flex-col justify-between bg-[#121316] border border-white/10 p-4 sm:p-5 text-white info-overlay rounded-2xl"
            onMouseLeave={() => setShowInfo(false)}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Compact mobile-only close button */}
            <button
              type="button"
              onClick={() => setShowInfo(false)}
              className="sm:hidden absolute top-2.5 right-2.5 z-40 flex h-5 w-5 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/60 hover:text-white transition-colors"
              aria-label="Close information"
            >
              <X size={11} />
            </button>

            <div className="flex-1 flex flex-col justify-center space-y-2.5 text-xs">
              <p className="text-xs sm:text-[13px] text-neutral-400 leading-relaxed font-normal normal-case">
                Password resets are disabled in this sandbox environment, but all features work normally. Log in with the demo credentials below or register a free account.
              </p>

              <div className="rounded-xl border border-white/10 bg-black/40 p-2.5 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-neutral-400">User: <span className="text-white font-normal select-all">demo</span></span>
                  <button
                    type="button"
                    onClick={() => handleCopy("demo", "username")}
                    className="flex h-5 w-5 items-center justify-center rounded border border-white/10 bg-white/[0.03] text-neutral-300 hover:text-white transition-all"
                    aria-label="Copy username"
                  >
                    {copiedType === "username" ? <Check size={11} className="text-white" /> : <Copy size={11} />}
                  </button>
                </div>
                <div className="flex items-center justify-between border-t border-white/[0.06] pt-1.5 text-[11px] font-mono">
                  <span className="text-neutral-400">Pass: <span className="text-white font-normal select-all">TestPassword123</span></span>
                  <button
                    type="button"
                    onClick={() => handleCopy("TestPassword123", "password")}
                    className="flex h-5 w-5 items-center justify-center rounded border border-white/10 bg-white/[0.03] text-neutral-300 hover:text-white transition-all"
                    aria-label="Copy password"
                  >
                    {copiedType === "password" ? <Check size={11} className="text-white" /> : <Copy size={11} />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Wrapper */}
      <div className="relative w-full aspect-[16/10] overflow-hidden border-b border-white/[0.06] bg-black/40">
        <img
          src={project.image}
          alt={project.title}
          className={cn(
            "w-full h-full transition-transform duration-300 ease-out group-hover:scale-[1.015]",
            isStudent ? "object-contain p-2.5 sm:p-3 bg-[#0c0d11]" : "object-cover object-top"
          )}
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-3.5 sm:p-4.5 pb-4 sm:pb-4.5">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <h3 className={`text-[16px] sm:text-[17.5px] font-bold tracking-tight text-white/90 transition-colors duration-200 leading-snug ${tone.titleHover}`}>
            {project.title}
          </h3>
          {project.title.toLowerCase() === "wrkout" && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowInfo(!showInfo);
              }}
              onMouseEnter={() => setShowInfo(true)}
              className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center text-white/50 transition-colors duration-200 hover:text-white active:scale-95 focus-visible:outline-none z-10"
              aria-label="View security and login info"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <Info size={15} />
            </button>
          )}
        </div>
        <p className="mb-3 flex-grow text-[12px] sm:text-[13px] font-light leading-[1.4] text-gray-400/90">
          {project.description}
        </p>
        <div className="mt-auto pt-1">
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={cn(
                "inline-flex rounded-full px-2 py-0.5 text-[10px] sm:text-[10.5px] font-medium uppercase tracking-wider opacity-90 transition-all duration-200",
                tone.pill
              )}>
                {metadataLabel}
              </span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {actions.map(({ key, href, label, icon: Icon, iconClassName }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(actionButtonClassName, tone.actionButton, "group/btn")}
                  aria-label={label}
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  <Icon
                    className={cn(
                      "relative z-10 h-3.5 w-3.5 text-white group-hover/btn:text-black transition-colors duration-200",
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
