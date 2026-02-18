import React, { useState, memo } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";

const EMAIL = "shreyansardar427@gmail.com";

const GmailIcon = () => (
  <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
    <path fill="#4285F4" d="M6 6h36v36H6z" opacity="0" />
    <path fill="#EA4335" d="M6 42V18l18 12 18-12v24H6z" opacity="0.0" />
    <path fill="#EA4335" d="M42 12L24 24 6 12V6l18 12L42 6v6z" />
    <path fill="#34A853" d="M6 12v30h8V20l10 8 10-8v22h8V12" />
    <path fill="#FBBC05" d="M6 6v6l18 12V6H6z" />
    <path fill="#4285F4" d="M42 6v6L24 24V6h18z" />
    <path fill="#C5221F" d="M42 12L24 24 6 12" opacity="0" />
    <rect x="6" y="6" width="36" height="36" rx="3" fill="none" stroke="none" />
    <path fill="#EA4335" d="M42 12L24 24 6 12V9c0-1.7 1.3-3 3-3h30c1.7 0 3 1.3 3 3v3z" />
    <path fill="#34A853" d="M6 42h8V20L6 12v27c0 1.7 1.3 3 3 3h-3z" />
    <path fill="#4285F4" d="M42 42h-8V20l8-8v27c0 1.7-1.3 3-3 3h3z" />
    <path fill="#FBBC05" d="M6 12l18 12L42 12v-3c0-1.7-1.3-3-3-3H9c-1.7 0-3 1.3-3 3v3z" opacity="0" />
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
          background: `radial-gradient(ellipse at 50% 0%, rgba(16, 185, 129, 0.03), transparent 60%)`,
        }}
      />
      <div className="max-w-xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            Let's Connect
          </h2>
          <div className="w-12 h-0.5 bg-emerald-500 rounded-full mx-auto mb-6" />
          <p className="text-gray-400 text-base sm:text-lg font-light">
            Have something in mind? I'd love to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-2xl border border-white/10 p-8 sm:p-10 flex flex-col items-center gap-6"
        >
          <GmailIcon />

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${EMAIL}`}
              className="px-5 py-2.5 rounded-full border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/50 hover:shadow-[0_0_20px_-6px_rgba(16,185,129,0.3)] transition-all duration-300 text-sm sm:text-base font-medium"
            >
              {EMAIL}
            </a>
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors duration-200"
              aria-label="Copy email address"
            >
              {copied ? (
                <Check size={16} className="text-emerald-400" />
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>

          {copied && (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-emerald-400 text-xs"
            >
              Copied!
            </motion.span>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default memo(ContactForm);
