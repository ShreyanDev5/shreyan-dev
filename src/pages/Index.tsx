import { memo } from "react";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import JourneySection from "@/components/JourneySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent text-white">
      <main className="relative z-10 divide-y divide-white/[0.05]">
        <div id="home">
          <Hero />
        </div>
        <AboutSection />
        <div id="projects">
          <ProjectsSection />
        </div>
        <SkillsSection />
        <JourneySection />
      </main>
      <Footer />
    </div>
  );
};

export default memo(Index);
