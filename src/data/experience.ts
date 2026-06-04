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
    label: "Concepts & Familiarities",
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
    description: "Built a <strong class=\"text-gray-200 font-medium\">Student Management System</strong> to apply core database concepts and OOP principles to a real project.",
  },
  {
    period: "Apr 2025 - Aug 2025",
    title: "Spring Boot & APIs",
    description: "Learned Spring Boot while building <strong class=\"text-gray-200 font-medium\">SpringMart</strong>. Focused on API structure while also exploring Redis caching and automated testing fundamentals. Also built <strong class=\"text-gray-200 font-medium\">wrkout</strong> during this phase.",
  },
  {
    period: "Aug 2025",
    title: "Graduated",
    description: "Completed a B.Tech in Computer Science and Engineering with an 8.3 CGPA. Most practical development skills were built through self-learning and hands-on projects outside the classroom.",
  },
  {
    period: "Sep 2025 - Nov 2025",
    title: "Exploring Infrastructure",
    description: "Built <strong class=\"text-gray-200 font-medium\">WealthWise</strong>, <strong class=\"text-gray-200 font-medium\">J-Void</strong>, and <strong class=\"text-gray-200 font-medium\">Shreyan's Arc</strong>. Alongside these projects, started learning system design, distributed systems, deployment workflows, and infrastructure concepts.",
  },
  {
    period: "Mar 2026",
    title: "Revisiting Core CS Subjects",
    description: "Revisited core CS subjects: OS, DBMS, CN, and OOP to strengthen my fundamentals.",
  },
  {
    period: "Mar 2026",
    title: "Built This Portfolio",
    description: "Built this portfolio to showcase projects, skills, and current direction as a backend developer.",
  },
  {
    period: "May 2026",
    title: "Present Focus",
    description: "Currently following the DSA roadmap from my own app, <strong class=\"text-gray-200 font-medium\">Shreyan's Arc</strong>, while continuing to strengthen backend fundamentals. Focused on improving both problem-solving and development skills for larger real-world projects and remote backend roles.",
  },
  {
    period: "May 2026 - June 2026",
    title: "Java Projects Revisited",
    description: "Revisited and reviewed <strong class=\"text-gray-200 font-medium\">Student Management System</strong> and <strong class=\"text-gray-200 font-medium\">SpringMart</strong> from start to finish.",
  },
];