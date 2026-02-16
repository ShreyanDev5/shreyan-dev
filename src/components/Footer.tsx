import React from "react";
import { Github, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="py-8 px-4 border-t border-white/5">
      <div className="max-w-5xl mx-auto flex items-center justify-center gap-4 text-sm text-gray-500">
        <span>Shreyan Sardar · 2025</span>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/ShreyanDev5"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/shreyansardar/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
