import { cn, CATEGORY_COLORS, DIFFICULTY_COLORS, CATEGORY_ICONS } from "@/lib/utils";
import { Category, Difficulty } from "@/types/skill";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "category" | "difficulty" | "tag";
  category?: Category;
  difficulty?: Difficulty;
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  category,
  difficulty,
  className,
}: BadgeProps) {
  const base =
    "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors";

  const styles = {
    default: "bg-zinc-800 text-zinc-300 border-zinc-700",
    category: category ? CATEGORY_COLORS[category] : "bg-zinc-800 text-zinc-300 border-zinc-700",
    difficulty: difficulty ? DIFFICULTY_COLORS[difficulty] : "bg-zinc-800 text-zinc-300 border-zinc-700",
    tag: "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-zinc-300 cursor-pointer",
  };

  return (
    <span className={cn(base, styles[variant], className)}>
      {variant === "category" && category && (
        <span>{CATEGORY_ICONS[category]}</span>
      )}
      {children}
    </span>
  );
}
