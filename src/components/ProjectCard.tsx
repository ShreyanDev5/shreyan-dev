import { memo, type FC, useState } from "react";
import { ExternalLink, Github, Info, X, Copy, Check, Lock, Key } from "lucide-react";
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
  icon: typeof ExternalLink;
  iconClassName: string;
};

type ProjectCategoryTone = {
  pill: string;
  titleHover: string;
  cardHover: string;
  actionButton: string;
};

const CATEGORY_TONES: Record<string, ProjectCategoryTone> = {
  "Personal Project": {
    pill: "border-emerald-400/20 bg-emerald-500/10 text-emerald-200/90 hover:bg-emerald-500/15 hover:border-emerald-400/30",
    titleHover: "group-hover:text-emerald-400",
    cardHover: "hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7),0_0_30px_-5px_rgba(16,185,129,0.08)]",
    actionButton: "text-white/80 hover:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/30 focus-visible:ring-emerald-400/50",
  },
  "Real-World Project": {
    pill: "border-blue-400/20 bg-blue-500/10 text-blue-200/90 hover:bg-blue-500/15 hover:border-blue-400/30",
    titleHover: "group-hover:text-sky-400",
    cardHover: "hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7),0_0_30px_-5px_rgba(56,189,248,0.08)]",
    actionButton: "text-white/80 hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/30 focus-visible:ring-blue-400/50",
  },
  "Showcase Project": {
    pill: "border-amber-400/20 bg-amber-500/10 text-amber-200/90 hover:bg-amber-500/15 hover:border-amber-400/30",
    titleHover: "group-hover:text-amber-400",
    cardHover: "hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7),0_0_30px_-5px_rgba(245,158,11,0.08)]",
    actionButton: "text-white/80 hover:text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/30 focus-visible:ring-amber-400/50",
  },
};

const DEFAULT_TONE: ProjectCategoryTone = {
  pill: "border-white/10 bg-white/[0.03] text-gray-300 hover:border-white/15 hover:bg-white/[0.06]",
  titleHover: "group-hover:text-white",
  cardHover: "hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]",
  actionButton: "text-white/80 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15] focus-visible:ring-white/50",
};

const actionButtonClassName =
  "relative inline-flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/[0.08] bg-white/[0.03] transition-all duration-300 hover:scale-105 active:scale-95";

export const ProjectCard: FC<ProjectCardProps> = memo(({ project }) => {
  const tone = CATEGORY_TONES[project.category] ?? DEFAULT_TONE;
  const isStudent = project.id === "6" || project.title === "Student Management System";
  const hasAiAssistedTag = project.tags.includes("AI-Assisted");

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
        icon: ExternalLink,
        iconClassName: "transition-colors duration-300",
      }
      : null,
    project.githubUrl
      ? {
        key: "github",
        href: project.githubUrl,
        label: `Open source code for ${project.title}`,
        icon: Github,
        iconClassName: "transition-colors duration-300",
      }
      : null,
  ].filter((action): action is ProjectAction => action !== null);

  return (
    <div
      id={`project-${project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.03] transition-all duration-500 will-change-transform hover:-translate-y-2 hover:border-white/20 ${tone.cardHover}`}
    >
      {/* Glassmorphic Info Overlay */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute inset-0 z-30 flex flex-col justify-between bg-[#1c1d22] border border-white/[0.08] p-5 sm:p-6 text-white info-overlay"
            onMouseLeave={() => setShowInfo(false)}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Info size={14} />
                </div>
                <h4 className="text-base sm:text-lg font-bold tracking-tight text-white">
                  wrkout Info
                </h4>
              </div>
              <button
                onClick={() => setShowInfo(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-white/60 hover:text-white hover:bg-white/[0.08] transition-colors"
                aria-label="Close information"
              >
                <X size={14} />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-4 text-xs sm:text-sm">
              {/* Security Note */}
              <div className="space-y-1.5 rounded-2xl border border-amber-500/20 bg-amber-500/[0.03] p-3.5 sm:p-4 text-gray-300">
                <div className="flex items-center gap-1.5 font-semibold text-amber-400 text-xs tracking-wider uppercase">
                  <Lock size={12} className="shrink-0" />
                  Security Note
                </div>
                <p className="leading-relaxed font-light text-gray-300">
                  Hosted on a free Vercel subdomain. Without a verified custom domain (e.g., a paid .com), Resend restricts password reset emails to the sandbox owner's address. All other features (Sign Up/In, Tracking) are <strong className="font-bold text-gray-300">fully active</strong>.
                </p>
              </div>

              {/* Quick Demo Credentials */}
              <div className="space-y-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3.5 sm:p-4">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-400 text-xs tracking-wider uppercase">
                  <Key size={12} className="shrink-0" />
                  Quick Demo
                </div>
                <p className="font-light text-gray-400">
                  Sign up with a new account, or log in instantly using the credentials below:
                </p>
                
                {/* Credentials Box */}
                <div className="space-y-2 mt-2 bg-black/40 border border-white/[0.05] rounded-xl p-3 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Username: <span className="text-white select-all">demo</span></span>
                    <button
                      onClick={() => handleCopy("demo", "username")}
                      className="flex h-6 w-6 items-center justify-center rounded-md border border-white/[0.06] bg-white/[0.02] text-white/60 hover:text-emerald-400 hover:border-emerald-500/20 transition-all active:scale-95"
                      aria-label="Copy username"
                    >
                      {copiedType === "username" ? (
                        <Check size={12} className="text-emerald-400 animate-in fade-in zoom-in-50 duration-200" />
                      ) : (
                        <Copy size={12} />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/[0.04] pt-2">
                    <span className="text-gray-400">Password: <span className="text-white select-all">TestPassword123</span></span>
                    <button
                      onClick={() => handleCopy("TestPassword123", "password")}
                      className="flex h-6 w-6 items-center justify-center rounded-md border border-white/[0.06] bg-white/[0.02] text-white/60 hover:text-emerald-400 hover:border-emerald-500/20 transition-all active:scale-95"
                      aria-label="Copy password"
                    >
                      {copiedType === "password" ? (
                        <Check size={12} className="text-emerald-400 animate-in fade-in zoom-in-50 duration-200" />
                      ) : (
                        <Copy size={12} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer / Actions */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.06] gap-2">
              <span className="text-[10px] sm:text-xs text-gray-400 font-light max-w-[75%] text-left leading-normal">
                Password reset is restricted to prevent sandbox abuse.
              </span>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all active:scale-95"
                  aria-label="Launch app"
                >
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
      <div className="flex flex-col flex-grow p-4 sm:p-6 pb-5 sm:pb-7">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className={`text-xl font-bold tracking-tight text-white transition-colors duration-300 md:text-2xl leading-snug ${tone.titleHover}`}>
            {project.title}
          </h3>
          {project.title.toLowerCase() === "wrkout" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowInfo(!showInfo);
              }}
              onMouseEnter={() => setShowInfo(true)}
              className="relative inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white/70 transition-all duration-300 hover:scale-105 hover:bg-white/[0.1] hover:border-white/[0.2] hover:text-emerald-400 focus-visible:ring-2 focus-visible:ring-emerald-400/50 active:scale-95 z-10"
              aria-label="View security and login info"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <Info size={14} />
            </button>
          )}
        </div>
        <p className="mb-5 flex-grow text-sm font-light leading-relaxed text-gray-400 md:text-base">
          {project.description}
        </p>
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={cn(
                "inline-flex rounded-full px-3 py-1 sm:px-3.5 sm:py-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300",
                tone.pill
              )}>
                {project.category}
              </span>
              {hasAiAssistedTag && (
                <span className={cn(
                  "inline-flex rounded-full px-3 py-1 sm:px-3.5 sm:py-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300",
                  tone.pill
                )}>
                  AI-Assisted
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
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
                      "relative z-10 h-3.5 w-3.5 sm:h-4 sm:w-4 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)] transition-colors duration-200",
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
