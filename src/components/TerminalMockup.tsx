import React, { useEffect, useRef, useState, memo, type FC, type FormEvent } from "react";
import { Terminal, ShieldAlert } from "lucide-react";

interface TerminalLine {
  text: string | React.ReactNode;
  type: "input" | "output" | "error" | "success" | "system";
}

const COMMANDS = ["help", "home", "about", "projects", "skills", "journey", "curiosity", "contact", "clear", "sudo", "joke"];

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

  // Authentic Windows PowerShell boot sequence
  useEffect(() => {
    const bootLogs = [
      { text: "Windows PowerShell v7.4", delay: 120, type: "system" as const },
      { text: "Loading shreyan.dev environment...", delay: 400, type: "system" as const },
      { text: "[OK] Click to type. Run 'help'.", delay: 850, type: "success" as const },
    ];

    bootLogs.forEach((log) => {
      setTimeout(() => {
        setHistory((prev) => [...prev, { text: log.text, type: log.type }]);
        if (log.text.includes("Run 'help'")) {
          setIsBooting(false);
          if (window.innerWidth > 768 && !('ontouchstart' in window)) {
            inputRef.current?.focus();
          }
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

    // Section scroll mapping (case-insensitive)
    const sectionMapping: Record<string, { id: string; label: string }> = {
      home: { id: "home", label: "Home" },
      hero: { id: "home", label: "Home" },
      about: { id: "about", label: "About" },
      projects: { id: "projects", label: "Projects" },
      skills: { id: "skills", label: "Skills" },
      journey: { id: "journey", label: "Journey" },
      experience: { id: "journey", label: "Journey" },
      curiosity: { id: "curiosity", label: "Curiosity" },
      roadmap: { id: "curiosity", label: "Curiosity" },
      contact: { id: "contact", label: "Contact" },
    };

    if (sectionMapping[trimmed]) {
      const { id, label } = sectionMapping[trimmed];
      if (id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        newHistory.push({
          text: `Scrolling to ${label} section...`,
          type: "success",
        });
      } else {
        const el = document.getElementById(id);
        if (el) {
          const targetPosition = window.scrollY + el.getBoundingClientRect().top - 90;
          window.scrollTo({ top: Math.max(0, targetPosition), behavior: "smooth" });
          newHistory.push({
            text: `Scrolling to ${label} section...`,
            type: "success",
          });
        } else {
          newHistory.push({
            text: `Section element not found in DOM: #${id}`,
            type: "error",
          });
        }
      }
      setHistory(newHistory);
      setInput("");
      return;
    }

    switch (trimmed) {
      case "help":
        newHistory.push({
          text: (
            <div className="space-y-0.5 text-neutral-300 font-mono text-xs">
              <div className="text-white font-semibold">Available Commands:</div>
              <div className="border-b border-white/10 my-1" />
              <div><span className="text-emerald-400 font-semibold">about</span>      - Jump to About section</div>
              <div><span className="text-emerald-400 font-semibold">projects</span>   - Jump to Projects section</div>
              <div><span className="text-emerald-400 font-semibold">skills</span>     - Jump to Skills section</div>
              <div><span className="text-emerald-400 font-semibold">journey</span>    - Jump to Journey section</div>
              <div><span className="text-emerald-400 font-semibold">curiosity</span>  - Jump to Curiosity section</div>
              <div><span className="text-emerald-400 font-semibold">contact</span>    - Jump to Contact section</div>
              <div><span className="text-emerald-400 font-semibold">joke</span>       - Programmer joke</div>
              <div><span className="text-emerald-400 font-semibold">clear</span>      - Clear screen</div>
              <div><span className="text-emerald-400 font-semibold">sudo</span>       - Superuser override</div>
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
          text: "visitor is not in the sudoers file. This incident has been logged.",
          type: "error",
        });
        break;
      case "joke":
        newHistory.push({
          text: "Why did the database administrator leave his wife? She had one-to-many relationships!",
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
  };

  return (
    <div
      onClick={focusTerminal}
      className="w-full h-[175px] sm:h-[195px] lg:h-[200px] rounded-xl border border-white/[0.08] bg-[#121215] shadow-xl overflow-hidden flex flex-col font-mono text-left cursor-text select-none"
    >
      {/* Windows PowerShell Title Bar */}
      <div className="px-3.5 py-2 bg-[#18181b] border-b border-white/[0.06] flex items-center justify-between select-none shrink-0">
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

        {/* Input line with PowerShell prompt & calibrated caret */}
        {!isBooting && (
          <form onSubmit={handleSubmit} className="flex items-center gap-x-1.5 pt-0.5 leading-normal">
            <span className="text-emerald-400 font-semibold shrink-0">PS</span>
            <span className="text-neutral-400 shrink-0">C:\Projects\shreyan-dev&gt;</span>
            <div className="flex-1 flex items-center relative min-w-0">
              <span className="text-neutral-100 font-medium whitespace-pre select-none break-all">{input}</span>
              {/* Thin calibrated white caret matching CuriositySection */}
              <span className="inline-block w-[1.5px] h-[11px] bg-white/90 animate-[pulse_1.2s_ease-in-out_infinite] ml-0.5 shrink-0" />
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
            <button type="submit" className="hidden" aria-hidden="true" />
          </form>
        )}
      </div>
    </div>
  );
};

export default memo(TerminalMockup);
