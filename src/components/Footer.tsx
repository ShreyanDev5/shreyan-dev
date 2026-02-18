import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="py-8 px-4 border-t border-white/5">
      <div className="max-w-5xl mx-auto flex items-center justify-center text-sm text-gray-500">
        <span>&copy; {new Date().getFullYear()} Shreyan Sardar. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;