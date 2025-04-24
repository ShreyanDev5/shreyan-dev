
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Testimonial data
const testimonials = [
  {
    quote: "Working with this developer transformed our project. Their attention to detail and problem-solving skills are exceptional.",
    author: "Alex Thompson",
    role: "CTO, EstateVision",
    avatar: "https://i.pravatar.cc/150?img=11",
    initials: "AT"
  },
  {
    quote: "Highly collaborative and always delivers beyond expectations. The AI integrations they built saved us countless hours of manual work.",
    author: "Samira Patel",
    role: "Product Manager, TechHomes",
    avatar: "https://i.pravatar.cc/150?img=25",
    initials: "SP"
  },
  {
    quote: "Rare combination of technical expertise and design sensibility. They understand both the code and the user experience equally well.",
    author: "Marcus Chen",
    role: "UX Director, PropertyTech",
    avatar: "https://i.pravatar.cc/150?img=3",
    initials: "MC"
  }
];

// Fun metrics data
const metrics = [
  { value: "1,200+", label: "Cups of Coffee", icon: "☕" },
  { value: "3,500+", label: "Git Commits", icon: "💻" },
  { value: "250+", label: "Late Night Coding Sessions", icon: "🌙" }
];

const TestimonialsSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <section
      ref={ref}
      className="py-20 px-4 relative overflow-hidden"
      id="testimonials"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-blue-950/5 to-background z-0" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            What People <span className="text-blue-500">Say</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Feedback from clients and collaborators who've experienced my work firsthand.
          </motion.p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.author}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 + (index * 0.1) }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300 h-full">
                <CardContent className="pt-6 flex flex-col h-full">
                  <div className="flex-1">
                    <p className="text-gray-200 italic mb-6">"{item.quote}"</p>
                  </div>
                  <div className="flex items-center gap-3 mt-auto">
                    <Avatar>
                      <AvatarImage src={item.avatar} alt={item.author} loading="lazy" />
                      <AvatarFallback className="bg-blue-900/50 text-blue-200">{item.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-white">{item.author}</p>
                      <p className="text-xs text-gray-400">{item.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Fun metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
              className="bg-white/5 border border-white/10 rounded-lg p-6 text-center hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-4xl mb-3">{metric.icon}</div>
              <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-sm text-gray-400">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
