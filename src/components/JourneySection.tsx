import { memo, useRef, useState, type FC } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { timeline } from "@/data/experience";
import PdfModal from "./PdfModal";

const JourneySection: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 75%"],
  });

  const scrollY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    restDelta: 0.001,
  });

  const progressHeight = useTransform(scrollY, [0, 0.88], ["0%", "100%"]);

  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="journey">
      <div className="max-w-2xl mx-auto relative z-10" ref={containerRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-[28px] md:text-[30px] font-bold text-warm-100 tracking-tight">
            <span className="font-mono text-warm-600 text-lg sm:text-xl font-medium mr-2.5 select-none opacity-90">05 //</span>Journey
          </h2>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative w-full max-w-[19rem] sm:max-w-none mx-auto" ref={timelineRef}>
          {/* Vertical scroll-progress Line - starts at first node (top-[12px]) and ends at last node (bottom-[12px]) */}
          <div className="absolute top-[12px] bottom-[12px] left-[16px] w-[2px] -translate-x-1/2 rounded-full bg-emerald-500/[0.12]">
            <motion.div
              style={{ height: progressHeight }}
              className="w-full rounded-full bg-gradient-to-b from-emerald-500 to-emerald-400 origin-top"
            />
          </div>

          {/* Timeline Items - Clean Single Column with Timeframe directly above content */}
          <div className="space-y-6 sm:space-y-7">
            {timeline.map((item, index) => (
              <div key={index} className="relative">
                {/* Concentric Node at center of line (left-[16px], top-[12px]) */}
                <div className="absolute left-[16px] top-[12px] z-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none h-6 w-6">
                  {index === 0 ? (
                    <div className="relative flex h-3.5 w-3.5 items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                    </div>
                  ) : (
                    <>
                      {/* Outer ring */}
                      <div className="absolute w-4 h-4 rounded-full border border-emerald-500/35 bg-emerald-500/10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                      {/* Inner core */}
                      <div className="absolute w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </>
                  )}
                </div>

                {/* Content Block indented next to node */}
                <div className="relative pl-8 sm:pl-10">
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="relative pt-0.5"
                    onClick={(e) => {
                      const anchor = (e.target as HTMLElement).closest('a');
                      if (anchor && anchor.getAttribute('href') === '#certificate-alpha') {
                        e.preventDefault();
                        setIsCertModalOpen(true);
                      }
                    }}
                  >
                    {/* Timeframe - Positioned directly above description text */}
                    <div className="mb-0.5 text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400/90">
                      {item.period.replace(" - ", " \u2014 ")}
                    </div>

                    {/* Entry Description */}
                    <p
                      className="relative z-10 text-[13px] sm:text-sm leading-[1.45] text-warm-300 font-normal"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
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
    </section>
  );
};

export default memo(JourneySection);
