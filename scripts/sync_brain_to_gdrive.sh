#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -e

SOURCE_DIR="$HOME/Library/Mobile Documents/com~apple~CloudDocs/Second Brain"
TARGET_DIR="$HOME/Library/CloudStorage/GoogleDrive-rajabey68@gmail.com/My Drive/Second Brain Sync"

# Verify source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo "Error: Source directory '$SOURCE_DIR' does not exist." >&2
    exit 1
fi

# Create target directory if it does not exist
mkdir -p "$TARGET_DIR"

echo "Syncing Obsidian Second Brain markdown notes to Google Drive..."

# Sync only Markdown (.md) files and folder structures to keep it lightweight for NotebookLM
rsync -rtv --include="*/" --include="*.md" --exclude="*" "$SOURCE_DIR/" "$TARGET_DIR/"

echo "✓ Sync complete! Files are now available in your Google Drive 'Second Brain Sync' folder."
