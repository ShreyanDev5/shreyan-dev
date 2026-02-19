import React, { memo, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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
    title: "Java & Backend Foundations",
    description: "Built Student Management System with Java, MySQL, and JDBC.",
  },
  {
    year: "2023",
    title: "Frontend & Modern Tooling",
    description: "Learned React, TypeScript, and modern web development workflows.",
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

const ExperienceSection: React.FC = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scrollY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            Experience
          </h2>
          <div className="w-12 h-0.5 bg-emerald-500 rounded-full mx-auto mb-6" />
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Technologies I work with and the journey so far.
          </p>
        </motion.div>

        {/* Tech Stack */}
        <div className="mb-20 grid gap-10 md:grid-cols-3 md:gap-8">
          {techCategories.map((cat, categoryIndex) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
              className="flex flex-col items-center md:items-start"
            >
              <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-widest mb-4">
                {cat.label}
              </h3>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                {cat.items.map((item, idx) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/[0.03] text-gray-300 border border-white/[0.08] hover:bg-white/[0.08] hover:border-emerald-500/30 hover:text-emerald-400 transition-colors duration-300 cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative mb-24 max-w-3xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/[0.04] -translate-x-1/2 md:transform-none">
            <motion.div
              style={{ height: useTransform(scrollY, [0, 1], ["0%", "100%"]) }}
              className="w-full bg-gradient-to-b from-emerald-500/20 via-emerald-500 to-emerald-500/20"
            />
          </div>

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <TimelineItem
                key={index}
                item={item}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>

          {/* Present Node */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="relative flex items-center md:justify-center mt-16"
          >
            <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0a0a0a] ring-4 ring-[#0a0a0a] -translate-x-1/2" />
            <div className="ml-12 md:ml-0 px-3 py-1 text-emerald-400 text-xs font-semibold rounded-full border border-white/[0.08] uppercase tracking-wider">
              Present
            </div>
          </motion.div>
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

const TimelineItem = ({ item, index, isLeft }: { item: any, index: number, isLeft: boolean }) => {
  return (
    <div className={`relative flex items-center md:justify-between ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

      {/* Timeline Node (Mobile: Left, Desktop: Center) */}
      <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-emerald-500 border-2 border-[#0a0a0a] rounded-full z-10 -translate-x-1/2 ring-4 ring-[#0a0a0a]" />


      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={`ml-12 md:ml-0 w-full md:w-[45%] ${isLeft ? 'md:text-right md:items-end' : 'md:text-left md:items-start'} flex flex-col`}
      >
        <span className="text-emerald-400 text-xs font-bold tracking-wider mb-2 block uppercase">
          {item.year}
        </span>
        <div className="relative p-5 backdrop-blur-2xl bg-white/[0.05] border border-white/[0.1] rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(255,255,255,0.02),0_4px_24px_rgba(0,0,0,0.2)] hover:border-white/[0.15] hover:bg-white/[0.07] transition-all duration-300 backdrop-saturate-[180%]">
          <h4 className="text-white font-medium text-lg mb-2">
            {item.title}
          </h4>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {item.description}
          </p>
        </div>
      </motion.div>

      {/* Spacer for desktop alignment */}
      <div className="hidden md:block w-[45%]" />
    </div>
  )
}

export default memo(ExperienceSection);
