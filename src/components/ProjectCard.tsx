import { memo, type FC, useState } from "react";
import { ArrowUpRight, Github, SlidersHorizontal, X, Copy, Check, Cpu, Code2, Pin, KeyRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

export type ProjectTechDetails = {
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
  "Personal Project": UNIFIED_PROJECT_TONE,
  "Real-World Project": UNIFIED_PROJECT_TONE,
  "Showcase Project": UNIFIED_PROJECT_TONE,
};

const DEFAULT_TONE: ProjectCategoryTone = UNIFIED_PROJECT_TONE;

const actionButtonClassName =
  "relative inline-flex h-6 w-6 sm:h-6.5 sm:w-6.5 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.025] transition-all duration-200 active:scale-95";

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
      {/* Tech Info Overlay */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute -inset-[1px] z-30 flex flex-col justify-between bg-[#141414] border border-white/15 p-4 sm:p-5 text-white info-overlay rounded-2xl overflow-y-auto shadow-2xl"
            onMouseLeave={() => setShowInfo(false)}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile-Only Close Button */}
            <button
              type="button"
              onClick={() => setShowInfo(false)}
              className="sm:hidden absolute top-2.5 right-2.5 z-40 flex h-5 w-5 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/60 hover:text-white transition-colors"
              aria-label="Close information"
            >
              <X size={11} />
            </button>

            <div className="flex-1 flex flex-col justify-center space-y-2.5 sm:space-y-3 text-xs pr-1">
              {/* Primary Technologies */}
              {project.tags && project.tags.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold tracking-wider text-emerald-400 mb-0.5">
                    <Code2 size={12} className="text-emerald-400 shrink-0" />
                    <span>Technologies</span>
                  </div>
                  <p className="text-[12px] sm:text-[12.5px] text-neutral-200 font-mono font-normal leading-[1.45]">
                    {project.tags.filter((t) => t !== "AI-Assisted").join(" \u2022 ")}
                  </p>
                </div>
              )}

              {/* Architecture */}
              {project.techDetails?.architecture && (
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold tracking-wider text-emerald-400 mb-0.5">
                    <Cpu size={12} className="text-emerald-400 shrink-0" />
                    <span>Architecture</span>
                  </div>
                  <p className="text-[12px] sm:text-[12.5px] text-neutral-200 font-normal leading-[1.45]">
                    {project.techDetails.architecture}
                  </p>
                </div>
              )}

              {/* Key Highlights */}
              {project.techDetails?.highlights && project.techDetails.highlights.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold tracking-wider text-emerald-400 mb-0.5">
                    <Pin size={12} className="text-emerald-400 shrink-0" />
                    <span>Key Highlights</span>
                  </div>
                  <ul className="space-y-1 text-[12px] sm:text-[12.5px] text-neutral-200 font-normal leading-[1.45]">
                    {project.techDetails.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-[1.45]">
                        <span className="text-emerald-400/80 font-bold shrink-0 mt-0.5 select-none">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Demo Credentials */}
              {project.techDetails?.credentials && (
                <div className="space-y-1 mt-0.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold tracking-wider text-emerald-400 mb-0.5">
                    <KeyRound size={12} className="text-emerald-400 shrink-0" />
                    <span>Demo Credentials</span>
                  </div>
                  {project.techDetails.credentials.notice && (
                    <p className="text-[11.5px] sm:text-[12px] text-neutral-300 leading-[1.45] font-normal normal-case mb-1">
                      {project.techDetails.credentials.notice}
                    </p>
                  )}
                  <div className="rounded-xl border border-white/[0.08] bg-black/40 p-2.5 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-neutral-400">User: <span className="text-white font-normal select-all">{project.techDetails.credentials.username}</span></span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(project.techDetails!.credentials!.username, "username");
                        }}
                        className={cn(
                          "inline-flex items-center justify-center gap-1 px-2 py-1 rounded-md border text-[10.5px] font-mono transition-all shrink-0 active:scale-95",
                          copiedType === "username"
                            ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-400 font-medium"
                            : "border-white/10 bg-white/[0.04] text-neutral-300 hover:text-white hover:border-white/20"
                        )}
                        aria-label="Copy username"
                        style={{ WebkitTapHighlightColor: "transparent" }}
                      >
                        {copiedType === "username" ? (
                          <>
                            <Check size={11} className="text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={11} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    {project.techDetails.credentials.password && (
                      <div className="flex items-center justify-between border-t border-white/[0.06] pt-2 text-[11px] font-mono">
                        <span className="text-neutral-400">Pass: <span className="text-white font-normal select-all">{project.techDetails.credentials.password}</span></span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(project.techDetails!.credentials!.password!, "password");
                          }}
                          className={cn(
                            "inline-flex items-center justify-center gap-1 px-2 py-1 rounded-md border text-[10.5px] font-mono transition-all shrink-0 active:scale-95",
                            copiedType === "password"
                              ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-400 font-medium"
                              : "border-white/10 bg-white/[0.04] text-neutral-300 hover:text-white hover:border-white/20"
                          )}
                          aria-label="Copy password"
                          style={{ WebkitTapHighlightColor: "transparent" }}
                        >
                          {copiedType === "password" ? (
                            <>
                              <Check size={11} className="text-emerald-400" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={11} />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Wrapper */}
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-2xl border-b border-white/[0.06] bg-black/40">
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
        <div className="mb-1.5">
          <h3 className={`text-[16px] sm:text-[17.5px] font-bold tracking-tight text-white/90 transition-colors duration-200 leading-snug ${tone.titleHover}`}>
            {project.title}
          </h3>
        </div>
        <p className="mb-3.5 flex-grow text-[12.5px] sm:text-[13px] font-normal leading-[1.45] text-gray-300/90">
          {project.description}
        </p>
        <div className="mt-auto pt-1">
          <div className="flex items-center justify-between gap-3">
            {/* Left side: Spec Controls Action Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowInfo(!showInfo);
              }}
              onMouseEnter={() => setShowInfo(true)}
              className={cn(actionButtonClassName, tone.actionButton, "group/btn")}
              aria-label={`View technical specifications for ${project.title}`}
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <SlidersHorizontal className="relative z-10 h-3.5 w-3.5 text-white group-hover/btn:text-black transition-colors duration-200" strokeWidth={2} />
            </button>

            {/* Right side: Action Links */}
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
