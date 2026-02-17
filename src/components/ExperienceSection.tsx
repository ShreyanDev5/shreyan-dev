import React, { memo, useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Download } from "lucide-react";
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

// Hand-drawn curved path SVG for desktop
const ADVENTURE_PATH = "M 50,580 C 80,540 180,520 220,480 S 120,420 100,380 S 200,320 240,280 S 140,220 100,180 S 180,120 220,80 S 160,40 180,20";

// Milestone positions along the path (approximate y-coordinates mapped to timeline entries)
const milestonePositions = [
  { cx: 50, cy: 580 },   // Start: First Line of Code
  { cx: 220, cy: 480 },  // 2023 - Frontend
  { cx: 100, cy: 380 },  // 2023 - Java
  { cx: 240, cy: 280 },  // 2024 - WealthWise
  { cx: 100, cy: 180 },  // 2024 - Full-Stack
  { cx: 180, cy: 20 },   // End: Present
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            Experience
          </h2>
          <div className="w-12 h-0.5 bg-emerald-500 rounded-full mx-auto mb-6" />
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto font-light">
            Technologies I work with and the journey so far.
          </p>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-20 space-y-8"
        >
          {techCategories.map((cat) => (
            <div key={cat.label}>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 text-sm font-medium rounded-full bg-white/5 text-gray-300 border border-white/5 hover:border-emerald-500/30 hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Adventure Path Timeline */}
        <div ref={scrollContainerRef} className="mb-16">
          {/* Desktop: SVG curved path with alternating cards */}
          <div className="hidden md:block relative" ref={pathRef}>
            <div className="relative" style={{ height: 640 }}>
              {/* SVG Path */}
              <svg
                viewBox="0 0 300 600"
                className="absolute left-1/2 -translate-x-1/2 h-full"
                style={{ width: 300 }}
                fill="none"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Background path (faint) */}
                <path
                  d={ADVENTURE_PATH}
                  stroke="rgba(16, 185, 129, 0.1)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Animated drawn path */}
                <motion.path
                  d={ADVENTURE_PATH}
                  stroke="rgba(16, 185, 129, 0.6)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="8 6"
                  fill="none"
                  style={{ pathLength }}
                />
                {/* Milestone dots */}
                {milestonePositions.map((pos, i) => (
                  <motion.circle
                    key={i}
                    cx={pos.cx}
                    cy={pos.cy}
                    r={i === 0 || i === milestonePositions.length - 1 ? 6 : 5}
                    fill={i === 0 || i === milestonePositions.length - 1 ? "#10B981" : "#0a0a0a"}
                    stroke="#10B981"
                    strokeWidth="2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
                  />
                ))}
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

              {/* Timeline cards - alternating left/right */}
              {timeline.map((item, i) => {
                const isLeft = i % 2 === 0;
                const topPercent = [75, 55, 38, 22][i]; // approximate positions
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
                    className="absolute w-[200px]"
                    style={{
                      top: `${topPercent}%`,
                      ...(isLeft
                        ? { right: 'calc(50% + 80px)' }
                        : { left: 'calc(50% + 80px)' }),
                    }}
                  >
                    <div className={`${isLeft ? 'text-right' : 'text-left'}`}>
                      <span className="text-xs font-medium text-emerald-500">{item.year}</span>
                      <h4 className="text-white font-medium text-sm mt-0.5">{item.title}</h4>
                      <p className="text-gray-400 text-xs leading-relaxed mt-1">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile: stacked vertical layout */}
          <div className="md:hidden">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-emerald-500/20" />

              {/* Start label */}
              <div className="relative pl-10 pb-6">
                <div className="absolute left-[11px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-medium text-emerald-500/70 uppercase tracking-widest">
                  First Line of Code
                </span>
              </div>

              <div className="space-y-6">
                {timeline.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="relative pl-10"
                  >
                    <div className="absolute left-[11px] top-1.5 w-2 h-2 rounded-full bg-emerald-500/60 ring-4 ring-[#0a0a0a]" />
                    <span className="text-xs font-medium text-emerald-500">{item.year}</span>
                    <h4 className="text-white font-medium text-sm mt-0.5">{item.title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed mt-1">{item.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* End label */}
              <div className="relative pl-10 pt-6">
                <div className="absolute left-[11px] top-7 w-2.5 h-2.5 rounded-full bg-emerald-500" />
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
            className="rounded-full px-6 py-3 h-auto text-sm font-medium border-white/20 text-white hover:bg-white/5 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300"
            onClick={() => setIsResumeModalOpen(true)}
          >
            <Download size={16} className="mr-2" />
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