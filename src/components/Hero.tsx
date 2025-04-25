
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import ParticleBackground from "./ParticleBackground";

const Hero: React.FC = () => {
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

  return (
    <div className="relative min-h-[680px] flex items-center justify-center bg-hero-pattern">
      {/* Geometric overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-emerald-500/5 blur-3xl" />
      </div>
      
      {/* Particle background */}
      <ParticleBackground />
      
      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-4xl pt-36 pb-24 md:pt-44 md:pb-28 px-5 flex flex-col items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
          className="text-center"
        >
          <motion.h1
            variants={textVariants}
            className="text-4xl md:text-6xl font-bold mb-5 tracking-tight leading-[1.22] drop-shadow-lg font-playfair"
          >
            <span className="bg-gradient-to-r from-white via-emerald-300 to-emerald-500 bg-clip-text text-transparent">
              Fast, Collaborative,{" "}
            </span>
            <span className="bg-gradient-to-r from-emerald-400 via-purple-400 to-purple-600 bg-clip-text text-transparent animate-gradient">
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
              className="hover:bg-emerald-600 active:scale-95 transition-all px-8 text-lg font-semibold rounded-full flex items-center gap-2 bg-emerald-500"
              onClick={scrollToContact}
            >
              <Mail size={18} />
              Get in Touch
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="download-resume border-white/10 hover:border-emerald-500 active:scale-95 transition-all px-8 text-lg font-semibold rounded-full flex items-center gap-2"
            >
              <Download size={18} />
              Download Resume
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
