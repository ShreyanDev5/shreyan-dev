import type { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="relative z-10 py-8 px-4 border-t border-white/[0.08]">
      <div className="max-w-5xl mx-auto flex items-center justify-center text-sm text-gray-400 tracking-wide">
        <span>Designed & built by Shreyan &middot; {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
};

export default Footer;