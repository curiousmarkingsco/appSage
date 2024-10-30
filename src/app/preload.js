// preload.js

try {
  const { contextBridge, ipcRenderer } = require('electron');
  // Expose the store API to the renderer process
  contextBridge.exposeInMainWorld('api', {
    createOrFindStore: (username, userPassword) => ipcRenderer.invoke('initialize-store', { username, userPassword }),
    readStore: () => ipcRenderer.invoke('get-store', {}),
    updateStore: (username, userPassword, storeObject) => ipcRenderer.invoke('set-store', { username, userPassword, storeObject }),
    deleteStore: (username, userPassword) => ipcRenderer.invoke('remove-store', { username, userPassword }),
    storePageHtml: (pageHtml) => ipcRenderer.invoke('store-html', { pageHtml }),
    storePageCss: (pageCss) => ipcRenderer.invoke('store-css', { pageCss }),
    storePageSettings: (pageSettings) => ipcRenderer.invoke('store-settings', { pageSettings }),
    storePageComponent: (pageComponent) => ipcRenderer.invoke('store-component', { pageComponent }),
    getPageHTML: (pageId) => ipcRenderer.invoke('get-html-store', { pageId }),
    getPageCSS: (pageId) => ipcRenderer.invoke('get-css-store', { pageId }),
    getPageSettings: (pageId) => ipcRenderer.invoke('get-settings-store', { pageId }),
    getPageComponent: (pageId, componentName, componentData) => ipcRenderer.invoke('get-component-store', { pageId, componentName, componentData })
  });
} catch (error) {
  console.error('Error in preload script:', error); // Catch and log errors
}
