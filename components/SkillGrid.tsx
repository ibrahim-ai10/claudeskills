import { Skill } from "@/types/skill";
import { SkillCard } from "@/components/SkillCard";

interface SkillGridProps {
  skills: Skill[];
  variant?: "default" | "featured" | "compact";
  emptyMessage?: string;
  /** Number of results after filtering (shown in header) */
  resultCount?: number;
  /** Total unfiltered skill count (used for "X of Y" display) */
  totalCount?: number;
  /** Whether any filter/search is currently active */
  hasActiveFilters?: boolean;
}

export function SkillGrid({
  skills,
  variant = "default",
  emptyMessage = "No skills found. Try adjusting your filters.",
  resultCount,
  totalCount,
  hasActiveFilters = false,
}: SkillGridProps) {
  const showCount = resultCount !== undefined && totalCount !== undefined;

  // ── Zero-results state ─────────────────────────────────────────────────────
  if (skills.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <p className="text-zinc-400 font-medium">{emptyMessage}</p>
        <p className="text-zinc-600 text-sm mt-1">
          {hasActiveFilters
            ? "Try different keywords or clear your filters."
            : "No skills available yet."}
        </p>
      </div>
    );
  }

  // ── Result count header ────────────────────────────────────────────────────
  const countHeader = showCount && (
    <p className="text-sm text-zinc-500 mb-4">
      {resultCount === totalCount ? (
        <>
          <span className="text-zinc-300 font-medium">{totalCount}</span> skills
        </>
      ) : (
        <>
          <span className="text-zinc-300 font-medium">{resultCount}</span>
          {" "}result{resultCount !== 1 ? "s" : ""} found
        </>
      )}
    </p>
  );

  // ── Compact (list) variant ─────────────────────────────────────────────────
  if (variant === "compact") {
    return (
      <>
        {countHeader}
        <div className="space-y-2">
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} variant="compact" />
          ))}
        </div>
      </>
    );
  }

  // ── Default / featured (grid) variants ────────────────────────────────────
  return (
    <>
      {countHeader}
      <div
        className={`grid gap-4 ${
          variant === "featured"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
        }`}
      >
        {skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} variant={variant} />
        ))}
      </div>
    </>
  );
}
