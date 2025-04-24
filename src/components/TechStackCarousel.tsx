
import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Tech stack data
const techItems = [
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#61DAFB",
    year: 2019,
    description: "Building interactive user interfaces with component-based architecture"
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    color: "#3178C6",
    year: 2020,
    description: "Adding static type checking to JavaScript for better dev experience"
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "#339933",
    year: 2018,
    description: "Server-side JavaScript runtime for building scalable applications"
  },
  {
    name: "Tailwind",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    color: "#38B2AC",
    year: 2021,
    description: "Utility-first CSS framework for rapid UI development"
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    color: "#47A248",
    year: 2018,
    description: "NoSQL database for flexible, scalable data storage"
  },
  {
    name: "GraphQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
    color: "#E10098",
    year: 2020,
    description: "Query language for APIs with precise data fetching"
  },
  {
    name: "AWS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
    color: "#FF9900",
    year: 2019,
    description: "Cloud services platform for scalable infrastructure"
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    color: "#2496ED",
    year: 2020,
    description: "Containerization for consistent deployment environments"
  },
];

interface TechItemProps {
  item: typeof techItems[0];
  index: number;
}

const TechItem: React.FC<TechItemProps> = ({ item, index }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <motion.div 
            className="flex flex-col items-center gap-2 bg-white/5 backdrop-blur-md p-4 rounded-lg border border-white/10 hover:bg-white/10 transition-all"
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
            <div 
              className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-white/10 p-2"
              style={{ boxShadow: `0 0 15px ${item.color}30` }}
            >
              <img 
                src={item.icon} 
                alt={item.name}
                className="w-8 h-8 md:w-10 md:h-10 object-contain"
                loading="lazy"
              />
            </div>
            <span className="font-medium text-white mt-2">{item.name}</span>
            <span className="text-xs text-gray-400">Since {item.year}</span>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-gray-900/90 border-gray-700/50 max-w-xs">
          <p className="text-sm">{item.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
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
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-blue-950/10 to-background/80 z-0" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            Tech <span className="text-gradient">Stack</span>
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            Technologies I've mastered over the years, continuously expanding my toolkit to build powerful, scalable solutions.
          </motion.p>
        </motion.div>

        {/* Timeline with tech items */}
        <div className="relative mt-16 pb-8">
          {/* Timeline track */}
          <div className="absolute left-0 right-0 h-1 top-32 bg-gradient-to-r from-blue-900/30 via-blue-500/40 to-blue-900/30 rounded-full z-0" />

          {/* Tech items */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 relative z-10">
            {techItems.map((item, index) => (
              <TechItem key={item.name} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackCarousel;
