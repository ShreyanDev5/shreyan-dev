import { IconType } from "react-icons";
import { FaJava } from "react-icons/fa6";
import { SiSpringboot, SiHibernate, SiMysql, SiDocker, SiJunit5 } from "react-icons/si";

export interface TechItem {
  name: string;
  icon?: IconType;
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
    label: "Core Backend",
    items: [
      { name: "Java", icon: FaJava },
      { name: "Spring Boot", icon: SiSpringboot },
      { name: "Hibernate / JPA", icon: SiHibernate },
    ],
  },
  {
    label: "Data & Infrastructure",
    items: [
      { name: "MySQL", icon: SiMysql },
      { name: "Docker", icon: SiDocker },
      { name: "JUnit 5", icon: SiJunit5 },
    ],
  },
  {
    label: "Familiar With",
    items: [
      { name: "System Design Fundamentals" },
      { name: "Redis" },
      { name: "Kafka" },
      { name: "Kubernetes" },
      { name: "GitHub Actions" },
      { name: "OpenAPI" },
      { name: "AWS" },
    ],
  },
];

export const timeline: TimelineEntry[] = [
  {
    period: "Mar 2022",
    title: "Started Coding",
    description: "Started with C in college. Something clicked immediately when I realized the sheer power of writing code and what we can build with it.",
  },
  {
    period: "Nov 2024",
    title: "Java & LeetCode",
    description: "I felt a natural connection to Java right from the start. I locked in on the core fundamentals, finished a course, and solved 130+ problems on LeetCode.",
  },
  {
    period: "Mar 2025 - Apr 2025",
    title: "Backend Foundations",
    description: "Built a Student Management System to apply what I was learning. Connecting Java to a database and structuring the architecture is what made backend fundamentals finally click.",
  },
  {
    period: "Apr 2025 - Aug 2025",
    title: "Spring Boot & APIs",
    description: "Dove deep into Spring Boot while building 'wrkout' and 'SpringMart'. Moving past basic CRUD, I learned how to structure proper APIs and started grasping the fundamentals of Redis caching and automated testing.",
  },
  {
    period: "Aug 2025",
    title: "Graduated",
    description: "Finished my B.Tech in Computer Science and Engineering with an 8.3 CGPA. I relied entirely on self-teaching rather than college lectures to build my actual skills.",
  },
  {
    period: "Sep 2025 - Nov 2025",
    title: "Exploring Infrastructure",
    description: "Shipped 'WealthWise', 'J-Void', and 'Shreyan's Arc'. Alongside building these, I began shifting my focus to the bigger picture\u2014studying the basics of system design, distributed architectures, and how deployment pipelines actually work.",
  },
  {
    period: "Mar 2026",
    title: "Revisiting Core CS Subjects",
    description: "Revisited the core CS subjects (Operating Systems, DBMS, Computer Networks, and OOP) to solidify my base and ensure I actually understood the fundamentals.",
  },
  {
    period: "Mar 2026",
    title: "Built This Portfolio",
    description: "Put this portfolio together to clearly show what I have built, what I know, and where I want to go next.",
  },
  {
    period: "May 2026",
    title: "Present Focus",
    description: "Currently executing the DSA roadmap from my own app, Shreyan's Arc. While I strongly prefer building systems and learning new tech over grinding DSA, I am doing the required work while taking a final deep dive into backend fundamentals.",
  },
];