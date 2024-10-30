// electron_storage.js

async function readElectronStore() {
  window.api.readStore()
    .then(store => {
      appSageStore = store;
      return store;
    })
    .catch(error => {
      console.error('Error initializing store:', error.stack || error);
    });
}

console.log((appSageStore));
// update

// delete

// store html
// storePageHtml: (pageHtml) => ipcRenderer.invoke('store-html', { pageHtml })
async function electronStorePageHtml(pageHtml) {
  window.api.storePageHtml(pageHtml)
    .then(store => {
      appSageStore = store;
      return store;
    })
    .catch(error => {
      console.error('Error initializing store:', error.stack || error);
    });
}

// store css

// store settings

// store component

// get page

// get css

// get settings

// get component

