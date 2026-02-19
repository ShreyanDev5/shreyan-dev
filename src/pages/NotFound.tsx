import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-base sm:text-lg text-gray-400 mb-6 font-light leading-relaxed">
          Oops! Page not found
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 rounded-full border-1.75 border-white/30 text-white text-sm font-medium hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
