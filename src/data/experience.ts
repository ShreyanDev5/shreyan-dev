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
    label: "Backend & Databases",
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
    label: "DevOps & Infrastructure",
    items: [
      { name: "Git", iconKey: "git" },
      { name: "Maven", iconKey: "maven" },
      { name: "Docker", iconKey: "docker" },
    ],
  },
  {
    label: "Testing & API Tools",
    items: [
      { name: "JUnit 5", iconKey: "junit5" },
      { name: "Postman", iconKey: "postman" },
    ],
  },
  {
    label: "Familiar With",
    items: [
      { name: "Redis", iconKey: "redis" },
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