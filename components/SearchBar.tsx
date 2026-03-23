"use client";

import { useState, useEffect, useRef } from "react";

interface SearchBarProps {
  /** External controlled value (used to sync clear-all resets) */
  value: string;
  /** Called with the debounced search string */
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  /** Debounce delay in ms (default: 300) */
  debounceMs?: number;
}

/**
 * SearchBar with built-in 300 ms debounce.
 *
 * The input shows `localValue` immediately for snappy UX, while the parent's
 * `onChange` fires only after the user stops typing for `debounceMs`.
 * When the external `value` changes (e.g. "Clear All" resets it to ""), the
 * local display value is synced as well.
 */
export function SearchBar({
  value,
  onChange,
  placeholder = "Search skills…",
  className = "",
  debounceMs = 300,
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync when the parent resets the value (e.g. "Clear All Filters")
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onChange(newValue), debounceMs);
  };

  const handleClear = () => {
    setLocalValue("");
    if (timerRef.current) clearTimeout(timerRef.current);
    onChange(""); // immediate clear — no debounce needed
  };

  // Cleanup on unmount
  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Search icon */}
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
        <svg
          className="h-4 w-4 text-zinc-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <input
        type="search"
        value={localValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder-zinc-500 rounded-lg py-2.5 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        aria-label="Search skills"
      />

      {/* Clear (×) button — only visible when there is text */}
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-zinc-500 hover:text-zinc-300 transition-colors"
          aria-label="Clear search"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
