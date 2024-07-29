/* load.js */

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

function getCleanInnerHTML(element) {
  const clone = element.cloneNode(true);
  const discardElements = clone.querySelectorAll('.ugc-discard');
  discardElements.forEach(el => el.parentNode.removeChild(el));
  return clone.innerHTML;
}

function loadChanges(json) {
  const pageContainer = document.getElementById('page');
  pageContainer.innerHTML = '';
  const data = JSON.parse(json);
  data.forEach(item => {
    const element = document.createElement(item.tagName);
    element.className = item.className;
    element.innerHTML = item.content;
    pageContainer.appendChild(element);

    if (element.classList.contains('grid')) {
      restoreGridCapabilities(element);
    }
  });

  const grid = document.querySelector('#page .grid');
  if (grid) {
    addGridOptions(grid);
  }
}

// Utility functions for managing localStorage with a 'pageSageStorage' object
function loadPage(pageId) {
  const pageSageStorage = JSON.parse(localStorage.getItem('pageSageStorage') || '{}');
  if (pageSageStorage.pages && pageSageStorage.pages[pageId] && pageSageStorage.pages[pageId].page_data) {
    return pageSageStorage.pages[pageId].page_data;
  } else {
    return null;
  }
}

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

function restoreGridCapabilities(grid) {
  const addColumnButton = createAddColumnButton(grid);
  grid.appendChild(addColumnButton);
  enableEditGridOnClick(grid);
  Array.from(grid.querySelectorAll('.pagecolumn')).forEach(column => {
    enableEditColumnOnClick(column);
    column.appendChild(createAddContentButton(column));
    Array.from(column.querySelectorAll('.pagecontent')).forEach(content => {
      enableEditContentOnClick(content);
    });
  });
}

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

function loadPageMetadata(page_id, element) {
  const storedData = JSON.parse(localStorage.getItem('pageSageStorage'));
  const settings = JSON.parse(storedData.pages[page_id].settings);
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