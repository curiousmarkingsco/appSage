const store = require('./storage');

function storeGlobalSettings(globalSettings) {
  // Store the global settings in electron-store
  store.set('appSage.settings', globalSettings);
}

function getGlobalSettings() {
  const globalSettings = store.get('appSage.settings');
  return globalSettings;
}

function getGlobalFonts() {
  const fonts = store.get('appSage.settings.fonts');
  return fonts;
}

function getGlobalColors() {
  const colors = store.get('appSage.settings.colors');
  return colors;
}
