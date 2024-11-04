import { promises as fs } from 'fs';
import path from 'path';
import { app } from 'electron';
import { readStoreData } from './index.js';

// Initialize electron-store
const mediaFolderPath = path.join(app.getPath('userData'), 'media');

// Function to save a media file to disk and store its path in storeData.pages
export async function saveMediaFileToPage(sessionKey, pageId, mediaPath, mediaKey) {
  try {
    const storeData = readStoreData(sessionKey);
    // Ensure the media folder exists
    await fs.mkdir(mediaFolderPath, { recursive: true });

    // Copy the file to the media folder
    const fileName = path.basename(mediaPath);
    const destinationPath = path.join(mediaFolderPath, fileName);
    await fs.copyFile(mediaPath, destinationPath);

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
    return updateStoreData(sessionKey, storeData);
  } catch (error) {
    console.error('Error saving media file to page:', error);
    throw error;
  }
}

// Function to retrieve the media file path from storeData.pages
function getMediaFilePathFromPage(pageId, mediaKey) {
  const storeData = store.get('appSageStorage') || { pages: {} };
  if (storeData.pages[pageId] && storeData.pages[pageId].media_attachments) {
    return storeData.pages[pageId].media_attachments[mediaKey] || null;
  }
  return null;
}
