import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Mail } from "lucide-react";

const EMAIL = "shreyansardar427@gmail.com";

const OfficialLinkedInIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

const ContactForm: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 sm:py-32 px-4 relative" id="contact">
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
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            Let's Connect
          </h2>
          <div className="w-12 h-0.5 bg-emerald-500 rounded-full mx-auto mb-6" />
          <p className="text-gray-400 text-base sm:text-lg font-light max-w-sm mx-auto">
            Have a project in mind? I'd love to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col items-center justify-center gap-4"
        >
          {/* Email Container */}
          <div className="group relative">
            <div className="relative flex items-center gap-3 p-2 pl-5 pr-2 rounded-full bg-[#0a0a0a] border-[1.5px] border-white/15 group-hover:border-emerald-500/50 transition-all duration-300 transform group-hover:-translate-y-1">
              <Mail className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 transition-colors duration-300" />
              <a
                href={`mailto:${EMAIL}`}
                className="text-gray-300 group-hover:text-white text-sm sm:text-base font-medium tracking-wide transition-colors duration-300"
              >
                {EMAIL}
              </a>
              <div className="w-px h-5 bg-white/10 mx-1" />
              <button
                onClick={handleCopy}
                className="p-2 rounded-full text-gray-400 hover:text-emerald-400 transition-all duration-300"
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

          <span className="text-gray-600 text-sm font-light">or</span>

          {/* LinkedIn Container */}
          <a
            href="https://linkedin.com/in/shreyansardar"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center gap-3 p-2 pl-4 pr-6 rounded-full bg-[#0a0a0a] border-[1.5px] border-white/15 hover:border-[#0077b5]/50 transition-all duration-300 group transform hover:-translate-y-1"
          >
            <OfficialLinkedInIcon className="w-5 h-5 text-gray-400 group-hover:text-[#0077b5] transition-colors duration-300" />
            <span className="text-gray-300 group-hover:text-white text-sm sm:text-base font-medium tracking-wide transition-colors duration-300">
              LinkedIn
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(ContactForm);
