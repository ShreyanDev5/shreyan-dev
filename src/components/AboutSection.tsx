
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

// Profile image placeholder URL
const PROFILE_IMAGE = "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=150&h=150&q=80";

// Stats data
const stats = [
  { label: "Years Experience", value: 8, color: "bg-blue-500" },
  { label: "Projects Completed", value: 75, color: "bg-blue-600" },
  { label: "Technologies Mastered", value: 12, color: "bg-blue-700" },
];

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
      {/* Subtle gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background: "radial-gradient(circle at top right, #1E2A44, #0D1B2A)",
          zIndex: -1,
        }}
      />

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12"
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

          {/* Skills tags */}
          <motion.div variants={itemVariants}>
            <div className="flex flex-wrap gap-2 mt-4">
              {["React", "TypeScript", "AI Integration", "Tailwind", "Node.js", "Real Estate Tech"].map((skill) => (
                <Tooltip key={skill}>
                  <TooltipTrigger>
                    <span className="inline-block px-3 py-1 bg-blue-900/30 text-blue-200 text-sm rounded-full border border-blue-700/30 hover:bg-blue-800/40 transition-colors">
                      {skill}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Experienced with {skill}</p>
                  </TooltipContent>
                </Tooltip>
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
