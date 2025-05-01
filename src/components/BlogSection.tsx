
import { motion } from "framer-motion";
import { ExternalLink, Calendar, Lightbulb, Code } from "lucide-react";
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
  visible: { opacity: 1, y: 0 },
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
      className="w-full max-w-3xl mx-auto py-12 animate-fade-in px-4 sm:px-6"
      aria-label="Developer Journey Blog Section"
    >
      <h2 className="font-roboto text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight animate-fade-in flex items-center gap-2">
        <span className="text-gradient-primary">Blog & Developer Journal</span>
      </h2>
      <p className="mb-8 text-base md:text-lg text-gray-200 font-roboto">
        Tracing the journey: professional growth, challenges, and key milestones.
      </p>
      
      <motion.ol
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={timelineVariants}
        className="relative border-l-2 border-blue-400/40 pl-8 space-y-12 mb-10"
      >
        {blogEntries.map((entry, idx) => (
          <motion.li
            key={entry.date + entry.title}
            variants={entryVariants}
            className="relative group"
          >
            {/* Date marker and icon */}
            <div className="absolute -left-4 top-1 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-blue-900/50 border-2 border-blue-400/60 shadow-glow flex items-center justify-center group-hover:scale-110 transition-transform">
                {getCategoryIcon(entry.category)}
              </div>
            </div>
            
            <div className="ml-2">
              {/* Date display */}
              <span className="inline-flex items-center text-xs font-semibold text-blue-300 font-roboto select-none bg-blue-900/30 px-2 py-1 rounded mb-2">
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                {new Date(entry.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              
              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold font-roboto text-gray-100 mt-1 mb-2">
                {entry.title}
              </h3>
              
              {/* Content card */}
              <Card className="bg-gradient-to-br from-gray-800/90 via-gray-900/80 to-background/70 border border-blue-900/30 shadow-md hover:shadow-glow transition-all duration-300 overflow-hidden">
                <div className="p-5">
                  {/* Main content */}
                  <p className="text-base md:text-lg font-roboto text-gray-200 leading-relaxed mb-4">
                    {entry.content}
                  </p>
                  
                  {/* Expandable details */}
                  <div className={`overflow-hidden transition-all duration-300 ${expandedEntries[entry.date] ? 'max-h-96' : 'max-h-0 opacity-0'}`}>
                    {/* Why chosen */}
                    <div className="mt-4">
                      <h4 className="text-sm font-bold text-electric-300 mb-2">Why I Chose This Approach:</h4>
                      <p className="text-sm text-gray-300">{entry.whyChosen}</p>
                    </div>
                    
                    {/* Implementation steps */}
                    <div className="mt-4">
                      <h4 className="text-sm font-bold text-electric-300 mb-2">Implementation:</h4>
                      <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                        {entry.implementation.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Key takeaway */}
                    <div className="mt-4 bg-blue-900/20 p-3 rounded border-l-4 border-electric-500">
                      <h4 className="text-sm font-bold text-electric-300 mb-1">Key Takeaway:</h4>
                      <p className="text-sm text-gray-200">{entry.keyTakeaway}</p>
                    </div>
                    
                    {/* Related links */}
                    {entry.links && entry.links.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {entry.links.map((link, i) => (
                          <Button 
                            key={i} 
                            size="sm" 
                            variant="outline"
                            className="inline-flex items-center gap-1 text-xs"
                            asChild
                          >
                            <a href={link.url} target="_blank" rel="noopener noreferrer">
                              {link.label}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Toggle button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleEntry(entry.date)}
                    className="mt-2 text-electric-300 hover:text-electric-500 transition-colors"
                  >
                    {expandedEntries[entry.date] ? 'Show Less' : 'Show More'}
                  </Button>
                </div>
              </Card>
            </div>
          </motion.li>
        ))}
      </motion.ol>
      
      {/* Future plans section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-12"
      >
        <Button
          variant="outline"
          className="flex items-center gap-2 mb-4 border-dashed border-electric-500/50 hover:border-electric-500"
          onClick={() => setShowFuturePlans(!showFuturePlans)}
        >
          {showFuturePlans ? 'Hide Next Steps' : 'Show Next Steps'}
        </Button>
        
        {showFuturePlans && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gradient-to-br from-blue-900/20 to-emerald-900/10 rounded-lg border border-blue-900/30 p-5"
          >
            <h3 className="text-xl font-bold text-white mb-4">Coming Soon</h3>
            <ul className="space-y-3">
              {futurePlans.map((plan, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="bg-electric-500/20 rounded-full p-1 mt-0.5">
                    <Lightbulb className="w-4 h-4 text-electric-300" />
                  </div>
                  <span className="text-gray-200">{plan}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default BlogSection;
