import { useRef, useState, useEffect, memo, type FC } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Clock, User } from "lucide-react";

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
    <section className="pt-10 pb-12 sm:pt-14 sm:pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="about">
      <div className="max-w-3xl mx-auto relative z-10" ref={ref}>
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

        {/* Content Layout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full max-w-xl sm:max-w-2xl mx-auto"
        >
          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-5 gap-y-2 text-[11.5px] sm:text-xs text-warm-500 font-mono font-normal mb-3 sm:mb-3.5">
            <div className="flex items-center gap-1.5">
              <MapPin size={13} className="text-emerald-400 shrink-0" />
              <span>Kolkata, India (Remote)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={13} className="text-emerald-400 shrink-0" />
              <span>{currentTime || "IST"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User size={13} className="text-emerald-400 shrink-0" />
              <span>23 y/o</span>
            </div>
          </div>

          {/* Bio Paragraphs */}
          <div className="text-[14.5px] sm:text-[15px] md:text-[15.5px] leading-[1.6] sm:leading-[1.55] space-y-2.5 sm:space-y-3 font-normal text-left">
            <p className="text-warm-200">
              I'm a software engineer focused on backend systems. I build with Python (FastAPI) and Java (Spring Boot), using AI tools to ship products end-to-end—8 projects built and 6 deployed.
            </p>
            <p className="text-warm-400">
              What drives me is understanding systems from the ground up and breaking complex problems down to first principles.
            </p>
            <p className="text-warm-400">
              Outside of engineering, I spend my time reading, training, and exploring.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(AboutSection);
