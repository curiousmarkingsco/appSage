// preload.js
const { contextBridge, ipcRenderer } = require('electron');
try {
  // Expose the store API to the renderer process
  contextBridge.exposeInMainWorld('api', {
    createOrFindStore: (username, userPassword, newStore) => ipcRenderer.invoke('initialize-store', { username, userPassword, newStore }),
    readStoreData: () => ipcRenderer.invoke('get-store', {}),
    updateStoreData: (storeObject) => ipcRenderer.invoke('set-store', { storeObject }),
    saveMediaFileToPage: (pageId, mediaBuffer, mediaKey) => ipcRenderer.invoke('set-media', { pageId, mediaBuffer, mediaKey }),
    createEditorWindow: (pageId) => ipcRenderer.invoke('open-editor', { pageId }),
    createPreviewWindow: (pageId) => ipcRenderer.invoke('open-preview', { pageId })
  });
} catch (error) {
  console.error('Error in preload script:', error); // Catch and log errors
}
