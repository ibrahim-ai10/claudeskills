"use client";

import Link from "next/link";
import { useFavorites } from "@/hooks/useFavorites";
import { SkillCard } from "@/components/SkillCard";
import { skills } from "@/data/skills";

/**
 * /favorites — Shows all skills the user has bookmarked.
 *
 * Reads favorite skill IDs from localStorage via useFavorites, then
 * cross-references them with the static skills data. Skills that were
 * favorited but since removed from the dataset are silently ignored
 * (graceful handling of stale references).
 */
export default function FavoritesPage() {
  const { favorites, isLoaded, removeFavorite } = useFavorites();

  // Resolve IDs → Skill objects, skipping any IDs that no longer exist
  const favoritedSkills = isLoaded
    ? favorites
        .map((id) => skills.find((s) => s.id === id))
        .filter((s): s is NonNullable<typeof s> => s !== undefined)
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-red-400"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-zinc-100">My Favorites</h1>
          {isLoaded && favoritedSkills.length > 0 && (
            <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-sm font-medium">
              {favoritedSkills.length}
            </span>
          )}
        </div>
        <p className="text-zinc-400 text-sm">
          Skills you&apos;ve saved for quick access. Stored locally in your browser.
        </p>
      </div>

      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-48 rounded-xl border border-zinc-800 bg-zinc-900/40 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Empty state */}
      {isLoaded && favoritedSkills.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-zinc-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-zinc-300 mb-2">No favorites yet</h2>
          <p className="text-zinc-500 text-sm max-w-xs mb-6">
            Click the heart icon on any skill card to save it here for quick access.
          </p>
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Browse Skills
          </Link>
        </div>
      )}

      {/* Favorites grid */}
      {isLoaded && favoritedSkills.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoritedSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} variant="default" />
            ))}
          </div>

          {/* Clear all button */}
          <div className="mt-10 pt-6 border-t border-zinc-800 flex justify-end">
            <button
              onClick={() => {
                favorites.forEach((id) => removeFavorite(id));
              }}
              className="text-sm text-zinc-500 hover:text-red-400 transition-colors"
            >
              Clear all favorites
            </button>
          </div>
        </>
      )}
    </div>
  );
}
