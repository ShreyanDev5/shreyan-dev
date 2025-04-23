
import IntelligentNavbar from "@/components/IntelligentNavbar";
import Hero from "@/components/Hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactForm from "@/components/ContactForm";
import BlogSection from "@/components/BlogSection";

const SECTION_IDS = ["home", "about", "projects", "skills", "contact", "blog"];
const SECTION_NAMES = [
  "Fast, Collaborative, AI-native Project Management",
  "About",
  "Projects",
  "Skills & Tech",
  "Contact",
  "Blog",
];

const bgHelpers = [
  "bg-transparent",
  "bg-background/90 shadow-2xl",
  "bg-gradient-to-b from-white/80 via-blue-100/80 to-white/70 text-gray-800 shadow-2xl",
  "bg-background/90 shadow-xl",
  "bg-white/95 text-gray-900 border border-gray-200/40 shadow-xl",
  "bg-background/85",
];

const sectionContent = [
  // Hero (Home)
  <Hero key="herosection" />,
  // About
  (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">About</h2>
      <p className="text-gray-300 text-lg">
        Our mission is to empower businesses with tools that are intuitive, collaborative,
        and powered by state-of-the-art AI. With a focus on real estate, we help teams
        organize, track, and deliver value with confidence.
      </p>
    </div>
  ),
  // Projects (replace with ProjectsSection)
  <div className="max-w-7xl mx-auto"><ProjectsSection key="proj-section"/></div>,
  // Skills & Tech
  <SkillsSection key="skills-section" />,
  // Contact (ContactForm)
  (
    <div className="max-w-2xl mx-auto">
      <ContactForm />
    </div>
  ),
  // Blog (now our new BlogSection)
  (
    <BlogSection key="blog-section" />
  ),
];

const SECTION_STYLES = [
  "min-h-[60vh] flex items-center justify-center relative",
  "min-h-[80vh] flex items-center justify-center relative",
  "min-h-[80vh] flex items-center justify-center relative",
  "min-h-[80vh] flex items-center justify-center relative",
  "min-h-[80vh] flex items-center justify-center relative",
  "min-h-[60vh] flex items-center justify-center relative",
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-white">
      {/* Responsive pill navbar */}
      <IntelligentNavbar />
      <main>
        {/* Six anchor sections for navbar/intersection observer */}
        {SECTION_IDS.map((id, i) => (
          <section
            id={id}
            key={id}
            className={`${SECTION_STYLES[i]} ${bgHelpers[i] || ""} transition-all duration-300`}
            style={{ scrollMarginTop: 100 }}
          >
            {sectionContent[i]}
          </section>
        ))}
      </main>
    </div>
  );
};

export default Index;
