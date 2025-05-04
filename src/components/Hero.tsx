
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { FileText, Download } from "lucide-react";

const Hero: React.FC = () => {
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

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

  return (
    <div 
      className="relative w-screen h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat hero" 
      style={{ backgroundImage: "url('/bg-lavender-gradient.jpeg')" }}
    >
      {/* Main content with softer glassmorphism effect */}
      <div className="relative z-10 mx-auto max-w-5xl w-full px-6 py-20 flex flex-col items-center hero-content rounded-xl backdrop-blur-sm bg-darkBlue/40 border border-white/10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center"
        >
          <motion.h1
            variants={textVariants}
            className="text-4xl md:text-6xl font-bold mb-8 tracking-tight leading-[1.2] drop-shadow-md"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              textShadow: "0px 2px 8px rgba(0,0,0,0.3)"
            }}
          >
            <span className="bg-gradient-to-r from-emerald-500 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
              Fast, Collaborative,{" "}
            </span>
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
              AI-native{" "}
            </span>
            Project Management
          </motion.h1>

          <motion.p
            variants={textVariants}
            className="text-lg md:text-xl text-gray-100 mb-10 font-medium max-w-3xl mx-auto"
            style={{ textShadow: "0px 1px 3px rgba(0,0,0,0.2)" }}
          >
            Supercharge your workflow with lightning-fast project management, designed for real estate teams.<br />
            Intuitive. Collaborative. Powered by AI.
          </motion.p>

          <motion.div
            variants={textVariants}
            className="flex flex-col sm:flex-row items-center justify-center mt-2"
          >
            <Button
              size="xl"
              className="px-8 text-lg font-semibold rounded-xl flex items-center gap-2 transition-all duration-300 ease-in-out transform-gpu bg-gradient-to-r from-teal-600 to-blue-600 text-white hover:scale-105 hover:shadow-[0_0_15px_rgba(45,212,191,0.5)] border-0"
            >
              <FileText size={20} />
              Download Resume
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating arrow indicator with enhanced styling */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 cursor-pointer hover:text-white/80 transition-colors"
        animate={{ 
          y: [0, 10, 0],
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        onClick={() => {
          const aboutSection = document.getElementById('about');
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="animate-bounce-slow"
        >
          <path d="M12 5v14"></path>
          <path d="m19 12-7 7-7-7"></path>
        </svg>
      </motion.div>
    </div>
  );
};

export default Hero;
