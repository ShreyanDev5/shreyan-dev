export const config = {
  runtime: "edge",
};

export default async function handler(req: Request) {
  const username = "ShreyanDev5";
  
  // 1. Try primary third-party endpoint
  try {
    const primaryRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`);
    if (primaryRes.ok) {
      const data = await primaryRes.json();
      if (data && data.contributions && data.contributions.length > 0) {
        return new Response(JSON.stringify(data), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
          },
        });
      }
    }
  } catch {
    // Fallback below
  }

  // 2. Try secondary endpoint
  try {
    const secondaryRes = await fetch(`https://github-contributions.vercel.app/api/v1/${username}`);
    if (secondaryRes.ok) {
      const data = await secondaryRes.json();
      const total: Record<string, number> = {};
      if (Array.isArray(data.years)) {
        data.years.forEach((y: { year: string; total: number }) => {
          total[y.year] = y.total;
        });
      }

      const contributions = Array.isArray(data.contributions)
        ? data.contributions.map((c: { date: string; count: number; intensity?: string }) => {
            const count = c.count || 0;
            let level = 0;
            const parsedIntensity = parseInt(c.intensity || "0", 10);
            if (parsedIntensity > 0) {
              level = Math.min(4, Math.max(1, parsedIntensity));
            } else if (count > 0) {
              if (count <= 3) level = 1;
              else if (count <= 6) level = 2;
              else if (count <= 9) level = 3;
              else level = 4;
            }
            return { date: c.date, count, level };
          })
        : [];

      return new Response(JSON.stringify({ total, contributions }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
        },
      });
    }
  } catch {
    // Fallback below
  }

  return new Response(JSON.stringify({ error: "Failed to fetch GitHub contributions" }), {
    status: 500,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
