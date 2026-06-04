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
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
            Journey
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto font-light leading-snug">
            A timeline of my growth
          </p>
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
          <div className="space-y-10 sm:space-y-12">
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
                        <span>{item.period.split(" - ")[0]} —</span>
                        <span className="mt-1">{item.period.split(" - ")[1]}</span>
                      </div>
                    ) : (
                      item.period
                    )}
                  </span>
                </div>

                {/* Column 2: Content Card & Dot */}
                <div className="relative pl-10 md:pl-10 group">
                  {/* Glowing Node/Dot */}
                  <div className="absolute left-[20px] md:-left-[20px] top-[28px] md:top-[32px] z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-emerald-400 transition-all duration-300 group-hover:scale-125 group-hover:bg-emerald-300" />

                  {/* Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -3, transition: { type: "spring", stiffness: 350, damping: 25 } }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{ transition: "border-color 0.25s ease-out, background-color 0.25s ease-out, box-shadow 0.25s ease-out" }}
                    className="relative group/card overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.015] hover:bg-emerald-950/[0.08] p-5 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.15)] backdrop-blur-md hover:border-emerald-500/20 hover:shadow-[0_12px_30px_-15px_rgba(16,185,129,0.04)]"
                  >
                    {/* Inner glowing hover gradient */}
                    <div className="absolute -inset-px bg-emerald-500/[0.05] opacity-0 group-hover:opacity-100 rounded-2xl blur-sm transition-opacity duration-500 pointer-events-none" />

                    <h3 className="relative z-10 text-lg font-bold text-white tracking-tight">
                      {item.title}
                    </h3>

                    {/* Period (Mobile only) */}
                    <div className="md:hidden mt-1.5 mb-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-500 group-hover/card:text-neutral-300 transition-colors duration-300">
                      {item.period.includes(" - ") ? (
                        <span>{item.period.split(" - ")[0]} — {item.period.split(" - ")[1]}</span>
                      ) : (
                        <span>{item.period}</span>
                      )}
                    </div>

                    <p 
                      className="relative z-10 text-sm sm:text-[0.95rem] leading-relaxed text-gray-400 font-light"
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
