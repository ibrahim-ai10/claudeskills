"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { skills } from "@/data/skills";
import { FilterState, Category, Difficulty } from "@/types/skill";
import { SearchBar } from "@/components/SearchBar";
import { FilterSidebar } from "@/components/FilterSidebar";
import { SkillGrid } from "@/components/SkillGrid";
import { useSkillFilters } from "@/hooks/useSkillFilters";

const DEFAULT_FILTERS: FilterState = {
  search: "",
  categories: [],
  difficulties: [],
  tags: [],
  sort: "popular",
};

export function SkillsDirectoryClient() {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FilterState>(() => {
    // Bootstrap from URL query params (backwards-compat: single category)
    const cat = searchParams.get("category") as Category | null;
    const sort = searchParams.get("sort") as FilterState["sort"] | null;
    return {
      ...DEFAULT_FILTERS,
      categories: cat ? [cat] : [],
      sort: sort ?? "popular",
    };
  });

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync URL params when they change (e.g. navigation from category link)
  useEffect(() => {
    const cat = searchParams.get("category") as Category | null;
    const sort = searchParams.get("sort") as FilterState["sort"] | null;
    if (cat || sort) {
      setFilters((prev) => ({
        ...prev,
        ...(cat ? { categories: [cat] } : {}),
        ...(sort ? { sort } : {}),
      }));
    }
  }, [searchParams]);

  // Memoized filtered + sorted skills from the custom hook
  const filteredSkills = useSkillFilters(skills, filters);

  const updateFilters = (partial: Partial<FilterState>) =>
    setFilters((prev) => ({ ...prev, ...partial }));

  // Count active filter dimensions for the mobile badge
  const activeFilterCount =
    filters.categories.length +
    filters.difficulties.length +
    filters.tags.length +
    (filters.search ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-100 mb-2">Skills Directory</h1>
        <p className="text-zinc-400">
          Discover and copy curated Claude AI prompts for every use case.
        </p>
      </div>

      {/* ── Search bar + mobile filter toggle ──────────────────────────── */}
      <div className="flex items-center gap-3 mb-6">
        <SearchBar
          value={filters.search}
          onChange={(v) => updateFilters({ search: v })}
          className="flex-1"
        />

        {/* Mobile filter button */}
        <button
          className="lg:hidden flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-zinc-100 hover:border-zinc-600 transition-colors text-sm font-medium"
          onClick={() => setMobileFiltersOpen((o) => !o)}
          aria-label="Toggle filters"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
          Filters
          {/* Active filter count badge */}
          {activeFilterCount > 0 && (
            <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-blue-500 text-white text-[10px] font-bold leading-none">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      <div className="flex gap-8">
        {/* ── Sidebar — desktop always visible, mobile slide-in ──────── */}
        <div
          className={`${
            mobileFiltersOpen ? "block" : "hidden"
          } lg:block w-full lg:w-56 xl:w-64 flex-shrink-0`}
        >
          <div className="lg:sticky lg:top-24">
            <FilterSidebar
              filters={filters}
              onFilterChange={updateFilters}
              allSkills={skills}
              totalCount={skills.length}
              filteredCount={filteredSkills.length}
            />
          </div>
        </div>

        {/* ── Main content ─────────────────────────────────────────────── */}
        <div className="flex-1 min-w-0">
          {/* Active filter chips row */}
          {(filters.categories.length > 0 ||
            filters.difficulties.length > 0 ||
            filters.tags.length > 0) && (
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="text-zinc-500 text-xs">Active:</span>

              {filters.categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() =>
                    updateFilters({ categories: filters.categories.filter((c) => c !== cat) })
                  }
                  className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                >
                  {cat}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              ))}

              {filters.difficulties.map((diff) => (
                <button
                  key={diff}
                  onClick={() =>
                    updateFilters({ difficulties: filters.difficulties.filter((d) => d !== diff) })
                  }
                  className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 hover:bg-zinc-700 transition-colors capitalize"
                >
                  {diff}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              ))}

              {filters.tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() =>
                    updateFilters({ tags: filters.tags.filter((t) => t !== tag) })
                  }
                  className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-zinc-700 transition-colors"
                >
                  #{tag}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              ))}

              {activeFilterCount > 1 && (
                <button
                  onClick={() =>
                    updateFilters({ categories: [], difficulties: [], tags: [], search: "" })
                  }
                  className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors ml-1"
                >
                  Clear all
                </button>
              )}
            </div>
          )}

          <SkillGrid
            skills={filteredSkills}
            resultCount={filteredSkills.length}
            totalCount={skills.length}
            hasActiveFilters={activeFilterCount > 0}
          />
        </div>
      </div>
    </div>
  );
}
