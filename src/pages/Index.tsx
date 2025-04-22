
import IntelligentNavbar from "@/components/IntelligentNavbar";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const SECTION_STYLES = [
  "min-h-[60vh] flex items-center justify-center relative",
  "min-h-[80vh] flex items-center justify-center relative",
  "min-h-[80vh] flex items-center justify-center relative",
  "min-h-[60vh] flex items-center justify-center relative",
  "min-h-[60vh] flex items-center justify-center relative",
];
const SECTION_IDS = ["home", "about", "projects", "contact", "blog"];
const SECTION_NAMES = [
  "Fast, Collaborative, AI-native Project Management",
  "About",
  "Projects",
  "Contact",
  "Blog",
];

// Helper for content colors & depth
const bgHelpers = [
  "bg-transparent",
  "bg-background/90 shadow-2xl",
  "bg-gradient-to-b from-white/80 via-blue-100/80 to-white/70 text-gray-800 shadow-2xl",
  "bg-background/90 shadow-xl",
  "bg-white/95 text-gray-900 border border-gray-200/40 shadow-xl",
];

const sectionContent = [
  // Home/hero
  (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="animate-slide-up text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
        Fast, Collaborative, AI-native Project Management
      </h1>
      <p className="animate-slide-up text-lg md:text-xl text-gray-400 mb-8 delay-100">
        Streamline your projects, maximize efficiency, and elevate your business with our
        cutting-edge project management tool designed for the real estate industry.
      </p>
      <div className="animate-slide-up flex flex-col sm:flex-row items-center justify-center gap-4 delay-200">
        <Button size="lg" className="bg-primary hover:bg-primary/90">
          Request a demo <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5">
          Explore
        </Button>
      </div>
    </div>
  ),
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
  // Projects
  (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Projects</h2>
      <p className="text-gray-700 text-lg">
        Showcase your real estate projects, share updates in real time, and collaborate
        across teams with ease.
      </p>
    </div>
  ),
  // Contact
  (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Contact</h2>
      <p className="text-gray-300 text-lg">
        Interested in a demo or partnership? Get in touch with us today and one of our
        specialists will reach out promptly.
      </p>
    </div>
  ),
  // Blog
  (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Blog</h2>
      <p className="text-gray-700 text-lg">
        Read product updates, case studies, and tips for managing your real estate workflow
        in our official blog.
      </p>
    </div>
  ),
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-white">
      {/* Responsive pill navbar */}
      <IntelligentNavbar />

      <main>
        {/* Five anchor sections for navbar/intersection observer */}
        {SECTION_IDS.map((id, i) => (
          <section
            id={id}
            key={id}
            className={`${SECTION_STYLES[i]} ${bgHelpers[i]} transition-all duration-300`}
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
