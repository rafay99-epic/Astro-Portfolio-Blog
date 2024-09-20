#!/bin/bash

# Get the latest release URL
RELEASE_URL=$(curl -s https://api.github.com/repos/rafay99-epic/SnapRescue/releases/latest | grep "browser_download_url.*tar.gz" | cut -d '"' -f 4)

# Download and extract the tarball
curl -L "$RELEASE_URL" | tar xz

# Find the extracted directory
EXTRACTED_DIR=$(find . -maxdepth 1 -type d -name "SnapRescue-*" | head -n 1)

# Change to the extracted directory and run the script
cd "$EXTRACTED_DIR" && chmod +x snaprescue.sh && ./snaprescue.sh
