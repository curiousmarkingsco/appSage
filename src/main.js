// Import required modules
import isDev from 'electron-is-dev';
import { app, BrowserWindow, nativeImage, ipcMain, Tray } from 'electron';
import path from 'path';
import { getOrSetEncryptionKey, createOrFindStore, readStore, updateStore, deleteStore  } from './app/storage/index.js';
import { storePageHtml,
         storePageCSS,
         storePageSettings,
         storePageComponent,
         getPageHTML,
         getPageCSS,
         getPageSettings,
         getPageComponent } from './app/storage/page.js';
import { fileURLToPath } from 'url';  // To handle __dirname in ESM
import { dirname } from 'path';

// Handling __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Check if in development mode and use require() to load CommonJS module
if (isDev) {
  try {
    require('electron-reloader')(module);
  } catch {}
}

let sessionKey;

function createWindow() {
  // Example: Tray icon creation
  const appIcon = nativeImage.createFromPath(path.join(__dirname, 'app/assets/appicons/icon.png'));

  if (process.platform === 'darwin') {
    const appIconPath = path.resolve(__dirname, 'app/assets/appicons/icon.png');
    const appIcon = nativeImage.createFromPath(appIconPath);
    if (!appIcon.isEmpty()) {
      app.dock.setIcon(appIcon);
    } else {
      console.error('App icon is empty or not loaded correctly:', appIconPath);
    }
  }

  let splash = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    alwaysOnTop: true,
    icon: appIcon,
  });

  splash.loadFile('./src/app/splash.html');

  splash.on('closed', () => {
    splash = null;
  });

  // Load main application after the splash screen is done
  setTimeout(() => {
    const mainWindow = new BrowserWindow({
      width: 1536,
      height: 1024,
      icon: appIcon,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, 'app/preload.js'),
      },
    });

    mainWindow.loadFile('./src/app/index.html');

    // Open DevTools in development mode
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }

    // Set CSP header
    mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
      details.responseHeaders['Content-Security-Policy'] = [
        "default-src 'self'; img-src 'self' data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
      ];
      callback({ cancel: false, responseHeaders: details.responseHeaders });
    });
  }, 3000); // Match the duration of splash.js
  splash.close();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC handler for storage access
ipcMain.handle('initialize-store', async (event, { username, userPassword }) => {
  try {
    sessionKey = await getOrSetEncryptionKey(username, userPassword);
    const store = await createOrFindStore(sessionKey);
    return store;
  } catch (error) {
    console.error('Error creating store:', error);
    throw error;
  }
});

ipcMain.handle('get-store', async (event, {}) => {
  try {
    const store = await readStore(sessionKey);
    return store;
  } catch (error) {
    console.error('Error reading store:', error);
    throw error;
  }
});

ipcMain.handle('set-store', async (event, { username, userPassword, storeObject }) => {
  try {
    const store = await updateStore(username, userPassword, storeObject);
    return store;
  } catch (error) {
    console.error('Error updating store:', error);
    throw error;
  }
});

ipcMain.handle('remove-store', async (event, { username, userPassword, pageId }) => {
  // Danger zone: This deletes ALL data.
  try {
    const store = await deleteStore(username, userPassword);
    return store;
  } catch (error) {
    console.error('Error deleting store:', error);
    throw error;
  }
});

ipcMain.handle('store-html', async (event, { pageId, pageHtml }) => {
  try {
    const store = await storePageHtml(pageId, pageHtml, sessionKey);
    return store;
  } catch (error) {
    console.error('Error deleting store:', error);
    throw error;
  }
});

ipcMain.handle('store-css', async (event, { pageId, pageCss }) => {
  try {
    const store = await storePageCSS(pageId, pageCss, sessionKey);
    return store;
  } catch (error) {
    console.error('Error deleting store:', error);
    throw error;
  }
});

ipcMain.handle('store-settings', async (event, { pageId, pageSettings }) => {
  try {
    const store = await storePageSettings(pageId, pageSettings, sessionKey);
    return store;
  } catch (error) {
    console.error('Error deleting store:', error);
    throw error;
  }
});

ipcMain.handle('store-component', async (event, { pageId, pageComponent }) => {
  try {
    const store = await storePageComponent(pageId, pageComponent, sessionKey);
    return store;
  } catch (error) {
    console.error('Error deleting store:', error);
    throw error;
  }
});

ipcMain.handle('get-store-html', async (event, { pageId }) => {
  try {
    const store = await getPageHTML(pageId, sessionKey);
    return store;
  } catch (error) {
    console.error('Error deleting store:', error);
    throw error;
  }
});

ipcMain.handle('get-store-css', async (event, { pageId }) => {
  try {
    const store = await getPageCSS(pageId, sessionKey);
    return store;
  } catch (error) {
    console.error('Error deleting store:', error);
    throw error;
  }
});

ipcMain.handle('get-store-settings', async (event, { pageId }) => {
  try {
    const store = await getPageSettings(pageId, sessionKey);
    return store;
  } catch (error) {
    console.error('Error deleting store:', error);
    throw error;
  }
});

ipcMain.handle('get-store-component', async (event, { pageId, componentName, componentData }) => {
  try {
    const store = await getPageComponent(pageId, componentName, componentData, sessionKey);
    return store;
  } catch (error) {
    console.error('Error deleting store:', error);
    throw error;
  }
});
