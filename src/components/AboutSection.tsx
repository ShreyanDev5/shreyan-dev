
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { Linkedin, Github, Twitter } from "lucide-react";

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

// Social links
const socialLinks = [
  { name: "linkedin", url: "https://linkedin.com", icon: Linkedin },
  { name: "github", url: "https://github.com", icon: Github },
  { name: "twitter", url: "https://twitter.com", icon: Twitter },
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

  // Social media section
  const renderSocialLinks = () => {
    return (
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3 text-emerald-400">Connect</h3>
        <div className="flex space-x-4">
          {socialLinks.map((social) => {
            const IconComponent = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-emerald-500/20 transition-colors duration-300"
              >
                <IconComponent className="w-5 h-5 text-white hover:text-emerald-400 transition-colors" />
              </a>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <Blob className="-top-32 -right-32" delay={0.2} />
      <Blob className="-bottom-32 -left-32" delay={0.5} />
      
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10"
      >
        {/* Profile Image */}
        <motion.div 
          variants={itemVariants} 
          className="flex justify-center md:justify-end"
        >
          <div className="relative">
            <div 
              className="w-64 h-64 rounded-xl overflow-hidden border-2 border-white/10 glass relative"
              style={{ 
                boxShadow: "0 10px 30px rgba(16, 185, 129, 0.1)",
                background: "linear-gradient(45deg, rgba(14,165,233,0.05) 0%, rgba(16,185,129,0.05) 100%)"
              }}
            >
              <img 
                src={PROFILE_IMAGE} 
                alt="Profile"
                className="w-full h-full object-cover"
                onLoad={() => setIsImgLoaded(true)}
              />
            </div>
            
            {/* Stats */}
            <motion.div
              className="absolute -bottom-6 -right-6 bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-white/10"
              style={{ boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={isImgLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <div className="flex space-x-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`text-2xl font-bold ${index === 0 ? "text-emerald-500" : index === 1 ? "text-electric-300" : "text-white"}`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-400 whitespace-nowrap">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Content */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">About Me</h2>
          <p className="text-gray-300 mb-6">
            I'm a full-stack developer specializing in building exceptional digital experiences for the real estate industry. 
            Currently focused on creating accessible, human-centered products at RealTech Solutions.
          </p>
          
          {/* Keywords */}
          <div className="flex flex-wrap gap-2 mb-6">
            {keywords.map((keyword, index) => (
              <Badge 
                key={index} 
                className={`${keyword.color} text-white px-3 py-1`}
              >
                {keyword.text}
              </Badge>
            ))}
          </div>
          
          {/* Skills with tooltips */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3 text-emerald-400">Skills & Expertise</h3>
            <div className="flex flex-wrap gap-2">
              <TooltipProvider>
                {skills.map((skill, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <div className="bg-white/5 hover:bg-emerald-500/20 px-3 py-1 rounded-md cursor-help transition-colors">
                        {skill.name}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-dark border border-emerald-500/20 text-white p-2">
                      <p>{skill.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
          </div>
          
          {/* Social Links */}
          {renderSocialLinks()}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutSection;
