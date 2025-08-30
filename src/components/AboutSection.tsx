import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import EnhancedParticleBackground from "./EnhancedParticleBackground";
import { ChevronDown } from "lucide-react";

const PROFILE_IMAGE = "/profile_1.0.jpg";

const coreValues = [
  {
    text: "Disciplined",
    color: "from-amber-500 to-orange-600",
    description: "Maintaining consistent focus and dedication to excellence."
  },
  {
    text: "Decisive",
    color: "from-blue-500 to-indigo-600",
    description: "Making informed decisions with confidence and clarity."
  },
  {
    text: "Creative",
    color: "from-pink-500 to-purple-600",
    description: "Finding innovative solutions to complex problems."
  },
  {
    text: "Efficient",
    color: "from-emerald-500 to-teal-600",
    description: "Optimizing workflows for maximum impact."
  },
  {
    text: "Empathetic",
    color: "from-rose-500 to-pink-600",
    description: "Building with users' needs at the forefront."
  }
];



const socialLinks = [
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/shreyansardar/",
    fillColor: "#0A66C2",
    glowColor: "rgba(10, 102, 194, 0.3)",
    icon: (isHovered: boolean) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6" fill={isHovered ? "#0A66C2" : "currentColor"}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
      </svg>
    )
  },
  {
    name: "github",
    url: "https://github.com/ShreyanDev5",
    fillColor: "#10B981",
    glowColor: "rgba(16, 185, 129, 0.3)",
    icon: (isHovered: boolean) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6" fill={isHovered ? "#10B981" : "currentColor"}>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    )
  },
  {
    name: "twitter",
    url: "https://x.com/22Shreyans",
    fillColor: "#8B5CF6",
    glowColor: "rgba(139, 92, 246, 0.3)",
    icon: (isHovered: boolean) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6" fill={isHovered ? "#8B5CF6" : "currentColor"}>
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    )
  },
  {
    name: "leetcode",
    url: "https://leetcode.com/u/Shreyan_555/",
    fillColor: "#FFA116",
    glowColor: "rgba(255, 161, 22, 0.3)",
    icon: (isHovered: boolean) => (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill={isHovered ? "#FFA116" : "currentColor"}>
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    )
  }
];

const AboutSection: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1
  });
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
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
        staggerChildren: 0.15
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  const renderSocialLinks = () => {
    return (
      <div className="w-full flex justify-center md:justify-start">
        <div className="flex space-x-4">
          {socialLinks.map((social) => {
            const isHovered = hoveredIcon === social.name;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full transform transition-all duration-300 hover:scale-110"
                onMouseEnter={() => setHoveredIcon(social.name)}
                onMouseLeave={() => setHoveredIcon(null)}
                onFocus={() => setHoveredIcon(social.name)}
                onBlur={() => setHoveredIcon(null)}
              >
                {/* Glass morphism container */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-full opacity-80"></div>
                
                {/* Glow effect */}
                <div 
                  className={`absolute -inset-1 rounded-full transition-all duration-300 ${
                    isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-90'
                  }`}
                  style={{
                    background: `radial-gradient(circle, ${social.glowColor} 0%, transparent 70%)`,
                    zIndex: -1
                  }}
                />
                
                {/* Icon */}
                <div 
                  className={`relative z-10 p-3 transition-all duration-300 ${
                    isHovered ? 'translate-y-[-2px]' : ''
                  }`}
                  style={{ color: social.fillColor }}
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
  
  const fullText1 = "Hi, I'm Shreyan, a passionate Java Developer dedicated to solving real-world problems through smart, user-focused software solutions. From clean Java backends to responsive React frontends, I enjoy building intuitive applications that feel effortless to use.";
  const fullText2 = "What excites me most is the intersection of creativity and code—where ideas become systems that work beautifully. Whether I'm exploring AI tools, refining my workflow, or sharpening my skills, I'm driven by curiosity and the thrill of making technology better every day.";
  
  const truncatedText1 = "Hi, I'm Shreyan, a passionate Java Developer dedicated to solving real-world problems...";

  return (
    <div className="w-full relative overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-emerald-500/20 via-emerald-500/5 to-transparent rounded-full blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-blue-500/20 via-blue-500/5 to-transparent rounded-full blur-3xl opacity-70"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-radial from-purple-500/15 via-transparent to-transparent rounded-full blur-3xl opacity-50"></div>
      </div>
      
      <EnhancedParticleBackground variant="about" density={isMobile ? 20 : 50} shapes={["circle"]} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 sm:py-24 md:py-28">
        <motion.div 
          ref={ref} 
          variants={containerVariants} 
          initial="hidden" 
          animate={controls} 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left Column - Profile Image */}
          <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-start">
            <div className="relative group">
              {/* Premium circular frame gradients tuned for rounded avatar */}
              <div 
                className="absolute inset-0 rounded-full blur-2xl opacity-70 group-hover:opacity-80 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 50%,
                    rgba(59,130,246,0.18) 0%,
                    rgba(16,185,129,0.22) 55%,
                    rgba(167,139,250,0.20) 75%,
                    transparent 85%)`
                }}
              />
              <div 
                className="absolute inset-0 rounded-full backdrop-blur-sm"
                style={{
                  background: `radial-gradient(circle at 50% 50%,
                    rgba(255,255,255,0.06) 0%,
                    rgba(255,255,255,0.04) 45%,
                    rgba(255,255,255,0.02) 65%,
                    transparent 80%)`
                }}
              />
              
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden border border-white/20 backdrop-blur-xl z-20 transform group-hover:scale-[1.02] transition-transform duration-500">
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)`
                  }}
                />
                <img 
                  src={PROFILE_IMAGE} 
                  alt="Shreyan Sardar" 
                  className="w-full h-full object-cover object-center"
                  onLoad={() => setIsImgLoaded(true)}
                  loading="eager"
                />
              </div>
              
              {/* Floating accent elements */}
              <div className="absolute top-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 blur-2xl opacity-50 z-0 animate-pulse-slow"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 blur-2xl opacity-50 z-0 animate-pulse-slow"></div>
            </div>
            
            {/* Social Links - align with image on the right for large layouts */}
            <div className="mt-8 flex justify-center sm:justify-end w-full pl-8">
              {renderSocialLinks()}
            </div>
          </motion.div>
          
          {/* Right Column - Content */}
          <motion.div variants={itemVariants} className="flex flex-col">
            {/* Header with premium typography */}
            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-4 heading-gradient-cool-left-emphasis">
                  Shreyan Sardar
                </h1>
                <div className="w-24 heading-accent-line-cool mb-6"></div>
                <h2 className="text-xl sm:text-2xl text-emerald-300 font-heading font-medium">
                  Java Developer & Software Engineer
                </h2>
              </motion.div>
            </div>
            
            {/* About Content */}
            <div className="space-y-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="text-lg text-gray-300 leading-relaxed">
                  <p>
                    {isExpanded ? fullText1 : truncatedText1}
                  </p>
                  <motion.div
                    initial={false}
                    animate={{ 
                      height: isExpanded ? "auto" : 0,
                      opacity: isExpanded ? 1 : 0,
                      marginTop: isExpanded ? 24 : 0
                    }}
                    transition={{ 
                      duration: isExpanded ? 0.5 : 0.3,
                      ease: isExpanded ? [0.25, 0.1, 0.25, 1] : [0.4, 0, 0.6, 1],
                      height: { duration: isExpanded ? 0.5 : 0.3, ease: isExpanded ? [0.25, 0.1, 0.25, 1] : [0.4, 0, 0.6, 1] },
                      opacity: { duration: isExpanded ? 0.4 : 0.25, ease: "easeOut" }
                    }}
                    className="overflow-hidden"
                  >
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {fullText2}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
              <div className="flex justify-end">
                <motion.button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center text-emerald-300 hover:text-emerald-200 transition-colors duration-300 focus:outline-none -mt-5"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mr-2 font-medium">{isExpanded ? "Read Less" : "Read More"}</span>
                  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={20} />
                  </motion.div>
                </motion.button>
              </div>
            </div>
            
            {/* Core Values */}
            <div className="mb-8">
              <motion.h3 
                className="text-2xl font-heading font-bold text-white mb-6 flex items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Core Values</span>
              </motion.h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {coreValues.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="group"
                  >
                    <div className="relative p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-lg border border-white/10 transition-all duration-300 group-hover:scale-[1.03] group-hover:border-white/30 group-hover:shadow-lg touch-manipulation" 
                      style={{ 
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)'
                      }}
                      onTouchStart={(e) => {
                        e.currentTarget.classList.add('touch-active');
                      }}
                      onTouchMove={(e) => {
                        e.currentTarget.classList.add('touch-active');
                      }}
                      onTouchEnd={(e) => {
                        e.currentTarget.classList.remove('touch-active');
                      }}
                      onTouchCancel={(e) => {
                        e.currentTarget.classList.remove('touch-active');
                      }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 value-overlay rounded-xl transition-all duration-300`}></div>
                      <div className="relative z-10 flex">
                        <div className={`flex-shrink-0 w-3 h-3 mt-1 rounded-full bg-gradient-to-r ${value.color}`}></div>
                        <div className="ml-3">
                          <h4 className={`text-base font-semibold mb-1 bg-gradient-to-r ${value.color} bg-clip-text text-transparent`}>{value.text}</h4>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {value.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;