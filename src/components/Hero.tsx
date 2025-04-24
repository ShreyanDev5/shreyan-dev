import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import ParticleBackground from "./ParticleBackground";

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-[680px] flex items-center justify-center bg-hero-pattern">
      {/* Particle background */}
      <ParticleBackground />
      
      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-4xl pt-36 pb-24 md:pt-44 md:pb-28 px-5 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold mb-5 tracking-tight leading-[1.22] drop-shadow-lg font-playfair"
          >
            <span className="bg-gradient-to-r from-white via-emerald-300 to-emerald-500 bg-clip-text text-transparent">
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
              className="hover:bg-[#339DFF] hover-scale transition-all px-8 text-lg font-semibold rounded-full flex items-center gap-2"
              style={{ background: "#007BFF", color: "#fff", boxShadow: "0 4px 18px #007bff50"}}
            >
              <Mail size={18} />
              Get in Touch
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/10 hover:bg-white/5 hover-scale transition-all px-8 text-lg font-semibold rounded-full flex items-center gap-2"
              style={{ color: "#e6efff", borderColor: "#99c8fa" }}
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
