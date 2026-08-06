import { memo, type FC } from "react";
import { motion } from "framer-motion";
import { techCategories } from "@/data/experience";

const UNIFIED_SKILL_META = {
  shell: "bg-white/[0.015] hover:bg-white/[0.035]",
  gradientOverlay: "bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.015),rgba(255,255,255,0)_70%)]",
  hoverBorder: "hover:border-white/15",
  chip: "border-white/10 bg-white/[0.025] text-neutral-300 hover:border-white/20 hover:bg-white/[0.05] hover:text-white transition-all duration-200",
  titleTone: "text-white/90 group-hover:text-white transition-colors duration-200",
};

const FOUNDATIONAL_SKILL_META = {
  shell: "bg-white/[0.008] hover:bg-white/[0.02] opacity-80 hover:opacity-100 border-dashed border-white/10",
  gradientOverlay: "bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.01),rgba(255,255,255,0)_70%)]",
  hoverBorder: "hover:border-white/15",
  chip: "border-white/[0.06] bg-white/[0.015] text-neutral-400 hover:border-white/15 hover:bg-white/[0.035] hover:text-neutral-200 transition-all duration-200",
  titleTone: "text-neutral-400 group-hover:text-neutral-300 transition-colors duration-200",
};

const CATEGORY_META: Record<string, { shell: string; gradientOverlay: string; hoverBorder: string; chip: string; titleTone: string }> = {
  "Backend": UNIFIED_SKILL_META,
  "Data & Infra": UNIFIED_SKILL_META,
  "Tools": UNIFIED_SKILL_META,
  "Foundations": FOUNDATIONAL_SKILL_META,
};

interface TechCardProps {
  category: typeof techCategories[number];
  index: number;
  isFullHeight?: boolean;
}

const TechCard: FC<TechCardProps> = ({ category, index }) => {
  const meta = CATEGORY_META[category.label] ?? UNIFIED_SKILL_META;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.985 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: index * 0.04, duration: 0.3, ease: "easeOut" }}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] p-4 sm:p-5 pt-4.5 sm:pt-5 flex flex-col items-center justify-start ${meta.shell} ${meta.hoverBorder} transition-colors duration-200 h-full w-full max-w-[19rem] sm:max-w-none mx-auto`}
    >
      <div className={`pointer-events-none absolute inset-0 rounded-2xl ${meta.gradientOverlay}`} />
      
      <div className="relative flex items-center justify-center gap-2 w-full text-center">
        <h3 className={`text-sm sm:text-base font-semibold tracking-tight ${meta.titleTone}`}>
          {category.label}
        </h3>
        {/* Compact, neutral Header Badge */}
        {category.badge && (
          <span className="text-[9px] font-mono tracking-wider px-1.5 py-0.25 rounded border border-white/10 bg-white/[0.03] text-neutral-400 uppercase">
            {category.badge}
          </span>
        )}
      </div>

      <div className="relative mt-3.5 flex flex-wrap justify-center items-center gap-2 sm:gap-2.5 w-full">
        {category.items.map((item) => (
          <motion.span
            key={item.name}
            whileTap={{ scale: 0.95 }}
            className={`group/chip inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-[13px] font-medium transition-all duration-200 cursor-default ${meta.chip}`}
          >
            {item.icon && (
              <item.icon className="text-[1rem] opacity-75 group-hover/chip:opacity-100 transition-opacity" />
            )}
            {item.iconSrc && (
              <img
                src={item.iconSrc}
                alt=""
                aria-hidden="true"
                className="h-[1rem] w-[1rem] opacity-75 group-hover/chip:opacity-100 group-hover/chip:brightness-125 transition-all"
              />
            )}
            {item.name}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

const SkillsSection: FC = () => {
  const backendCat = techCategories.find((c) => c.label === "Backend");
  const dataInfraCat = techCategories.find((c) => c.label === "Data & Infra");
  const toolsCat = techCategories.find((c) => c.label === "Tools");
  const foundationalCat = techCategories.find((c) => c.label === "Foundations");

  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="skills">
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Skills
          </h2>
        </motion.div>

        {/* Tech Stack 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-2xl mx-auto">
          {backendCat && <TechCard category={backendCat} index={0} isFullHeight />}
          {dataInfraCat && <TechCard category={dataInfraCat} index={1} isFullHeight />}
          {toolsCat && <TechCard category={toolsCat} index={2} isFullHeight />}
          {foundationalCat && <TechCard category={foundationalCat} index={3} isFullHeight />}
        </div>
      </div>
    </section>
  );
};

export default memo(SkillsSection);
