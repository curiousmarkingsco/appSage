// app/storage/index.js
import { promises as fs } from 'fs';
import path from 'path';
import { app } from 'electron'; 
import { default as Store } from 'electron-store';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ES Module imports for other files inside the storage directory
// import { media } from './media.js';

// import { revisions } from './revisions.js';
// import { settings } from './settings.js';

// Export them all in one module
// export { media, page, revisions, settings };

import { ipcMain } from 'electron';  // Electron module import
import crypto from 'crypto'; // Node.js crypto module import

let store;

// Function to generate a salt
function generateSalt() {
  return crypto.randomBytes(16).toString('hex');  // Generate a random salt
}

// Function to derive the encryption key using a stored salt
function deriveKey(password, salt) {
  const iterations = 100000;
  const keyLength = 32;  // 256 bits
  return crypto.pbkdf2Sync(password, salt, iterations, keyLength, 'sha512');
}

export async function getOrSetEncryptionKey(username, password) {
  try {
    // Use a separate store instance for unencrypted values like salt
    const metaStore = new Store();  // No encryption here, just for metadata like salt

    // Retrieve or generate the salt
    let salt = metaStore.get('salt');
    if (!salt) {
      salt = await generateSalt();  // Generate a new salt if not found
      metaStore.set('salt', salt);  // Store the salt unencrypted
    }

    // Derive the encryption key using the password and the stored salt
    const encryptionKey = deriveKey(username + password, salt);

    return encryptionKey;
  } catch (error) {
    console.log('Error decrypting data:', error.stack || error);
    return null;  // Return null if any error occurs during decryption
  }
}

// Function to create the store
export async function createOrFindStore(sessionKey) {
  // Create the schema for the store (not encrypted)
  const schema = await loadSchema();
  const store = new Store({ schema });
  // Check if we have existing encrypted data in the store
  if (store.has('encryptedData')) {
    const data = readStore(sessionKey);
    return data;
  } else {
    // Initialize the store without encryption
    const store = new Store({ schema });
    // Initialize default data
    const defaultData = {
      settings: {
        fonts: { size: 12, family: 'Arial' },
        colors: { theme: 'light' },
        advancedMode: false
      },
      pages: {}
    };

    // Encrypt and store the sensitive data manually
    const encryptedData = encryptData(defaultData, encryptionKey);
    store.set('encryptedData', encryptedData);

    return defaultData;
  }
}

export async function readStore(sessionKey) {
  const encryptionKey = sessionKey;
  const schema = await loadSchema();
  const store = new Store({ schema });
  const encryptedData = store.get('encryptedData');
  const decryptedData = decryptData(encryptedData, encryptionKey);
  return decryptedData;
}

export async function updateStore(username, password, data) {
  const encryptionKey = await getOrSetEncryptionKey(username, password);
  const schema = await loadSchema();
  const store = new Store({ schema });
  const encryptedData = store.set('encryptedData', data);
  const decryptedData = decryptData(encryptedData, encryptionKey);
  return decryptedData;
}

export async function deleteStore(username, password) {
  const encryptionKey = await getOrSetEncryptionKey(username, password);
  const schema = await loadSchema();
  const store = new Store({ schema });
  const encryptedData = store.set('encryptedData', data);
  const decryptedData = decryptData(encryptedData, encryptionKey);
  return decryptedData;
}

// Function to encrypt data
export function encryptData(data, encryptionKey) {
  try {
    const iv = crypto.randomBytes(16);  // Initialization vector
    const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);
    
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return {
      iv: iv.toString('hex'),
      content: encrypted
    };
  } catch (error) {
    console.log('Error encrypting data:', error.stack || error);
    return null;  // Return null if any error occurs during decryption
  }
}

// Function to decrypt data
export function decryptData(encryptedData, encryptionKey) {
  try {
    const iv = Buffer.from(encryptedData.iv, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv);
    
    let decrypted = decipher.update(encryptedData.content, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return JSON.parse(decrypted);
  } catch (error) {
    console.log('Error decrypting data:', error.stack || error);
    return null;  // Return null if any error occurs during decryption
  }
}

// Helper function to dynamically load schema based on environment variable
async function loadSchema() {
  const appVersion = app.getVersion();  // Get the app version (e.g., '0.0.0')
  const schemaPath = path.join(__dirname, 'schema', `${appVersion}.json`);

  try {
    const schemaData = await fs.readFile(schemaPath, 'utf8');  // Load schema file as string
    return JSON.parse(schemaData);  // Parse the JSON schema
  } catch (error) {
    console.error(`Error loading schema for version ${appVersion}:`, error);
    throw new Error('Failed to load schema');
  }
}
