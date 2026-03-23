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
  | "Business";

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
  category: Category | "All";
  difficulty: Difficulty | "All";
  tags: string[];
  sort: "newest" | "popular" | "rating" | "name";
}
