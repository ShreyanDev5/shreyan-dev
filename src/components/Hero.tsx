
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { Download, Mail } from "lucide-react";

const Hero: React.FC = () => {
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
    <div className="relative min-h-[680px] flex items-center justify-center bg-hero-pattern">
      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-4xl pt-36 pb-24 md:pt-44 md:pb-28 px-5 flex flex-col items-center">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center"
        >
          <motion.h1
            variants={textVariants}
            className="text-4xl md:text-6xl font-bold mb-5 tracking-tight leading-[1.2]"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)"
            }}
          >
            <span className="bg-multi-gradient bg-clip-text text-transparent animate-gradient-x">
              Fast, Collaborative,{" "}
            </span>
            <span className="gradient-text animate-gradient">
              AI-native{" "}
            </span>
            Project Management
          </motion.h1>

          <motion.p
            variants={textVariants}
            className="text-lg md:text-xl text-gray-300 mb-8 font-medium"
          >
            Supercharge your workflow with lightning-fast project management, designed for real estate teams.<br />
            Intuitive. Collaborative. Powered by AI.
          </motion.p>

          <motion.div
            variants={textVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button 
              size="lg" 
              className="get-in-touch px-8 text-lg font-semibold rounded-full flex items-center gap-2 transition-all duration-300 ease-in-out hover:shadow-button-emerald transform-gpu"
              onClick={scrollToContact}
            >
              <Mail size={18} />
              Get in Touch
            </Button>
            <Button
              size="lg"
              className="download-resume px-8 text-lg font-semibold rounded-2xl flex items-center gap-2 transition-all duration-300 ease-in-out hover:shadow-button-blue transform-gpu"
            >
              <Download size={18} />
              Download Resume
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Floating arrow indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50 cursor-pointer"
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
          width="24" 
          height="24" 
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
