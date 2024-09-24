#!/bin/bash

# Variables
GITHUB_OWNER="rafay99-epic"          # GitHub username
GITHUB_REPO="SnapRescue"             # GitHub repository name
ASSET_NAME="snaprescue.tar.xz"       # The asset file name that is downloaded
DOWNLOAD_DIR="snaprescue_files"      # Directory where files will be extracted

# Fetch the latest release info from GitHub API
LATEST_RELEASE_URL=$(curl -s https://api.github.com/repos/$GITHUB_OWNER/$GITHUB_REPO/releases/latest \
  | grep "browser_download_url.*$ASSET_NAME" \
  | cut -d : -f 2,3 \
  | tr -d \")

# Check if the latest release URL was found
if [ -z "$LATEST_RELEASE_URL" ]; then
  echo "Error: Could not fetch the latest release or asset not found."
  exit 1
fi

echo "Latest release URL: $LATEST_RELEASE_URL"

# Download the asset file
curl -L -o $ASSET_NAME $LATEST_RELEASE_URL

# Extract the downloaded .tar.xz archive
mkdir -p $DOWNLOAD_DIR
tar -xf $ASSET_NAME -C $DOWNLOAD_DIR

# Navigate to the extracted folder (assuming it's all extracted into one directory)
cd $DOWNLOAD_DIR || { echo "Error: Could not navigate to extraction directory."; exit 1; }

# List the extracted files (just for confirmation)
echo "Extracted files:"
ls -l

# Check if there's a script to run (like a setup or main script) and run it
# You can modify this section based on the actual files in your archive
if [ -f "./snaprescue.sh" ]; then
  chmod +x ./snaprescue.sh
  ./snaprescue.sh
else
  echo "Error: No run.sh found. Add your script execution logic here."
fi

# Add additional file executions as needed.
