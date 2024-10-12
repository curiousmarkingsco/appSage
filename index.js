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

  splash.loadFile('./electron_app/splash.html');

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
          }
      });
      mainWindow.loadFile('index.html');
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
