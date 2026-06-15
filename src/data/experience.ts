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
    title: "The Java Spark",
    description: "Started with C in college, but discovering Java sparked my passion for programming. I focused deeply on Java fundamentals and OOP, and solved 130+ DSA problems on LeetCode.",
  },
  {
    period: "Mar 2025 - Aug 2025",
    title: "Building APIs & Backend",
    description: "Built a <em class=\"text-gray-200/90 italic font-normal\">Student Management System</em> to practice OOP and database design. I then progressed to Spring Boot with <em class=\"text-gray-200/90 italic font-normal\">SpringMart</em>, focusing on REST APIs and small tests, while also building <em class=\"text-gray-200/90 italic font-normal\">wrkout</em>.",
  },
  {
    period: "Aug 2025",
    title: "CSE Graduation",
    description: "Completed my B.Tech in Computer Science and Engineering with an 8.3 CGPA. While college taught me the theory, I developed my backend skills through independent study and projects.",
  },
  {
    period: "Sep 2025 - Nov 2025",
    title: "Systems & Infrastructure",
    description: "Developed <em class=\"text-gray-200/90 italic font-normal\">WealthWise</em>, <em class=\"text-gray-200/90 italic font-normal\">J-Void</em>, and <em class=\"text-gray-200/90 italic font-normal\">Shreyan's Arc</em>. Alongside project work, I began studying system design, caching, distributed systems, deployment workflows, and cloud infrastructure.",
  },
  {
    period: "Mar 2026 - Present",
    title: "Refining the Stack",
    description: "Built this portfolio to showcase my work while revisiting the backend stack, from Java foundations to distributed systems, alongside CS fundamentals (OOP, OS, DBMS, CN). Currently practicing LeetCode using <em class=\"text-gray-200/90 italic font-normal\">Shreyan's Arc</em> and <em class=\"text-gray-200/90 italic font-normal\">J-Void</em> while preparing for remote roles.",
  },
];
