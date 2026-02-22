import { useState, useEffect, memo, type FC } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, Mail, ChevronDown } from "lucide-react";
import ResumeModal from "./ResumeModal";

const Hero: FC = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    const checkMobile = () => setIsMobile(window.innerWidth <= 640);
    checkMobile();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollDown = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Static base gradient for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 80%, rgba(16, 185, 129, 0.03), transparent 60%)`,
        }}
      />
      {/* Ambient light orb that follows cursor */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(${isMobile ? '800px 500px' : '1400px 900px'} at ${mousePos.x}% ${mousePos.y}%, rgba(16, 185, 129, ${isMobile ? '0.13' : '0.18'}), transparent 50%)`,
          filter: 'blur(80px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          {/* Available status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-sm text-gray-400 font-medium tracking-wide">
              Open to full-time roles
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4"
            style={{ lineHeight: 1.1 }}
          >
            Shreyan Sardar
          </motion.h1>

          {/* Role */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-400 font-light mb-4"
          >
            Backend Engineer · Java & Spring Boot
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-base sm:text-lg text-gray-500 font-light mb-10 max-w-lg mx-auto"
          >
            I engineer robust backends and harness cutting-edge AI to ship complete, production-grade products — solo.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="outline"
              size="lg"
              className="group rounded-full px-6 py-3 h-auto text-sm font-medium border-1.75 border-white/30 text-white !bg-transparent hover:!bg-transparent hover:border-emerald-500/50 transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => setIsResumeModalOpen(true)}
            >
              <Download size={16} className="mr-2 text-white group-hover:text-emerald-400 transition-colors duration-300" />
              See My Resume
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="group rounded-full px-6 py-3 h-auto text-sm font-medium border-1.75 border-white/30 text-white !bg-transparent hover:!bg-transparent hover:border-emerald-500/50 transition-all duration-300 transform hover:-translate-y-1"
              onClick={scrollToContact}
            >
              <Mail size={16} className="mr-2 text-white group-hover:text-emerald-400 transition-colors duration-300" />
              Get in Touch
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 hover:text-gray-300 transition-colors"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.button>

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
};

export default memo(Hero);
