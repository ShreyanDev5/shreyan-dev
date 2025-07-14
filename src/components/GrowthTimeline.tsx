import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Briefcase, Code, Rocket, Users, TrendingUp } from 'lucide-react';

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
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`flex flex-col sm:flex-row items-center gap-4 sm:gap-6 ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'} mb-24 sm:mb-12`}
    >
      {/* Content Card */}
      <div className="w-full sm:flex-1 max-w-xs sm:max-w-md">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-5 sm:p-6 rounded-2xl bg-gradient-to-br ${item.color} backdrop-blur-sm border border-white/10 shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-xl active:scale-102 active:shadow-xl`}
        >
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 rounded-xl bg-white/10 backdrop-blur-sm flex-shrink-0">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-xs sm:text-sm text-white/60 font-medium mb-1">{item.year}</div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">{item.title}</h3>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed">{item.description}</p>
            </div>
          </div>
        </motion.div>
      </div>
      {/* Timeline Line & Dot */}
      <div className="flex flex-col items-center my-3 sm:my-0 relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={isVisible ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
          className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-lg z-10"
        />
        {index < timelineData.length - 1 && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-px">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isVisible ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
              className="h-20 sm:h-36 bg-gradient-to-b from-emerald-400/80 to-transparent origin-top w-px z-0"
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
    <div className="min-h-screen py-16 px-2 sm:px-6 lg:px-8 relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 sm:mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-5 sm:mb-6">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span className="text-white/80 text-sm font-medium">My Journey</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
          Growth at a Glance
        </h2>
        <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          A visual story of my development journey, key milestones, and continuous learning progress
        </p>
      </motion.div>
      {/* Timeline Section */}
      <div ref={timelineRef} className="max-w-2xl sm:max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isTimelineInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
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
    </div>
  );
};

export default GrowthTimeline;