# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Astro 5 portfolio and blog site (rafay99.com) with React 19 islands, TinaCMS for content management, Tailwind CSS styling, and Vercel deployment with ISR.

**Important workflow guidelines for assistants:**

- **Use Bun only**: Always use `bun` as the package manager (`bun run ...`, `bun x ...`). Do **not** introduce other package managers (npm, pnpm, yarn) or change the existing tooling.
- **Dev server lifecycle**: Assume the dev server is already running during normal work sessions. Do **not** start or restart `bun run dev` unless explicitly asked, or when required after a TinaCMS config/schema change.
- **Validate your changes**: After non-trivial code changes, you may verify your work with:
  - `bun run lint` / `bun run lint:fix` (Prettier + TypeScript type check)
  - `bun run check` (Astro diagnostics for components/templates)
- **TinaCMS config changes**: If you modify anything in `tina/config.ts` or related TinaCMS collections, you **must** run `bun run dev` once locally to regenerate TinaCMS types and sync schema with the Tina cloud backend.
- **.sitepins CMS prototype**: A second, experimental CMS is configured under `.sitepins/` (see `.sitepins/config.json` and `.sitepins/schema/*.json`). Treat this as a prototype: keep schemas in sync with `src/content/config.ts`, and do not remove or radically change it unless explicitly requested.

## Commands

```bash
# Development
bun run dev              # Start dev server with TinaCMS (requires TINA_TOKEN)
bun run dev:local        # Start dev server without CMS (local-only work)
bun run preview          # Preview production build locally

# Building
bun run build            # Astro build only
bun run production_build # TinaCMS build + Astro build (full production)

# Code quality
bun run lint             # TypeScript type check (tsc --noEmit) + formatting check
bun run lint:fix         # Auto-format with Prettier
bun run check            # Astro diagnostics (template/component checks)

# Performance / tooling
bun run scan             # Run react-scan against local dev server
bun run changelog        # Generate changelog via ./scripts/generate-changelog.sh
```

## Architecture

**Rendering**: SSR mode (`output: "server"`) on Vercel with ISR caching.

**Islands Architecture**: Astro components handle static content; React components (under `ReactComponent/`) provide client-side interactivity. React integration only includes files matching `**/ReactComponent/**` and `**/*.{jsx,tsx}`.

**Content Collections**: Two Zod-validated collections in `src/content/`:

- `blog/` (MDX) - articles with draft/archived/featured flags, tags, SEO fields
- `projects/` (MDX) - portfolio items with tech stack, categories, links

**TinaCMS**: Config in `tina/config.ts`. Also manages feature flags and site configuration as JSON collections. Admin UI at `/admin`.

**Feature Flags**: `src/config/featureFlag/featureFlag.json` toggles site sections (blog, projects, wiki, etc.) and API endpoints. Check these flags when adding new pages or sections.

**API Routes**: `src/pages/api/` contains server endpoints (article, author, project). These are Astro API routes returning JSON.

**Layouts**: `src/layouts/` has per-content-type layouts (BlogPost, Project). `BaseHead.astro` in `src/components/AstroComponent/base/` handles shared `<head>` metadata.

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
