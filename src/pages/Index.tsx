import { memo } from "react";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import GithubSection from "@/components/GithubSection";
import SkillsSection from "@/components/SkillsSection";
import JourneySection from "@/components/JourneySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent text-white">
      <main className="relative z-10 divide-y divide-white/[0.05]">
        <section id="home">
          <Hero />
        </section>
        <section id="about">
          <AboutSection />
        </section>
        <section id="projects">
          <ProjectsSection />
        </section>
        <section id="github">
          <GithubSection />
        </section>
        <section id="skills">
          <SkillsSection />
        </section>
        <section id="journey">
          <JourneySection />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default memo(Index);
