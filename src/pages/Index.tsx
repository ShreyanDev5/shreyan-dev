import { memo } from "react";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="about">
          <AboutSection />
        </section>
        <section id="projects">
          <ProjectsSection />
        </section>
        <ExperienceSection />
        <ContactForm />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default memo(Index);
