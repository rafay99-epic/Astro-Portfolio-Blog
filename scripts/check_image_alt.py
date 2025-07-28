#!/usr/bin/env python3
"""
Script to check which blog posts have images without alt text.
This helps identify which files need alt text added for the ImageCaptionRenderer.
"""

import os
import re
import glob
from pathlib import Path
from typing import List, Dict, Tuple

def find_mdx_files(directory: str = "src/content/blog") -> List[str]:
    """Find all MDX files in the blog directory."""
    mdx_files = glob.glob(f"{directory}/*.mdx")
    return mdx_files

def extract_images_from_mdx(file_path: str) -> Dict[str, List[str]]:
    """Extract images from MDX file and categorize them."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find markdown images: ![alt text](url)
    markdown_images = re.findall(r'!\[([^\]]*)\]\(([^)]+)\)', content)
    
    # Find HTML images: <img src="..." alt="..." />
    html_images_with_alt = re.findall(r'<img[^>]+src=["\']([^"\']+)["\'][^>]*alt=["\']([^"\']*)["\'][^>]*>', content)
    
    # Find HTML images without alt text
    html_images_no_alt = re.findall(r'<img[^>]+src=["\']([^"\']+)["\'][^>]*>', content)
    
    # Filter out HTML images that DO have alt text
    html_images_no_alt_filtered = []
    for img_src in html_images_no_alt:
        # Check if this image has alt text in the full match
        full_match = re.search(rf'<img[^>]+src=["\']{re.escape(img_src)}["\'][^>]*>', content)
        if full_match:
            img_tag = full_match.group(0)
            if 'alt=' not in img_tag:
                html_images_no_alt_filtered.append(img_src)
    
    return {
        'markdown_images': markdown_images,
        'html_images_with_alt': html_images_with_alt,
        'html_images_no_alt': html_images_no_alt_filtered
    }

def analyze_blog_posts() -> Dict[str, Dict]:
    """Analyze all blog posts for images without alt text."""
    mdx_files = find_mdx_files()
    results = {}
    
    print("🔍 Scanning blog posts for images without alt text...\n")
    
    total_files = 0
    files_with_images = 0
    files_without_alt = 0
    total_images = 0
    images_without_alt = 0
    
    for file_path in mdx_files:
        filename = os.path.basename(file_path)
        images = extract_images_from_mdx(file_path)
        
        total_files += 1
        file_has_images = False
        file_has_issues = False
        file_images_count = 0
        file_issues = []
        
        # Check markdown images
        for alt_text, image_path in images['markdown_images']:
            file_images_count += 1
            total_images += 1
            file_has_images = True
            
            if not alt_text.strip():
                images_without_alt += 1
                file_has_issues = True
                file_issues.append(f"  - Markdown: {image_path} (no alt text)")
        
        # Check HTML images without alt text
        for image_path in images['html_images_no_alt']:
            file_images_count += 1
            total_images += 1
            file_has_images = True
            file_has_issues = True
            images_without_alt += 1
            file_issues.append(f"  - HTML: {image_path} (no alt text)")
        
        if file_has_images:
            files_with_images += 1
            
        if file_has_issues:
            files_without_alt += 1
            results[filename] = {
                'path': file_path,
                'issues': file_issues,
                'total_images': file_images_count,
                'images_without_alt': len(file_issues)
            }
    
    return {
        'results': results,
        'stats': {
            'total_files': total_files,
            'files_with_images': files_with_images,
            'files_without_alt': files_without_alt,
            'total_images': total_images,
            'images_without_alt': images_without_alt
        }
    }

def generate_report(analysis: Dict) -> None:
    """Generate a detailed report of the analysis."""
    results = analysis['results']
    stats = analysis['stats']
    
    print("📊 ANALYSIS REPORT")
    print("=" * 50)
    print(f"📁 Total blog posts: {stats['total_files']}")
    print(f"🖼️  Posts with images: {stats['files_with_images']}")
    print(f"⚠️  Posts needing alt text: {stats['files_without_alt']}")
    print(f"📸 Total images found: {stats['total_images']}")
    print(f"❌ Images without alt text: {stats['images_without_alt']}")
    print(f"✅ Images with alt text: {stats['total_images'] - stats['images_without_alt']}")
    
    if stats['images_without_alt'] > 0:
        print(f"\n⚠️  {stats['images_without_alt']} images need alt text!")
        print(f"📝 {stats['files_without_alt']} files need updates")
        
        print("\n📄 FILES THAT NEED ATTENTION:")
        print("-" * 40)
        
        for filename, data in results.items():
            print(f"\n🔴 {filename}")
            print(f"   📸 {data['total_images']} images, {data['images_without_alt']} without alt text")
            for issue in data['issues']:
                print(issue)
    else:
        print("\n✅ All images have alt text! Great job!")
    
    print("\n" + "=" * 50)

def generate_action_list(analysis: Dict) -> None:
    """Generate a list of actions to take."""
    results = analysis['results']
    
    if not results:
        print("🎉 No action needed - all images have alt text!")
        return
    
    print("\n🎯 ACTION PLAN")
    print("=" * 30)
    print("Files to update (in order of priority):")
    
    # Sort by number of issues (most issues first)
    sorted_files = sorted(results.items(), key=lambda x: x[1]['images_without_alt'], reverse=True)
    
    for i, (filename, data) in enumerate(sorted_files, 1):
        print(f"{i}. {filename} ({data['images_without_alt']} images need alt text)")
    
    print(f"\n💡 Total files to update: {len(results)}")
    print(f"💡 Total images needing alt text: {sum(data['images_without_alt'] for data in results.values())}")

def save_detailed_report(analysis: Dict, filename: str = "image_alt_report.txt") -> None:
    """Save a detailed report to a file."""
    results = analysis['results']
    stats = analysis['stats']
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write("IMAGE ALT TEXT ANALYSIS REPORT\n")
        f.write("=" * 50 + "\n\n")
        
        f.write(f"Total blog posts: {stats['total_files']}\n")
        f.write(f"Posts with images: {stats['files_with_images']}\n")
        f.write(f"Posts needing alt text: {stats['files_without_alt']}\n")
        f.write(f"Total images found: {stats['total_images']}\n")
        f.write(f"Images without alt text: {stats['images_without_alt']}\n")
        f.write(f"Images with alt text: {stats['total_images'] - stats['images_without_alt']}\n\n")
        
        if results:
            f.write("DETAILED ISSUES BY FILE:\n")
            f.write("-" * 30 + "\n\n")
            
            for filename, data in results.items():
                f.write(f"File: {filename}\n")
                f.write(f"Path: {data['path']}\n")
                f.write(f"Total images: {data['total_images']}\n")
                f.write(f"Images without alt text: {data['images_without_alt']}\n")
                f.write("Issues:\n")
                for issue in data['issues']:
                    f.write(f"  {issue}\n")
                f.write("\n")
    
    print(f"\n📄 Detailed report saved to: {filename}")

def main():
    """Main function to run the analysis."""
    print("🖼️  Image Alt Text Checker")
    print("=" * 40)
    
    # Run analysis
    analysis = analyze_blog_posts()
    
    # Generate reports
    generate_report(analysis)
    generate_action_list(analysis)
    
    # Save detailed report
    save_detailed_report(analysis)
    
    print("\n🎯 Next Steps:")
    print("1. Review the files listed above")
    print("2. Add alt text to images in those files")
    print("3. Use the ImageCaptionRenderer component for automatic captions")
    print("4. Re-run this script to verify improvements")

if __name__ == "__main__":
    main() 