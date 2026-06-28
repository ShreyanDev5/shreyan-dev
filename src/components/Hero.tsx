import { useState, useEffect, memo, type FC } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import ResumeModal from "./ResumeModal";
import TerminalMockup from "./TerminalMockup";

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

  return (
    <div className="relative w-full min-h-[85vh] sm:min-h-screen lg:min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Static base gradient for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 80%, rgba(16, 185, 129, 0.03), transparent 60%)`,
        }}
      />
      {/* Ambient light orb that follows cursor */}
      <div
        className="absolute inset-0 pointer-events-none transition-all ease-out"
        style={{
          transitionDuration: "1200ms",
          background: `radial-gradient(${isMobile ? '600px 400px' : '900px 600px'} at ${mousePos.x}% ${mousePos.y}%, rgba(16, 185, 129, ${isMobile ? '0.06' : '0.08'}), transparent 60%)`,
          filter: 'blur(100px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-0 lg:pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 sm:gap-20 lg:gap-8 xl:gap-16 items-center max-w-6xl mx-auto">
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            {/* Name */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-[39px] sm:text-[48px] md:text-6xl lg:text-[60px] xl:text-[72px] font-bold tracking-tight text-white mb-2 sm:mb-3 leading-[1.1] text-center lg:text-left w-full"
            >
              Shreyan Sardar
            </motion.h1>

            {/* Role */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-[20px] sm:text-[22px] md:text-2xl lg:text-[24px] xl:text-[28px] font-semibold mb-1 sm:mb-1.5 tracking-tight bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent text-center lg:text-left w-full"
            >
              Backend Developer
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-[13px] sm:text-[15px] md:text-base lg:text-[15px] xl:text-[16px] text-gray-400 font-light mb-5 sm:mb-7 max-w-[34rem] leading-relaxed text-center lg:text-left mx-auto lg:mx-0"
            >
              CS graduate focused on backend systems, APIs, and databases. I use AI tools to build end-to-end applications.
            </motion.p>

            {/* CTAs: Mobile Centered, Desktop Left-aligned */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-row items-center justify-center lg:justify-start gap-3 w-full sm:w-auto"
            >
              <Button
                type="button"
                variant="outline"
                className="group flex-1 max-w-[130px] sm:max-w-none sm:w-[150px] rounded-full py-2 sm:py-2.5 h-9 sm:h-11 text-xs sm:text-sm font-medium border-1.75 border-white/30 text-white !bg-transparent hover:!bg-transparent hover:border-emerald-500/50 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center"
                onClick={() => setIsResumeModalOpen(true)}
              >
                <Download size={14} className="mr-1.5 text-white group-hover:text-emerald-400 transition-colors duration-300" />
                Resume
              </Button>
              <Button
                type="button"
                variant="outline"
                className="group flex-1 max-w-[130px] sm:max-w-none sm:w-[140px] rounded-full py-2 sm:py-2.5 h-9 sm:h-11 text-xs sm:text-sm font-medium border-1.75 border-white/30 text-white !bg-transparent hover:!bg-transparent hover:border-emerald-500/50 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center"
                onClick={scrollToContact}
              >
                <Mail size={14} className="mr-1.5 text-white group-hover:text-emerald-400 transition-colors duration-300" />
                Contact
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column: Terminal Emulator */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex lg:col-span-6 w-full items-center justify-end"
          >
            <div className="w-full max-w-[380px] sm:max-w-[410px] mx-auto lg:mx-0 lg:max-w-[365px] xl:max-w-[390px]">
              <TerminalMockup />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: [0, 1, 0], y: [0, 8, 0] }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-6 left-0 right-0 mx-auto w-fit z-10 flex flex-col items-center gap-1 pointer-events-none"
      >
        <span className="text-[9px] text-gray-500 tracking-[0.2em] mr-[-0.2em] uppercase font-normal select-none hidden sm:inline">
          Scroll
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 text-emerald-500/70"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
};

export default memo(Hero);
