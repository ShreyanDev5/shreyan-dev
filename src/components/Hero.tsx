
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";

const Hero: React.FC = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-[680px] flex items-center justify-center">
      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-4xl pt-36 pb-24 md:pt-44 md:pb-28 px-5 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-6"
          >
            <img
              src="/lovable-uploads/c893d50a-6ec3-47b6-b8d1-28394fca1194.png"
              alt="Neo Brand Logo"
              className="h-24 mx-auto mb-4 animate-float"
            />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold mb-5 tracking-tight leading-[1.22] drop-shadow-lg"
          >
            <span className="bg-gradient-to-r from-white via-electric-300 to-electric-500 bg-clip-text text-transparent">
              Fast, Collaborative, AI-native&nbsp;
            </span>
            Project Management
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 mb-8 font-medium"
          >
            Supercharge your workflow with lightning-fast project management, designed for real estate teams.<br />
            Intuitive. Collaborative. Powered by AI.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button 
              size="lg" 
              className="hover:bg-electric-300 hover-scale transition-all px-8 text-lg font-semibold rounded-full flex items-center gap-2 shadow-electric-glow"
              style={{ background: "#00D4FF", color: "#000033", boxShadow: "0 4px 18px rgba(0, 212, 255, 0.4)"}}
              onClick={scrollToContact}
            >
              <Mail size={18} />
              Get in Touch
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-electric-300/30 hover:bg-white/5 hover-scale transition-all px-8 text-lg font-semibold rounded-full flex items-center gap-2 hover:shadow-electric-glow"
              style={{ color: "#e6efff", borderColor: "#00D4FF50" }}
            >
              <Download size={18} />
              Download Resume
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Geometric overlay for added depth */}
      <div className="absolute inset-0 geometric-overlay opacity-10 pointer-events-none"></div>
    </div>
  );
};

export default Hero;
