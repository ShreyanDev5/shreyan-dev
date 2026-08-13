import { useRef, useState, useEffect, memo, type FC } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Clock, User } from "lucide-react";

const PROFILE_IMAGE = "/Profile_image_2.png";

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/shreyansardar/",
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white group-hover/btn:text-black transition-colors duration-200" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    url: "https://github.com/ShreyanDev5",
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white group-hover/btn:text-black transition-colors duration-200" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    url: "https://x.com/Shreyan_23",
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white group-hover/btn:text-black transition-colors duration-200" fill="currentColor">
        <path d="M18.244 2H21l-6.9 7.897L22.2 22h-6.828l-5.338-6.894L3.99 22H1.23l7.39-8.47L1 2h6.99l4.88 6.302L18.244 2Zm-1.2 18h1.527L6.164 3.44H4.522L17.044 20Z" />
      </svg>
    ),
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/Shreyan_555/",
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white group-hover/btn:text-black transition-colors duration-200" fill="currentColor">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    ),
  },
];

const AboutSection: FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const timeStr = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setCurrentTime(`${timeStr} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-9 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="about">
      <div className="w-full max-w-[310px] sm:max-w-[350px] lg:max-w-[610px] mx-auto relative z-10" ref={ref}>
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-[28px] md:text-[30px] font-bold text-white tracking-tight">
            <span className="font-mono text-neutral-500 text-lg sm:text-xl font-medium mr-2.5 select-none opacity-90">01 //</span>About
          </h2>
        </motion.div>

        {/* Card Container matching Projects & Skills section aesthetics */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121215]/50 backdrop-blur-sm shadow-xl hover:border-white/15 p-4 sm:p-5 transition-all duration-200"
        >
          <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-12 gap-5 sm:gap-5.5 lg:gap-6 items-center lg:items-start">
            {/* Mobile Profile Header / Desktop Left Column */}
            <div className="lg:col-span-4 flex flex-row lg:flex-col items-center justify-center lg:justify-center gap-3.5 sm:gap-5 lg:gap-0 shrink-0 w-full lg:w-auto">
              {/* Profile Image */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="shrink-0"
              >
                <div className="w-[90px] sm:w-[100px] lg:w-full lg:max-w-[9.5rem] aspect-[3/4] rounded-2xl p-[1px] bg-gradient-to-br from-white/[0.12] via-white/[0.05] to-white/[0.02] shadow-[0_12px_24px_rgba(0,0,0,0.35)]">
                  <div className="h-full w-full overflow-hidden rounded-[0.95rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),rgba(255,255,255,0.015)_45%,rgba(255,255,255,0.008)_100%)] ring-1 ring-inset ring-white/[0.05]">
                    <img
                      src={PROFILE_IMAGE}
                      alt="Shreyan Sardar"
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Mobile-only right header section next to photo - 4 distinct stacked levels matching image height */}
              <div className="flex flex-col items-start justify-between h-[120px] sm:h-[133px] lg:hidden text-left py-0.5">
                {/* Level 1: Location */}
                <div className="flex items-center gap-1.5 text-[11.5px] sm:text-xs text-gray-400 font-mono font-normal">
                  <MapPin size={13} className="text-emerald-400 shrink-0" />
                  <span>Kolkata, India</span>
                </div>

                {/* Level 2: Local Time */}
                <div className="flex items-center gap-1.5 text-[11.5px] sm:text-xs text-gray-400 font-mono font-normal">
                  <Clock size={13} className="text-emerald-400 shrink-0" />
                  <span>{currentTime || "IST"}</span>
                </div>

                {/* Level 3: Age */}
                <div className="flex items-center gap-1.5 text-[11.5px] sm:text-xs text-gray-400 font-mono font-normal">
                  <User size={13} className="text-emerald-400 shrink-0" />
                  <span>23 y/o</span>
                </div>

                {/* Level 4: Social links */}
                <div className="flex items-center gap-1.5">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn p-1.5 rounded-lg border border-white/10 bg-white/[0.025] text-white hover:bg-white hover:text-black hover:border-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                      aria-label={social.name}
                    >
                      {social.icon()}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right/Bottom Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="lg:col-span-8 flex flex-col items-start text-left w-full"
            >
              {/* Metadata Bar - Desktop only */}
              <div className="hidden lg:flex items-center gap-2.5 text-[11.5px] sm:text-xs text-gray-400 font-mono font-normal mb-3 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-emerald-400 shrink-0" />
                  <span>Kolkata, India</span>
                </div>
                <span className="text-neutral-600">•</span>
                <div className="flex items-center gap-1.5">
                  <Clock size={13} className="text-emerald-400 shrink-0" />
                  <span>{currentTime || "IST"}</span>
                </div>
                <span className="text-neutral-600">•</span>
                <div className="flex items-center gap-1.5">
                  <User size={13} className="text-emerald-400 shrink-0" />
                  <span>23 y/o</span>
                </div>
              </div>

              {/* Bio Paragraphs */}
              <div className="text-[13px] sm:text-sm leading-[1.45] mb-0 lg:mb-4 space-y-2 font-normal text-left">
                <p className="text-neutral-200">
                  Computer Science graduate (8.3 CGPA) focused on Python (FastAPI) and Java (Spring Boot) backend engineering—experienced in API design and database operations (PostgreSQL, MySQL).
                </p>
                <p className="text-neutral-400">
                  Curious about how software scales under the hood, with a focus on designing reliable systems.
                </p>
              </div>

              {/* Social links - Desktop only */}
              <div className="hidden lg:flex items-center gap-2.5 flex-wrap w-full">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn p-1.5 rounded-lg border border-white/10 bg-white/[0.025] text-white hover:bg-white hover:text-black hover:border-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                    aria-label={social.name}
                  >
                    {social.icon()}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(AboutSection);
