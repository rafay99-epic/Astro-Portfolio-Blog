#!/usr/bin/env python3
"""
Toggle draft status for the Lumo blog series posts.
Usage:
  python scripts/toggle_lumo_drafts.py on     # Set all to draft: false (visible)
  python scripts/toggle_lumo_drafts.py off    # Set all to draft: true (hidden)
  python scripts/toggle_lumo_drafts.py        # Show current status
"""

import sys
import re
from pathlib import Path

BLOG_DIR = Path(__file__).parent.parent / "src" / "content" / "blog"

LUMO_POSTS = [
    "lumo-building-a-personal-finance-app-from-scratch.mdx",
    "lumo-budget-cycle-system-that-broke-my-brain.mdx",
    "lumo-convex-realtime-backend-love-and-pain.mdx",
    "lumo-multi-income-budget-math-nightmare.mdx",
    "lumo-ai-spending-predictions-that-actually-work.mdx",
    "lumo-react-native-mobile-app-architecture.mdx",
    "lumo-admin-dashboard-internal-tools-that-dont-suck.mdx",
    "lumo-security-subscriptions-device-sessions.mdx",
    "lumo-lessons-learned-full-stack-finance-app.mdx",
]


def get_status(filepath: Path) -> str:
    content = filepath.read_text(encoding="utf-8")
    match = re.search(r"^draft:\s*(true|false)", content, re.MULTILINE)
    return match.group(1) if match else "unknown"


def set_draft(filepath: Path, draft_value: str):
    content = filepath.read_text(encoding="utf-8")
    updated = re.sub(
        r"^(draft:\s*)(true|false)",
        f"\\g<1>{draft_value}",
        content,
        count=1,
        flags=re.MULTILINE,
    )
    filepath.write_text(updated, encoding="utf-8")


def main():
    action = sys.argv[1] if len(sys.argv) > 1 else None

    if action not in (None, "on", "off"):
        print("Usage: python toggle_lumo_drafts.py [on|off]")
        print("  on  = draft: false (visible on site)")
        print("  off = draft: true  (hidden from site)")
        sys.exit(1)

    print(f"\n{'Post':<60} {'Status'}")
    print("-" * 72)

    for filename in LUMO_POSTS:
        filepath = BLOG_DIR / filename
        if not filepath.exists():
            print(f"  ⚠  {filename} not found!")
            continue

        if action == "on":
            set_draft(filepath, "false")
            status = "✅ visible"
        elif action == "off":
            set_draft(filepath, "true")
            status = "⬛ draft"
        else:
            current = get_status(filepath)
            status = "✅ visible" if current == "false" else "⬛ draft"

        short_name = filename.replace("lumo-", "").replace(".mdx", "")
        print(f"  {short_name:<58} {status}")

    if action:
        print(f"\n→ All 9 Lumo posts set to {'visible' if action == 'on' else 'draft'}.")
    else:
        print("\nRun with 'on' or 'off' to toggle.")


if __name__ == "__main__":
    main()
