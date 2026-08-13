import { memo, useState, type FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, X } from "lucide-react";
import { techCategories } from "@/data/experience";

const UNIFIED_SKILL_META = {
  shell: "bg-white/[0.015] hover:bg-white/[0.035]",
  gradientOverlay: "bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.015),rgba(255,255,255,0)_70%)]",
  hoverBorder: "hover:border-white/15",
  chip: "border-white/10 bg-white/[0.025] text-neutral-300 hover:border-white/20 hover:bg-white/[0.05] hover:text-white transition-all duration-200",
  titleTone: "text-white/90 group-hover:text-white transition-colors duration-200",
};

const FOUNDATIONAL_SKILL_META = {
  ...UNIFIED_SKILL_META,
  shell: "bg-white/[0.015] hover:bg-white/[0.035] border-dashed border-white/10",
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
  const [showTooltip, setShowTooltip] = useState(false);
  const isFoundations = category.label === "Foundations";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.985 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: index * 0.04, duration: 0.3, ease: "easeOut" }}
      className={`group relative rounded-2xl border border-white/[0.08] p-4 sm:p-5 pt-4.5 sm:pt-5 flex flex-col items-center justify-start ${meta.shell} ${meta.hoverBorder} transition-colors duration-200 h-full w-full max-w-[19rem] sm:max-w-none mx-auto overflow-hidden`}
    >
      {/* Glassmorphic Overlay for Foundations (matching ProjectCard pattern) */}
      {isFoundations && (
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute -inset-[1px] z-30 flex flex-col justify-between bg-[#141414] border border-white/15 p-4 sm:p-5 text-white rounded-2xl"
              onMouseLeave={() => setShowTooltip(false)}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowTooltip(false)}
                className="sm:hidden absolute top-2.5 right-2.5 z-40 flex h-5 w-5 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/60 hover:text-white transition-colors"
                aria-label="Close information"
              >
                <X size={11} />
              </button>
              <div className="flex-1 flex items-center">
                <p className="text-xs sm:text-[13px] text-neutral-400 leading-relaxed font-normal normal-case">
                  I have a <span className="text-white">high-level understanding</span> of what these technologies are, why they're used, and the problems they solve. I <span className="text-white">don't have hands-on experience</span> yet, which is why I want to <span className="text-white">join a product team</span> to build practical experience.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <div className={`pointer-events-none absolute inset-0 rounded-2xl overflow-hidden ${meta.gradientOverlay}`} />
      
      <div className="relative flex items-center justify-center gap-1.5 w-full text-center">
        <h3 className={`text-sm sm:text-base font-semibold tracking-tight ${meta.titleTone}`}>
          {category.label}
        </h3>

        {/* Info Icon Trigger for Foundations */}
        {isFoundations && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(!showTooltip);
            }}
            onMouseEnter={() => setShowTooltip(true)}
            aria-label="About Foundations skills"
            className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center text-neutral-400/80 hover:text-white transition-colors duration-200 focus-visible:outline-none z-10 -translate-y-[1.5px]"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <Info size={14} />
          </button>
        )}

        {/* Compact, neutral Header Badge */}
        {category.badge && (
          <span className="inline-flex items-center justify-center text-[8px] sm:text-[8.5px] font-mono tracking-wider px-1.5 py-0.5 leading-none rounded-md border border-white/10 bg-white/[0.03] text-neutral-400 uppercase select-none">
            <span className="translate-y-[0.5px]">{category.badge}</span>
          </span>
        )}
      </div>

      <div className="relative mt-3.5 flex flex-wrap justify-center items-center gap-2 sm:gap-2.5 w-full">
        {category.items.map((item) => (
          <motion.span
            key={item.name}
            whileTap={{ scale: 0.95 }}
            className={`group/chip inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-[13px] font-mono font-medium transition-all duration-200 cursor-default ${meta.chip}`}
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
    <section className="py-9 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-visible" id="skills">
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-[28px] md:text-[30px] font-bold text-white tracking-tight">
            <span className="font-mono text-neutral-500 text-lg sm:text-xl font-medium mr-2.5 select-none opacity-90">04 //</span>Skills
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
