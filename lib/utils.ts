import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(" ");
}

export function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export const CATEGORY_COLORS: Record<string, string> = {
  Productivity: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Analysis: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Writing: "bg-green-500/10 text-green-400 border-green-500/20",
  Code: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Research: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Design: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  Marketing: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Data: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  Education: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  Business: "bg-red-500/10 text-red-400 border-red-500/20",
};

export const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: "bg-green-500/10 text-green-400 border-green-500/20",
  intermediate: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  advanced: "bg-red-500/10 text-red-400 border-red-500/20",
};

export const CATEGORY_ICONS: Record<string, string> = {
  Productivity: "⚡",
  Analysis: "🔍",
  Writing: "✍️",
  Code: "💻",
  Research: "🔬",
  Design: "🎨",
  Marketing: "📣",
  Data: "📊",
  Education: "📚",
  Business: "💼",
};
