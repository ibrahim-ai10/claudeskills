import { useMemo } from "react";
import { Skill, FilterState } from "@/types/skill";

/**
 * useSkillFilters
 *
 * Memoized hook that applies search + multi-select category/difficulty/tag filters
 * and sort order to a skills array.
 *
 * Filter combination logic:
 *  - search:       matches name | description | tags | category (case-insensitive)
 *  - categories:   OR within the dimension (skill matches any selected category)
 *  - difficulties: OR within the dimension
 *  - tags:         OR within the dimension (skill has at least one selected tag)
 *  - Across dims:  AND  (must satisfy every active filter dimension)
 *
 * @param skills   Full skills array to filter
 * @param filters  Current FilterState (from SkillsDirectoryClient)
 * @returns        Filtered + sorted skills array (new reference only when inputs change)
 */
export function useSkillFilters(skills: Skill[], filters: FilterState): Skill[] {
  return useMemo(() => {
    let result = [...skills];

    // ── Search ────────────────────────────────────────────────────────────────
    const q = filters.search.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // ── Category (multi-select OR) ─────────────────────────────────────────
    if (filters.categories.length > 0) {
      result = result.filter((s) => filters.categories.includes(s.category));
    }

    // ── Difficulty (multi-select OR) ──────────────────────────────────────
    if (filters.difficulties.length > 0) {
      result = result.filter((s) => filters.difficulties.includes(s.difficulty));
    }

    // ── Tags (multi-select OR — skill has at least one selected tag) ───────
    if (filters.tags.length > 0) {
      result = result.filter((s) =>
        filters.tags.some((tag) => s.tags.includes(tag))
      );
    }

    // ── Sort ──────────────────────────────────────────────────────────────
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
  }, [skills, filters]);
}

// ─── Helper: derive per-value counts from the full dataset ───────────────────

/** Returns a map of category → count across all provided skills */
export function useCategoryCounts(skills: Skill[]): Record<string, number> {
  return useMemo(() => {
    const counts: Record<string, number> = {};
    for (const s of skills) {
      counts[s.category] = (counts[s.category] ?? 0) + 1;
    }
    return counts;
  }, [skills]);
}

/** Returns a map of difficulty → count across all provided skills */
export function useDifficultyCounts(skills: Skill[]): Record<string, number> {
  return useMemo(() => {
    const counts: Record<string, number> = {};
    for (const s of skills) {
      counts[s.difficulty] = (counts[s.difficulty] ?? 0) + 1;
    }
    return counts;
  }, [skills]);
}

/** Returns { tag, count }[] sorted by count desc, limited to `limit` entries */
export function useTopTags(
  skills: Skill[],
  limit = 20
): { tag: string; count: number }[] {
  return useMemo(() => {
    const counts: Record<string, number> = {};
    for (const s of skills) {
      for (const t of s.tags) {
        counts[t] = (counts[t] ?? 0) + 1;
      }
    }
    return Object.entries(counts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }, [skills, limit]);
}
