export interface TechItem {
  name: string;
  iconKey?: TechIconKey;
}

export interface TechCategory {
  label: string;
  items: TechItem[];
}

export type TechIconKey =
  | "openjdk"
  | "springboot"
  | "mysql"
  | "postgresql"
  | "hibernate"
  | "openapi"
  | "junit5"
  | "postman"
  | "code"
  | "json"
  | "redis"
  | "docker"
  | "maven"
  | "git"
  | "lombok"
  | "system-design"
  | "swagger"
  | "testcontainers"
  | "messaging"
  | "cicd"
  | "kubernetes"
  | "cloud"
  | "observability";

export interface TimelineEntry {
  period: string;
  title: string;
  description: string;
}

export const techCategories: TechCategory[] = [
  {
    label: "Backend Core",
    items: [
      { name: "Java", iconKey: "openjdk" },
      { name: "Spring Boot", iconKey: "springboot" },
      { name: "MySQL", iconKey: "mysql" },
      { name: "PostgreSQL", iconKey: "postgresql" },
      { name: "JDBC / JPA", iconKey: "hibernate" },
      { name: "REST APIs", iconKey: "openapi" },
    ],
  },
  {
    label: "Quality & APIs",
    items: [
      { name: "JUnit 5", iconKey: "junit5" },
      { name: "Postman", iconKey: "postman" },
      { name: "DTOs", iconKey: "code" },
      { name: "JSON / XML", iconKey: "json" },
    ],
  },
  {
    label: "DevOps & Infrastructure",
    items: [
      { name: "Redis", iconKey: "redis" },
      { name: "Docker", iconKey: "docker" },
      { name: "Maven", iconKey: "maven" },
      { name: "Git", iconKey: "git" },
      { name: "Lombok", iconKey: "lombok" },
    ],
  },
  {
    label: "Conceptual Knowledge",
    items: [
      { name: "System Design", iconKey: "system-design" },
      { name: "Swagger / OpenAPI", iconKey: "swagger" },
      { name: "Testcontainers", iconKey: "testcontainers" },
      { name: "RabbitMQ / Kafka", iconKey: "messaging" },
      { name: "CI/CD Pipelines", iconKey: "cicd" },
      { name: "Kubernetes", iconKey: "kubernetes" },
      { name: "AWS / Terraform", iconKey: "cloud" },
      { name: "Observability & Monitoring", iconKey: "observability" },
    ],
  },
];

export const timeline: TimelineEntry[] = [
  {
    period: "Mar 2022",
    title: "Started Coding in College",
    description: "I started with C and got pulled into problem-solving and software development.",
  },
  {
    period: "Nov 2024",
    title: "Focused on Java and Daily DSA",
    description: "I doubled down on core Java and solved problems every day, which built real momentum.",
  },
  {
    period: "Mar 2025 - Apr 2025",
    title: "Built a Backend Foundation",
    description: "While building the Student Management System, I strengthened SQL, MySQL, JDBC, JPA, Maven, JSON/XML, and testing.",
  },
  {
    period: "Apr 2025 - Aug 2025",
    title: "Went Deeper into Spring and APIs",
    description: "I learned Spring Core and Spring Boot, built DTO-based APIs, and used Postman, Redis caching, JUnit 5, and Testcontainers while shipping wrkout and SpringMart.",
  },
  {
    period: "Aug 2025",
    title: "Graduated",
    description: "I completed my degree with an 8.3 academic score.",
  },
  {
    period: "Sep 2025 - Nov 2025",
    title: "Started Exploring Systems",
    description: "I explored architecture, distributed systems, Docker, CI/CD, Kubernetes, and cloud fundamentals while shipping WealthWise, J-Void, and Shreyan's Arc.",
  },
  {
    period: "Mar 2026",
    title: "Revisited Core CS Subjects",
    description: "I went back through Operating Systems, DBMS, Computer Networks, and OOP to sharpen my fundamentals.",
  },
  {
    period: "Mar 2026",
    title: "Built This Portfolio",
    description: "I put this portfolio together to show what I've built, what I know, and where I want to go next.",
  },
];