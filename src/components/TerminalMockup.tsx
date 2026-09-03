import React, { useEffect, useRef, useState, memo, type FC, type FormEvent } from "react";
import { Terminal, ShieldAlert } from "lucide-react";

const GitHubIcon: FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const LinkedInIcon: FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

const XIcon: FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2H21l-6.9 7.897L22.2 22h-6.828l-5.338-6.894L3.99 22H1.23l7.39-8.47L1 2h6.99l4.88 6.302L18.244 2Zm-1.2 18h1.527L6.164 3.44H4.522L17.044 20Z" />
  </svg>
);

const LeetCodeIcon: FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
  </svg>
);

interface TerminalProps {
  onOpenResume?: () => void;
  onOpenCertificate?: () => void;
}

interface TerminalLine {
  text: React.ReactNode;
  type: "input" | "error" | "success" | "system" | "output";
}

const COMMANDS = ["help", "links", "resume", "cert", "clear", "sudo", "joke"];

const TECH_JOKES = [
  "Why did the database administrator leave his wife? She had one-to-many relationships!",
  "Why do Java developers wear glasses? Because they don't C#.",
  "How do you comfort a JavaScript bug? You console it.",
  "What is an object-oriented developer's favorite way to get rich? Inheritance.",
  "Why did the functional programmer get fired? He refused to change his state.",
];

const TerminalMockup: FC<TerminalProps> = ({ onOpenResume, onOpenCertificate }) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [isBooting, setIsBooting] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  // Fast, clean boot sequence
  useEffect(() => {
    const bootLogs = [
      { text: "shreyan-dev initialized...", delay: 80, type: "system" as const },
      { text: "Last updated: September 3, 2026", delay: 220, type: "system" as const },
      { text: "Type 'help' to explore commands.", delay: 420, type: "success" as const },
    ];

    bootLogs.forEach((log) => {
      setTimeout(() => {
        setHistory((prev) => [...prev, { text: log.text, type: log.type }]);
        if (log.text.includes("explore commands")) {
          setIsBooting(false);
        }
      }, log.delay);
    });
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory: TerminalLine[] = [
      ...history,
      {
        text: (
          <div className="flex items-center gap-x-1.5 text-xs font-mono">
            <span className="text-emerald-400 font-semibold">PS</span>
            <span className="text-neutral-400">C:\Projects\shreyan-dev&gt;</span>
            <span className="text-neutral-100 font-medium">{cmd}</span>
          </div>
        ),
        type: "input",
      },
    ];

    if (!trimmed) {
      setHistory(newHistory);
      return;
    }

    setCommandHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);

    // Hidden 'cd <section>' Easter egg navigation
    if (trimmed.startsWith("cd ")) {
      const targetName = trimmed.slice(3).trim();
      const sectionMapping: Record<string, { id: string; label: string }> = {
        home: { id: "home", label: "Home" },
        hero: { id: "home", label: "Home" },
        about: { id: "about", label: "About" },
        projects: { id: "projects", label: "Projects" },
        github: { id: "github", label: "GitHub" },
        skills: { id: "skills", label: "Skills" },
        journey: { id: "journey", label: "Journey" },
        experience: { id: "journey", label: "Journey" },
        curiosity: { id: "curiosity", label: "Curiosity" },
        roadmap: { id: "curiosity", label: "Curiosity" },
        contact: { id: "contact", label: "Contact" },
      };

      if (sectionMapping[targetName]) {
        const { id } = sectionMapping[targetName];
        if (id === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          newHistory.push({
            text: `Navigating to #home...`,
            type: "success",
          });
        } else {
          const el = document.getElementById(id);
          if (el) {
            const targetPosition = window.scrollY + el.getBoundingClientRect().top - 90;
            window.scrollTo({ top: Math.max(0, targetPosition), behavior: "smooth" });
            newHistory.push({
              text: `Navigating to #${id}...`,
              type: "success",
            });
          } else {
            newHistory.push({
              text: `Section #${id} not found`,
              type: "error",
            });
          }
        }
        setHistory(newHistory);
        setInput("");
        return;
      }
    }

    switch (trimmed) {
      case "help":
        newHistory.push({
          text: (
            <div className="space-y-0.5 text-neutral-300 font-mono text-xs">
              <div><span className="text-emerald-400 font-semibold">links</span>        - Social profiles</div>
              <div><span className="text-emerald-400 font-semibold">resume</span>       - Open PDF resume</div>
              <div><span className="text-emerald-400 font-semibold">cert</span>         - Open certificate</div>
              <div><span className="text-emerald-400 font-semibold">joke</span>         - Programmer joke</div>
              <div><span className="text-emerald-400 font-semibold">clear</span>        - Clear screen</div>
            </div>
          ),
          type: "output",
        });
        break;
      case "links":
        newHistory.push({
          text: (
            <div className="space-y-1 text-xs font-mono">
              <div className="flex items-center gap-2">
                <GitHubIcon className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <a
                  href="https://github.com/ShreyanDev5"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-neutral-300 hover:text-emerald-400 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-2 transition-colors"
                >
                  github.com/ShreyanDev5
                </a>
              </div>
              <div className="flex items-center gap-2">
                <LinkedInIcon className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <a
                  href="https://linkedin.com/in/shreyansardar"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-neutral-300 hover:text-emerald-400 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-2 transition-colors"
                >
                  linkedin.com/in/shreyansardar
                </a>
              </div>
              <div className="flex items-center gap-2">
                <XIcon className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <a
                  href="https://x.com/Shreyan_23"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-neutral-300 hover:text-emerald-400 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-2 transition-colors"
                >
                  x.com/Shreyan_23
                </a>
              </div>
              <div className="flex items-center gap-2">
                <LeetCodeIcon className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <a
                  href="https://leetcode.com/u/Shreyan_555"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-neutral-300 hover:text-emerald-400 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-2 transition-colors"
                >
                  leetcode.com/u/Shreyan_555
                </a>
              </div>
            </div>
          ),
          type: "output",
        });
        break;
      case "resume":
        if (onOpenResume) {
          onOpenResume();
          newHistory.push({
            text: "Opening resume...",
            type: "success",
          });
        }
        break;
      case "cert":
      case "certificate":
        if (onOpenCertificate) {
          onOpenCertificate();
          newHistory.push({
            text: "Opening certificate...",
            type: "success",
          });
        } else {
          const el = document.getElementById("journey");
          if (el) {
            const targetPosition = window.scrollY + el.getBoundingClientRect().top - 90;
            window.scrollTo({ top: Math.max(0, targetPosition), behavior: "smooth" });
          }
          newHistory.push({
            text: "Opening certificate in Journey section...",
            type: "success",
          });
        }
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "sudo":
        newHistory.push({
          text: "visitor is not in the sudoers file. This incident has been logged.",
          type: "error",
        });
        break;
      case "joke": {
        const randomJoke = TECH_JOKES[Math.floor(Math.random() * TECH_JOKES.length)];
        newHistory.push({
          text: randomJoke,
          type: "output",
        });
        break;
      }
      default:
        newHistory.push({
          text: `Command not found: '${cmd}'. Type 'help' for commands.`,
          type: "error",
        });
    }

    setHistory(newHistory);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      if (!isBooting) {
        handleCommand(input);
      }
    }

    if (e.key === "Tab") {
      e.preventDefault();
      if (!input) return;
      const matches = COMMANDS.filter((cmd) => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        setHistory((prev) => [
          ...prev,
          {
            text: (
              <div className="flex items-center gap-x-1.5 text-xs font-mono">
                <span className="text-emerald-400 font-semibold">PS</span>
                <span className="text-neutral-400">C:\Projects\shreyan-dev&gt;</span>
                <span className="text-neutral-100 font-medium">{input}</span>
              </div>
            ),
            type: "input",
          },
          { text: matches.join("   "), type: "output" },
        ]);
      }
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isBooting) return;
    handleCommand(input);
  };

  const focusTerminal = () => {
    inputRef.current?.focus();
    setIsFocused(true);
  };

  return (
    <div
      onClick={focusTerminal}
      className="w-full h-[165px] sm:h-[180px] lg:h-[195px] rounded-xl border border-white/10 bg-[#141312]/95 shadow-xl overflow-hidden flex flex-col font-mono text-left cursor-text select-none"
    >
      {/* Windows PowerShell Title Bar */}
      <div className="px-3.5 py-2 bg-[#181716] border-b border-white/[0.08] flex items-center justify-between select-none shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[11px] font-mono text-neutral-300 tracking-wide font-medium">
            Windows PowerShell
          </span>
        </div>
      </div>

      {/* Terminal Output Stream */}
      <div
        ref={containerRef}
        className="flex-1 p-3 sm:p-3.5 overflow-y-auto space-y-0.5 text-[10.5px] sm:text-xs leading-[1.25] custom-scrollbar scroll-smooth select-text"
      >
        {history.map((line, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap ${
              line.type === "input"
                ? "text-white font-medium leading-normal"
                : line.type === "error"
                ? "text-red-400 flex items-start gap-1 leading-[1.25]"
                : line.type === "success"
                ? "text-emerald-400 leading-[1.25]"
                : line.type === "system"
                ? "text-neutral-400 leading-[1.25]"
                : "text-neutral-300 leading-[1.25]"
            }`}
          >
            {line.type === "error" && typeof line.text === "string" && line.text.includes("sudoers") && (
              <ShieldAlert size={14} className="shrink-0 mt-0.5 text-red-400" />
            )}
            {line.text}
          </div>
        ))}

        {/* Input line with PowerShell prompt & dynamic caret indicator */}
        {!isBooting && (
          <form onSubmit={handleSubmit} className="flex items-center gap-x-1.5 pt-0.5 leading-normal">
            <span className="text-emerald-400 font-semibold shrink-0">PS</span>
            <span className="text-neutral-400 shrink-0">C:\Projects\shreyan-dev&gt;</span>
            <div className="flex-1 flex items-center relative min-w-0">
              <span className="text-neutral-100 font-medium whitespace-pre select-none break-all">{input}</span>
              {/* Dynamic caret: subtle indicator when idle, active solid white when focused */}
              <span
                className={`inline-block w-[1.5px] h-[11px] ml-0.5 shrink-0 terminal-caret-anim transition-colors duration-200 ${
                  isFocused ? "bg-white/90" : "bg-emerald-400/60"
                }`}
              />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={handleKeyDown}
                className="absolute inset-0 opacity-0 cursor-text pointer-events-auto bg-transparent border-none outline-none text-transparent focus:ring-0 p-0"
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
                maxLength={40}
                aria-label="Terminal input prompt"
              />
            </div>
            <button type="submit" className="hidden" aria-hidden="true" />
          </form>
        )}
      </div>
    </div>
  );
};

export default memo(TerminalMockup);
