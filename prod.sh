#!/bin/zsh
# Production script for building, linting, checking, committing, and pushing code
# Enhanced with robust error reporting and retry loops

# ===== COLORS =====
RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
BLUE="\033[0;34m"
NC="\033[0m" # No Color

LOG_FILE="lint_error_report.md"

log() {
  echo -e "${BLUE}[INFO]${NC} $1"
}

success() {
  echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warn() {
  echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

generate_report() {
  local lint_output="$1"
  local check_output="$2"
  local lint_status="$3"
  local check_status="$4"
  
  echo "# 🚨 Validation Error Report" > "$LOG_FILE"
  echo "Generated on: $(date)" >> "$LOG_FILE"
  echo "" >> "$LOG_FILE"
  
  if [ "$lint_status" -ne 0 ]; then
    echo "## ❌ Linting Errors (Prettier/ESLint)" >> "$LOG_FILE"
    echo "\`\`\`" >> "$LOG_FILE"
    echo "$lint_output" >> "$LOG_FILE"
    echo "\`\`\`" >> "$LOG_FILE"
    echo "" >> "$LOG_FILE"
  else
    echo "## ✅ Linting Passed" >> "$LOG_FILE"
    if [ -n "$lint_output" ]; then
      echo "### Output:" >> "$LOG_FILE"
      echo "\`\`\`" >> "$LOG_FILE"
      echo "$lint_output" >> "$LOG_FILE"
      echo "\`\`\`" >> "$LOG_FILE"
    fi
    echo "" >> "$LOG_FILE"
  fi

  if [ "$check_status" -ne 0 ]; then
    echo "## ❌ Type Check Errors (Astro/TypeScript)" >> "$LOG_FILE"
    echo "\`\`\`" >> "$LOG_FILE"
    echo "$check_output" >> "$LOG_FILE"
    echo "\`\`\`" >> "$LOG_FILE"
  else
    echo "## ✅ Type Check Passed" >> "$LOG_FILE"
    if [ -n "$check_output" ]; then
      echo "### Output:" >> "$LOG_FILE"
      echo "\`\`\`" >> "$LOG_FILE"
      echo "$check_output" >> "$LOG_FILE"
      echo "\`\`\`" >> "$LOG_FILE"
    fi
  fi
}

run_checks() {
  local has_errors=0
  local lint_out=""
  local check_out=""
  local lint_status=0
  local check_status=0

  log "Running validation checks..."

  # 1. Run Lint
  echo "  > Checking code style (lint)..."
  lint_out=$(bun run lint 2>&1)
  lint_status=$?
  if [ $lint_status -ne 0 ]; then
    error "Lint check failed."
    has_errors=1
  else
    success "Lint check passed."
  fi

  # 2. Run Type Check
  echo "  > Checking types (astro check)..."
  check_out=$(bun run check 2>&1)
  check_status=$?
  if [ $check_status -ne 0 ]; then
    error "Type check failed."
    has_errors=1
  else
    success "Type check passed."
  fi

  # If errors, generate report
  if [ $has_errors -eq 1 ]; then
    generate_report "$lint_out" "$check_out" "$lint_status" "$check_status"
    return 1
  fi

  return 0
}

# ===== STEP 1: Install dependencies =====
log "Installing dependencies using bun..."
if bun install; then
  success "Dependencies installed successfully."
else
  error "bun install failed."
  exit 1
fi

# ===== STEP 2: Robust Validation Loop =====
while true; do
  if run_checks; then
    success "All checks passed! Proceeding to build..."
    rm -f "$LOG_FILE" # Clean up report if exists
    break
  else
    error "Validation failed. See $LOG_FILE for details."
    
    # Attempt Auto-Fix
    warn "Attempting automatic fixes (lint:fix)..."
    if bun run lint:fix; then
      success "Auto-fixes applied."
      warn "Re-running checks to verify fixes..."
      if run_checks; then
        success "All checks passed after auto-fix! Proceeding..."
        rm -f "$LOG_FILE"
        break
      fi
    else
      error "Auto-fix could not resolve all issues."
    fi

    # Manual Intervention Prompt
    echo ""
    echo -e "${YELLOW}⚠️  Manual intervention required.${NC}"
    echo "1. Open $LOG_FILE to view errors."
    echo "2. Fix the errors in your code."
    echo "3. Press [Enter] to retry checks."
    echo "   (Or press Ctrl+C to abort)"
    read -r
    log "Retrying checks..."
  fi
done

# ===== STEP 3: Build project =====
log "Building project..."
if bun run build; then
  success "Build completed successfully."
else
  error "Build failed."
  exit 1
fi

# ===== STEP 4: Commit & Push =====
echo ""
# Default to Yes (Y) if user just hits Enter
read -r "commit_choice?Do you want to commit the changes? [Y/n]: "
commit_choice=${commit_choice:-y}

case "$commit_choice" in
  [yY]*|Sure|sure|ok|OK)
    read -r "commit_message?Enter commit message: "
    # Default commit message if empty
    if [[ -z "$commit_message" ]]; then
        commit_message="Update portfolio"
        warn "No message provided. Using default: '$commit_message'"
    fi
    
    log "Committing with message: '$commit_message'"
    git add .
    if git commit -m "$commit_message"; then
      success "Commit successful."
    else
      warn "Nothing to commit, working tree clean."
    fi

    # Push Prompt
    read -r "push_choice?Do you want to push the changes? [Y/n]: "
    push_choice=${push_choice:-y}
    
    case "$push_choice" in
      [yY]*|Sure|sure|ok|OK)
        log "Pushing changes to remote..."
        if git push; then
          success "Code pushed successfully."
        else
          error "Failed to push changes."
        fi
        ;;
      [nN]*)
        warn "Skipping push."
        ;;
      *)
        warn "Invalid input '$push_choice'. Skipping push."
        ;;
    esac
    ;;
  [nN]*)
    warn "Skipping commit & push."
    ;;
  *)
    warn "Invalid input '$commit_choice'. Skipping commit."
    ;;
esac

success "🎉 All tasks completed!"