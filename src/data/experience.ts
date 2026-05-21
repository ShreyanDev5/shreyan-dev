import { IconType } from "react-icons";
import { FaJava } from "react-icons/fa6";
import { SiSpringboot, SiHibernate, SiMysql, SiJunit5 } from "react-icons/si";

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
    label: "Backend & Frameworks",
    items: [
      { name: "Java", icon: FaJava },
      { name: "Spring Boot", icon: SiSpringboot },
      { name: "Hibernate (JPA)", icon: SiHibernate },
    ],
  },
  {
    label: "Database & Testing",
    items: [
      { name: "MySQL", icon: SiMysql },
      { name: "JUnit 5", icon: SiJunit5 },
    ],
  },
  {
    label: "Tools",
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
    label: "Familiar With",
    items: [
      { name: "System Design" },
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
    description: "Started with C in college. Realized early how powerful programming can be and the kind of systems that can be built with it.",
  },
  {
    period: "Nov 2024",
    title: "Java & LeetCode",
    description: "Focused deeply on Java fundamentals, completed a full course, and solved 130+ problems on LeetCode.",
  },
  {
    period: "Mar 2025 - Apr 2025",
    title: "Backend Foundations",
    description: "Built a Student Management System to apply backend concepts in practice. This project helped solidify my backend fundamentals.",
  },
  {
    period: "Apr 2025 - Aug 2025",
    title: "Spring Boot & APIs",
    description: "Learned Spring Boot while building \"SpringMart.\" Focused on API structure while also exploring Redis caching and automated testing fundamentals. Also built \"wrkout\" during this phase.",
  },
  {
    period: "Aug 2025",
    title: "Graduated",
    description: "Completed a B.Tech in Computer Science and Engineering with an 8.3 CGPA. Most practical development skills were built through self-learning and hands-on projects outside the classroom.",
  },
  {
    period: "Sep 2025 - Nov 2025",
    title: "Exploring Infrastructure",
    description: "Built \"WealthWise,\" \"J-Void,\" and \"Shreyan's Arc.\" Alongside these projects, started learning system design, distributed systems, deployment workflows, and infrastructure concepts.",
  },
  {
    period: "Mar 2026",
    title: "Revisiting Core CS Subjects",
    description: "Revisited core CS subjects including Operating Systems, DBMS, Computer Networks, and OOP to strengthen foundational understanding.",
  },
  {
    period: "Mar 2026",
    title: "Built This Portfolio",
    description: "Built this portfolio to showcase projects, skills, and current direction as a backend developer.",
  },
  {
    period: "May 2026",
    title: "Present Focus",
    description: "Currently following the DSA roadmap from my own app, \"Shreyan's Arc,\" while continuing to strengthen backend fundamentals. Focused on improving both problem-solving and development skills for larger real-world projects and remote backend roles.",
  },
];