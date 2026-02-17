import React, { useRef, memo } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Server, Layout, Briefcase } from "lucide-react";

const PROFILE_IMAGE = "/profile_1.0.jpg";

const highlights = [
  { icon: Server, text: "Java & Spring Boot backend architecture" },
  { icon: Layout, text: "React & TypeScript modern frontends" },
  { icon: Code2, text: "Full-stack from idea to deployment" },
  { icon: Briefcase, text: "Open to full-time opportunities" },
];

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/shreyansardar/",
    color: "#0A66C2",
    icon: (color: string) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill={color}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    url: "https://github.com/ShreyanDev5",
    color: "#f0f0f0",
    icon: (color: string) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill={color}>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    name: "X",
    url: "https://x.com/22Shreyans",
    color: "#f0f0f0",
    icon: (color: string) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill={color}>
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/Shreyan_555/",
    color: "#FFA116",
    icon: (color: string) => (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill={color}>
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    ),
  },
];

const stats = [
  { label: "Projects", value: "4" },
  { label: "Technologies", value: "8+" },
  { label: "Status", value: "Open to Work" },
];

const AboutSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <div className="w-full py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start"
        >
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col items-center lg:items-start"
          >
            <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden border border-white/10">
              <img
                src={PROFILE_IMAGE}
                alt="Shreyan Sardar"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 flex flex-col"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight text-center lg:text-left">
              About Me
            </h2>
            <div className="w-12 h-0.5 bg-emerald-500 rounded-full mb-6 mx-auto lg:mx-0" />

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
              Hi, I'm Shreyan — a Java Developer and Software Engineer passionate about solving
              real-world problems through smart, user-focused solutions. I specialize in building
              clean and scalable Java backends, and I also enjoy working with React to create
              responsive, intuitive frontends. What excites me most is turning ideas into systems
              that work seamlessly and deliver real value.
            </p>

            {/* Highlight bullets */}
            <div className="space-y-3 mb-8">
              {highlights.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <item.icon size={16} className="text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-white/10 opacity-60 hover:opacity-100 transition-all duration-300"
                  style={{
                    borderColor: `${social.color}20`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${social.color}50`;
                    e.currentTarget.style.boxShadow = `0 0 12px ${social.color}25`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${social.color}20`;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  aria-label={social.name}
                >
                  {social.icon(social.color)}
                </a>
              ))}
            </div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex items-center gap-6 sm:gap-8 text-center"
            >
              {stats.map((stat, i) => (
                <React.Fragment key={stat.label}>
                  {i > 0 && <div className="w-px h-8 bg-white/10" />}
                  <div>
                    <div className="text-white font-semibold text-lg">{stat.value}</div>
                    <div className="text-gray-500 text-xs uppercase tracking-wider">{stat.label}</div>
                  </div>
                </React.Fragment>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default memo(AboutSection);
