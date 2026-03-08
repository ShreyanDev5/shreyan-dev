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
    label: "Backend Core",
    items: ["Java", "Spring Boot", "MySQL", "JDBC / JPA", "REST APIs"],
  },
  {
    label: "Quality & APIs",
    items: ["JUnit 5", "Testcontainers", "Postman", "DTOs", "OpenAPI", "JSON / XML"],
  },
  {
    label: "Systems Growth",
    items: ["Redis", "Docker", "GitHub Actions", "CI/CD Pipelines", "Kubernetes", "AWS / Terraform"],
  },
];

export const timeline: TimelineEntry[] = [
  {
    period: "Mar 2022",
    title: "Started Programming in College",
    description: "Started with C and built the problem-solving habits that pulled me deeper into software development.",
  },
  {
    period: "Nov 2024",
    title: "Committed to Java and Consistent DSA Practice",
    description: "Committed to core Java and earned a 50-day LeetCode badge through consistent problem-solving practice.",
  },
  {
    period: "Mar 2025 - Apr 2025",
    title: "Built My Backend Foundation",
    description: "Built a solid base in SQL, MySQL, JDBC, JPA, Maven, JSON/XML, and testing while developing the Student Management System.",
  },
  {
    period: "Apr 2025 - Aug 2025",
    title: "Expanded into Spring, APIs, and Quality Engineering",
    description: "Expanded into Spring Core, Spring Boot, DTO-based APIs, OpenAPI, Postman-based API testing, Redis caching, and stronger testing with JUnit 5 and Testcontainers while shipping wrkout and SpringMart.",
  },
  {
    period: "Sep 2025 - Nov 2025",
    title: "Deepened Systems and Platform Knowledge",
    description: "Studied architecture, scaling, distributed systems, Docker, CI/CD, Kubernetes, messaging, observability, and cloud fundamentals while shipping work including WealthWise, J-Void, and Shreyan's Arc.",
  },
  {
    period: "Mar 2026",
    title: "Launched My Portfolio",
    description: "Brought together selected projects, skills, and growth into a focused portfolio for product engineering roles.",
  },
];