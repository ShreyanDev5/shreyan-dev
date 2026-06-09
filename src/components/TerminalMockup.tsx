import React, { useEffect, useRef, useState, type FC, type FormEvent } from "react";
import { Terminal, ShieldAlert } from "lucide-react";

interface TerminalLine {
  text: string | React.ReactNode;
  type: "input" | "output" | "error" | "success" | "system";
}

const COMMANDS = ["help", "about", "projects", "skills", "contact", "clear", "sudo", "joke"];

const TerminalMockup: FC = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [isBooting, setIsBooting] = useState(true);
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

  // Boot sequence animation
  useEffect(() => {
    const bootLogs = [
      { text: "Initializing ShreyanSardar v1.1.0...", delay: 150, type: "system" as const },
      { text: "[OK] Connected to PostgreSQL database.", delay: 400, type: "success" as const },
      { text: "[OK] Redis cache clusters initialized.", delay: 650, type: "success" as const },
      { text: "[OK] Loaded Spring Boot context.", delay: 900, type: "system" as const },
      { text: "[OK] System online in 427ms.", delay: 1100, type: "success" as const },
      { text: "Type 'help' to explore my profile. ☕", delay: 1300, type: "output" as const },
    ];

    bootLogs.forEach((log) => {
      setTimeout(() => {
        setHistory((prev) => [...prev, { text: log.text, type: log.type }]);
        if (log.text.includes("Type 'help'")) {
          setIsBooting(false);
          // Autofocus on desktop
          if (window.innerWidth > 768) {
            inputRef.current?.focus();
          }
        }
      }, log.delay);
    });
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const isMobilePrompt = typeof window !== "undefined" && window.innerWidth < 640;
    const prompt = isMobilePrompt ? "visitor:~$" : "visitor@shreyan-dev:~$";
    const newHistory: TerminalLine[] = [...history, { text: `${prompt} ${cmd}`, type: "input" }];

    if (!trimmed) {
      setHistory(newHistory);
      return;
    }

    setCommandHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);

    // Dynamic scroll intercept for project titles
    const projectMapping: Record<string, string> = {
      "student management system": "project-student-management-system",
      "student-management-system": "project-student-management-system",
      "springmart": "project-springmart",
      "wrkout": "project-wrkout",
      "shreyan's arc": "project-shreyan-s-arc",
      "shreyans arc": "project-shreyan-s-arc",
      "j-void": "project-j-void",
      "jvoid": "project-j-void",
      "wealthwise": "project-wealthwise",
    };

    if (projectMapping[trimmed]) {
      const targetId = projectMapping[trimmed];
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        newHistory.push({
          text: `Scrolling directly to the ${cmd} card... 🚀`,
          type: "success",
        });
      } else {
        newHistory.push({
          text: `Project card element not found in DOM for: ${cmd}`,
          type: "error",
        });
      }
      setHistory(newHistory);
      setInput("");
      return;
    }

    switch (trimmed) {
      case "help":
        newHistory.push({
          text: (
            <div className="space-y-0.5 text-neutral-300">
              <div>Available Commands:</div>
              <div>--------------------------------------------</div>
              <div><span className="text-yellow-400 font-semibold">about</span>    🙋 - My story & fun facts</div>
              <div><span className="text-yellow-400 font-semibold">projects</span> 🚀 - View active software projects</div>
              <div><span className="text-yellow-400 font-semibold">skills</span>   ⚡ - Show backend technical stack</div>
              <div><span className="text-yellow-400 font-semibold">contact</span>  📞 - Get in touch with me</div>
              <div><span className="text-yellow-400 font-semibold">joke</span>     🎭 - Tell a programmer joke</div>
              <div><span className="text-yellow-400 font-semibold">clear</span>    🧹 - Clear the console screen</div>
              <div><span className="text-yellow-400 font-semibold">sudo</span>     🔑 - Attempt superuser override</div>
            </div>
          ),
          type: "output",
        });
        break;
      case "about":
        newHistory.push({
          text: (
            <div className="space-y-1 text-neutral-300">
              <div className="text-white font-semibold">Hey, I'm Shreyan! 🙋</div>
              <p className="leading-snug">
                I'm a CS graduate focused on backend engineering and system design. I love writing clean Java/Spring Boot code and studying how platforms like Netflix and YouTube handle millions of concurrent requests under the hood.
              </p>
              <div className="pt-0.5">
                <div className="text-yellow-400 font-semibold">⚡ Fun Facts:</div>
                <ul className="list-disc list-inside space-y-0.5 text-neutral-400 pl-1 mt-0.5">
                  <li>I practice DSA to sharpen my logic, but designing architectures is my real goal.</li>
                  <li>I wrote my first code in C using Turbo C++ in college.</li>
                  <li>Powered by black coffee and system design videos. ☕</li>
                </ul>
              </div>
            </div>
          ),
          type: "output",
        });
        break;
      case "projects":
        newHistory.push({
          text: `Active Projects:
--------------------------------------------
1. Student Management System 🎓
2. SpringMart 🛒
3. wrkout 💪
4. Shreyan's Arc 🗺️
5. J-Void 💻
6. WealthWise 📊

Type a project name to jump directly to its details!`,
          type: "output",
        });
        break;
      case "skills":
        newHistory.push({
          text: (
            <div className="space-y-1 text-neutral-300 text-left">
              <div>
                <span className="text-yellow-400 font-semibold">Languages & Frameworks:</span>
                <div className="pl-4 text-neutral-400">Java, Spring Boot, Hibernate (JPA)</div>
              </div>
              <div>
                <span className="text-yellow-400 font-semibold">Databases & Testing:</span>
                <div className="pl-4 text-neutral-400">MySQL, H2, JUnit 5, Mockito</div>
              </div>
              <div>
                <span className="text-yellow-400 font-semibold">Tools & Productivity:</span>
                <div className="pl-4 text-neutral-400">Git, Docker, Postman, IntelliJ IDEA, Supabase, Firebase, Vercel, Render, Resend, Netlify, Warp, GitHub Copilot, Antigravity, Codex</div>
              </div>
              <div>
                <span className="text-yellow-400 font-semibold">Systems & DevOps Concepts:</span>
                <div className="pl-4 text-neutral-400">System Design, Redis, Kafka, RabbitMQ, Kubernetes, GitHub Actions, OpenAPI, AWS</div>
              </div>
            </div>
          ),
          type: "output",
        });
        break;
      case "contact":
        newHistory.push({
          text: (
            <div className="space-y-0.5 text-neutral-300 text-left">
              <div>Email: <a href="mailto:shreyansardar427@gmail.com" className="text-yellow-400 hover:text-yellow-300 underline font-semibold transition-colors">shreyansardar427@gmail.com</a></div>
              <div>LinkedIn: <a href="https://linkedin.com/in/shreyansardar" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 underline font-semibold transition-colors">linkedin.com/in/shreyansardar</a></div>
              <div>GitHub: <a href="https://github.com/ShreyanDev5" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 underline font-semibold transition-colors">github.com/ShreyanDev5</a></div>
              <div>Twitter: <a href="https://x.com/Shreyan_23" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 underline font-semibold transition-colors">x.com/Shreyan_23</a></div>
            </div>
          ),
          type: "output",
        });
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "sudo":
        newHistory.push({
          text: "visitor is not in the sudoers file. This incident will be reported.",
          type: "error",
        });
        break;
      case "joke":
        newHistory.push({
          text: "🎭 Why did the database administrator leave his wife? She had one-to-many relationships! 💔",
          type: "output",
        });
        break;
      default:
        newHistory.push({
          text: `Command not found: '${cmd}'. Type 'help' to view available commands.`,
          type: "error",
        });
    }

    setHistory(newHistory);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Intercept Enter key to prevent page navigation/jumping and bubbled browser actions
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      if (!isBooting) {
        handleCommand(input);
      }
    }

    // Autocomplete on Tab
    if (e.key === "Tab") {
      e.preventDefault();
      if (!input) return;
      const matches = COMMANDS.filter((cmd) => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        const isMobilePrompt = typeof window !== "undefined" && window.innerWidth < 640;
        const prompt = isMobilePrompt ? "visitor:~$" : "visitor@shreyan-dev:~$";
        setHistory((prev) => [
          ...prev,
          { text: `${prompt} ${input}`, type: "input" },
          { text: matches.join("   "), type: "output" },
        ]);
      }
    }

    // Command history navigation (Up/Down arrows)
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
    if (isBooting) return;
    handleCommand(input);
  };

  const focusTerminal = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      onClick={focusTerminal}
      className="w-full h-[235px] sm:h-[290px] rounded-2xl border border-white/[0.08] bg-[#0c0d12]/80 backdrop-blur-xl shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden flex flex-col font-mono text-left cursor-text"
      style={{ wordSpacing: "-0.04em" }}
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-black/40 select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium select-none">
          <Terminal size={12} className="text-neutral-600" />
          <span>visitor@shreyan-dev: ~</span>
        </div>
        <div className="w-10 h-1" /> {/* Spacer */}
      </div>

      {/* Terminal Output Stream */}
      <div
        ref={containerRef}
        className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-1 text-xs sm:text-[13px] leading-snug custom-scrollbar scroll-smooth"
      >
        {history.map((line, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap ${
              line.type === "input"
                ? "text-white font-semibold"
                : line.type === "error"
                ? "text-red-400 flex items-start gap-1"
                : line.type === "success"
                ? "text-emerald-400"
                : line.type === "system"
                ? "text-blue-400"
                : "text-neutral-300"
            }`}
          >
            {line.type === "error" && typeof line.text === "string" && line.text.includes("sudoers") && (
              <ShieldAlert size={14} className="shrink-0 mt-0.5 text-red-500" />
            )}
            {line.text}
          </div>
        ))}

        {/* Input line with blinking caret */}
        {!isBooting && (
          <form onSubmit={handleSubmit} className="flex items-center gap-1.5 pt-0.5">
            <span className="text-emerald-400 font-semibold shrink-0 hidden sm:inline">visitor@shreyan-dev:~$</span>
            <span className="text-emerald-400 font-semibold shrink-0 inline sm:hidden">visitor:~$</span>
            <div className="flex-1 flex items-center relative min-w-0">
              <span className="text-white whitespace-pre select-none break-all">{input}</span>
              {/* Custom blinking caret (reduced width to w-[5px]) */}
              <span className="w-[5px] h-4 bg-emerald-400 ml-0.5 animate-blink shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
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
          </form>
        )}
      </div>
    </div>
  );
};

export default TerminalMockup;
