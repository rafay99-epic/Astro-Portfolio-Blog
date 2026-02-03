# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Astro 5 portfolio and blog site (rafay99.com) with React 19 islands, TinaCMS for content management, Tailwind CSS styling, and Vercel deployment with ISR.

## Commands

```bash
# Development
npm run dev              # Start dev server with TinaCMS (requires TINA_TOKEN)
npm run dev:local        # Start dev server without CMS (use this for local-only work)
npm run preview          # Preview production build locally

# Building
npm run build            # Astro build only
npm run production_build # TinaCMS build + Astro build (full production)

# Code quality
npm run lint             # Prettier check + TypeScript type check (tsc --noEmit)
npm run lint:fix         # Auto-format with Prettier
npm run check            # Astro diagnostics (template/component checks)
```

## Architecture

**Rendering**: SSR mode (`output: "server"`) on Vercel with ISR caching.

**Islands Architecture**: Astro components handle static content; React components (under `ReactComponent/`) provide client-side interactivity. React integration only includes files matching `**/ReactComponent/**` and `**/*.{jsx,tsx}`.

**Content Collections**: Four Zod-validated collections in `src/content/`:
- `blog/` (MDX) - articles with draft/archived/featured flags, tags, SEO fields
- `projects/` (MDX) - portfolio items with tech stack, categories, links
- `newsletter/` (MDX) - newsletter archives
- `ms_notes/` (MD) - lecture notes with subject and lecture number

**TinaCMS**: Config in `tina/config.ts`. Also manages feature flags and site configuration as JSON collections. Admin UI at `/admin`.

**Feature Flags**: `src/config/featureFlag/featureFlag.json` toggles site sections (blog, projects, newsletter, wiki, etc.) and API endpoints. Check these flags when adding new pages or sections.

**API Routes**: `src/pages/api/` contains server endpoints (article, author, project, letter, ms_notes, subscribe). These are Astro API routes returning JSON.

**Layouts**: `src/layouts/` has per-content-type layouts (BlogPost, Project, Newsletter, MSNotes). `BaseHead.astro` in `src/components/AstroComponent/base/` handles shared `<head>` metadata.

## Path Aliases

```
@assets     → src/assets
@components → src/components
@astro      → src/components/AstroComponent
@react      → src/components/ReactComponent
@content    → src/content
@layouts    → src/layouts
@pages      → src/pages
@styles     → src/styles
@types      → src/types
@config     → src/config
@hooks      → src/hooks
@server     → src/server
@util       → src/util
```

## Key Conventions

- **Markdown**: Shiki syntax highlighting with Tokyo Night theme. Mermaid blocks excluded from syntax highlighting (rendered client-side). Reading time calculated via remark plugin (`remark-reading-time.mjs`).
- **Tailwind theme**: Custom color system defined in `src/config/theme/colors.ts` (Tokyo Night inspired). Poppins font. Custom `mobile` breakpoint at max 767px.
- **Build optimization**: Terser minification removes all `console.*` and `debugger` in production. Manual chunk splitting for react-vendor, ui-components, and vendor-mermaid.
- **React Compiler**: Enabled via babel plugin (`babel-plugin-react-compiler`).
- **Formatting**: Prettier with astro and tailwind plugins (class sorting). No semicolons are NOT enforced — the codebase uses semicolons.
- **Content drafts**: Both `draft` and `archived` boolean fields control content visibility. Filter these when querying collections.
