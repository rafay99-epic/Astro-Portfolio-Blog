#!/bin/sh -e

# Define colors for error messages
rc='\033[0m'
red='\033[0;31m'

# Check function to handle errors
check() {
    exit_code=$1
    message=$2

    if [ "$exit_code" -ne 0 ]; then
        printf '%sERROR: %s%s\n' "$red" "$message" "$rc"
        exit 1
    fi

    unset exit_code
    unset message
}

# Fetch the latest release tarball URL
getUrl() {
    echo "https://github.com/rafay99-epic/SnapRescue/releases/latest/download/snaprescue.tar.gz"
}

# Create a temporary file
temp_file=$(mktemp -d)
check $? "Creating the temporary directory"

# Download the latest release tarball
curl -fsL "$(getUrl)" -o "$temp_file/snaprescue.tar.xz"
check $? "Downloading SnapRescue"

# Extract the tarball
tar -xzf "$temp_file/snaprescue.tar.xz" -C "$temp_file"
check $? "Extracting SnapRescue files"

# Make the main script executable and run it
chmod +x "$temp_file/snaprescue/snaprescue.sh"
check $? "Making snaprescue.sh executable"

"$temp_file/snaprescue/snaprescue.sh"
check $? "Executing SnapRescue"

# Clean up temporary files
rm -rf "$temp_file"
check $? "Deleting the temporary directory"
