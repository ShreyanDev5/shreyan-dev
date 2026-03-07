export interface TechCategory {
  label: string;
  items: string[];
}

export interface TimelineEntry {
  period: string;
  title: string;
  description: string;
}

export const techCategories: TechCategory[] = [
  {
    label: "Backend Foundations",
    items: ["Java", "Spring Boot", "MySQL", "JDBC / JPA", "REST APIs"],
  },
  {
    label: "Quality & API Design",
    items: ["JUnit 5", "Testcontainers", "DTOs", "OpenAPI", "JSON / XML"],
  },
  {
    label: "Systems & Platform",
    items: ["Redis", "Docker", "GitHub Actions", "Kubernetes", "AWS / Terraform"],
  },
];

export const timeline: TimelineEntry[] = [
  {
    period: "Mar 2022",
    title: "Started Programming in College",
    description: "Began with C and built the problem-solving habits that pushed me deeper into software development.",
  },
  {
    period: "Nov 2024",
    title: "Committed to Java and Consistent DSA Practice",
    description: "Focused seriously on core Java and earned a 50-day LeetCode badge through steady problem-solving practice.",
  },
  {
    period: "Mar 2025 - Apr 2025",
    title: "Built My Backend Foundation",
    description: "Built a strong base in SQL, MySQL, JDBC, JPA, Maven, JSON/XML, and testing while developing the Student Management System.",
  },
  {
    period: "Apr 2025 - Aug 2025",
    title: "Expanded into Spring, APIs, and Quality Engineering",
    description: "Moved into Spring Core, Spring Boot, DTO-based API design, OpenAPI documentation, caching with Redis, and stronger testing with JUnit 5 and Testcontainers while shipping projects like wrkout and SpringMart.",
  },
  {
    period: "Sep 2025 - Nov 2025",
    title: "Deepened Systems and Platform Knowledge",
    description: "Studied architecture patterns, scaling, distributed systems, Docker, CI/CD, Kubernetes, messaging, observability, and cloud fundamentals while continuing to ship product-focused work including WealthWise, J-Void, and Shreyan's Arc.",
  },
  {
    period: "Mar 2026",
    title: "Launched My Portfolio",
    description: "Brought together selected projects, skills, and growth into a focused portfolio for product engineering opportunities.",
  },
];