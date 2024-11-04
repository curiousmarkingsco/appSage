// Import required modules
import isDev from 'electron-is-dev';
import { app, BrowserWindow, nativeImage, ipcMain, Tray } from 'electron';
import path from 'path';
import { getOrSetEncryptionKey, createOrFindStore, readStoreData, updateStoreData } from './app/storage/index.js';

const __dirname = path.resolve();

// Check if in development mode and use require() to load CommonJS module
if (isDev) {
  try {
    require('electron-reloader')(module);
  } catch { }
}

let sessionKey;

function createWindow() {
  // Example: Tray icon creation
  const appIcon = nativeImage.createFromPath(path.join(__dirname, './src/app/assets/appicons/icon.png'));

  if (process.platform === 'darwin') {
    const appIconPath = path.resolve(__dirname, './src/app/assets/appicons/icon.png');
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
        preload: path.join(__dirname, 'src', 'app', 'preload.js'),
      },
    });

    mainWindow.loadFile('./src/app/render.html');


    // Open DevTools in development mode
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }

    // Set CSP header
    if (isDev) {
      mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
        details.responseHeaders['Content-Security-Policy'] = [
          "default-src 'self'; img-src 'self' data:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
        ];
        callback({ cancel: false, responseHeaders: details.responseHeaders });
      });
    }
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
ipcMain.handle('initialize-store', async (event, { username, userPassword, newStore }) => {
  try {
    sessionKey = await getOrSetEncryptionKey(username, userPassword, newStore);
    const data = await createOrFindStore(sessionKey, newStore);
    return data;
  } catch (error) {
    console.error('Error creating store:', error);
    throw error;
  }
});

ipcMain.handle('get-store', async (event, { }) => {
  try {
    const store = await readStoreData(sessionKey);
    return store;
  } catch (error) {
    console.error('Error reading store:', error);
    throw error;
  }
});

ipcMain.handle('set-store', async (event, { storeObject }) => {
  try {
    const store = await updateStoreData(sessionKey, storeObject);
    return store;
  } catch (error) {
    console.error('Error updating store:', error);
    throw error;
  }
});
