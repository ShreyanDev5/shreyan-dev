export const config = {
  runtime: "edge",
};

async function parseGitHubYear(username: string, year?: number) {
  const url = year
    ? `https://github.com/users/${username}/contributions?from=${year}-01-01&to=${year}-12-31`
    : `https://github.com/users/${username}/contributions`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!res.ok) return [];
    const html = await res.text();

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

        const level = Math.min(4, Math.max(0, levelVal)) as 0 | 1 | 2 | 3 | 4;
        days.push({ date, count, level });
      }
    }

    return days;
  } catch {
    return [];
  }
}

export default async function handler() {
  const username = "ShreyanDev5";
  const currentYear = new Date().getFullYear();
  const pastYears = [currentYear - 2, currentYear - 1, currentYear];

  try {
    const [pastResults, liveResults] = await Promise.all([
      Promise.all(pastYears.map((y) => parseGitHubYear(username, y))),
      parseGitHubYear(username), // Live real-time rolling 365-day graph
    ]);

    const dayMap = new Map<string, { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }>();

    // 1. Populate historical year data
    pastResults.flat().forEach((d) => {
      if (d.date) {
        dayMap.set(d.date, d);
      }
    });

    // 2. Overwrite with live rolling data for real-time accuracy on recent & today's commits
    liveResults.forEach((d) => {
      if (d.date) {
        dayMap.set(d.date, d);
      }
    });

    const contributions = Array.from(dayMap.values()).sort((a, b) => a.date.localeCompare(b.date));

    // Server-side fallback to public API if direct scrape returned empty
    if (contributions.length === 0) {
      const fallbackRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`);
      if (fallbackRes.ok) {
        const fallbackData = await fallbackRes.json();
        if (fallbackData && fallbackData.contributions) {
          return new Response(JSON.stringify(fallbackData), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
            },
          });
        }
      }
      throw new Error("No contribution data parsed");
    }

    const total: Record<string, number> = {};
    contributions.forEach((d) => {
      const year = d.date.split("-")[0];
      total[year] = (total[year] || 0) + d.count;
    });

    return new Response(JSON.stringify({ total, contributions }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch GitHub contributions" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
