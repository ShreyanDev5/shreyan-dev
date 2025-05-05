
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { ChevronDown, FileDown } from "lucide-react";

const Hero: React.FC = () => {
  const controls = useAnimation();
  const [animateGradient, setAnimateGradient] = useState(true);
  
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

  const toggleAnimation = () => {
    setAnimateGradient(!animateGradient);
  };

  return (
    <div 
      className={`relative w-screen h-screen flex items-center justify-center hero-section ${animateGradient ? 'animate-gradient' : ''}`}
    >
      {/* Main content with improved glassmorphism effect - added mt-16 for spacing from navbar */}
      <div className="relative z-10 mx-auto max-w-5xl w-full px-8 py-24 flex flex-col items-center hero-card rounded-xl md:rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg mb-16 mt-16">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center"
        >
          <motion.h1
            variants={textVariants}
            className="text-4xl md:text-6xl font-bold mb-10 tracking-tight leading-[1.2] drop-shadow-md"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              textShadow: "0px 2px 8px rgba(0,0,0,0.3)"
            }}
          >
            <span className="bg-gradient-to-r from-emerald-500 to-sky-400 bg-clip-text text-transparent animate-gradient-x">
              Fast, Collaborative,{" "}
            </span>
            <span className="bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent animate-gradient-x">
              AI-native{" "}
            </span>
            Project Management
          </motion.h1>

          <motion.p
            variants={textVariants}
            className="text-lg md:text-xl text-gray-100 mb-12 font-medium max-w-3xl mx-auto"
            style={{ textShadow: "0px 1px 3px rgba(0,0,0,0.2)" }}
          >
            Supercharge your workflow with lightning-fast project management, designed for real estate teams.<br />
            Intuitive. Collaborative. Powered by AI.
          </motion.p>

          <motion.div
            variants={textVariants}
            className="flex flex-col sm:flex-row items-center justify-center mt-4"
          >
            <Button
              size="xl"
              className="px-8 text-lg font-semibold rounded-xl flex items-center gap-2 transition-all duration-300 ease-in-out transform-gpu bg-gradient-to-r from-teal-600 to-blue-600 text-white hover:scale-105 hover:shadow-[0_0_15px_rgba(20,184,166,0.5)] border-0"
            >
              <FileDown size={20} />
              Download Resume
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating arrow indicator with improved visibility for mobile */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 cursor-pointer hover:text-white transition-colors scroll-arrow z-10"
        animate={{ 
          y: [0, 8, 0],
        }}
        transition={{ 
          duration: 2, 
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
        <ChevronDown 
          size={32}
          className="animate-float"
        />
      </motion.div>
    </div>
  );
};

export default Hero;
