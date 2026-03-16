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
    items: ["JUnit 5", "Postman", "DTOs", "JSON / XML"],
  },
  {
    label: "DevOps & Infrastructure",
    items: ["Redis", "Docker", "Maven", "Git", "Lombok"],
  },
  {
    label: "Conceptual Knowledge",
    items: [
      "System Design",
      "Swagger / OpenAPI",
      "Testcontainers",
      "RabbitMQ / Kafka",
      "CI/CD Pipelines",
      "Kubernetes",
      "AWS / Terraform",
      "Observability & Monitoring",
    ],
  },
];

export const timeline: TimelineEntry[] = [
  {
    period: "Mar 2022",
    title: "Started Coding in College",
    description: "I began with C and slowly got hooked on problem-solving and software development.",
  },
  {
    period: "Nov 2024",
    title: "Took Java Seriously and Practiced DSA Daily",
    description: "I focused on core Java and solved problems every day, earning a 50-day LeetCode badge.",
  },
  {
    period: "Mar 2025 - Apr 2025",
    title: "Built a Strong Backend Foundation",
    description: "I strengthened SQL, MySQL, JDBC, JPA, Maven, JSON/XML, and testing while building the Student Management System.",
  },
  {
    period: "Apr 2025 - Aug 2025",
    title: "Went Deeper into Spring, APIs, and Testing",
    description: "I learned Spring Core and Spring Boot, built DTO-based APIs, and practiced Postman, Redis caching, JUnit 5, and Testcontainers while shipping wrkout and SpringMart.",
  },
  {
    period: "Aug 2025",
    title: "Graduated with an 8.3 Academic Score",
    description: "I completed my graduation with an 8.3 score.",
  },
  {
    period: "Sep 2025 - Nov 2025",
    title: "Started Exploring Systems and Platform Thinking",
    description: "I explored architecture, distributed systems, Docker, CI/CD, Kubernetes, and cloud fundamentals while shipping WealthWise, J-Void, and Shreyan's Arc.",
  },
  {
    period: "Mar 2026",
    title: "Revised Core CS Subjects",
    description: "I revised Operating Systems, DBMS, Computer Networks, and OOP to strengthen my interview and fundamentals prep.",
  },
  {
    period: "Mar 2026",
    title: "Built and Launched This Portfolio",
    description: "I put this portfolio together to honestly show what I have built, what I know, and where I am heading.",
  },
];