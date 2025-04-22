
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-white">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-hero-gradient">
          <div className="container mx-auto px-4">
            {/* Promo Banner */}
            <div className="mb-12 flex justify-center">
              <div className="animate-fade-in bg-white/5 backdrop-blur-sm border border-white/10 rounded-full py-2 px-4">
                <span className="text-blue-400">New:</span>
                <span className="text-gray-300 ml-2">Get 50% off our lifetime plan</span>
              </div>
            </div>
            
            {/* Hero Content */}
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
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
