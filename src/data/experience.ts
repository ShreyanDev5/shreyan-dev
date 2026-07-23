import { IconType } from "react-icons";
import { 
  FaJava, 
  FaGitAlt, 
  FaDocker, 
  FaAws, 
  FaNetworkWired
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
  SiPython,
  SiFastapi,
  SiPostgresql,
  SiSqlalchemy,
  SiPydantic,
  SiSwagger,
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
  description: string;
}

export const techCategories: TechCategory[] = [
  {
    label: "Core Stack",
    items: [
      { name: "Java", icon: FaJava },
      { name: "Spring Boot", icon: SiSpringboot },
      { name: "Hibernate", icon: SiHibernate },
      { name: "Python", icon: SiPython },
      { name: "FastAPI", icon: SiFastapi },
      { name: "SQLAlchemy", icon: SiSqlalchemy },
      { name: "Pydantic", icon: SiPydantic },
      { name: "Docker", icon: FaDocker },
    ],
  },
  {
    label: "Databases & Testing",
    items: [
      { name: "PostgreSQL", icon: SiPostgresql },
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
      { name: "OpenAPI / Swagger", icon: SiSwagger },
      { name: "AWS", icon: FaAws },
    ],
  },
];

export const timeline: TimelineEntry[] = [
  {
    "period": "2017",
    "description": "Decided to pursue Computer Science in 9th grade."
  },
  {
    "period": "2019",
    "description": "Left private tuitions in 11th grade to study independently, starting my self-taught path."
  },
  {
    "period": "Aug 2021",
    "description": "Joined Pailan College of Management & Technology for B.Tech in Computer Science. Despite qualifying for a higher-ranked college (~16,000 WBJEE rank), chose it due to financial constraints."
  },
  {
    "period": "Nov 2021 - Jul 2025",
    "description": "Carried a self-study mindset through college, learning via docs, YouTube, and AI tools. Applied the 80/20 principle to cut study time in half and spent the saved time building software."
  },
  {
    "period": "Mar 2022 - Nov 2024",
    "description": "Learned C, Java, and OOP. Completed the <a href=\"#certificate-alpha\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">Alpha Course (DSA with Java)</a> and solved 130+ problems on LeetCode."
  },
  {
    "period": "Mar 2025 - Aug 2025",
    "description": "Shifted from theory to backend engineering—designing schemas, building REST APIs, and developing <a href=\"#project-student-management-system\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">Student Management System</a>, <a href=\"#project-wrkout\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">wrkout</a>, and <a href=\"#project-springmart\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">SpringMart</a>."
  },
  {
    "period": "Jul 2025",
    "description": "Graduated with a B.Tech in Computer Science (8.3 CGPA), continuing to focus on backend engineering and system design."
  },
  {
    "period": "Sep 2025 - Nov 2025",
    "description": "Built and deployed <a href=\"#project-wealthwise\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">WealthWise</a>, <a href=\"#project-j-void\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">J-Void</a>, and <a href=\"#project-shreyans-arc\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">Shreyan's Arc</a> while studying caching and system design concepts."
  },
  {
    "period": "Dec 2025 - Jun 2026",
    "description": "Deepened CS fundamentals, database operations, and backend concepts for software engineering roles."
  },
  {
    "period": "Jul 2026 - Present",
    "description": "Expanded backend stack with Python and FastAPI, building <a href=\"#project-fastapi-inventory\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">FastAPI Inventory</a>—a full-stack system with SQLAlchemy, PostgreSQL database, and a React frontend."
  }
];
