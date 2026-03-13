import Link from "next/link";
import { Skill } from "@/types/skill";
import { Badge } from "@/components/ui/Badge";
import { FavoriteButton } from "@/components/FavoriteButton";
import { formatNumber } from "@/lib/utils";

interface SkillCardProps {
  skill: Skill;
  variant?: "default" | "featured" | "compact";
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3 h-3 ${
            star <= Math.round(rating) ? "text-yellow-400" : "text-zinc-700"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-zinc-500 text-xs ml-0.5">{rating.toFixed(1)}</span>
    </div>
  );
}

export function SkillCard({ skill, variant = "default" }: SkillCardProps) {
  if (variant === "compact") {
    return (
      <div className="group relative block">
        <Link href={`/skills/${skill.id}`} className="block">
          <div className="flex items-center gap-3 p-3 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-200">
            <div className="flex-shrink-0 w-9 h-9 rounded-md bg-zinc-800 flex items-center justify-center text-lg">
              {skill.category === "Code" ? "💻" :
               skill.category === "Writing" ? "✍️" :
               skill.category === "Research" ? "🔬" :
               skill.category === "Data" ? "📊" :
               skill.category === "Productivity" ? "⚡" :
               skill.category === "Marketing" ? "📣" :
               skill.category === "Business" ? "💼" :
               skill.category === "Education" ? "📚" :
               skill.category === "Design" ? "🎨" : "🔍"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-zinc-200 group-hover:text-white truncate">{skill.name}</p>
              <p className="text-xs text-zinc-500 truncate">{skill.category}</p>
            </div>
            <Badge variant="difficulty" difficulty={skill.difficulty} className="flex-shrink-0">
              {skill.difficulty}
            </Badge>
          </div>
        </Link>
        {/* Favorite button overlaid at top-right, outside the Link */}
        <div className="absolute top-1.5 right-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <FavoriteButton skillId={skill.id} />
        </div>
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <div className="group relative block h-full">
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
                {skill.category === "Code" ? "💻" :
                 skill.category === "Writing" ? "✍️" :
                 skill.category === "Research" ? "🔬" :
                 skill.category === "Data" ? "📊" :
                 skill.category === "Productivity" ? "⚡" :
                 skill.category === "Marketing" ? "📣" :
                 skill.category === "Business" ? "💼" :
                 skill.category === "Education" ? "📚" :
                 skill.category === "Design" ? "🎨" : "🔍"}
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

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {skill.rating && <StarRating rating={skill.rating} />}
                {skill.downloads && (
                  <span className="text-zinc-600 text-xs">
                    {formatNumber(skill.downloads)} uses
                  </span>
                )}
              </div>
              <Badge variant="difficulty" difficulty={skill.difficulty}>
                {skill.difficulty}
              </Badge>
            </div>
          </div>
        </Link>

        {/* Favorite button — always visible on mobile, hover-reveal on desktop */}
        <div className="absolute top-3 right-3 z-10 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
          <FavoriteButton skillId={skill.id} />
        </div>
      </div>
    );
  }

  // Default card
  return (
    <div className="group relative block h-full">
      <Link href={`/skills/${skill.id}`} className="block h-full">
        <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-200 card-hover h-full">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-lg flex-shrink-0">
                {skill.category === "Code" ? "💻" :
                 skill.category === "Writing" ? "✍️" :
                 skill.category === "Research" ? "🔬" :
                 skill.category === "Data" ? "📊" :
                 skill.category === "Productivity" ? "⚡" :
                 skill.category === "Marketing" ? "📣" :
                 skill.category === "Business" ? "💼" :
                 skill.category === "Education" ? "📚" :
                 skill.category === "Design" ? "🎨" : "🔍"}
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

          <div className="flex items-center justify-between">
            <Badge variant="category" category={skill.category}>
              {skill.category}
            </Badge>
            <div className="flex items-center gap-3">
              {skill.rating && <StarRating rating={skill.rating} />}
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
                <Badge key={tag} variant="tag">
                  #{tag}
                </Badge>
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

      {/* Favorite button — always visible on mobile, hover-reveal on desktop */}
      <div className="absolute top-3 right-3 z-10 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
        <FavoriteButton skillId={skill.id} />
      </div>
    </div>
  );
}
