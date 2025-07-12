import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Briefcase, Code, Rocket, Users, TrendingUp } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from 'recharts';

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

// Mock data for charts
const projectsData = [
  { month: 'Jan', projects: 1 },
  { month: 'Feb', projects: 2 },
  { month: 'Mar', projects: 3 },
  { month: 'Apr', projects: 4 },
  { month: 'May', projects: 6 },
  { month: 'Jun', projects: 8 },
  { month: 'Jul', projects: 10 },
  { month: 'Aug', projects: 12 },
  { month: 'Sep', projects: 15 },
  { month: 'Oct', projects: 18 },
  { month: 'Nov', projects: 22 },
  { month: 'Dec', projects: 25 }
];

const skillsData = [
  { skill: 'React', level: 90 },
  { skill: 'TypeScript', level: 85 },
  { skill: 'Node.js', level: 80 },
  { skill: 'Python', level: 75 },
  { skill: 'AWS', level: 70 }
];

const learningProgressData = [
  { month: 'Jan', hours: 45 },
  { month: 'Feb', hours: 52 },
  { month: 'Mar', hours: 48 },
  { month: 'Apr', hours: 65 },
  { month: 'May', hours: 72 },
  { month: 'Jun', hours: 68 }
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
      className={`flex items-center gap-6 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} mb-12`}
    >
      {/* Content Card */}
      <div className="flex-1 max-w-md">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-6 rounded-2xl bg-gradient-to-br ${item.color} backdrop-blur-sm border border-white/10 shadow-lg`}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-white/60 font-medium mb-1">{item.year}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed">{item.description}</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Timeline Line & Dot */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isVisible ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
          className="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-lg z-10"
        />
        {index < timelineData.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isVisible ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
            className="w-px h-20 bg-gradient-to-b from-emerald-400/50 to-transparent origin-top"
          />
        )}
      </div>
      
      {/* Spacer */}
      <div className="flex-1 max-w-md" />
    </motion.div>
  );
};

const ChartCard: React.FC<{ 
  title: string; 
  children: React.ReactNode; 
  delay?: number 
}> = ({ title, children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
      className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg hover:bg-white/8 transition-all duration-300"
    >
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="h-48">
        {children}
      </div>
    </motion.div>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-darkBlue/90 backdrop-blur-sm border border-white/20 rounded-lg p-3 shadow-xl">
        <p className="text-white/80 text-sm">{`${label}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
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
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span className="text-white/80 text-sm font-medium">My Journey</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Growth at a Glance
        </h2>
        <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
          A visual story of my development journey, key milestones, and continuous learning progress
        </p>
      </motion.div>

      {/* Timeline Section */}
      <div ref={timelineRef} className="max-w-4xl mx-auto mb-20">
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

      {/* Charts Section */}
      <div className="max-w-6xl mx-auto">
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold text-white text-center mb-12"
        >
          Progress Metrics
        </motion.h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Projects Completed */}
          <ChartCard title="Projects Completed" delay={0.1}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projectsData}>
                <defs>
                  <linearGradient id="projectsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#ffffff80' }}
                />
                <YAxis hide />
                <Area
                  type="monotone"
                  dataKey="projects"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#projectsGradient)"
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Skills Progress */}
          <ChartCard title="Technical Skills" delay={0.2}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillsData} layout="horizontal" margin={{ left: 60, right: 20 }}>
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis 
                  dataKey="skill" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#ffffff80' }}
                  width={60}
                />
                <Bar 
                  dataKey="level" 
                  fill="#7c3aed" 
                  radius={[0, 4, 4, 0]}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Learning Hours */}
          <ChartCard title="Learning Hours/Month" delay={0.3}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={learningProgressData}>
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#ffffff80' }}
                />
                <YAxis hide />
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#f59e0b' }}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

export default GrowthTimeline;