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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            Contact
          </h2>
          <div className="w-12 h-[2.5px] bg-emerald-500 rounded-full mx-auto mb-6" />
          <p className="text-gray-400 text-base sm:text-lg font-light leading-relaxed max-w-lg mx-auto">
            I am currently open to remote backend and AI roles. If my work feels relevant to what you are building, I would be glad to connect.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col items-center justify-center w-full"
        >
          <div className="w-full max-w-[19rem] sm:max-w-[24rem] rounded-3xl border border-white/[0.08] bg-white/[0.02] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:p-2.5">
            <div className="flex flex-col gap-2.5 sm:gap-3">
              <div className="group relative">
                <div className="relative grid grid-cols-[2.25rem_minmax(0,1fr)_2.25rem] items-center gap-1 rounded-full bg-[#0a0a0a] border border-white/[0.1] px-2 py-2 sm:grid-cols-[2.5rem_minmax(0,1fr)_2.5rem] sm:px-3 sm:py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 transform group-hover:-translate-y-0.5 group-hover:border-emerald-500/40">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors duration-300 group-hover:text-emerald-400 sm:h-10 sm:w-10">
                    <Mail className="h-4 w-4 flex-shrink-0 sm:h-[18px] sm:w-[18px]" />
                  </div>
                  <div className="min-w-0 text-center">
                    <a
                      href={`mailto:${EMAIL}`}
                      className="block min-w-0 truncate text-center text-[13px] sm:text-[15px] font-medium tracking-wide text-gray-300 transition-colors duration-300 group-hover:text-white"
                    >
                      {EMAIL}
                    </a>
                  </div>
                  <a href={`mailto:${EMAIL}`} className="sr-only">
                    Send email to Shreyan Sardar
                  </a>
                  <button
                    onClick={handleCopy}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-all duration-300 hover:text-emerald-400 sm:h-10 sm:w-10"
                    aria-label="Copy email"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {copied ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check size={16} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Copy size={16} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </div>

              <div className="mx-auto grid w-fit grid-cols-3 items-center justify-items-center gap-3 sm:gap-4">
                <a
                  href="https://linkedin.com/in/shreyansardar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative grid h-12 w-12 place-items-center rounded-full border border-white/[0.1] bg-[#0a0a0a] text-gray-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0077b5]/45 hover:text-[#0077b5] sm:h-14 sm:w-14"
                  aria-label="LinkedIn"
                >
                  <OfficialLinkedInIcon className="block h-[18px] w-[18px] sm:h-6 sm:w-6" />
                </a>

                <a
                  href="https://x.com/Shreyan_23"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative grid h-12 w-12 place-items-center rounded-full border border-white/[0.1] bg-[#0a0a0a] text-gray-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1DA1F2]/45 hover:text-[#1DA1F2] sm:h-14 sm:w-14"
                  aria-label="Twitter"
                >
                  <XIcon className="block h-[18px] w-[18px] sm:h-6 sm:w-6" />
                </a>

                <a
                  href="https://github.com/ShreyanDev5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative grid h-12 w-12 place-items-center rounded-full border border-white/[0.1] bg-[#0a0a0a] text-gray-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:text-white sm:h-14 sm:w-14"
                  aria-label="GitHub"
                >
                  <GitHubIcon className="block h-[18px] w-[18px] sm:h-6 sm:w-6" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(ContactForm);
