
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Calendar, Lightbulb, Code, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
      staggerChildren: 0.15,
    },
  },
};

const entryVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.2, 0, 0.1, 1]
    }
  },
};

// Add new animation variants for expandable content
const expandableVariants = {
  expanded: {
    opacity: 1,
    height: "auto",
    transition: {
      height: {
        duration: 0.3,
        ease: [0.2, 0, 0.1, 1]
      },
      opacity: {
        duration: 0.2,
        delay: 0.1
      }
    }
  },
  collapsed: {
    opacity: 0,
    height: 0,
    transition: {
      height: {
        duration: 0.3,
        ease: [0.2, 0, 0.1, 1]
      },
      opacity: {
        duration: 0.2
      }
    }
  }
};

// Add new animation variants for future plans
const futurePlansVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      height: {
        duration: 0.3,
        ease: [0.2, 0, 0.1, 1]
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
        duration: 0.4,
        ease: [0.2, 0, 0.1, 1]
      },
      opacity: {
        duration: 0.3,
        delay: 0.1
      }
    }
  }
};

const listItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      delay: 0.1 + (i * 0.08),
      ease: [0.2, 0, 0.1, 1]
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

  const toggleEntry = (date: string) => {
    setExpandedEntries(prev => ({
      ...prev,
      [date]: !prev[date]
    }));
  };
  
  const [showFuturePlans, setShowFuturePlans] = useState(false);

  return (
    <section
      className="w-full max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6 md:px-8 relative bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 rounded-xl sm:rounded-2xl border border-white/20 shadow-[0_16px_48px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_56px_rgba(0,0,0,0.5)] transition-shadow duration-300 my-4 sm:my-8"
      aria-label="Developer Journey Blog Section"
    >
      {/* Enhanced background pattern with better visibility */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-[0.08] z-0 rounded-2xl"></div>
      
      {/* Additional gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 via-transparent to-emerald-900/10 rounded-2xl z-0"></div>
      
      <div className="relative z-10">
        <div className="mb-8 sm:mb-12 text-center">
          <div className="inline-block relative">
            <h2 className="font-roboto text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight animate-fade-in relative">
              <span className="bg-gradient-to-r from-electric-300 via-purple-400 to-electric-500 bg-clip-text text-transparent">
                Developer Journal
              </span>
            </h2>
            {/* Enhanced gradient underline with animation */}
            <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-electric-500/0 via-electric-500 to-purple-500/0 rounded-full transform origin-left scale-x-0 animate-[underline_1.5s_ease-out_forwards]"></div>
          </div>
          
          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-300/90 font-light max-w-2xl mx-auto leading-relaxed px-2">
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
          className="relative space-y-12 sm:space-y-16 mb-8 sm:mb-10 pl-2 sm:pl-4"
        >
          {blogEntries.map((entry, idx) => (
            <motion.li
              key={entry.date + entry.title}
              variants={entryVariants}
              className="relative group"
            >
              {/* Timeline node with enhanced icon styling */}
              <div className="absolute -left-1 sm:-left-2 top-1 flex items-center justify-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#1a1a1f] to-[#202025] border-2 border-electric-500/50 shadow-lg shadow-electric-500/20 flex items-center justify-center group-hover:scale-110 group-hover:border-electric-500/70 transition-all duration-300">
                  {getCategoryIcon(entry.category)}
                </div>
              </div>
              
              <div className="ml-10 sm:ml-12">
                {/* Date display with enhanced styling */}
                <div className="flex items-center space-x-3 sm:space-x-4 mb-2 sm:mb-3">
                  <span className="inline-flex items-center text-[11px] sm:text-xs font-medium text-electric-400/90 font-roboto select-none bg-gradient-to-r from-[#1a1a1f] to-[#202025] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-electric-500/30 shadow-sm">
                    <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1.5 sm:mr-2 text-electric-400" />
                    {new Date(entry.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                
                {/* Title with enhanced gradient and hover effect */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-roboto mt-2 mb-2 sm:mb-3 group-hover:translate-x-1 transition-transform duration-300">
                  <span className="bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
                    {entry.title}
                  </span>
                </h3>
                
                {/* Enhanced content card with solid backgrounds */}
                <Card className="bg-gradient-to-br from-[#1a1a1f] via-[#1c1c22] to-[#202025] border border-gray-600/30 shadow-xl shadow-black/30 hover:shadow-2xl hover:shadow-gray-500/10 hover:border-gray-500/40 transition-all duration-300 overflow-hidden group-hover:translate-x-1 rounded-xl sm:rounded-2xl">
                  <div className="p-4 sm:p-6">
                    {/* Main content with enhanced typography */}
                    <p className="text-sm sm:text-base md:text-lg font-roboto text-gray-100 leading-relaxed mb-4">
                      {entry.content}
                    </p>
                    
                    {/* Expandable details with smooth transitions */}
                    <motion.div
                      initial="collapsed"
                      animate={expandedEntries[entry.date] ? "expanded" : "collapsed"}
                      variants={expandableVariants}
                      className="overflow-hidden will-change-[height,opacity]"
                      style={{
                        transform: "translateZ(0)",
                        backfaceVisibility: "hidden"
                      }}
                    >
                      {/* Why chosen with enhanced styling */}
                      <motion.div 
                        className="mt-4 sm:mt-6 bg-gradient-to-r from-gray-800/95 to-gray-900/95 p-4 sm:p-5 rounded-lg sm:rounded-xl border-l-2 border-electric-500/40 shadow-lg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      >
                        <h4 className="text-sm sm:text-base font-semibold text-electric-300 mb-2 sm:mb-3">Why I Chose This Approach:</h4>
                        <p className="text-sm sm:text-base text-gray-100 leading-relaxed">{entry.whyChosen}</p>
                      </motion.div>
                      
                      {/* Implementation steps with enhanced list styling */}
                      <motion.div 
                        className="mt-4 sm:mt-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.15 }}
                      >
                        <h4 className="text-sm sm:text-base font-semibold text-electric-300 mb-2 sm:mb-3">Implementation:</h4>
                        <ul className="space-y-2 sm:space-y-3">
                          {entry.implementation.map((step, i) => (
                            <motion.li 
                              key={i} 
                              className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-gray-100"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2, delay: 0.2 + (i * 0.05) }}
                            >
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-electric-400 flex-shrink-0"></span>
                              <span className="leading-relaxed">{step}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                      
                      {/* Enhanced key takeaway box */}
                      <motion.div 
                        className="mt-4 sm:mt-6 bg-gradient-to-r from-gray-800/95 to-gray-900/95 p-4 sm:p-5 rounded-lg sm:rounded-xl border-l-4 border-electric-500/50 shadow-lg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.2 }}
                      >
                        <h4 className="text-sm sm:text-base font-semibold text-electric-300 mb-2 sm:mb-3">Key Takeaway:</h4>
                        <p className="text-sm sm:text-base text-gray-100 leading-relaxed">{entry.keyTakeaway}</p>
                      </motion.div>
                      
                      {/* Related links with enhanced button styling */}
                      {entry.links && entry.links.length > 0 && (
                        <motion.div 
                          className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3"
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
                                className="group inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-medium rounded-full bg-gradient-to-r from-emerald-900/60 to-emerald-800/50 hover:from-emerald-900/80 hover:to-emerald-800/70 border border-emerald-600/50 hover:border-emerald-500/60 transition-all duration-300 text-emerald-400 hover:text-emerald-300 shadow-sm hover:shadow-lg hover:shadow-emerald-900/30 active:scale-[0.97] hover:-translate-y-[1px] min-h-[32px] sm:min-h-[36px]"
                                asChild
                              >
                                <a href={link.url} target="_blank" rel="noopener noreferrer" className="px-3 sm:px-4 py-1.5 sm:py-2">
                                  {link.label}
                                  <ExternalLink className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 opacity-80 group-hover:opacity-100" />
                                </a>
                              </Button>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                    
                    {/* Enhanced toggle button positioned to the right */}
                    <div className="mt-3 sm:mt-4 flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleEntry(entry.date)}
                        className="relative text-purple-400 border border-purple-400/60 bg-gradient-to-r from-purple-900/30 to-purple-800/20 hover:bg-purple-800/40 hover:border-purple-500/70 hover:text-purple-200 transition-all duration-300 rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium active:bg-purple-900/50 active:scale-[0.98] min-h-[32px] sm:min-h-[36px] will-change-transform group/button shadow-sm hover:shadow-lg hover:shadow-purple-500/20"
                      >
                        <motion.div
                          animate={{ rotate: expandedEntries[entry.date] ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: [0.2, 0, 0.1, 1] }}
                          className="inline-flex items-center justify-center mr-1.5"
                        >
                          <ChevronDown 
                            className="w-3.5 h-3.5 text-purple-400 group-hover/button:text-purple-200 transition-colors duration-200" 
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
        
        {/* Future plans section with enhanced styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 sm:mt-12"
        >
          <Button
            variant="blog"
            className="relative flex items-center gap-2 mb-3 sm:mb-4 border-dashed border-electric-500/60 hover:border-electric-500/80 rounded-lg sm:rounded-xl min-h-[40px] sm:min-h-[44px] text-sm sm:text-base bg-gradient-to-r from-electric-900/30 to-electric-800/20 hover:bg-electric-900/40 transition-all duration-300 will-change-transform group/next-steps"
            onClick={() => setShowFuturePlans(!showFuturePlans)}
          >
            <motion.div
              animate={{ rotate: showFuturePlans ? 180 : 0 }}
              transition={{ duration: 0.4, ease: [0.2, 0, 0.1, 1] }}
              className="inline-flex items-center justify-center"
            >
              <ChevronDown 
                className="w-4 h-4 text-electric-400 group-hover/next-steps:text-electric-300 transition-colors duration-200" 
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
                style={{
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden"
                }}
              >
                <div className="bg-gradient-to-br from-blue-900/30 to-emerald-900/20 rounded-lg border border-blue-900/40 p-4 sm:p-5 shadow-lg">
                  <motion.h3 
                    className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    Coming Soon
                  </motion.h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {futurePlans.map((plan, idx) => (
                      <motion.li 
                        key={idx}
                        custom={idx}
                        variants={listItemVariants}
                        className="flex items-center gap-2 sm:gap-3"
                      >
                        <motion.div 
                          className="bg-gradient-to-br from-electric-500/40 to-electric-500/20 rounded-full p-1"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.3 + (idx * 0.08) }}
                        >
                          <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-electric-300" />
                        </motion.div>
                        <span className="text-sm sm:text-base text-gray-200">{plan}</span>
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
