import Link from "next/link";
import { Collection } from "@/types/collection";
import { Badge } from "@/components/ui/Badge";

interface CollectionCardProps {
  collection: Collection;
  variant?: "default" | "featured";
}

const difficultyColors = {
  beginner: "text-emerald-400",
  intermediate: "text-blue-400",
  advanced: "text-purple-400",
};

export function CollectionCard({
  collection,
  variant = "default",
}: CollectionCardProps) {
  const skillCount = collection.skills.length;

  if (variant === "featured") {
    return (
      <Link href={`/collections/${collection.id}`} className="group block">
        <div className="relative p-6 rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-900/10 transition-all duration-200 card-hover h-full">
          {collection.featured && (
            <div className="absolute top-4 right-4">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Featured
              </span>
            </div>
          )}

          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-3xl flex-shrink-0">
              {collection.coverImage}
            </div>
            <div className="min-w-0 flex-1 pt-1">
              <h3 className="font-semibold text-zinc-100 group-hover:text-white transition-colors text-lg leading-snug">
                {collection.title}
              </h3>
              <div className="flex items-center gap-2 mt-1.5">
                <Badge variant="category" category={collection.category as never}>
                  {collection.category}
                </Badge>
                <span
                  className={`text-xs font-medium ${difficultyColors[collection.difficulty]}`}
                >
                  {collection.difficulty}
                </span>
              </div>
            </div>
          </div>

          <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2 mb-5">
            {collection.description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
            <div className="flex items-center gap-1.5 text-zinc-500 text-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <span>
                {skillCount} skill{skillCount !== 1 ? "s" : ""}
              </span>
            </div>
            <span className="text-zinc-600 text-xs">by {collection.author}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/collections/${collection.id}`} className="group block">
      <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-200 card-hover h-full">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-11 h-11 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-2xl flex-shrink-0">
            {collection.coverImage}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-zinc-200 group-hover:text-white transition-colors text-sm leading-snug">
              {collection.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="category" category={collection.category as never}>
                {collection.category}
              </Badge>
            </div>
          </div>
        </div>

        <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2 mb-4">
          {collection.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
          <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <span>
              {skillCount} skill{skillCount !== 1 ? "s" : ""}
            </span>
          </div>
          <span
            className={`text-xs font-medium ${difficultyColors[collection.difficulty]}`}
          >
            {collection.difficulty}
          </span>
        </div>
      </div>
    </Link>
  );
}
