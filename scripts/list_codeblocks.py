#!/usr/bin/env python3
"""
Script to extract and list all codeblocks from blog posts in src/content/blog
"""

import os
import re
from pathlib import Path
from typing import List, Dict, Optional
from datetime import datetime

# Configuration
BLOG_DIR = Path(__file__).parent.parent / "src" / "content" / "blog"
OUTPUT_FILE = Path(__file__).parent.parent / "codeblocks_report.md"

# Pattern to match code blocks: ```language (optional) followed by code and closing ```
CODEBLOCK_PATTERN = re.compile(
    r'```(\w+)?\n(.*?)```',
    re.DOTALL | re.MULTILINE
)

# Pattern to match inline code blocks (single backticks)
INLINE_CODE_PATTERN = re.compile(r'`([^`]+)`')


def extract_codeblocks(content: str, filepath: Path) -> List[Dict]:
    """Extract all codeblocks from a markdown file."""
    codeblocks = []
    lines = content.split('\n')
    
    i = 0
    while i < len(lines):
        line = lines[i]
        
        # Check for fenced code block start
        if line.strip().startswith('```'):
            language = line.strip()[3:].strip() or 'plain'
            start_line = i + 1
            code_lines = []
            i += 1
            
            # Collect code until closing fence
            while i < len(lines):
                if lines[i].strip() == '```':
                    end_line = i + 1
                    code_content = '\n'.join(code_lines)
                    
                    # Skip empty codeblocks
                    if code_content.strip():
                        codeblocks.append({
                            'language': language,
                            'code': code_content,
                            'start_line': start_line,
                            'end_line': end_line,
                            'line_count': len(code_lines),
                            'preview': code_content.split('\n')[0][:80] if code_content else '',
                        })
                    break
                code_lines.append(lines[i])
                i += 1
        i += 1
    
    return codeblocks


def get_file_metadata(filepath: Path) -> Dict:
    """Extract frontmatter metadata from MDX file."""
    metadata = {
        'title': None,
        'pubDate': None,
        'tags': [],
    }
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Extract frontmatter
        frontmatter_match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
        if frontmatter_match:
            frontmatter = frontmatter_match.group(1)
            
            # Extract title
            title_match = re.search(r'^title:\s*(.+)$', frontmatter, re.MULTILINE)
            if title_match:
                metadata['title'] = title_match.group(1).strip().strip('"\'')
            
            # Extract pubDate
            date_match = re.search(r'^pubDate:\s*(.+)$', frontmatter, re.MULTILINE)
            if date_match:
                metadata['pubDate'] = date_match.group(1).strip()
            
            # Extract tags
            tags_match = re.search(r'^tags:\s*\n((?:\s*-\s*.+\n?)+)', frontmatter, re.MULTILINE)
            if tags_match:
                tags = re.findall(r'-\s*(.+)', tags_match.group(1))
                metadata['tags'] = [tag.strip() for tag in tags]
    except Exception as e:
        print(f"Error reading metadata from {filepath}: {e}")
    
    return metadata


def generate_report(all_codeblocks: Dict[str, List[Dict]]) -> str:
    """Generate a markdown report of all codeblocks."""
    report = []
    report.append("# 📝 Codeblocks Report")
    report.append("")
    report.append(f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    report.append("")
    report.append(f"Total files scanned: {len(all_codeblocks)}")
    
    total_codeblocks = sum(len(blocks) for blocks in all_codeblocks.values())
    report.append(f"Total codeblocks found: {total_codeblocks}")
    report.append("")
    report.append("---")
    report.append("")
    
    # Group by language
    language_stats = {}
    for filepath, blocks in all_codeblocks.items():
        for block in blocks:
            lang = block['language']
            language_stats[lang] = language_stats.get(lang, 0) + 1
    
    if language_stats:
        report.append("## 📊 Language Statistics")
        report.append("")
        report.append("| Language | Count |")
        report.append("|----------|-------|")
        for lang, count in sorted(language_stats.items(), key=lambda x: x[1], reverse=True):
            report.append(f"| `{lang}` | {count} |")
        report.append("")
        report.append("---")
        report.append("")
    
    # List all codeblocks by file
    for filepath, blocks in sorted(all_codeblocks.items()):
        if not blocks:
            continue
            
        filename = Path(filepath).name
        metadata = get_file_metadata(Path(filepath))
        
        report.append(f"## 📄 {filename}")
        report.append("")
        
        if metadata['title']:
            report.append(f"**Title:** {metadata['title']}")
        if metadata['pubDate']:
            report.append(f"**Published:** {metadata['pubDate']}")
        if metadata['tags']:
            report.append(f"**Tags:** {', '.join(metadata['tags'])}")
        
        report.append(f"**Codeblocks:** {len(blocks)}")
        report.append("")
        
        for idx, block in enumerate(blocks, 1):
            report.append(f"### Codeblock #{idx}")
            report.append("")
            report.append(f"- **Language:** `{block['language']}`")
            report.append(f"- **Lines:** {block['start_line']}-{block['end_line']} ({block['line_count']} lines)")
            report.append(f"- **Preview:** `{block['preview']}...`")
            report.append("")
            report.append("```" + block['language'])
            report.append(block['code'])
            report.append("```")
            report.append("")
            report.append("---")
            report.append("")
    
    return '\n'.join(report)


def main():
    """Main function to scan blog directory and generate report."""
    if not BLOG_DIR.exists():
        print(f"Error: Blog directory not found: {BLOG_DIR}")
        return
    
    all_codeblocks = {}
    mdx_files = list(BLOG_DIR.glob("*.mdx"))
    
    print(f"Scanning {len(mdx_files)} MDX files...")
    
    for filepath in sorted(mdx_files):
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            blocks = extract_codeblocks(content, filepath)
            if blocks:
                all_codeblocks[str(filepath)] = blocks
                print(f"  ✓ {filepath.name}: {len(blocks)} codeblock(s)")
        except Exception as e:
            print(f"  ✗ Error processing {filepath.name}: {e}")
    
    # Generate report
    report = generate_report(all_codeblocks)
    
    # Write to file
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(report)
    
    print(f"\n✅ Report generated: {OUTPUT_FILE}")
    print(f"   Total files with codeblocks: {len(all_codeblocks)}")
    print(f"   Total codeblocks: {sum(len(blocks) for blocks in all_codeblocks.values())}")


if __name__ == "__main__":
    main()

