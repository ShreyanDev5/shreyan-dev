import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Calendar, Lightbulb, Code, ChevronDown, PenTool, Rocket, Wrench, Palette, Zap } from "lucide-react";
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
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const entryVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
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
        duration: 0.5,
        ease: "easeOut"
      },
      opacity: {
        duration: 0.3,
        delay: 0.1
      }
    }
  },
  collapsed: {
    opacity: 0,
    height: 0,
    transition: {
      height: {
        duration: 0.4,
        ease: "easeOut"
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
        ease: "easeOut"
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
        duration: 0.5,
        ease: "easeOut"
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
      ease: "easeOut"
    }
  })
};

// Helper function to get icon based on category
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "setup":
      return <Code className="text-emerald-400" />;
    case "challenge":
      return <Wrench className="text-amber-400" />;
    case "feature":
      return <Zap className="text-blue-400" />;
    case "design":
      return <Palette className="text-purple-400" />;
    case "launch":
      return <Rocket className="text-cyan-400" />;
    default:
      return <PenTool className="text-gray-400" />;
  }
};

// Helper function to get category color
const getCategoryColor = (category: string) => {
  switch (category) {
    case "setup":
      return "from-emerald-500/20 to-emerald-600/20";
    case "challenge":
      return "from-amber-500/20 to-amber-600/20";
    case "feature":
      return "from-blue-500/20 to-blue-600/20";
    case "design":
      return "from-purple-500/20 to-purple-600/20";
    case "launch":
      return "from-cyan-500/20 to-cyan-600/20";
    default:
      return "from-gray-500/20 to-gray-600/20";
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
      className="w-full max-w-6xl mx-auto py-28 sm:py-32 md:py-40 px-4 sm:px-6 md:px-8 relative rounded-3xl bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/50 shadow-2xl"
      aria-label="Developer Journey Blog Section"
      id="blog"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 15% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 20%),
                          radial-gradient(circle at 85% 30%, rgba(56, 189, 248, 0.1) 0%, transparent 20%),
                          radial-gradient(circle at 50% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 20%)`,
        backgroundSize: '800px 600px, 600px 800px, 700px 700px'
      }}></div>
      
      <div className="relative z-10">
        <div className="mb-12 sm:mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/60 border border-gray-700/50 mb-6">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-emerald-500 blur-md opacity-30"></div>
                <PenTool className="w-4 h-4 text-emerald-400 relative z-10" />
              </div>
              <span className="text-gray-200 text-sm font-medium">Developer Insights</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Developer Journal
              </span>
            </h2>
          </motion.div>
          
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto mb-6 rounded-full" />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Insights, growth, and the road so far.
          </motion.p>
        </div>
        
        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={timelineVariants}
          className="relative space-y-10 sm:space-y-14 mb-10 sm:mb-12"
        >
          {/* Timeline connector */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500/30 via-blue-500/30 to-purple-500/30 rounded-full"></div>
          
          {blogEntries.map((entry, idx) => (
            <motion.li
              key={entry.date + entry.title}
              variants={entryVariants}
              className="relative group"
            >
              {/* Timeline node with enhanced icon styling */}
              <div className="absolute -left-5 top-0 flex items-center justify-center">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getCategoryColor(entry.category)} border-2 border-gray-600/50 shadow-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300`}>
                  {getCategoryIcon(entry.category)}
                </div>
              </div>
              
              <div className="ml-16">
                {/* Date display with enhanced styling */}
                <div className="flex items-center space-x-3 mb-3">
                  <span className="inline-flex items-center text-xs font-medium text-cyan-400 font-body select-none bg-gray-800/60 px-3 py-2 rounded-full border border-gray-700/50 shadow-sm">
                    <Calendar className="w-3 h-3 mr-2 text-cyan-400" />
                    {new Date(entry.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                
                {/* Title with enhanced gradient and hover effect */}
                <h3 className="text-2xl sm:text-3xl font-bold font-heading mb-3 group-hover:translate-x-1 transition-transform duration-300">
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {entry.title}
                  </span>
                </h3>
                
                {/* Enhanced content card with refined dark grey scheme */}
                <Card className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden rounded-2xl group-hover:translate-x-1">
                  <div className="p-5 sm:p-6 md:p-7">
                    {/* Main content with enhanced typography */}
                    <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-5">
                      {entry.content}
                    </p>
                    
                    {/* Enhanced expandable details with optimized animations */}
                    <motion.div
                      initial="collapsed"
                      animate={expandedEntries[entry.date] ? "expanded" : "collapsed"}
                      variants={expandableVariants}
                      className="overflow-hidden"
                    >
                      {/* Why chosen with enhanced styling */}
                      <motion.div 
                        className="mt-5 bg-gradient-to-r from-gray-800/70 to-gray-900/70 p-5 rounded-xl border-l-4 border-emerald-500/40 shadow-md"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.15 }}
                      >
                        <h4 className="text-base font-semibold text-emerald-400 mb-3 flex items-center">
                          <Lightbulb className="w-4 h-4 mr-2" />
                          Why I Chose This Approach
                        </h4>
                        <p className="text-base text-gray-200 leading-relaxed">{entry.whyChosen}</p>
                      </motion.div>
                      
                      {/* Implementation steps with enhanced list styling */}
                      <motion.div 
                        className="mt-5"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.25 }}
                      >
                        <h4 className="text-base font-semibold text-blue-400 mb-3">Implementation</h4>
                        <ul className="space-y-3">
                          {entry.implementation.map((step, i) => (
                            <motion.li 
                              key={i} 
                              className="flex items-start gap-3 text-base text-gray-200"
                              initial={{ opacity: 0, x: -15 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.3 + (i * 0.1) }}
                            >
                              <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-400 flex-shrink-0"></span>
                              <span className="leading-relaxed">{step}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                      
                      {/* Enhanced key takeaway box */}
                      <motion.div 
                        className="mt-5 bg-gradient-to-r from-gray-800/70 to-gray-900/70 p-5 rounded-xl border-l-4 border-purple-500/40 shadow-md"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                      >
                        <h4 className="text-base font-semibold text-purple-400 mb-3">Key Takeaway</h4>
                        <p className="text-base text-gray-200 leading-relaxed">{entry.keyTakeaway}</p>
                      </motion.div>
                      
                      {/* Related links with enhanced button styling */}
                      {entry.links && entry.links.length > 0 && (
                        <motion.div 
                          className="mt-5 flex flex-wrap gap-3"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.4 }}
                        >
                          {entry.links.map((link, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: 0.45 + (i * 0.1) }}
                            >
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="group inline-flex items-center gap-2 text-sm font-medium rounded-xl bg-gray-700/50 hover:bg-gray-700/70 border border-gray-600/50 hover:border-gray-500/50 transition-all duration-300 text-cyan-400 hover:text-cyan-300 shadow-sm hover:shadow-md min-h-[36px]"
                                asChild
                              >
                                <a href={link.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2">
                                  {link.label}
                                  <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 opacity-80 group-hover:opacity-100" />
                                </a>
                              </Button>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                    
                    {/* Enhanced toggle button with improved performance */}
                    <div className="mt-5 flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleEntry(entry.date)}
                        className="relative text-purple-400 border border-purple-400/50 bg-gray-800/50 hover:bg-gray-800/70 hover:border-purple-500/50 hover:text-purple-300 transition-all duration-300 rounded-xl px-4 py-2 text-sm font-medium active:scale-[0.98] min-h-[36px] group/button shadow-sm hover:shadow-md"
                      >
                        <motion.div
                          animate={{ rotate: expandedEntries[entry.date] ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="inline-flex items-center justify-center mr-2"
                        >
                          <ChevronDown 
                            className="w-4 h-4 text-purple-400 group-hover/button:text-purple-300 transition-colors duration-200" 
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
        
        {/* Enhanced future plans section with optimized animations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 sm:mt-14"
        >
          <Button
            variant="outline"
            className="relative flex items-center gap-2 mb-4 border border-gray-600/50 hover:border-gray-500/50 rounded-xl min-h-[40px] text-base bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-300 group/next-steps"
            onClick={toggleFuturePlans}
          >
            <motion.div
              animate={{ rotate: showFuturePlans ? 180 : 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="inline-flex items-center justify-center"
            >
              <ChevronDown 
                className="w-4 h-4 text-gray-300 group-hover/next-steps:text-white transition-colors duration-200" 
                strokeWidth={2.5}
              />
            </motion.div>
            <span className="text-gray-300 group-hover/next-steps:text-white transition-colors duration-200">
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
              >
                <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 rounded-2xl border border-gray-700/50 p-5 sm:p-6 shadow-xl">
                  <motion.h3 
                    className="text-2xl font-bold text-white mb-5 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    Coming Soon
                  </motion.h3>
                  <ul className="space-y-3">
                    {futurePlans.map((plan, idx) => (
                      <motion.li 
                        key={idx}
                        custom={idx}
                        variants={listItemVariants}
                        className="flex items-center gap-3"
                      >
                        <motion.div 
                          className="bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-full p-1"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.3 + (idx * 0.1) }}
                        >
                          <Lightbulb className="w-4 h-4 text-cyan-300" />
                        </motion.div>
                        <span className="text-base text-gray-200">{plan}</span>
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
