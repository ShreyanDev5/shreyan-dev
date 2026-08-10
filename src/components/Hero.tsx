import { useState, useEffect, memo, type FC } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FileText, Mail } from "lucide-react";
import PdfModal from "./PdfModal";
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-8 items-center max-w-2xl mx-auto">
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="lg:col-span-6 text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            {/* Name */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05, duration: 0.3 }}
              className="text-[28px] sm:text-[34px] md:text-[38px] lg:text-[40px] font-bold tracking-tight text-white whitespace-nowrap mb-0 leading-tight text-center lg:text-left w-full"
            >
              Shreyan Sardar
            </motion.h1>

            {/* Role */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="text-[16px] sm:text-[18px] md:text-[19px] font-semibold mb-1 sm:mb-1.5 tracking-tight bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent text-center lg:text-left w-full"
            >
              Product Engineer
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="text-[12.5px] sm:text-[13.5px] text-gray-400/90 font-light mb-3.5 max-w-[24.5rem] leading-[1.4] text-center lg:text-left mx-auto lg:mx-0"
            >
              CS graduate building backend systems, APIs, and databases. I use Antigravity to write frontends and ship full-stack apps end-to-end.
            </motion.p>

            {/* CTAs: Mobile Centered, Desktop Left-aligned */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="flex flex-row items-center justify-center lg:justify-start gap-2.5 w-full sm:w-auto"
            >
              <Button
                type="button"
                variant="outline"
                className="group flex-1 max-w-[108px] sm:max-w-none sm:w-[116px] rounded-full py-1.5 h-8 sm:h-9 text-xs font-medium tracking-wide border border-white/15 bg-transparent text-white hover:bg-white hover:text-black hover:border-white transition-all duration-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] flex items-center justify-center gap-1"
                onClick={() => setIsResumeModalOpen(true)}
              >
                <FileText size={13} className="mr-1 text-white group-hover:text-black transition-colors duration-200" />
                Resume
              </Button>
              <Button
                type="button"
                variant="outline"
                className="group flex-1 max-w-[108px] sm:max-w-none sm:w-[112px] rounded-full py-1.5 h-8 sm:h-9 text-xs font-medium tracking-wide border border-white/15 bg-transparent text-white hover:bg-white hover:text-black hover:border-white transition-all duration-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] flex items-center justify-center gap-1"
                onClick={scrollToContact}
              >
                <Mail size={13} className="mr-1 text-white group-hover:text-black transition-colors duration-200" />
                Contact
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column: Terminal Emulator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="flex lg:col-span-6 w-full items-center justify-center lg:justify-end mt-6 sm:mt-7 lg:mt-0"
          >
            <div className="w-full max-w-[285px] sm:max-w-[310px] mx-auto lg:mx-0 lg:max-w-[310px] xl:max-w-[315px]">
              <TerminalMockup onOpenResume={() => setIsResumeModalOpen(true)} />
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

      <PdfModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        title="Resume"
        pdfPath="/Shreyan_Sardar_Resume.pdf"
        downloadName="Shreyan_Sardar_Resume.pdf"
        downloadLabel="Download Resume"
      />
    </div>
  );
};

export default memo(Hero);
