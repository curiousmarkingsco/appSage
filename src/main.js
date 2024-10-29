// Import required modules
import isDev from 'electron-is-dev';
import { app, BrowserWindow, nativeImage, ipcMain, Tray } from 'electron';
import path from 'path';
import { createStore } from './app/storage/index.js';
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
    mainWindow.webContents.on('did-finish-load', () => {
      mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
        details.responseHeaders['Content-Security-Policy'] = [
          "default 'self'; img 'self' data:; script 'self' 'unsafe-inline'; style 'self' 'unsafe-inline';",
        ];
        callback({ cancel: false, responseHeaders: details.responseHeaders });
      });
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

// IPC handler for initializing store
ipcMain.handle('initialize-store', async (event, { username, userPassword }) => {
  try {
    const store = await createStore(username, userPassword);
    return store;
  } catch (error) {
    console.error('Error creating store:', error);
    throw error;
  }
});
