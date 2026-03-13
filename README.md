# ClaudeSkills

A curated directory of Claude AI Skills, Prompts, and Integrations — inspired by [cursor.directory](https://cursor.directory).

Browse battle-tested, structured prompt templates for Claude AI across categories like Code, Writing, Research, Data, Marketing, and more.

## Features

- **18 curated skills** across 8 categories with real, usable prompt content
- **Real-time search & filter** by category, difficulty, and keywords
- **Copy to clipboard** — one click to grab any full prompt
- **Skill detail pages** statically generated for performance (SSG)
- **Dark-first design** — clean, minimal, developer-friendly UI
- **Fully responsive** — mobile, tablet, desktop
- **Supabase-ready** — structure prepared for Phase 2 auth & submissions

## Tech Stack

- **Next.js 16** (App Router, SSG)
- **React 19** + **TypeScript 5**
- **Tailwind CSS 4**
- **clsx** for conditional class names

## Getting Started

```bash
# Clone and install
git clone https://github.com/yourusername/claudeskills.git
cd claudeskills
npm install

# Development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run start
```

## Project Structure

```
claudeskills/
├── app/
│   ├── layout.tsx              # Root layout (Navigation + Footer)
│   ├── page.tsx                # Homepage
│   ├── about/page.tsx          # About + FAQ
│   └── skills/
│       ├── page.tsx            # Directory (search + filter)
│       └── [id]/page.tsx       # Skill detail (SSG)
├── components/
│   ├── ui/Badge.tsx            # Category/difficulty badges
│   ├── ui/Button.tsx           # Button component
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── SkillCard.tsx           # Card (3 variants)
│   ├── SkillGrid.tsx
│   ├── SkillsDirectoryClient.tsx
│   ├── SearchBar.tsx
│   ├── FilterSidebar.tsx
│   └── CopyButton.tsx
├── data/skills.ts              # 18 curated skills (source of truth)
├── lib/utils.ts
├── types/skill.ts
└── .env.example                # Supabase env template
```

## Adding Skills

Add a new entry to `data/skills.ts`:

```typescript
{
  id: "unique-slug",
  name: "Skill Name",
  description: "Short description.",
  category: "Code",           // Code | Writing | Research | Data | etc.
  tags: ["tag1", "tag2"],
  difficulty: "beginner",     // beginner | intermediate | advanced
  author: "Author Name",
  rating: 4.5,
  downloads: 0,
  featured: false,
  createdAt: "2025-03-13",
  skillContent: `Your full prompt here...`,
}
```

## Deployment (Vercel)

1. Push to GitHub
2. Import project at vercel.com
3. Deploy — no env vars required for MVP

## Roadmap

| Phase | Status | Features |
|-------|--------|---------|
| 1 | ✅ Done | Read-only skills directory |
| 2 | ⏳ | User auth (Supabase), saved skills |
| 3 | ⏳ | Community submissions + moderation |
| 4 | ⏳ | Monetization, featured placements |
| 5 | ⏳ | Analytics, ratings, reviews |

## License

MIT
