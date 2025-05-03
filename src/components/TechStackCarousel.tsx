
import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

// Reorganized tech stack data with categories and descriptions
const techCategories = [
  {
    name: "Front-End Development",
    tools: [
      {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        color: "#61DAFB",
        year: 2019,
        description: "Building interactive user interfaces with component-based architecture—like assembling reusable Lego blocks for seamless web experiences.",
        projectLink: "#projects"
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        color: "#3178C6",
        year: 2020,
        description: "Adding static type checking to JavaScript for better developer experience and code quality, catching errors before they happen in production.",
        projectLink: "#projects"
      },
      {
        name: "Tailwind",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
        color: "#38B2AC",
        year: 2021,
        description: "Building responsive interfaces with utility-first CSS—like having a design system that speeds up development while maintaining consistency.",
        projectLink: "#projects"
      },
    ]
  },
  {
    name: "Back-End & Databases",
    tools: [
      {
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        color: "#339933",
        year: 2018,
        description: "Creating fast, scalable server-side applications with JavaScript—enabling unified language development across the entire application stack.",
        projectLink: "#projects"
      },
      {
        name: "MongoDB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        color: "#47A248",
        year: 2018,
        description: "Designing scalable NoSQL databases—a flexible digital filing system for managing complex data while adapting to changing requirements.",
        projectLink: "#projects"
      },
      {
        name: "GraphQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
        color: "#E10098",
        year: 2020,
        description: "Implementing efficient APIs that deliver exactly the data clients need—like having a smart librarian who finds precisely what you request.",
        projectLink: "#projects"
      },
    ]
  },
  {
    name: "DevOps & Cloud",
    tools: [
      {
        name: "AWS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
        color: "#FF9900",
        year: 2019,
        description: "Leveraging cloud services for scalable infrastructure—like having an entire IT department available on demand for any project needs.",
        projectLink: "#projects"
      },
      {
        name: "Docker",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        color: "#2496ED",
        year: 2020,
        description: "Containerizing applications for consistent deployments across environments—ensuring 'it works on my machine' becomes 'it works everywhere'.",
        projectLink: "#projects"
      }
    ]
  }
];

interface TechItemProps {
  item: {
    name: string;
    icon: string;
    color: string;
    year: number;
    description: string;
    projectLink: string;
  };
  index: number;
}

const TechItem: React.FC<TechItemProps> = ({ item, index }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <motion.div 
            className="flex flex-col h-full bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-md p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ 
              y: -5,
              boxShadow: `0 10px 25px -5px ${item.color}30`,
              borderColor: `${item.color}50`
            }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div 
                className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/10 p-2"
                style={{ boxShadow: `0 0 15px ${item.color}30` }}
              >
                <img 
                  src={item.icon} 
                  alt={item.name}
                  className="w-8 h-8 md:w-9 md:h-9 object-contain"
                  loading="lazy"
                />
              </div>
              <div>
                <h4 className="font-medium text-lg text-white">{item.name}</h4>
                <span className="text-xs text-gray-400">Since {item.year}</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-300 flex-grow mb-4">{item.description}</p>
            
            <Button 
              variant="tech" 
              size="sm" 
              className="w-full justify-start hover:bg-white/5 border border-white/10 hover:border-white/20 mt-auto"
              style={{ 
                color: item.color,
                borderColor: `${item.color}30`,
              }}
              onClick={() => window.location.href = item.projectLink}
            >
              <ExternalLink className="w-3.5 h-3.5 mr-2" />
              <span className="text-xs">See in action</span>
            </Button>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-gray-900/90 border-gray-700/50 max-w-xs">
          <p className="text-sm">Since {item.year}: {item.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const CategorySection: React.FC<{category: typeof techCategories[0], startIndex: number}> = ({ category, startIndex }) => {
  return (
    <div className="mb-16">
      <motion.h3 
        className="text-2xl font-bold mb-8 bg-gradient-to-r from-emerald-500 to-blue-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {category.name}
      </motion.h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.tools.map((tool, idx) => (
          <TechItem 
            key={tool.name} 
            item={tool} 
            index={startIndex + idx} 
          />
        ))}
      </div>
    </div>
  );
};

const TechStackCarousel: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden" id="tech-stack">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-blue-950/10 to-background/80 z-0" />
      <div className="absolute inset-0 bg-circuit-pattern opacity-10 z-0" />
      <div className="absolute inset-0 subtle-glow-overlay z-0" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-electric-500 to-emerald-500 bg-clip-text text-transparent mb-4"
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            Technology <span className="text-white">Stack</span>
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            Technologies I've mastered over the years, organized by specialty area, with practical applications in real-world projects.
          </motion.p>
        </motion.div>

        {/* Wrap content in enhanced rounded container */}
        <div className="rounded-2xl bg-gradient-to-br from-[#1a1a1d] to-[#16161a] p-6 shadow-lg border border-white/5">
          {/* Categorized tech items */}
          <div className="mt-12">
            {techCategories.map((category, index) => {
              // Calculate starting index for animations
              const startIndex = techCategories.slice(0, index).reduce(
                (sum, cat) => sum + cat.tools.length, 0
              );
              
              return (
                <CategorySection 
                  key={category.name} 
                  category={category} 
                  startIndex={startIndex} 
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackCarousel;
