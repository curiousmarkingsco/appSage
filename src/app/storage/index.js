// src/storage/index.js
import { promises as fs } from 'fs';
import path from 'path';
import { app } from 'electron';
import { default as Store } from 'electron-store';
import { fileURLToPath } from 'url';
import crypto from 'crypto'; // Node.js crypto module import

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let store;

// Function to generate a salt
function generateSalt() {
  return crypto.randomBytes(16).toString('hex'); // Generate a random salt
}

// Function to derive the encryption key using a stored salt
function deriveKey(password, salt) {
  const iterations = 100000;
  const keyLength = 32; // 256 bits
  return crypto.pbkdf2Sync(password, salt, iterations, keyLength, 'sha512');
}

export async function getOrSetEncryptionKey(username, password, newStore = false) {
  try {
    // Use a separate store instance for unencrypted values like salt
    const metaStore = new Store(); // No encryption here, just for metadata like salt

    // Retrieve or generate the salt
    let salt = metaStore.get('salt');
    if (!salt) {
      salt = generateSalt(); // Generate a new salt if not found
      metaStore.set('salt', salt); // Store the salt unencrypted
    }

    // Derive the encryption key using the password and the stored salt
    const encryptionKey = deriveKey(username + password, salt);

    return encryptionKey;
  } catch (error) {
    console.log('Error generating encryption key:', error.stack || error);
    return null; // Return null if any error occurs during key derivation
  }
}

// Function to create the store
export async function createOrFindStore(sessionKey, newStore = false) {
  try {
    // Create the schema for the store (not encrypted)
    const schema = await loadSchema();
    const store = new Store({ schema });
    const data = await readStoreData(sessionKey);

    // Check if we have existing encrypted data in the store
    if (!newStore && data !== null) {
      return data;
    } else {
      // Initialize default data
      const defaultData = {
        settings: {
          fonts: { inter: 'Inter' },
          colors: {},
          advancedMode: false
        },
        pages: {},
        titles: {}
      };

      // Encrypt and store the sensitive data manually
      const encryptedData = encryptData(defaultData, sessionKey);

      store.set('encryptedData', encryptedData);

      return defaultData;
    }
  } catch (error) {
    console.error('Error creating or finding store:', error);
    throw error;
  }
}

export async function readStoreData(sessionKey) {
  try {
    const encryptionKey = sessionKey;
    const schema = await loadSchema();
    const store = new Store({ schema });
    const encryptedData = store.get('encryptedData');
    const decryptedData = decryptData(encryptedData, encryptionKey);
    return decryptedData;
  } catch (error) {
    console.error('Error reading store data:', error);
    throw error;
  }
}

export async function updateStoreData(sessionKey, updatedData) {
  try {
    const encryptionKey = sessionKey;
    const schema = await loadSchema();
    const store = new Store({ schema });
    const newEncryptedData = encryptData(updatedData, encryptionKey);
    store.set('encryptedData', newEncryptedData);

    return await readStoreData(sessionKey);
  } catch (error) {
    console.error('Error updating store data:', error);
    throw error;
  }
}

// Function to perform a deep merge of two objects
function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (
      source[key] instanceof Object &&
      key in target &&
      target[key] instanceof Object
    ) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  return { ...target, ...source };
}

// Function to encrypt data
export function encryptData(data, encryptionKey) {
  try {
    const iv = crypto.randomBytes(16); // Initialization vector
    const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);

    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return {
      iv: iv.toString('hex'),
      content: encrypted
    };
  } catch (error) {
    console.log('Error encrypting data:', error.stack || error);
    return null; // Return null if any error occurs during encryption
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
    return null; // Return null if any error occurs during decryption
  }
}

// Helper function to dynamically load schema based on app version
export async function loadSchema() {
  const appVersion = app.getVersion(); // Get the app version (e.g., '0.0.0')
  const schemaPath = path.join(__dirname, 'schema', `${appVersion}.json`);

  try {
    const schemaData = await fs.readFile(schemaPath, 'utf8'); // Load schema file as string
    return JSON.parse(schemaData); // Parse the JSON schema
  } catch (error) {
    console.error(`Error loading schema for version ${appVersion}:`, error);
    throw new Error('Failed to load schema');
  }
}
