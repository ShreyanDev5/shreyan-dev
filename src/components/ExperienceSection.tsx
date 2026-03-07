import { memo, useState, useRef, type FC } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { techCategories, timeline, type TimelineEntry } from "@/data/experience";
import ResumeModal from "./ResumeModal";

const ExperienceSection: FC = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"],
  });

  const scrollY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const progressHeight = useTransform(scrollY, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="experience">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            Experience
          </h2>
          <div className="w-12 h-[2.5px] bg-emerald-500 rounded-full mx-auto mb-6" />
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Skills and milestones that reflect my progression from Java backend development into modern systems and platform engineering.
          </p>
        </motion.div>

        {/* Tech Stack */}
        <div className="mb-20 grid gap-10 md:grid-cols-3 md:gap-8 max-w-4xl mx-auto">
          {techCategories.map((cat, categoryIndex) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <h3 className="text-sm md:text-base font-semibold text-emerald-500 uppercase tracking-widest mb-4">
                {cat.label}
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 text-sm md:text-base font-medium tracking-wide rounded-full bg-white/[0.03] text-gray-300 border border-white/[0.08] hover:bg-white/[0.08] hover:border-emerald-500/30 hover:text-emerald-400 transition-colors duration-300 cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div
          ref={containerRef}
          className="relative mb-24 max-w-4xl mx-auto overflow-hidden rounded-[28px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] px-4 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:px-6 sm:py-8 md:px-10 md:py-10"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.1),rgba(16,185,129,0.045)_28%,rgba(16,185,129,0.015)_52%,transparent_80%)]" />

          <div className="relative mb-6 md:mb-8">
            <span className="inline-flex rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-300">
              Milestones
            </span>
          </div>

          {/* Vertical Line */}
          <div className="absolute bottom-8 left-4 top-20 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-white/[0.12] via-white/[0.14] to-white/[0.05] shadow-[0_0_6px_rgba(16,185,129,0.025)] sm:left-6 md:bottom-10 md:left-1/2 md:top-24">
            <motion.div
              style={{ height: progressHeight }}
              className="w-full rounded-full bg-gradient-to-b from-emerald-300 via-emerald-500 to-emerald-500/70 shadow-[0_0_5px_rgba(16,185,129,0.1)]"
            />
          </div>

          <div className="relative space-y-8 sm:space-y-10 md:space-y-12">
            {timeline.map((item, index) => (
              <TimelineItem
                key={index}
                item={item}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Button
            variant="outline"
            className="group rounded-full px-6 py-3 h-auto text-sm font-medium border-1.75 border-white/30 text-white !bg-transparent hover:!bg-transparent hover:border-emerald-500/50 transition-all duration-300 transform hover:-translate-y-1"
            onClick={() => setIsResumeModalOpen(true)}
          >
            <Download size={16} className="mr-2 text-white group-hover:text-emerald-400 transition-colors duration-300" />
            Download Resume
          </Button>
        </motion.div>
      </div>

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </section>
  );
};

const TimelineItem = ({ item, index, isLeft }: { item: TimelineEntry, index: number, isLeft: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative flex items-start md:items-center md:justify-between ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

      {/* Timeline Node (Mobile: Left, Desktop: Center) */}
      <div className="absolute left-4 top-6 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-[#0a0a0a] bg-emerald-500 shadow-[0_0_0_6px_rgba(10,10,10,0.95)] sm:left-6 md:left-1/2" />

      <div className="absolute left-4 top-6 h-px w-7 -translate-y-1/2 bg-gradient-to-r from-emerald-500/45 to-white/0 sm:left-6 md:hidden" />


      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={`ml-12 md:ml-0 w-full md:w-[45%] ${isLeft ? 'md:text-right md:items-end' : 'md:text-left md:items-start'} flex flex-col`}
      >
        <div className="relative overflow-hidden rounded-[24px] border border-white/[0.1] bg-white/[0.04] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_16px_48px_rgba(0,0,0,0.2)] backdrop-blur-2xl backdrop-saturate-[180%] transition-all duration-300 hover:border-emerald-500/20 hover:bg-white/[0.06] sm:p-6">
          <div className={`mb-3 flex items-center gap-3 ${isLeft ? 'justify-between md:flex-row-reverse' : 'justify-between'}`}>
            <span className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-300">
              {item.period}
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/25">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            aria-expanded={isOpen}
            className={`flex w-full items-start gap-4 ${isLeft ? 'justify-between md:flex-row-reverse' : 'justify-between'} text-left`}
          >
            <h4 className="flex-1 text-base font-semibold leading-relaxed text-white sm:text-[1.15rem] sm:leading-8">
              {item.title}
            </h4>
            <span className="mt-0.5 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white/55 transition-colors duration-300">
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-300' : ''}`}
              />
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-4 border-t border-white/[0.08] pt-4">
                  <p className="text-sm leading-7 text-gray-300/85 sm:text-[15px]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Spacer for desktop alignment */}
      <div className="hidden md:block w-[45%]" />
    </div>
  )
}

export default memo(ExperienceSection);
