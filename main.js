const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  let splash = new BrowserWindow({
      width: 400,
      height: 300,
      frame: false,
      alwaysOnTop: true,
      webPreferences: {
          nodeIntegration: true,
      }
  });

  splash.loadFile('./src/electron_app/splash.html');

  splash.on('closed', () => {
      splash = null;
  });

  // Load main application after the splash screen is done
  setTimeout(() => {
      const mainWindow = new BrowserWindow({
          width: 1024,
          height: 680,
          webPreferences: {
              nodeIntegration: true,
              contextIsolation: true,
              preload: path.join(__dirname, './src/electron_app/preload.js') // Use a preload script for secure access
          }
      });

      mainWindow.loadFile('dist/index.html');

      // Set CSP header
      mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
            details.responseHeaders['Content-Security-Policy'] = ["default-src 'self'; img-src 'self' data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"];
            callback({ cancel: false, responseHeaders: details.responseHeaders });
        });
      });

      splash.close();
  }, 3000); // Match the duration of splash.js
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
