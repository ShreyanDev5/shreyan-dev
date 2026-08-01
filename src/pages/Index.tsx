import { memo } from "react";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import JourneySection from "@/components/JourneySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Fixed ambient background glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 0%, rgba(16, 185, 129, 0.04), transparent 50%),
            radial-gradient(ellipse at 80% 100%, rgba(59, 130, 246, 0.03), transparent 50%)
          `,
        }}
      />
      <main className="relative z-10">
        <section id="home">
          <Hero />
        </section>
        <section id="about">
          <AboutSection />
        </section>
        <section id="projects">
          <ProjectsSection />
        </section>
        <SkillsSection />
        <JourneySection />
      </main>
      <Footer />
    </div>
  );
};

export default memo(Index);
