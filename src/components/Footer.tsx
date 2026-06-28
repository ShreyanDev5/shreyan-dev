import type { FC } from "react";

const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2H21l-6.9 7.897L22.2 22h-6.828l-5.338-6.894L3.99 22H1.23l7.39-8.47L1 2h6.99l4.88 6.302L18.244 2Zm-1.2 18h1.527L6.164 3.44H4.522L17.044 20Z" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M21 0h-18c-1.657 0-3 1.343-3 3v18c0 1.657 1.343 3 3 3h18c1.657 0 3-1.343 3-3v-18c0-1.657-1.343-3-3-3zm-13 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const MailIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const FOOTER_LINKS = [
  {
    name: "Twitter",
    href: "https://x.com/Shreyan_23",
    icon: XIcon,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/shreyansardar",
    icon: LinkedInIcon,
  },
  {
    name: "GitHub",
    href: "https://github.com/ShreyanDev5",
    icon: GitHubIcon,
  },
  {
    name: "Email",
    href: "mailto:shreyansardar427@gmail.com",
    icon: MailIcon,
  },
];

const Footer: FC = () => {
  return (
    <footer id="contact" className="relative z-10 pt-16 sm:pt-20 pb-8 sm:pb-10 px-4 bg-[#0a0a0a] overflow-hidden border-t border-white/[0.03]">
      {/* Subtle background gradient match to Hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 100%, rgba(16, 185, 129, 0.04), transparent 60%)`,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center justify-center">
        <h2 className="text-[30px] sm:text-[40px] md:text-[46px] font-bold text-white mb-8 tracking-tight text-center leading-[1.2] sm:leading-tight">
          Let&apos;s build something dependable<span className="text-emerald-500">.</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-2.5 max-w-2xl">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-transparent text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 text-sm font-medium tracking-wide shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
            >
              <link.icon className="w-4 h-4 shrink-0" />
              <span>{link.name}</span>
            </a>
          ))}
        </div>

        <div className="text-[11px] text-gray-500 tracking-wider mt-10 font-normal select-none">
          &copy; {new Date().getFullYear()} Shreyan Sardar
        </div>
      </div>
    </footer>
  );
};

export default Footer;