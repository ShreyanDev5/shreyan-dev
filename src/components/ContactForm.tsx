import { useState, memo, type FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Mail } from "lucide-react";

const EMAIL = "shreyansardar427@gmail.com";

const OfficialLinkedInIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2H21l-6.9 7.897L22.2 22h-6.828l-5.338-6.894L3.99 22H1.23l7.39-8.47L1 2h6.99l4.88 6.302L18.244 2Zm-1.2 18h1.527L6.164 3.44H4.522L17.044 20Z" />
  </svg>
);

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const CONTACT_LINKS = [
  {
    name: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: Mail,
    color: "emerald" as const,
    customAction: true,
  },
  {
    name: "LinkedIn",
    value: "shreyansardar",
    href: "https://linkedin.com/in/shreyansardar",
    icon: OfficialLinkedInIcon,
    color: "linkedin" as const,
  },
  {
    name: "GitHub",
    value: "ShreyanDev5",
    href: "https://github.com/ShreyanDev5",
    icon: GitHubIcon,
    color: "github" as const,
  },
  {
    name: "Twitter / X",
    value: "@Shreyan_23",
    href: "https://x.com/Shreyan_23",
    icon: XIcon,
    color: "twitter" as const,
  },
];

const COLOR_CONFIGS = {
  emerald: {
    hoverBorder: "hover:border-emerald-500/40",
    hoverShadow: "hover:shadow-[0_20px_40px_-16px_rgba(16,185,129,0.25)]",
    iconColor: "group-hover:text-emerald-400",
    glowColor: "rgba(16, 185, 129, 0.04)",
  },
  linkedin: {
    hoverBorder: "hover:border-[#0077b5]/50",
    hoverShadow: "hover:shadow-[0_20px_40px_-16px_rgba(0,119,181,0.25)]",
    iconColor: "group-hover:text-[#0077b5]",
    glowColor: "rgba(0, 119, 181, 0.04)",
  },
  github: {
    hoverBorder: "hover:border-white/25",
    hoverShadow: "hover:shadow-[0_20px_40px_-16px_rgba(255,255,255,0.08)]",
    iconColor: "group-hover:text-white",
    glowColor: "rgba(255, 255, 255, 0.02)",
  },
  twitter: {
    hoverBorder: "hover:border-white/25",
    hoverShadow: "hover:shadow-[0_20px_40px_-16px_rgba(255,255,255,0.08)]",
    iconColor: "group-hover:text-white",
    glowColor: "rgba(255, 255, 255, 0.02)",
  },
};

const ContactForm: FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(EMAIL);
      } else {
        // Fallback for mobile browsers / non-secure contexts
        const textarea = document.createElement("textarea");
        textarea.value = EMAIL;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "-9999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Last resort: open mailto link
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section className="py-20 sm:py-32 px-4 relative" id="contact">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 100%, rgba(16, 185, 129, 0.05), transparent 60%)`,
        }}
      />

      <div className="max-w-xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
            Contact
          </h2>
          <p className="text-gray-400 text-sm font-light leading-snug max-w-lg mx-auto">
            Open to remote backend roles. If my work aligns with your goals, let's connect.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-lg mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CONTACT_LINKS.map((link) => {
              const Icon = link.icon;
              const config = COLOR_CONFIGS[link.color];
              
              return (
                <motion.div
                  key={link.name}
                  whileHover={{ y: -4, scale: 1.01 }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  onClick={() => {
                    if (link.customAction) {
                      window.location.href = link.href;
                    } else {
                      window.open(link.href, "_blank", "noopener,noreferrer");
                    }
                  }}
                  className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b0b0b]/90 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-md transition-colors duration-200 cursor-pointer ${config.hoverBorder} ${config.hoverShadow}`}
                >
                  {/* Inner glowing hover gradient */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{
                      background: `radial-gradient(circle at 80% 80%, ${config.glowColor}, transparent 65%)`
                    }}
                  />

                  <div className="relative z-10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Icon Container */}
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.02] border border-white/[0.08] text-gray-400 transition-all duration-300 group-hover:bg-white/[0.06] group-hover:border-white/[0.12]">
                        <Icon className={`h-5 w-5 transition-colors duration-300 ${config.iconColor}`} />
                      </div>

                      {/* Content */}
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold tracking-wide text-gray-200 transition-colors duration-300 group-hover:text-white">
                          {link.name}
                        </h3>
                        <p className="truncate text-xs text-gray-400 group-hover:text-gray-300 font-light mt-0.5">
                          {link.value}
                        </p>
                      </div>
                    </div>

                    {/* Action button / arrow */}
                    {link.customAction ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy();
                        }}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 bg-white/[0.02] border border-white/[0.08] transition-all duration-300 hover:text-emerald-400 hover:bg-white/[0.08] hover:border-emerald-500/20"
                        aria-label="Copy email"
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          {copied ? (
                            <motion.div
                              key="check"
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.5, opacity: 0 }}
                              transition={{ duration: 0.15 }}
                            >
                              <Check size={14} />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="copy"
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.5, opacity: 0 }}
                              transition={{ duration: 0.15 }}
                            >
                              <Copy size={14} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>
                    ) : (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-500 transition-all duration-300 group-hover:text-gray-300 group-hover:translate-x-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(ContactForm);
