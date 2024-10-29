// app/storage/index.js

// ES Module imports for other files inside the storage directory
// import { media } from './media.js';
// import { page } from './page.js';
// import { revisions } from './revisions.js';
// import { settings } from './settings.js';

// Export them all in one module
// export { media, page, revisions, settings };

import { ipcMain } from 'electron';  // Electron module import
import crypto from 'crypto';  // Node.js crypto module import

let store;  // Store will be initialized when data is received

// Function to generate a salt
export async function generateSalt() {
  return crypto.randomBytes(16).toString('hex');  // Generate a random salt
}

// Function to derive the encryption key using a stored salt
export function deriveKey(password, salt) {
  const iterations = 100000;
  const keyLength = 32;  // 256 bits
  return crypto.pbkdf2Sync(password, salt, iterations, keyLength, 'sha512');
}

// Function to create the store
export async function createStore(username, password) {
  const { default: Store } = await import('electron-store');  // Dynamically import electron-store

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

  // Create the schema for the store (not encrypted)
  const schema = {
    appSage: {
      type: 'object',
      properties: {
        settings: {
          type: 'object',
          properties: {
            fonts: { type: 'object' },
            colors: { type: 'object' },
            advancedMode: { type: 'boolean' }
          }
        },
        pages: {
          type: 'object',
          additionalProperties: {
            type: 'object',
            properties: {
              html: { type: 'string' },
              styles: {
                type: 'object',
                properties: {
                  css: { type: 'string' },
                  config: { type: 'object' }
                }
              },
              components: { type: 'object' },
              settings: { type: 'object' }
            }
          }
        }
      }
    }
  };

  // Initialize the store without encryption
  const store = new Store({ schema });

  // Check if we have existing encrypted data in the store
  if (store.has('encryptedData')) {
    const encryptedData = store.get('encryptedData');
    const decryptedData = decryptData(encryptedData, encryptionKey);
    return decryptedData;
  } else {
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

// Function to retrieve data securely
export async function getDecryptedData(username, password) {
  try {
    const { default: Store } = await import('electron-store');  // Dynamically import electron-store

    const store = new Store();
    
    // Retrieve the stored salt
    const salt = store.get('salt');
    if (!salt) {
      console.log('Salt not found. Cannot decrypt data.');
      return null;  // Return null if salt is not available
    }

    // Derive the decryption key from the username, password, and stored salt
    const decryptionKey = deriveKey(username + password, salt);

    // Initialize electron-store with the derived decryption key
    const storeWithDecryption = new Store({ encryptionKey: decryptionKey });

    // Now retrieve any encrypted data
    const appData = storeWithDecryption.get('appSage');

    if (appData) {
      console.log('Decrypted appSage Data:', appData);
      return appData;
    } else {
      console.log('No appSage data found or decryption failed: Incorrect credentials');
      return null;
    }
  } catch (error) {
    console.log('Error decrypting data:', error.stack || error);
    return null;  // Return null if any error occurs during decryption
  }
}

// Function to encrypt data
export function encryptData(data, encryptionKey) {
  const iv = crypto.randomBytes(16);  // Initialization vector
  const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);
  
  let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return {
    iv: iv.toString('hex'),
    content: encrypted
  };
}

// Function to decrypt data
export function decryptData(encryptedData, encryptionKey) {
  const iv = Buffer.from(encryptedData.iv, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv);
  
  let decrypted = decipher.update(encryptedData.content, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return JSON.parse(decrypted);
}
