import { useState, useEffect, memo, type FC } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, Mail, ChevronDown } from "lucide-react";
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
        className="absolute inset-0 pointer-events-none transition-all ease-out"
        style={{
          transitionDuration: "1200ms",
          background: `radial-gradient(${isMobile ? '600px 400px' : '900px 600px'} at ${mousePos.x}% ${mousePos.y}%, rgba(16, 185, 129, ${isMobile ? '0.06' : '0.08'}), transparent 60%)`,
          filter: 'blur(100px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-0 lg:pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-2 items-center max-w-6xl mx-auto">
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            {/* Available status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex max-w-full items-center gap-1.5 sm:gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 sm:px-3.5 sm:py-1.5 mb-3.5 sm:mb-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:bg-white/[0.05] transition-colors duration-300"
            >
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500" />
              </span>
              <span className="text-xs sm:text-[13px] text-gray-300 font-medium tracking-wide">
                Open to remote backend roles
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-[39px] sm:text-[48px] md:text-6xl lg:text-[60px] xl:text-[72px] font-bold tracking-tight text-white mb-2 sm:mb-3 leading-[1.1] text-center lg:text-left w-full"
            >
              Shreyan Sardar
            </motion.h1>

            {/* Role */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-[20px] sm:text-[22px] md:text-2xl lg:text-[24px] xl:text-[28px] font-semibold mb-0.5 sm:mb-1 tracking-tight bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent text-center lg:text-left w-full"
            >
              Backend Developer
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-[13px] sm:text-[15px] md:text-base lg:text-[15px] xl:text-[16px] text-gray-400 font-light mb-5 sm:mb-8 max-w-[34rem] leading-relaxed text-center lg:text-left mx-auto lg:mx-0"
            >
              CS graduate focused on backend systems, APIs, and databases. I leverage AI tools to build end-to-end applications.
            </motion.p>

            {/* CTAs: Mobile Centered, Desktop Left-aligned */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-row items-center justify-center lg:justify-start gap-3 w-full sm:w-auto"
            >
              <Button
                variant="outline"
                className="group flex-1 max-w-[130px] sm:max-w-none sm:w-[150px] rounded-full py-2 sm:py-2.5 h-9 sm:h-11 text-xs sm:text-sm font-medium border-1.75 border-white/30 text-white !bg-transparent hover:!bg-transparent hover:border-emerald-500/50 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center"
                onClick={() => setIsResumeModalOpen(true)}
              >
                <Download size={14} className="mr-1.5 text-white group-hover:text-emerald-400 transition-colors duration-300" />
                Resume
              </Button>
              <Button
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
            className="lg:col-span-5 w-full flex items-center justify-center lg:justify-end"
          >
            <div className="w-full max-w-[390px] sm:max-w-[430px] mx-auto lg:mx-0 lg:max-w-[375px] xl:max-w-[400px]">
              <TerminalMockup />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 hover:text-gray-300 transition-colors"
        aria-label="Scroll to About"
      >
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
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
