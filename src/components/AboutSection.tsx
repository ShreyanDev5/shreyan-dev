import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { Linkedin, Github, Twitter } from "lucide-react";
import EnhancedParticleBackground from "./EnhancedParticleBackground";

const PROFILE_IMAGE = "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=150&h=150&q=80";

const keywords = [
  { text: "Creative", color: "bg-gradient-to-r from-blue-500 to-blue-700" },
  { text: "Efficient", color: "bg-gradient-to-r from-emerald-500 to-emerald-700" },
  { text: "Empathetic", color: "bg-gradient-to-r from-purple-500 to-purple-700" },
];

const skills = [
  { name: "React", tooltip: "Building interactive UIs with React and React Hooks" },
  { name: "TypeScript", tooltip: "Type-safe JavaScript for better developer experience" },
  { name: "AI Integration", tooltip: "Connecting to AI services via APIs" },
  { name: "Tailwind", tooltip: "Utility-first CSS framework for rapid UI development" },
  { name: "Node.js", tooltip: "JavaScript runtime for backend development" },
  { name: "Real Estate Tech", tooltip: "Specialized solutions for the real estate industry" },
];

const socialLinks = [
  { 
    name: "linkedin", 
    url: "https://linkedin.com", 
    icon: Linkedin,
    hoverColor: "hover:text-[#0A66C2] hover:shadow-[0_0_15px_rgba(10,102,194,0.5)]"
  },
  { 
    name: "github", 
    url: "https://github.com", 
    icon: Github,
    hoverColor: "hover:text-[#6e5494] hover:shadow-[0_0_15px_rgba(110,84,148,0.5)]"
  },
  { 
    name: "twitter", 
    url: "https://twitter.com", 
    icon: Twitter,
    hoverColor: "hover:text-[#1DA1F2] hover:shadow-[0_0_15px_rgba(29,161,242,0.5)]"
  },
  { 
    name: "leetcode", 
    url: "https://leetcode.com",
    icon: () => (
      <svg 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className="w-5 h-5"
      >
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
      </svg>
    ),
    hoverColor: "hover:text-[#FFA116] hover:shadow-[0_0_15px_rgba(255,161,22,0.5)]"
  },
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

  const renderSocialLinks = () => {
    return (
      <div className="mt-6">
        <h3 className="text-lg font-heading font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Connect
        </h3>
        <div className="flex space-x-4">
          {socialLinks.map((social) => {
            const IconComponent = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full bg-white/5 transition-all duration-300 ${social.hoverColor}`}
              >
                <IconComponent className="w-5 h-5 text-white transition-colors duration-300" />
              </a>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full relative min-h-[80vh] overflow-hidden">
      <EnhancedParticleBackground 
        variant="about" 
        density={40} 
        shapes={["circle"]} 
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-16"
        >
          <motion.div 
            variants={itemVariants} 
            className="flex justify-center md:justify-start"
          >
            <div className="relative">
              <div 
                className="w-64 h-64 rounded-full overflow-hidden border-2 border-white/10 hover:border-emerald-500/30 transition-all duration-300"
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
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-col">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">About Me</h2>
            <p className="text-gray-300 mb-6">
              I'm a full-stack developer specializing in building exceptional digital experiences for the real estate industry. 
              Currently focused on creating accessible, human-centered products at RealTech Solutions.
            </p>
            
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
            
            <div className="mb-6">
              <h3 className="text-lg font-heading font-bold mb-3 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Skills & Expertise
              </h3>
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
            
            {renderSocialLinks()}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;
