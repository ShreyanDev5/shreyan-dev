import { memo, useRef, useState, type FC } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { timeline } from "@/data/experience";
import PdfModal from "./PdfModal";

const JourneySection: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 60%"],
  });

  const scrollY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progressHeight = useTransform(scrollY, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="journey">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/3 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10" ref={containerRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Journey
          </h2>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical scroll-progress Line - starts at first node (top-[12px]) and ends at last node (bottom-[12px]) */}
          <div className="absolute top-[12px] bottom-[12px] left-[16px] w-[2px] -translate-x-1/2 rounded-full bg-emerald-500/[0.12]">
            <motion.div
              style={{ height: progressHeight }}
              className="w-full rounded-full bg-gradient-to-b from-emerald-500 to-emerald-400 origin-top"
            />
          </div>

          {/* Timeline Items - Clean Single Column with Timeframe directly above content */}
          <div className="space-y-8 sm:space-y-9">
            {timeline.map((item, index) => (
              <div key={index} className="relative">
                {/* Concentric Node at center of line (left-[16px], top-[12px]) */}
                <div className="absolute left-[16px] top-[12px] z-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none h-6 w-6">
                  {/* Outer ring */}
                  <div className="absolute w-4 h-4 rounded-full border border-emerald-500/35 bg-emerald-500/10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                  {/* Inner core */}
                  <div className="absolute w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>

                {/* Content Block indented next to node */}
                <div className="relative pl-8 sm:pl-10">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="relative pt-0.5"
                    onClick={(e) => {
                      const target = e.target as HTMLElement;
                      if (target.tagName === 'A' && target.getAttribute('href') === '#certificate-alpha') {
                        e.preventDefault();
                        setIsCertModalOpen(true);
                      }
                    }}
                  >
                    {/* Timeframe - Positioned directly above description text */}
                    <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-emerald-400/90">
                      {item.period.replace(" - ", " \u2014 ")}
                    </div>

                    {/* Entry Description */}
                    <p
                      className="relative z-10 text-sm sm:text-base leading-relaxed text-neutral-300 font-light"
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
        title="Alpha Course (DSA with Java) Certificate"
        pdfPath="/Alpha_Course_Certificate.pdf"
        downloadName="Alpha_Course_Certificate.pdf"
        downloadLabel="Download Certificate"
        defaultZoom={56}
      />
    </section>
  );
};

export default memo(JourneySection);
