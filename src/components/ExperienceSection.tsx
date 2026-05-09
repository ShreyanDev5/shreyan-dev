import { memo, useState, useRef, type FC } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { techCategories, timeline, type TimelineEntry } from "@/data/experience";
import ResumeModal from "./ResumeModal";

const CATEGORY_META: Record<string, { shell: string; leftBorder: string; gradientOverlay: string; hoverBorder: string; chip: string; titleTone: string }> = {
  "Languages & Frameworks": {
    shell: "border-white/10 bg-white/[0.03]",
    leftBorder: "border-l-emerald-500/60",
    gradientOverlay: "bg-[radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.02),rgba(16,185,129,0)_70%)]",
    hoverBorder: "hover:border-l-emerald-500/90",
    chip: "border-white/10 bg-white/[0.025] text-gray-200 hover:border-white/15 hover:bg-white/[0.045] hover:text-white",
    titleTone: "text-emerald-300",
  },
  "Databases & Backend": {
    shell: "border-white/10 bg-white/[0.03]",
    leftBorder: "border-l-amber-400/70",
    gradientOverlay: "bg-[radial-gradient(ellipse_at_bottom_right,rgba(245,158,11,0.035),rgba(245,158,11,0)_70%)]",
    hoverBorder: "hover:border-l-amber-400/100",
    chip: "border-white/10 bg-white/[0.025] text-gray-200 hover:border-white/15 hover:bg-white/[0.045] hover:text-white",
    titleTone: "text-amber-300",
  },
  "Tools & Infrastructure": {
    shell: "border-white/10 bg-white/[0.03]",
    leftBorder: "border-l-sky-500/60",
    gradientOverlay: "bg-[radial-gradient(ellipse_at_bottom_right,rgba(56,189,248,0.02),rgba(56,189,248,0)_70%)]",
    hoverBorder: "hover:border-l-sky-500/90",
    chip: "border-white/10 bg-white/[0.025] text-gray-200 hover:border-white/15 hover:bg-white/[0.045] hover:text-white",
    titleTone: "text-sky-300",
  },
  "Familiar With": {
    shell: "border-white/10 bg-white/[0.03]",
    leftBorder: "border-l-white/50",
    gradientOverlay: "bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.015),rgba(255,255,255,0)_70%)]",
    hoverBorder: "hover:border-l-white/70",
    chip: "border-white/10 bg-white/[0.025] text-gray-300 hover:border-white/15 hover:bg-white/[0.045] hover:text-white",
    titleTone: "text-gray-300",
  },
};

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
            Technologies learned the hard way: through continuous iteration and hands-on building.
          </p>
        </motion.div>

        {/* Tech Stack */}
        <div className="mb-16 sm:mb-20 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto">
          {techCategories.map((cat, categoryIndex) => {
            const meta = CATEGORY_META[cat.label] ?? CATEGORY_META["Familiar With"];
            const isWide = categoryIndex === 0 || categoryIndex === 3;

            return (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.07, duration: 0.45 }}
                className={`group relative overflow-hidden rounded-2xl border-t border-r border-b border-l-[2.5px] px-5 py-5 md:px-6 md:py-6 will-change-transform shadow-[0_12px_32px_-20px_rgba(0,0,0,0.6)] ${isWide ? "sm:col-span-2" : ""} ${meta.shell} ${meta.leftBorder} ${meta.hoverBorder}`}
                style={{ transition: "border-color 0.2s cubic-bezier(0.22,1,0.36,1), background-color 0.2s cubic-bezier(0.22,1,0.36,1), box-shadow 0.2s cubic-bezier(0.22,1,0.36,1)" }}
              >
                <div className={`pointer-events-none absolute inset-0 rounded-2xl ${meta.gradientOverlay}`} />
                <div className="relative flex flex-col items-center text-center">
                  <h3 className={`text-base sm:text-[1.06rem] font-semibold uppercase tracking-[0.15em] ${meta.titleTone}`}>
                    {cat.label}
                  </h3>
                </div>

                <div className="relative mt-5 flex flex-wrap justify-center gap-2.5 sm:gap-3">
                  {cat.items.map((item) => (
                    <span
                      key={item.name}
                      className={`inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-[0.96rem] font-medium leading-none tracking-[0.01em] cursor-default ${meta.chip}`}
                      style={{ transition: "border-color 0.15s ease, background-color 0.15s ease, color 0.15s ease" }}
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Timeline */}
        <div
          ref={containerRef}
          className="relative mb-24 max-w-4xl mx-auto overflow-hidden rounded-[28px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] px-4 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:px-6 sm:py-8 md:px-10 md:py-10"
        >


          <div className="relative mb-6 sm:mb-7 md:mb-9 text-center">
            <span className="inline-flex rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-gray-300">
              My Journey So Far
            </span>
          </div>

          {/* Vertical Line */}
          <div className="absolute bottom-8 left-[30px] top-20 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-white/[0.06] via-white/[0.08] to-white/[0.03] sm:left-12 md:bottom-10 md:left-1/2 md:top-24">
            <motion.div
              style={{ height: progressHeight }}
              className="w-full rounded-full bg-gradient-to-b from-white/40 via-white/25 to-white/15"
            />
          </div>

          <div className="relative space-y-7 sm:space-y-10 md:space-y-12">
            {timeline.map((item, index) => (
              <TimelineItem
                key={index}
                item={item}
                index={index}
                isLeft={index % 2 === 0}
                colorIndex={index % 3}
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
            Resume
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

const ACCENT_COLORS = [
  { badge: "border-emerald-400/20 bg-emerald-500/10 text-emerald-200/90" },
  { badge: "border-sky-400/20 bg-sky-500/10 text-sky-200/90" },
  { badge: "border-amber-400/20 bg-amber-500/10 text-amber-200/90" },
];

const TimelineItem = ({ item, index, isLeft, colorIndex }: { item: TimelineEntry, index: number, isLeft: boolean, colorIndex: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const accent = ACCENT_COLORS[colorIndex];

  return (
    <div className={`relative flex items-start md:items-center md:justify-between ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

      {/* Timeline Node */}
      <div className="absolute left-[14px] top-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[#0a0a0a] bg-white/70 shadow-[0_0_0_5px_rgba(10,10,10,0.95)] sm:left-6 md:left-1/2" />

      <div className="absolute left-[14px] top-[29px] h-px w-5 bg-gradient-to-r from-white/15 to-white/0 sm:left-6 md:hidden" />

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        whileHover={{ y: -2, transition: { type: "spring", stiffness: 400, damping: 25 } }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4, delay: index * 0.06 }}
        className={`ml-9 sm:ml-12 md:ml-0 w-full md:w-[45%] ${isLeft ? 'md:text-right md:items-end' : 'md:text-left md:items-start'} flex flex-col`}
      >
        <div
          className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-2xl will-change-transform hover:border-white/[0.14]"
          style={{ transition: "border-color 0.2s cubic-bezier(0.22,1,0.36,1), background-color 0.2s cubic-bezier(0.22,1,0.36,1)" }}
        >
          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            aria-expanded={isOpen}
            className="flex w-full items-start gap-3 text-left"
          >
            <div className={`flex-1 flex flex-col ${isLeft ? 'md:items-end' : 'md:items-start'}`}>
              <span className={`inline-flex self-start rounded-full border px-2.5 py-[3px] text-[10px] font-semibold uppercase tracking-[0.18em] mb-3 ${accent.badge} ${isLeft ? 'md:self-end' : 'md:self-start'}`}>
                {item.period}
              </span>
              <h4 className="text-base font-semibold leading-snug text-white sm:text-[1.12rem]">
                {item.title}
              </h4>
            </div>
            <span
              className="mt-1 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.03] text-white/40 hover:bg-white/[0.06] hover:text-white/60"
              style={{ transition: "background-color 0.15s ease, color 0.15s ease" }}
            >
              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'rotate-180 text-white/70' : ''}`}
              />
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.2, delay: 0.05 },
                }}
                className="overflow-hidden"
              >
                <div className="mt-4 border-t border-white/[0.06] pt-4">
                  <p className={`text-[0.9rem] leading-relaxed text-gray-400 sm:text-[0.94rem] ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
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
