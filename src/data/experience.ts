import { IconType } from "react-icons";
import { 
  FaJava, 
  FaGitAlt, 
  FaDocker, 
  FaAws, 
  FaNetworkWired, 
  FaCode
} from "react-icons/fa6";
import { FaCocktail } from "react-icons/fa";
import { AiOutlineOpenAI } from "react-icons/ai";
import { TbBrandGithubCopilot } from "react-icons/tb";
import {
  SiSpringboot,
  SiHibernate,
  SiMysql,
  SiJunit5,
  SiH2Database,
  SiPostman,
  SiSupabase,
  SiFirebase,
  SiVercel,
  SiNetlify,
  SiRedis,
  SiApachekafka,
  SiRabbitmq,
  SiKubernetes,
  SiGithubactions,
} from "react-icons/si";

export interface TechItem {
  name: string;
  icon?: IconType;
  iconSrc?: string;
  isCore?: boolean;
}

export interface TechCategory {
  label: string;
  items: TechItem[];
}

export interface TimelineEntry {
  period: string;
  description: string;
}

export const techCategories: TechCategory[] = [
  {
    label: "Core Stack",
    items: [
      { name: "Java", icon: FaJava },
      { name: "Spring Boot", icon: SiSpringboot },
      { name: "Hibernate", icon: SiHibernate },
      { name: "Docker", icon: FaDocker },
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
      { name: "Git", icon: FaGitAlt },
      { name: "Postman", icon: SiPostman },
      { name: "Supabase", icon: SiSupabase },
      { name: "Firebase", icon: SiFirebase },
      { name: "Vercel", icon: SiVercel },
      { name: "Netlify", icon: SiNetlify },
      { name: "GitHub Copilot", icon: TbBrandGithubCopilot },
      { name: "Antigravity", iconSrc: "/antigravity-icon.svg" },
      { name: "Codex", icon: AiOutlineOpenAI },
    ],
  },
  {
    label: "Systems & DevOps Concepts",
    items: [
      { name: "System Design", icon: FaNetworkWired },
      { name: "Redis", icon: SiRedis },
      { name: "Kafka", icon: SiApachekafka },
      { name: "RabbitMQ", icon: SiRabbitmq },
      { name: "Kubernetes", icon: SiKubernetes },
      { name: "GitHub Actions", icon: SiGithubactions },
      { name: "OpenAPI", icon: FaCode },
      { name: "AWS", icon: FaAws },
    ],
  },
];

export const timeline: TimelineEntry[] = [
  {
    period: "2017",
    description: "Dreamed of pursuing Computer Science and Engineering while in Class 9.",
  },
  {
    period: "2019",
    description: "In Class 11, I took what felt like a major risk back then. In our society, self-study was uncommon, especially at the school level, yet I dropped all of my private tuition classes to save both time and money. From that point onward, I became a self-taught learner.",
  },
  {
    period: "Aug 2021",
    description: "Joined Pailan College of Management & Technology, where I officially began my Computer Science journey. Due to personal circumstances, primarily financial constraints, I was unable to enroll in a better college despite securing a decent rank of ~16,000 in WBJEE (the state engineering entrance exam).",
  },
  {
    period: "Nov 2021 - Jul 2025",
    description: "Carried my self-study mindset through college, rarely attending classes because standard lectures felt too slow and ineffective. In my first year, I studied using YouTube and online documentation. Once ChatGPT came out, I transitioned entirely to using AI for my coursework and side projects. This cut my study time by half, allowing me to consistently complete the syllabus in 50% less time from the 3rd to the 8th semester. At one point, I didn't even know who our principal was and accidentally asked the principal himself if he was present, which we both had a good laugh about.",
  },
  {
    period: "Mar 2022 - Nov 2024",
    description: "Started learning C in the college lab, then focused on building a solid foundation in Java and object-oriented programming. Completed the <a href=\"#certificate-alpha\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">Alpha Course (DSA with Java)</a> and solved 130+ data structures and algorithms questions on LeetCode.",
  },
  {
    period: "Mar 2025 - Aug 2025",
    description: "Moved from learning concepts to building backend systems. Designed database schemas, built REST APIs, and developed <a href=\"#project-student-management-system\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">Student Management System</a>, <a href=\"#project-wrkout\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">wrkout</a> (which I built to track my own habits and lost 30 kg), and <a href=\"#project-springmart\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">SpringMart</a>.",
  },
  {
    period: "Jul 2025",
    description: "Graduated with a B.Tech in Computer Science and Engineering (8.3 CGPA). Continued teaching myself backend development, system design, and database management.",
  },
  {
    period: "Sep 2025 - Nov 2025",
    description: "Built and deployed <a href=\"#project-wealthwise\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">WealthWise</a>, <a href=\"#project-j-void\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">J-Void</a>, and <a href=\"#project-shreyans-arc\" class=\"text-gray-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-white/20 hover:decoration-emerald-400 underline-offset-4 font-normal\">Shreyan's Arc</a> to automate coding practice and daily workflows. Also studied caching, distributed systems, and deployment.",
  },
  {
    period: "Dec 2025 - Jun 2026",
    description: "Focused on reviewing computer science fundamentals and backend topics, including system design, while preparing for backend engineering roles.",
  },
  {
    period: "Jul 2026 - Present",
    description: "Started learning Python from the basics to advanced concepts, with plans to learn FastAPI next to expand my backend stack as I prepare for my first backend engineering role.",
  },
];
