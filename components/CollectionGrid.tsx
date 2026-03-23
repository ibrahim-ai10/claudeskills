import { Collection } from "@/types/collection";
import { CollectionCard } from "@/components/CollectionCard";

interface CollectionGridProps {
  collections: Collection[];
  variant?: "default" | "featured";
}

export function CollectionGrid({
  collections,
  variant = "default",
}: CollectionGridProps) {
  if (collections.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-4">📭</div>
        <p className="text-zinc-400 text-lg font-medium">No collections found</p>
        <p className="text-zinc-600 text-sm mt-1">Check back soon for new curated collections.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {collections.map((collection) => (
        <CollectionCard
          key={collection.id}
          collection={collection}
          variant={variant}
        />
      ))}
    </div>
  );
}
