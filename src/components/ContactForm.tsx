import { useState, memo, type FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";

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

const GmailIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
  </svg>
);

const CONTACT_LINKS = [
  {
    name: "LinkedIn",
    value: "shreyansardar",
    href: "https://linkedin.com/in/shreyansardar",
    icon: OfficialLinkedInIcon,
    hoverClass: "hover:border-[#0A66C2]/45 hover:text-[#0A66C2]",
  },
  {
    name: "GitHub",
    value: "ShreyanDev5",
    href: "https://github.com/ShreyanDev5",
    icon: GitHubIcon,
    hoverClass: "hover:border-white/20 hover:text-white",
  },
  {
    name: "X",
    value: "@Shreyan_23",
    href: "https://x.com/Shreyan_23",
    icon: XIcon,
    hoverClass: "hover:border-white/20 hover:text-white",
  },
];

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
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            Let&apos;s build something dependable.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-[340px] mx-auto"
        >
          <div className="flex flex-col items-center gap-3 w-full">
            {/* Email Card */}
            <div className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-[#0b0b0b]/90 p-2 pl-3.5 pr-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-all duration-300 hover:border-emerald-500/30 hover:shadow-[0_4px_20px_rgba(16,185,129,0.04)] w-full">
              <a
                href={`mailto:${EMAIL}`}
                className="group flex items-center gap-3 min-w-0"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-gray-400 transition-colors group-hover:text-emerald-400">
                  <GmailIcon className="h-[18px] w-[18px] block" />
                </span>
                <span className="text-sm font-medium text-gray-200 transition-colors group-hover:text-white sm:text-[0.95rem] tracking-wide pr-1 truncate">
                  {EMAIL}
                </span>
              </a>
              <div className="flex items-center gap-2">
                <div className="w-[1px] h-4 bg-white/10 shrink-0" />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-gray-400 transition-all duration-200 hover:border-emerald-500/25 hover:text-emerald-400 hover:bg-white/[0.04] active:scale-95"
                  aria-label="Copy email"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {copied ? (
                      <motion.span key="check" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex items-center justify-center">
                        <Check className="h-3.5 w-3.5" />
                      </motion.span>
                    ) : (
                      <motion.span key="copy" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex items-center justify-center">
                        <Copy className="h-3.5 w-3.5" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-3 gap-3 w-full">
              {CONTACT_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center justify-center rounded-2xl border border-white/[0.08] bg-[#0b0b0b]/90 py-4 text-gray-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] ${link.hoverClass}`}
                    aria-label={`Open ${link.name}: ${link.value}`}
                    title={link.name}
                  >
                    <Icon className="h-[18px] w-[18px] shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(ContactForm);
