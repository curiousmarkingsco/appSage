// preload.js

import { contextBridge, ipcRenderer } from 'electron';

// Expose the Electron API to the renderer process
contextBridge.exposeInMainWorld('api', {
  createOrFindStore: (username, userPassword) => ipcRenderer.invoke('initialize-store', { username, userPassword }),
  readStore: () => ipcRenderer.invoke('get-store'),
  updateStore: (data) => ipcRenderer.invoke('update-store', data),
  deleteStore: () => ipcRenderer.invoke('delete-store')
});

console.log('Preload script is running, and store module has been loaded.');
