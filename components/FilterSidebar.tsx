"use client";

import { useState } from "react";
import { Category, Difficulty, FilterState, Skill } from "@/types/skill";
import { CATEGORY_COLORS, CATEGORY_ICONS, cn } from "@/lib/utils";

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  "Code", "Writing", "Research", "Analysis", "Productivity",
  "Data", "Marketing", "Business", "Education", "Design",
];

const DIFFICULTIES: Difficulty[] = ["beginner", "intermediate", "advanced"];

const SORT_OPTIONS: { value: FilterState["sort"]; label: string }[] = [
  { value: "popular", label: "Most Popular" },
  { value: "rating",  label: "Top Rated"    },
  { value: "newest",  label: "Newest"        },
  { value: "name",    label: "A–Z"           },
];

const DIFFICULTY_DOT: Record<Difficulty, string> = {
  beginner:     "bg-green-400",
  intermediate: "bg-yellow-400",
  advanced:     "bg-red-400",
};

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  beginner:     "Beginner",
  intermediate: "Intermediate",
  advanced:     "Advanced",
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (partial: Partial<FilterState>) => void;
  /** Full (unfiltered) skills list — used to compute per-option counts */
  allSkills: Skill[];
  totalCount: number;
  filteredCount: number;
}

// ─── Helper: collapsible section ─────────────────────────────────────────────

function Section({
  title,
  defaultOpen = true,
  hasActive = false,
  onClear,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  hasActive?: boolean;
  onClear?: () => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 group"
        >
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider group-hover:text-zinc-400 transition-colors">
            {title}
          </h3>
          <svg
            className={cn(
              "w-3 h-3 text-zinc-600 transition-transform duration-200",
              open ? "rotate-0" : "-rotate-90"
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {hasActive && onClear && (
          <button
            onClick={onClear}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            aria-label={`Clear ${title} filter`}
          >
            Clear
          </button>
        )}
      </div>

      {/* Collapsible body */}
      {open && <div className="space-y-1">{children}</div>}
    </div>
  );
}

// ─── Checkbox row ─────────────────────────────────────────────────────────────

function CheckRow({
  checked,
  onToggle,
  label,
  count,
  colorClass,
}: {
  checked: boolean;
  onToggle: () => void;
  label: React.ReactNode;
  count: number;
  colorClass?: string;
}) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors text-left",
        checked
          ? "bg-zinc-800 text-zinc-100"
          : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
      )}
    >
      {/* Custom checkbox */}
      <span
        className={cn(
          "flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-colors",
          checked
            ? "bg-blue-500 border-blue-500"
            : "border-zinc-600 bg-transparent"
        )}
      >
        {checked && (
          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>

      <span className="flex-1 truncate">{label}</span>

      {/* Count pill */}
      <span
        className={cn(
          "text-xs px-1.5 py-0.5 rounded-full border tabular-nums",
          checked && colorClass
            ? colorClass
            : "bg-zinc-800 text-zinc-500 border-zinc-700"
        )}
      >
        {count}
      </span>
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function FilterSidebar({
  filters,
  onFilterChange,
  allSkills,
  totalCount,
  filteredCount,
}: FilterSidebarProps) {
  // Pre-compute per-option counts from the full skills list
  const categoryCounts = allSkills.reduce<Record<string, number>>((acc, s) => {
    acc[s.category] = (acc[s.category] ?? 0) + 1;
    return acc;
  }, {});

  const difficultyCounts = allSkills.reduce<Record<string, number>>((acc, s) => {
    acc[s.difficulty] = (acc[s.difficulty] ?? 0) + 1;
    return acc;
  }, {});

  // Top tags by frequency (up to 20)
  const tagCounts = allSkills.reduce<Record<string, number>>((acc, s) => {
    s.tags.forEach((t) => { acc[t] = (acc[t] ?? 0) + 1; });
    return acc;
  }, {});
  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);

  // Toggle helpers
  const toggleCategory = (cat: Category) => {
    const next = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onFilterChange({ categories: next });
  };

  const toggleDifficulty = (diff: Difficulty) => {
    const next = filters.difficulties.includes(diff)
      ? filters.difficulties.filter((d) => d !== diff)
      : [...filters.difficulties, diff];
    onFilterChange({ difficulties: next });
  };

  const toggleTag = (tag: string) => {
    const next = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];
    onFilterChange({ tags: next });
  };

  // Active filter count (for the "Clear all" label)
  const activeFilterCount =
    filters.categories.length +
    filters.difficulties.length +
    filters.tags.length +
    (filters.search ? 1 : 0);

  return (
    <aside className="w-full space-y-5">
      {/* ── Results summary + global Clear All ──────────────────────────── */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400">
          <span className="text-zinc-100 font-semibold">{filteredCount}</span>
          {" "}
          <span className="text-zinc-500">of {totalCount}</span>
          {" "}skills
        </p>

        {activeFilterCount > 0 && (
          <button
            onClick={() =>
              onFilterChange({ categories: [], difficulties: [], tags: [], search: "" })
            }
            className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            Clear all
            {/* Active filter count badge */}
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] font-semibold leading-none">
              {activeFilterCount}
            </span>
          </button>
        )}
      </div>

      {/* ── Sort ────────────────────────────────────────────────────────── */}
      <Section title="Sort By">
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
            {filters.sort === opt.value && (
              <span className="ml-1 text-blue-400">✓</span>
            )}
          </button>
        ))}
      </Section>

      {/* ── Category ────────────────────────────────────────────────────── */}
      <Section
        title="Category"
        hasActive={filters.categories.length > 0}
        onClear={() => onFilterChange({ categories: [] })}
      >
        {CATEGORIES.map((cat) => (
          <CheckRow
            key={cat}
            checked={filters.categories.includes(cat)}
            onToggle={() => toggleCategory(cat)}
            label={
              <span className="flex items-center gap-1.5">
                <span>{CATEGORY_ICONS[cat]}</span>
                <span>{cat}</span>
              </span>
            }
            count={categoryCounts[cat] ?? 0}
            colorClass={CATEGORY_COLORS[cat]}
          />
        ))}
      </Section>

      {/* ── Difficulty ──────────────────────────────────────────────────── */}
      <Section
        title="Difficulty"
        hasActive={filters.difficulties.length > 0}
        onClear={() => onFilterChange({ difficulties: [] })}
      >
        {DIFFICULTIES.map((diff) => (
          <CheckRow
            key={diff}
            checked={filters.difficulties.includes(diff)}
            onToggle={() => toggleDifficulty(diff)}
            label={
              <span className="flex items-center gap-2">
                <span className={cn("w-2 h-2 rounded-full flex-shrink-0", DIFFICULTY_DOT[diff])} />
                <span>{DIFFICULTY_LABEL[diff]}</span>
              </span>
            }
            count={difficultyCounts[diff] ?? 0}
          />
        ))}
      </Section>

      {/* ── Tags ────────────────────────────────────────────────────────── */}
      <Section
        title="Tags"
        defaultOpen={false}
        hasActive={filters.tags.length > 0}
        onClear={() => onFilterChange({ tags: [] })}
      >
        <div className="flex flex-wrap gap-1.5 pt-1">
          {topTags.map(([tag, count]) => {
            const active = filters.tags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={cn(
                  "text-xs px-2 py-1 rounded-full border transition-colors",
                  active
                    ? "bg-blue-500/20 text-blue-300 border-blue-500/40 hover:bg-blue-500/30"
                    : "bg-zinc-800/60 text-zinc-400 border-zinc-700 hover:text-zinc-200 hover:border-zinc-500"
                )}
              >
                {tag}
                <span className="ml-1 text-[10px] opacity-60">{count}</span>
              </button>
            );
          })}
        </div>
      </Section>
    </aside>
  );
}
