import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

const Hero: React.FC = () => {
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
      transition: { duration: 0.7, ease: "easeOut" }
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
            <div className="bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-white font-medium mb-8 border border-white/20">
            Code • Lift • Read • Repeat
            </div>
          </motion.div>
          
          {/* Main heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white tracking-tight"
            style={{ textShadow: '1px 1px 6px rgba(0, 0, 0, 0.25)' }}
          >
            Building Experiences
            <br />
            that <span className="text-[#52df76]">Inspire</span>
          </motion.h1>

          
          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-[1.375rem] text-slate-300 mb-12"
          >
            From idea to deployment — I craft <span className="italic text-slate-300">fast, scalable, and user-focused</span> solutions.
          </motion.p>
          
          {/* Button */}
          <motion.div variants={itemVariants}>
            <Button
              size="lg"
              className="group bg-gradient-to-r from-green-400 to-green-500 text-black font-medium rounded-full px-4 py-3 md:px-6 md:py-4 text-lg h-auto hover:shadow-[0_0_15px_rgba(82,223,118,0.4)] ring-1 ring-emerald-400/30 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
            >
              <Download size={20} className="mr-2 group-hover:translate-y-[-2px] transition-transform duration-200" /> See My Resume
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
