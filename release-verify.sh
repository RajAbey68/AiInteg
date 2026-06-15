#!/bin/bash
set -e

echo "Running 4-Eyes Gate Release Verification..."

# Non-negotiable structural kill-list
FORBIDDEN_WORDS=("transformative" "delve" "landscape" "game-changer" "tapestry" "seamless" "harness" "unlock" "leverage" "synergy")

for word in "${FORBIDDEN_WORDS[@]}"; do
    if grep -rnwi --exclude="release-verify.sh" --include=\*.{ts,tsx,js,jsx,md,json,yaml} "$word" "./src" 2>/dev/null; then
        echo "CRITICAL FAIL: Structural Bleed Detected. Unauthorized buzzword '$word' found inside assets."
        exit 1
    fi
done

echo "✓ Verification passed. Code is free of marketing artifacts. Safe for build."
