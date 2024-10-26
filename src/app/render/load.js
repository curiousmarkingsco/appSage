/*

  load.js
  
  This file is intended to be the primary location for functions that load
  saved content from previous edits. This loading is not just for the editor,
  but the preview page as well. As such, final outputs, particularly for
  preview, should present as production-ready.

*/

const store = require('../../electron_app/storage/storage.js');

// Utility functions for managing localStorage with a 'appSageStorage' object
// DATA IN: String
function loadPage(pageId) {
  if (storageMethodLegacy) {
    const appSageStorage = JSON.parse(localStorage.getItem(appSageStorageString) || '{}');
    if (appSageStorage.pages && appSageStorage.pages[pageId] && appSageStorage.pages[pageId].page_data) {
      return appSageStorage.pages[pageId].page_data;
    } else {
      return null;
    }
  } else {
    // Use electron-store for loading page data
    const storedData = store.get(`appSage.pages.${pageId}.html`);
    return storedData || null;
  }
} // DATA OUT: String || null

// Currently, media added through the file selector is stored as base64 plain
// text in the document (and consequently, storage). To keep things a bit
// tidier, these blobs are stored in an object separate from the HTML content.
// DATA IN: String
async function loadPageBlobs(config) {
  if (storageMethodLegacy) {
    const db = await openDatabase();
    const transaction = db.transaction(['mediaStore'], 'readonly');
    const store = transaction.objectStore('mediaStore');
    
    const blobsRequest = store.get(config);

    blobsRequest.onsuccess = function(event) {
      const blobs = event.target.result ? event.target.result.blobs : null;
      const page = document.getElementById('page');
      
      if (blobs) {
        Object.keys(blobs).forEach(key => {
          const element = page.querySelector(`.bg-local-${key}`);
          if (element) element.style.backgroundImage = `url(${URL.createObjectURL(blobs[key])})`;
        });
      }
    };

    blobsRequest.onerror = function(event) {
      console.error('Error fetching blobs from IndexedDB:', event.target.error);
    };
  } else {
    // Use electron-store to load blobs
    const blobs = store.get(`appSage.pages.${config}.blobs`);
    if (blobs) {
      const page = document.getElementById('page');
      Object.keys(blobs).forEach(key => {
        const element = page.querySelector(`.bg-local-${key}`);
        if (element) element.style.backgroundImage = `url(${blobs[key]})`;
      });
    }
  }
} // DATA OUT: null

// Because metadata needs to be added to the <head> tag rather than the
// expected '#page' div, metadata is stored in a separate object and,
// consequently, this separate function.
// DATA IN: ['String', 'HTML Element, <div>']
function loadPageMetadata(pageId) {
  if (storageMethodLegacy) {
    const storedData = JSON.parse(localStorage.getItem(appSageStorageString));
    const metaTags = storedData.pages[pageId].settings.metaTags;
    const fontSettings = JSON.parse(localStorage.getItem(appSageSettingsString));

    if (metaTags && metaTags !== '') {
      const element = document.querySelector('head');
      metaTags.forEach(tag => {
        const metaTag = document.createElement(tag.type === 'link' ? 'link' : 'meta');
        metaTag.setAttribute(tag.type === 'link' ? 'href' : tag.type, tag.content);
        metaTag.setAttribute(tag.type === 'link' ? 'rel' : 'content', tag.name);
        element.appendChild(metaTag);
      });
    }

    if (fontSettings) {
      const element = document.querySelector('head');
      let fonts = Object.values(fontSettings.fonts).join('&family=');
      const metaTag = document.createElement('link');
      metaTag.setAttribute('href', `https://fonts.googleapis.com/css2?family=${fonts}&display=swap`);
      metaTag.setAttribute('rel', 'stylesheet');
      element.appendChild(metaTag);
    }
  } else {
    // Use electron-store for metadata
    const settings = store.get(`appSage.pages.${pageId}.settings`);
    const metaTags = settings ? settings.metaTags : null;
    const fonts = store.get('appSage.settings.fonts');

    if (metaTags) {
      const element = document.querySelector('head');
      metaTags.forEach(tag => {
        const metaTag = document.createElement(tag.type === 'link' ? 'link' : 'meta');
        metaTag.setAttribute(tag.type === 'link' ? 'href' : tag.type, tag.content);
        metaTag.setAttribute(tag.type === 'link' ? 'rel' : 'content', tag.name);
        element.appendChild(metaTag);
      });
    }

    if (fonts) {
      const element = document.querySelector('head');
      let fontsList = Object.values(fonts).join('&family=');
      const metaTag = document.createElement('link');
      metaTag.setAttribute('href', `https://fonts.googleapis.com/css2?family=${fontsList}&display=swap`);
      metaTag.setAttribute('rel', 'stylesheet');
      element.appendChild(metaTag);
    }
  }
} // DATA OUT: String || null

// Because page settings need to be added to various locations other than the
// expected '#page' div, page settings are stored in a separate object and,
// consequently, this separate function.
// DATA IN: ['String', 'Boolean']
function loadPageSettings(config, view = false) {
  if (storageMethodLegacy) {
    const appSageStorage = JSON.parse(localStorage.getItem(appSageStorageString) || '{}');

    if (appSageStorage.pages && appSageStorage.pages[config] && appSageStorage.pages[config].settings) {
      const settings = appSageStorage.pages[config].settings;
      const element = document.getElementById(settings.id);

      if (element && settings.className) {
        element.className = settings.className;
      }

      if (settings.metaTags) {
        const head = document.getElementsByTagName('head')[0];
        const div = document.createElement('div');
        div.innerHTML = settings.metaTags;
        Array.from(div.childNodes).forEach(tag => {
          if (tag.nodeType === Node.ELEMENT_NODE) {
            head.appendChild(tag);
          }
        });
      }

      if (element && view) {
        element.classList.remove('w-[calc(100%-18rem)]', 'ml-72', 'mb-24');
        element.classList.add('w-full', 'min-h-screen');
      }
    }
  } else {
    const settings = store.get(`appSage.pages.${config}.settings`);
    if (settings) {
      const element = document.getElementById(settings.id);
      if (element && settings.className) {
        element.className = settings.className;
      }

      if (settings.metaTags) {
        const head = document.getElementsByTagName('head')[0];
        const div = document.createElement('div');
        div.innerHTML = settings.metaTags;
        Array.from(div.childNodes).forEach(tag => {
          if (tag.nodeType === Node.ELEMENT_NODE) {
            head.appendChild(tag);
          }
        });
      }

      if (element && view) {
        element.classList.remove('w-[calc(100%-18rem)]', 'ml-72', 'mb-24');
        element.classList.add('w-full', 'min-h-screen');
      }
    }
  }
} // DATA OUT: null

function addMetasToHead() {
  const params = new URLSearchParams(window.location.search);
  const config = params.get('config') || params.get('page');
  const storedData = JSON.parse(localStorage.getItem(appSageStorageString));
  let settings;

  if (storedData && storedData.pages && storedData.pages[config]){
    settings = storedData.pages[config].settings;
    const metaTags = settings.metaTags;
    if (typeof metaTags !== 'undefined') {
      const headTag = document.getElementsByTagName('head')[0];
    
      if (metaTags !== '') metaTags.forEach(tag => {
        if (tag.type === 'link') {
          const metatag = document.createElement('link');
          metatag.setAttribute('rel', tag.name);
          metatag.setAttribute('href', tag.content);
          headTag.appendChild(metatag);
        } else {
          const metatag = document.createElement('meta');
          metatag.setAttribute(tag.type, tag.name);
          metatag.setAttribute('content', tag.content);
          headTag.appendChild(metatag);
        }
      });
    }
  }
}



// Helper functions for IndexedDB storage
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(appSageDatabaseString, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains('mediaStore')) {
        const mediaStore = db.createObjectStore('mediaStore', { keyPath: 'id' });
        mediaStore.createIndex('blob', 'blob', { unique: false });
        mediaStore.createIndex('url', 'url', { unique: false });
      }

    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject('Error opening database');
    };
  });
}

document.addEventListener('DOMContentLoaded', addMetasToHead);
 
// Call the loadComponentFiles function and wait for all scripts to load
loadComponentFiles().then(() => {
  // Initialize all components that load to the page
  document.querySelectorAll('.pagecomponent').forEach(container => {
    const componentContainer = container.querySelector('[data-component-name]');
    const componentName = componentContainer.getAttribute('data-component-name');
    initializeExistingComponents(componentContainer, componentName);
  });
}).catch(err => {
  console.error('Failed to load component files:', err);
});

function getCurrentPage() {
  const pageId = getPageId();
  const currentPage = getPageObject(pageId);
  return currentPage;
}

function getPageId() {
  const params = new URLSearchParams(window.location.search);
  const pageId = params.get('config') || params.get('page');
  return pageId;
}

function getAppSageStorage() {
  const appSageStorage = JSON.parse(localStorage.getItem(appSageStorageString) || '{}');
  if (!appSageStorage.pages) {
    appSageStorage.pages = {};
  }
  return appSageStorage;
}

function getPageObject(pageId) {
  const appSageStorage = getAppSageStorage();
  const pageObject = appSageStorage.pages[pageId];
  return pageObject;
}
