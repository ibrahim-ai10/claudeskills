import { Metadata } from "next";
import { collections, featuredCollections } from "@/data/collections";
import { CollectionGrid } from "@/components/CollectionGrid";
import { CollectionCard } from "@/components/CollectionCard";

export const metadata: Metadata = {
  title: "Skill Collections — claudeskills",
  description:
    "Curated collections of AI skills organized by theme. Find the perfect set of prompts for writing, coding, data analysis, research, and more.",
  openGraph: {
    title: "Skill Collections — claudeskills",
    description:
      "Curated collections of AI skills organized by theme. Find the perfect set of prompts for writing, coding, data analysis, research, and more.",
  },
};

export default function CollectionsPage() {
  const allCollections = collections;
  const featured = featuredCollections;
  const rest = allCollections.filter((c) => !c.featured);

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero */}
      <section className="border-b border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-wide">
                Curated
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 leading-tight mb-4">
              Skill{" "}
              <span className="gradient-text">Collections</span>
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed">
              Handpicked sets of AI skills organized by theme. Whether you need
              to write better, code faster, or analyze data — we've grouped the
              best skills to get you started quickly.
            </p>

            <div className="flex items-center gap-6 mt-8 pt-8 border-t border-zinc-800">
              <div>
                <p className="text-2xl font-bold text-zinc-100">{allCollections.length}</p>
                <p className="text-sm text-zinc-500">Collections</p>
              </div>
              <div className="w-px h-8 bg-zinc-800" />
              <div>
                <p className="text-2xl font-bold text-zinc-100">
                  {allCollections.reduce((sum, c) => sum + c.skills.length, 0)}
                </p>
                <p className="text-sm text-zinc-500">Skills included</p>
              </div>
              <div className="w-px h-8 bg-zinc-800" />
              <div>
                <p className="text-2xl font-bold text-zinc-100">{featured.length}</p>
                <p className="text-sm text-zinc-500">Featured</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Featured collections */}
        {featured.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-zinc-100">
                  Featured Collections
                </h2>
                <p className="text-zinc-500 text-sm mt-0.5">
                  Our most popular curated skill sets
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((collection) => (
                <CollectionCard
                  key={collection.id}
                  collection={collection}
                  variant="featured"
                />
              ))}
            </div>
          </section>
        )}

        {/* All other collections */}
        {rest.length > 0 && (
          <section>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-zinc-100">
                All Collections
              </h2>
              <p className="text-zinc-500 text-sm mt-0.5">
                Explore every curated collection
              </p>
            </div>
            <CollectionGrid collections={rest} />
          </section>
        )}
      </div>
    </div>
  );
}
