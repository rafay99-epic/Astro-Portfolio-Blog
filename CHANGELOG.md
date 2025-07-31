# Changelog

## [9.1] - 2025-01-31

### 🗑️ Removed
- **AI Summary Feature**: Completely removed AI-powered blog post summarization
  - Deleted `/api/ai_summary.ts` and entire `/api/ai_summary/` directory
  - Removed `enableAI_Summary` feature flag
  - Removed all AI summary React components and utilities

- **Q&A Features**: Removed all AI-powered Q&A functionality
  - Deleted `/api/qa_generation.ts` and `/api/qa_custom.ts`
  - Removed `showQASection` feature flag
  - Removed all Q&A React components and related utilities

- **Newsletter Functionality**: Disabled newsletter features
  - Set `showNewsletter` feature flag to `false`
  - Removed newsletter API endpoints and Firebase integration attempts

- **Unused Type Definitions**: Cleaned up unused TypeScript interfaces
  - Removed `src/types/changeLog.ts`
  - Removed `src/types/wiki.ts`

### 🔧 Fixed
- **Import Paths**: Fixed relative import paths in `src/types/search.ts`
  - Changed `import type { Post } from "types/articles"` to `import type { Post } from "../types/articles"`

### 📝 Summary
This version focuses on **codebase cleanup and simplification**. The main goal was to remove complex AI-powered features that were causing maintenance overhead and technical issues. The site now has a cleaner, more maintainable codebase without the AI summary, Q&A, and newsletter features that were proving problematic.

**Key Benefits:**
- Reduced bundle size and complexity
- Eliminated external API dependencies (Google AI, Firebase)
- Simplified maintenance and deployment
- Better performance without AI processing overhead

**Breaking Changes:**
- AI summary cards no longer appear on blog posts
- Q&A sections are completely removed
- Newsletter signup functionality is disabled
- Some TypeScript interfaces have been removed

---

## [9.0] - Previous Version
*Previous changelog entries...* 