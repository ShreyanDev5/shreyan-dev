import { memo, useRef, type FC } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { timeline } from "@/data/experience";

const JourneySection: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
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
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="journey">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/3 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10" ref={containerRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-9 sm:mb-11"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Journey
          </h2>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical scroll-progress Line */}
          <div className="absolute top-4 bottom-4 left-[20px] md:left-[160px] w-[2px] -translate-x-1/2 rounded-full bg-emerald-500/[0.08]">
            <motion.div
              style={{ height: progressHeight }}
              className="w-full rounded-full bg-gradient-to-b from-emerald-500 to-emerald-400 origin-top"
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-8 sm:space-y-10">
            {timeline.map((item, index) => (
              <div
                key={index}
                className="relative grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 md:gap-10 group/item"
              >
                {/* Desktop Period (Column 1) */}
                <div className="hidden md:block text-right pr-2 pt-[26px]">
                  <span className="text-xs font-semibold tracking-wider text-neutral-500 group-hover/item:text-neutral-300 transition-colors duration-300 uppercase">
                    {item.period.includes(" - ") ? (
                      <div className="flex flex-col items-end leading-tight">
                        <span>{item.period.split(" - ")[0]} &mdash;</span>
                        <span className="mt-1">{item.period.split(" - ")[1]}</span>
                      </div>
                    ) : (
                      item.period
                    )}
                  </span>
                </div>

                {/* Column 2: Content Card & Dot */}
                <div className="relative pl-10 md:pl-10 group">
                  {/* Glowing Concentric Node */}
                  <div className="absolute left-[20px] md:-left-[20px] top-[34px] md:top-[38px] z-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none h-6 w-6">
                    {/* Outer ring */}
                    <div className="absolute w-5 h-5 rounded-full border border-emerald-500/30 bg-emerald-500/5 group-hover/item:scale-115 group-hover/item:border-emerald-400/55 transition-all duration-300 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                    {/* Inner core */}
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-emerald-400 group-hover/item:bg-emerald-300 transition-all duration-300 shadow-[0_0_8px_rgba(52,211,153,0.5)] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>

                  {/* Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{ transition: "border-color 0.25s ease-out, background-color 0.25s ease-out, box-shadow 0.25s ease-out" }}
                    className="relative group/card overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.035] p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:border-emerald-500/25"
                  >
                    <h3 className="relative z-10 text-lg font-bold text-white tracking-tight">
                      {item.title}
                    </h3>

                    {/* Period (Mobile only) */}
                    <div className="md:hidden mt-1.5 mb-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-500 group-hover/card:text-neutral-300 transition-colors duration-300">
                      {item.period.includes(" - ") ? (
                        <span>{item.period.split(" - ")[0]} &mdash; {item.period.split(" - ")[1]}</span>
                      ) : (
                        <span>{item.period}</span>
                      )}
                    </div>

                    <p
                      className="relative z-10 mt-1 text-sm sm:text-[0.95rem] leading-relaxed text-gray-300/90 font-light"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(JourneySection);
