/*

  load.js

  This file is intended to be the primary location for functions that load
  saved content from previous edits. This loading is not just for the editor,
  but the preview page as well. As such, final outputs, particularly for
  preview, should present as production-ready.

*/
const loadBlobFromIndexedDB = window.loadBlobFromIndexedDB;
// Utility functions for managing localStorage with a 'AppstartStorage' object
// DATA IN: String
async function loadPage(pageId) {
  // Using IndexedDB when not in Electron mode
  const AppstartStorage = await idbGet(AppstartStorageString) || {};
  if (AppstartStorage.pages && AppstartStorage.pages[pageId]) {
    const fallback = AppstartStorage.pages[pageId].page_data;
    try {
      const indexedDBData = await loadBlobFromIndexedDB(pageId);
      return indexedDBData || fallback;
    } catch (err) {
      console.warn('Failed to load from IndexedDB, using fallback:', err);
      return fallback;
    }
  }
  else {
    return null;
  }
} // DATA OUT: String || null
window.loadPage = loadPage;

// Because metadata needs to be added to the <head> tag rather than the
// expected '#page' div, metadata is stored in a separate object and,
// consequently, this separate function.
// DATA IN: ['String', 'HTML Element, <div>']
async function loadPageMetadata(pageId) {
  const element = document.querySelector('head');

  // Using IndexedDB for non-Electron mode
  const storedData = await idbGet(AppstartStorageString);
  const fontSettingsJSON = await idbGet(AppstartSettingsString);
  let fontSettings = null;
  if (fontSettingsJSON) {
    try {
      fontSettings = typeof fontSettingsJSON === 'string' ? JSON.parse(fontSettingsJSON) : fontSettingsJSON;
    } catch (error) {
      console.error('Error parsing font settings:', error);
    }
  }

  if (storedData && storedData.pages && storedData.pages[pageId] && storedData.pages[pageId].settings) {
    let settings;
    try {
      settings = typeof storedData.pages[pageId].settings === 'string'
        ? JSON.parse(storedData.pages[pageId].settings)
        : storedData.pages[pageId].settings;
    } catch (error) {
      console.error('Error parsing page settings for metadata:', error);
      settings = {};
    }

    const metaTags = settings.metaTags;

    if (metaTags && Array.isArray(metaTags) && metaTags.length > 0) {
      metaTags.forEach(tag => {
        const metaTag = document.createElement(tag.type === 'link' ? 'link' : 'meta');

        if (tag.type === 'link') {
          metaTag.setAttribute('href', tag.content);
          metaTag.setAttribute('rel', tag.name);
        } else {
          metaTag.setAttribute(tag.type, tag.name);
          metaTag.setAttribute('content', tag.content);
        }

        element.appendChild(metaTag);
      });
    }
  }

  if (fontSettings) {
    try {
      const fonts = Object.values(fontSettings.fonts).join('&family=');
      const metaTag = document.createElement('link');
      metaTag.setAttribute('href', `https://fonts.googleapis.com/css2?family=${fonts}&display=swap`);
      metaTag.setAttribute('rel', 'stylesheet');
      element.appendChild(metaTag);
    } catch (error) {
      console.log('Error loading fonts:', error || error.stack);
    }
  }
} // DATA OUT: String || null
window.loadPageMetadata = loadPageMetadata;

// Because page settings need to be added to various locations other than the
// expected '#page' div, page settings are stored in a separate object and,
// consequently, this separate function.
// DATA IN: ['String', 'Boolean']
async function loadPageSettings(config, view = false) {
  let AppstartStorage;
  let localStorageExists = false;
  AppstartStorage = await idbGet(AppstartStorageString) || {};
  localStorageExists = (AppstartStorage.pages && AppstartStorage.pages[config] && AppstartStorage.pages[config].settings);

  if (localStorageExists) {
    let settings;
    try {
      settings = typeof AppstartStorage.pages[config].settings === 'string'
        ? JSON.parse(AppstartStorage.pages[config].settings)
        : AppstartStorage.pages[config].settings;
    } catch (error) {
      console.error('Error parsing page settings in loadPageSettings:', error);
      settings = {};
    }

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
} // DATA OUT: null
window.loadPageSettings = loadPageSettings;

async function addMetasToHead() {
  await waitForGlobalsLoaded();
  const params = new URLSearchParams(window.location.search);
  const config = params.get('config') || params.get('page');
  const storedData = await idbGet(AppstartStorageString);
  let settings;

  if (storedData && storedData.pages && storedData.pages[config]){
    let settings;
    try {
      settings = typeof storedData.pages[config].settings === 'string'
        ? JSON.parse(storedData.pages[config].settings)
        : storedData.pages[config].settings;
    } catch (error) {
      console.error('Error parsing page settings in addMetasToHead:', error);
      settings = {};
    }

    if (settings && typeof settings === 'object') {
      const metaTags = settings.metaTags;
      if (Array.isArray(metaTags) && metaTags.length > 0) {
        const headTag = document.getElementsByTagName('head')[0];

        metaTags.forEach(tag => {
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
}
window.addMetasToHead = addMetasToHead;

// Helper functions for IndexedDB storage
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(AppstartDatabaseString, 1);

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
window.openDatabase = openDatabase;

document.addEventListener('DOMContentLoaded', addMetasToHead);

document.addEventListener('DOMContentLoaded', async () => {
  const pageId = getPageId();
  const AppstartStorage = await getAppstartStorage();

  const componentContainers = document.querySelectorAll('.pagecomponent');
  for (const container of componentContainers) {
    const componentContainer = container.querySelector('[data-component-name]');
    const componentName = componentContainer.getAttribute('data-component-name');

    let componentData = AppstartStorage.pages?.[pageId]?.[componentName];

    if (componentData === '__stored_in_indexeddb__') {
      componentData = await loadComponentFromStorage(pageId, componentName);
    }

    initializeExistingComponents(componentContainer, componentData);
  }
});

function getCurrentPage() {
  const pageId = getPageId();
  const currentPage = getPageObject(pageId);
  return currentPage;
}
window.getCurrentPage = getCurrentPage;

function getPageId() {
  const params = new URLSearchParams(window.location.search);
  const pageId = params.get('config') || params.get('page');
  return pageId;
}
window.getPageId = getPageId;

async function getAppstartStorage() {
  const AppstartStorage = await idbGet(AppstartStorageString) || {};
  if (!AppstartStorage.pages) {
    AppstartStorage.pages = {};
  }
  return AppstartStorage;
}
window.getAppstartStorage = getAppstartStorage;

async function getPageObject(pageId) {
  const AppstartStorage = await getAppstartStorage();
  let pageObject;
  pageObject = AppstartStorage.pages[pageId];
  return pageObject;
}
window.getPageObject = getPageObject;

async function loadComponentFromStorage(pageId, componentName) {
  const key = `${pageId}:${componentName}`;
  try {
    const object = await loadBlobFromIndexedDB(key);
    return object;
  } catch (err) {
    console.error(`Failed to load ${componentName} from IndexedDB:`, err);
    return null;
  }
}
window.loadComponentFromStorage = loadComponentFromStorage;
