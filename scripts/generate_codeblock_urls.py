#!/usr/bin/env python3
"""
Script to generate a list of blog post URLs with codeblocks
"""

import os
import re
from pathlib import Path
from typing import List, Dict

# Configuration
BLOG_DIR = Path(__file__).parent.parent / "src" / "content" / "blog"
OUTPUT_FILE = Path(__file__).parent.parent / "codeblocks_urls.md"
BASE_URL = "http://localhost:4321/blog"  # Change to your production URL if needed

def extract_codeblocks(content: str) -> List[Dict]:
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
        'slug': filepath.stem,  # Use filename as slug
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

def generate_url_list(all_codeblocks: Dict[str, List[Dict]]) -> str:
    """Generate a markdown list of URLs with codeblocks."""
    report = []
    report.append("# 🔗 Blog Posts with Codeblocks - URL List")
    report.append("")
    report.append(f"Base URL: `{BASE_URL}`")
    report.append("")
    report.append("---")
    report.append("")
    
    # Group by language for easier navigation
    language_groups = {}
    for filepath, blocks in all_codeblocks.items():
        metadata = get_file_metadata(Path(filepath))
        slug = metadata['slug']
        url = f"{BASE_URL}/{slug}"
        
        # Get unique languages in this file
        languages = list(set(block['language'] for block in blocks))
        
        for lang in languages:
            if lang not in language_groups:
                language_groups[lang] = []
            language_groups[lang].append({
                'url': url,
                'title': metadata['title'] or slug,
                'slug': slug,
                'count': len([b for b in blocks if b['language'] == lang]),
                'total_blocks': len(blocks),
            })
    
    # Generate language sections
    for lang in sorted(language_groups.keys()):
        report.append(f"## 📝 {lang.upper()} Codeblocks")
        report.append("")
        report.append(f"**Total posts with {lang} codeblocks:** {len(language_groups[lang])}")
        report.append("")
        report.append("| Title | Slug | URL | Codeblocks |")
        report.append("|-------|------|-----|------------|")
        
        for item in sorted(language_groups[lang], key=lambda x: x['title']):
            report.append(f"| {item['title']} | `{item['slug']}` | [{item['url']}]({item['url']}) | {item['count']} ({lang}) / {item['total_blocks']} total |")
        
        report.append("")
        report.append("---")
        report.append("")
    
    # Generate complete list by file
    report.append("## 📄 Complete List (All Posts)")
    report.append("")
    report.append("| Title | Slug | URL | Total Codeblocks | Languages |")
    report.append("|-------|------|-----|------------------|-----------|")
    
    for filepath, blocks in sorted(all_codeblocks.items()):
        metadata = get_file_metadata(Path(filepath))
        slug = metadata['slug']
        url = f"{BASE_URL}/{slug}"
        languages = sorted(set(block['language'] for block in blocks))
        lang_str = ', '.join(f"`{lang}`" for lang in languages)
        
        report.append(f"| {metadata['title'] or slug} | `{slug}` | [{url}]({url}) | {len(blocks)} | {lang_str} |")
    
    report.append("")
    report.append("---")
    report.append("")
    report.append("## 🧪 Testing Playground")
    report.append("")
    report.append("Use these URLs to test codeblocks in the Playground component:")
    report.append("")
    
    # Find posts with specific languages for testing
    test_candidates = {
        'dart': [],
        'javascript': [],
        'typescript': [],
        'jsx': [],
    }
    
    for filepath, blocks in all_codeblocks.items():
        metadata = get_file_metadata(Path(filepath))
        slug = metadata['slug']
        url = f"{BASE_URL}/{slug}"
        
        for block in blocks:
            lang = block['language']
            if lang in test_candidates:
                test_candidates[lang].append({
                    'url': url,
                    'title': metadata['title'] or slug,
                    'code': block['code'][:200] + '...' if len(block['code']) > 200 else block['code'],
                    'line_count': block['line_count'],
                })
    
    for lang, items in test_candidates.items():
        if items:
            report.append(f"### {lang.upper()} Examples")
            report.append("")
            for item in items[:3]:  # Show first 3 examples
                report.append(f"- **{item['title']}**")
                report.append(f"  - URL: [{item['url']}]({item['url']})")
                report.append(f"  - Code length: {item['line_count']} lines")
                report.append(f"  - Preview: `{item['code'][:100]}...`")
                report.append("")
    
    return '\n'.join(report)

def main():
    """Main function to scan blog directory and generate URL list."""
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
            
            blocks = extract_codeblocks(content)
            if blocks:
                all_codeblocks[str(filepath)] = blocks
                print(f"  ✓ {filepath.name}: {len(blocks)} codeblock(s)")
        except Exception as e:
            print(f"  ✗ Error processing {filepath.name}: {e}")
    
    # Generate report
    report = generate_url_list(all_codeblocks)
    
    # Write to file
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(report)
    
    print(f"\n✅ URL list generated: {OUTPUT_FILE}")
    print(f"   Total files with codeblocks: {len(all_codeblocks)}")
    print(f"   Total codeblocks: {sum(len(blocks) for blocks in all_codeblocks.values())}")

if __name__ == "__main__":
    main()

