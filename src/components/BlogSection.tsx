import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ExternalLink, Calendar, Lightbulb, Code, ChevronDown, PenTool, Rocket, Wrench, Palette, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useMemo, useRef, memo } from "react";

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

// Optimized timeline variants with better performance
const timelineVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05, // Reduced stagger for better performance
      delayChildren: 0.02,
    },
  },
};

// Optimized entry variants with faster animations
const entryVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut" as const
    }
  },
};

// Simplified expandable variants with better performance
// Slightly slower closing animation for smoother mobile experience
const expandableVariants = {
  expanded: {
    opacity: 1,
    height: "auto",
    transition: {
      height: {
        duration: 0.2,
        ease: "easeOut" as const
      },
      opacity: {
        duration: 0.1,
        delay: 0.02
      }
    }
  },
  collapsed: {
    opacity: 0,
    height: 0,
    transition: {
      height: {
        duration: 0.25,
        ease: "easeOut" as const
      },
      opacity: {
        duration: 0.15
      }
    }
  }
};

// Simplified future plans variants with better performance
const futurePlansVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      height: {
        duration: 0.2,
        ease: "easeOut" as const
      },
      opacity: {
        duration: 0.1
      }
    }
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      height: {
        duration: 0.3,
        ease: "easeOut" as const
      },
      opacity: {
        duration: 0.2,
        delay: 0.02
      }
    }
  }
};

// Simplified list item variants with better performance
const listItemVariants = {
  hidden: { opacity: 0, x: -5 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      delay: 0.02 + (i * 0.03),
      ease: "easeOut" as const
    }
  })
};

// Helper function to get icon based on category
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "setup":
      return <Code className="text-white" />;
    case "challenge":
      return <Wrench className="text-white" />;
    case "feature":
      return <Zap className="text-white" />;
    case "design":
      return <Palette className="text-white" />;
    case "launch":
      return <Rocket className="text-white" />;
    default:
      return <PenTool className="text-white" />;
  }
};

// Helper function to get category color
const getCategoryColor = (category: string) => {
  switch (category) {
    case "setup":
      return "from-emerald-500 to-emerald-600";
    case "challenge":
      return "from-amber-500 to-amber-600";
    case "feature":
      return "from-blue-500 to-blue-600";
    case "design":
      return "from-purple-500 to-purple-600";
    case "launch":
      return "from-cyan-500 to-cyan-600";
    default:
      return "from-gray-500 to-gray-600";
  }
};

// Memoized BlogEntry component for better performance
const BlogEntry = memo(({ 
  entry, 
  isExpanded, 
  toggleEntry 
}: { 
  entry: typeof blogEntries[0]; 
  isExpanded: boolean; 
  toggleEntry: (date: string) => void;
}) => (
  <motion.li
    variants={entryVariants}
    className="relative group"
    // Performance optimization
    style={{ 
      willChange: 'opacity, transform',
      transform: 'translateZ(0)'
    }}
  >
    {/* Timeline node with enhanced icon styling */}
    <div className="absolute left-5 top-0 flex items-center justify-center z-10 transform -translate-x-1/2">
      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getCategoryColor(entry.category)} border-2 border-gray-600/50 flex items-center justify-center`}
        // Performance optimization
        style={{ 
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        {getCategoryIcon(entry.category)}
      </div>
    </div>
    
    <div className="ml-14 sm:ml-16">
      {/* Date display with enhanced styling */}
      <div className="flex items-center space-x-2 mb-2 sm:mb-3">
        <span className="inline-flex items-center text-xs font-medium text-cyan-400 font-body select-none bg-gray-800/60 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full border border-gray-700/50">
          <Calendar className="w-3 h-3 mr-1.5 sm:mr-2 text-cyan-400" />
          {new Date(entry.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
      
      {/* Title with enhanced gradient */}
      <h3 className="text-xl sm:text-2xl font-bold font-heading mb-2 sm:mb-3">
        <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          {entry.title}
        </span>
      </h3>
      
      {/* Enhanced content card with refined dark grey scheme */}
      <Card className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-700/50 rounded-xl sm:rounded-2xl">
        <div className="p-4 sm:p-5 md:p-6">
          {/* Main content with enhanced typography */}
          <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-4 sm:mb-5">
            {entry.content}
          </p>
          
          {/* Enhanced expandable details with optimized animations */}
          <motion.div
            initial="collapsed"
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={expandableVariants}
            className="overflow-hidden"
          >
            {/* Why chosen with enhanced styling */}
            <div 
              className="mt-4 sm:mt-5 bg-gradient-to-r from-gray-800/70 to-gray-900/70 p-4 sm:p-5 rounded-lg sm:rounded-xl border-l-4 border-emerald-500/40"
            >
              <h4 className="text-sm sm:text-base font-semibold text-emerald-400 mb-2 sm:mb-3 flex items-center">
                <Lightbulb className="w-4 h-4 mr-2" />
                Why I Chose This Approach
              </h4>
              <p className="text-sm sm:text-base text-gray-200 leading-relaxed">{entry.whyChosen}</p>
            </div>
            
            {/* Implementation steps with enhanced list styling */}
            <div 
              className="mt-4 sm:mt-5"
            >
              <h4 className="text-sm sm:text-base font-semibold text-blue-400 mb-2 sm:mb-3">Implementation</h4>
              <ul className="space-y-2 sm:space-y-3">
                {entry.implementation.map((step, i) => (
                  <li 
                    key={i} 
                    className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-gray-200"
                  >
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-400 flex-shrink-0"></span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Enhanced key takeaway box */}
            <div 
              className="mt-4 sm:mt-5 bg-gradient-to-r from-gray-800/70 to-gray-900/70 p-4 sm:p-5 rounded-lg sm:rounded-xl border-l-4 border-purple-500/40"
            >
              <h4 className="text-sm sm:text-base font-semibold text-purple-400 mb-2 sm:mb-3">Key Takeaway</h4>
              <p className="text-sm sm:text-base text-gray-200 leading-relaxed">{entry.keyTakeaway}</p>
            </div>
            
            {/* Related links with enhanced button styling */}
            {entry.links && entry.links.length > 0 && (
              <div 
                className="mt-4 sm:mt-5 flex flex-wrap gap-2 sm:gap-3"
              >
                {entry.links.map((link, i) => (
                  <div
                    key={i}
                  >
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="group inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium rounded-lg sm:rounded-xl bg-gray-700/50 hover:bg-gray-700/70 border border-gray-600/50 hover:border-gray-500/50 min-h-[32px] sm:min-h-[36px]"
                      asChild
                    >
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 sm:px-4 sm:py-2">
                        {link.label}
                        <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-80 group-hover:opacity-100" />
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
          
          {/* Enhanced toggle button with improved performance */}
          <div className="mt-4 sm:mt-5 flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleEntry(entry.date)}
              className="relative text-purple-400 border border-purple-400/50 bg-gray-800/50 hover:bg-gray-800/70 hover:border-purple-500/50 hover:text-purple-300 rounded-lg sm:rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium min-h-[32px] sm:min-h-[36px]"
            >
              <div
                className="inline-flex items-center justify-center mr-1.5 sm:mr-2 transition-transform duration-200"
                style={{ transform: `rotate(${isExpanded ? 180 : 0}deg)` }}
              >
                <ChevronDown 
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" 
                  strokeWidth={2.5}
                />
              </div>
              <span>
                {isExpanded ? 'Show Less' : 'Show More'}
              </span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  </motion.li>
));

const BlogSection = () => {
  const [expandedEntries, setExpandedEntries] = useState<Record<string, boolean>>({});
  const [showFuturePlans, setShowFuturePlans] = useState(false);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80, // Reduced stiffness for better performance
    damping: 25, // Reduced damping for better performance
    restDelta: 0.001
  });

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
      className="w-full max-w-5xl mx-auto py-16 sm:py-20 md:py-24 my-8 sm:my-12 md:my-16 px-4 sm:px-6 md:px-8 relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/50"
      aria-label="Developer Journey Blog Section"
      id="blog"
    >
      {/* Subtle background pattern - simplified on mobile for better performance */}
      <div className="absolute inset-0 opacity-0 sm:opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 15% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 20%),
                          radial-gradient(circle at 85% 30%, rgba(56, 189, 248, 0.1) 0%, transparent 20%),
                          radial-gradient(circle at 50% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 20%)`,
        backgroundSize: '800px 600px, 600px 800px, 700px 700px'
      }}></div>
      
      <div className="relative z-10">
        <div className="mb-8 sm:mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="inline-block"
            // Performance optimization
            style={{ 
              willChange: 'opacity, transform',
              transform: 'translateZ(0)'
            }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-800/60 border border-gray-700/50 mb-4 sm:mb-6">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-emerald-500 blur-md opacity-20 sm:opacity-30"></div>
                <PenTool className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 relative z-10" />
              </div>
              <span className="text-gray-200 text-xs sm:text-sm font-medium">Developer Insights</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold tracking-tight mb-4 sm:mb-6 heading-gradient-brand">
              Developer Journal
            </h2>
          </motion.div>
          
          <div className="w-24 h-1 sm:w-32 sm:h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto mb-4 sm:mb-6 rounded-full" />
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="text-sm sm:text-base md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed"
            // Performance optimization
            style={{ 
              willChange: 'opacity, transform',
              transform: 'translateZ(0)'
            }}
          >
            Insights, growth, and the road so far.
          </motion.p>
        </div>
        
        <motion.ol
          ref={containerRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={timelineVariants}
          className="relative space-y-8 sm:space-y-10 mb-8 sm:mb-10"
        >
          {/* Timeline connector - simplified on mobile for better performance */}
          <motion.div 
            className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500/60 via-blue-500/60 to-purple-500/60 rounded-full origin-top z-0 transform -translate-x-1/2"
            style={{ 
              scaleY,
              willChange: 'transform',
              transform: 'translateZ(0)',
              transformOrigin: 'top'
            }}
          />
          
          {blogEntries.map((entry) => (
            <BlogEntry
              key={entry.date + entry.title}
              entry={entry}
              isExpanded={!!expandedEntries[entry.date]}
              toggleEntry={toggleEntry}
            />
          ))}
        </motion.ol>
        
        {/* Enhanced future plans section with optimized animations */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mt-8 sm:mt-10"
          // Performance optimization
          style={{ 
            willChange: 'opacity, transform',
            transform: 'translateZ(0)'
          }}
        >
          <Button
            variant="outline"
            className="relative flex items-center gap-2 mb-3 sm:mb-4 border border-gray-600/50 hover:border-gray-500/50 rounded-lg sm:rounded-xl min-h-[36px] sm:min-h-[40px] text-sm sm:text-base bg-gray-800/50 hover:bg-gray-800/70"
            onClick={toggleFuturePlans}
          >
            <div
              className="inline-flex items-center justify-center transition-transform duration-200"
              style={{ transform: `rotate(${showFuturePlans ? 180 : 0}deg)` }}
            >
              <ChevronDown 
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-300" 
                strokeWidth={2.5}
              />
            </div>
            <span className="text-gray-300">
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
                <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 rounded-xl sm:rounded-2xl border border-gray-700/50 p-4 sm:p-5">
                  <motion.h3 
                    className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-5 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
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
                          className="bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-full p-1"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.2, delay: 0.1 + (idx * 0.05) }}
                        >
                          <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-300" />
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
