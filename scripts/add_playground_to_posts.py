#!/usr/bin/env python3
"""
Script to automatically add Playground components to codeblocks in blog posts
Only processes Dart, JavaScript, TypeScript, and JSX codeblocks
"""

import re
from pathlib import Path
from typing import List, Tuple

# Configuration
BLOG_DIR = Path(__file__).parent.parent / "src" / "content" / "blog"
PLAYGROUND_IMPORT = 'import Playground from "../../components/ReactComponent/blog/enhancements/Playground/Playground";'

# Languages that should use Playground
PLAYGROUND_LANGUAGES = {'dart', 'javascript', 'typescript', 'jsx', 'tsx'}

def extract_codeblocks_with_positions(content: str) -> List[Tuple[int, int, str, str]]:
    """Extract codeblocks with their positions and language."""
    codeblocks = []
    lines = content.split('\n')
    
    i = 0
    while i < len(lines):
        line = lines[i]
        
        # Check for fenced code block start
        if line.strip().startswith('```'):
            language = line.strip()[3:].strip() or 'plain'
            start_line = i
            code_lines = []
            i += 1
            
            # Collect code until closing fence
            while i < len(lines):
                if lines[i].strip() == '```':
                    end_line = i
                    code_content = '\n'.join(code_lines)
                    
                    if code_content.strip() and language.lower() in PLAYGROUND_LANGUAGES:
                        codeblocks.append((start_line, end_line, language, code_content))
                    break
                code_lines.append(lines[i])
                i += 1
        i += 1
    
    return codeblocks

def has_playground_import(content: str) -> bool:
    """Check if Playground is already imported."""
    return 'import Playground' in content or 'Playground' in content.split('\n')[0:50]

def convert_codeblock_to_playground(code: str, language: str, title: str = None) -> str:
    """Convert a codeblock to Playground component."""
    # Escape backticks and handle template literals
    escaped_code = code.replace('`', '\\`').replace('${', '\\${')
    
    # Generate title if not provided
    if not title:
        title = f"{language.upper()} Code Example"
    
    # Determine height based on code length
    line_count = len(code.split('\n'))
    if line_count < 10:
        height = "300px"
    elif line_count < 30:
        height = "400px"
    else:
        height = "500px"
    
    return f'''<Playground
  initialCode={{\`{escaped_code}\`}}
  language="{language}"
  title="{title}"
  height="{height}"
  client:load
/>'''

def process_file(filepath: Path) -> bool:
    """Process a single MDX file and add Playground components."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if already has Playground import
        has_import = has_playground_import(content)
        
        # Extract codeblocks
        codeblocks = extract_codeblocks_with_positions(content)
        
        if not codeblocks:
            return False
        
        # Process from end to start to preserve line numbers
        lines = content.split('\n')
        modified = False
        
        for start_line, end_line, language, code in reversed(codeblocks):
            # Skip if already converted (has Playground nearby)
            if start_line > 0 and '<Playground' in '\n'.join(lines[max(0, start_line-5):start_line+5]):
                continue
            
            # Generate title from context
            context_lines = lines[max(0, start_line-10):start_line]
            title = None
            for ctx_line in reversed(context_lines):
                if ctx_line.strip().startswith('#'):
                    title = ctx_line.strip().replace('#', '').strip()
                    break
                if ctx_line.strip().startswith('**') and 'Example' in ctx_line:
                    title = ctx_line.strip().replace('**', '').strip()
                    break
            
            if not title:
                title = f"{language.upper()} Code Example"
            
            # Convert to Playground
            playground_component = convert_codeblock_to_playground(code, language, title)
            
            # Replace codeblock
            lines[start_line:end_line+1] = [playground_component]
            modified = True
        
        # Add import if needed
        if modified and not has_import:
            # Find the end of frontmatter
            frontmatter_end = content.find('---\n', content.find('---\n') + 4)
            if frontmatter_end != -1:
                insert_pos = frontmatter_end + 4
                lines.insert(insert_pos // len('\n') if '\n' in content[:insert_pos] else 0, '')
                lines.insert(insert_pos // len('\n') + 1 if '\n' in content[:insert_pos] else 1, PLAYGROUND_IMPORT)
        
        if modified:
            new_content = '\n'.join(lines)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            return True
        
        return False
    except Exception as e:
        print(f"Error processing {filepath.name}: {e}")
        return False

def main():
    """Main function to process all blog posts."""
    if not BLOG_DIR.exists():
        print(f"Error: Blog directory not found: {BLOG_DIR}")
        return
    
    mdx_files = list(BLOG_DIR.glob("*.mdx"))
    print(f"Processing {len(mdx_files)} MDX files...")
    
    processed = 0
    for filepath in sorted(mdx_files):
        if process_file(filepath):
            processed += 1
            print(f"  ✓ {filepath.name}: Added Playground components")
    
    print(f"\n✅ Processed {processed} files with Playground components")

if __name__ == "__main__":
    main()

