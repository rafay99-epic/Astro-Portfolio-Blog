# Scripts Directory

This directory contains various automation scripts for managing and enhancing the Astro Portfolio Blog. Each script serves a specific purpose in the content management and SEO optimization workflow.

## 📁 Scripts Overview

### 1. `publish_posts.py` - Auto-Publishing and SEO Enhancement Script
**File Size:** 20KB (469 lines)  
**Primary Purpose:** Automated blog post publishing with comprehensive SEO optimization

#### Features:
- **Auto-Publishing**: Automatically publishes draft posts when their `pubDate` is reached
- **SEO Enhancement**: Adds missing SEO metadata (keywords, excerpts, canonical URLs)
- **Alt Text Generation**: Automatically adds descriptive alt text to images
- **Content Validation**: Validates YAML frontmatter and content structure

#### Key Functions:
- `extract_frontmatter()`: Safely extracts and validates YAML frontmatter
- `generate_seo_keywords()`: Creates SEO keywords from title, tags, and content
- `generate_excerpt()`: Generates meta descriptions from content
- `generate_canonical_url()`: Creates canonical URLs from post titles
- `generate_alt_text_suggestion()`: Creates descriptive alt text for images
- `enhance_seo_metadata()`: Adds missing SEO fields to frontmatter
- `add_alt_text_to_content()`: Processes both Markdown and HTML images

#### Usage:
```bash
python scripts/publish_posts.py
```

#### What it does:
1. Scans all `.md` and `.mdx` files in `src/content/blog/`
2. Checks draft posts for publication readiness
3. Enhances SEO metadata for all posts
4. Adds alt text to images without descriptions
5. Updates files in place with improvements

---

### 2. `auto_add_alt_text.py` - Image Alt Text Automation
**File Size:** 4.9KB (138 lines)  
**Primary Purpose:** Batch processing to add alt text to images across all blog posts

#### Features:
- **Batch Processing**: Processes multiple files at once
- **Smart Alt Text Generation**: Creates context-aware alt text descriptions
- **Multiple Image Formats**: Handles both Markdown and HTML image syntax
- **Preservation**: Maintains existing alt text and formatting

#### Usage:
```bash
python scripts/auto_add_alt_text.py
```

#### What it does:
1. Scans all blog posts for images without alt text
2. Generates descriptive alt text based on image filenames and context
3. Updates images in place with new alt text
4. Reports statistics on processed images

---

### 3. `check_image_alt.py` - Alt Text Validation Script
**File Size:** 7.9KB (220 lines)  
**Primary Purpose:** Validates and reports on image alt text coverage across the blog

#### Features:
- **Comprehensive Scanning**: Checks all images in blog posts
- **Detailed Reporting**: Provides statistics on alt text coverage
- **Issue Identification**: Flags images missing alt text or with poor descriptions
- **Export Options**: Can generate reports for further analysis

#### Usage:
```bash
python scripts/check_image_alt.py
```

#### What it does:
1. Scans all blog posts for images
2. Analyzes alt text quality and presence
3. Generates detailed reports on coverage
4. Identifies images needing attention

---

### 4. `update_blog_seo.py` - SEO Metadata Enhancement
**File Size:** 5.1KB (147 lines)  
**Primary Purpose:** Focused SEO metadata enhancement for existing blog posts

#### Features:
- **SEO Field Addition**: Adds missing SEO-related frontmatter fields
- **Keyword Generation**: Creates relevant keywords from content
- **Excerpt Creation**: Generates meta descriptions
- **Canonical URL Management**: Ensures proper canonical URLs

#### Usage:
```bash
python scripts/update_blog_seo.py
```

#### What it does:
1. Analyzes existing blog posts for missing SEO fields
2. Generates appropriate SEO metadata
3. Updates frontmatter with new fields
4. Preserves existing formatting and content

---

### 5. `Python Script for Auto Scheduling Blog Post.ipynb` - Jupyter Notebook
**File Size:** 30KB (513 lines)  
**Primary Purpose:** Interactive blog post scheduling and management

#### Features:
- **Interactive Interface**: Jupyter notebook for hands-on post management
- **Scheduling Tools**: Tools for setting up post publication schedules
- **Data Analysis**: Analysis of post performance and scheduling patterns
- **Visualization**: Charts and graphs for post analytics

#### Usage:
```bash
jupyter notebook "Python Script for Auto Scheduling Blog Post.ipynb"
```

---

## 🔧 Common Dependencies

All scripts require the following Python packages:
```bash
pip install pyyaml pathlib logging typing
```

## 📋 Script Execution Order

For optimal results, run scripts in this order:

1. **`check_image_alt.py`** - Assess current state
2. **`auto_add_alt_text.py`** - Add missing alt text
3. **`update_blog_seo.py`** - Enhance SEO metadata
4. **`publish_posts.py`** - Publish ready posts and final enhancements

## 🎯 Key Benefits

### SEO Optimization
- Automatic keyword generation from content
- Meta description creation
- Canonical URL management
- Image alt text for accessibility and SEO

### Content Management
- Automated publishing workflow
- Batch processing capabilities
- Content validation and enhancement
- Consistent formatting across posts

### Accessibility
- Comprehensive alt text coverage
- Descriptive image descriptions
- Improved screen reader compatibility

## ⚠️ Important Notes

### File Safety
- All scripts create backups before making changes
- Original formatting is preserved where possible
- Scripts are designed to be idempotent (safe to run multiple times)

### Directory Structure
Scripts expect the following structure:
```
Astro-Portfolio-Blog/
├── scripts/
│   ├── publish_posts.py
│   ├── auto_add_alt_text.py
│   ├── check_image_alt.py
│   ├── update_blog_seo.py
│   └── Python Script for Auto Scheduling Blog Post.ipynb
└── src/
    └── content/
        └── blog/
            ├── post1.mdx
            ├── post2.mdx
            └── ...
```

### Logging
All scripts include comprehensive logging:
- Info level: General progress and successful operations
- Warning level: Issues that don't prevent execution
- Error level: Problems that need attention
- Debug level: Detailed operation information

## 🚀 Quick Start

1. **Navigate to the scripts directory:**
   ```bash
   cd scripts
   ```

2. **Run the main publishing script:**
   ```bash
   python publish_posts.py
   ```

3. **Check for any issues:**
   ```bash
   python check_image_alt.py
   ```

4. **Enhance SEO if needed:**
   ```bash
   python update_blog_seo.py
   ```

## 📊 Monitoring and Maintenance

### Regular Tasks
- Run `publish_posts.py` daily for auto-publishing
- Run `check_image_alt.py` weekly to monitor alt text coverage
- Run `update_blog_seo.py` monthly for SEO maintenance

### Performance Metrics
- Track alt text coverage percentage
- Monitor SEO field completion rates
- Log publishing success rates
- Analyze content enhancement statistics

## 🔍 Troubleshooting

### Common Issues
1. **Permission Errors**: Ensure write permissions to blog content directory
2. **Encoding Issues**: All files should be UTF-8 encoded
3. **YAML Parsing Errors**: Check frontmatter syntax in problematic files
4. **Path Issues**: Run scripts from the repository root directory

### Debug Mode
Enable debug logging for detailed information:
```python
logging.basicConfig(level=logging.DEBUG)
```

## 📝 Contributing

When adding new scripts:
1. Follow the existing code structure and patterns
2. Include comprehensive logging
3. Add error handling for robustness
4. Update this README with new script documentation
5. Test thoroughly before deployment

## 📞 Support

For issues or questions about these scripts:
1. Check the logging output for error details
2. Verify file permissions and paths
3. Ensure all dependencies are installed
4. Review the script-specific documentation above

---

*Last Updated: January 2025*  
*Maintained by: Astro Portfolio Blog Team* 