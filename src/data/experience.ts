import { IconType } from "react-icons";
import { FaJava } from "react-icons/fa6";
import { FaCocktail } from "react-icons/fa";
import {
  SiSpringboot,
  SiHibernate,
  SiMysql,
  SiJunit5,
  SiH2Database,
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
    label: "Languages & Frameworks",
    items: [
      { name: "Java", icon: FaJava },
      { name: "Spring Boot", icon: SiSpringboot },
      { name: "Hibernate (JPA)", icon: SiHibernate },
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
      { name: "Git" },
      { name: "Docker" },
      { name: "Postman" },
      { name: "IntelliJ IDEA" },
      { name: "Warp" },
      { name: "GitHub Copilot" },
      { name: "Antigravity" },
      { name: "Codex" },
    ],
  },
  {
    label: "Systems & DevOps Concepts",
    items: [
      { name: "System Design" },
      { name: "Redis" },
      { name: "Kafka" },
      { name: "RabbitMQ" },
      { name: "Kubernetes" },
      { name: "GitHub Actions" },
      { name: "OpenAPI" },
      { name: "AWS" },
    ],
  },
];

export const timeline: TimelineEntry[] = [
  {
    period: "Mar 2022 - Nov 2024",
    title: "Started Coding & Java Foundations",
    description: "Started with C in college, realizing early on the power of software systems. Later focused deeply on Java fundamentals, OOP, and solved 130+ DSA problems on LeetCode.",
  },
  {
    period: "Mar 2025 - Aug 2025",
    title: "Backend Development & APIs",
    description: "Built a <strong class=\"text-gray-200 font-medium\">Student Management System</strong> to apply core OOP and database principles. Progressed to Spring Boot by building <strong class=\"text-gray-200 font-medium\">SpringMart</strong> (e-commerce API) and <strong class=\"text-gray-200 font-medium\">wrkout</strong>, focusing on REST APIs, caching, and automated testing.",
  },
  {
    period: "Aug 2025",
    title: "Graduated B.Tech in CSE",
    description: "Completed a B.Tech in Computer Science and Engineering with an 8.3 CGPA. Built most of my practical development and backend engineering skills through self-directed learning and hands-on projects.",
  },
  {
    period: "Sep 2025 - Nov 2025",
    title: "Advanced Projects & Infrastructure",
    description: "Developed <strong class=\"text-gray-200 font-medium\">WealthWise</strong>, <strong class=\"text-gray-200 font-medium\">J-Void</strong>, and <strong class=\"text-gray-200 font-medium\">Shreyan's Arc</strong>. Expanded my focus to system design, distributed systems, deployment workflows, and cloud infrastructure.",
  },
  {
    period: "Mar 2026 - Present",
    title: "Refinement & Current Focus",
    description: "Built this portfolio to showcase my work. Strengthened core CS fundamentals (OS, DBMS, Computer Networks) and reviewed key projects. Currently polishing problem-solving skills and preparing for remote backend engineering roles.",
  },
];