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
    label: "Backend",
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
    label: "Data & Infra",
    items: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MySQL", icon: SiMysql },
      { name: "Docker", icon: FaDocker },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "Postman", icon: SiPostman },
      { name: "Swagger", icon: SiSwagger },
      { name: "Supabase", icon: SiSupabase },
      { name: "Firebase", icon: SiFirebase },
      { name: "Vercel", icon: SiVercel },
      { name: "Antigravity", iconSrc: "/antigravity-icon.svg" },
      { name: "Cursor", iconSrc: "/cursor-icon.svg" },
    ],
  },
  {
    label: "Foundations",
    items: [
      { name: "System Design", icon: FaNetworkWired },
      { name: "Redis", icon: SiRedis },
      { name: "Kafka", icon: SiApachekafka },
      { name: "RabbitMQ", icon: SiRabbitmq },
      { name: "AWS", icon: FaAws },
      { name: "CI/CD", icon: SiGithubactions },
      { name: "Kubernetes", icon: SiKubernetes },
    ],
  },
];

export const timeline: TimelineEntry[] = [
  {
    period: "Present (In Progress)",
    description: "Exploring how the internet works, from fiber-optic cables to modern software—deep diving into computer science fundamentals and network architecture."
  },
  {
    period: "Jul 2026",
    description: "Learned Python and FastAPI by building <a href=\"#project-fastapi-inventory\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">FastAPI Inventory</a>—with SQLAlchemy, PostgreSQL, and a React frontend."
  },
  {
    period: "Dec 2025 - Jun 2026",
    description: "Revised core CS fundamentals (OOP, OS, DBMS, Computer Networks) and revised my showcase projects."
  },
  {
    period: "Sep 2025 - Nov 2025",
    description: "Built and deployed <a href=\"#project-wealthwise\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">WealthWise</a>, <a href=\"#project-j-void\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">J-Void</a>, and <a href=\"#project-shreyans-arc\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">Shreyan's Arc</a> while learning distributed systems and system design."
  },
  {
    period: "Jul 2025",
    description: "Graduated with a B.Tech in Computer Science (8.3 CGPA), shifting full-time to backend engineering."
  },
  {
    period: "Mar 2025 - Aug 2025",
    description: "Shifted from theory to building real apps—built <a href=\"#project-student-management-system\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">Student Management System</a>, <a href=\"#project-wrkout\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">wrkout</a> (tracked workouts to lose 30 kg (66 lbs)), and <a href=\"#project-springmart\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">SpringMart</a> with Spring Boot and Docker."
  },
  {
    period: "Mar 2022 - Nov 2024",
    description: "Wrote my first lines of code in C using Turbo C++ in a college lab (March 2022). Moved to Java and OOP, completed the <a href=\"#certificate-alpha\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">Alpha Course (DSA with Java)</a>, and solved 130+ problems on LeetCode."
  },
  {
    period: "Nov 2021 - Jul 2025",
    description: "Taught myself throughout college. Used the 80/20 rule to cut exam prep time by &gt;50% while keeping an 8.3 CGPA, using the extra time to build projects and learn software engineering."
  },
  {
    period: "Aug 2021",
    description: "Joined Pailan College of Management & Technology for B.Tech in Computer Science (chose a local college due to financial constraints)."
  },
  {
    period: "2019",
    description: "Quit private tuitions in 11th grade to study independently using YouTube and books."
  },
  {
    period: "2017",
    description: "Learned about Computer Science in 9th grade and decided to pursue it in college."
  }
];
