import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Briefcase, Code, Rocket, Users, TrendingUp } from 'lucide-react';
import GrowthAtAGlance from './GrowthAtAGlance';

// Mock data for the timeline
const timelineData = [
  {
    id: 1,
    year: '2022',
    title: 'Started Computer Science Journey',
    description: 'Began learning programming fundamentals',
    icon: GraduationCap,
    type: 'education',
    color: 'from-blue-400/20 to-blue-600/20'
  },
  {
    id: 2,
    year: '2023',
    title: 'First Internship',
    description: 'Software development internship at tech startup',
    icon: Briefcase,
    type: 'work',
    color: 'from-emerald-400/20 to-emerald-600/20'
  },
  {
    id: 3,
    year: '2023',
    title: 'Personal Projects',
    description: 'Built portfolio website and web applications',
    icon: Code,
    type: 'project',
    color: 'from-purple-400/20 to-purple-600/20'
  },
  {
    id: 4,
    year: '2024',
    title: 'Advanced Learning',
    description: 'Specialized in React, TypeScript, and cloud technologies',
    icon: Rocket,
    type: 'skill',
    color: 'from-orange-400/20 to-orange-600/20'
  },
  {
    id: 5,
    year: '2024',
    title: 'Team Collaboration',
    description: 'Led development team in university project',
    icon: Users,
    type: 'leadership',
    color: 'from-pink-400/20 to-pink-600/20'
  }
];

const TimelineItem: React.FC<{ 
  item: typeof timelineData[0]; 
  index: number; 
  isVisible: boolean 
}> = ({ item, index, isVisible }) => {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`flex flex-col items-center gap-3 mb-12 sm:mb-16 ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
    >
      {/* Content Card - optimized for mobile */}
      <div className="w-full sm:flex-1 max-w-xs sm:max-w-md">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br ${item.color} backdrop-blur-sm border border-white/10 shadow-lg transition-transform duration-200 hover:scale-102 hover:shadow-xl active:scale-102 active:shadow-xl`}
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm flex-shrink-0">
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-white/60 font-medium mb-1">{item.year}</div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed">{item.description}</p>
            </div>
          </div>
        </motion.div>
      </div>
      {/* Timeline Line & Dot - optimized for mobile */}
      <div className="flex flex-col items-center my-2 sm:my-0 relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={isVisible ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.3, delay: index * 0.08 + 0.1 }}
          className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-lg z-10"
        />
        {index < timelineData.length - 1 && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-px">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isVisible ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08 + 0.2 }}
              className="h-12 sm:h-20 md:h-28 bg-gradient-to-b from-emerald-400/80 to-transparent origin-top w-px z-0"
            />
          </div>
        )}
      </div>
      {/* Spacer for desktop only */}
      <div className="hidden sm:block flex-1 max-w-md" />
    </motion.div>
  );
};

const GrowthTimeline: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(timelineData.length).fill(false));
  const timelineRef = useRef<HTMLDivElement>(null);
  const isTimelineInView = useInView(timelineRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isTimelineInView) {
      timelineData.forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, index * 200);
      });
    }
  }, [isTimelineInView]);

  return (
    <div className="min-h-screen py-12 sm:py-16 px-2 sm:px-6 lg:px-8 relative">
      {/* Section Header - enhanced with premium design */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 mb-6">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-emerald-500 blur-md opacity-30"></div>
            <TrendingUp className="w-4 h-4 text-emerald-400 relative z-10" />
          </div>
          <span className="text-white/90 text-sm font-medium bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Professional Journey</span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-4 heading-gradient-cool">
          Development Timeline
        </h2>
        <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
          A visual story of my development journey, key milestones, and continuous learning progress
        </p>
      </motion.div>
      
      {/* Timeline Section */}
      <div ref={timelineRef} className="max-w-2xl sm:max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isTimelineInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {timelineData.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={index}
              isVisible={visibleItems[index]}
            />
          ))}
        </motion.div>
      </div>
      
      {/* Enhanced Growth at a Glance Section */}
      <div className="mt-28">
        <GrowthAtAGlance />
      </div>
    </div>
  );
};

export default GrowthTimeline;