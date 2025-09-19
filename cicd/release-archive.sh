#!/bin/bash

# Exit on error
set -e

# Configuration
PROJECT_NAME="frontend-boilerplate"
S3_BUCKET="frontend-boilerplate"
S3_DIRECTORY="release"
CURRENT_DIR=$(pwd)

# Get version from package.json
VERSION=$(grep '"version":' package.json | sed -E 's/.*"version": "([^"]+)".*/\1/')
ARCHIVE_NAME="${PROJECT_NAME}-v${VERSION}.zip"

# Check dependencies
check_dependencies() {
    echo "🔍 Checking dependencies..."

    # Check if zip is installed
    if ! command -v zip &> /dev/null; then
        echo "❌ zip is not installed. Please install it first."
        echo "   On macOS: brew install zip"
        echo "   On Ubuntu: sudo apt-get install zip"
        exit 1
    fi

    # Check if aws cli is installed
    if ! command -v aws &> /dev/null; then
        echo "❌ AWS CLI is not installed. Please install it first."
        echo "   Visit: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
        exit 1
    fi

    echo "✅ All dependencies are installed."
}

# Clean build files and temporary files
clean_project() {
    echo "🧹 Cleaning project..."
    rm -rf .next
    rm -rf node_modules
    find . -type f -name "*.log" -delete
    find . -type d -name "__pycache__" -exec rm -rf {} +
    find . -type f -name ".DS_Store" -delete
    echo "✅ Project cleaned successfully."
}

# Create zip archive
create_archive() {
    echo "📦 Creating archive ${ARCHIVE_NAME}..."

    # Create a temporary directory for the archive
    TEMP_DIR=$(mktemp -d)

    # Copy all files except .git to temp directory
    rsync -av --progress . "$TEMP_DIR" \
        --exclude '.git' \
        --exclude '.DS_Store' \
        --exclude "${ARCHIVE_NAME}"

    # Create zip archive
    cd "$TEMP_DIR" && zip -r "${CURRENT_DIR}/${ARCHIVE_NAME}" . && cd -

    # Clean up temp directory
    rm -rf "$TEMP_DIR"

    echo "✅ Archive created successfully."
}

# Upload to S3
upload_to_s3() {
    echo "⬆️ Uploading to S3..."
    if [ -f "${CURRENT_DIR}/${ARCHIVE_NAME}" ]; then
        # Upload versioned archive
        aws s3 cp "${CURRENT_DIR}/${ARCHIVE_NAME}" "s3://${S3_BUCKET}/${S3_DIRECTORY}/"
        echo "✅ Versioned archive uploaded successfully."

        # Upload as latest
        LATEST_ARCHIVE="${PROJECT_NAME}-latest.zip"
        aws s3 cp "${CURRENT_DIR}/${ARCHIVE_NAME}" "s3://${S3_BUCKET}/${S3_DIRECTORY}/${LATEST_ARCHIVE}"
        echo "✅ Latest archive uploaded successfully."

        echo "🔓 Files are now publicly accessible."
    else
        echo "❌ Error: Archive file not found at ${CURRENT_DIR}/${ARCHIVE_NAME}"
        exit 1
    fi
}

# Clean up local archive
cleanup() {
    echo "🧹 Cleaning up local archive..."
    if [ -f "${CURRENT_DIR}/${ARCHIVE_NAME}" ]; then
        rm "${CURRENT_DIR}/${ARCHIVE_NAME}"
        echo "✅ Cleanup completed."
    fi
}

# Main execution
main() {
    echo "🚀 Releasing ${PROJECT_NAME} v${VERSION}..."

    check_dependencies
    clean_project
    create_archive
    upload_to_s3
    cleanup

    echo "✅ Release process completed successfully!"
    echo "📦 Archive uploaded to: s3://${S3_BUCKET}/${S3_DIRECTORY}/${ARCHIVE_NAME}"
}

# Run main function
main
