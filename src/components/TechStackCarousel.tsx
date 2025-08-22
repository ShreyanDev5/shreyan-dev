import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
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
  const [isTouched, setIsTouched] = useState(false);
  const touchTimeoutRef = useRef<NodeJS.Timeout>();

  const handleTouchStart = () => {
    setIsTouched(true);
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
    }
  };

  const handleTouchEnd = () => {
    touchTimeoutRef.current = setTimeout(() => {
      setIsTouched(false);
    }, 300); // Keep the effect visible for 300ms after touch
  };

  useEffect(() => {
    return () => {
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current);
      }
    };
  }, []);

  const touchAnimation = {
    y: -4,
    scale: 1.01,
    boxShadow: `0 12px 24px -8px ${item.color}40`,
    borderColor: `${item.color}60`,
    background: `linear-gradient(135deg, rgba(255,255,255,0.12) 0%, ${item.color}20 100%)`,
  };

  return (
    <motion.div 
      className="group flex flex-col h-full bg-gradient-to-br from-white/5 to-white/2 p-4 sm:p-6 rounded-xl border border-white/10 transition-all duration-300 ease-out will-change-transform touch-manipulation"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.2, delay: index * 0.02, ease: [0.2, 0, 0, 1] }}
      whileHover={touchAnimation}
      animate={isTouched ? touchAnimation : {}}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
        <motion.div 
          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/10 p-2 transition-all duration-300 ease-out will-change-transform"
          style={{ 
            boxShadow: `0 0 12px ${item.color}25`,
            background: `linear-gradient(135deg, ${item.color}20 0%, ${item.color}10 100%)`
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: `0 0 20px ${item.color}40`,
            background: `linear-gradient(135deg, ${item.color}25 0%, ${item.color}15 100%)`,
            transition: { duration: 0.2, ease: [0.2, 0, 0, 1] }
          }}
          animate={isTouched ? {
            scale: 1.05,
            boxShadow: `0 0 20px ${item.color}40`,
            background: `linear-gradient(135deg, ${item.color}25 0%, ${item.color}15 100%)`,
          } : {}}
        >
          <img 
            src={item.icon} 
            alt={item.name}
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 object-contain transition-transform duration-300 ease-out will-change-transform"
            loading="lazy"
          />
        </motion.div>
        <div>
          <h4 className="font-medium text-base sm:text-lg text-white transition-colors duration-100 ease-custom group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300">
            {item.name}
          </h4>
          <span className="text-xs text-gray-400 transition-colors duration-100 ease-custom group-hover:text-gray-300">
            Since {item.year}
          </span>
        </div>
      </div>
      
      <p className="text-xs sm:text-sm text-gray-300 flex-grow mb-3 sm:mb-4 transition-colors duration-100 ease-custom group-hover:text-gray-200 leading-relaxed">
        {item.description}
      </p>
      
      <Button 
        variant="ghost"
        size="sm" 
        className="w-full justify-start mt-auto border border-white/10 hover:border-white/20 transition-all duration-100 ease-custom will-change-transform group-hover:bg-white/5 text-white hover:text-white antialiased subpixel-antialiased py-2 sm:py-2.5"
        style={{ 
          borderColor: `${item.color}30`,
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility'
        }}
        onClick={() => window.location.href = item.projectLink}
      >
        <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-2 transition-transform duration-100 ease-custom will-change-transform group-hover:translate-x-0.5 text-white antialiased" />
        <span className="text-xs font-medium text-white/90 hover:text-white antialiased tracking-wide">See in action</span>
      </Button>
    </motion.div>
  );
};

const CategorySection: React.FC<{category: typeof techCategories[0], startIndex: number}> = ({ category, startIndex }) => {
  // Define unique gradients for each category
  const categoryGradients = {
    "Front-End Development": "from-sky-400 to-emerald-400",
    "Back-End & Databases": "from-purple-500 to-blue-600",
    "DevOps & Cloud": "from-slate-400 to-cyan-400"
  };

  return (
    <div className="mb-8 sm:mb-12">
      <motion.h3 
        className={`text-xl sm:text-2xl font-bold mb-6 sm:mb-8 bg-gradient-to-r ${categoryGradients[category.name as keyof typeof categoryGradients]} bg-clip-text text-transparent`}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {category.name}
      </motion.h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
    <section className="py-12 sm:py-20 px-4 relative overflow-hidden" id="tech-stack">
      {/* Background elements */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-10 z-0" />
      <div className="absolute inset-0 subtle-glow-overlay z-0" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-8 sm:mb-12 px-4"
        >
          <motion.div
            className="relative inline-block"
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.2, 0, 0, 1] } }
            }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tight relative">
              <span className="bg-gradient-to-r from-electric-500 via-blue-400 to-emerald-500 bg-clip-text text-transparent">
                Tech Stack
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-electric-500 via-blue-400 to-emerald-500 rounded-full transform scale-x-0 transition-transform duration-100 ease-custom will-change-transform group-hover:scale-x-100" />
            </h2>
          </motion.div>
          
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-electric-500 via-blue-400 to-emerald-500 mx-auto mb-4 sm:mb-6 rounded-full" />
          
          <motion.p
            className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-clip-text text-transparent px-2"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            Tools and technologies I've used in real projects—grouped by their role.
          </motion.p>
        </motion.div>

        {/* Wrap content in enhanced rounded container */}
        <div className="rounded-lg sm:rounded-xl bg-gradient-to-br from-[#1a1a1d] to-[#16161a] p-4 sm:p-8 shadow-lg border border-white/5">
          {/* Categorized tech items */}
          <div className="mt-2 sm:mt-4">
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
