/*

  save.js

  This file is intended to be the primary location for functions that save
  content from active/previous edits. This saving happens on the editor page.

*/

// Remove editor elements so that localStorage is not cluttered with unneeded
// elements making them production-ready for app/js/load.js
function getCleanInnerHTML(element) {
  const clone = element.cloneNode(true);
  const discardElements = clone.querySelectorAll('.ugc-discard');
  discardElements.forEach(el => el.parentNode.removeChild(el));
  return clone.innerHTML;
}

// This mutation observer ensures that the majority, if not all, changes
// occuring in #page will be saved to localStorage.
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
}

// This function saves all active element and style additions/changes/removals
// during the designer's traditional editor workflow.
function saveChanges(page) {
  const pageContainer = document.getElementById('page');
  // Query only elements with 'ugc-keep' that are meant to be saved
  const elements = pageContainer.querySelectorAll('.ugc-keep:not([data-editor-temp])');
  const data = Array.from(elements).map(element => ({
    tagName: element.tagName,
    className: element.className,
    content: getCleanInnerHTML(element)
  }));
  const json = JSON.stringify(data);
  savePage(page, json);
  console.log('Changes saved successfully!');
}

// This function creates or prepares the necessary localStorage object in order
// for subsequent content to be stored. If this objects already exists, it
// proceeds by properly setting existing content to these objects.
function savePage(pageId, data) {
  const pageSageStorage = JSON.parse(localStorage.getItem('pageSageStorage') || '{}');
  if (!pageSageStorage.pages) {
    pageSageStorage.pages = {};
  }
  if (!pageSageStorage.pages[pageId]) {
    pageSageStorage.pages[pageId] = { page_data: {}, settings: {}, blobs: {} };
  }
  pageSageStorage.pages[pageId].page_data = data;
  localStorage.setItem('pageSageStorage', JSON.stringify(pageSageStorage));
}

// This function saves all page's settings from the designer's additions,
// changes, and removals during the designer's traditional editor workflow
// from the dedicated Page Settings sidebar.
function savePageSettings(pageId, data) {
  const pageSageStorage = JSON.parse(localStorage.getItem('pageSageStorage') || '{}');
  if (!pageSageStorage.pages) {
    pageSageStorage.pages = {};
  }
  if (!pageSageStorage.pages[pageId]) {
    pageSageStorage.pages[pageId] = { page_data: {}, settings: {}, blobs: {} };
  }
  pageSageStorage.pages[pageId].settings = data;
  localStorage.setItem('pageSageStorage', JSON.stringify(pageSageStorage));
}

// This function creates or prepares the necessary localStorage object in order
// for subsequent settings to be stored. If this objects already exists, it
// proceeds by properly setting existing settings to these objects.
function savePageSettingsChanges(pageId) {
  const page = document.getElementById('page');
  const settings = {
    id: page.id,
    className: page.className,
    metaTags: ''
  }
  const json = JSON.stringify(settings);
  savePageSettings(pageId, json);
}
