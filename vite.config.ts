import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

function devApiPlugin(): Plugin {
  return {
    name: "dev-api-github",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === "/api/github") {
          try {
            const username = "ShreyanDev5";
            const currentYear = new Date().getFullYear();
            const pastYears = [currentYear - 2, currentYear - 1, currentYear];

            const parseGitHubYear = async (user: string, year?: number) => {
              const url = year
                ? `https://github.com/users/${user}/contributions?from=${year}-01-01&to=${year}-12-31`
                : `https://github.com/users/${user}/contributions`;
              const r = await fetch(url, {
                headers: {
                  "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                },
              });
              if (!r.ok) return [];
              const html = await r.text();
              const tooltipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/g;
              const tooltips: Record<string, string> = {};
              let tm;
              while ((tm = tooltipRegex.exec(html)) !== null) {
                tooltips[tm[1]] = tm[2].trim();
              }
              const tdRegex = /<td\s+[^>]*class="[^"]*ContributionCalendar-day[^"]*"[^>]*>/g;
              const days: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[] = [];
              let tdMatch;
              while ((tdMatch = tdRegex.exec(html)) !== null) {
                const tdHtml = tdMatch[0];
                const dateMatch = tdHtml.match(/data-date="([^"]+)"/);
                const levelMatch = tdHtml.match(/data-level="([^"]+)"/);
                const idMatch = tdHtml.match(/id="([^"]+)"/);
                if (dateMatch) {
                  const date = dateMatch[1];
                  const levelVal = levelMatch ? parseInt(levelMatch[1], 10) : 0;
                  const id = idMatch ? idMatch[1] : null;
                  let count = 0;
                  if (id && tooltips[id]) {
                    const text = tooltips[id];
                    const countMatch = text.match(/^([0-9,]+)\s+contribution/i);
                    if (countMatch) {
                      count = parseInt(countMatch[1].replace(/,/g, ""), 10);
                    }
                  } else if (levelVal > 0) {
                    count = levelVal;
                  }
                  days.push({
                    date,
                    count,
                    level: Math.min(4, Math.max(0, levelVal)) as 0 | 1 | 2 | 3 | 4,
                  });
                }
              }
              return days;
            };

            const [pastResults, liveResults] = await Promise.all([
              Promise.all(pastYears.map((y) => parseGitHubYear(username, y))),
              parseGitHubYear(username),
            ]);

            const dayMap = new Map<string, { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }>();
            pastResults.flat().forEach((d) => {
              if (d.date) dayMap.set(d.date, d);
            });
            liveResults.forEach((d) => {
              if (d.date) dayMap.set(d.date, d);
            });

            const contributions = Array.from(dayMap.values()).sort((a, b) => a.date.localeCompare(b.date));
            const total: Record<string, number> = {};
            contributions.forEach((d) => {
              const year = d.date.split("-")[0];
              total[year] = (total[year] || 0) + d.count;
            });

            res.setHeader("Content-Type", "application/json");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end(JSON.stringify({ total, contributions }));
            return;
          } catch {
            // pass to next
          }
        }
        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), devApiPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
