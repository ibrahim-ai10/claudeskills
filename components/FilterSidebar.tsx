"use client";

import { Category, Difficulty } from "@/types/skill";
import { FilterState } from "@/types/skill";
import { CATEGORY_COLORS, DIFFICULTY_COLORS, CATEGORY_ICONS } from "@/lib/utils";
import { cn } from "@/lib/utils";

const CATEGORIES: (Category | "All")[] = [
  "All", "Code", "Writing", "Research", "Analysis", "Productivity",
  "Data", "Marketing", "Business", "Education", "Design",
];

const DIFFICULTIES: (Difficulty | "All")[] = ["All", "beginner", "intermediate", "advanced"];

const SORT_OPTIONS: { value: FilterState["sort"]; label: string }[] = [
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
  { value: "name", label: "A–Z" },
];

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  totalCount: number;
  filteredCount: number;
}

export function FilterSidebar({
  filters,
  onFilterChange,
  totalCount,
  filteredCount,
}: FilterSidebarProps) {
  const hasActiveFilters =
    filters.category !== "All" ||
    filters.difficulty !== "All" ||
    filters.search !== "";

  return (
    <aside className="w-full space-y-6">
      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-zinc-400 text-sm">
          <span className="text-zinc-100 font-semibold">{filteredCount}</span>
          {" "}of{" "}
          <span className="text-zinc-400">{totalCount}</span> skills
        </p>
        {hasActiveFilters && (
          <button
            onClick={() =>
              onFilterChange({
                category: "All",
                difficulty: "All",
                search: "",
                tags: [],
              })
            }
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Sort By</h3>
        <div className="space-y-1">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onFilterChange({ sort: opt.value })}
              className={cn(
                "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                filters.sort === opt.value
                  ? "bg-zinc-800 text-zinc-100"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Category</h3>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onFilterChange({ category: cat })}
              className={cn(
                "w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-2",
                filters.category === cat
                  ? "bg-zinc-800 text-zinc-100"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60"
              )}
            >
              {cat !== "All" && (
                <span className="text-base">{CATEGORY_ICONS[cat]}</span>
              )}
              <span>{cat}</span>
              {filters.category === cat && cat !== "All" && (
                <span
                  className={cn(
                    "ml-auto text-xs px-1.5 py-0.5 rounded-full border",
                    CATEGORY_COLORS[cat]
                  )}
                >
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Difficulty</h3>
        <div className="space-y-1">
          {DIFFICULTIES.map((diff) => (
            <button
              key={diff}
              onClick={() => onFilterChange({ difficulty: diff })}
              className={cn(
                "w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-2 capitalize",
                filters.difficulty === diff
                  ? "bg-zinc-800 text-zinc-100"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60"
              )}
            >
              {diff !== "All" && (
                <span
                  className={cn(
                    "w-2 h-2 rounded-full",
                    diff === "beginner" ? "bg-green-400" :
                    diff === "intermediate" ? "bg-yellow-400" : "bg-red-400"
                  )}
                />
              )}
              {diff}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
