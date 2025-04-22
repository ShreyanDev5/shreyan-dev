
import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg"></div>
          <span className="text-white text-xl font-semibold">Layers</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
          <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
          <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-gray-300 hover:text-white">Sign in</Button>
          <Button className="bg-primary hover:bg-primary/90">Sign up</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
