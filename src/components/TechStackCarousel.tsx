import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { ExternalLink, Code, Database, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";

// Reorganized tech stack data with categories and descriptions
const techCategories = [
  {
    name: "Front-End Development",
    icon: Code,
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
    icon: Database,
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
    icon: Cloud,
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
    <motion.div 
      className="group flex flex-col h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-5 sm:p-6 rounded-2xl transition-all duration-500 ease-out border border-gray-700/50"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ 
        y: -5,
        scale: 1.02,
        boxShadow: `0 20px 40px -10px ${item.color}20`,
        borderColor: `${item.color}40`,
      }}
    >
      <div className="flex items-start gap-4 mb-4">
        <motion.div 
          className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-700/50 p-2 transition-all duration-300 ease-out border border-gray-600/50"
          style={{ 
            boxShadow: `0 0 10px ${item.color}15`,
          }}
          whileHover={{
            scale: 1.1,
            boxShadow: `0 0 15px ${item.color}25`,
            backgroundColor: `rgba(55, 65, 81, 0.6)`,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
        >
          <img 
            src={item.icon} 
            alt={item.name}
            className="w-7 h-7 object-contain transition-transform duration-300 ease-out"
            loading="lazy"
          />
        </motion.div>
        <div className="flex-1">
          <h4 className="font-bold text-lg text-white transition-colors duration-300 group-hover:text-emerald-100">
            {item.name}
          </h4>
          <span className="text-xs text-cyan-400 font-medium">
            Since {item.year}
          </span>
        </div>
      </div>
      
      <p className="text-sm text-gray-300 flex-grow mb-5 leading-relaxed transition-colors duration-300 group-hover:text-gray-200">
        {item.description}
      </p>
      
      <Button 
        variant="ghost"
        size="sm" 
        className="w-full justify-center mt-auto bg-gray-700/40 hover:bg-gray-700/60 border border-gray-600/50 hover:border-gray-500/50 transition-all duration-300 rounded-xl py-2.5 font-medium group-hover:shadow-lg"
        onClick={() => window.location.href = item.projectLink}
      >
        <ExternalLink className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:translate-x-1" />
        <span className="text-sm">See in action</span>
      </Button>
    </motion.div>
  );
};

const CategorySection: React.FC<{category: typeof techCategories[0], startIndex: number}> = ({ category, startIndex }) => {
  // Define unique gradients for each category
  const categoryGradients = {
    "Front-End Development": "from-sky-500 to-emerald-500",
    "Back-End & Databases": "from-purple-500 to-blue-500",
    "DevOps & Cloud": "from-slate-400 to-cyan-500"
  };
  
  const categoryIcons = {
    "Front-End Development": <Code className="w-5 h-5" />,
    "Back-End & Databases": <Database className="w-5 h-5" />,
    "DevOps & Cloud": <Cloud className="w-5 h-5" />
  };

  return (
    <div className="mb-10 sm:mb-12">
      <motion.h3 
        className="flex items-center gap-3 text-xl sm:text-2xl md:text-3xl font-heading font-bold mb-5 sm:mb-6"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className={`p-2 rounded-lg bg-gradient-to-br ${categoryGradients[category.name as keyof typeof categoryGradients]} text-white`}>
          {categoryIcons[category.name as keyof typeof categoryIcons]}
        </div>
        <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          {category.name}
        </span>
      </motion.h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
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
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className="py-16 sm:py-24 md:py-28 px-4 sm:px-6 relative overflow-hidden" id="tech-stack">
      {/* Premium minimal background overlays */}
      <div className="absolute inset-0 z-0 bg-noise-subtle" />
      <div className="absolute inset-0 z-0 bg-grid-subtle" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-12 sm:mb-16 px-4"
        >
          <motion.div
            className="relative inline-block"
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
            }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/60 border border-gray-700/50 mb-6">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-emerald-500 blur-md opacity-30"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-emerald-400 relative z-10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16 6.5 6.5 0 0 1 3 9.5 6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5z" />
                </svg>
              </div>
              <span className="text-gray-200 text-sm font-medium">Technical Expertise</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-6 tracking-tight heading-gradient-brand">
              Tech Stack
            </h2>
          </motion.div>
          
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto mb-6 rounded-full" />
          
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            Tools and technologies I've used in real projects—grouped by their role.
          </motion.p>
        </motion.div>

        {/* Premium container with refined dark grey scheme */}
        <div className="rounded-3xl bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-6 sm:p-8 md:p-10 shadow-xl border border-gray-700/50">
          {/* Categorized tech items */}
          <div className="mt-4 sm:mt-6">
            {techCategories.map((category, index) => {
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
