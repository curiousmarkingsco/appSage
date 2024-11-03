// preload.js
const { contextBridge, ipcRenderer } = require('electron');
try {
  // Expose the store API to the renderer process
  contextBridge.exposeInMainWorld('api', {
    createOrFindStore: (username, userPassword, newStore) => ipcRenderer.invoke('initialize-store', { username, userPassword, newStore }),
    readStore: () => ipcRenderer.invoke('get-store', {}),
    updateStore: (username, userPassword, storeObject) => ipcRenderer.invoke('set-store', { username, userPassword, storeObject }),
    deleteStore: (username, userPassword) => ipcRenderer.invoke('remove-store', { username, userPassword }),
    storePageHtml: (pageId, pageHtml) => ipcRenderer.invoke('store-html', { pageId, pageHtml }),
    storePageCss: (pageCss) => ipcRenderer.invoke('store-css', { pageCss }),
    storePageSettings: (pageId, settings) => ipcRenderer.invoke('store-settings', { pageId, settings }),
    storePageComponent: (pageComponent) => ipcRenderer.invoke('store-component', { pageComponent }),
    getPageHTML: (pageId) => ipcRenderer.invoke('get-html-store', { pageId }),
    getPageCSS: (pageId) => ipcRenderer.invoke('get-css-store', { pageId }),
    getPageSettings: (pageId) => ipcRenderer.invoke('get-settings-store', { pageId }),
    getPageComponent: (pageId, componentName, componentData) => ipcRenderer.invoke('get-component-store', { pageId, componentName, componentData })
  });
} catch (error) {
  console.error('Error in preload script:', error); // Catch and log errors
}
