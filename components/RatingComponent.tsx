"use client";

import { useState } from "react";
import { useRatings } from "@/hooks/useRatings";

const STAR_PATH =
  "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

interface RatingComponentProps {
  skillId: string;
  baseRating: number;
  baseDownloads?: number;
}

export function RatingComponent({
  skillId,
  baseRating,
  baseDownloads,
}: RatingComponentProps) {
  const [hovered, setHovered] = useState(0);
  const { userRating, averageRating, voteCount, setRating } = useRatings(
    skillId,
    baseRating,
    baseDownloads
  );

  function starColor(star: number): string {
    if (hovered > 0) {
      return star <= hovered ? "text-amber-400" : "text-zinc-600";
    }
    if (userRating > 0) {
      return star <= userRating ? "text-amber-400" : "text-zinc-700";
    }
    // Show rounded average in muted amber when user hasn't rated yet
    return star <= Math.round(averageRating) ? "text-amber-500/50" : "text-zinc-700";
  }

  return (
    <div className="space-y-3">
      {/* Interactive stars */}
      <div className="flex items-center gap-1.5" onMouseLeave={() => setHovered(0)}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHovered(star)}
            className="focus:outline-none transition-transform duration-100 hover:scale-110 active:scale-95"
            aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
          >
            <svg
              className={`w-7 h-7 transition-colors duration-100 ${starColor(star)}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d={STAR_PATH} />
            </svg>
          </button>
        ))}

        {userRating > 0 && (
          <span className="text-sm text-zinc-400 ml-2">
            Your rating: <span className="text-amber-400 font-medium">{userRating}/5</span>
          </span>
        )}
        {userRating === 0 && hovered > 0 && (
          <span className="text-sm text-zinc-500 ml-2">{hovered}/5</span>
        )}
        {userRating === 0 && hovered === 0 && (
          <span className="text-sm text-zinc-600 ml-2">Click to rate</span>
        )}
      </div>

      {/* Aggregate stats */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-amber-400 font-semibold">{averageRating.toFixed(1)}</span>
        <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d={STAR_PATH} />
        </svg>
        <span className="text-zinc-500">
          based on{" "}
          <span className="text-zinc-400">{voteCount.toLocaleString()}</span>{" "}
          {voteCount === 1 ? "vote" : "votes"}
        </span>
      </div>
    </div>
  );
}
