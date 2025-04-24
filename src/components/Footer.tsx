
import React from "react";
import { Github, Linkedin, Twitter, Mail, ExternalLink } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-blue-900/10 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo/Branding */}
          <div className="flex flex-col">
            <h3 className="text-xl font-bold mb-3 text-white">Dev Portfolio</h3>
            <p className="text-gray-400 max-w-xs">
              Crafting digital experiences with code and creativity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              <a href="#about" className="text-gray-400 hover:text-blue-400 transition-colors">About</a>
              <a href="#projects" className="text-gray-400 hover:text-blue-400 transition-colors">Projects</a>
              <a href="#skills" className="text-gray-400 hover:text-blue-400 transition-colors">Skills</a>
              <a href="#contact" className="text-gray-400 hover:text-blue-400 transition-colors">Contact</a>
              <a href="#blog" className="text-gray-400 hover:text-blue-400 transition-colors">Blog</a>
              <a
                href="/resume.pdf"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume <ExternalLink className="inline-block ml-1" size={14} />
              </a>
            </div>
          </div>

          {/* Social/Connect */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-all transform hover:scale-110"
                aria-label="GitHub"
              >
                <Github size={22} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-all transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={22} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-all transform hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter size={22} />
              </a>
              <a 
                href="mailto:hello@example.com" 
                className="text-gray-400 hover:text-white transition-all transform hover:scale-110"
                aria-label="Email"
              >
                <Mail size={22} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
          <p className="text-gray-500 text-sm mt-2 md:mt-0">
            Built with love & late-night caffeine ☕💻
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
