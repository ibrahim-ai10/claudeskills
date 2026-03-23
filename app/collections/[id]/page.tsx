import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { collections, getCollectionById } from "@/data/collections";
import { getSkillById } from "@/data/skills";
import { Badge } from "@/components/ui/Badge";
import { SkillCard } from "@/components/SkillCard";
import { CollectionActions } from "@/components/CollectionActions";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return collections.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const collection = getCollectionById(id);
  if (!collection) return {};
  return {
    title: `${collection.title} — claudeskills`,
    description: collection.description,
    openGraph: {
      title: `${collection.title} — claudeskills`,
      description: collection.description,
    },
  };
}

const difficultyColors = {
  beginner: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  intermediate: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  advanced: "text-purple-400 bg-purple-400/10 border-purple-400/20",
};

export default async function CollectionDetailPage({ params }: Props) {
  const { id } = await params;
  const collection = getCollectionById(id);

  if (!collection) notFound();

  const collectionSkills = collection.skills
    .map((skillId) => getSkillById(skillId))
    .filter(Boolean);

  const beginnerCount = collectionSkills.filter(
    (s) => s!.difficulty === "beginner"
  ).length;
  const intermediateCount = collectionSkills.filter(
    (s) => s!.difficulty === "intermediate"
  ).length;
  const advancedCount = collectionSkills.filter(
    (s) => s!.difficulty === "advanced"
  ).length;

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero */}
      <section className="border-b border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
            <Link href="/" className="hover:text-zinc-300 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/collections"
              className="hover:text-zinc-300 transition-colors"
            >
              Collections
            </Link>
            <span>/</span>
            <span className="text-zinc-300">{collection.title}</span>
          </nav>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Cover image */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-5xl flex-shrink-0 shadow-lg">
              {collection.coverImage}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {collection.featured && (
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Featured
                  </span>
                )}
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full border ${difficultyColors[collection.difficulty]}`}
                >
                  {collection.difficulty}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-zinc-100 leading-tight mb-3">
                {collection.title}
              </h1>

              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl mb-5">
                {collection.description}
              </p>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 mb-6">
                <div className="flex items-center gap-1.5">
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>by {collection.author}</span>
                </div>
                <div className="flex items-center gap-1.5">
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{formatDate(collection.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1.5">
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
                    {collectionSkills.length} skill
                    {collectionSkills.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <Badge variant="category" category={collection.category as never}>
                  {collection.category}
                </Badge>
              </div>

              {/* Action buttons */}
              <CollectionActions
                collectionId={collection.id}
                collectionTitle={collection.title}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main skills grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-zinc-100">
                Skills in this Collection
              </h2>
              <span className="text-zinc-500 text-sm">
                {collectionSkills.length} skills
              </span>
            </div>

            {collectionSkills.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {collectionSkills.map((skill) => (
                  <SkillCard key={skill!.id} skill={skill!} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 rounded-xl border border-zinc-800 bg-zinc-900/40">
                <div className="text-4xl mb-3">📭</div>
                <p className="text-zinc-400">No skills found in this collection.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Difficulty breakdown */}
            <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/60 space-y-4">
              <h3 className="font-semibold text-zinc-100">Difficulty Breakdown</h3>
              {beginnerCount > 0 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-sm text-zinc-400">Beginner</span>
                  </div>
                  <span className="text-sm font-medium text-zinc-300">
                    {beginnerCount}
                  </span>
                </div>
              )}
              {intermediateCount > 0 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                    <span className="text-sm text-zinc-400">Intermediate</span>
                  </div>
                  <span className="text-sm font-medium text-zinc-300">
                    {intermediateCount}
                  </span>
                </div>
              )}
              {advancedCount > 0 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                    <span className="text-sm text-zinc-400">Advanced</span>
                  </div>
                  <span className="text-sm font-medium text-zinc-300">
                    {advancedCount}
                  </span>
                </div>
              )}
            </div>

            {/* Collection details */}
            <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/60 space-y-3">
              <h3 className="font-semibold text-zinc-100">Details</h3>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Category</span>
                <Badge variant="category" category={collection.category as never}>
                  {collection.category}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Difficulty</span>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full border ${difficultyColors[collection.difficulty]}`}
                >
                  {collection.difficulty}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Skills</span>
                <span className="text-zinc-300 font-medium">
                  {collectionSkills.length}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Created</span>
                <span className="text-zinc-300">
                  {formatDate(collection.createdAt)}
                </span>
              </div>
            </div>

            {/* Use with Claude CTA */}
            <div className="p-5 rounded-xl border border-blue-500/20 bg-blue-500/5">
              <h3 className="font-semibold text-zinc-100 mb-2">
                Use with Claude
              </h3>
              <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
                Open any skill, copy its prompt, and paste it into Claude.ai to
                get started immediately.
              </p>
              <a
                href="https://claude.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2.5 rounded-lg transition-colors text-sm shadow-sm shadow-blue-900/30"
              >
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
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Open Claude.ai
              </a>
            </div>

            {/* Browse more */}
            <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/60">
              <h3 className="font-semibold text-zinc-100 mb-3">
                More Collections
              </h3>
              <Link
                href="/collections"
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
              >
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
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
                Browse all collections
              </Link>
              <Link
                href="/skills"
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors mt-2"
              >
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Browse all skills
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
