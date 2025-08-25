import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import ResumeModal from "./ResumeModal";
import { useTypewriter } from "@/hooks/useTypewriter";

const Hero: React.FC = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  
  const { displayText: mainTitle } = useTypewriter({
    text: "Building Experiences",
    speed: 80,
    delay: 800
  });
  
  const { displayText: subtitle } = useTypewriter({
    text: "that Inspire",
    speed: 70,
    delay: 2400
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.17, 0.67, 0.83, 0.67] as [number, number, number, number] }
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Radial gradient background optimized for mobile */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, 
              rgba(16, 185, 129, 0.4) 0%, 
              rgba(59, 130, 246, 0.4) 35%, 
              rgba(17, 24, 39, 0.85) 65%, 
              rgba(10, 15, 25, 1) 95%)`
        }}
      />

      {/* Content container with mobile optimizations */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          {/* Badge - optimized for mobile */}
          <motion.div variants={itemVariants} className="inline-block">
            <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-white text-sm sm:text-base font-medium mb-4 sm:mb-6 border border-white/20">
            Code • Lift • Read • Repeat
            </div>
          </motion.div>
          
          {/* Main heading with typewriter effect - mobile responsive */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-white px-2 sm:px-0 min-h-[7rem] sm:min-h-[9.5rem] md:min-h-[9.5rem] lg:min-h-[11rem]"
            style={{ 
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              lineHeight: '1.15'
            }}
          >
            {/* Enhanced: Animate 'Experiences' in golden yellow as it types, and cursor matches color */}
            {(() => {
              const full = "Building Experiences";
              const highlight = "Experiences";
              const highlightColor = "#FFD700"; // golden yellow
              const typed = mainTitle;
              // Find where the highlight starts
              const highlightStart = full.indexOf(highlight);
              if (typed.length <= highlightStart) {
                // Only the part before 'Experiences' is typed
                return <>{typed}</>;
              }
              // If typing inside or after 'Experiences', cursor should be golden yellow
              if (typed.length > highlightStart && typed.length <= highlightStart + highlight.length) {
                const before = full.slice(0, highlightStart);
                const expPart = typed.slice(highlightStart);
                return <><span>{before}</span><span style={{ color: highlightColor, display: 'inline' }}>{expPart}</span></>;
              }
              // If finished typing 'Experiences' and beyond
              const before = full.slice(0, highlightStart);
              const exp = full.slice(highlightStart, highlightStart + highlight.length);
              const after = typed.slice(highlightStart + highlight.length);
              return <><span>{before}</span><span style={{ color: highlightColor, display: 'inline' }}>{exp}</span>{after}</>;
            })()}
            <br />
            <span className="text-[#52df76]">
              {/* Ensure 'that' is always white, only the rest is green */}
              {subtitle.startsWith('that') ? (
                <>
                  <span style={{ color: '#fff' }}>that</span>
                  <span className="text-[#52df76]">{subtitle.slice(4)}</span>
                </>
              ) : (
                <span style={{ color: subtitle.startsWith('t') ? '#fff' : undefined }}>{subtitle}</span>
              )}
              {subtitle && <span className="typewriter-cursor"></span>}
            </span>
          </motion.h1>

          
          {/* Subtitle - mobile optimized */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-[1.375rem] text-slate-200 mb-8 sm:mb-10 px-2 sm:px-0 max-w-[95%] sm:max-w-none mx-auto"
            style={{ lineHeight: '1.65' }}
          >
            From idea to deployment — I craft <span className="italic text-slate-200">fast, scalable, and user-focused</span> solutions.
          </motion.p>
          
          {/* Button - mobile responsive */}
          <motion.div variants={itemVariants} className="px-2 sm:px-0">
            <Button
              size="lg"
              className="group bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-full px-5 py-3 sm:px-8 sm:py-4 text-base sm:text-lg h-auto hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] ring-1 ring-emerald-500/30 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg inline-flex"
              onClick={() => setIsResumeModalOpen(true)}
            >
              <Download size={18} className="mr-2 group-hover:translate-y-[-2px] transition-transform duration-200" /> See My Resume
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Resume Modal */}
      <ResumeModal 
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
};

export default Hero;
