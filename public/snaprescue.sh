#!/bin/sh -e

# # Variables
# GITHUB_OWNER="rafay99-epic"          # GitHub username
# GITHUB_REPO="SnapRescue"             # GitHub repository name
# ASSET_NAME="snaprescue.tar.xz"       # The asset file name that is downloaded
# DOWNLOAD_DIR="snaprescue_files"      # Directory where files will be extracted

# # Function to handle errors
# handle_error() {
#     echo "Error: $1"
#     exit 1
# }

# # Fetch the latest release info from GitHub API and trim any extra spaces
# LATEST_RELEASE_URL=$(curl -s https://api.github.com/repos/$GITHUB_OWNER/$GITHUB_REPO/releases/latest \
#   | grep "browser_download_url.*$ASSET_NAME" \
#   | cut -d : -f 2,3 \
#   | tr -d \" \
#   | xargs)  # Trim spaces

# # Check if the latest release URL was found
# if [ -z "$LATEST_RELEASE_URL" ]; then
#     handle_error "Could not fetch the latest release or asset $ASSET_NAME not found."
# fi

# echo "Latest release URL: $LATEST_RELEASE_URL"

# # Download the asset file
# echo "Downloading the asset file $ASSET_NAME..."
# curl -L -o $ASSET_NAME "$LATEST_RELEASE_URL" || handle_error "Failed to download the asset file."

# # Verify if the file was downloaded
# if [ ! -f "$ASSET_NAME" ]; then
#     handle_error "Downloaded asset file $ASSET_NAME does not exist."
# fi

# echo "Download completed: $ASSET_NAME"

# # Extract the downloaded .tar.xz archive
# echo "Extracting $ASSET_NAME into $DOWNLOAD_DIR..."
# mkdir -p $DOWNLOAD_DIR || handle_error "Failed to create directory $DOWNLOAD_DIR."

# tar -xf $ASSET_NAME -C $DOWNLOAD_DIR || handle_error "Failed to extract $ASSET_NAME."

# # Navigate to the extracted folder
# echo "Navigating to the extracted folder $DOWNLOAD_DIR..."
# cd $DOWNLOAD_DIR || handle_error "Could not navigate to extraction directory $DOWNLOAD_DIR."

# # List the extracted files for confirmation
# echo "Extracted files:"
# ls -l || handle_error "Failed to list extracted files."

# # Check if the script exists and run it
# SCRIPT_NAME="./snaprescue.sh"
# if [ -f "$SCRIPT_NAME" ]; then
#     echo "Found $SCRIPT_NAME. Running it..."
#     chmod +x $SCRIPT_NAME || handle_error "Failed to make $SCRIPT_NAME executable."

#     # Run the script in a new interactive shell
#     echo "Starting interactive shell..."
#     /bin/bash -c "exec /bin/bash --init-file $SCRIPT_NAME"

#     # After successful execution, do the cleanup
#     echo "Script executed successfully."

#     # Clean-up downloaded files and temporary directories
#     echo "Cleaning up..."
#     cd ..  # Go back to the parent directory
#     rm -f "$ASSET_NAME"  # Remove the tar.xz file
#     rm -rf "$DOWNLOAD_DIR"  # Remove the extraction directory
#     echo "Clean-up completed."
# else
#     handle_error "No $SCRIPT_NAME found. Make sure the correct script is present in the archive."
# fi

# Old Version: 1.0.0

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
curl -L -o $ASSET_NAME "$LATEST_RELEASE_URL"

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
  ./snaprescue.sh
else
  echo "Error: No run.sh found. Add your script execution logic here."
fi

# Add additional file executions as needed.
