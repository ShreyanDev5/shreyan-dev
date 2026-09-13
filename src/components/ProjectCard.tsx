import { memo, type FC, useState } from "react";
import { ArrowUpRight, Github, BookOpen, X, Copy, Check, KeyRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

export type ProjectTechDetails = {
  scope?: string;
  architecture?: string;
  highlights?: string[];
  credentials?: {
    notice?: string;
    username: string;
    password?: string;
  };
};

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
  techDetails?: ProjectTechDetails;
};

interface ProjectCardProps {
  project: Project;
}

type ProjectAction = {
  key: string;
  href: string;
  label: string;
  tooltip: string;
  icon: typeof ArrowUpRight;
  iconClassName: string;
};

type ProjectCategoryTone = {
  titleHover: string;
  cardHover: string;
  actionButton: string;
};

const UNIFIED_PROJECT_TONE: ProjectCategoryTone = {
  titleHover: "group-hover:text-white",
  cardHover: "hover:border-white/15 hover:bg-white/[0.03] transition-colors duration-200",
  actionButton: "border-white/15 bg-transparent text-white hover:bg-white hover:text-black hover:border-white transition-all duration-200",
};

const CATEGORY_TONES: Record<string, ProjectCategoryTone> = {
  "Personal Tool": UNIFIED_PROJECT_TONE,
  "Client Project": UNIFIED_PROJECT_TONE,
  "Showcase Project": UNIFIED_PROJECT_TONE,
  "Personal Project": UNIFIED_PROJECT_TONE,
  "Real-World Project": UNIFIED_PROJECT_TONE,
};

const DEFAULT_TONE: ProjectCategoryTone = UNIFIED_PROJECT_TONE;

const actionButtonClassName =
  "relative inline-flex h-6 w-6 sm:h-6.5 sm:w-6.5 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] transition-all duration-200 active:scale-95";

export const ProjectCard: FC<ProjectCardProps> = memo(({ project }) => {
  const tone = CATEGORY_TONES[project.category] ?? DEFAULT_TONE;
  const isStudent = project.id === "6" || project.title === "Student Management System";

  const [showInfo, setShowInfo] = useState(false);
  const [copiedType, setCopiedType] = useState<"username" | "password" | null>(null);

  const handleCopy = async (text: string, type: "username" | "password") => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.left = "-999999px";
        textarea.style.top = "-999999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-999999px";
      textarea.style.top = "-999999px";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
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
        label: `Open live site for ${project.title}`,
        tooltip: "Live preview",
        icon: ArrowUpRight,
        iconClassName: "transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5",
      }
      : null,
    project.githubUrl
      ? {
        key: "github",
        href: project.githubUrl,
        label: `View source code for ${project.title} on GitHub`,
        tooltip: "GitHub repo",
        icon: Github,
        iconClassName: "transition-transform group-hover/btn:scale-110",
      }
      : null,
  ].filter(Boolean) as ProjectAction[];

  return (
    <div
      id={`project-${project.title.toLowerCase().replace(/'s/g, "s").replace(/[^a-z0-9]+/g, "-")}`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#151413]/90 shadow-lg hover:border-white/20 transition-all duration-200`}
    >
      {/* Tech Info Overlay */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute -inset-[1px] z-30 flex flex-col bg-[#151413] border border-white/15 p-4 sm:p-4.5 text-white info-overlay rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Overlay Header & Close Button (Sticky at Top - Connected Edge to Edge) */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 -mx-4 sm:-mx-4.5 px-4 sm:px-4.5 shrink-0">
              <span className="text-[14px] sm:text-[15px] font-bold text-warm-100 tracking-tight truncate">
                {project.title}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowInfo(false);
                }}
                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-white/15 bg-white/[0.04] text-warm-300 hover:border-white hover:bg-white hover:text-black transition-all duration-150 active:scale-95"
                aria-label="Close information overlay"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                <X size={11} strokeWidth={2} className="shrink-0" />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-start pt-2.5 overflow-y-auto">
              {/* Why I Built This (Title Case, not all-caps) */}
              {project.techDetails?.scope && (
                <div className="flex-1 flex flex-col justify-start">
                  <div className="flex items-center gap-1.5 text-[11.5px] sm:text-[12px] font-semibold text-emerald-400 mb-1.5">
                    <BookOpen size={12.5} className="text-emerald-400 shrink-0" />
                    <span>Why I Built This</span>
                  </div>
                  <p className="text-[12px] sm:text-[12.5px] text-warm-200 font-normal leading-[1.5]">
                    {project.techDetails.scope}
                  </p>
                </div>
              )}

              {/* Demo Credentials (wrkout only) */}
              {project.techDetails?.credentials && (
                <div className="pt-2 space-y-1.5 shrink-0">
                  <div className="flex items-center gap-1.5 text-[10.5px] font-mono text-emerald-400">
                    <KeyRound size={11} className="text-emerald-400 shrink-0" />
                    <span className="font-semibold">Demo Credentials</span>
                  </div>

                  {project.techDetails.credentials.notice && (
                    <p className="text-[10px] sm:text-[10.5px] text-warm-400 font-normal leading-snug">
                      {project.techDetails.credentials.notice}
                    </p>
                  )}

                  <div className="rounded-xl border border-white/10 bg-[#1c1b1a] px-2.5 py-1.5 space-y-1.5">
                    {/* User Row */}
                    <div className="flex items-center justify-between text-[10.5px] font-mono">
                      <span className="text-warm-400">
                        User: <span className="text-warm-100 font-medium select-all">{project.techDetails.credentials.username}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(project.techDetails!.credentials!.username, "username")}
                        className={cn(
                          "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9.5px] font-mono transition-all duration-150 border shrink-0",
                          copiedType === "username"
                            ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-400 font-medium"
                            : "border-white/10 bg-white/[0.04] text-warm-300 hover:text-white hover:border-white/20"
                        )}
                        aria-label="Copy username"
                        style={{ WebkitTapHighlightColor: "transparent" }}
                      >
                        {copiedType === "username" ? (
                          <>
                            <Check size={9.5} className="text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={9.5} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="border-t border-white/[0.06]" />

                    {/* Pass Row */}
                    <div className="flex items-center justify-between text-[10.5px] font-mono">
                      <span className="text-warm-400">
                        Pass: <span className="text-warm-100 font-medium select-all">{project.techDetails.credentials.password}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(project.techDetails!.credentials!.password || "", "password")}
                        className={cn(
                          "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9.5px] font-mono transition-all duration-150 border shrink-0",
                          copiedType === "password"
                            ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-400 font-medium"
                            : "border-white/10 bg-white/[0.04] text-warm-300 hover:text-white hover:border-white/20"
                        )}
                        aria-label="Copy password"
                        style={{ WebkitTapHighlightColor: "transparent" }}
                      >
                        {copiedType === "password" ? (
                          <>
                            <Check size={9.5} className="text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={9.5} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Wrapper */}
      <div className="relative w-full aspect-video overflow-hidden rounded-t-2xl border-b border-white/[0.08] bg-[#1c1b1a]">
        <img
          src={project.image}
          alt={project.title}
          className={cn(
            "w-full h-full transition-transform duration-300 ease-out group-hover:scale-[1.015]",
            isStudent ? "object-contain px-6 sm:px-7 py-2.5 sm:py-3 bg-[#181818]" : "object-cover object-top"
          )}
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-3.5 sm:p-4.5 pb-4 sm:pb-4.5">
        <h3 className={`text-[17.5px] sm:text-[19px] font-bold tracking-tight text-warm-100 transition-colors duration-200 leading-snug mb-1 ${tone.titleHover}`}>
          {project.title}
        </h3>
        <p className="mb-3.5 flex-grow text-[12.5px] sm:text-[13px] font-normal leading-[1.45] text-warm-300 min-h-[2.6rem]">
          {project.description}
        </p>
        <div className="mt-auto pt-1">
          <div className="flex items-center justify-between gap-3">
            {/* Left side: Why I Built This Action Button with Tooltip */}
            <div className="relative group/tooltip inline-flex items-center">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowInfo(!showInfo);
                }}
                className={cn(actionButtonClassName, tone.actionButton, "group/btn flex items-center justify-center")}
                aria-label={`Why I built ${project.title}`}
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                <BookOpen className="relative z-10 h-3 w-3 translate-x-[0.5px] translate-y-[0.75px] text-white group-hover/btn:text-black transition-colors duration-200" strokeWidth={1.85} />
              </button>

              {/* Tooltip */}
              <div
                role="tooltip"
                className="pointer-events-none absolute bottom-full left-0 mb-2 -translate-y-1 opacity-0 transition-all duration-150 ease-out group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 group-focus-within/tooltip:opacity-100 group-focus-within/tooltip:translate-y-0 z-20"
              >
                <div className="whitespace-nowrap rounded-md border border-white/10 bg-[#1c1b1a] px-2 py-0.75 text-[11px] font-sans font-medium text-warm-200 shadow-xl">
                  Why I built this
                </div>
              </div>
            </div>

            {/* Right side: Action Links with Tooltips */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {actions.map(({ key, href, label, tooltip, icon: Icon, iconClassName }) => (
                <div key={key} className="relative group/tooltip inline-flex items-center">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(actionButtonClassName, tone.actionButton, "group/btn flex items-center justify-center")}
                    aria-label={label}
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    <Icon
                      className={cn(
                        "relative z-10 text-white group-hover/btn:text-black transition-colors duration-200",
                        key === "github" ? "h-[13px] w-[13px] translate-x-[0.5px]" : "h-3.5 w-3.5",
                        iconClassName
                      )}
                      strokeWidth={2}
                    />
                  </a>

                  {/* Tooltip */}
                  <div
                    role="tooltip"
                    className="pointer-events-none absolute bottom-full right-0 mb-2 -translate-y-1 opacity-0 transition-all duration-150 ease-out group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 group-focus-within/tooltip:opacity-100 group-focus-within/tooltip:translate-y-0 z-20"
                  >
                    <div className="whitespace-nowrap rounded-md border border-white/10 bg-[#1c1b1a] px-2 py-0.75 text-[11px] font-sans font-medium text-warm-200 shadow-xl">
                      {tooltip}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

