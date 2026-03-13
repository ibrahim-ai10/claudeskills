import { Suspense } from "react";
import { SkillsDirectoryClient } from "@/components/SkillsDirectoryClient";

export const metadata = {
  title: "Skills Directory",
  description: "Browse all curated Claude AI Skills, Prompts, and Integrations.",
};

export default function SkillsDirectoryPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="space-y-4">
            <div className="h-8 bg-zinc-800 rounded w-48 animate-pulse" />
            <div className="h-4 bg-zinc-800 rounded w-64 animate-pulse" />
            <div className="h-10 bg-zinc-800 rounded animate-pulse" />
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-zinc-900 rounded-xl border border-zinc-800 animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <SkillsDirectoryClient />
    </Suspense>
  );
}
