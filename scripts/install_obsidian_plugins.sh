#!/usr/bin/env bash

set -e

VAULT_DIR="$HOME/Library/Mobile Documents/com~apple~CloudDocs/Second Brain"
PLUGINS_DIR="$VAULT_DIR/.obsidian/plugins"

echo "Creating plugin folders in your Obsidian vault..."
mkdir -p "$PLUGINS_DIR/copilot"

# 1. Fetch latest release assets for logancyang/obsidian-copilot
echo "Fetching latest release information for Copilot for Obsidian..."
RELEASE_JSON=$(curl -s https://api.github.com/repos/logancyang/obsidian-copilot/releases/latest)

MAIN_JS_URL=$(echo "$RELEASE_JSON" | grep -o 'https://github.com/logancyang/obsidian-copilot/releases/download/[^"]*/main.js' | head -n 1)
MANIFEST_URL=$(echo "$RELEASE_JSON" | grep -o 'https://github.com/logancyang/obsidian-copilot/releases/download/[^"]*/manifest.json' | head -n 1)
STYLES_URL=$(echo "$RELEASE_JSON" | grep -o 'https://github.com/logancyang/obsidian-copilot/releases/download/[^"]*/styles.css' | head -n 1)

if [ -z "$MAIN_JS_URL" ] || [ -z "$MANIFEST_URL" ]; then
    echo "Error: Could not locate release asset URLs." >&2
    exit 1
fi

echo "Downloading Copilot plugin assets..."
curl -L -s "$MAIN_JS_URL" -o "$PLUGINS_DIR/copilot/main.js"
curl -L -s "$MANIFEST_URL" -o "$PLUGINS_DIR/copilot/manifest.json"
if [ -n "$STYLES_URL" ]; then
    curl -L -s "$STYLES_URL" -o "$PLUGINS_DIR/copilot/styles.css"
fi

# 2. Enable the plugin programmatically in Obsidian's community-plugins.json
COMMUNITY_PLUGINS_FILE="$VAULT_DIR/.obsidian/community-plugins.json"
if [ -f "$COMMUNITY_PLUGINS_FILE" ]; then
    echo "Enabling Copilot plugin in configuration..."
    # Check if 'copilot' is already in the list
    if ! grep -q '"copilot"' "$COMMUNITY_PLUGINS_FILE"; then
        # Insert "copilot" into the JSON array
        # This replaces the closing bracket with: , "copilot" ]
        sed -i '' 's/\]/, "copilot"\]/g' "$COMMUNITY_PLUGINS_FILE"
        # Cleanup potential double commas if array was empty
        sed -i '' 's/\[, /\[/g' "$COMMUNITY_PLUGINS_FILE"
    fi
else
    # Create the config file enabling the plugin
    echo '[ "copilot" ]' > "$COMMUNITY_PLUGINS_FILE"
fi

echo "✓ Copilot for Obsidian successfully installed and enabled programmatically!"
