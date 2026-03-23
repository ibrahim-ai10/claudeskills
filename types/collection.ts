import { Difficulty } from "@/types/skill";

export interface Collection {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  skills: string[]; // skill IDs
  category: string;
  difficulty: Difficulty;
  author: string;
  featured: boolean;
  createdAt: string;
}
