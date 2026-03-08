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
    description: "Picked up C first and built the problem-solving habits that pulled me deeper into software.",
  },
  {
    period: "Nov 2024",
    title: "Committed to Java and Consistent DSA Practice",
    description: "Locked in on core Java and earned a 50-day LeetCode badge through daily problem-solving.",
  },
  {
    period: "Mar 2025 - Apr 2025",
    title: "Built My Backend Foundation",
    description: "Developed a solid base in SQL, MySQL, JDBC, JPA, Maven, JSON/XML, and testing through the Student Management System.",
  },
  {
    period: "Apr 2025 - Aug 2025",
    title: "Expanded into Spring, APIs, and Quality Engineering",
    description: "Picked up Spring Core, Spring Boot, DTO-based APIs, OpenAPI, Postman, Redis caching, JUnit 5, and Testcontainers while shipping wrkout and SpringMart.",
  },
  {
    period: "Sep 2025 - Nov 2025",
    title: "Explored Systems and Platform Engineering",
    description: "Dug into architecture, distributed systems, Docker, CI/CD, Kubernetes, and cloud fundamentals while shipping WealthWise, J-Void, and Shreyan's Arc.",
  },
  {
    period: "Mar 2026",
    title: "Launched My Portfolio",
    description: "Put together this portfolio to show my projects, skills, and trajectory.",
  },
];