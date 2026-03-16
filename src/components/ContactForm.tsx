import { useState, memo, type FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Mail } from "lucide-react";

const EMAIL = "shreyansardar427@gmail.com";

const OfficialLinkedInIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
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
            Let&apos;s Talk
          </h2>
          <div className="w-12 h-[2.5px] bg-emerald-500 rounded-full mx-auto mb-6" />
          <p className="text-gray-400 text-base sm:text-lg font-light leading-relaxed max-w-lg mx-auto">
            I&apos;m a fresher looking for my first backend role. If my work feels relevant, I&apos;d love to connect.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col items-center justify-center gap-3.5 sm:gap-4 w-full"
        >
          {/* Email Container */}
          <div className="group relative w-full max-w-[19rem] sm:max-w-[24rem]">
            <div className="relative grid grid-cols-[2.25rem_minmax(0,1fr)_2.25rem] items-center gap-1 rounded-full bg-[#0a0a0a] border-1.75 border-white/30 px-2 py-2 sm:grid-cols-[2.5rem_minmax(0,1fr)_2.5rem] sm:px-3 sm:py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 transform group-hover:-translate-y-1 group-hover:border-emerald-500/50">
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
              <a
                href={`mailto:${EMAIL}`}
                className="sr-only"
              >
                Send email to Shreyan
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

          <span className="text-gray-600 text-sm font-light">You can also reach me on LinkedIn</span>

          {/* LinkedIn Container */}
          <a
            href="https://linkedin.com/in/shreyansardar"
            target="_blank"
            rel="noopener noreferrer"
            className="relative grid w-full max-w-[19rem] sm:max-w-[24rem] grid-cols-[2.25rem_minmax(0,1fr)_2.25rem] items-center gap-1 rounded-full bg-[#0a0a0a] border-1.75 border-white/30 px-2 py-2 sm:grid-cols-[2.5rem_minmax(0,1fr)_2.5rem] sm:px-3 sm:py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 group transform hover:-translate-y-1 hover:border-[#0077b5]/50"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors duration-300 group-hover:text-[#0077b5] sm:h-10 sm:w-10">
              <OfficialLinkedInIcon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            </span>
            <span className="text-center text-sm sm:text-[15px] font-medium tracking-wide text-gray-300 transition-colors duration-300 group-hover:text-white">
              LinkedIn
            </span>
            <span aria-hidden="true" className="h-9 w-9 sm:h-10 sm:w-10" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(ContactForm);
