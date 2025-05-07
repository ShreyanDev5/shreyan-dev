import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

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
              Beyond Radiance
            </div>
          </motion.div>
          
          {/* Main heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white tracking-tight"
          >
            Present your 
            <br />
            designs <span className="inline-block rounded-full bg-gradient-to-r from-pink-300 via-yellow-200 to-violet-300 px-4 mx-2">
              <span className="[background:linear-gradient(90deg,#FFB7D1,#FFF3B7,#C0EAFF)] bg-clip-text text-transparent">
                &nbsp;
              </span>
            </span> like a Pro
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 mb-12"
          >
            Over 1000+ High Quality, grainy textured and smooth gradient backgrounds.
            <br />
            Elevate your designs with Grainients.
          </motion.p>
          
          {/* Button */}
          <motion.div variants={itemVariants}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-black font-medium rounded-full px-6 py-6 text-lg h-auto"
            >
              <Zap size={20} className="mr-2" /> Go Unlimited
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
