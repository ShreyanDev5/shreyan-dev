import { memo, type FC, useState } from "react";
import { ArrowUpRight, Github, Info, X, Copy, Check, Lock, Key, Cpu } from "lucide-react";
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
  actionButton: "text-gray-400 hover:text-white hover:bg-white/[0.08] hover:border-white/20",
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
            {/* Header without icon */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 mb-2">
              <h4 className="text-xs sm:text-sm font-semibold tracking-tight text-white">
                wrkout Demo Guide
              </h4>
              <button
                type="button"
                onClick={() => setShowInfo(false)}
                className="flex h-6 w-6 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-white/60 hover:text-white hover:bg-white/[0.08] transition-colors"
                aria-label="Close information"
              >
                <X size={13} />
              </button>
            </div>

            {/* Beginner-friendly Body */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-2 text-xs custom-scrollbar">
              {/* Sandbox Note */}
              <div className="space-y-1 rounded-xl border border-white/10 bg-white/[0.02] p-2 text-gray-300">
                <div className="flex items-center gap-1.5 font-medium text-white text-[10.5px] tracking-wider uppercase">
                  <Lock size={11} className="shrink-0 text-neutral-400" />
                  Sandbox Environment
                </div>
                <p className="leading-relaxed font-light text-gray-400 text-[11px]">
                  Password reset emails are disabled on this sandbox domain. Workout tracking and account features work normally.
                </p>
              </div>

              {/* Quick Sign-In Explanation */}
              <div className="space-y-1 rounded-xl border border-white/10 bg-white/[0.02] p-2 text-gray-300">
                <div className="flex items-center gap-1.5 font-medium text-white text-[10.5px] tracking-wider uppercase">
                  <Key size={11} className="shrink-0 text-neutral-400" />
                  Quick Sign-In
                </div>
                <p className="leading-relaxed font-light text-gray-400 text-[11px]">
                  Log in instantly using the demo credentials below, or register a free account.
                </p>
              </div>

              {/* Demo Credentials */}
              <div className="space-y-1.5 rounded-xl border border-white/10 bg-black/40 p-2.5">
                <div className="flex items-center justify-between text-[10.5px] font-medium text-white uppercase tracking-wider">
                  <span>Demo Credentials</span>
                </div>
                <div className="space-y-1 text-[11px] font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Username: <span className="text-white select-all font-semibold">demo</span></span>
                    <button
                      type="button"
                      onClick={() => handleCopy("demo", "username")}
                      className="flex h-5 w-5 items-center justify-center rounded border border-white/10 bg-white/[0.03] text-white/70 hover:text-white transition-all"
                      aria-label="Copy username"
                    >
                      {copiedType === "username" ? <Check size={11} className="text-white" /> : <Copy size={11} />}
                    </button>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/[0.06] pt-1">
                    <span className="text-gray-400">Password: <span className="text-white select-all font-semibold">TestPassword123</span></span>
                    <button
                      type="button"
                      onClick={() => handleCopy("TestPassword123", "password")}
                      className="flex h-5 w-5 items-center justify-center rounded border border-white/10 bg-white/[0.03] text-white/70 hover:text-white transition-all"
                      aria-label="Copy password"
                    >
                      {copiedType === "password" ? <Check size={11} className="text-white" /> : <Copy size={11} />}
                    </button>
                  </div>
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
      <div className="flex flex-col flex-grow p-4 sm:p-5 pb-4.5 sm:pb-5">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <h3 className={`text-lg sm:text-xl font-bold tracking-tight text-white/90 transition-colors duration-200 leading-snug ${tone.titleHover}`}>
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
        <p className="mb-3.5 flex-grow text-xs sm:text-sm font-light leading-relaxed text-gray-400">
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
                  className={cn(actionButtonClassName, tone.actionButton, "group")}
                  aria-label={label}
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  <Icon
                    className={cn(
                      "relative z-10 h-3.5 w-3.5 transition-colors duration-200",
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
