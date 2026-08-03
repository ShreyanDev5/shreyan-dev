import { IconType } from "react-icons";
import { 
  FaJava, 
  FaDocker, 
  FaAws, 
  FaNetworkWired
} from "react-icons/fa6";
import {
  SiSpringboot,
  SiHibernate,
  SiMysql,
  SiPostman,
  SiSupabase,
  SiFirebase,
  SiVercel,
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
  badge?: string;
  subtitle?: string;
  items: TechItem[];
}

export interface TimelineEntry {
  period: string;
  description: string;
}

export const techCategories: TechCategory[] = [
  {
    label: "Languages & Frameworks",
    items: [
      { name: "Java", icon: FaJava },
      { name: "Spring Boot", icon: SiSpringboot },
      { name: "Hibernate", icon: SiHibernate },
      { name: "Python", icon: SiPython },
      { name: "FastAPI", icon: SiFastapi },
      { name: "SQLAlchemy", icon: SiSqlalchemy },
      { name: "Pydantic", icon: SiPydantic },
    ],
  },
  {
    label: "Databases",
    items: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MySQL", icon: SiMysql },
    ],
  },
  {
    label: "Distributed Systems (Foundational)",
    items: [
      { name: "System Design", icon: FaNetworkWired },
      { name: "Redis", icon: SiRedis },
      { name: "Kafka", icon: SiApachekafka },
      { name: "RabbitMQ", icon: SiRabbitmq },
      { name: "Kubernetes", icon: SiKubernetes },
      { name: "CI/CD", icon: SiGithubactions },
      { name: "AWS", icon: FaAws },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "Postman", icon: SiPostman },
      { name: "Docker", icon: FaDocker },
      { name: "Swagger", icon: SiSwagger },
      { name: "Supabase", icon: SiSupabase },
      { name: "Firebase", icon: SiFirebase },
      { name: "Vercel", icon: SiVercel },
      { name: "Antigravity", iconSrc: "/antigravity-icon.svg" },
      { name: "Cursor", iconSrc: "/cursor-icon.svg" },
    ],
  },
];

export const timeline: TimelineEntry[] = [
  {
    "period": "Jul 2026 - Present",
    "description": "Expanded backend stack with Python and FastAPI, building <a href=\"#project-fastapi-inventory\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">FastAPI Inventory</a>—a full-stack system with SQLAlchemy, PostgreSQL database, and a React frontend."
  },
  {
    "period": "Dec 2025 - Jun 2026",
    "description": "Deepened CS fundamentals, database operations, and core backend concepts."
  },
  {
    "period": "Sep 2025 - Nov 2025",
    "description": "Built and deployed <a href=\"#project-wealthwise\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">WealthWise</a>, <a href=\"#project-j-void\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">J-Void</a>, and <a href=\"#project-shreyans-arc\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">Shreyan's Arc</a> while studying system design and distributed systems concepts."
  },
  {
    "period": "Jul 2025",
    "description": "Graduated with a B.Tech in Computer Science (8.3 CGPA), continuing to focus on backend engineering and system design."
  },
  {
    "period": "Mar 2025 - Aug 2025",
    "description": "Shifted from theory to backend engineering—designing schemas, building REST APIs, and developing <a href=\"#project-student-management-system\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">Student Management System</a>, <a href=\"#project-wrkout\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">wrkout</a>, and <a href=\"#project-springmart\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">SpringMart</a>."
  },
  {
    "period": "Mar 2022 - Nov 2024",
    "description": "Wrote my very first lines of code in C using Turbo C++ during a college lab in March 2022. Went on to learn Java and OOP, completed the <a href=\"#certificate-alpha\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">Alpha Course (DSA with Java)</a>, and solved 130+ problems on LeetCode."
  },
  {
    "period": "Nov 2021 - Jul 2025",
    "description": "Maintained a self-study mindset through college. Applied the 80/20 principle to cut exam prep time by >50% while keeping an 8.3 CGPA, using the saved hours to learn CS fundamentals, build projects, and explore new tools and system design."
  },
  {
    "period": "Aug 2021",
    "description": "Joined Pailan College of Management & Technology for B.Tech in Computer Science (chose a local college due to financial constraints)."
  },
  {
    "period": "2019",
    "description": "Left private tuitions in 11th grade to study independently, starting my self-taught path."
  },
  {
    "period": "2017",
    "description": "Discovered programming in 9th grade and set a clear goal to build a career in Computer Science."
  }
];
