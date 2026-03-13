import { Skill } from "@/types/skill";
import { SkillCard } from "@/components/SkillCard";

interface SkillGridProps {
  skills: Skill[];
  variant?: "default" | "featured" | "compact";
  emptyMessage?: string;
}

export function SkillGrid({
  skills,
  variant = "default",
  emptyMessage = "No skills found. Try adjusting your filters.",
}: SkillGridProps) {
  if (skills.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <p className="text-zinc-400 font-medium">{emptyMessage}</p>
        <p className="text-zinc-600 text-sm mt-1">
          Try different keywords or clear your filters.
        </p>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="space-y-2">
        {skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} variant="compact" />
        ))}
      </div>
    );
  }

  return (
    <div className={`grid gap-4 ${
      variant === "featured"
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
    }`}>
      {skills.map((skill) => (
        <SkillCard key={skill.id} skill={skill} variant={variant} />
      ))}
    </div>
  );
}
