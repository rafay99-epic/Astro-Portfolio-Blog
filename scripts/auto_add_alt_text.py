#!/usr/bin/env python3
"""
Script to automatically add suggested alt text to images that don't have it.
This helps prepare images for the ImageCaptionRenderer component.
"""

import os
import re
import glob
from pathlib import Path
from typing import List

def find_mdx_files(directory: str = "src/content/blog") -> List[str]:
    """Find all MDX files in the blog directory."""
    mdx_files = glob.glob(f"{directory}/*.mdx")
    return mdx_files

def generate_alt_text_suggestion(image_path: str, filename: str) -> str:
    """Generate alt text suggestions based on image path and filename."""
    # Extract filename without extension
    base_name = os.path.basename(image_path)
    name_without_ext = os.path.splitext(base_name)[0]
    
    # Clean up the filename
    clean_name = name_without_ext.replace('-', ' ').replace('_', ' ').replace('.', ' ')
    
    # Common patterns for alt text generation
    patterns = {
        'screenshot': 'Screenshot showing',
        'ssd_contactform_error': 'Contact form error message showing validation failure',
        'speed_result': 'Website performance results showing improved speed scores',
        'kiro_interface': 'Kiro code editor interface showing modern UI',
        'review_screen': 'Code review screen in Kiro showing diff view',
        'proof': 'Automated file management script output showing successful organization',
        'my_driver': 'NVIDIA driver installation interface on Arch Linux',
        'Screenshot 2025-02-16 182018': 'Screenshot of contact form interface with form fields'
    }
    
    # Check for specific patterns first
    for pattern, suggestion in patterns.items():
        if pattern.lower() in name_without_ext.lower():
            return suggestion
    
    # Default suggestion based on filename
    return f"Image showing {clean_name}"

def add_alt_text_to_file(file_path: str) -> bool:
    """Add alt text to images in a single file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    changes_made = False
    
    # Find markdown images without alt text: ![](url)
    markdown_pattern = r'!\[\]\(([^)]+)\)'
    
    def replace_markdown(match):
        nonlocal changes_made
        image_path = match.group(1)
        alt_text = generate_alt_text_suggestion(image_path, os.path.basename(file_path))
        changes_made = True
        return f'![{alt_text}]({image_path})'
    
    content = re.sub(markdown_pattern, replace_markdown, content)
    
    # Find HTML images without alt text: <img src="..." />
    html_pattern = r'<img([^>]+src=["\']([^"\']+)["\'][^>]*?)>'
    
    def replace_html(match):
        nonlocal changes_made
        img_attrs = match.group(1)
        image_path = match.group(2)
        
        # Skip if already has alt text
        if 'alt=' in img_attrs:
            return match.group(0)
        
        alt_text = generate_alt_text_suggestion(image_path, os.path.basename(file_path))
        changes_made = True
        return f'<img{img_attrs} alt="{alt_text}">'
    
    content = re.sub(html_pattern, replace_html, content)
    
    # Write back to file if changes were made
    if changes_made:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    
    return False

def main():
    """Main function to add alt text to images."""
    print("🖼️  Auto Alt Text Adder")
    print("=" * 40)
    
    mdx_files = find_mdx_files()
    files_updated = 0
    total_images_updated = 0
    
    for file_path in mdx_files:
        filename = os.path.basename(file_path)
        print(f"📄 Processing: {filename}")
        
        if add_alt_text_to_file(file_path):
            files_updated += 1
            print(f"   ✅ Updated with alt text")
            
            # Count how many images were updated
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Count markdown images with alt text
            markdown_with_alt = len(re.findall(r'!\[([^\]]+)\]\([^)]+\)', content))
            # Count HTML images with alt text
            html_with_alt = len(re.findall(r'<img[^>]+alt=["\']([^"\']*)["\'][^>]*>', content))
            
            images_in_file = markdown_with_alt + html_with_alt
            total_images_updated += images_in_file
            print(f"   📸 Added alt text to {images_in_file} images")
        else:
            print(f"   ⏭️  No changes needed")
    
    print("\n" + "=" * 40)
    print(f"📊 SUMMARY")
    print(f"📁 Files processed: {len(mdx_files)}")
    print(f"✅ Files updated: {files_updated}")
    print(f"🖼️  Images updated: {total_images_updated}")
    
    if files_updated > 0:
        print(f"\n🎉 Successfully added alt text to {total_images_updated} images!")
        print("💡 The ImageCaptionRenderer will now show captions for these images.")
    else:
        print(f"\n🎉 All images already have alt text!")

if __name__ == "__main__":
    main() 