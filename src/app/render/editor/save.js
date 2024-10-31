/*

  editor/save.js

  This file is intended to be the primary location for functions that save
  content from active/previous edits. This saving happens on the editor page.

*/

// Remove editor elements so that localStorage is not cluttered with unneeded
// elements making them production-ready for app/js/load.js
// DATA IN: HTML Element, <div>
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
// occuring in #page will be saved to localStorage.
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
        savePageSettingsChanges(page);
        break;
      }
    }
  };
  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
  console.log('Auto-save setup complete.');
} // DATA OUT: null
window.setupAutoSave = setupAutoSave;

// This function saves all active element and style additions/changes/removals
// during the designer's traditional editor workflow.
// DATA IN: String
function saveChanges(page) {
  const pageContainer = document.getElementById('page');
  // Query only elements with 'ugc-keep' that are meant to be saved
  const elements = pageContainer.querySelectorAll('.ugc-keep:not([data-editor-temp])');
  const data = Array.from(elements).map(element => ({
    tagName: element.tagName, // in the future, this could be a section name
    className: element.className, // deprecated
    content: getCleanInnerHTML(element)
  }));
  const json = JSON.stringify(data);
  savePageData(page, json);
  console.log('Changes saved successfully!');
} // DATA OUT: null
window.saveChanges = saveChanges;

// This function creates or prepares the necessary localStorage object in order
// for subsequent content to be stored. If this objects already exists, it
// proceeds by properly setting existing content to these objects.
// DATA IN: ['String', 'JSON Object']
function savePageData(pageId, data) {
  if (!electronMode) {
    const appSageStorage = getAppSageStorage();
    appSageStorage.pages[pageId] = { ...appSageStorage.pages[pageId], page_data: data };
    localStorage.setItem(appSageStorageString, JSON.stringify(appSageStorage));
  } else {
    // Use electron-store for saving page HTML
    console.log(appSageStore)
    console.log(data)
    store.set(`appSage.pages.${pageId}.html`, data);
  }
} // DATA OUT: null
window.savePageData = savePageData;

function saveComponentObjectToPage(componentName, object) {
  try {
    const pageId = getPageId();
    if (!electronMode) {
      const appSageStorage = getAppSageStorage();
      const currentPage = appSageStorage.pages[pageId];
      currentPage[componentName] = object;
      localStorage.setItem(appSageStorageString, JSON.stringify(appSageStorage));
    } else {
      // Use electron-store to save components
      store.set(`appSage.pages.${pageId}.components.${componentName}`, object);
    }
  } catch (error) {
    console.error('Something went wrong saving component data.', error);
  }
}
window.saveComponentObjectToPage = saveComponentObjectToPage;

// This function saves all page's settings from the designer's additions,
// changes, and removals during the designer's traditional editor workflow
// from the dedicated Page Settings sidebar.
// DATA IN: ['String', 'JSON Object']
// Save page settings (renamed to savePageDataSettings)
function savePageDataSettings(pageId, data) {
  if (!electronMode) {
    const appSageStorage = JSON.parse(localStorage.getItem(appSageStorageString) || '{}');
    if (!appSageStorage.pages) {
      appSageStorage.pages = {};
    }
    if (!appSageStorage.pages[pageId]) {
      appSageStorage.pages[pageId] = { page_data: {}, settings: {}, blobs: {} };
    }
    appSageStorage.pages[pageId].settings = data;
    localStorage.setItem(appSageStorageString, JSON.stringify(appSageStorage));
  } else {
    // Use electron-store to save settings
    store.set(`appSage.pages.${pageId}.settings`, data);
  }
} // DATA OUT: null
window.savePageDataSettings = savePageDataSettings;

// This function creates or prepares the necessary localStorage object in order
// for subsequent settings to be stored. If this objects already exists, it
// proceeds by properly setting existing settings to these objects.
// DATA IN: String
function savePageSettingsChanges(pageId) {
  const page = document.getElementById('page');
  const settings = {
    id: page.id,
    className: page.className,
    metaTags: ''
  }
  if (!electronMode) {
    const appSageStorage = getAppSageStorage();
    appSageStorage.pages[pageId].settings = JSON.stringify(settings);
    localStorage.setItem(appSageStorageString, JSON.stringify(appSageStorage));
  } else {
    store.set(`appSage.pages.${pageId}.settings`, settings);
  }
} // DATA OUT: null
window.savePageSettingsChanges = savePageSettingsChanges;
