/*
  load.js
  
  This file is intended to be the primary location for functions that load
  saved content from previous edits. This loading is not just for the editor,
  but the preview page as well. As such, final outputs, particularly for
  preview, should present as production-ready.
*/

// Utility functions for managing localStorage with a 'pageSageStorage' object
function loadPage(pageId) {
  const pageSageStorage = JSON.parse(localStorage.getItem('pageSageStorage') || '{}');
  if (pageSageStorage.pages && pageSageStorage.pages[pageId] && pageSageStorage.pages[pageId].page_data) {
    return pageSageStorage.pages[pageId].page_data;
  } else {
    return null;
  }
}

// Currently, media added through the file selector is stored as base64 plain
// text in the document (and consequently, storage). To keep things a bit
// tidier, these blobs are stored in an object separate from the HTML content.
function loadPageBlobs(config) {
  const pageSageStorage = JSON.parse(localStorage.getItem('pageSageStorage') || '{}');
  const page = document.getElementById('page');

  if (pageSageStorage.pages && pageSageStorage.pages[config] && pageSageStorage.pages[config].blobs) {
    const blobs = pageSageStorage.pages[config].blobs;
    if (blobs) {
      Object.keys(blobs).forEach(key => {
        const element = page.querySelector(`.bg-local-${key}`);
        if (element) element.style.backgroundImage = `url(${blobs[key]})`;
      });
    }
  }
}

// Because metadata needs to be added to the <head> tag rather than the
// expected '#page' div, metadata is stored in a separate object and,
// consequently, this separate function.
function loadPageMetadata(page_id, element) {
  const storedData = JSON.parse(localStorage.getItem('pageSageStorage'));
  const settings = storedData.pages[page_id].settings;
  if (settings) {
    const metaTags = settings.metaTags;
    if (metaTags) {
      if (element) {
        return metaTags;
      } else {
        const element = document.querySelector('head');

        metaTags.forEach(tag => {
          const metaTag = document.createElement('meta');
          metaTag.setAttribute(tag.type, tag.name);
          metaTag.setAttribute('content', tag.content);
          element.appendChild(metaTag);
        });
      }
    }
  }
}

// Because page settings need to be added to various locations other than the
// expected '#page' div, page settings are stored in a separate object and,
// consequently, this separate function.
function loadPageSettings(config, view = false){
  // Load the pageSageStorage object from localStorage
  const pageSageStorage = JSON.parse(localStorage.getItem('pageSageStorage') || '{}');
  
  // Check if the page and settings exist
  if (pageSageStorage.pages && pageSageStorage.pages[config] && pageSageStorage.pages[config].settings) {
    let settings;
    try {
      settings = JSON.parse(pageSageStorage.pages[config].settings);
    } catch {
      settings = pageSageStorage.pages[config].settings;
    }
    
    // Find the element by config and set the className if it exists
    const element = document.getElementById(settings.id);
    if (element && settings.className) {
      element.className = settings.className;
    }
    
    // Append metaTags to the head if they exist
    if (settings.metaTags) {
      const head = document.getElementsByTagName('head')[0];
      const div = document.createElement('div');
      div.innerHTML = settings.metaTags;
      
      // Append each meta tag found in the div to the head
      Array.from(div.childNodes).forEach(tag => {
        if (tag.nodeType === Node.ELEMENT_NODE) { // Ensure it is an element
          head.appendChild(tag);
        }
      });
    }
    if (element && view) {
      element.classList.remove('w-[calc(100%-18rem)]', 'ml-72');
      element.classList.add ('w-full', 'min-h-screen');
    }
  } else {
    console.log('Settings for the specified page do not exist.');
  }
}
