import { IconType } from "react-icons";
import { 
  FaJava, 
  FaGitAlt, 
  FaDocker, 
  FaAws, 
  FaNetworkWired, 
  FaCode, 
  FaRobot, 
  FaRocket
} from "react-icons/fa6";
import { FaCocktail } from "react-icons/fa";
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
      { name: "GitHub Copilot", icon: FaRobot },
      { name: "Antigravity", icon: FaRocket },
      { name: "Codex", icon: FaCode },
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
    title: "The Java Spark",
    description: "Started with C in college, but finding Java is what really got me excited about programming. I focused deeply on Java fundamentals, OOP, and solved 130+ DSA problems on LeetCode.",
  },
  {
    period: "Mar 2025 - Aug 2025",
    title: "Building APIs & Backend",
    description: "Built a <strong class=\"text-gray-200 font-medium\">Student Management System</strong> to practice OOP and database design. Progressed to Spring Boot by building <strong class=\"text-gray-200 font-medium\">SpringMart</strong> (e-commerce API) and <strong class=\"text-gray-200 font-medium\">wrkout</strong>, focusing on REST APIs and writing tests.",
  },
  {
    period: "Aug 2025",
    title: "CSE Graduation",
    description: "Completed my B.Tech in Computer Science and Engineering with an 8.3 CGPA. While college taught me the theory, I built my backend skills by studying on my own and working on projects.",
  },
  {
    period: "Sep 2025 - Nov 2025",
    title: "Systems & Infrastructure",
    description: "Developed <strong class=\"text-gray-200 font-medium\">WealthWise</strong>, <strong class=\"text-gray-200 font-medium\">J-Void</strong>, and <strong class=\"text-gray-200 font-medium\">Shreyan's Arc</strong>. Outside of project work, I began studying system design, caching, distributed systems, deployment workflows, and cloud infrastructure.",
  },
  {
    period: "Mar 2026 - Present",
    title: "Refining the Stack",
    description: "Built this portfolio to showcase my work. Brushed up on the entire backend stack (from Java foundations to distributed systems) and CS fundamentals like OOP, OS, DBMS, and CN. Currently solving LeetCode problems using <strong class=\"text-gray-200 font-medium\">Shreyan's Arc</strong> and <strong class=\"text-gray-200 font-medium\">J-Void</strong> app while preparing for remote backend roles.",
  },
];