import { memo, useEffect, useRef, useState, type FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitCommit, Calendar, TrendingUp, FolderGit2 } from "lucide-react";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ApiResponse {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

interface GithubUserResponse {
  public_repos: number;
}

const CELL_LEVEL_STYLES: Record<number, string> = {
  0: "bg-[#1c1b1a] border-white/[0.08]",
  1: "bg-[#0e4429] border-[#135434]",
  2: "bg-[#006d32] border-[#0c8240]",
  3: "bg-[#26a641] border-[#34bd52]",
  4: "bg-[#39d353] border-[#56e66e]",
};

export const GithubSection: FC = memo(() => {
  const [contribData, setContribData] = useState<ApiResponse | null>(null);
  const [publicReposCount, setPublicReposCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredCell, setHoveredCell] = useState<{
    count: number;
    date: string;
    dateRaw: string;
    x: number;
    y: number;
    caretOffset: number;
  } | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchContribData = async (): Promise<ApiResponse | null> => {
      try {
        const res = await fetch("/api/github");
        if (res.ok) {
          const data = await res.json();
          if (data && data.contributions && data.contributions.length > 0) {
            return data;
          }
        }
      } catch {
        // Fallback to live production endpoint if on local/preview
      }

      // Fallback 1: Production endpoint
      try {
        const prodRes = await fetch("https://shreyandev.vercel.app/api/github");
        if (prodRes.ok) {
          const prodData = await prodRes.json();
          if (prodData && prodData.contributions && prodData.contributions.length > 0) {
            return prodData;
          }
        }
      } catch {
        // Fallback 2
      }

      // Fallback 2: Public API
      try {
        const fallbackRes = await fetch("https://github-contributions-api.jogruber.de/v4/ShreyanDev5");
        if (fallbackRes.ok) {
          const fallbackData = await fallbackRes.json();
          if (fallbackData && fallbackData.contributions && fallbackData.contributions.length > 0) {
            return fallbackData as ApiResponse;
          }
        }
      } catch {
        // Handle gracefully
      }
      return null;
    };

    const fetchAllData = async () => {
      try {
        const [contribResult, userRes] = await Promise.all([
          fetchContribData(),
          fetch("https://api.github.com/users/ShreyanDev5").catch(() => null),
        ]);

        if (isMounted && contribResult) {
          setContribData(contribResult);
        }

        if (userRes && userRes.ok) {
          const userJson: GithubUserResponse = await userRes.json();
          if (isMounted) setPublicReposCount(userJson.public_repos);
        }
      } catch {
        // Handle gracefully
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAllData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Sort API contribution array strictly chronologically (Oldest -> Newest)
  const rawList = contribData?.contributions || [];
  const sortedContributions = [...rawList].sort((a, b) => a.date.localeCompare(b.date));

  // Filter out future placeholder dates beyond today
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const validContributions = sortedContributions.filter((d) => d.date <= todayStr);

  // Helper for parsing YYYY-MM-DD safely in local time without UTC offset shifts
  const parseLocalDate = (dateStr: string) => {
    const parts = dateStr.split("-").map(Number);
    return new Date(parts[0], parts[1] - 1, parts[2] || 1);
  };

  // Start heatmap from Sunday of the first active contribution week
  const firstActiveIdx = validContributions.findIndex((d) => d.count > 0);
  let activeContributions: ContributionDay[] = validContributions;
  if (firstActiveIdx !== -1) {
    const firstActiveDow = parseLocalDate(validContributions[firstActiveIdx].date).getDay();
    const startIdx = Math.max(0, firstActiveIdx - firstActiveDow);
    activeContributions = validContributions.slice(startIdx);
  }

  // Accurate lifetime & yearly metrics derived directly from valid contributions
  const currentYearStr = String(now.getFullYear());

  const totalContributionsAllTime = validContributions.length > 0
    ? validContributions.reduce((acc, curr) => acc + curr.count, 0)
    : (contribData?.total ? Object.values(contribData.total).reduce((acc, curr) => acc + curr, 0) : 0);

  const currentYearContributions = validContributions.length > 0
    ? validContributions.filter((d) => d.date.startsWith(currentYearStr)).reduce((acc, curr) => acc + curr.count, 0)
    : (contribData?.total?.[currentYearStr] ?? 0);

  const activeDaysCount = validContributions.filter((d) => d.count > 0).length;

  // Group chronologically into Sunday-aligned 7-day weeks (Sunday = Row 0, Saturday = Row 6)
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  activeContributions.forEach((day) => {
    const dayOfWeek = parseLocalDate(day.date).getDay();
    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [day];
    } else {
      currentWeek.push(day);
    }
  });

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  // Calculate pixel-aligned month groups (1 week = 14.5px width)
  interface MonthGroup {
    name: string;
    weekCount: number;
  }
  const monthGroups: MonthGroup[] = [];
  weeks.forEach((week) => {
    const firstDay = week[0];
    if (firstDay && firstDay.date) {
      const dateObj = parseLocalDate(firstDay.date);
      const monthName = dateObj.toLocaleString("en-US", { month: "short" });
      const year = dateObj.getFullYear();
      const label = monthName === "Jan" ? `${monthName} '${String(year).slice(2)}` : monthName;

      const currentGroup = monthGroups[monthGroups.length - 1];
      if (!currentGroup || currentGroup.name !== label) {
        monthGroups.push({ name: label, weekCount: 1 });
      } else {
        currentGroup.weekCount += 1;
      }
    }
  });

  // Auto-scroll to far right on initial load so newest activity is visible by default
  useEffect(() => {
    if (!loading && contribData && scrollRef.current) {
      const scrollToFarRight = () => {
        if (scrollRef.current) {
          scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        }
      };

      scrollToFarRight();
      const rafId = requestAnimationFrame(scrollToFarRight);
      const timer = setTimeout(scrollToFarRight, 50);

      return () => {
        cancelAnimationFrame(rafId);
        clearTimeout(timer);
      };
    }
  }, [loading, contribData]);

  // Handle outside tap/click to dismiss active tooltip on mobile
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('[data-heatmap-cell="true"]')) {
        return;
      }
      setHoveredCell(null);
    };

    window.addEventListener("click", handleOutsideClick);
    window.addEventListener("touchstart", handleOutsideClick, { passive: true });
    return () => {
      window.removeEventListener("click", handleOutsideClick);
      window.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  const rafRef = useRef<number | null>(null);

  const handleCellTrigger = (target: HTMLElement, cell: ContributionDay, formattedDate: string) => {
    if (!cardRef.current) return;
    const rect = target.getBoundingClientRect();
    const parentRect = cardRef.current.getBoundingClientRect();
    const rawX = rect.left - parentRect.left + rect.width / 2;
    const rawY = rect.top - parentRect.top;
    const cardW = parentRect.width;

    // Clamp tooltip X so it stays fully inside card bounds [95px, cardW - 95px]
    const minX = 95;
    const maxX = cardW - 95;
    const clampedX = Math.max(minX, Math.min(rawX, maxX));
    const caretOffset = rawX - clampedX;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setHoveredCell({
        count: cell.count,
        date: formattedDate,
        dateRaw: cell.date,
        x: clampedX,
        y: rawY,
        caretOffset,
      });
    });
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="pt-10 pb-12 sm:pt-14 sm:pb-16 px-4 sm:px-6 lg:px-8 relative" id="github">
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-[28px] md:text-[30px] font-bold text-warm-100 tracking-tight">
            <span className="font-mono text-warm-600 text-lg sm:text-xl font-medium mr-2.5 select-none opacity-90">03 //</span>GitHub
          </h2>
        </motion.div>

        {/* Real Source Stat Cards */}
        <div className="w-full max-w-[19rem] sm:max-w-none mx-auto grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-5">
          <div className="rounded-xl border border-white/10 bg-[#151413]/90 hover:border-white/20 p-2.5 sm:p-3 text-center transition-colors shadow-sm">
            <div className="flex items-center justify-center text-[#26a641] mb-1">
              <FolderGit2 className="w-3.5 h-3.5" />
            </div>
            <div className="text-base sm:text-xl font-bold text-warm-100 tracking-tight font-mono">
              {loading ? "..." : (publicReposCount ?? 16)}
            </div>
            <div className="text-[9.5px] sm:text-[10.5px] font-mono uppercase tracking-wider text-warm-500">Public Repos</div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#151413]/90 hover:border-white/20 p-2.5 sm:p-3 text-center transition-colors shadow-sm">
            <div className="flex items-center justify-center text-[#26a641] mb-1">
              <GitCommit className="w-3.5 h-3.5" />
            </div>
            <div className="text-base sm:text-xl font-bold text-warm-100 tracking-tight font-mono">
              {loading ? "..." : totalContributionsAllTime.toLocaleString()}
            </div>
            <div className="text-[9.5px] sm:text-[10.5px] font-mono uppercase tracking-wider text-warm-500">Total Commits</div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#151413]/90 hover:border-white/20 p-2.5 sm:p-3 text-center transition-colors shadow-sm">
            <div className="flex items-center justify-center text-[#26a641] mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
            <div className="text-base sm:text-xl font-bold text-warm-100 tracking-tight font-mono">
              {loading ? "..." : currentYearContributions.toLocaleString()}
            </div>
            <div className="text-[9.5px] sm:text-[10.5px] font-mono uppercase tracking-wider text-warm-500">{currentYearStr} Commits</div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#151413]/90 hover:border-white/20 p-2.5 sm:p-3 text-center transition-colors shadow-sm">
            <div className="flex items-center justify-center text-[#26a641] mb-1">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <div className="text-base sm:text-xl font-bold text-warm-100 tracking-tight font-mono">
              {loading ? "..." : activeDaysCount}
            </div>
            <div className="text-[9.5px] sm:text-[10.5px] font-mono uppercase tracking-wider text-warm-500">Active Days</div>
          </div>
        </div>

        {/* Lifetime Heatmap Shell */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.25, delay: 0.1 }}
          className="w-full max-w-[19rem] sm:max-w-none mx-auto rounded-xl border border-white/10 bg-[#151413]/90 p-3.5 sm:p-5 text-left shadow-xl relative transform-gpu"
        >
          {/* Edge-Aware Clamped Floating Tooltip Container */}
          <AnimatePresence>
            {hoveredCell && (
              <div
                key="tooltip-container"
                style={{
                  position: "absolute",
                  left: `${hoveredCell.x}px`,
                  top: `${hoveredCell.y}px`,
                  transform: "translate(-50%, -100%)",
                  pointerEvents: "none",
                  zIndex: 50,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 3 }}
                  transition={{ duration: 0.1 }}
                  className="mb-2 px-2.5 py-1 rounded bg-[#1c1b1a] border border-white/15 text-[10px] sm:text-[11px] font-mono text-neutral-100 shadow-xl whitespace-nowrap relative select-none"
                >
                  <span className="text-[#39d353] font-semibold">{hoveredCell.count}</span> contribution{hoveredCell.count === 1 ? "" : "s"} on {hoveredCell.date}
                  {/* Arrow caret dynamically offset to point at exact square */}
                  <div
                    style={{ left: `calc(50% + ${hoveredCell.caretOffset}px)` }}
                    className="absolute -bottom-[4px] -translate-x-1/2 w-2 h-2 bg-[#1c1b1a] border-r border-b border-white/15 rotate-45"
                  />
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Header Row */}
          <div className="flex items-center justify-between mb-3.5 sm:mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#39d353]" />
              <span className="text-xs font-mono tracking-wide text-neutral-300 font-medium">
                Contributions
              </span>
            </div>
            <a
              href="https://github.com/ShreyanDev5"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-neutral-400 hover:text-[#39d353] transition-colors"
            >
              @ShreyanDev5
            </a>
          </div>

          {/* Crisp Touch Scrollable Viewport */}
          <div
            ref={scrollRef}
            className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden touch-pan-x py-1"
          >
            <div className="inline-block min-w-max px-2.5 sm:px-3">
              {/* Chronological Month Header Labels */}
              <div className="flex pl-[28px] mb-2 text-[10px] font-mono text-neutral-400 select-none">
                {monthGroups.map((mg, i) => {
                  const widthPx = mg.weekCount * 14.5;
                  const isLastGroup = i === monthGroups.length - 1;
                  return (
                    <div
                      key={i}
                      style={{ width: `${widthPx}px`, minWidth: `${widthPx}px` }}
                      className={`text-left pr-1 ${isLastGroup ? "whitespace-nowrap overflow-visible font-semibold text-neutral-300" : "truncate"}`}
                    >
                      {mg.name}
                    </div>
                  );
                })}
              </div>

              {/* Grid with Day Labels (Mon aligned to Row 1, Wed aligned to Row 3, Fri aligned to Row 5) */}
              <div className="flex gap-2 items-center">
                <div className="w-[20px] relative text-[9px] font-mono text-neutral-400 select-none h-[98.5px] shrink-0">
                  <span className="absolute top-[14.5px] left-0">Mon</span>
                  <span className="absolute top-[43.5px] left-0">Wed</span>
                  <span className="absolute top-[72.5px] left-0">Fri</span>
                </div>

                <div className="flex gap-[3.5px]" onMouseLeave={() => setHoveredCell(null)}>
                  {loading
                    ? Array.from({ length: 52 }).map((_, wIdx) => (
                        <div key={wIdx} className="flex flex-col gap-[3.5px]">
                          {Array.from({ length: 7 }).map((_, dIdx) => (
                            <div
                              key={dIdx}
                              className="w-[11px] h-[11px] rounded-[2px] bg-[#161b22] border border-[#21262d] animate-pulse"
                            />
                          ))}
                        </div>
                      ))
                    : weeks.map((week, wIdx) => (
                        <div key={wIdx} className="flex flex-col gap-[3.5px]">
                          {week.map((cell, dIdx) => {
                            const formattedDate = parseLocalDate(cell.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            });
                            const isSelected = hoveredCell?.dateRaw === cell.date;
                            return (
                              <div
                                key={dIdx}
                                data-heatmap-cell="true"
                                role="button"
                                aria-label={`${cell.count} contributions on ${formattedDate}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (isSelected) {
                                    setHoveredCell(null);
                                  } else {
                                    handleCellTrigger(e.currentTarget, cell, formattedDate);
                                  }
                                }}
                                onMouseEnter={(e) => {
                                  handleCellTrigger(e.currentTarget, cell, formattedDate);
                                }}
                                className={`w-[11px] h-[11px] rounded-[2px] border transition-transform duration-100 cursor-pointer outline-none focus:outline-none focus:ring-0 ${
                                  isSelected
                                    ? "scale-105 brightness-125"
                                    : "hover:scale-105 hover:brightness-125"
                                } ${CELL_LEVEL_STYLES[cell.level] || CELL_LEVEL_STYLES[0]}`}
                                style={{ WebkitTapHighlightColor: "transparent" }}
                              />
                            );
                          })}
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </div>

          {/* Legend Footer */}
          <div className="flex items-center justify-end text-[10px] font-mono text-neutral-400 gap-2 pt-3.5 sm:pt-4 mt-2 border-t border-white/[0.06]">
            <span>Less</span>
            <div className="flex gap-[3.5px] items-center">
              <span className="w-[11px] h-[11px] rounded-[2px] border bg-[#161b22] border-[#21262d]" />
              <span className="w-[11px] h-[11px] rounded-[2px] border bg-[#0e4429] border-[#135434]" />
              <span className="w-[11px] h-[11px] rounded-[2px] border bg-[#006d32] border-[#0c8240]" />
              <span className="w-[11px] h-[11px] rounded-[2px] border bg-[#26a641] border-[#34bd52]" />
              <span className="w-[11px] h-[11px] rounded-[2px] border bg-[#39d353] border-[#56e66e]" />
            </div>
            <span>More</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

GithubSection.displayName = "GithubSection";
export default GithubSection;
