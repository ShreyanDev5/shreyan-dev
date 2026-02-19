import React, { memo, useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Download, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResumeModal from "./ResumeModal";

const techCategories = [
  {
    label: "Backend",
    items: ["Java", "Spring Boot", "MySQL", "JDBC", "REST APIs"],
  },
  {
    label: "Frontend",
    items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "HTML/CSS"],
  },
  {
    label: "Tools",
    items: ["Git", "GitHub", "VS Code", "IntelliJ IDEA", "Postman"],
  },
];

const timeline = [
  {
    year: "2023",
    title: "Frontend & Modern Tooling",
    description: "Learned React, TypeScript, and modern web development workflows.",
  },
  {
    year: "2023",
    title: "Java & Backend Foundations",
    description: "Built Student Management System with Java, MySQL, and JDBC.",
  },
  {
    year: "2024",
    title: "Client Project — WealthWise",
    description: "Delivered a financial advisory web app with Next.js for a real client.",
  },
  {
    year: "2024",
    title: "Full-Stack Development",
    description: "Built SpringMart e-commerce platform with Spring Boot backend and React frontend.",
  },
];

const ADVENTURE_PATH = "M 50,580 C 80,540 180,520 220,480 S 120,420 100,380 S 200,320 240,280 S 140,220 100,180 S 180,120 220,80 S 160,40 180,20";

const milestonePositions = [
  { cx: 50, cy: 580 },
  { cx: 220, cy: 480 },
  { cx: 100, cy: 380 },
  { cx: 240, cy: 280 },
  { cx: 100, cy: 180 },
  { cx: 180, cy: 20 },
];

const ExperienceSection: React.FC = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const pathRef = useRef(null);
  const isInView = useInView(pathRef, { once: true, amount: 0.2 });
  const scrollContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start end", "end start"],
  });
  const pathLength = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8" id="experience">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-3 tracking-[-0.02em]">
            Experience
          </h2>
          <div className="w-12 h-0.5 bg-emerald-500 rounded-full mx-auto mb-6" />
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto font-light">
            Technologies I work with and the journey so far.
          </p>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-20 space-y-10"
        >
          {techCategories.map((cat) => (
            <div key={cat.label}>
              <h3 className="text-[11px] font-medium text-gray-500 uppercase tracking-[0.2em] mb-3">
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item, idx) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.03, duration: 0.3 }}
                    className="px-4 py-2 text-sm font-medium rounded-full backdrop-blur-sm bg-white/[0.03] text-gray-300 border border-white/[0.08] hover:bg-white/[0.06] hover:border-emerald-500/20 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:text-white transition-all duration-200"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Adventure Path Timeline */}
        <div ref={scrollContainerRef} className="mb-16 relative">
          {/* Background accent */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 50%, rgba(16, 185, 129, 0.02), transparent 70%)",
            }}
          />

          {/* Desktop */}
          <div className="hidden md:block relative" ref={pathRef}>
            <div className="relative" style={{ height: 640 }}>
              <svg
                viewBox="0 0 300 600"
                className="absolute left-1/2 -translate-x-1/2 h-full"
                style={{ width: 300 }}
                fill="none"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d={ADVENTURE_PATH}
                  stroke="rgba(16, 185, 129, 0.06)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
                <motion.path
                  d={ADVENTURE_PATH}
                  stroke="rgba(16, 185, 129, 0.4)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="6 8"
                  fill="none"
                  style={{ pathLength }}
                />
                {milestonePositions.map((pos, i) => {
                  const isEndpoint = i === 0 || i === milestonePositions.length - 1;
                  return (
                    <React.Fragment key={i}>
                      {/* Glow ring */}
                      <motion.circle
                        cx={pos.cx}
                        cy={pos.cy}
                        r={isEndpoint ? 12 : 10}
                        fill="rgba(16, 185, 129, 0.15)"
                        filter="url(#glow)"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                      />
                      <motion.circle
                        cx={pos.cx}
                        cy={pos.cy}
                        r={isEndpoint ? 6 : 5}
                        fill={isEndpoint ? "#10B981" : "#0a0a0a"}
                        stroke="#10B981"
                        strokeWidth="2"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
                      />
                    </React.Fragment>
                  );
                })}
                <defs>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                  </filter>
                </defs>
              </svg>

              {/* Start label */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.2 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8"
              >
                <span className="text-xs font-medium text-emerald-500/70 uppercase tracking-widest whitespace-nowrap">
                  First Line of Code
                </span>
              </motion.div>

              {/* End label */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8"
              >
                <span className="text-xs font-medium text-emerald-500 uppercase tracking-widest">
                  Present
                </span>
              </motion.div>

              {/* Timeline cards */}
              {timeline.map((item, i) => {
                const isLeft = i % 2 === 0;
                const topPercent = [75, 55, 38, 22][i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
                    className="absolute w-[220px]"
                    style={{
                      top: `${topPercent}%`,
                      ...(isLeft
                        ? { right: "calc(50% + 80px)" }
                        : { left: "calc(50% + 80px)" }),
                    }}
                  >
                    <div
                      className={`bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 ${isLeft ? "text-right" : "text-left"
                        }`}
                    >
                      <span className="inline-block bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full text-[10px] font-medium">
                        {item.year}
                      </span>
                      <h4 className="text-white font-medium text-[15px] mt-1.5">{item.title}</h4>
                      <p className="text-gray-500 text-[13px] leading-relaxed mt-1">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden">
            <div className="relative">
              {/* Gradient fade line */}
              <div
                className="absolute left-4 top-0 bottom-0 w-px"
                style={{
                  background: "linear-gradient(to bottom, transparent, rgba(16, 185, 129, 0.3) 15%, rgba(16, 185, 129, 0.3) 85%, transparent)",
                }}
              />

              <div className="relative pl-10 pb-6">
                <div className="absolute left-[11px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                <span className="text-xs font-medium text-emerald-500/70 uppercase tracking-widest">
                  First Line of Code
                </span>
              </div>

              <div className="space-y-4">
                {timeline.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="relative pl-10"
                  >
                    <div className="absolute left-[11px] top-4 w-2 h-2 rounded-full bg-emerald-500/60 ring-4 ring-[#0a0a0a] shadow-[0_0_6px_rgba(16,185,129,0.3)]" />
                    <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3">
                      <span className="inline-block bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full text-[10px] font-medium">
                        {item.year}
                      </span>
                      <h4 className="text-white font-medium text-[15px] mt-1.5">{item.title}</h4>
                      <p className="text-gray-500 text-[13px] leading-relaxed mt-1">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="relative pl-10 pt-6">
                <div className="absolute left-[11px] top-7 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                <span className="text-xs font-medium text-emerald-500 uppercase tracking-widest">
                  Present
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Download Resume CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <Button
            variant="outline"
            className="group rounded-full px-6 py-3 h-auto text-sm font-medium border-white/10 text-white hover:bg-transparent hover:border-emerald-500/50 transition-all duration-300 transform hover:-translate-y-1"
            onClick={() => setIsResumeModalOpen(true)}
          >
            <Download size={14} className="mr-2 text-white group-hover:text-emerald-400 transition-colors duration-300" />
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

export default memo(ExperienceSection);
