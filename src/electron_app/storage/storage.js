// temporary credentials until authentication/authorization designed and implemented
const username = '1234';
const userPassword = '1234';

const crypto = require('crypto');

function deriveKey(password) {
    const salt = crypto.randomBytes(16).toString('hex'); // Generate a random salt
    const iterations = 100000;
    const keyLength = 32; // 256 bits
    return crypto.pbkdf2Sync(password, salt, iterations, keyLength, 'sha512');
}

const Store = require('electron-store');

function createStore(username, password) {
    const encryptionKey = deriveKey(username + password); // Derive the key from the password
    const store = new Store({
      encryptionKey: encryptionKey,
      schema: {
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
      }
    });

    return store;
}

const store = createStore(username + userPassword); // userPassword should come from the user input

module.exports = store;

// store.set('appSage.pages.uniquePageId.html', '<html>...</html>');
// const storedHTML = store.get('appSage.pages.uniquePageId.html');
// console.log(storedHTML); // Retrieves the decrypted HTML

const store = require('./storage'); // Assuming the encrypted store is already initialized

// Function to retrieve data securely
function getDecryptedData(username, password) {
  try {
    // Derive the decryption key from the username and password
    const decryptionKey = deriveKey(username + password);

    // Initialize electron-store with the derived decryption key
    const storeWithDecryption = new Store({ encryptionKey: decryptionKey });

    // Now retrieve any encrypted data
    const appData = storeWithDecryption.get('appSage');

    if (appData) {
      console.log('Decrypted appSage Data:', appData);
    } else {
      console.log('Failed to decrypt: Incorrect credentials');
    }
  } catch (error) {
    console.log('Error decrypting data:', error);
  }
}

// Example usage: Correct credentials
// getDecryptedData('1234', '1234');
