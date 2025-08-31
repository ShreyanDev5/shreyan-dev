import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Briefcase, Code, Rocket, Users, TrendingUp } from 'lucide-react';

// Enhanced data with more detailed information
const growthData = [
  {
    id: 1,
    title: 'Education',
    value: '2022',
    description: 'Started Computer Science Journey',
    icon: GraduationCap,
    color: 'from-blue-500/20 to-blue-700/20',
    borderColor: 'border-blue-500/30',
    glow: 'shadow-[0_0_15px_rgba(59,130,246,0.1)]'
  },
  {
    id: 2,
    title: 'Experience',
    value: '2023',
    description: 'First Internship',
    icon: Briefcase,
    color: 'from-emerald-500/20 to-emerald-700/20',
    borderColor: 'border-emerald-500/30',
    glow: 'shadow-[0_0_15px_rgba(16,185,129,0.1)]'
  },
  {
    id: 3,
    title: 'Projects',
    value: '20+',
    description: 'Personal Projects Built',
    icon: Code,
    color: 'from-purple-500/20 to-purple-700/20',
    borderColor: 'border-purple-500/30',
    glow: 'shadow-[0_0_15px_rgba(139,92,246,0.1)]'
  },
  {
    id: 4,
    title: 'Skills',
    value: '15+',
    description: 'Technical Skills Mastered',
    icon: Rocket,
    color: 'from-orange-500/20 to-orange-700/20',
    borderColor: 'border-orange-500/30',
    glow: 'shadow-[0_0_15px_rgba(249,115,22,0.1)]'
  },
  {
    id: 5,
    title: 'Leadership',
    value: '3+',
    description: 'Teams Led',
    icon: Users,
    color: 'from-pink-500/20 to-pink-700/20',
    borderColor: 'border-pink-500/30',
    glow: 'shadow-[0_0_15px_rgba(236,72,153,0.1)]'
  },
  {
    id: 6,
    title: 'Growth',
    value: '75%',
    description: 'Year-over-Year Improvement',
    icon: TrendingUp,
    color: 'from-cyan-500/20 to-cyan-700/20',
    borderColor: 'border-cyan-500/30',
    glow: 'shadow-[0_0_15px_rgba(6,182,212,0.1)]'
  }
];

const GrowthCard: React.FC<{ 
  item: typeof growthData[0]; 
  index: number;
  isVisible: boolean;
  isHovered: boolean;
  onHover: (id: number | null) => void;
}> = memo(({ item, index, isVisible, isHovered, onHover }) => {
  const Icon = item.icon;
  const [isTouchActive, setIsTouchActive] = useState(false);
  
  const handleTouchStart = () => {
    setIsTouchActive(true);
    onHover(item.id);
  };
  
  const handleTouchEnd = () => {
    // Immediate cleanup for better performance
    setIsTouchActive(false);
    onHover(null);
  };
  
  const isCardActive = isHovered || isTouchActive;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.3, 
        delay: index * 0.05,
        ease: "easeOut"
      }}
      className="relative group"
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      // Performance optimization
      style={{ 
        willChange: 'opacity, transform',
        transform: 'translateZ(0)'
      }}
    >
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} blur-xl opacity-20 transition-all duration-300 ${isCardActive ? 'opacity-30 scale-105' : ''}`}></div>
      
      <motion.div
        whileHover={{ y: -5 }}
        animate={isTouchActive ? { y: -5 } : {}}
        className={`growth-card relative h-full rounded-xl sm:rounded-2xl bg-gradient-to-br ${item.color} border ${item.borderColor} ${item.glow} transition-all duration-300 overflow-hidden`}
        // Performance optimizations
        style={{ 
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        <div className="p-5 sm:p-6 md:p-7">
          <div className="flex items-start justify-between">
            <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-white/10 flex-shrink-0">
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="text-right">
              <motion.div 
                className="text-xl sm:text-2xl md:text-3xl font-bold text-white"
                initial={{ scale: 1 }}
                animate={isCardActive ? { scale: 1.05 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                {item.value}
              </motion.div>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-5 md:mt-6">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">{item.title}</h3>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed">{item.description}</p>
          </div>
          
          <div className="mt-4 sm:mt-5 md:mt-6 pt-3 sm:pt-4 border-t border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/60">Growth Metrics</span>
              <motion.div 
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center"
                animate={{ rotate: isCardActive ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white/60 sm:text-white/60">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Subtle animated background element */}
        <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/5 blur-2xl transition-all duration-500 group-hover:scale-110"></div>
      </motion.div>
    </motion.div>
  );
});

const GrowthAtAGlance: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(growthData.length).fill(false));
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  useEffect(() => {
    // Staggered reveal animation with reduced delays
    growthData.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, index * 100); // Reduced delay for better performance
    });
  }, []);

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="text-center mb-12 sm:mb-16"
        // Performance optimization
        style={{ 
          willChange: 'opacity, transform',
          transform: 'translateZ(0)'
        }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/5 border border-white/10 mb-4 sm:mb-6">
          <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
          <span className="text-white/90 text-xs sm:text-sm font-medium">Professional Development</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
          Growth at a <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Glance</span>
        </h2>
        <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          A comprehensive overview of my professional journey, achievements, and continuous learning progress
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <AnimatePresence>
            {growthData.map((item, index) => (
              <GrowthCard
                key={item.id}
                item={item}
                index={index}
                isVisible={visibleCards[index]}
                isHovered={hoveredCard === item.id}
                onHover={setHoveredCard}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Connection lines for visual cohesion */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(16, 185, 129, 0.2)" />
                <stop offset="50%" stopColor="rgba(139, 92, 246, 0.2)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.2)" />
              </linearGradient>
            </defs>
            {/* We'll add SVG connection lines dynamically if needed */}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default GrowthAtAGlance;