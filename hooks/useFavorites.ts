"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "claudeskills_favorites";

// Module-level singleton to share state across all hook instances
// within the same browser session without requiring a Context provider.
let _favorites: string[] = [];
let _initialized = false;
const _listeners = new Set<(favorites: string[]) => void>();

function notifyListeners(newFavorites: string[]) {
  _favorites = newFavorites;
  _listeners.forEach((listener) => listener(newFavorites));
}

function loadFromStorage(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    // Guard against corrupted data — only keep string IDs
    if (Array.isArray(parsed)) {
      return parsed.filter((id): id is string => typeof id === "string");
    }
    return [];
  } catch {
    // Corrupted JSON — reset storage
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    return [];
  }
}

function saveToStorage(favorites: string[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    // localStorage quota exceeded or unavailable — fail silently
    console.warn("[useFavorites] Could not persist favorites to localStorage.");
  }
}

/**
 * Custom hook for managing favorited skill IDs.
 *
 * Persists to localStorage under the key "claudeskills_favorites".
 * State is shared across all hook instances in the same tab via a
 * module-level singleton so every component stays in sync.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(_favorites);
  const [isLoaded, setIsLoaded] = useState(_initialized);

  useEffect(() => {
    // Register this instance as a listener for state changes
    const listener = (newFavorites: string[]) => setFavorites(newFavorites);
    _listeners.add(listener);

    // Load from localStorage only once across all instances
    if (!_initialized) {
      const loaded = loadFromStorage();
      _favorites = loaded;
      _initialized = true;
      notifyListeners(loaded);
    } else {
      // Already initialized — just sync local state
      setFavorites(_favorites);
    }

    setIsLoaded(true);

    return () => {
      _listeners.delete(listener);
    };
  }, []);

  /** Returns the current array of favorited skill IDs. */
  const getFavorites = useCallback((): string[] => _favorites, []);

  /** Adds a skill ID to favorites (no-op if already present). */
  const addFavorite = useCallback((skillId: string): void => {
    if (_favorites.includes(skillId)) return;
    const updated = [..._favorites, skillId];
    saveToStorage(updated);
    notifyListeners(updated);
  }, []);

  /** Removes a skill ID from favorites (no-op if not present). */
  const removeFavorite = useCallback((skillId: string): void => {
    if (!_favorites.includes(skillId)) return;
    const updated = _favorites.filter((id) => id !== skillId);
    saveToStorage(updated);
    notifyListeners(updated);
  }, []);

  /** Toggles the favorited state of a skill ID. */
  const toggleFavorite = useCallback((skillId: string): void => {
    const updated = _favorites.includes(skillId)
      ? _favorites.filter((id) => id !== skillId)
      : [..._favorites, skillId];
    saveToStorage(updated);
    notifyListeners(updated);
  }, []);

  /** Returns true if the given skill ID is currently favorited. */
  const isFavorited = useCallback(
    (skillId: string): boolean => favorites.includes(skillId),
    [favorites]
  );

  return {
    favorites,
    isLoaded,
    getFavorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorited,
  };
}
