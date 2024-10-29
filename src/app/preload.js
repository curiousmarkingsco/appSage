// preload.js

try {
  const { contextBridge, ipcRenderer } = require('electron');
  // Expose the store API to the renderer process
  contextBridge.exposeInMainWorld('api', {
    createOrFindStore: (username, userPassword) => ipcRenderer.invoke('initialize-store', { username, userPassword }),
    readStore: (username, userPassword) => ipcRenderer.invoke('get-store', {}),
    updateStore: (username, userPassword) => ipcRenderer.invoke('set-store', { username, userPassword }),
    deleteStore: (username, userPassword) => ipcRenderer.invoke('remove-store', { username, userPassword }),
  });
  console.log('Preload script is running, and store module has been loaded.');
} catch (error) {
  console.error('Error in preload script:', error); // Catch and log errors
}
