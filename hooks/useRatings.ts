import { useState, useCallback, useEffect } from "react";

const RATINGS_KEY = "claudeskills_ratings";
const VIEWS_KEY = "claudeskills_views";

interface SkillRatingEntry {
  userRating: number; // 0 = not yet rated
  seedCount: number;
  seedRating: number;
}

interface RatingsStore {
  [skillId: string]: SkillRatingEntry;
}

interface ViewsStore {
  [skillId: string]: number;
}

// ─── Storage helpers ──────────────────────────────────────────────────────────

function readRatings(): RatingsStore {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(RATINGS_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function writeRatings(data: RatingsStore): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(RATINGS_KEY, JSON.stringify(data));
}

function readViews(): ViewsStore {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(VIEWS_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function writeViews(data: ViewsStore): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(VIEWS_KEY, JSON.stringify(data));
}

// Derive a realistic seed vote count from download numbers (~1 % of downloads)
function computeSeedCount(baseDownloads?: number): number {
  return baseDownloads ? Math.max(10, Math.round(baseDownloads * 0.01)) : 10;
}

function getOrInit(
  skillId: string,
  baseRating: number,
  baseDownloads?: number
): SkillRatingEntry {
  const store = readRatings();
  if (store[skillId]) return store[skillId];
  return {
    userRating: 0,
    seedCount: computeSeedCount(baseDownloads),
    seedRating: baseRating,
  };
}

// ─── Pure utility functions (safe to call client-side outside React) ──────────

export function getRating(skillId: string): number {
  return readRatings()[skillId]?.userRating ?? 0;
}

export function setRating(
  skillId: string,
  rating: number,
  baseRating: number,
  baseDownloads?: number
): void {
  const store = readRatings();
  const existing = getOrInit(skillId, baseRating, baseDownloads);
  store[skillId] = { ...existing, userRating: rating };
  writeRatings(store);
}

export function getAverageRating(
  skillId: string,
  baseRating: number,
  baseDownloads?: number
): number {
  const entry = getOrInit(skillId, baseRating, baseDownloads);
  if (!entry.userRating) return entry.seedRating;
  const total = entry.seedRating * entry.seedCount + entry.userRating;
  return Math.round((total / (entry.seedCount + 1)) * 10) / 10;
}

export function getVoteCount(
  skillId: string,
  baseRating: number,
  baseDownloads?: number
): number {
  const entry = getOrInit(skillId, baseRating, baseDownloads);
  return entry.seedCount + (entry.userRating > 0 ? 1 : 0);
}

export function incrementView(skillId: string): void {
  const views = readViews();
  views[skillId] = (views[skillId] ?? 0) + 1;
  writeViews(views);
}

export function getViewCount(skillId: string): number {
  return readViews()[skillId] ?? 0;
}

export function isTrending(
  skillId: string,
  baseRating: number,
  baseDownloads?: number,
  createdAt?: string
): boolean {
  const views = getViewCount(skillId);
  const votes = getVoteCount(skillId, baseRating, baseDownloads);
  const avgRating = getAverageRating(skillId, baseRating, baseDownloads);

  // Blend stored views with download-based proxy so skills show as trending
  // even before any real localStorage data accumulates.
  const effectiveViews = (baseDownloads ?? 0) / 100 + views;

  const daysOld = createdAt
    ? Math.max(1, (Date.now() - new Date(createdAt).getTime()) / 86_400_000)
    : 30;

  const score = (effectiveViews + avgRating * 10 + votes) / daysOld;
  return score > 5;
}

// ─── React hook ───────────────────────────────────────────────────────────────

export function useRatings(
  skillId: string,
  baseRating: number,
  baseDownloads?: number
) {
  const [userRating, setUserRatingState] = useState<number>(0);
  // tick forces a re-render so derived values re-read from localStorage
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setUserRatingState(getRating(skillId));
  }, [skillId]);

  const handleSetRating = useCallback(
    (rating: number) => {
      // Toggle off if clicking the already-selected star
      const next = rating === userRating ? 0 : rating;
      setRating(skillId, next, baseRating, baseDownloads);
      setUserRatingState(next);
      setTick((t) => t + 1);
    },
    [skillId, baseRating, baseDownloads, userRating]
  );

  return {
    userRating,
    // Re-evaluated each render (cheap localStorage read)
    averageRating: getAverageRating(skillId, baseRating, baseDownloads),
    voteCount: getVoteCount(skillId, baseRating, baseDownloads),
    setRating: handleSetRating,
    _tick: tick, // consumed only to trigger re-render
  };
}
