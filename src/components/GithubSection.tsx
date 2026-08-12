import { memo, useEffect, useRef, useState, type FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitCommit, Calendar, Flame, FolderGit2 } from "lucide-react";

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
  0: "bg-[#161b22] border-[#21262d]",
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
    x: number;
    y: number;
    caretOffset: number;
  } | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchContribData = async (): Promise<ApiResponse | null> => {
      // Primary API endpoint
      try {
        const res = await fetch("https://github-contributions-api.jogruber.de/v4/ShreyanDev5");
        if (res.ok) {
          const data = await res.json();
          if (data && data.contributions && data.contributions.length > 0) {
            return data;
          }
        }
      } catch {
        // Fallback below
      }

      // Secondary API endpoint
      try {
        const res = await fetch("https://github-contributions.vercel.app/api/v1/ShreyanDev5");
        if (res.ok) {
          const data = await res.json();
          const total: Record<string, number> = {};
          if (Array.isArray(data.years)) {
            data.years.forEach((y: { year: string; total: number }) => {
              total[y.year] = y.total;
            });
          }

          const contributions: ContributionDay[] = Array.isArray(data.contributions)
            ? data.contributions.map((c: { date: string; count: number; intensity?: string }) => {
                const count = c.count || 0;
                let level: 0 | 1 | 2 | 3 | 4 = 0;
                const parsedIntensity = parseInt(c.intensity || "0", 10);
                if (parsedIntensity > 0) {
                  level = Math.min(4, Math.max(1, parsedIntensity)) as 0 | 1 | 2 | 3 | 4;
                } else if (count > 0) {
                  if (count <= 3) level = 1;
                  else if (count <= 6) level = 2;
                  else if (count <= 9) level = 3;
                  else level = 4;
                }
                return { date: c.date, count, level };
              })
            : [];

          return { total, contributions };
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
  const todayStr = new Date().toISOString().split("T")[0];
  const validContributions = sortedContributions.filter((d) => d.date <= todayStr);

  // Start heatmap from Sunday of the first active contribution week (Sunday, August 4, 2024)
  const firstActiveIdx = validContributions.findIndex((d) => d.count > 0);
  let activeContributions: ContributionDay[] = validContributions;
  if (firstActiveIdx !== -1) {
    const firstActiveDow = new Date(validContributions[firstActiveIdx].date).getDay();
    const startIdx = Math.max(0, firstActiveIdx - firstActiveDow);
    activeContributions = validContributions.slice(startIdx);
  }

  // Accurate lifetime metrics
  const totalContributionsAllTime = contribData?.total
    ? Object.values(contribData.total).reduce((acc, curr) => acc + curr, 0)
    : 0;

  const activeDaysCount = validContributions.filter((d) => d.count > 0).length;

  let currentStreak = 0;
  let maxStreakAllTime = 0;
  validContributions.forEach((d) => {
    if (d.count > 0) {
      currentStreak++;
      if (currentStreak > maxStreakAllTime) maxStreakAllTime = currentStreak;
    } else {
      currentStreak = 0;
    }
  });

  // Group chronologically into Sunday-aligned 7-day weeks (Sunday = Row 0, Saturday = Row 6)
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  activeContributions.forEach((day) => {
    const dayOfWeek = new Date(day.date).getDay();
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
      const dateObj = new Date(firstDay.date);
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

  // Auto-scroll to far right on initial load so newest activity (Aug) is visible by default
  useEffect(() => {
    if (!loading && contribData && scrollRef.current) {
      const scrollToFarRight = () => {
        if (scrollRef.current) {
          scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        }
      };

      scrollToFarRight();
      const rafId = requestAnimationFrame(scrollToFarRight);
      const timer = setTimeout(scrollToFarRight, 100);

      return () => {
        cancelAnimationFrame(rafId);
        clearTimeout(timer);
      };
    }
  }, [loading, contribData]);

  return (
    <section className="py-9 sm:py-12 px-4 sm:px-6 lg:px-8 relative" id="github">
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="text-center mb-5 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-[28px] md:text-[30px] font-bold text-white tracking-tight">
            <span className="font-mono text-neutral-500 text-lg sm:text-xl font-medium mr-2.5 select-none opacity-90">03 //</span>GitHub
          </h2>
        </motion.div>

        {/* Real Source Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-5">
          <div className="rounded-xl border border-[#21262d] bg-[#0d1117] hover:border-[#30363d] p-2.5 sm:p-3 text-center transition-colors">
            <div className="flex items-center justify-center text-[#26a641] mb-1">
              <FolderGit2 className="w-3.5 h-3.5" />
            </div>
            <div className="text-base sm:text-xl font-bold text-white tracking-tight font-mono">
              {loading ? "..." : (publicReposCount ?? 0)}
            </div>
            <div className="text-[9.5px] sm:text-[10.5px] font-mono uppercase tracking-wider text-neutral-400">Public Repos</div>
          </div>

          <div className="rounded-xl border border-[#21262d] bg-[#0d1117] hover:border-[#30363d] p-2.5 sm:p-3 text-center transition-colors">
            <div className="flex items-center justify-center text-[#26a641] mb-1">
              <GitCommit className="w-3.5 h-3.5" />
            </div>
            <div className="text-base sm:text-xl font-bold text-white tracking-tight font-mono">
              {loading ? "..." : totalContributionsAllTime.toLocaleString()}
            </div>
            <div className="text-[9.5px] sm:text-[10.5px] font-mono uppercase tracking-wider text-neutral-400">Contributions</div>
          </div>

          <div className="rounded-xl border border-[#21262d] bg-[#0d1117] hover:border-[#30363d] p-2.5 sm:p-3 text-center transition-colors">
            <div className="flex items-center justify-center text-[#26a641] mb-1">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <div className="text-base sm:text-xl font-bold text-white tracking-tight font-mono">
              {loading ? "..." : `${activeDaysCount}d`}
            </div>
            <div className="text-[9.5px] sm:text-[10.5px] font-mono uppercase tracking-wider text-neutral-400">Active Days</div>
          </div>

          <div className="rounded-xl border border-[#21262d] bg-[#0d1117] hover:border-[#30363d] p-2.5 sm:p-3 text-center transition-colors">
            <div className="flex items-center justify-center text-[#26a641] mb-1">
              <Flame className="w-3.5 h-3.5" />
            </div>
            <div className="text-base sm:text-xl font-bold text-white tracking-tight font-mono">
              {loading ? "..." : `${maxStreakAllTime}d`}
            </div>
            <div className="text-[9.5px] sm:text-[10.5px] font-mono uppercase tracking-wider text-neutral-400">Longest Streak</div>
          </div>
        </div>

        {/* Lifetime Heatmap Shell - REMOVED overflow-hidden so tooltips float un-clipped */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.25, delay: 0.1 }}
          className="rounded-xl border border-[#21262d] bg-[#0d1117] p-3.5 sm:p-5 text-left shadow-xl relative"
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
                  initial={{ opacity: 0, y: 4, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.95 }}
                  transition={{ duration: 0.12 }}
                  className="mb-2 px-2.5 py-1 rounded bg-[#161b22] border border-[#30363d] text-[10px] sm:text-[11px] font-mono text-neutral-200 shadow-2xl whitespace-nowrap relative"
                >
                  <span className="text-[#39d353] font-semibold">{hoveredCell.count}</span> contribution{hoveredCell.count === 1 ? "" : "s"} on {hoveredCell.date}
                  {/* Arrow caret dynamically offset to point at exact square */}
                  <div
                    style={{ left: `calc(50% + ${hoveredCell.caretOffset}px)` }}
                    className="absolute -bottom-[4px] -translate-x-1/2 w-2 h-2 bg-[#161b22] border-r border-b border-[#30363d] rotate-45"
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
            className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden touch-pan-x py-1 scroll-smooth"
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

                <div className="flex gap-[3.5px]">
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
                            const formattedDate = new Date(cell.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            });
                            return (
                              <div
                                key={dIdx}
                                onMouseEnter={(e) => {
                                  const rect = e.currentTarget.getBoundingClientRect();
                                  if (cardRef.current) {
                                    const parentRect = cardRef.current.getBoundingClientRect();
                                    const rawX = rect.left - parentRect.left + rect.width / 2;
                                    const rawY = rect.top - parentRect.top;
                                    const cardW = parentRect.width;

                                    // Clamp tooltip X so it stays fully inside card bounds [95px, cardW - 95px]
                                    const minX = 95;
                                    const maxX = cardW - 95;
                                    const clampedX = Math.max(minX, Math.min(rawX, maxX));
                                    const caretOffset = rawX - clampedX;

                                    setHoveredCell({
                                      count: cell.count,
                                      date: formattedDate,
                                      x: clampedX,
                                      y: rawY,
                                      caretOffset,
                                    });
                                  }
                                }}
                                onMouseLeave={() => setHoveredCell(null)}
                                className={`w-[11px] h-[11px] rounded-[2px] border transition-all duration-150 cursor-pointer hover:scale-105 hover:brightness-125 ${
                                  CELL_LEVEL_STYLES[cell.level] || CELL_LEVEL_STYLES[0]
                                }`}
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
          <div className="flex items-center justify-end text-[10px] font-mono text-neutral-400 gap-2 pt-3.5 sm:pt-4 mt-2 border-t border-[#21262d]">
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
