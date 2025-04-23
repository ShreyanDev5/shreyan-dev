
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { BarChart2, Info } from "lucide-react";

type Skill = {
  name: string;
  level: number; // 0-100
  details: string;
  icon?: React.ReactNode;
};

// Example data
const SKILL_TIERS: {
  tier: string;
  color: string;
  skills: Skill[];
}[] = [
  {
    tier: "Expert",
    color: "from-blue-500 via-blue-400 to-cyan-400",
    skills: [
      {
        name: "React",
        level: 95,
        details: "Extensive experience with advanced hooks, context, and performance optimization.",
        icon: <BarChart2 className="text-blue-400" />,
      },
      {
        name: "TypeScript",
        level: 90,
        details: "Strong proficiency in static typing, generics, and scalable interfaces.",
      },
      {
        name: "Tailwind CSS",
        level: 92,
        details: "Skilled in building advanced responsive layouts and design systems.",
      },
    ],
  },
  {
    tier: "Proficient",
    color: "from-blue-400 via-sky-400 to-blue-300",
    skills: [
      {
        name: "shadcn/ui",
        level: 82,
        details: "Rapid UI development with accessible, composable React components.",
      },
      {
        name: "React Query",
        level: 80,
        details: "Server state management and caching strategies for robust UIs.",
      },
      {
        name: "Recharts",
        level: 77,
        details: "Interactive data visualization and custom chart design.",
      },
    ],
  },
  {
    tier: "Familiar",
    color: "from-sky-300 via-sky-400 to-blue-200",
    skills: [
      {
        name: "Zod",
        level: 68,
        details: "Schema validation and error handling for data integrity.",
      },
      {
        name: "Next.js",
        level: 65,
        details: "Experience in SSR, routing, and dynamic rendering.",
      },
      {
        name: "Supabase",
        level: 60,
        details: "Basic CRUD, authentication, and usage for backend-as-a-service.",
      },
    ],
  },
];

// Render the SVG skill-node chart (animated)
const NodesChart = () => {
  // Let's give nodes a circular layout for three tiers
  const center = { x: 160, y: 120 };
  const radiusByTier = [80, 50, 25];
  const nodes: { x: number; y: number; tier: number; name: string }[] = [];
  SKILL_TIERS.forEach((tier, t) => {
    const r = radiusByTier[t];
    tier.skills.forEach((skill, i) => {
      const angle = (Math.PI * 2 * i) / tier.skills.length - Math.PI/2;
      nodes.push({
        tier: t,
        name: skill.name,
        x: center.x + Math.cos(angle) * r,
        y: center.y + Math.sin(angle) * r,
      });
    });
  });
  // Draw lines from center to outer nodes
  return (
    <svg
      width={320}
      height={240}
      className="mx-auto mb-8 block animate-fade-in"
      style={{ minWidth: 220 }}
    >
      {/* Glow */}
      <defs>
        <radialGradient id="skillGlow" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#111217" stopOpacity="0.0" />
        </radialGradient>
      </defs>
      <circle
        cx={center.x}
        cy={center.y}
        r={90}
        fill="url(#skillGlow)"
        className="transition-all"
      />
      {/* Interconnect nodes with lines */}
      {nodes.map((n, idx) => (
        <line
          key={n.name}
          x1={center.x} y1={center.y}
          x2={n.x} y2={n.y}
          stroke="#1e90ff"
          strokeWidth={0.8 + 0.6 * (2 - n.tier)}
          opacity="0.23"
        />
      ))}
      {/* Nodes */}
      {nodes.map((n, idx) => (
        <circle
          key={n.name}
          cx={n.x}
          cy={n.y}
          r={10 + 3 * (2 - n.tier)}
          fill={["#3b82f6", "#60a5fa", "#bae6fd"][n.tier]}
          opacity="0.82"
          className="hover:scale-110 hover:drop-shadow-lg transition-transform"
        >
          <animate
            attributeName="r"
            values={`${
              10 + 3 * (2 - n.tier)
            };${13 + 2 * (2 - n.tier)};${10 + 3 * (2 - n.tier)}`}
            dur={`${1.6 + 0.4 * n.tier}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
      {/* Node labels */}
      {nodes.map((n, idx) => (
        <text
          key={n.name + '_label'}
          x={n.x}
          y={n.y + 24}
          textAnchor="middle"
          fill="#eee"
          fontSize={10.5 + 1.2 * (2 - n.tier)}
        >
          {n.name}
        </text>
      ))}
    </svg>
  );
};

const TierBlock: React.FC<{
  tier: string;
  color: string;
  skills: Skill[];
}> = ({ tier, color, skills }) => (
  <div className="w-full md:w-1/3 flex flex-col px-4">
    <div className={`mb-6 text-xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
      {tier}
    </div>
    {skills.map((skill) => (
      <Tooltip key={skill.name}>
        <TooltipTrigger asChild>
          <div className="flex items-center mb-4 group cursor-pointer">
            {skill.icon ? (
              <span className="mr-2">{skill.icon}</span>
            ) : (
              <Info className="text-blue-400 mr-2" size={18} />
            )}
            <div className="flex-1">
              <div className="flex items-center">
                <span className="font-semibold text-white">{skill.name}</span>
              </div>
              <Progress
                value={skill.level}
                className="h-2 my-2 shadow-sm bg-blue-900/60"
                indicatorClassName="bg-gradient-to-r from-blue-400 to-blue-600"
              />
            </div>
            <span
              className="ml-3 text-xs text-sky-200 bg-blue-700/40 rounded-full px-2 py-0.5"
              style={{ letterSpacing: 0.5 }}
            >
              {skill.level}%
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs bg-blue-900/95 text-gray-100 border-blue-500 shadow-lg">
          <span className="font-medium">{skill.name}:</span>{" "}
          <span className="text-sky-300">{skill.details}</span>
        </TooltipContent>
      </Tooltip>
    ))}
  </div>
);

const SkillsSection: React.FC = () => {
  return (
    <section
      id="skills"
      className="min-h-[80vh] flex flex-col justify-center py-16 lg:py-28 w-full bg-gradient-to-tr from-background to-blue-950/60 relative isolate"
    >
      {/* Section title */}
      <h2 className="text-4xl font-bold text-center mb-2 text-gradient">
        Skills &amp; Tech
      </h2>
      <p className="text-center text-gray-300 mb-8">
        Explore key technologies and proficiencies powering our platform.
      </p>
      {/* Interconnected Nodes SVG */}
      <div className="max-w-lg mx-auto mb-8">
        <NodesChart />
      </div>
      {/* Tiers: Expert / Proficient / Familiar */}
      <div className="flex flex-col md:flex-row justify-center gap-8 w-full max-w-5xl mx-auto">
        {SKILL_TIERS.map((tier) => (
          <TierBlock {...tier} key={tier.tier} />
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
