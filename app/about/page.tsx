import type { Metadata } from "next";
import Link from "next/link";
import { skills } from "@/data/skills";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about ClaudeSkills — what Claude Skills are, how to use them, and how to submit your own.",
};

const USE_CASES = [
  {
    icon: "💻",
    title: "Developers",
    description:
      "Code review, SQL queries, API documentation, system architecture — get expert-level output from Claude with the right prompt structure.",
  },
  {
    icon: "✍️",
    title: "Writers & Marketers",
    description:
      "Email campaigns, SEO-optimized content, social media strategies, and compelling copy — all with consistent quality and tone.",
  },
  {
    icon: "🔬",
    title: "Researchers & Analysts",
    description:
      "Synthesize sources, analyze data, build financial models, and extract insights from complex information quickly.",
  },
  {
    icon: "💼",
    title: "Business & Product",
    description:
      "PRDs, investor pitches, meeting facilitation, competitive analysis — structured prompts that get boardroom-ready results.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Browse the directory",
    description:
      "Search by category, difficulty, or keyword to find the right skill for your task.",
  },
  {
    step: "02",
    title: "Copy the prompt",
    description:
      "Click 'Copy prompt' to get the full skill template copied to your clipboard.",
  },
  {
    step: "03",
    title: "Customize & use",
    description:
      "Paste into Claude.ai, fill in the bracketed placeholders with your specifics, and get expert results.",
  },
];

const FAQ = [
  {
    q: "What are Claude Skills?",
    a: "Claude Skills are structured prompt templates designed to unlock Claude's full capabilities for specific tasks. Unlike simple prompts, Skills define a role, a framework, output format, and quality standards — so Claude acts like a specialist, not a generalist.",
  },
  {
    q: "Do I need a Claude Pro subscription?",
    a: "No — all skills work with the free Claude.ai tier. Some skills with very long outputs may benefit from Claude Pro's extended context, but all are designed to work well within standard limits.",
  },
  {
    q: "Can I use these skills with the Claude API?",
    a: "Yes! These prompts work as system prompts or user messages via the Anthropic API. They're designed to be model-agnostic and work great with claude-sonnet, claude-haiku, and claude-opus.",
  },
  {
    q: "How do I submit my own skill?",
    a: "Skill submission is coming in Phase 2. For now, you can open a GitHub issue with your skill idea and we'll review it for inclusion.",
  },
  {
    q: "Are these skills free to use?",
    a: "Yes — all skills in the directory are free to use for personal and commercial projects. Attribution is appreciated but not required.",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-zinc-50 mb-4">
          About ClaudeSkills
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          A curated, community-driven directory of Claude AI Skills — structured
          prompt templates that turn Claude from a capable chatbot into a
          specialist for any task.
        </p>
      </div>

      {/* What are skills */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-zinc-100 mb-4">What are Claude Skills?</h2>
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/60 space-y-4 text-zinc-300 leading-relaxed">
          <p>
            A <strong className="text-zinc-100">Claude Skill</strong> is a
            carefully engineered prompt template that instructs Claude to behave
            as a specialist. Instead of asking Claude a vague question, a Skill
            defines:
          </p>
          <ul className="space-y-2 pl-4">
            {[
              "A specific role and area of expertise",
              "A structured framework or methodology to follow",
              "Expected output format with sections and examples",
              "Quality standards and edge cases to handle",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p>
            The result? Claude delivers outputs that are consistent, thorough, and
            immediately useful — no back-and-forth required.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-zinc-100 mb-6">How to use a Skill</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {HOW_IT_WORKS.map((step) => (
            <div key={step.step} className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/60">
              <div className="text-3xl font-bold text-zinc-700 font-mono mb-3">
                {step.step}
              </div>
              <h3 className="font-semibold text-zinc-100 mb-2">{step.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use cases */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-zinc-100 mb-6">Who is this for?</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {USE_CASES.map((uc) => (
            <div
              key={uc.title}
              className="flex gap-4 p-5 rounded-xl border border-zinc-800 bg-zinc-900/60"
            >
              <span className="text-2xl flex-shrink-0">{uc.icon}</span>
              <div>
                <h3 className="font-semibold text-zinc-100 mb-1.5">{uc.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{uc.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="mb-16 p-6 rounded-xl border border-zinc-800 bg-zinc-900/60">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-zinc-50">{skills.length}</p>
            <p className="text-zinc-500 text-sm mt-1">Skills available</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-zinc-50">
              {new Set(skills.map((s) => s.category)).size}
            </p>
            <p className="text-zinc-500 text-sm mt-1">Categories</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-zinc-50">Free</p>
            <p className="text-zinc-500 text-sm mt-1">Always</p>
          </div>
        </div>
      </section>

      {/* Submit a skill */}
      <section className="mb-16" id="submit">
        <h2 className="text-2xl font-bold text-zinc-100 mb-4">Submit a Skill</h2>
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/60">
          <p className="text-zinc-400 leading-relaxed mb-5">
            Have a Claude prompt that delivers consistently great results? We&apos;d
            love to include it in the directory. Community submissions are coming
            in Phase 2.
          </p>
          <p className="text-zinc-500 text-sm mb-5">
            In the meantime, you can open a GitHub issue with your skill idea:
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-2 text-sm text-zinc-400">
              <span className="text-blue-400">→</span>
              <span>Include a clear name and description</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-zinc-400">
              <span className="text-blue-400">→</span>
              <span>Choose a category and difficulty level</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-zinc-400">
              <span className="text-blue-400">→</span>
              <span>Show 2-3 example use cases</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-zinc-100 mb-6">FAQ</h2>
        <div className="space-y-3">
          {FAQ.map((item) => (
            <div
              key={item.q}
              className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/60"
            >
              <h3 className="font-semibold text-zinc-100 mb-2">{item.q}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="text-center p-8 rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950">
        <h2 className="text-xl font-bold text-zinc-100 mb-2">
          Ready to get started?
        </h2>
        <p className="text-zinc-400 text-sm mb-5">
          Browse {skills.length} curated Claude Skills — free, forever.
        </p>
        <Link
          href="/skills"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-2.5 rounded-lg transition-colors text-sm shadow-sm shadow-blue-900/30"
        >
          Browse All Skills
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
