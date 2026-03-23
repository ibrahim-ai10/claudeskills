"use client";

import { useEffect } from "react";
import { incrementView } from "@/hooks/useRatings";

/** Invisible component — increments the localStorage view counter on mount. */
export function ViewTracker({ skillId }: { skillId: string }) {
  useEffect(() => {
    incrementView(skillId);
  }, [skillId]);

  return null;
}
