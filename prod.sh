#!/bin/zsh
# Production script for building, linting, checking, committing, and pushing code

# ===== COLORS =====
RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
BLUE="\033[0;34m"
NC="\033[0m" # No Color

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

# Exit immediately if a command exits with a non-zero status
set -e

# ===== STEP 1: Install dependencies =====
log "Installing dependencies using bun..."
if bun install; then
  success "Dependencies installed successfully."
else
  error "bun install failed."
  exit 1
fi

# ===== STEP 2: Run lint =====
log "Running lint check..."
if bun run lint; then
  success "Lint passed successfully."
else
  warn "Lint failed. Attempting to auto-fix..."
  if bun run lint:fix; then
    success "Lint issues fixed successfully. Re-running lint..."
    if bun run lint; then
      success "Lint passed after auto-fix ✅"
    else
      error "Lint still failing after fix ❌ Please resolve manually."
      exit 1
    fi
  else
    error "Lint auto-fix failed. Please fix issues manually."
    exit 1
  fi
fi

# ===== STEP 3: Run check (type & constraints) =====
log "Running 'bun run check'..."
if bun run check; then
  success "Check passed successfully."
else
  error "Check failed ❌ Please fix issues before continuing."
  exit 1
fi

# ===== STEP 4: Build project =====
log "Building project..."
if bun run build; then
  success "Build completed successfully."
else
  error "Build failed."
  exit 1
fi

# ===== STEP 5: Commit & Push =====
read -r "commit_choice?Do you want to commit the changes? (yes/no): "

case "$commit_choice" in
  y|Y|yes|YES|Sure|sure)
    read -r "commit_message?Enter commit message: "
    log "Committing with message: '$commit_message'"
    git add .
    if git commit -m "$commit_message"; then
      success "Commit successful."
    else
      warn "Nothing to commit, working tree clean."
    fi

    read -r "push_choice?Do you want to push the changes? (yes/no): "
    case "$push_choice" in
      y|Y|yes|YES|Sure|sure)
        log "Pushing changes to remote..."
        if git push; then
          success "Code pushed successfully."
        else
          error "Failed to push changes."
        fi
        ;;
      *)
        warn "Skipping push."
        ;;
    esac
    ;;
  *)
    warn "Skipping commit & push."
    ;;
esac

success "🎉 All tasks completed!"