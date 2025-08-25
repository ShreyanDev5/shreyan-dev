import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Calendar, Lightbulb, Code, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";

// Enhanced blog timeline data with more structure and context
const blogEntries = [
  {
    date: "2024-03-02",
    title: "Kickoff: Building a Project Foundation",
    content:
      "Started this journey by scaffolding out the project architecture. Chose React, TypeScript, Tailwind, and shadcn/ui for rapid yet robust development.",
    whyChosen: "Needed a scalable foundation that would support complex UI patterns while maintaining type safety.",
    implementation: [
      "Set up Vite with TypeScript configuration",
      "Integrated Tailwind with custom theme extensions",
      "Created component architecture using atomic design principles"
    ],
    keyTakeaway: "Starting with the right tools saves countless hours of refactoring later.",
    links: [
      { label: "View Initial Commit", url: "https://github.com/yourusername/project/commit/initial" }
    ],
    category: "setup"
  },
  {
    date: "2024-03-10",
    title: "First Technical Challenge",
    content:
      "Ran into authentication edge cases with route protection. Resolved by reorganizing hooks and leveraging React Query's caching.",
    whyChosen: "Standard auth patterns weren't handling token refresh cycles properly with our API structure.",
    implementation: [
      "Debugged token expiration logic",
      "Created custom auth provider with refresh token rotation",
      "Added persistent login state with secure storage"
    ],
    keyTakeaway: "Authentication flows need thorough testing across all edge cases, especially token refreshes.",
    links: [
      { label: "See Auth PR", url: "https://github.com/yourusername/project/pull/42" }
    ],
    category: "challenge"
  },
  {
    date: "2024-04-05",
    title: "Milestone: Real-Time Collaboration",
    content:
      "Integrated real-time updates to project boards. Achieved seamless multi-user collaboration, leading to a significant productivity boost.",
    whyChosen: "Users needed to see others' changes immediately without manual refresh.",
    implementation: [
      "Implemented WebSocket server with Socket.IO",
      "Created optimistic UI updates with fallback recovery",
      "Added presence indicators for active users"
    ],
    keyTakeaway: "Real-time features dramatically improve engagement, but require careful state synchronization.",
    links: [
      { label: "Try Demo", url: "https://demo.yoursite.com/realtime" },
      { label: "View Code", url: "https://github.com/yourusername/project/tree/main/realtime" }
    ],
    category: "feature"
  },
  {
    date: "2024-04-20",
    title: "Design System Upgrade",
    content:
      "Refined the color palette and component styling. Switched to Roboto for improved readability, and deepened blue accents for modern appeal.",
    whyChosen: "Previous design lacked visual hierarchy and consistent interactive states.",
    implementation: [
      "Created a comprehensive token system for colors and spacing",
      "Refactored all component styles to use the new design system",
      "Added interactive states (hover, focus, active) consistently"
    ],
    keyTakeaway: "A structured design system pays dividends in maintainability and visual consistency.",
    links: [
      { label: "View Storybook", url: "https://storybook.yoursite.com" }
    ],
    category: "design"
  },
  {
    date: "2024-05-01",
    title: "Launch & Reflections",
    content:
      "Deployed the platform and received first user feedback. Refined onboarding flows, squashed bugs, and planned for the next iteration.",
    whyChosen: "Early feedback is crucial for identifying blind spots and improvement areas.",
    implementation: [
      "Set up CI/CD pipeline for automated deployments",
      "Implemented analytics to track user journeys",
      "Created a feedback collection system"
    ],
    keyTakeaway: "The first version is never perfect - build systems for rapid iteration based on user feedback.",
    links: [
      { label: "Visit Live Site", url: "https://yoursite.com" }
    ],
    category: "launch"
  },
];

// Future plans section
const futurePlans = [
  "AI-assisted content generation for improved productivity",
  "Enhanced data visualization with interactive charts",
  "Mobile app version with offline capabilities"
];

const timelineVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const entryVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1] as const,
    }
  },
};

// Enhanced expandable variants with smoother transitions and better performance
const expandableVariants = {
  expanded: {
    opacity: 1,
    height: "auto",
    transition: {
      height: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1] as const
      },
      opacity: {
        duration: 0.25,
        delay: 0.05
      }
    }
  },
  collapsed: {
    opacity: 0,
    height: 0,
    transition: {
      height: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1] as const
      },
      opacity: {
        duration: 0.2
      }
    }
  }
};

// Optimized future plans variants with better performance
const futurePlansVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      height: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1] as const
      },
      opacity: {
        duration: 0.2
      }
    }
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      height: {
        duration: 0.45,
        ease: [0.25, 0.1, 0.25, 1] as const
      },
      opacity: {
        duration: 0.3,
        delay: 0.05
      }
    }
  }
};

const listItemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.25,
      delay: 0.05 + (i * 0.06),
      ease: [0.25, 0.1, 0.25, 1] as const
    }
  })
};

// Helper function to get icon based on category
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "setup":
      return <Code className="text-emerald-400" />;
    case "challenge":
      return <Lightbulb className="text-electric-300" />;
    case "feature":
      return <Code className="text-electric-500" />;
    case "design":
      return <Code className="text-emerald-500" />;
    case "launch":
      return <Calendar className="text-electric-500" />;
    default:
      return <Calendar className="text-blue-300" />;
  }
};

const BlogSection = () => {
  const [expandedEntries, setExpandedEntries] = useState<Record<string, boolean>>({});
  const [showFuturePlans, setShowFuturePlans] = useState(false);

  // Memoize toggle functions to prevent unnecessary re-renders
  const toggleEntry = useMemo(() => (date: string) => {
    setExpandedEntries(prev => ({
      ...prev,
      [date]: !prev[date]
    }));
  }, []);

  const toggleFuturePlans = useMemo(() => () => {
    setShowFuturePlans(prev => !prev);
  }, []);

  return (
    <section
      className="w-full max-w-4xl mx-auto py-24 sm:py-28 md:py-32 px-3 sm:px-6 md:px-8 relative backdrop-blur-xl bg-gradient-to-br from-gray-900/35 via-gray-800/25 to-gray-900/35 rounded-lg sm:rounded-2xl border border-white/8 shadow-[0_6px_24px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-shadow duration-300 my-3 sm:my-6"
      aria-label="Developer Journey Blog Section"
    >
      {/* Subtle background pattern with reduced opacity - optimized for mobile */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-[0.02] z-0 rounded-2xl"></div>
      
      <div className="relative z-10">
        <div className="mb-6 sm:mb-10 text-center">
          <div className="inline-block relative">
            <h2 className="font-roboto text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight animate-fade-in relative">
              <span className="bg-gradient-to-r from-electric-300 via-purple-400 to-electric-500 bg-clip-text text-transparent">
                Developer Journal
              </span>
            </h2>
            {/* Enhanced gradient underline with animation - optimized for mobile */}
            <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-electric-500/0 via-electric-500 to-purple-500/0 rounded-full transform origin-left scale-x-0 animate-[underline_1.5s_ease-out_forwards]"></div>
          </div>
          
          <p className="mt-3 sm:mt-5 text-sm sm:text-base md:text-lg text-gray-300/90 font-light max-w-2xl mx-auto leading-relaxed px-2">
            <span className="inline-block transform hover:scale-105 transition-transform duration-300">
              Insights, growth, and the road so far.
            </span>
          </p>
        </div>
        
        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={timelineVariants}
          className="relative space-y-8 sm:space-y-12 mb-6 sm:mb-8 pl-2 sm:pl-4"
        >
          {blogEntries.map((entry, idx) => (
            <motion.li
              key={entry.date + entry.title}
              variants={entryVariants}
              className="relative group"
            >
              {/* Timeline node with enhanced icon styling - optimized for mobile */}
              <div className="absolute -left-1 sm:-left-2 top-1 flex items-center justify-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#1a1a1f] to-[#202025] border-2 border-electric-500/30 shadow-md shadow-electric-500/8 flex items-center justify-center group-hover:scale-110 group-hover:border-electric-500/50 transition-all duration-300">
                  {getCategoryIcon(entry.category)}
                </div>
              </div>
              
              <div className="ml-8 sm:ml-12">
                {/* Date display with enhanced styling - optimized for mobile */}
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                  <span className="inline-flex items-center text-[10px] sm:text-xs font-medium text-electric-400/90 font-roboto select-none bg-gradient-to-r from-[#1a1a1f] to-[#202025] px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-full border border-electric-500/15 shadow-sm">
                    <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1 sm:mr-1.5 text-electric-400" />
                    {new Date(entry.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                
                {/* Title with enhanced gradient and hover effect - optimized for mobile */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-roboto mt-1.5 mb-2 group-hover:translate-x-1 transition-transform duration-300">
                  <span className="bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
                    {entry.title}
                  </span>
                </h3>
                
                {/* Enhanced content card with reduced glassmorphism - optimized for mobile */}
                <Card className="bg-gradient-to-br from-[#1a1a1f] via-[#1c1c22] to-[#202025] border border-gray-700/15 shadow-lg shadow-black/15 hover:shadow-xl hover:shadow-gray-600/5 hover:border-gray-600/25 transition-all duration-300 overflow-hidden group-hover:translate-x-1 rounded-lg sm:rounded-xl">
                  <div className="p-3 sm:p-5">
                    {/* Main content with enhanced typography - optimized for mobile */}
                    <p className="text-xs sm:text-sm md:text-base font-roboto text-gray-100 leading-relaxed mb-3">
                      {entry.content}
                    </p>
                    
                    {/* Enhanced expandable details with optimized animations */}
                    <motion.div
                      initial="collapsed"
                      animate={expandedEntries[entry.date] ? "expanded" : "collapsed"}
                      variants={expandableVariants}
                      className="overflow-hidden"
                      style={{
                        willChange: expandedEntries[entry.date] ? "height" : "auto",
                      }}
                    >
                      {/* Why chosen with enhanced styling - optimized for mobile */}
                      <motion.div 
                        className="mt-3 sm:mt-4 bg-gradient-to-r from-gray-800/90 to-gray-900/90 p-3 sm:p-4 rounded-lg border-l-2 border-electric-500/25 shadow-md"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      >
                        <h4 className="text-xs sm:text-sm font-semibold text-electric-300 mb-1.5 sm:mb-2">Why I Chose This Approach:</h4>
                        <p className="text-xs sm:text-sm text-gray-100 leading-relaxed">{entry.whyChosen}</p>
                      </motion.div>
                      
                      {/* Implementation steps with enhanced list styling - optimized for mobile */}
                      <motion.div 
                        className="mt-3 sm:mt-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.15 }}
                      >
                        <h4 className="text-xs sm:text-sm font-semibold text-electric-300 mb-1.5 sm:mb-2">Implementation:</h4>
                        <ul className="space-y-1.5 sm:space-y-2">
                          {entry.implementation.map((step, i) => (
                            <motion.li 
                              key={i} 
                              className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-100"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2, delay: 0.2 + (i * 0.05) }}
                            >
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-electric-400 flex-shrink-0"></span>
                              <span className="leading-relaxed">{step}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                      
                      {/* Enhanced key takeaway box - optimized for mobile */}
                      <motion.div 
                        className="mt-3 sm:mt-4 bg-gradient-to-r from-gray-800/90 to-gray-900/90 p-3 sm:p-4 rounded-lg border-l-4 border-electric-500/35 shadow-md"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.2 }}
                      >
                        <h4 className="text-xs sm:text-sm font-semibold text-electric-300 mb-1.5 sm:mb-2">Key Takeaway:</h4>
                        <p className="text-xs sm:text-sm text-gray-100 leading-relaxed">{entry.keyTakeaway}</p>
                      </motion.div>
                      
                      {/* Related links with enhanced button styling - optimized for mobile */}
                      {entry.links && entry.links.length > 0 && (
                        <motion.div 
                          className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: 0.25 }}
                        >
                          {entry.links.map((link, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.2, delay: 0.3 + (i * 0.05) }}
                            >
                              <Button 
                                size="sm" 
                                variant="blog"
                                className="group inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-medium rounded-full bg-gradient-to-r from-emerald-900/45 to-emerald-800/35 hover:from-emerald-900/65 hover:to-emerald-800/55 border border-emerald-600/35 hover:border-emerald-500/45 transition-all duration-300 text-emerald-400 hover:text-emerald-300 shadow-sm hover:shadow-md hover:shadow-emerald-900/15 active:scale-[0.97] hover:-translate-y-[1px] min-h-[28px] sm:min-h-[32px]"
                                asChild
                              >
                                <a href={link.url} target="_blank" rel="noopener noreferrer" className="px-2.5 sm:px-3 py-1 sm:py-1.5">
                                  {link.label}
                                  <ExternalLink className="w-2.5 h-2.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 opacity-80 group-hover:opacity-100" />
                                </a>
                              </Button>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                    
                    {/* Enhanced toggle button with improved performance - optimized for mobile */}
                    <div className="mt-2.5 sm:mt-3 flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleEntry(entry.date)}
                        className="relative text-purple-400 border border-purple-400 bg-transparent hover:bg-purple-800/80 hover:border-purple-500/50 hover:text-purple-200 transition-all duration-250 rounded-full px-3 py-1.5 text-xs font-medium active:scale-[0.98] min-h-[28px] sm:min-h-[32px] group/button shadow-sm hover:shadow-md hover:shadow-purple-500/8"
                        style={{ willChange: "transform" }}
                      >
                        <motion.div
                          animate={{ rotate: expandedEntries[entry.date] ? 180 : 0 }}
                          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const }}
                          className="inline-flex items-center justify-center mr-1"
                        >
                          <ChevronDown 
                            className="w-3 h-3 text-purple-400 group-hover/button:text-purple-200 transition-colors duration-200" 
                            strokeWidth={2.5}
                          />
                        </motion.div>
                        <span>
                          {expandedEntries[entry.date] ? 'Show Less' : 'Show More'}
                        </span>
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.li>
          ))}
        </motion.ol>
        
        {/* Enhanced future plans section with optimized animations - optimized for mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-6 sm:mt-10"
        >
          <Button
            variant="blog"
            className="relative flex items-center gap-1.5 sm:gap-2 mb-2.5 sm:mb-3 border-dashed border-electric-500/45 hover:border-electric-500 rounded-lg min-h-[36px] sm:min-h-[40px] text-sm bg-transparent hover:bg-electric-900/15 transition-all duration-250 group/next-steps"
            onClick={toggleFuturePlans}
            style={{ willChange: "transform" }}
          >
            <motion.div
              animate={{ rotate: showFuturePlans ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
              className="inline-flex items-center justify-center"
            >
              <ChevronDown 
                className="w-3.5 h-3.5 text-electric-400 group-hover/next-steps:text-electric-300 transition-colors duration-200" 
                strokeWidth={2.5}
              />
            </motion.div>
            <span className="text-electric-400 group-hover/next-steps:text-electric-300 transition-colors duration-200">
              {showFuturePlans ? 'Hide Next Steps' : 'Show Next Steps'}
            </span>
          </Button>
          
          <AnimatePresence mode="wait">
            {showFuturePlans && (
              <motion.div
                key="future-plans"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={futurePlansVariants}
                className="overflow-hidden"
                style={{ willChange: showFuturePlans ? "height" : "auto" }}
              >
                <div className="bg-gradient-to-br from-blue-900/15 to-emerald-900/8 rounded-lg border border-blue-900/25 p-3 sm:p-4">
                  <motion.h3 
                    className="text-base sm:text-lg font-bold text-white mb-2.5 sm:mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.15 }}
                  >
                    Coming Soon
                  </motion.h3>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {futurePlans.map((plan, idx) => (
                      <motion.li 
                        key={idx}
                        custom={idx}
                        variants={listItemVariants}
                        className="flex items-center gap-1.5 sm:gap-2"
                      >
                        <motion.div 
                          className="bg-gradient-to-br from-electric-500/25 to-electric-500/8 rounded-full p-0.5"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.25, delay: 0.2 + (idx * 0.06) }}
                        >
                          <Lightbulb className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-electric-300" />
                        </motion.div>
                        <span className="text-xs sm:text-sm text-gray-200">{plan}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;

// Add this keyframe animation at the top of the file, after the imports
const keyframes = `
@keyframes underline {
  0% { transform: scaleX(0); }
  100% { transform: scaleX(1); }
}
`;

// Add this style tag right after the keyframes definition
const styleTag = document.createElement('style');
styleTag.textContent = keyframes;
document.head.appendChild(styleTag);
