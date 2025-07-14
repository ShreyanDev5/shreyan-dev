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
      {/* Radial gradient background similar to screenshot */}
      <div 
        className="absolute inset-0 w-full h-full" 
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, 
              rgba(140, 255, 170, 0.5) 0%, 
              rgba(60, 170, 230, 0.7) 35%, 
              rgba(0, 30, 100, 0.8) 65%, 
              rgba(0, 0, 0, 1) 95%)`
        }}
      />

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-block">
            <div className="bg-white/10 backdrop-blur-md px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-white text-sm sm:text-base font-medium mb-5 sm:mb-6 border border-white/20">
            Code • Lift • Read • Repeat
            </div>
          </motion.div>
          
          {/* Main heading with typewriter effect */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-4 text-white tracking-tight px-2 sm:px-0 min-h-[9.5rem] sm:min-h-[8rem] md:min-h-[9.5rem] lg:min-h-[11rem]"
            style={{ textShadow: '1px 1px 6px rgba(0, 0, 0, 0.25)' }}
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

          
          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-[1.375rem] text-slate-300 mb-10 sm:mb-10 px-4 sm:px-0 max-w-[95%] sm:max-w-none mx-auto"
          >
            From idea to deployment — I craft <span className="italic text-slate-300">fast, scalable, and user-focused</span> solutions.
          </motion.p>
          
          {/* Button */}
          <motion.div variants={itemVariants} className="px-4 sm:px-0">
            <Button
              size="lg"
              className="group bg-gradient-to-r from-green-400 to-green-500 text-black font-medium rounded-full px-6 py-3 sm:px-8 sm:py-4 text-lg sm:text-lg h-auto hover:shadow-[0_0_15px_rgba(82,223,118,0.4)] ring-1 ring-emerald-400/30 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg inline-flex"
              onClick={() => setIsResumeModalOpen(true)}
            >
              <Download size={20} className="mr-2 group-hover:translate-y-[-2px] transition-transform duration-200" /> See My Resume
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
