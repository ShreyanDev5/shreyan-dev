import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { Linkedin, Github, Twitter } from "lucide-react";
import EnhancedParticleBackground from "./EnhancedParticleBackground";

const PROFILE_IMAGE = "/profile_1.0.jpg";

const coreValues = [
  { 
    text: "Disciplined", 
    color: "bg-gradient-to-r from-[#FFA116] to-[#FF8C00]",
    description: "Maintaining consistent focus and dedication to excellence."
  },
  { 
    text: "Decisive", 
    color: "bg-gradient-to-r from-blue-500 to-blue-700",
    description: "Making informed decisions with confidence and clarity."
  },
  { 
    text: "Creative", 
    color: "bg-gradient-to-r from-pink-500 to-purple-600",
    description: "Finding innovative solutions to complex problems."
  },
  { 
    text: "Efficient", 
    color: "bg-gradient-to-r from-emerald-600 to-emerald-800",
    description: "Optimizing workflows for maximum impact."
  },
  { 
    text: "Empathetic", 
    color: "bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E]",
    description: "Building with users' needs at the forefront."
  },
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
    url: "https://www.linkedin.com/in/shreyansardar/", 
    fillColor: "#0A66C2",
    glowColor: "rgba(10, 102, 194, 0.2)",
    icon: (isHovered: boolean) => (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        className="w-6 h-6"
        fill={isHovered ? "#0A66C2" : "currentColor"}
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
      </svg>
    )
  },
  { 
    name: "github", 
    url: "https://github.com/ShreyanDev5", 
    fillColor: "#10B981",
    glowColor: "rgba(16, 185, 129, 0.2)",
    icon: (isHovered: boolean) => (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        className="w-6 h-6"
        fill={isHovered ? "#10B981" : "currentColor"}
      >
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    )
  },
  { 
    name: "twitter", 
    url: "https://x.com/22Shreyans", 
    fillColor: "#8B5CF6",
    glowColor: "rgba(139, 92, 246, 0.2)",
    icon: (isHovered: boolean) => (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        className="w-6 h-6"
        fill={isHovered ? "#8B5CF6" : "currentColor"}
      >
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    )
  },
  { 
    name: "leetcode", 
    url: "https://leetcode.com/u/Shreyan_555/",
    fillColor: "#FFA116",
    glowColor: "rgba(255, 161, 22, 0.2)",
    icon: (isHovered: boolean) => (
      <svg 
        viewBox="0 0 24 24" 
        className="w-6 h-6"
        fill={isHovered ? "#FFA116" : "currentColor"}
      >
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
      </svg>
    )
  },
];

const AboutSection: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
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
        delayChildren: 0.05,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      },
    },
  };

  const renderSocialLinks = () => {
    return (
      <div className="w-full flex justify-center md:justify-start">
        <div className="flex space-x-4 sm:space-x-5 md:ml-6">
          {socialLinks.map((social) => {
            const isHovered = hoveredIcon === social.name;
            
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full transform transition-transform duration-300 hover:scale-110"
                onMouseEnter={() => setHoveredIcon(social.name)}
                onMouseLeave={() => setHoveredIcon(null)}
                onFocus={() => setHoveredIcon(social.name)}
                onBlur={() => setHoveredIcon(null)}
              >
                {/* Circle Background with subtle gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full opacity-90"></div>
                
                {/* Glow Effect Container */}
                <div 
                  className={`absolute inset-0 rounded-full transform transition-all duration-300 ease-in-out ${
                    isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-0'
                  }`}
                  style={{
                    backgroundColor: social.glowColor,
                    filter: `blur(8px)`,
                    zIndex: 0
                  }}
                />
                
                {/* Icon with Enhanced Hover Effects */}
                <div 
                  className={`relative z-10 transform transition-all duration-300 ease-in-out p-2 sm:p-2.5 ${
                    isHovered ? 'translate-y-[-2px]' : ''
                  }`}
                  style={{
                    color: social.fillColor
                  }}
                >
                  {social.icon(isHovered)}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full relative overflow-hidden">
      {/* Subtle gradient glow overlays */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-left gentle glow */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-emerald-500/5 via-emerald-500/2 to-transparent rounded-full blur-3xl opacity-60" />
        
        {/* Bottom-right gentle glow */}
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-radial from-blue-500/4 via-blue-500/2 to-transparent rounded-full blur-3xl opacity-50" />
        
        {/* Center soft highlight */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-radial from-purple-500/3 via-transparent to-transparent rounded-full blur-3xl opacity-40" />
      </div>

      <EnhancedParticleBackground 
        variant="about" 
        density={isMobile ? 20 : 40}
        shapes={["circle"]} 
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-20">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
        >
          {/* Left Column - Profile Image and Social Links */}
          <motion.div 
            variants={itemVariants} 
            className="flex flex-col items-center md:items-start space-y-4 md:space-y-6"
          >
            <div className="relative group">
              {/* Profile image glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-blue-500/5 to-purple-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div 
                className="w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full overflow-hidden border border-white/10 
                           group-hover:border-emerald-500/20 transition-all duration-500 relative z-10
                           transform group-hover:scale-[1.02] group-hover:shadow-lg
                           group-hover:shadow-emerald-500/10"
                style={{ 
                  background: "linear-gradient(45deg, rgba(14,165,233,0.03) 0%, rgba(16,185,129,0.03) 100%)"
                }}
              >
                <img 
                  src={PROFILE_IMAGE} 
                  alt="Profile"
                  className="w-full h-full object-cover object-center"
                  onLoad={() => setIsImgLoaded(true)}
                  loading="eager"
                />
              </div>
            </div>

            {/* Social Links with enhanced glow */}
            <div className="mt-2 md:mt-0">
              {renderSocialLinks()}
            </div>
          </motion.div>
          
          {/* Right Column - Content with subtle glow background */}
          <motion.div 
            variants={itemVariants} 
            className="flex flex-col space-y-4 md:space-y-6 mt-4 md:mt-0 relative"
          >
            {/* Subtle content glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/2 via-transparent to-blue-500/2 rounded-2xl blur-xl opacity-30" />
            
            <div className="relative z-10">
              {/* About Me Header */}
              <div className="space-y-3 md:space-y-6">
                <h2 className="text-3xl sm:text-3xl md:text-5xl font-bold text-gradient relative">
                  About Me
                  {/* Subtle text glow */}
                  <div className="absolute inset-0 text-3xl sm:text-3xl md:text-5xl font-bold bg-gradient-to-r from-emerald-500/20 to-blue-500/20 bg-clip-text text-transparent blur-sm -z-10">
                    About Me
                  </div>
                </h2>
                <h3 className="text-lg sm:text-lg md:text-xl font-semibold text-white">
                  Bringing Ideas to Life Through Code
                </h3>
              </div>

              {/* About Me Content */}
              <div className="text-gray-300 text-base sm:text-base md:text-lg space-y-4 md:space-y-6">
                <p className="leading-relaxed">
                  I'm a <strong>Computer Science & Engineering senior</strong> passionate about turning real-world problems into{" "}
                  <strong>elegant, user-centric solutions</strong> that make life smarter, better, and more efficient. From crafting clean Java backends 
                  to building interactive React frontends, I love transforming ideas into intuitive, meaningful applications that people genuinely enjoy using.
                </p>

                <p className="leading-relaxed">
                  What drives me most is that sweet spot where <strong>technology meets creativity</strong>. Whether I'm sharpening my coding skills, 
                  exploring AI tools, or optimizing workflows, I'm always excited by the process of learning, improving, and building smarter systems.
                </p>
              </div>

              {/* Core Values Section with enhanced glow */}
              <div className="pt-6 md:pt-8">
                <h3 className="text-2xl sm:text-2xl md:text-2xl font-heading font-bold mb-6 md:mb-5 bg-gradient-to-r from-[#00C4B4] to-[#1E3A8A] bg-clip-text text-transparent relative">
                  Core Values
                  {/* Subtle heading glow */}
                  <div className="absolute inset-0 text-2xl sm:text-2xl md:text-2xl font-heading font-bold bg-gradient-to-r from-[#00C4B4]/30 to-[#1E3A8A]/30 bg-clip-text text-transparent blur-sm -z-10">
                    Core Values
                  </div>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-wrap gap-4 md:gap-3">
                  {coreValues.map((value, index) => (
                    <div key={index} className="group">
                      {/* Mobile & Tablet: Card-style presentation with enhanced glow */}
                      <div className="md:hidden">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 
                                   backdrop-blur-sm border border-gray-700/30 rounded-xl p-4
                                   shadow-lg hover:shadow-xl transition-all duration-300
                                   hover:border-emerald-500/30 hover:scale-[1.02]"
                        >
                          {/* Enhanced gradient overlay on hover */}
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/8 to-blue-500/8 
                                      rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          {/* Subtle card glow */}
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-purple-500/5 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          {/* Badge with enhanced styling */}
                          <div className="relative mb-3">
                            <Badge 
                              className={`${value.color} text-white px-4 py-2 text-sm font-medium
                                       rounded-full shadow-md transition-all duration-300
                                       group-hover:shadow-lg group-hover:scale-105 relative z-10`}
                            >
                              {value.text}
                            </Badge>
                          </div>
                          
                          {/* Description with improved typography */}
                          <p className="text-gray-300 text-sm leading-relaxed relative z-10
                                     group-hover:text-gray-200 transition-colors duration-300">
                            {value.description}
                          </p>
                        </motion.div>
                      </div>

                      {/* Desktop: Enhanced tooltip presentation with glow */}
                      <div className="hidden md:block">
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <motion.div
                                whileHover={{ y: -4, scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                className="relative group"
                              >
                                {/* Enhanced background glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/15 to-blue-500/15 
                                            rounded-full blur-lg opacity-0 group-hover:opacity-100 
                                            transition-opacity duration-300" />
                                
                                <Badge 
                                  className={`${value.color} text-white px-4 py-2 text-sm font-medium
                                           rounded-full shadow-lg transition-all duration-300
                                           group-hover:shadow-xl relative z-10`}
                                >
                                  {value.text}
                                </Badge>
                              </motion.div>
                            </TooltipTrigger>
                            <TooltipContent 
                              className="bg-gray-900/95 backdrop-blur-sm border border-emerald-500/20 
                                      text-white p-4 max-w-[300px] rounded-xl shadow-2xl text-sm
                                      animate-in fade-in-0 zoom-in-95 duration-200 relative"
                              side="top"
                              sideOffset={8}
                            >
                              {/* Tooltip glow */}
                              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-xl blur-xl opacity-60" />
                              
                              <div className="space-y-2 relative z-10">
                                <p className="font-medium text-emerald-400">{value.text}</p>
                                <p className="text-gray-300 leading-relaxed">{value.description}</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;
