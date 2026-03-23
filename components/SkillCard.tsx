"use client";

import Link from "next/link";
import { Skill } from "@/types/skill";
import { Badge } from "@/components/ui/Badge";
import { SocialProofBadge } from "@/components/SocialProofBadge";
import { ShareButton } from "@/components/ShareButton";
import { formatNumber } from "@/lib/utils";

interface SkillCardProps {
  skill: Skill;
  variant?: "default" | "featured" | "compact";
}

function CategoryIcon({ category }: { category: string }) {
  const icons: Record<string, string> = {
    Code: "💻", Writing: "✍️", Research: "🔬", Data: "📊",
    Productivity: "⚡", Marketing: "📣", Business: "💼",
    Education: "📚", Design: "🎨", Analysis: "🔍",
  };
  return <>{icons[category] ?? "🔍"}</>;
}

export function SkillCard({ skill, variant = "default" }: SkillCardProps) {
  const baseRating = skill.rating ?? 4.0;

  // ── Compact variant ────────────────────────────────────────────────────────
  if (variant === "compact") {
    return (
      <Link href={`/skills/${skill.id}`} className="group block">
        <div className="flex items-center gap-3 p-3 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-200">
          <div className="flex-shrink-0 w-9 h-9 rounded-md bg-zinc-800 flex items-center justify-center text-lg">
            <CategoryIcon category={skill.category} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-zinc-200 group-hover:text-white truncate">
              {skill.name}
            </p>
            <p className="text-xs text-zinc-500 truncate">{skill.category}</p>
          </div>
          <Badge variant="difficulty" difficulty={skill.difficulty} className="flex-shrink-0">
            {skill.difficulty}
          </Badge>
        </div>
      </Link>
    );
  }

  // ── Featured variant ───────────────────────────────────────────────────────
  if (variant === "featured") {
    return (
      <div className="group relative">
        <Link href={`/skills/${skill.id}`} className="block h-full">
          <div className="relative p-6 rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-900/10 transition-all duration-200 card-hover h-full">
            {skill.featured && (
              <div className="absolute top-4 right-4">
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Featured
                </span>
              </div>
            )}

            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xl flex-shrink-0">
                <CategoryIcon category={skill.category} />
              </div>
              <div>
                <h3 className="font-semibold text-zinc-100 group-hover:text-white transition-colors text-base leading-snug">
                  {skill.name}
                </h3>
                <Badge variant="category" category={skill.category} className="mt-1">
                  {skill.category}
                </Badge>
              </div>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2 mb-4">
              {skill.description}
            </p>

            <div className="flex items-center justify-between gap-2 flex-wrap">
              <SocialProofBadge
                skillId={skill.id}
                baseRating={baseRating}
                baseDownloads={skill.downloads}
                createdAt={skill.createdAt}
                variant="compact"
              />
              <div className="flex items-center gap-2">
                {skill.downloads && (
                  <span className="text-zinc-600 text-xs">
                    {formatNumber(skill.downloads)} uses
                  </span>
                )}
                <Badge variant="difficulty" difficulty={skill.difficulty}>
                  {skill.difficulty}
                </Badge>
              </div>
            </div>
          </div>
        </Link>

        {/* Share button — floats over card, stops click propagation */}
        <div
          className="absolute bottom-5 right-5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <ShareButton skillId={skill.id} skillName={skill.name} compact />
        </div>
      </div>
    );
  }

  // ── Default variant ────────────────────────────────────────────────────────
  return (
    <div className="group relative">
      <Link href={`/skills/${skill.id}`} className="block h-full">
        <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-200 card-hover h-full">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-lg flex-shrink-0">
                <CategoryIcon category={skill.category} />
              </div>
              <h3 className="font-medium text-zinc-200 group-hover:text-white transition-colors text-sm leading-snug">
                {skill.name}
              </h3>
            </div>
            <Badge variant="difficulty" difficulty={skill.difficulty} className="flex-shrink-0 ml-2">
              {skill.difficulty}
            </Badge>
          </div>

          <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2 mb-4">
            {skill.description}
          </p>

          <div className="flex items-center justify-between gap-2 flex-wrap">
            <Badge variant="category" category={skill.category}>
              {skill.category}
            </Badge>
            <div className="flex items-center gap-3">
              <SocialProofBadge
                skillId={skill.id}
                baseRating={baseRating}
                baseDownloads={skill.downloads}
                createdAt={skill.createdAt}
                variant="compact"
              />
              {skill.downloads && (
                <span className="text-zinc-600 text-xs hidden sm:block">
                  {formatNumber(skill.downloads)}
                </span>
              )}
            </div>
          </div>

          {skill.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-zinc-800">
              {skill.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="tag">#{tag}</Badge>
              ))}
              {skill.tags.length > 3 && (
                <span className="text-zinc-600 text-xs px-1 py-0.5">
                  +{skill.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>

      {/* Share button — floats over card on hover */}
      <div
        className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <ShareButton skillId={skill.id} skillName={skill.name} compact />
      </div>
    </div>
  );
}
