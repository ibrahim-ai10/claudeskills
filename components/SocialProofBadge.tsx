"use client";

import { useState, useEffect } from "react";
import { getAverageRating, getVoteCount, isTrending } from "@/hooks/useRatings";

const STAR_PATH =
  "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

interface SocialProofBadgeProps {
  skillId: string;
  baseRating: number;
  baseDownloads?: number;
  createdAt?: string;
  /** compact = inline row for skill cards; full = detail page header */
  variant?: "compact" | "full";
}

export function SocialProofBadge({
  skillId,
  baseRating,
  baseDownloads,
  createdAt,
  variant = "compact",
}: SocialProofBadgeProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pre-hydration: render using static seed data to avoid SSR mismatch
  const avgRating = mounted
    ? getAverageRating(skillId, baseRating, baseDownloads)
    : baseRating;
  const voteCount = mounted
    ? getVoteCount(skillId, baseRating, baseDownloads)
    : null;
  const trending = mounted
    ? isTrending(skillId, baseRating, baseDownloads, createdAt)
    : false;

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        {trending && (
          <span className="inline-flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 font-medium leading-none">
            🔥 Trending
          </span>
        )}
        <div className="flex items-center gap-1">
          <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d={STAR_PATH} />
          </svg>
          <span className="text-zinc-500 text-xs">{avgRating.toFixed(1)}</span>
        </div>
      </div>
    );
  }

  // full variant — used in detail page stats row
  return (
    <div className="flex flex-wrap items-center gap-3">
      {trending && (
        <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 font-medium">
          🔥 Trending
        </span>
      )}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${
              star <= Math.round(avgRating) ? "text-amber-400" : "text-zinc-700"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d={STAR_PATH} />
          </svg>
        ))}
        <span className="text-zinc-300 text-sm font-medium ml-1">
          {avgRating.toFixed(1)}
        </span>
        {voteCount !== null && (
          <span className="text-zinc-500 text-sm ml-0.5">
            ({voteCount.toLocaleString()} {voteCount === 1 ? "vote" : "votes"})
          </span>
        )}
      </div>
    </div>
  );
}
