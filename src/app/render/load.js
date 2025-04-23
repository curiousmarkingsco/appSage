/*

  load.js
  
  This file is intended to be the primary location for functions that load
  saved content from previous edits. This loading is not just for the editor,
  but the preview page as well. As such, final outputs, particularly for
  preview, should present as production-ready.

*/

// Utility functions for managing localStorage with a 'appSageStorage' object
// DATA IN: String
async function loadPage(pageId) {
  if (apiEnabled) {
    // If we're offline just bail back to our local fallback
    if (!cloudStorage.isOnline()) {
      return null;
    }
  
    try {
      // Fetch the latest from the server
      const cloudData = await cloudStorage.pullFromCloud(pageId);
      // We expect the server to return { page_data: [...] }
      return cloudData.page_data ?? null;
    } catch (error) {
      console.error('Error loading page from cloud:', error);
      return null;
    }
  }
  
  if (!electronMode) {
    // Using localStorage when not in Electron mode
    const appSageStorage = JSON.parse(localStorage.getItem(appSageStorageString) || '{}');
    if (appSageStorage.pages && appSageStorage.pages[pageId] && appSageStorage.pages[pageId].page_data) {
      return appSageStorage.pages[pageId].page_data;
    } else {
      return null;
    }
  } else if (electronMode) {
    // Using Electron storage
    return window.api.readStoreData().then((storeData) => {
      if (storeData.pages) {
        if (!storeData.pages[pageId]) storeData.pages[pageId] = {};
        if (!storeData.pages[pageId].page_data) storeData.pages[pageId].page_data = {};
        return storeData.pages[pageId];
      } else {
        return null;
      }
    }).catch((error) => {
      console.error('Error loading page data from Electron store:', error);
      return null;
    });
  }
} // DATA OUT: String || null
window.loadPage = loadPage;

// Because metadata needs to be added to the <head> tag rather than the
// expected '#page' div, metadata is stored in a separate object and,
// consequently, this separate function.
// DATA IN: ['String', 'HTML Element, <div>']
async function loadPageMetadata(pageId) {
  const element = document.querySelector('head');

  if (apiEnabled) {
    try {
      const cloudData = await pullFromCloud(pageId);
      const settings = cloudData.pages?.[pageId]?.settings;
      if (settings?.metaTags?.length) {
        settings.metaTags.forEach(tag => {
          const el = document.createElement(tag.type === 'link' ? 'link' : 'meta');
          if (tag.type === 'link') {
            el.setAttribute('href', tag.content);
            el.setAttribute('rel', tag.name);
          } else {
            el.setAttribute(tag.type, tag.content);
            el.setAttribute('content', tag.name);
          }
          head.appendChild(el);
        });
      }
      if (settings?.fonts) {
        const families = Object.values(settings.fonts).join('&family=');
        const link = document.createElement('link');
        link.setAttribute('href', `https://fonts.googleapis.com/css2?family=${families}&display=swap`);
        link.setAttribute('rel', 'stylesheet');
        head.appendChild(link);
      }
    } catch (error) {
      console.error('Error loading metadata from cloud:', error);
    }
    return;
  }

  if (!electronMode) {
    // Using localStorage for non-Electron mode
    const storedData = JSON.parse(localStorage.getItem(appSageStorageString));
    const fontSettings = JSON.parse(localStorage.getItem(appSageSettingsString));

    if (storedData && storedData.pages && storedData.pages[pageId] && storedData.pages[pageId].settings) {
      const metaTags = storedData.pages[pageId].settings.metaTags;

      if (metaTags && metaTags.length > 0) {
        metaTags.forEach(tag => {
          const metaTag = document.createElement(tag.type === 'link' ? 'link' : 'meta');
          metaTag.setAttribute(tag.type === 'link' ? 'href' : tag.type, tag.content);
          metaTag.setAttribute(tag.type === 'link' ? 'rel' : 'content', tag.name);
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
  } else if (electronMode) {
    // Using Electron storage
    window.api.readStoreData().then((storeData) => {
      if (storeData && storeData.pages && storeData.pages[pageId] && storeData.pages[pageId].settings) {
        const metaTags = storeData.pages[pageId].settings.metaTags;

        if (metaTags && metaTags.length > 0) {
          metaTags.forEach(tag => {
            const metaTag = document.createElement(tag.type === 'link' ? 'link' : 'meta');
            metaTag.setAttribute(tag.type === 'link' ? 'href' : tag.type, tag.content);
            metaTag.setAttribute(tag.type === 'link' ? 'rel' : 'content', tag.name);
            element.appendChild(metaTag);
          });
        }
      }

      const fontSettings = storeData.settings;
      if (fontSettings && fontSettings.fonts) {
        const fontsList = Object.values(fontSettings.fonts).join('&family=');
        const metaTag = document.createElement('link');
        metaTag.setAttribute('href', `https://fonts.googleapis.com/css2?family=${fontsList}&display=swap`);
        metaTag.setAttribute('rel', 'stylesheet');
        element.appendChild(metaTag);
      }
    }).catch((error) => {
      console.error('Error loading page metadata from Electron store:', error);
    });
  }
} // DATA OUT: String || null
window.loadPageMetadata = loadPageMetadata;

// Because page settings need to be added to various locations other than the
// expected '#page' div, page settings are stored in a separate object and,
// consequently, this separate function.
// DATA IN: ['String', 'Boolean']
async function loadPageSettings(config, view = false) {
  let appSageStorage;
  let localStorageExists = false;
  if (apiEnabled) {
    try {
      const cloudData = await pullFromCloud(config);
      const settings = cloudData.pages?.[config]?.settings;
      if (!settings) return;
      const el = document.getElementById(settings.id);
      if (el && settings.className) {
        el.className = settings.className;
      }
      if (settings.metaTags) {
        const head = document.getElementsByTagName('head')[0];
        const wrapper = document.createElement('div');
        wrapper.innerHTML = settings.metaTags;
        Array.from(wrapper.childNodes).forEach(tag => {
          if (tag.nodeType === Node.ELEMENT_NODE) {
            head.appendChild(tag);
          }
        });
      }
      if (el && view) {
        el.classList.remove('w-[calc(100%-18rem)]', 'ml-72', 'mb-24');
        el.classList.add('w-full', 'min-h-screen');
      }
    } catch (error) {
      console.error('Error loading settings from cloud:', error);
    }
    return;
  }
  if (!electronMode){
    appSageStorage = JSON.parse(localStorage.getItem(appSageStorageString) || '{}');
    localStorageExists = (appSageStorage.pages && appSageStorage.pages[config] && appSageStorage.pages[config].settings);
  } else if (electronMode) {
    appSageStorage = appSageStore;
    localStorageExists = true;
  }
    
  if (localStorageExists) {
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
} // DATA OUT: null
window.loadPageSettings = loadPageSettings;

function addMetasToHead() {
  waitForGlobalsLoaded().then(() => {
    const params = new URLSearchParams(window.location.search);
    const config = params.get('config') || params.get('page');
    const storedData = JSON.parse(localStorage.getItem(appSageStorageString));
    let settings;

    if (storedData && storedData.pages && storedData.pages[config]){
      settings = storedData.pages[config].settings;
      if (typeof settings !== 'undefined') {
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
  });
}
window.addMetasToHead = addMetasToHead;

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
window.openDatabase = openDatabase;

document.addEventListener('DOMContentLoaded', addMetasToHead);

document.querySelectorAll('.pagecomponent').forEach(container => {
  const componentContainer = container.querySelector('[data-component-name]');
  const componentName = componentContainer.getAttribute('data-component-name');
  initializeExistingComponents(componentContainer, componentName);
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

function getAppSageStorage() {
  if (!electronMode) {
    const appSageStorage = JSON.parse(localStorage.getItem(appSageStorageString) || '{}');
    if (!appSageStorage.pages) {
      appSageStorage.pages = {};
    }
    return appSageStorage;
  } else {
    return appSageStore;
  }
}
window.getAppSageStorage = getAppSageStorage;

async function getPageObject(pageId) {
  const appSageStorage = getAppSageStorage();
  let pageObject;
  if (apiEnabled) {
    try {
      const cloudData = await pullFromCloud(pageId);
      return cloudData.pages?.[pageId] ?? null;
    } catch (error) {
      console.error('Error fetching page object from cloud:', error);
      return null;
    }
  }
  if (!electronMode) pageObject = appSageStorage.pages[pageId];
  if (electronMode) pageObject = appSageStore.pages[pageId];
  return pageObject;
}
window.getPageObject = getPageObject;
