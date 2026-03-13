"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { skills } from "@/data/skills";
import { FilterState } from "@/types/skill";
import { SearchBar } from "@/components/SearchBar";
import { FilterSidebar } from "@/components/FilterSidebar";
import { SkillGrid } from "@/components/SkillGrid";
import { Category, Difficulty } from "@/types/skill";

const DEFAULT_FILTERS: FilterState = {
  search: "",
  category: "All",
  difficulty: "All",
  tags: [],
  sort: "popular",
};

export function SkillsDirectoryClient() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(() => ({
    ...DEFAULT_FILTERS,
    category: (searchParams.get("category") as Category) ?? "All",
    sort: (searchParams.get("sort") as FilterState["sort"]) ?? "popular",
  }));
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync URL params on first load
  useEffect(() => {
    const cat = searchParams.get("category") as Category | null;
    const sort = searchParams.get("sort") as FilterState["sort"] | null;
    if (cat || sort) {
      setFilters((prev) => ({
        ...prev,
        ...(cat ? { category: cat } : {}),
        ...(sort ? { sort } : {}),
      }));
    }
  }, [searchParams]);

  const filteredSkills = useMemo(() => {
    let result = [...skills];

    // Search
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.tags.some((t) => t.toLowerCase().includes(q)) ||
          s.category.toLowerCase().includes(q)
      );
    }

    // Category
    if (filters.category !== "All") {
      result = result.filter((s) => s.category === filters.category);
    }

    // Difficulty
    if (filters.difficulty !== "All") {
      result = result.filter((s) => s.difficulty === filters.difficulty);
    }

    // Sort
    switch (filters.sort) {
      case "popular":
        result.sort((a, b) => (b.downloads ?? 0) - (a.downloads ?? 0));
        break;
      case "rating":
        result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [filters]);

  const updateFilters = (partial: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-100 mb-2">Skills Directory</h1>
        <p className="text-zinc-400">
          Discover and copy curated Claude AI prompts for every use case.
        </p>
      </div>

      {/* Search bar + mobile filter toggle */}
      <div className="flex items-center gap-3 mb-6">
        <SearchBar
          value={filters.search}
          onChange={(v) => updateFilters({ search: v })}
          className="flex-1"
        />
        <button
          className="lg:hidden flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-zinc-100 hover:border-zinc-600 transition-colors text-sm font-medium"
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
          Filters
          {(filters.category !== "All" || filters.difficulty !== "All") && (
            <span className="w-2 h-2 rounded-full bg-blue-500" />
          )}
        </button>
      </div>

      <div className="flex gap-8">
        {/* Sidebar — desktop always visible, mobile collapsible */}
        <div
          className={`${
            mobileFiltersOpen ? "block" : "hidden"
          } lg:block w-full lg:w-56 xl:w-64 flex-shrink-0`}
        >
          <div className="lg:sticky lg:top-24">
            <FilterSidebar
              filters={filters}
              onFilterChange={updateFilters}
              totalCount={skills.length}
              filteredCount={filteredSkills.length}
            />
          </div>
        </div>

        {/* Main grid */}
        <div className="flex-1 min-w-0">
          {/* Active filter chips */}
          {(filters.category !== "All" || filters.difficulty !== "All") && (
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="text-zinc-500 text-xs">Active:</span>
              {filters.category !== "All" && (
                <button
                  onClick={() => updateFilters({ category: "All" })}
                  className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                >
                  {filters.category}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              {filters.difficulty !== "All" && (
                <button
                  onClick={() => updateFilters({ difficulty: "All" as Difficulty | "All" })}
                  className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 hover:bg-zinc-700 transition-colors capitalize"
                >
                  {filters.difficulty}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          )}

          <SkillGrid skills={filteredSkills} />
        </div>
      </div>
    </div>
  );
}
