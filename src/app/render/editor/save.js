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
function setupAutoSave(pageId) {
  setInterval(async () => {
    // Using IndexedDB for non-Electron mode
    const AppstartStorage = await idbGet(AppstartStorageString) || {};

    if (AppstartStorage.pages && AppstartStorage.pages[pageId]) {
      const json = scrapePage();
      AppstartStorage.pages[pageId].page_data = json;
      await idbSet(AppstartStorageString, AppstartStorage);
      console.log('Auto-saved page data.');
    }
  }, 15000);
} // DATA OUT: null

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

  AppstartStorage.pages[pageId].settings = settings;
  await idbSet(AppstartStorageString, AppstartStorage);
} // DATA OUT: null
