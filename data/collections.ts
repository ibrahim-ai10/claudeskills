import { Collection } from "@/types/collection";

export const collections: Collection[] = [
  {
    id: "writing-content",
    title: "Writing & Content",
    description:
      "Master the art of written communication. From polished emails and optimized resumes to full content strategies and SEO-ready articles — these skills transform your writing into results.",
    coverImage: "✍️",
    skills: [
      "email-writer",
      "resume-optimizer",
      "content-strategist",
      "seo-optimizer",
      "api-doc-writer",
      "product-requirements",
      "startup-pitch",
      "meeting-facilitator",
      "learning-path",
      "code-explainer",
    ],
    category: "Writing",
    difficulty: "beginner",
    author: "ClaudeSkills Team",
    featured: true,
    createdAt: "2025-01-01",
  },
  {
    id: "code-development",
    title: "Code & Development",
    description:
      "Level up your engineering workflow. Get expert code reviews, generate optimized SQL, design scalable architectures, and write documentation that developers actually love.",
    coverImage: "💻",
    skills: [
      "code-reviewer",
      "sql-query-builder",
      "system-architect",
      "api-doc-writer",
      "code-explainer",
      "product-requirements",
      "ux-feedback",
      "financial-model",
    ],
    category: "Code",
    difficulty: "intermediate",
    author: "ClaudeSkills Team",
    featured: true,
    createdAt: "2025-01-05",
  },
  {
    id: "data-analysis",
    title: "Data & Analysis",
    description:
      "Turn raw numbers into clear insights. Analyze datasets, build financial models, synthesize research, and craft SQL queries that answer your most important business questions.",
    coverImage: "📊",
    skills: [
      "data-analyst",
      "sql-query-builder",
      "financial-model",
      "research-synthesizer",
      "ux-feedback",
      "content-strategist",
      "seo-optimizer",
    ],
    category: "Data",
    difficulty: "intermediate",
    author: "ClaudeSkills Team",
    featured: true,
    createdAt: "2025-01-10",
  },
  {
    id: "research-learning",
    title: "Research & Learning",
    description:
      "Accelerate how you learn and research. Synthesize sources into reports, build personalized curricula, prep for interviews, and decode complex code — all faster than before.",
    coverImage: "🔬",
    skills: [
      "research-synthesizer",
      "learning-path",
      "code-explainer",
      "interview-coach",
      "ux-feedback",
      "data-analyst",
      "content-strategist",
      "product-requirements",
      "startup-pitch",
    ],
    category: "Research",
    difficulty: "beginner",
    author: "ClaudeSkills Team",
    featured: false,
    createdAt: "2025-01-15",
  },
  {
    id: "productivity-hacks",
    title: "Productivity Hacks",
    description:
      "Do more in less time. Run better meetings, write faster emails, nail job interviews, and build learning habits that actually stick — without burning out.",
    coverImage: "⚡",
    skills: [
      "meeting-facilitator",
      "email-writer",
      "interview-coach",
      "resume-optimizer",
      "learning-path",
      "product-requirements",
    ],
    category: "Productivity",
    difficulty: "beginner",
    author: "ClaudeSkills Team",
    featured: false,
    createdAt: "2025-01-20",
  },
];

export const featuredCollections = collections.filter((c) => c.featured);

export function getCollectionById(id: string): Collection | undefined {
  return collections.find((c) => c.id === id);
}
