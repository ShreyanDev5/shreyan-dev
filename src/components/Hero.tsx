import { useState, memo, type FC } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FileText, Mail } from "lucide-react";
import PdfModal from "./PdfModal";
import TerminalMockup from "./TerminalMockup";

const Hero: FC = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full min-h-[80vh] sm:min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-transparent">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12 sm:pt-16 sm:pb-16 lg:py-14">
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
              className="text-[28px] sm:text-[34px] md:text-[38px] lg:text-[40px] font-bold tracking-tight text-warm-100 whitespace-nowrap mb-1 sm:mb-1.5 leading-tight text-center lg:text-left w-full"
            >
              Shreyan Sardar
            </motion.h1>

            {/* Role */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="text-[16px] sm:text-[18px] md:text-[19px] font-semibold mb-1.5 sm:mb-2 tracking-tight bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent text-center lg:text-left w-full"
            >
              Product Engineer
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="text-[13px] sm:text-sm text-warm-300 font-normal mb-3.5 max-w-[24.5rem] leading-[1.45] text-center lg:text-left mx-auto lg:mx-0"
            >
              Building backend systems. Shipping end-to-end with AI agents. Exploring how the internet works from cables to code.
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
                className="group flex-1 max-w-[100px] sm:max-w-none sm:w-[106px] rounded-full py-1 h-7.5 sm:h-8 text-[11.5px] sm:text-xs font-mono font-medium tracking-wide border border-white/15 bg-white/[0.03] text-warm-100 hover:bg-warm-100 hover:text-black hover:border-warm-100 transition-all duration-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] flex items-center justify-center gap-1"
                onClick={() => setIsResumeModalOpen(true)}
              >
                <FileText size={12} className="mr-1 text-warm-200 group-hover:text-black transition-colors duration-200" />
                Resume
              </Button>
              <Button
                type="button"
                variant="outline"
                className="group flex-1 max-w-[100px] sm:max-w-none sm:w-[102px] rounded-full py-1 h-7.5 sm:h-8 text-[11.5px] sm:text-xs font-mono font-medium tracking-wide border border-white/15 bg-white/[0.03] text-warm-100 hover:bg-warm-100 hover:text-black hover:border-warm-100 transition-all duration-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] flex items-center justify-center gap-1"
                onClick={scrollToContact}
              >
                <Mail size={12} className="mr-1 text-warm-200 group-hover:text-black transition-colors duration-200" />
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
            <div className="relative w-full max-w-[19rem] sm:max-w-[350px] mx-auto lg:mx-0 lg:max-w-[370px] xl:max-w-[380px]">
              <TerminalMockup
                onOpenResume={() => setIsResumeModalOpen(true)}
                onOpenCertificate={() => setIsCertModalOpen(true)}
              />

              {/* Desktop: Positioned to the right with a long curvy handwritten arrow */}
              <div className="hidden lg:flex absolute left-[103%] xl:left-[105%] -bottom-5 xl:-bottom-4 flex-col items-start gap-0.5 select-none pointer-events-none">
                <svg
                  className="w-12 h-8 text-emerald-400 shrink-0 ml-0.5"
                  viewBox="0 0 46 30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M 36 28 C 28 18, 14 6, 2 3" />
                  <path d="M 1.8 9.5 L 1.2 1.5 L 9 1" />
                </svg>
                <span className="font-signature text-[18px] xl:text-[19px] text-warm-200 tracking-wide -rotate-2 whitespace-nowrap">
                  Click &amp; type &apos;help&apos;
                </span>
              </div>

              {/* Mobile & Tablet: Bottom-right with curvy upward-left arrow */}
              <div className="flex lg:hidden items-center justify-end gap-1 mt-2 sm:mt-2.5 pr-1 select-none pointer-events-none">
                <span className="font-signature text-[15.5px] sm:text-[17px] text-warm-300 tracking-wide -rotate-1">
                  Click &amp; type &apos;help&apos;
                </span>
                <svg
                  className="w-5 h-5 text-emerald-400 shrink-0 -translate-y-1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M 7 22 C 19 19, 16 7, 9.5 3.5" />
                  <path d="M 6 8.5 L 10.5 2 L 16 5.5" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <PdfModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        title="Resume"
        pdfPath="/Shreyan_Sardar_Resume.pdf"
        downloadName="Shreyan_Sardar_Resume.pdf"
        downloadLabel="Download PDF"
        newTabZoom={80}
      />

      <PdfModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        title="Alpha Course Certificate"
        pdfPath="/Alpha_Course_Certificate.pdf"
        downloadName="Alpha_Course_Certificate.pdf"
        downloadLabel="Download PDF"
        defaultZoom={65}
        newTabZoom={98}
      />
    </div>
  );
};

export default memo(Hero);
