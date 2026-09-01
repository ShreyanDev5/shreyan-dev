import { useRef, useState, useEffect, memo, type FC } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Clock, User } from "lucide-react";

const PROFILE_IMAGE = "/Profile_image_2.png";

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
    <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="about">
      <div className="w-full max-w-[19rem] sm:max-w-none lg:max-w-2xl mx-auto relative z-10" ref={ref}>
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-[28px] md:text-[30px] font-bold text-warm-100 tracking-tight">
            <span className="font-mono text-warm-600 text-lg sm:text-xl font-medium mr-2.5 select-none opacity-90">01 //</span>About
          </h2>
        </motion.div>

        {/* Symmetrical Content Layout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center sm:items-center gap-5 sm:gap-6 lg:gap-7.5"
        >
          {/* Mobile Top Row (Photo + Metadata) / Desktop Left Column (Photo) */}
          <div className="flex flex-row sm:flex-col items-center justify-center gap-3.5 sm:gap-0 shrink-0 w-full sm:w-auto">
            {/* Profile Image - Scaled for symmetrical top-to-bottom alignment with text */}
            <div className="shrink-0">
              <div className="w-[88px] sm:w-[124px] md:w-[130px] aspect-[3/4] rounded-2xl border border-white/10 overflow-hidden shadow-xl bg-[#1c1b1a]">
                <img
                  src={PROFILE_IMAGE}
                  alt="Shreyan Sardar"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>

            {/* Mobile-only header metadata stacked next to photo */}
            <div className="flex flex-col items-start justify-center gap-2 sm:hidden text-left py-0.5">
              <div className="flex items-center gap-1.5 text-[11.5px] text-warm-400 font-mono font-normal">
                <MapPin size={12.5} className="text-emerald-400 shrink-0" />
                <span>Kolkata (Remote)</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11.5px] text-warm-400 font-mono font-normal">
                <Clock size={12.5} className="text-emerald-400 shrink-0" />
                <span>{currentTime || "IST"}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11.5px] text-warm-400 font-mono font-normal">
                <User size={12.5} className="text-emerald-400 shrink-0" />
                <span>23 y/o</span>
              </div>
            </div>
          </div>

          {/* Right Column / Content */}
          <div className="flex-1 flex flex-col justify-center text-left w-full">
            {/* Metadata Bar - Desktop only */}
            <div className="hidden sm:flex items-center gap-2.5 text-[11.5px] sm:text-xs text-warm-500 font-mono font-normal mb-2.5 flex-wrap">
              <div className="flex items-center gap-1.5">
                <MapPin size={13} className="text-emerald-400 shrink-0" />
                <span>Kolkata, India (Remote)</span>
              </div>
              <span className="text-warm-600">•</span>
              <div className="flex items-center gap-1.5">
                <Clock size={13} className="text-emerald-400 shrink-0" />
                <span>{currentTime || "IST"}</span>
              </div>
              <span className="text-warm-600">•</span>
              <div className="flex items-center gap-1.5">
                <User size={13} className="text-emerald-400 shrink-0" />
                <span>23 y/o</span>
              </div>
            </div>

            {/* Bio Paragraphs */}
            <div className="text-[13px] sm:text-[13.5px] md:text-sm leading-[1.5] sm:leading-[1.55] space-y-2.5 font-normal text-left">
              <p className="text-warm-200">
                I'm a self-taught engineer mainly focused on backend systems. I design with Python (FastAPI) and Java (Spring Boot), using AI tools to ship products end-to-end—8 projects built and 6 deployed.
              </p>
              <p className="text-warm-400">
                What drives me is understanding systems from the ground up, breaking complex problems down to first principles, and building clean software that solves user pain points.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(AboutSection);
