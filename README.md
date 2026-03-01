<div align="center">
  <img src="https://7huqjqx8yo.ufs.sh/f/TViMykBJnLIJ0vJwX0UyjPi0LTu2YFIrUpwecAbsgvfR1zoN" alt="rafay99.com — Portfolio & Blog" width="720" />

  <br />
  <br />

  # rafay99.com

  **A blazing-fast portfolio, blog, and digital garden built with modern web technologies.**

  <br />

  [![Live Site](https://img.shields.io/badge/Live_Site-rafay99.com-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://www.rafay99.com)

  <br />

  [![Astro](https://img.shields.io/badge/Astro_5-FF5D01?style=flat-square&logo=astro&logoColor=white)](https://astro.build/)
  [![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Sitepins](https://img.shields.io/badge/Sitepins_CMS-4F46E5?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0xMiAyTDIgN2wxMCA1IDEwLTUtMTAtNXoiLz48cGF0aCBkPSJNMiAxN2wxMCA1IDEwLTUiLz48cGF0aCBkPSJNMiAxMmwxMCA1IDEwLTUiLz48L3N2Zz4=&logoColor=white)](https://sitepins.com/)
  [![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)

  <br />

  [![GitHub Stars](https://img.shields.io/github/stars/rafay99-epic/Astro-Portfolio-Blog?style=flat-square&logo=github&label=Stars)](https://github.com/rafay99-epic/Astro-Portfolio-Blog)
  [![License](https://img.shields.io/github/license/rafay99-epic/Astro-Portfolio-Blog?style=flat-square&label=License)](LICENSE)
  [![Last Commit](https://img.shields.io/github/last-commit/rafay99-epic/Astro-Portfolio-Blog?style=flat-square&label=Last%20Commit)](https://github.com/rafay99-epic/Astro-Portfolio-Blog/commits/main)

  <br />

  [Report Bug](https://github.com/rafay99-epic/Astro-Portfolio-Blog/issues) &middot; [Request Feature](https://github.com/rafay99-epic/Astro-Portfolio-Blog/issues)

</div>

<br />

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scripts Reference](#scripts-reference)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Documentation & Resources](#documentation--resources)
- [License](#license)
- [Contact](#contact)

---

## Overview

A server-side rendered personal website that serves as a digital resume, project showcase, and writing platform. Built with [Astro 5](https://docs.astro.build/) using the Islands Architecture — static content ships zero JavaScript, while [React 19](https://react.dev/) islands handle interactivity. Content is managed through [Sitepins](https://sitepins.com/), a Git-based headless CMS with a visual editor, and the site is deployed on [Vercel](https://vercel.com/) with ISR caching for near-instant page loads.

**Pages:** Home &middot; Blog &middot; Projects &middot; About &middot; Experience &middot; Contact &middot; Search &middot; RSS &middot; Wiki

---

## Features

<table>
  <tr>
    <td width="50%">

**Islands Architecture**
Astro handles static content with zero JS overhead. React 19 islands power interactive components with the [React Compiler](https://react.dev/learn/react-compiler) enabled for automatic optimization.

  </td>
    <td width="50%">

**Visual Content Editing**
[Sitepins](https://sitepins.com/) provides a Git-based visual editing experience with media management, role-based access control, and AI-assisted content generation — all version-controlled through Git.

  </td>
  </tr>
  <tr>
    <td>

**Content Collections**
MDX-based blog posts and project pages validated with [Zod](https://zod.dev/) schemas. Supports drafts, archived status, featured flags, tags, and SEO metadata.

  </td>
    <td>

**Full-Text Search**
On-site content search powered by [Fuse.js](https://www.fusejs.io/) with fuzzy matching for fast, typo-tolerant results across all content.

  </td>
  </tr>
  <tr>
    <td>

**SEO & Performance**
Auto-generated sitemap, RSS feed, OpenGraph images, and structured metadata. [Terser](https://terser.org/) minification strips all console statements in production. Manual chunk splitting for optimal loading.

  </td>
    <td>

**Feature Flags**
JSON-driven toggles to enable/disable site sections and API endpoints without code changes. Managed through Sitepins or direct file editing.

  </td>
  </tr>
  <tr>
    <td>

**Responsive Design**
Mobile-first layout with a custom Tokyo Night-inspired color system, [Poppins](https://fonts.google.com/specimen/Poppins) typography, and smooth [Framer Motion](https://www.framer.com/motion/) animations.

  </td>
    <td>

**Developer Experience**
[Bun](https://bun.sh/) for fast installs, [Biome](https://biomejs.dev/) for linting and formatting, TypeScript strict mode, and path aliases for clean imports.

  </td>
  </tr>
</table>

**Also includes:** Web3Forms contact form &middot; GDPR cookie consent &middot; Mermaid diagram rendering &middot; Shiki syntax highlighting (Tokyo Night) &middot; API routes for articles, authors & projects &middot; Vercel Speed Insights

---

## Tech Stack

| Layer | Technology | Docs |
|:---|:---|:---|
| **Framework** | Astro 5 (SSR mode, ISR) | [docs.astro.build](https://docs.astro.build/) |
| **UI** | React 19, Framer Motion, Lucide Icons | [react.dev](https://react.dev/) |
| **Styling** | Tailwind CSS, Typography plugin | [tailwindcss.com/docs](https://tailwindcss.com/docs) |
| **CMS** | Sitepins (Git-based headless CMS) | [docs.sitepins.com](https://docs.sitepins.com/) |
| **Content** | MDX, Zod schemas | [mdxjs.com/docs](https://mdxjs.com/docs/) |
| **Language** | TypeScript (strict) | [typescriptlang.org/docs](https://www.typescriptlang.org/docs/) |
| **Runtime** | Bun | [bun.sh/docs](https://bun.sh/docs) |
| **Linting** | Biome (lint + format) | [biomejs.dev/docs](https://biomejs.dev/) |
| **Hosting** | Vercel (ISR + Speed Insights) | [vercel.com/docs](https://vercel.com/docs) |
| **Syntax** | Shiki (Tokyo Night theme) | [shiki.style](https://shiki.style/) |
| **Diagrams** | Mermaid (client-side rendered) | [mermaid.js.org](https://mermaid.js.org/) |

---

## Architecture

```
                    ┌─────────────────────────────────┐
                    │           Vercel (SSR + ISR)     │
                    └──────────────┬──────────────────┘
                                   │
                    ┌──────────────▼──────────────────┐
                    │         Astro 5 Framework        │
                    │    (Islands Architecture)        │
                    └──┬────────────────────────┬─────┘
                       │                        │
          ┌────────────▼────────┐  ┌────────────▼────────────┐
          │  Astro Components   │  │   React 19 Islands      │
          │  (Static, 0 JS)     │  │   (Interactive, Hydrated)│
          └─────────────────────┘  └─────────────────────────┘
                       │                        │
          ┌────────────▼────────────────────────▼─────┐
          │          Content Collections (MDX)         │
          │    blog/ (posts)  ·  projects/ (portfolio) │
          └──────────────┬────────────────────────────┘
                         │
          ┌──────────────▼──────────────────┐
          │    Sitepins (Git-based CMS)      │
          │  Visual Editor · Media Mgmt      │
          └─────────────────────────────────┘
```

---

## Project Structure

```
Astro-Portfolio-Blog/
├── public/                        # Static assets (favicons, images, fonts)
├── src/
│   ├── assets/                    # Processed assets (images optimized by Astro)
│   ├── components/
│   │   ├── AstroComponent/        # Static Astro components (zero JS)
│   │   └── ReactComponent/        # Interactive React islands (hydrated)
│   ├── config/
│   │   ├── featureFlag/           # Feature flag definitions (JSON)
│   │   └── theme/                 # Tokyo Night color system & tokens
│   ├── content/
│   │   ├── blog/                  # MDX blog posts
│   │   └── projects/              # MDX project pages
│   ├── hooks/                     # Custom React hooks
│   ├── layouts/                   # Page layouts (BlogPost, Project, Base)
│   ├── pages/
│   │   ├── api/                   # Server API routes (article, author, project)
│   │   ├── blog/                  # Blog listing & individual posts
│   │   ├── project/               # Project listing & detail pages
│   │   ├── tag/                   # Tag-based content filtering
│   │   └── ...                    # Home, About, Experience, Contact, Search
│   ├── styles/                    # Global styles & Tailwind utilities
│   └── types/                     # Shared TypeScript type definitions
├── .sitepins/                     # Sitepins CMS configuration & schemas
├── scripts/                       # Build & utility scripts
├── astro.config.mjs               # Astro configuration
├── tailwind.config.mjs            # Tailwind CSS configuration
├── biome.json                     # Biome linter/formatter config
└── tsconfig.json                  # TypeScript configuration
```

---

## Getting Started

### Prerequisites

| Tool | Version | Install |
|:---|:---|:---|
| **Bun** | v1.0+ | [bun.sh](https://bun.sh/) |
| **Sitepins Account** | — | Optional. Only for CMS features. [Sign up here](https://sitepins.com/) |

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/rafay99-epic/Astro-Portfolio-Blog.git
cd Astro-Portfolio-Blog

# 2. Install dependencies
bun install

# 3. Start the dev server
bun run dev

# 4. Open in browser
open http://localhost:4321
```

> Content is managed via [Sitepins](https://sitepins.com/) — a cloud-based CMS that connects directly to your Git repository. No local token required.

---

## Scripts Reference

| Command | Description |
|:---|:---|
| `bun run dev` | Start development server |
| `bun run build` | Astro production build |
| `bun run production_build` | Full production build |
| `bun run preview` | Preview the production build locally |
| `bun run lint` | Run Biome checks + TypeScript type check |
| `bun run lint:fix` | Auto-fix lint issues with Biome |
| `bun run check` | Astro diagnostics (template/component checks) |
| `bun run scan` | Run [react-scan](https://github.com/niccolocao/react-scan) against local dev server |

---

## Deployment

Deployed on [Vercel](https://vercel.com/) with automatic deployments from the `main` branch.

| Environment | URL | Branch |
|:---|:---|:---|
| **Production** | [rafay99.com](https://www.rafay99.com) | `main` |
| **Previews** | Auto-generated | Every PR |

---

## Contributing

Contributions are welcome. Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Commit** your changes: `git commit -m 'feat: add your feature'`
4. **Push** to the branch: `git push origin feature/your-feature`
5. **Open** a Pull Request targeting the **`testing`** branch

> **Note:** PRs should target `testing`, not `main`. PRs to `main` will be redirected.

---

## Documentation & Resources

Official docs for the technologies used in this project:

| Technology | Documentation |
|:---|:---|
| Astro | [docs.astro.build](https://docs.astro.build/en/getting-started/) |
| React | [react.dev/learn](https://react.dev/learn) |
| React Compiler | [react.dev/learn/react-compiler](https://react.dev/learn/react-compiler) |
| Sitepins | [docs.sitepins.com](https://docs.sitepins.com/) |
| Sitepins Developer Docs | [developer.sitepins.com](https://developer.sitepins.com/) |
| Sitepins + Astro Guide | [docs.astro.build/en/guides/cms/sitepins](https://docs.astro.build/en/guides/cms/sitepins/) |
| Tailwind CSS | [tailwindcss.com/docs](https://tailwindcss.com/docs) |
| TypeScript | [typescriptlang.org/docs](https://www.typescriptlang.org/docs/) |
| Bun | [bun.sh/docs](https://bun.sh/docs) |
| Biome | [biomejs.dev](https://biomejs.dev/) |
| Framer Motion | [motion.dev/docs](https://motion.dev/docs) |
| Zod | [zod.dev](https://zod.dev/) |
| MDX | [mdxjs.com/docs](https://mdxjs.com/docs/) |
| Mermaid | [mermaid.js.org/intro](https://mermaid.js.org/intro/) |
| Shiki | [shiki.style](https://shiki.style/) |
| Vercel | [vercel.com/docs](https://vercel.com/docs) |
| Shields.io (badges) | [shields.io](https://shields.io/) |

---

## License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for full details.

---

## Contact

<div align="center">

  [![Website](https://img.shields.io/badge/Website-rafay99.com-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://rafay99.com/contact)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-Abdul_Rafay-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/abdul-rafay1999/)
  [![Email](https://img.shields.io/badge/Email-99marafay@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:99marafay@gmail.com)

  <br />
  <br />

  **If you found this project helpful, consider giving it a star!**

  [![Star this repo](https://img.shields.io/github/stars/rafay99-epic/Astro-Portfolio-Blog?style=social)](https://github.com/rafay99-epic/Astro-Portfolio-Blog)

</div>
