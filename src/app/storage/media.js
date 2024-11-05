import { promises as fs } from 'fs';
import path from 'path';
import { app } from 'electron';
import { readStoreData, updateStoreData } from './index.js';

// Initialize electron-store
const mediaFolderPath = path.join(app.getPath('userData'), 'media');

// Function to save a media file to disk and store its path in storeData.pages
export async function saveMediaFileToPage(sessionKey, pageId, mediaBuffer, mediaKey) {
  try {
    // Ensure the media folder exists
    await fs.mkdir(mediaFolderPath, { recursive: true });

    // Create a unique file name for the media file
    const fileName = `${mediaKey}.bin`;
    const destinationPath = path.join(mediaFolderPath, fileName);

    // Write the mediaBuffer to the file
    await fs.writeFile(destinationPath, mediaBuffer);

    // Read the existing store data
    const storeData = await readStoreData(sessionKey);

    // Ensure the page object and media_attachments structure exist
    if (!storeData.pages[pageId]) {
      storeData.pages[pageId] = { media_attachments: {} };
    }
    if (!storeData.pages[pageId].media_attachments) {
      storeData.pages[pageId].media_attachments = {};
    }

    // Store the file path relative to the mediaKey
    storeData.pages[pageId].media_attachments[mediaKey] = destinationPath;

    // Save the updated store data
    return await updateStoreData(sessionKey, storeData);
  } catch (error) {
    console.error('Error saving media file to page:', error);
    throw error;
  }
}
