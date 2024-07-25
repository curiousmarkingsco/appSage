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

// Utility functions for managing localStorage with a 'tailwindvpb' object
function loadPage(pageId) {
  const tailwindvpb = JSON.parse(localStorage.getItem('tailwindvpb') || '{}');
  if (tailwindvpb.pages && tailwindvpb.pages[pageId] && tailwindvpb.pages[pageId].page_data) {
    return tailwindvpb.pages[pageId].page_data;
  } else {
    return null;
  }
}

function savePage(pageId, data) {
  const tailwindvpb = JSON.parse(localStorage.getItem('tailwindvpb') || '{}');
  if (!tailwindvpb.pages) {
    tailwindvpb.pages = {};
  }
  if (!tailwindvpb.pages[pageId]) {
    tailwindvpb.pages[pageId] = { page_data: {}, settings: {}, blobs: {} };
  }
  tailwindvpb.pages[pageId].page_data = data;
  localStorage.setItem('tailwindvpb', JSON.stringify(tailwindvpb));
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
  const tailwindvpb = JSON.parse(localStorage.getItem('tailwindvpb') || '{}');
  if (!tailwindvpb.pages) {
    tailwindvpb.pages = {};
  }
  if (!tailwindvpb.pages[pageId]) {
    tailwindvpb.pages[pageId] = { page_data: {}, settings: {}, blobs: {} };
  }
  tailwindvpb.pages[pageId].settings = data;
  localStorage.setItem('tailwindvpb', JSON.stringify(tailwindvpb));
}

function loadPageBlobs(config) {
  const tailwindvpb = JSON.parse(localStorage.getItem('tailwindvpb') || '{}');
  const page = document.getElementById('page');

  if (tailwindvpb.pages && tailwindvpb.pages[config] && tailwindvpb.pages[config].blobs) {
    const blobs = tailwindvpb.pages[config].blobs;
    if (blobs) {
      Object.keys(blobs).forEach(key => {
        const element = page.querySelector(`.bg-local-${key}`);
        if (element) element.style.backgroundImage = `url(${blobs[key]})`;
      });
    }
  }
}

function loadPageSettings(config, view = false){
  // Load the tailwindvpb object from localStorage
  const tailwindvpb = JSON.parse(localStorage.getItem('tailwindvpb') || '{}');
  
  // Check if the page and settings exist
  if (tailwindvpb.pages && tailwindvpb.pages[config] && tailwindvpb.pages[config].settings) {
    const settings = JSON.parse(tailwindvpb.pages[config].settings);
    
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