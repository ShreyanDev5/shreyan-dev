
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

// Profile image placeholder URL
const PROFILE_IMAGE = "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=150&h=150&q=80";

// Stats data
const stats = [
  { label: "Years Experience", value: 8, color: "bg-blue-500" },
  { label: "Projects Completed", value: 75, color: "bg-blue-600" },
  { label: "Technologies Mastered", value: 12, color: "bg-blue-700" },
];

// Keywords
const keywords = [
  { text: "Creative", color: "bg-gradient-to-r from-blue-500 to-blue-700" },
  { text: "Efficient", color: "bg-gradient-to-r from-emerald-500 to-emerald-700" },
  { text: "Empathetic", color: "bg-gradient-to-r from-purple-500 to-purple-700" },
];

// Skills data with tooltips
const skills = [
  { name: "React", tooltip: "Building interactive UIs with React and React Hooks" },
  { name: "TypeScript", tooltip: "Type-safe JavaScript for better developer experience" },
  { name: "AI Integration", tooltip: "Connecting to AI services via APIs" },
  { name: "Tailwind", tooltip: "Utility-first CSS framework for rapid UI development" },
  { name: "Node.js", tooltip: "JavaScript runtime for backend development" },
  { name: "Real Estate Tech", tooltip: "Specialized solutions for the real estate industry" },
];

// SVG Blob component
const Blob = ({ className = "", delay = 0 }) => {
  return (
    <motion.div
      className={`absolute opacity-30 z-0 ${className}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.3 }}
      transition={{ duration: 1.5, delay }}
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="500" height="500">
        <motion.path
          fill="#0EA5E9"
          d="M44.7,-76.4C58.9,-69.8,71.8,-58.9,79.6,-45C87.4,-31,90.2,-15.5,88.1,-1.2C86,13.1,79,26.2,70.8,38.1C62.6,50,53.2,60.8,41.2,66.4C29.2,72,14.6,72.5,0.6,71.5C-13.5,70.6,-27,68.2,-39.1,62.4C-51.2,56.7,-61.9,47.6,-69.8,36.2C-77.7,24.8,-82.8,12.4,-83.7,-0.5C-84.5,-13.4,-81.2,-26.8,-73.5,-37.6C-65.7,-48.3,-53.6,-56.5,-40.8,-63.5C-28,-70.5,-14,-76.3,0.7,-77.5C15.5,-78.6,30.9,-83,44.7,-76.4Z"
          transform="translate(100 100)"
          animate={{
            d: [
              "M44.7,-76.4C58.9,-69.8,71.8,-58.9,79.6,-45C87.4,-31,90.2,-15.5,88.1,-1.2C86,13.1,79,26.2,70.8,38.1C62.6,50,53.2,60.8,41.2,66.4C29.2,72,14.6,72.5,0.6,71.5C-13.5,70.6,-27,68.2,-39.1,62.4C-51.2,56.7,-61.9,47.6,-69.8,36.2C-77.7,24.8,-82.8,12.4,-83.7,-0.5C-84.5,-13.4,-81.2,-26.8,-73.5,-37.6C-65.7,-48.3,-53.6,-56.5,-40.8,-63.5C-28,-70.5,-14,-76.3,0.7,-77.5C15.5,-78.6,30.9,-83,44.7,-76.4Z",
              "M45.4,-75.3C59.2,-68.8,71.1,-57.2,79.1,-43.1C87.1,-29,91.2,-14.5,89.1,-1.2C87.1,12.1,78.9,24.2,70.1,35.8C61.3,47.4,51.8,58.4,40,65C28.2,71.6,14.1,73.6,-0.3,74.1C-14.7,74.6,-29.4,73.5,-42.3,67.5C-55.2,61.5,-66.2,50.7,-73.3,37.6C-80.3,24.5,-83.4,12.3,-82.9,0.3C-82.5,-11.7,-78.5,-23.3,-71.7,-34C-64.9,-44.7,-55.3,-54.3,-43.7,-61.9C-32.1,-69.4,-18.5,-74.9,-3.1,-70.2C12.3,-65.6,24.7,-51,35.7,-42.7C46.7,-34.4,56.4,-33.3,62.3,-27.9C68.2,-22.4,70.2,-12.4,73.2,-1.2C76.2,10.1,80.2,20.1,79.6,30.5C79,40.8,73.9,51.4,65.5,59.3C57.2,67.2,45.6,72.3,33.9,75C22.2,77.7,10.2,77.9,-2.2,81.5C-14.6,85.1,-27.7,92.2,-40.7,90.6C-53.7,89,-66.7,78.8,-75.6,65.9C-84.5,53,-89.3,37.5,-91,22.5C-92.7,7.5,-91.3,-7.1,-85.5,-19.2C-79.7,-31.3,-69.4,-40.9,-57.8,-47.2C-46.2,-53.5,-33.3,-56.5,-21.6,-63.8C-10,-71.2,0.5,-83,11.9,-83.7C23.4,-84.5,34.8,-74.2,45.4,-75.3Z",
            ],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 20,
            ease: "easeInOut",
          }}
        />
      </svg>
    </motion.div>
  );
};

const AboutSection: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-16 relative">
      {/* SVG Blobs in background */}
      <Blob className="top-10 left-0 opacity-10" delay={0.2} />
      <Blob className="bottom-10 right-0 opacity-10" delay={0.5} />
      
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 relative z-10"
      >
        {/* Profile Image with hover effect */}
        <motion.div 
          variants={itemVariants}
          className="flex-shrink-0"
        >
          <HoverCard>
            <HoverCardTrigger>
              <div 
                className="relative w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-blue-600/40 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,123,255,0.5)] hover:border-blue-500"
              >
                <Avatar className="w-full h-full">
                  <AvatarImage 
                    src={PROFILE_IMAGE} 
                    loading="lazy"
                    onLoad={() => setIsImgLoaded(true)}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${isImgLoaded ? 'opacity-100' : 'opacity-0'}`}
                    alt="Profile picture"
                  />
                  <AvatarFallback className="bg-blue-900/20 text-blue-200">JD</AvatarFallback>
                </Avatar>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="bg-background/90 backdrop-blur-sm border border-blue-900/30 text-white">
              <p className="text-sm text-gray-300">AI enthusiast with a passion for real estate tech solutions.</p>
            </HoverCardContent>
          </HoverCard>
        </motion.div>

        {/* Content */}
        <div className="flex-1">
          {/* Heading */}
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl md:text-4xl font-bold text-white mb-4 font-roboto tracking-tight"
          >
            About <span className="text-blue-500">Me</span>
          </motion.h2>

          {/* Keyword values with animation */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-2 mb-4"
          >
            {keywords.map((keyword, idx) => (
              <motion.div
                key={keyword.text}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + (idx * 0.1), duration: 0.5 }}
                className="relative"
              >
                <Badge 
                  className={`text-sm px-3 py-1 ${keyword.color} text-white shadow-lg hover:scale-105 transition-transform duration-300`}
                >
                  {keyword.text}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          {/* Bio */}
          <motion.div variants={itemVariants}>
            <p className="text-gray-200 text-lg mb-6 leading-relaxed">
              I'm a full-stack developer specializing in AI-powered solutions for the real estate industry. 
              With 8+ years of experience building scalable applications, I combine technical expertise with 
              a deep understanding of property management workflows. When not coding, you'll find me exploring 
              hiking trails with my tabby cat who follows me everywhere like a loyal dog.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={containerVariants} 
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.5,
                      ease: "easeOut",
                      delay: 0.1 * (index + 1)
                    }
                  }
                }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-lg flex flex-col items-center hover:bg-white/10 transition-colors"
              >
                <div className="w-full mb-2">
                  <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full ${stat.color}`}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: "100%" } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.3 + (index * 0.2) }}
                    />
                  </div>
                </div>
                <span className="text-3xl font-bold text-white mb-1">
                  <CountUp end={stat.value} duration={2} delay={0.5 + (0.2 * index)} inView={isInView} />
                </span>
                <span className="text-gray-400 text-sm">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Skills tags with tooltips */}
          <motion.div variants={itemVariants}>
            <div className="flex flex-wrap gap-2 mt-4">
              {skills.map((skill) => (
                <TooltipProvider key={skill.name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.span 
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="inline-block px-3 py-1 bg-blue-900/30 text-blue-200 text-sm rounded-full border border-blue-700/30 hover:bg-blue-800/40 transition-colors cursor-pointer"
                      >
                        {skill.name}
                      </motion.span>
                    </TooltipTrigger>
                    <TooltipContent className="bg-blue-900/90 border-blue-700/50">
                      <p>{skill.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// CountUp component for animated number stats
const CountUp = ({ end, duration = 2, delay = 0, inView = false }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!inView) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const countUp = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const timeElapsed = progress / 1000; // convert to seconds
      
      if (timeElapsed > delay) {
        const actualTimeElapsed = timeElapsed - delay;
        const percentage = Math.min(actualTimeElapsed / duration, 1);
        setCount(Math.floor(end * percentage));
        
        if (percentage < 1) {
          animationFrame = requestAnimationFrame(countUp);
        }
      } else {
        animationFrame = requestAnimationFrame(countUp);
      }
    };
    
    animationFrame = requestAnimationFrame(countUp);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, delay, inView]);
  
  return <>{count}</>;
};

export default AboutSection;
