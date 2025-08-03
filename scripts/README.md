# Scripts Documentation

## Generate Changelog Script

The `generate-changelog.sh` script automatically generates changelog documentation from your git history.

### Features

- **Automatic Version Detection**: Reads version from `package.json`
- **Smart Release Type Detection**: 
  - Major Release: 9.x.x → 10.x.x
  - Minor Release: 9.1.x → 9.2.x  
  - Patch Release: 9.1.1 → 9.1.2
- **AI-Powered Analysis**: 
  - Intelligent change categorization (Features, Bug Fixes, Improvements, etc.)
  - Smart summaries of changes and development patterns
  - Key insights about code quality and development trends
- **Comprehensive Git Analysis**: 
  - Commit history with hashes and authors
  - File changes (added, modified, deleted)
  - Statistics (commits, contributors, files changed)
- **Proper Metadata**: Generates front matter with current date and version info
- **Colored Output**: Easy-to-read terminal output with status indicators

### Setup

#### 1. Get Google AI Studio API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the API key

#### 2. Configure Environment Variables
```bash
# Copy the example environment file
cp scripts/env.example scripts/.env

# Edit the file and add your API key
nano scripts/.env
```

Or set environment variables directly:
```bash
export GEMINI_API_KEY="your_api_key_here"
export AI_ENABLED=true
```

### Usage

```bash
# Run the script from the project root
./scripts/generate-changelog.sh

# Or with custom environment variables
GEMINI_API_KEY="your_key" AI_ENABLED=true ./scripts/generate-changelog.sh

# Disable AI analysis
AI_ENABLED=false ./scripts/generate-changelog.sh
```

### Output

The script generates a markdown file in `docs/changelog/version-{version}.md` with:

#### Front Matter
```yaml
---
title: 'Version 9.2.0 - Minor Release'
description: 'Version 9.2.0 includes various improvements and updates'
version: "9.2.0"
pubDate: 2025-01-31T18:00:00.000Z
updated: 2025-01-31T18:00:00.000Z
versionreleasedate: 2025-01-31T18:00:00.000Z
tags: ["Minor Release"]
---
```

#### Content Sections
- **AI Analysis Summary**: Intelligent summary of changes (when AI is enabled)
- **Change Categories**: Categorized changes (Features, Bug Fixes, Improvements, etc.)
- **Key Insights**: AI-generated insights about development patterns
- **Version Header**: Release date and type
- **Changes**: Detailed commit history
- **File Changes**: Added, modified, and deleted files
- **Statistics**: Commit count, contributors, files changed

### Example Output (with AI Analysis)

```markdown
# Version 9.2.0

**Release Date:** January 31, 2025
**Release Type:** Minor Release

## AI Analysis Summary

This release represents a significant refactoring and cleanup effort focused on improving the codebase architecture and user experience. The changes demonstrate a systematic approach to removing technical debt while enhancing the overall functionality of the application.

The most notable improvements include the complete removal of the unused ThemeManager system, which simplifies the codebase and reduces maintenance overhead. The mobile navigation has been significantly enhanced with proper z-index management and improved user interaction patterns.

## Change Categories

- **Features:** Enhanced mobile navigation, improved tag filtering system
- **Bug Fixes:** Fixed z-index issues in mobile menu, resolved tag page navigation
- **Improvements:** Better user experience with smoother transitions
- **Refactoring:** Removed unused ThemeManager components, cleaned up React components
- **Documentation:** Added comprehensive changelog generation system
- **Dependencies:** Updated package dependencies and build configurations

## Key Insights

The development team shows a strong focus on code quality and maintainability, with systematic removal of unused components and improved architectural patterns. The changes indicate a maturing codebase with better separation of concerns between Astro and React components.

## 🔄 Changes

- **a1b2c3d** - Fix mobile navigation z-index issue (John Doe, 2025-01-31)
- **e4f5g6h** - Remove unused ThemeManager components (John Doe, 2025-01-30)
- **i7j8k9l** - Update tag filtering system (John Doe, 2025-01-29)

## 📁 File Changes

### Added Files
- `scripts/generate-changelog.sh`
- `docs/changelog/version-9.2.0.md`

### Modified Files
- `src/components/AstroComponent/header/Header.astro`
- `package.json`

### Deleted Files
- `src/components/ReactComponent/layout/ThemeManager/`

## 📊 Statistics

- **Total Commits:** 15
- **Contributors:** 1
- **Files Changed:** 8
- **Code Changes:** 15 files changed, 234 insertions(+), 45 deletions(-)
```

### Requirements

- Git repository
- Node.js (for reading package.json)
- Bash shell
- Unix-like environment (macOS, Linux, WSL)

### Customization

You can modify the script to:
- Change output directory (`OUTPUT_DIR` variable)
- Adjust commit range detection
- Add custom sections
- Modify formatting

### Integration

Add to your workflow:
```bash
# In your deployment script
./scripts/generate-changelog.sh

# Or in package.json scripts
{
  "scripts": {
    "changelog": "./scripts/generate-changelog.sh"
  }
}
``` 