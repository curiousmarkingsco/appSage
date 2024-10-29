// app/storage/media.js

const fs = require('fs');
const path = require('path');

// Function to get the media storage path based on the current date
function getMediaStoragePath(basePath) {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so add 1
  const day = String(today.getDate()).padStart(2, '0');

  // Construct the media path (e.g., /basePath/media/2024/10/24)
  return path.join(basePath, 'media', year, month, day);
}

// Function to save a media file to the appropriate path
function saveMediaFile(fileName, fileContent, basePath = app.getPath('userData')) {
  // Get the storage path based on the current date
  const mediaPath = getMediaStoragePath(basePath);

  // Ensure the directory structure exists
  if (!fs.existsSync(mediaPath)) {
    fs.mkdirSync(mediaPath, { recursive: true });
  }

  const uniqueFileName = `${Date.now()}_${fileName}`; // Example: 1697899654679_example.jpg

  // Construct the full file path (e.g., /basePath/media/2024/10/24/example.jpg)
  const filePath = path.join(mediaPath, uniqueFileName);

  // Save the file (assuming fileContent is a Buffer or string)
  fs.writeFileSync(filePath, fileContent);

  console.log(`Media file saved at: ${filePath}`);
}

// Example usage
// const basePath = '/Users/someuser/Library/Application Support/appSage'; // Example base path
// const fileName = 'example.jpg';
// const fileContent = Buffer.from('File content here'); // This should be the actual file content

// saveMediaFile(basePath, fileName, fileContent);
