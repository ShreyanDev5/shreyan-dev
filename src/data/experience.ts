import { IconType } from "react-icons";
import { 
  FaJava, 
  FaGitAlt, 
  FaDocker, 
  FaAws, 
  FaNetworkWired, 
  FaCode
} from "react-icons/fa6";
import { FaCocktail } from "react-icons/fa";
import { AiOutlineOpenAI } from "react-icons/ai";
import { TbBrandGithubCopilot } from "react-icons/tb";
import {
  SiSpringboot,
  SiHibernate,
  SiMysql,
  SiJunit5,
  SiH2Database,
  SiPostman,
  SiSupabase,
  SiFirebase,
  SiVercel,
  SiNetlify,
  SiRedis,
  SiApachekafka,
  SiRabbitmq,
  SiKubernetes,
  SiGithubactions,
} from "react-icons/si";

export interface TechItem {
  name: string;
  icon?: IconType;
  iconSrc?: string;
  isCore?: boolean;
}

export interface TechCategory {
  label: string;
  items: TechItem[];
}

export interface TimelineEntry {
  period: string;
  title: string;
  description: string;
}

export const techCategories: TechCategory[] = [
  {
    label: "Core Stack",
    items: [
      { name: "Java", icon: FaJava },
      { name: "Spring Boot", icon: SiSpringboot },
      { name: "Hibernate", icon: SiHibernate },
      { name: "Docker", icon: FaDocker },
    ],
  },
  {
    label: "Databases & Testing",
    items: [
      { name: "MySQL", icon: SiMysql },
      { name: "H2", icon: SiH2Database },
      { name: "JUnit 5", icon: SiJunit5 },
      { name: "Mockito", icon: FaCocktail },
    ],
  },
  {
    label: "Tools & Productivity",
    items: [
      { name: "Git", icon: FaGitAlt },
      { name: "Postman", icon: SiPostman },
      { name: "Supabase", icon: SiSupabase },
      { name: "Firebase", icon: SiFirebase },
      { name: "Vercel", icon: SiVercel },
      { name: "Netlify", icon: SiNetlify },
      { name: "GitHub Copilot", icon: TbBrandGithubCopilot },
      { name: "Antigravity", iconSrc: "/antigravity-icon.svg" },
      { name: "Codex", icon: AiOutlineOpenAI },
    ],
  },
  {
    label: "Systems & DevOps Concepts",
    items: [
      { name: "System Design", icon: FaNetworkWired },
      { name: "Redis", icon: SiRedis },
      { name: "Kafka", icon: SiApachekafka },
      { name: "RabbitMQ", icon: SiRabbitmq },
      { name: "Kubernetes", icon: SiKubernetes },
      { name: "GitHub Actions", icon: SiGithubactions },
      { name: "OpenAPI", icon: FaCode },
      { name: "AWS", icon: FaAws },
    ],
  },
];

export const timeline: TimelineEntry[] = [
  {
    period: "Mar 2022 - Nov 2024",
    title: "Foundations & Algorithms",
    description: "Learned Java, OOP principles, and solved 130+ DSA questions on LeetCode.",
  },
  {
    period: "Mar 2025 - Aug 2025",
    title: "API Design & Backend",
    description: "Designed database schemas and built APIs. Developed a <a href=\"#project-student-management-system\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">Student Management System</a>, <a href=\"#project-wrkout\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">wrkout</a>, and <a href=\"#project-springmart\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">SpringMart</a>.",
  },
  {
    period: "Aug 2025",
    title: "CS Graduation & Self-Direction",
    description: "Graduated with a B.Tech in CS (8.3 CGPA). Taught myself backend development and system design on the side.",
  },
  {
    period: "Sep 2025 - Nov 2025",
    title: "Systems & Deployment",
    description: "Built and deployed <a href=\"#project-wealthwise\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">WealthWise</a>, <a href=\"#project-j-void\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">J-Void</a>, and <a href=\"#project-shreyans-arc\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">Shreyan's Arc</a>. Studied caching, distributed systems, and deployment.",
  },
  {
    period: "Mar 2026 - Present",
    title: "Stack Refinement",
    description: "Reviewing CS fundamentals, practicing DSA on LeetCode, and preparing for backend engineering roles.",
  },
];
