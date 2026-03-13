import Link from "next/link";
import { featuredSkills, skills, stats } from "@/data/skills";
import { SkillGrid } from "@/components/SkillGrid";
import { CATEGORY_ICONS, CATEGORY_COLORS } from "@/lib/utils";

const CATEGORY_LIST = [
  { name: "Code", count: skills.filter((s) => s.category === "Code").length },
  { name: "Writing", count: skills.filter((s) => s.category === "Writing").length },
  { name: "Research", count: skills.filter((s) => s.category === "Research").length },
  { name: "Productivity", count: skills.filter((s) => s.category === "Productivity").length },
  { name: "Data", count: skills.filter((s) => s.category === "Data").length },
  { name: "Marketing", count: skills.filter((s) => s.category === "Marketing").length },
  { name: "Business", count: skills.filter((s) => s.category === "Business").length },
  { name: "Education", count: skills.filter((s) => s.category === "Education").length },
];

const STAT_ITEMS = [
  { label: "Skills", value: stats.totalSkills.toString(), icon: "⚡" },
  { label: "Downloads", value: `${Math.round(stats.totalDownloads / 1000)}k+`, icon: "📥" },
  { label: "Categories", value: stats.categories.toString(), icon: "🏷️" },
  { label: "Contributors", value: stats.totalContributors.toString(), icon: "👥" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-800/60">
        {/* Background glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute top-20 left-1/4 w-[300px] h-[200px] bg-purple-500/5 rounded-full blur-2xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            18 Skills available — more added weekly
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-50 mb-5 leading-[1.1]">
            The Skills Directory{" "}
            <span className="gradient-text">for Claude AI</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Browse curated, battle-tested prompts and skill templates for{" "}
            <span className="text-zinc-300">Claude AI</span>. Copy, use, and
            ship faster with the right prompt for every task.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/skills"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-lg shadow-blue-900/30 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Browse All Skills
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2 border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-zinc-100 font-medium px-6 py-3 rounded-lg transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              What are Skills?
            </Link>
          </div>

          {/* Hero hint tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {["Resume Optimizer", "Code Reviewer", "SQL Builder", "SEO Writer", "PRD Writer"].map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500"
              >
                {tag}
              </span>
            ))}
            <span className="text-xs text-zinc-600">& more</span>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-zinc-800/60 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {STAT_ITEMS.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <span className="text-2xl">{stat.icon}</span>
                <div>
                  <p className="text-xl font-bold text-zinc-100">{stat.value}</p>
                  <p className="text-xs text-zinc-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Skills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-zinc-100">Featured Skills</h2>
            <p className="text-zinc-500 text-sm mt-1">
              Most popular and highly-rated prompts this week
            </p>
          </div>
          <Link
            href="/skills"
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5"
          >
            View all
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
        <SkillGrid skills={featuredSkills} variant="featured" />
      </section>

      {/* Categories */}
      <section className="border-t border-zinc-800/60 bg-zinc-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-zinc-100 mb-2">Browse by Category</h2>
            <p className="text-zinc-500 text-sm">
              Find the right skill for every use case
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {CATEGORY_LIST.map((cat) => (
              <Link
                key={cat.name}
                href={`/skills?category=${cat.name}`}
                className="group p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-200 card-hover"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{CATEGORY_ICONS[cat.name]}</span>
                  <svg className="w-4 h-4 text-zinc-700 group-hover:text-zinc-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <h3 className="font-medium text-zinc-200 group-hover:text-white transition-colors text-sm">
                  {cat.name}
                </h3>
                <p className="text-zinc-600 text-xs mt-0.5">
                  {cat.count} skill{cat.count !== 1 ? "s" : ""}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recently Added */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-zinc-100">Recently Added</h2>
            <p className="text-zinc-500 text-sm mt-1">The latest additions to the directory</p>
          </div>
          <Link
            href="/skills?sort=newest"
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5"
          >
            All new skills
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
        <SkillGrid
          skills={[...skills]
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 6)}
        />
      </section>

      {/* CTA / Newsletter */}
      <section className="border-t border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-zinc-100 mb-3">
              Stay updated with new skills
            </h2>
            <p className="text-zinc-400 mb-8">
              Get notified when new Claude skills are added. No spam, unsubscribe anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder-zinc-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2.5 rounded-lg transition-colors text-sm whitespace-nowrap shadow-sm shadow-blue-900/30">
                Get Updates
              </button>
            </div>
            <p className="text-zinc-600 text-xs mt-3">
              Join 500+ developers and AI enthusiasts
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
