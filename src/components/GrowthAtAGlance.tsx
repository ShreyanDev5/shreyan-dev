import React, { useState, useEffect } from 'react';
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
    glow: 'shadow-[0_0_20px_rgba(59,130,246,0.15)]'
  },
  {
    id: 2,
    title: 'Experience',
    value: '2023',
    description: 'First Internship',
    icon: Briefcase,
    color: 'from-emerald-500/20 to-emerald-700/20',
    borderColor: 'border-emerald-500/30',
    glow: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]'
  },
  {
    id: 3,
    title: 'Projects',
    value: '20+',
    description: 'Personal Projects Built',
    icon: Code,
    color: 'from-purple-500/20 to-purple-700/20',
    borderColor: 'border-purple-500/30',
    glow: 'shadow-[0_0_20px_rgba(139,92,246,0.15)]'
  },
  {
    id: 4,
    title: 'Skills',
    value: '15+',
    description: 'Technical Skills Mastered',
    icon: Rocket,
    color: 'from-orange-500/20 to-orange-700/20',
    borderColor: 'border-orange-500/30',
    glow: 'shadow-[0_0_20px_rgba(249,115,22,0.15)]'
  },
  {
    id: 5,
    title: 'Leadership',
    value: '3+',
    description: 'Teams Led',
    icon: Users,
    color: 'from-pink-500/20 to-pink-700/20',
    borderColor: 'border-pink-500/30',
    glow: 'shadow-[0_0_20px_rgba(236,72,153,0.15)]'
  },
  {
    id: 6,
    title: 'Growth',
    value: '75%',
    description: 'Year-over-Year Improvement',
    icon: TrendingUp,
    color: 'from-cyan-500/20 to-cyan-700/20',
    borderColor: 'border-cyan-500/30',
    glow: 'shadow-[0_0_20px_rgba(6,182,212,0.15)]'
  }
];

const GrowthCard: React.FC<{ 
  item: typeof growthData[0]; 
  index: number;
  isVisible: boolean;
  isHovered: boolean;
  onHover: (id: number | null) => void;
}> = ({ item, index, isVisible, isHovered, onHover }) => {
  const Icon = item.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      className="relative group"
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} blur-xl opacity-30 transition-all duration-500 ${isHovered ? 'opacity-50 scale-105' : ''}`}></div>
      
      <motion.div
        whileHover={{ y: -8 }}
        className={`relative h-full rounded-2xl bg-gradient-to-br ${item.color} backdrop-blur-xl border ${item.borderColor} ${item.glow} transition-all duration-500 overflow-hidden`}
      >
        <div className="p-6 sm:p-7 md:p-8">
          <div className="flex items-start justify-between">
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm flex-shrink-0">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <motion.div 
                className="text-2xl sm:text-3xl font-bold text-white"
                initial={{ scale: 0.9 }}
                animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                {item.value}
              </motion.div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
            <p className="text-white/80 text-sm leading-relaxed">{item.description}</p>
          </div>
          
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/60">Growth Metrics</span>
              <motion.div 
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                animate={{ rotate: isHovered ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white/60">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Subtle animated background element */}
        <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/5 blur-2xl transition-all duration-700 group-hover:scale-125"></div>
      </motion.div>
    </motion.div>
  );
};

const GrowthAtAGlance: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(growthData.length).fill(false));
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  useEffect(() => {
    // Staggered reveal animation
    growthData.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, index * 150);
    });
  }, []);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span className="text-white/90 text-sm font-medium">Professional Development</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          Growth at a <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Glance</span>
        </h2>
        <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
          A comprehensive overview of my professional journey, achievements, and continuous learning progress
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <stop offset="0%" stopColor="rgba(16, 185, 129, 0.3)" />
                <stop offset="50%" stopColor="rgba(139, 92, 246, 0.3)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.3)" />
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