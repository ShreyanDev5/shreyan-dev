
import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import ParticleBackground from "./ParticleBackground";

// Social proof companies (example)
const badges = [
  { name: "Acme Realty" },
  { name: "EstatePro" },
  { name: "NovaHomes" },
  { name: "BlueKey Partners" },
];

// Animated text headline (fade-up, color accent)
function TypoHeadline() {
  return (
    <div className="text-center animate-fade-in" style={{zIndex: 10}}>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-4xl md:text-6xl font-bold mb-5 tracking-tight md:leading-tight leading-[1.22] drop-shadow-lg"
        style={{ 
          textShadow: "0 2px 16px rgba(0,0,0,0.10)",
          fontFamily: "'Playfair Display', serif"
        }}
      >
        <span className="bg-gradient-to-r from-white via-blue-300 to-[#007BFF] bg-clip-text text-transparent">
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
    </div>
  );
}

// Social proof badges
function SocialProofBadges() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.6 }}
      className="mt-12 flex flex-wrap justify-center gap-6 md:gap-10 items-center"
    >
      <span className="text-lg text-white/70 mr-2 font-medium">TRUSTED BY</span>
      {badges.map((b, i) => (
        <motion.span
          key={b.name}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 + (i * 0.1) }}
          className="flex items-center bg-white/[0.14] text-gray-100 rounded-md px-4 py-2 text-base shadow hover-scale cursor-pointer transition-all"
          style={{
            border: "1px solid rgba(255,255,255,0.18)",
            boxShadow: "0 2px 22px -2px #91d6ff0f",
            fontWeight: 600,
            letterSpacing: "0.02em",
          }}
        >
          {b.name}
        </motion.span>
      ))}
    </motion.div>
  );
}

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-[680px] flex items-center justify-center" style={{overflow: "visible", zIndex: 1}}>
      {/* Particle background */}
      <ParticleBackground />
      
      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-4xl pt-36 pb-24 md:pt-44 md:pb-28 px-5 flex flex-col items-center">
        <TypoHeadline />
        <SocialProofBadges />
      </div>
    </div>
  );
};

export default Hero;
