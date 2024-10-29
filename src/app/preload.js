// preload.js

// try {
  const { contextBridge, ipcRenderer } = require('electron');
  // Expose the store API to the renderer process
  contextBridge.exposeInMainWorld('api', {
    createStore: (username, userPassword) => ipcRenderer.invoke('initialize-store', { username, userPassword })
  });
  console.log('Preload script is running, and store module has been loaded.');
// } catch (error) {
//   console.error('Error in preload script:', error); // Catch and log errors
// }
