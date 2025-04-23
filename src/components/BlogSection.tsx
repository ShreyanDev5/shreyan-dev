
import { motion } from "framer-motion";

// Example blog timeline data (replace with real content as needed)
const blogEntries = [
  {
    date: "2024-03-02",
    title: "Kickoff: Building a Project Foundation",
    content:
      "Started this journey by scaffolding out the project architecture. Chose React, TypeScript, Tailwind, and shadcn/ui for rapid yet robust development.",
  },
  {
    date: "2024-03-10",
    title: "First Technical Challenge",
    content:
      "Ran into authentication edge cases with route protection. Resolved by reorganizing hooks and leveraging React Query’s caching.",
  },
  {
    date: "2024-04-05",
    title: "Milestone: Real-Time Collaboration",
    content:
      "Integrated real-time updates to project boards. Achieved seamless multi-user collaboration, leading to a significant productivity boost.",
  },
  {
    date: "2024-04-20",
    title: "Design System Upgrade",
    content:
      "Refined the color palette and component styling. Switched to Roboto for improved readability, and deepened blue accents for modern appeal.",
  },
  {
    date: "2024-05-01",
    title: "Launch & Reflections",
    content:
      "Deployed the platform and received first user feedback. Refined onboarding flows, squashed bugs, and planned for the next iteration.",
  },
];

const timelineVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const entryVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const BlogSection = () => {
  return (
    <section
      className="w-full max-w-2xl mx-auto py-12 animate-fade-in"
      aria-label="Developer Journey Blog Section"
    >
      <h2 className="font-roboto text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight animate-fade-in">
        <span className="text-gradient-primary">Blog & Developer Journal</span>
      </h2>
      <p className="mb-8 text-base md:text-lg text-gray-200 font-roboto">
        Tracing the journey: professional growth, challenges, and key milestones.
      </p>
      <motion.ol
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={timelineVariants}
        className="relative border-l-2 border-blue-400/40 pl-6 space-y-8"
      >
        {blogEntries.map((entry, idx) => (
          <motion.li
            key={entry.date + entry.title}
            variants={entryVariants}
            className="relative group"
          >
            {/* Date marker */}
            <div className="absolute -left-6 top-2 w-3.5 h-3.5 rounded-full bg-blue-400 border-2 border-blue-300 shadow-md group-hover:scale-110 transition-transform"></div>
            <div className="ml-2">
              <span className="text-xs font-semibold text-blue-300 font-roboto select-none">
                {new Date(entry.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <h3 className="text-xl md:text-2xl font-bold font-roboto text-gray-100 mt-1 mb-1">
                {entry.title}
              </h3>
              <div className="text-base md:text-lg font-roboto text-gray-200 leading-relaxed bg-gradient-to-br from-gray-800 via-gray-900/90 to-background/60 rounded-xl py-4 px-5 border border-blue-900/20 shadow depth transition-shadow duration-300">
                {entry.content}
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
};

export default BlogSection;
