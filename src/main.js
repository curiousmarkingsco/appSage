const { app, BrowserWindow, nativeImage, Tray } = require('electron')
const path = require('path');

function createWindow () {
  // Example: Tray icon creation
  // const trayIcon = nativeImage.createFromPath(path.join(__dirname, '/app/assets/appicons/icon.png'));
  // const tray = new Tray(trayIcon);
  const appIcon = nativeImage.createFromPath(path.join(__dirname, 'app/assets/appicons/icon.png'));

  if (process.platform === 'darwin') {
    const appIconPath = path.resolve(__dirname, 'app/assets/appicons/icon.png');
    const appIcon = nativeImage.createFromPath(appIconPath);
    if (!appIcon.isEmpty()) {
      app.dock.setIcon(appIcon);
    } else {
      console.error('App icon is empty or not loaded correctly:', appIconPath);
    }
    app.dock.setIcon(nativeImage.createFromPath(path.resolve(__dirname, 'app/assets/appicons/icon.png')));
  }

  let splash = new BrowserWindow({
      width: 400,
      height: 300,
      frame: false,
      alwaysOnTop: true,
      icon: appIcon
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
          icon: appIcon,
          webPreferences: {
            preload: path.join(__dirname, 'preload.js'),  // Optional
            // nodeIntegration: true,                        // Allows using Node.js in the renderer
            contextIsolation: false                       // Allows interaction between the main and renderer
          }
      });

      mainWindow.loadFile('./src/index.html');

      // Set CSP header
      // mainWindow.webContents.on('did-finish-load', () => {
      //   mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
      //       details.responseHeaders['Content-Security-Policy'] = ["default 'self'; img 'self' data:; script 'self' 'unsafe-inline'; style 'self' 'unsafe-inline';"];
      //       callback({ cancel: false, responseHeaders: details.responseHeaders });
      //   });
      // });

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
