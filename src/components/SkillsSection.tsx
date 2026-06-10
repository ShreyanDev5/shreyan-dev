import { memo, type FC } from "react";
import { motion } from "framer-motion";
import { techCategories } from "@/data/experience";

const CATEGORY_META: Record<string, { shell: string; gradientOverlay: string; hoverBorder: string; chip: string; titleTone: string }> = {
  "Core Stack": {
    shell: "bg-white/[0.01] hover:bg-white/[0.02]",
    gradientOverlay: "bg-[radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.02),rgba(16,185,129,0)_70%)]",
    hoverBorder: "hover:border-emerald-500/35 hover:shadow-[0_16px_40px_-20px_rgba(16,185,129,0.15)]",
    chip: "border-white/10 bg-white/[0.025] text-gray-200 hover:border-white/15 hover:bg-white/[0.045] hover:text-white",
    titleTone: "text-emerald-300",
  },
  "Databases & Testing": {
    shell: "bg-white/[0.01] hover:bg-white/[0.02]",
    gradientOverlay: "bg-[radial-gradient(ellipse_at_bottom_right,rgba(245,158,11,0.025),rgba(245,158,11,0)_70%)]",
    hoverBorder: "hover:border-amber-500/35 hover:shadow-[0_16px_40px_-20px_rgba(245,158,11,0.15)]",
    chip: "border-white/10 bg-white/[0.025] text-gray-200 hover:border-white/15 hover:bg-white/[0.045] hover:text-white",
    titleTone: "text-amber-300",
  },
  "Tools & Productivity": {
    shell: "bg-white/[0.01] hover:bg-white/[0.02]",
    gradientOverlay: "bg-[radial-gradient(ellipse_at_bottom_right,rgba(96,165,250,0.025),rgba(96,165,250,0)_70%)]",
    hoverBorder: "hover:border-blue-500/35 hover:shadow-[0_16px_40px_-20px_rgba(59,130,246,0.15)]",
    chip: "border-white/10 bg-white/[0.025] text-gray-200 hover:border-white/15 hover:bg-white/[0.045] hover:text-white",
    titleTone: "text-blue-300",
  },
  "Systems & DevOps Concepts": {
    shell: "bg-white/[0.01] hover:bg-white/[0.02]",
    gradientOverlay: "bg-[radial-gradient(ellipse_at_bottom_right,rgba(56,189,248,0.015),rgba(56,189,248,0)_70%)]",
    hoverBorder: "hover:border-sky-500/35 hover:shadow-[0_16px_40px_-20px_rgba(56,189,248,0.15)]",
    chip: "border-white/10 bg-white/[0.025] text-gray-200 hover:border-white/15 hover:bg-white/[0.045] hover:text-white",
    titleTone: "text-sky-300",
  },
};

interface TechCardProps {
  category: typeof techCategories[number];
  index: number;
  isFullHeight?: boolean;
}

const TechCard: FC<TechCardProps> = ({ category, index, isFullHeight }) => {
  const meta = CATEGORY_META[category.label] ?? CATEGORY_META["Systems & DevOps Concepts"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, transition: { type: "spring", stiffness: 400, damping: 25 } }}
      whileTap={{ scale: 0.985 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.45 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] px-5 pt-4 pb-6 md:px-6 md:pt-5 md:pb-6 will-change-transform shadow-[0_12px_32px_-20px_rgba(0,0,0,0.6)] ${meta.shell} ${meta.hoverBorder} ${isFullHeight ? "h-full w-full flex flex-col" : ""}`}
      style={{ transition: "border-color 0.25s cubic-bezier(0.22,1,0.36,1), background-color 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s cubic-bezier(0.22,1,0.36,1)" }}
    >
      <div className={`pointer-events-none absolute inset-0 rounded-2xl ${meta.gradientOverlay}`} />
      
      <div className="relative flex flex-col items-center text-center">
        <h3 className={`text-lg sm:text-xl md:text-2xl font-bold tracking-tight sm:whitespace-nowrap ${meta.titleTone}`}>
          {category.label}
        </h3>
      </div>

      <div className="relative mt-4 flex flex-wrap justify-center gap-2.5 sm:gap-3">
        {category.items.map((item) => (
          <motion.span
            key={item.name}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full border px-3 py-1.5 sm:px-4 sm:py-2 text-[0.85rem] sm:text-[0.95rem] font-medium leading-none tracking-[0.01em] cursor-default transition-all duration-200 ${meta.chip}`}
          >
            {item.icon && <item.icon className="text-[1.1rem] sm:text-[1.2rem] opacity-80" />}
            {item.name}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

const SkillsSection: FC = () => {
  const langCat = techCategories.find((c) => c.label === "Core Stack");
  const dbCat = techCategories.find((c) => c.label === "Databases & Testing");
  const toolsCat = techCategories.find((c) => c.label === "Tools & Productivity");
  const conceptsCat = techCategories.find((c) => c.label === "Systems & DevOps Concepts");

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="skills">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
            Skills
          </h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto font-light leading-snug">
            Technologies explored through learning and projects.
          </p>
        </motion.div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {langCat && <TechCard category={langCat} index={0} isFullHeight />}
          {dbCat && <TechCard category={dbCat} index={1} isFullHeight />}
          {conceptsCat && <TechCard category={conceptsCat} index={2} isFullHeight />}
          {toolsCat && <TechCard category={toolsCat} index={3} isFullHeight />}
        </div>
      </div>
    </section>
  );
};

export default memo(SkillsSection);
