import { memo } from "react";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import JourneySection from "@/components/JourneySection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const SectionDivider = () => (
  <div className="w-full h-px bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_70%)]" />
);

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
        <SectionDivider />
        <section id="about">
          <AboutSection />
        </section>
        <SectionDivider />
        <section id="projects">
          <ProjectsSection />
        </section>
        <SectionDivider />
        <SkillsSection />
        <SectionDivider />
        <JourneySection />
        <SectionDivider />
        <ContactForm />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default memo(Index);
