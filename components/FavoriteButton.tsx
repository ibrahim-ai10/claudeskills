"use client";

import { useFavorites } from "@/hooks/useFavorites";

interface FavoriteButtonProps {
  skillId: string;
  /** Extra Tailwind classes for positioning the button within its container. */
  className?: string;
}

/**
 * Heart toggle button that adds/removes a skill from the user's favorites.
 *
 * Renders nothing during SSR to avoid hydration mismatches, then appears
 * once the client has read the persisted favorites from localStorage.
 */
export function FavoriteButton({ skillId, className = "" }: FavoriteButtonProps) {
  const { isFavorited, toggleFavorite, isLoaded } = useFavorites();

  // Don't render until localStorage has been read to prevent hydration mismatch
  if (!isLoaded) return null;

  const favorited = isFavorited(skillId);

  function handleClick(e: React.MouseEvent) {
    // Stop the click from bubbling to the parent <Link> element
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(skillId);
  }

  return (
    <button
      onClick={handleClick}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={favorited}
      className={[
        // Base layout & sizing — large enough for mobile tap targets (44px+)
        "flex items-center justify-center w-8 h-8 rounded-full",
        // Visual style
        "transition-all duration-200 ease-in-out",
        favorited
          ? "text-red-500 bg-red-500/10 hover:bg-red-500/20"
          : "text-zinc-500 bg-zinc-800/80 hover:text-red-400 hover:bg-red-500/10",
        // Scale pop on active
        "active:scale-90",
        className,
      ].join(" ")}
    >
      {favorited ? (
        /* Filled heart */
        <svg
          className="w-4 h-4 transition-transform duration-200 scale-110"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ) : (
        /* Outline heart */
        <svg
          className="w-4 h-4 transition-transform duration-200 hover:scale-110"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      )}
    </button>
  );
}
