/*

  editor/save.js

  This file is intended to be the primary location for functions that save
  content from active/previous edits. This saving happens on the editor page.

*/
const saveBlobToIndexedDB = window.saveBlobToIndexedDB;
// Remove editor elements so that IndexedDB is not cluttered with unneeded
// HTML during the save process.
// DATA IN: String
function getCleanInnerHTML(element) {
  const clone = element.cloneNode(true);
  const discardElements = clone.querySelectorAll('.ugc-discard');
  discardElements.forEach(el => el.parentNode.removeChild(el));
  const cloneBox = document.createElement('div');
  cloneBox.appendChild(clone);
  return cloneBox.innerHTML;
} // DATA OUT: HTML Element, <div>
window.getCleanInnerHTML = getCleanInnerHTML;

// This mutation observer ensures that the majority, if not all, changes
// occuring in #page will be saved to IndexedDB.
// DATA IN: String
async function saveChanges(pageId) {
  const pageContainer = document.getElementById('page');
  // Query only elements with 'ugc-keep' that are meant to be saved
  const elements = pageContainer.querySelectorAll('.ugc-keep:not([data-editor-temp])');
  const data = Array.from(elements).map(element => ({
    tagName: element.tagName, // in the future, this could be a section name
    className: element.className, // deprecated
    content: getCleanInnerHTML(element)
  }));
  await saveContent(pageId, data);
  savePageSettingsChanges(pageId);
  console.log('Changes saved successfully!');
} // DATA OUT: null
window.saveChanges = saveChanges;

// This function creates or prepares the necessary IndexedDB object in order
// for the page's contents to be saved.
// DATA IN: ['String', 'String']
async function saveContent(pageId, json) {
  // Using IndexedDB for non-Electron mode
  const AppstartStorage = await idbGet(AppstartStorageString) || {};

  if (!AppstartStorage.pages) {
    AppstartStorage.pages = {};
  }
  if (!AppstartStorage.pages[pageId]) {
    AppstartStorage.pages[pageId] = {};
  }

  AppstartStorage.pages[pageId].page_data = json;
  await idbSet(AppstartStorageString, AppstartStorage);

  await saveBlobToIndexedDB(pageId, json);
} // DATA OUT: null
window.savePageData = saveContent;

async function saveComponent(pageId, componentName, object) {
  // Using IndexedDB for non-Electron mode
  const AppstartStorage = await idbGet(AppstartStorageString) || {};

  if (!AppstartStorage.pages) {
    AppstartStorage.pages = {};
  }
  if (!AppstartStorage.pages[pageId]) {
    AppstartStorage.pages[pageId] = {};
  }

  // Just store a lightweight reference — actual object goes in IndexedDB
  AppstartStorage.pages[pageId][componentName] = '__stored_in_indexeddb__';
  await idbSet(AppstartStorageString, AppstartStorage);

  // Store the heavy object in IndexedDB under a namespaced key
  await saveBlobToIndexedDB(`${pageId}:${componentName}`, object);
}

// This function is for automatically saving the page every 15 seconds.
// DATA IN: String
function setupAutoSave(page) {
  const targetNode = document.getElementById('page');
  const config = {
    childList: true,
    attributes: true,
    subtree: true,
    characterData: true
  };
  const callback = function (mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (['childList', 'attributes', 'characterData'].includes(mutation.type)) {
        saveChanges(page);
        break;
      }
    }
  };
  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
  console.log('Auto-save setup complete.');
} // DATA OUT: null

// function setupAutoSave(pageId) {
//   setInterval(async () => {
//     // Using IndexedDB for non-Electron mode
//     const AppstartStorage = await idbGet(AppstartStorageString) || {};

//     if (AppstartStorage.pages && AppstartStorage.pages[pageId]) {
//       AppstartStorage.pages[pageId].page_data = json;
//       await idbSet(AppstartStorageString, AppstartStorage);
//       console.log('Auto-saved page data.');
//     }
//   }, 15000);
// } // DATA OUT: null
window.setupAutoSave = setupAutoSave;

// This function creates or prepares the necessary IndexedDB object in order
// for the page's settings to be saved.
// DATA IN: ['String', 'String']
async function savePageSettings(pageId, settings) {
  // Using IndexedDB for non-Electron mode
  const AppstartStorage = await idbGet(AppstartStorageString) || {};

  if (!AppstartStorage.pages) {
    AppstartStorage.pages = {};
  }
  if (!AppstartStorage.pages[pageId]) {
    AppstartStorage.pages[pageId] = {};
  }

  // Ensure settings are stored as a string
  AppstartStorage.pages[pageId].settings = typeof settings === 'string' ? settings : JSON.stringify(settings);
  await idbSet(AppstartStorageString, AppstartStorage);
} // DATA OUT: null

// This function collects the current page settings and saves them to IndexedDB.
// DATA IN: String
async function savePageSettingsChanges(pageId) {
  const pageElement = document.getElementById('page');
  if (!pageElement) return;

  // Load existing settings first to preserve them
  const AppstartStorage = await idbGet(AppstartStorageString) || {};
  let existingSettings = {};

  if (AppstartStorage.pages && AppstartStorage.pages[pageId] && AppstartStorage.pages[pageId].settings) {
    try {
      existingSettings = typeof AppstartStorage.pages[pageId].settings === 'string'
        ? JSON.parse(AppstartStorage.pages[pageId].settings)
        : AppstartStorage.pages[pageId].settings;
    } catch (error) {
      console.error('Error parsing existing page settings:', error);
      existingSettings = {};
    }
  }

  // Update only the specific settings we want to change
  const updatedSettings = {
    ...existingSettings, // Preserve all existing settings
    id: 'page',
    className: pageElement.className
  };

  // Only update metaTags from DOM if there are any in the head with data-appstart attribute
  const headMetaTags = document.querySelectorAll('head meta[data-appstart], head link[data-appstart]');
  if (headMetaTags.length > 0) {
    const metaTags = [];
    headMetaTags.forEach(tag => {
      const tagData = {
        type: tag.tagName.toLowerCase(),
        name: tag.getAttribute('name') || tag.getAttribute('property') || tag.getAttribute('rel'),
        content: tag.getAttribute('content') || tag.getAttribute('href')
      };
      metaTags.push(tagData);
    });
    updatedSettings.metaTags = metaTags;
  }
  // If there are no head meta tags with data-appstart, preserve existing metaTags

  await savePageSettings(pageId, JSON.stringify(updatedSettings));
} // DATA OUT: null
window.savePageSettingsChanges = savePageSettingsChanges;
