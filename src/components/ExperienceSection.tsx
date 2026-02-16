import React, { memo, useState } from "react";
import { motion } from "framer-motion";
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
    year: "2024",
    title: "Full-Stack Development",
    description: "Built SpringMart e-commerce platform with Spring Boot backend and React frontend.",
  },
  {
    year: "2024",
    title: "Client Project — WealthWise",
    description: "Delivered a financial advisory web app with Next.js for a real client.",
  },
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
];

const ExperienceSection: React.FC = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

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

        {/* Tech Stack - horizontal scrolling strips */}
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
                    className="px-4 py-2 text-sm font-medium rounded-full bg-white/5 text-gray-300 border border-white/5 hover:border-white/15 transition-colors duration-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[60px] sm:left-[70px] top-0 bottom-0 w-px bg-white/10" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex gap-6 sm:gap-8"
                >
                  <div className="flex-shrink-0 w-[60px] sm:w-[70px] text-right">
                    <span className="text-sm font-medium text-emerald-500">{item.year}</span>
                  </div>
                  <div className="relative flex-1 pb-2">
                    {/* Dot on timeline */}
                    <div className="absolute -left-[13px] sm:-left-[17px] top-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-[#0a0a0a]" />
                    <h4 className="text-white font-medium text-base mb-1">{item.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

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
