import { memo, useState, useRef, type FC } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronDown, Code2, Download, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { techCategories, timeline, type TechIconKey, type TimelineEntry } from "@/data/experience";
import ResumeModal from "./ResumeModal";
import {
  SiApachemaven,
  SiDocker,
  SiGit,
  SiHibernate,
  SiJunit5,
  SiJson,
  SiMysql,
  SiOpenapiinitiative,
  SiOpenjdk,
  SiPostgresql,
  SiPostman,
  SiRedis,
  SiSpringboot,
} from "react-icons/si";
import {
  BookOpen,
  Boxes,
  Cloud,
  Database,
  GitBranch,
  Layers3,
  MessageSquareMore,
  Radar,
  ServerCog,
  ShieldCheck,
  TestTube2,
  Workflow,
} from "lucide-react";

const TECH_ICON_MAP: Record<TechIconKey, LucideIcon | React.ComponentType<{ className?: string; size?: number; "aria-hidden"?: boolean }>> = {
  openjdk: SiOpenjdk,
  springboot: SiSpringboot,
  mysql: SiMysql,
  postgresql: SiPostgresql,
  hibernate: SiHibernate,
  openapi: SiOpenapiinitiative,
  junit5: SiJunit5,
  postman: SiPostman,
  code: Code2,
  json: SiJson,
  redis: SiRedis,
  docker: SiDocker,
  maven: SiApachemaven,
  git: SiGit,
  lombok: Code2,
  "system-design": Layers3,
  swagger: BookOpen,
  testcontainers: Boxes,
  messaging: MessageSquareMore,
  cicd: Workflow,
  kubernetes: ServerCog,
  cloud: Cloud,
  observability: Radar,
};

const CATEGORY_META: Record<string, { note: string; shell: string; accent: string; chip: string; iconRing: string; iconTone: string; titleTone: string }> = {
  "Backend Core": {
    note: "Core backend tools I use most.",
    shell: "border-white/10 bg-white/[0.03]",
    accent: "bg-emerald-400/80",
    chip: "border-white/10 bg-white/[0.025] text-gray-200 hover:border-white/15 hover:bg-white/[0.045] hover:text-white",
    iconRing: "border-white/10 bg-white/[0.04]",
    iconTone: "text-gray-200",
    titleTone: "text-emerald-300",
  },
  "Quality & APIs": {
    note: "Testing and API tooling.",
    shell: "border-white/10 bg-white/[0.03]",
    accent: "bg-sky-400/80",
    chip: "border-white/10 bg-white/[0.025] text-gray-200 hover:border-white/15 hover:bg-white/[0.045] hover:text-white",
    iconRing: "border-white/10 bg-white/[0.04]",
    iconTone: "text-gray-200",
    titleTone: "text-sky-300",
  },
  "DevOps & Infrastructure": {
    note: "Delivery and infrastructure basics.",
    shell: "border-white/10 bg-white/[0.03]",
    accent: "bg-amber-400/80",
    chip: "border-white/10 bg-white/[0.025] text-gray-200 hover:border-white/15 hover:bg-white/[0.045] hover:text-white",
    iconRing: "border-white/10 bg-white/[0.04]",
    iconTone: "text-gray-200",
    titleTone: "text-amber-300",
  },
  "Conceptual Knowledge": {
    note: "Systems I’m still studying.",
    shell: "border-white/10 bg-white/[0.03]",
    accent: "bg-white/35",
    badge: "border-white/10 bg-white/5 text-gray-300",
    chip: "border-white/10 bg-white/[0.025] text-gray-300 hover:border-white/15 hover:bg-white/[0.045] hover:text-white",
    iconRing: "border-white/10 bg-white/5",
    iconTone: "text-gray-400",
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
            Most of this came from building, shipping, and fixing real projects.
          </p>
        </motion.div>

        {/* Tech Stack */}
        <div className="mb-16 sm:mb-20 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 max-w-4xl mx-auto">
          {techCategories.map((cat, categoryIndex) => {
            const meta = CATEGORY_META[cat.label] ?? CATEGORY_META["Conceptual Knowledge"];

            return (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.08, duration: 0.5 }}
              className={`group relative overflow-hidden rounded-[28px] border px-5 py-6 md:px-7 md:py-7 shadow-[0_20px_40px_-28px_rgba(0,0,0,0.7)] ${meta.shell}`}
            >
              <div className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] ${meta.accent}`} />
              <div className="relative flex flex-col items-center text-center">
                <h3 className={`text-sm sm:text-base md:text-base font-semibold uppercase tracking-[0.14em] ${meta.titleTone}`}>
                  {cat.label}
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-400 sm:text-[0.95rem] max-w-[24ch]">
                  {meta.note}
                </p>
              </div>

              <div className="relative mt-5 flex flex-wrap justify-center gap-2.5">
                {cat.items.map((item) => (
                  <span
                    key={item.name}
                    className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium tracking-[0.01em] transition-all duration-300 cursor-default ${meta.chip}`}
                  >
                    <span className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border ${meta.iconRing}`}>
                      {item.iconKey ? (
                        (() => {
                          const Icon = TECH_ICON_MAP[item.iconKey];
                          return <Icon size={13} aria-hidden="true" className={`${meta.iconTone} flex-shrink-0 opacity-90`} />;
                        })()
                      ) : (
                        <span className={`h-1.5 w-1.5 rounded-full ${meta.iconTone.replace("text-", "bg-")}`} />
                      )}
                    </span>
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
          <div className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.1),rgba(16,185,129,0.045)_28%,rgba(16,185,129,0.015)_52%,transparent_80%)]" />

          <div className="relative mb-5 sm:mb-6 md:mb-8">
            <span className="inline-flex rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-300">
              How I got here
            </span>
          </div>

          {/* Vertical Line */}
          <div className="absolute bottom-8 left-[30px] top-20 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-white/[0.12] via-white/[0.14] to-white/[0.05] shadow-[0_0_6px_rgba(16,185,129,0.025)] sm:left-12 md:bottom-10 md:left-1/2 md:top-24">
            <motion.div
              style={{ height: progressHeight }}
              className="w-full rounded-full bg-gradient-to-b from-emerald-300 via-emerald-500 to-emerald-500/70 shadow-[0_0_5px_rgba(16,185,129,0.1)]"
            />
          </div>

          <div className="relative space-y-7 sm:space-y-10 md:space-y-12">
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

const TimelineItem = ({ item, index, isLeft }: { item: TimelineEntry, index: number, isLeft: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative flex items-start md:items-center md:justify-between ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

      {/* Timeline Node (Mobile: Left, Desktop: Center) */}
      <div className="absolute left-[14px] top-6 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-[#0a0a0a] bg-emerald-500 shadow-[0_0_0_6px_rgba(10,10,10,0.95)] sm:left-6 md:left-1/2" />

      <div className="absolute left-[14px] top-[31px] h-px w-6 bg-gradient-to-r from-emerald-500/55 to-white/0 sm:left-6 md:hidden" />


      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={`ml-9 sm:ml-12 md:ml-0 w-full md:w-[45%] ${isLeft ? 'md:text-right md:items-end' : 'md:text-left md:items-start'} flex flex-col`}
      >
        <div className="relative overflow-hidden rounded-[24px] border border-white/[0.1] bg-white/[0.04] p-4 sm:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_16px_48px_rgba(0,0,0,0.2)] backdrop-blur-2xl backdrop-saturate-[180%] transition-all duration-300 hover:border-emerald-500/20 hover:bg-white/[0.06]">
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
            <h4 className="flex-1 text-base font-semibold leading-relaxed text-white sm:text-[1.1rem] sm:leading-7">
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
