import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSkillById, getRelatedSkills, skills } from "@/data/skills";
import { Badge } from "@/components/ui/Badge";
import { SkillGrid } from "@/components/SkillGrid";
import { CopyButton } from "@/components/CopyButton";
import { formatDate, formatNumber } from "@/lib/utils";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return skills.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const skill = getSkillById(id);
  if (!skill) return {};
  return {
    title: skill.name,
    description: skill.description,
  };
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${
            star <= Math.round(rating) ? "text-yellow-400" : "text-zinc-700"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-zinc-400 text-sm font-medium ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

export default async function SkillDetailPage({ params }: Props) {
  const { id } = await params;
  const skill = getSkillById(id);

  if (!skill) notFound();

  const related = getRelatedSkills(skill, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
        <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/skills" className="hover:text-zinc-300 transition-colors">Skills</Link>
        <span>/</span>
        <span className="text-zinc-300">{skill.name}</span>
      </nav>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/60">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-2xl flex-shrink-0">
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
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <h1 className="text-2xl font-bold text-zinc-50">{skill.name}</h1>
                  {skill.featured && (
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex-shrink-0">
                      Featured
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <Badge variant="category" category={skill.category}>
                    {skill.category}
                  </Badge>
                  <Badge variant="difficulty" difficulty={skill.difficulty}>
                    {skill.difficulty}
                  </Badge>
                </div>
              </div>
            </div>

            <p className="text-zinc-300 leading-relaxed">{skill.description}</p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-5 mt-5 pt-5 border-t border-zinc-800">
              {skill.rating && <StarRating rating={skill.rating} />}
              {skill.downloads && (
                <div className="flex items-center gap-1.5 text-zinc-500 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>{formatNumber(skill.downloads)} uses</span>
                </div>
              )}
              {skill.author && (
                <div className="flex items-center gap-1.5 text-zinc-500 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{skill.author}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-zinc-500 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(skill.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Skill Prompt */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800 bg-zinc-900">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-zinc-700" />
                  <span className="w-3 h-3 rounded-full bg-zinc-700" />
                  <span className="w-3 h-3 rounded-full bg-zinc-700" />
                </div>
                <span className="text-zinc-500 text-xs font-mono ml-1">skill-prompt.md</span>
              </div>
              <CopyButton text={skill.skillContent} />
            </div>
            <div className="p-5 overflow-x-auto">
              <pre className="text-sm text-zinc-300 font-mono whitespace-pre-wrap leading-relaxed">
                {skill.skillContent}
              </pre>
            </div>
          </div>

          {/* Tags */}
          {skill.tags.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-zinc-400 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {skill.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/skills?search=${tag}`}
                    className="text-xs px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Use with Claude CTA */}
          <div className="p-5 rounded-xl border border-blue-500/20 bg-blue-500/5">
            <h3 className="font-semibold text-zinc-100 mb-2">Use with Claude</h3>
            <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
              Copy the prompt above and paste it into Claude.ai to get started immediately.
            </p>
            <a
              href="https://claude.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2.5 rounded-lg transition-colors text-sm shadow-sm shadow-blue-900/30"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open Claude.ai
            </a>
          </div>

          {/* Share */}
          <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/60">
            <h3 className="font-semibold text-zinc-100 mb-3">Share</h3>
            <CopyButton
              text={
                typeof window !== "undefined"
                  ? window.location.href
                  : `https://claudeskills.com/skills/${skill.id}`
              }
              label="Copy link"
              className="w-full justify-center"
            />
          </div>

          {/* Quick info */}
          <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/60 space-y-3">
            <h3 className="font-semibold text-zinc-100 mb-1">Details</h3>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-500">Category</span>
              <Badge variant="category" category={skill.category}>{skill.category}</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-500">Difficulty</span>
              <Badge variant="difficulty" difficulty={skill.difficulty}>{skill.difficulty}</Badge>
            </div>
            {skill.rating && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Rating</span>
                <span className="text-yellow-400 font-medium">{skill.rating}/5</span>
              </div>
            )}
            {skill.downloads && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Uses</span>
                <span className="text-zinc-300">{formatNumber(skill.downloads)}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-500">Added</span>
              <span className="text-zinc-300">{formatDate(skill.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Skills */}
      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="text-xl font-bold text-zinc-100 mb-6">Related Skills</h2>
          <SkillGrid skills={related} />
        </div>
      )}
    </div>
  );
}
