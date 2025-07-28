#!/usr/bin/env python3
"""
Script to update all blog posts with new SEO fields:
- keywords
- featured (set to false by default)
- excerpt
"""

import os
import re
import yaml
from pathlib import Path

BLOG_DIR = Path("src/content/blog")

# Keywords mapping for different topics
KEYWORDS_MAPPING = {
    "ai": ["artificial intelligence", "ai", "machine learning", "chatgpt", "github copilot"],
    "web": ["web development", "frontend", "react", "javascript", "typescript"],
    "mobile": ["mobile development", "flutter", "android", "ios", "app development"],
    "linux": ["linux", "fedora", "ubuntu", "system administration", "open source"],
    "startup": ["startup", "saas", "entrepreneurship", "business", "freelancing"],
    "astro": ["astro", "static site generator", "web development", "performance"],
    "performance": ["performance", "optimization", "speed", "web performance"],
    "automation": ["automation", "scripting", "python", "github actions"],
    "security": ["security", "privacy", "cybersecurity", "linux security"],
    "tools": ["tools", "productivity", "software", "development tools"],
    "thought": ["thought process", "development", "software engineering", "problem solving"]
}

def generate_keywords(tags, title, description):
    """Generate keywords based on tags, title, and description"""
    keywords = set()
    
    # Add keywords based on tags
    for tag in tags:
        tag_lower = tag.lower()
        if tag_lower in KEYWORDS_MAPPING:
            keywords.update(KEYWORDS_MAPPING[tag_lower])
        keywords.add(tag_lower)
    
    # Add common keywords
    keywords.update(["blog", "technology", "programming", "software development"])
    
    # Add keywords from title and description
    text = f"{title} {description}".lower()
    for key, values in KEYWORDS_MAPPING.items():
        if any(value in text for value in values):
            keywords.update(values)
    
    return list(keywords)[:10]  # Limit to 10 keywords

def generate_excerpt(description):
    """Generate an excerpt from description"""
    # Clean up the description
    excerpt = description.replace('\n', ' ').replace('  ', ' ').strip()
    
    # Limit to 160 characters for SEO
    if len(excerpt) > 160:
        excerpt = excerpt[:157] + "..."
    
    return excerpt

def update_blog_post(file_path):
    """Update a single blog post with new SEO fields"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extract frontmatter
        frontmatter_match = re.match(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
        if not frontmatter_match:
            print(f"No frontmatter found in {file_path.name}")
            return False
        
        frontmatter_text = frontmatter_match.group(1)
        body_content = content[frontmatter_match.end():]
        
        # Parse frontmatter
        try:
            frontmatter = yaml.safe_load(frontmatter_text)
        except yaml.YAMLError as e:
            print(f"Error parsing frontmatter in {file_path.name}: {e}")
            return False
        
        # Check if already has new fields
        if 'keywords' in frontmatter and 'featured' in frontmatter and 'excerpt' in frontmatter:
            print(f"Already updated: {file_path.name}")
            return True
        
        # Generate new fields
        tags = frontmatter.get('tags', [])
        title = frontmatter.get('title', '')
        description = frontmatter.get('description', '')
        
        # Generate keywords
        keywords = generate_keywords(tags, title, description)
        
        # Generate excerpt
        excerpt = generate_excerpt(description)
        
        # Set featured based on content importance
        featured = False
        if any(keyword in title.lower() or keyword in description.lower() 
               for keyword in ['convex', 'leadfinder', 'astro', 'ai', 'startup', 'performance']):
            featured = True
        
        # Add new fields to frontmatter
        frontmatter['keywords'] = keywords
        frontmatter['featured'] = featured
        frontmatter['excerpt'] = excerpt
        
        # Convert back to YAML
        new_frontmatter = yaml.dump(frontmatter, default_flow_style=False, allow_unicode=True, sort_keys=False)
        
        # Reconstruct the file
        new_content = f"---\n{new_frontmatter}---\n{body_content}"
        
        # Write back to file
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"Updated: {file_path.name}")
        return True
        
    except Exception as e:
        print(f"Error updating {file_path.name}: {e}")
        return False

def main():
    """Main function to update all blog posts"""
    if not BLOG_DIR.exists():
        print(f"Blog directory not found: {BLOG_DIR}")
        return
    
    blog_files = list(BLOG_DIR.glob("*.mdx"))
    print(f"Found {len(blog_files)} blog posts to update")
    
    updated_count = 0
    for file_path in blog_files:
        if update_blog_post(file_path):
            updated_count += 1
    
    print(f"\nUpdated {updated_count} out of {len(blog_files)} blog posts")

if __name__ == "__main__":
    main() 