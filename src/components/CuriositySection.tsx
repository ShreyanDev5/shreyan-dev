import { memo, type FC } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

const CuriositySection: FC = () => {
  return (
    <section className="pt-9 sm:pt-12 pb-14 sm:pb-18 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="curiosity">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-emerald-500/4 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-[28px] md:text-[30px] font-bold text-white tracking-tight">
            Curiosity
          </h2>
        </motion.div>

        {/* Compact PowerShell Window */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="rounded-xl border border-white/[0.08] bg-[#121215] shadow-xl overflow-hidden"
        >
          {/* Minimalist Title Bar */}
          <div className="px-3.5 py-2 bg-[#18181b] border-b border-white/[0.06] flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px] font-mono text-neutral-300 tracking-wide font-medium">
                Windows PowerShell
              </span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-3 sm:p-5 pr-4 sm:pr-5 font-mono text-[9.5px] sm:text-xs leading-relaxed overflow-x-auto custom-scrollbar text-neutral-200">
            {/* Command Line */}
            <div className="flex items-center gap-x-1.5 whitespace-nowrap mb-3 text-[9.5px] sm:text-xs">
              <span className="text-emerald-400 font-semibold">PS</span>
              <span className="text-neutral-400">C:\Projects\shreyan-dev&gt;</span>
              <span className="text-neutral-200 font-medium">Get-Content</span>
              <span className="text-neutral-300">.\engineering_curiosity.tree</span>
            </div>

            {/* Tree View */}
            <pre className="text-neutral-300 whitespace-pre font-mono leading-relaxed select-text text-[9.5px] sm:text-xs pr-4 sm:pr-0">
              <span className="text-emerald-400 font-semibold">[ 2026 - 2027 ]</span>{"\n"}
              <span className="text-neutral-600">  └── </span><span className="text-white font-medium">Land Backend / Product Engineer Role</span>{"\n"}
              <span className="text-neutral-600">       ├── </span><span className="text-emerald-400 font-medium">Distributed Systems</span>{"\n"}
              <span className="text-neutral-600">       │    ├── </span><span className="text-neutral-200">Designing Data-Intensive Applications</span><span className="text-neutral-500 font-sans"> — </span><span className="text-neutral-500">Kleppmann</span>{"\n"}
              <span className="text-neutral-600">       │    └── </span><span className="text-neutral-200">System Design Interview: An Insider's Guide</span><span className="text-neutral-500 font-sans"> — </span><span className="text-neutral-500">Xu</span>{"\n"}
              <span className="text-neutral-600">       │</span>{"\n"}
              <span className="text-neutral-600">       └── </span><span className="text-emerald-400 font-medium">AI / ML</span>{"\n"}
              <span className="text-neutral-600">            ├── </span><span className="text-neutral-200">Agentic AI Engineering Course</span>{"\n"}
              <span className="text-neutral-600">            │</span>{"\n"}
              <span className="text-neutral-600">            └── </span><span className="text-neutral-300 font-medium">Exploratory ML & DL Books</span>{"\n"}
              <span className="text-neutral-600">                 ├── </span><span className="text-neutral-300 font-medium">Stage 1: Ultra-Low Time Explorer</span>{"\n"}
              <span className="text-neutral-600">                 │    ├── </span><span className="text-neutral-200">The 100-Page Machine Learning Book</span><span className="text-neutral-500 font-sans"> — </span><span className="text-neutral-500">Burkov</span>{"\n"}
              <span className="text-neutral-600">                 │    ├── </span><span className="text-neutral-200">StatQuest Illustrated Guide to ML</span><span className="text-neutral-500 font-sans"> — </span><span className="text-neutral-500">Starmer</span>{"\n"}
              <span className="text-neutral-600">                 │    └── </span><span className="text-neutral-200">No BS Guide to Linear Algebra</span><span className="text-neutral-500 font-sans"> — </span><span className="text-neutral-500">Savov</span>{"\n"}
              <span className="text-neutral-600">                 │</span>{"\n"}
              <span className="text-neutral-600">                 ├── </span><span className="text-neutral-300 font-medium">Stage 2: Code & First Principles</span>{"\n"}
              <span className="text-neutral-600">                 │    ├── </span><span className="text-neutral-200">Data Science from Scratch</span><span className="text-neutral-500 font-sans"> — </span><span className="text-neutral-500">Grus</span>{"\n"}
              <span className="text-neutral-600">                 │    └── </span><span className="text-neutral-200">Deep Learning for Coders with fastai & PyTorch</span><span className="text-neutral-500 font-sans"> — </span><span className="text-neutral-500">Howard</span><span className="inline-block w-4 sm:w-6" />{"\n"}
              <span className="text-neutral-600">                 │</span>{"\n"}
              <span className="text-neutral-600">                 └── </span><span className="text-neutral-300 font-medium">Stage 3: Deep Systems & Reference</span>{"\n"}
              <span className="text-neutral-600">                      ├── </span><span className="text-neutral-200">Designing Machine Learning Systems</span><span className="text-neutral-500 font-sans"> — </span><span className="text-neutral-500">Huyen</span>{"\n"}
              <span className="text-neutral-600">                      └── </span><span className="text-neutral-200">Hands-On Machine Learning</span><span className="text-neutral-500 font-sans"> — </span><span className="text-neutral-500">Géron</span>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(CuriositySection);
