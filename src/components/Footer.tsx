
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-b from-background/30 to-background/50 backdrop-blur-sm border-t border-white/5 py-6 px-4">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center space-y-3">
          {/* Decorative separator */}
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-1" />
          
          {/* Main content */}
          <div className="text-center space-y-1.5">
            <h2 className="text-lg font-light tracking-wider text-white/90">
              Shreyan Sardar
            </h2>
            <p className="text-sm font-light text-gray-400/80 max-w-md mx-auto">
                Engineering ideas into impactful solutions
            </p>
          </div>
          
          {/* Copyright */}
          <div className="mt-4">
            <p className="text-xs font-light tracking-wide text-gray-500/70">
              © 2025 All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
