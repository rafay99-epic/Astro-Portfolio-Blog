#!/bin/bash

# Generate Changelog Script
# This script generates a changelog markdown file from git history

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
OUTPUT_DIR="docs/changelog"
TEMPLATE_FILE="scripts/changelog-template.md"
CURRENT_DATE=$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to get version from package.json
get_version() {
    if [ -f "package.json" ]; then
        version=$(node -p "require('./package.json').version")
        echo "$version"
    else
        print_error "package.json not found!"
        exit 1
    fi
}

# Function to determine release type based on version change
get_release_type() {
    local current_version=$1
    local previous_version=$2
    
    # Handle non-numeric or invalid previous versions
    if [[ ! "$previous_version" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        echo "Initial Release"
        return
    fi
    
    # Extract major, minor, patch versions
    current_major=$(echo "$current_version" | cut -d. -f1)
    current_minor=$(echo "$current_version" | cut -d. -f2)
    previous_major=$(echo "$previous_version" | cut -d. -f1)
    previous_minor=$(echo "$previous_version" | cut -d. -f2)
    
    # Convert to integers for comparison
    current_major=$((10#$current_major))
    current_minor=$((10#$current_minor))
    previous_major=$((10#$previous_major))
    previous_minor=$((10#$previous_minor))
    
    if [ "$current_major" -gt "$previous_major" ]; then
        echo "Major Release"
    elif [ "$current_minor" -gt "$previous_minor" ]; then
        echo "Minor Release"
    else
        echo "Patch Release"
    fi
}

# Function to get previous version from git tags
get_previous_version() {
    local current_version=$1
    local previous_tag=$(git describe --tags --abbrev=0 2>/dev/null || echo "v0.0.0")
    local previous_version=${previous_tag#v}
    
    # If no previous tag or same version, try to get from git log
    if [ "$previous_version" = "0.0.0" ] || [ "$previous_version" = "$current_version" ]; then
        # Get the first commit hash
        local first_commit=$(git rev-list --max-parents=0 HEAD 2>/dev/null || echo "")
        if [ -n "$first_commit" ]; then
            previous_version="0.0.0"
        else
            previous_version="0.0.0"
        fi
    fi
    
    echo "$previous_version"
}

# Function to generate commit history
generate_commit_history() {
    local current_version=$1
    local previous_version=$2
    
    print_status "Generating commit history from $previous_version to $current_version..." >&2
    
    # Get commit range
    local commit_range=""
    if [ "$previous_version" = "0.0.0" ]; then
        commit_range="HEAD"
    else
        # Try to find the commit where previous version was set
        local previous_commit=$(git log --grep="version.*$previous_version" --oneline -1 --format="%H" 2>/dev/null || echo "")
        if [ -n "$previous_commit" ]; then
            commit_range="$previous_commit..HEAD"
        else
            commit_range="HEAD~50..HEAD"  # Fallback to last 50 commits
        fi
    fi
    
    # Generate commit history with formatting
    git log "$commit_range" --pretty=format:"- **%h** - %s (%an, %ad)" --date=short --reverse 2>/dev/null | {
        while IFS= read -r line; do
            echo "$line"
        done
    } || {
        print_warning "Could not get commit history, using fallback..."
        git log --oneline --pretty=format:"- **%h** - %s (%an, %ad)" --date=short -20 | {
            while IFS= read -r line; do
                echo "$line"
            done
        }
    }
}

# Function to generate file changes summary
generate_file_changes() {
    local current_version=$1
    local previous_version=$2
    
    print_status "Generating file changes summary..." >&2
    
    # Get commit range
    local commit_range=""
    if [ "$previous_version" = "0.0.0" ]; then
        commit_range="HEAD"
    else
        local previous_commit=$(git log --grep="version.*$previous_version" --oneline -1 --format="%H" 2>/dev/null || echo "")
        if [ -n "$previous_commit" ]; then
            commit_range="$previous_commit..HEAD"
        else
            commit_range="HEAD~50..HEAD"
        fi
    fi
    
    echo ""
    echo "## 📁 File Changes"
    echo ""
    
    # Get changed files
    local changed_files=$(git diff --name-status "$commit_range" 2>/dev/null || git diff --name-status HEAD~20 HEAD 2>/dev/null || echo "")
    
    if [ -n "$changed_files" ]; then
        echo "### Added Files"
        echo "$changed_files" | grep "^A" | cut -f2 | sed 's/^/- `/' | sed 's/$/`/' || echo "- No new files added"
        
        echo ""
        echo "### Modified Files"
        echo "$changed_files" | grep "^M" | cut -f2 | sed 's/^/- `/' | sed 's/$/`/' || echo "- No files modified"
        
        echo ""
        echo "### Deleted Files"
        echo "$changed_files" | grep "^D" | cut -f2 | sed 's/^/- `/' | sed 's/$/`/' || echo "- No files deleted"
    else
        echo "- No file changes detected"
    fi
}

# Function to generate statistics
generate_statistics() {
    local current_version=$1
    local previous_version=$2
    
    print_status "Generating statistics..." >&2
    
    # Get commit range
    local commit_range=""
    if [ "$previous_version" = "0.0.0" ]; then
        commit_range="HEAD"
    else
        local previous_commit=$(git log --grep="version.*$previous_version" --oneline -1 --format="%H" 2>/dev/null || echo "")
        if [ -n "$previous_commit" ]; then
            commit_range="$previous_commit..HEAD"
        else
            commit_range="HEAD~50..HEAD"
        fi
    fi
    
    echo ""
    echo "## 📊 Statistics"
    echo ""
    
    # Count commits
    local commit_count=$(git rev-list --count "$commit_range" 2>/dev/null || echo "0")
    echo "- **Total Commits:** $commit_count"
    
    # Count contributors
    local contributors=$(git log "$commit_range" --pretty=format:"%an" | sort | uniq | wc -l 2>/dev/null || echo "0")
    echo "- **Contributors:** $contributors"
    
    # Count files changed
    local files_changed=$(git diff --name-only "$commit_range" 2>/dev/null | wc -l || echo "0")
    echo "- **Files Changed:** $files_changed"
    
    # Lines added/removed
    local lines_stats=$(git diff --stat "$commit_range" 2>/dev/null | tail -1 || echo "")
    if [ -n "$lines_stats" ]; then
        echo "- **Code Changes:** $lines_stats"
    fi
}

# Main execution
main() {
    print_status "Starting changelog generation..."
    
    # Check if we're in a git repository
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        print_error "Not in a git repository!"
        exit 1
    fi
    
    # Get current version
    local current_version=$(get_version)
    print_status "Current version: $current_version"
    
    # Get previous version
    local previous_version=$(get_previous_version "$current_version")
    print_status "Previous version: $previous_version"
    
    # Determine release type
    local release_type=$(get_release_type "$current_version" "$previous_version")
    print_status "Release type: $release_type"
    
    # Create output directory
    mkdir -p "$OUTPUT_DIR"
    
    # Generate filename with timestamp to avoid overwriting
    local timestamp=$(date +"%Y%m%d_%H%M%S")
    local filename="$OUTPUT_DIR/version-${current_version}_${timestamp}.md"
    
    # Generate the changelog content
    {
        # Front matter
        echo "---"
        echo "title: 'Version $current_version - $release_type'"
        echo "description: 'Version $current_version includes various improvements and updates'"
        echo "version: \"$current_version\""
        echo "pubDate: $CURRENT_DATE"
        echo "updated: $CURRENT_DATE"
        echo "versionreleasedate: $CURRENT_DATE"
        echo "tags: [\"$release_type\"]"
        echo "---"
        echo ""
        
        # Version header
        echo "# Version $current_version"
        echo ""
        echo "**Release Date:** $(date -u +"%B %d, %Y")"
        echo "**Release Type:** $release_type"
        echo ""
        
        # Summary
        echo "## 📋 Summary"
        echo ""
        echo "This release includes various improvements, bug fixes, and new features."
        echo ""
        
        # Commit history
        echo "## 🔄 Changes"
        echo ""
        generate_commit_history "$current_version" "$previous_version"
        
        # File changes
        generate_file_changes "$current_version" "$previous_version"
        
        # Statistics
        generate_statistics "$current_version" "$previous_version"
        
        # Footer
        echo ""
        echo "---"
        echo ""
        echo "*This changelog was automatically generated on $(date -u +"%B %d, %Y at %H:%M UTC")*"
        
    } > "$filename"
    
    print_status "Changelog generated successfully: $filename"
    
    # Show a preview
    echo ""
    print_status "Preview of generated changelog:"
    echo "----------------------------------------"
    head -20 "$filename"
    echo "..."
    echo "----------------------------------------"
    
    print_status "Changelog generation completed!"
}

# Run the script
main "$@" 