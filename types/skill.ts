export type Difficulty = "beginner" | "intermediate" | "advanced";

export type Category =
  | "Productivity"
  | "Analysis"
  | "Writing"
  | "Code"
  | "Research"
  | "Design"
  | "Marketing"
  | "Data"
  | "Education"
  | "Business"
  | "AI";

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: Category;
  tags: string[];
  difficulty: Difficulty;
  author?: string;
  rating?: number;
  downloads?: number;
  featured: boolean;
  imageUrl?: string;
  skillContent: string;
  createdAt: string;
  videoUrl?: string;
  demoGif?: string;
  tutorialLength?: number;
}

export interface FilterState {
  search: string;
  /** Multi-select — empty array means "All" */
  categories: Category[];
  /** Multi-select — empty array means "All" */
  difficulties: Difficulty[];
  /** Multi-select tags — empty array means no tag filter */
  tags: string[];
  sort: "newest" | "popular" | "rating" | "name";
}
