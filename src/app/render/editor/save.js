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
window.saveComponent = saveComponent;

async function saveComponentObjectToPage(componentName, object) {
  try {
    const pageId = getPageId();
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

    // Update the component data cache for immediate access
    if (!window._componentDataCache) window._componentDataCache = {};
    if (!window._componentDataCache[pageId]) window._componentDataCache[pageId] = {};
    window._componentDataCache[pageId][componentName] = object;

    console.log(`Saved and cached component data for ${componentName}`);

    // TODO: Then, send to an API if enabled
    // if (apiEnabled) {}
  } catch (error) {
    console.error('Something went wrong saving component data.', error);
  }
}
window.saveComponentObjectToPage = saveComponentObjectToPage;

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
        // Check if the mutation occurred within a component element
        const isWithinComponent = mutation.target.closest('#componentSteps') ||
                                 (mutation.target.id === 'componentSteps') ||
                                 (mutation.target.querySelector && mutation.target.querySelector('#componentSteps'));

        // Only save changes if the mutation is not within a component
        if (!isWithinComponent) {
          saveChanges(page);
          break;
        }
      }
    }
  };
  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
  console.log('Auto-save setup complete.');
} // DATA OUT: null
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

// This function saves component changes by finding the specific component within #componentSteps
// DATA IN: String
async function saveComponentChanges(pageId) {
  const componentStepsContainer = document.getElementById('componentSteps');
  if (!componentStepsContainer) {
    console.warn('componentSteps element not found');
    return;
  }

  // Find the component within componentSteps - there should only be one
  const componentContainer = componentStepsContainer.querySelector('[data-component-name]');
  if (!componentContainer) {
    console.warn('No component found within componentSteps');
    return;
  }

  const componentName = componentContainer.getAttribute('data-component-name');
  if (!componentName) {
    console.warn('Component name not found');
    return;
  }

  // Get the clean HTML of the component
  const componentData = getCleanInnerHTML(componentContainer);

  // Create a complete component object with all attributes and content
  const componentObject = {
    html: componentData,
    attributes: {},
    className: componentContainer.className,
    id: componentContainer.id
  };

  // Capture all attributes
  Array.from(componentContainer.attributes).forEach(attr => {
    componentObject.attributes[attr.name] = attr.value;
  });

  // Save using the existing saveComponent function
  await saveComponent(pageId, componentName, componentObject);

  console.log(`Component '${componentName}' changes saved successfully!`);
}
window.saveComponentChanges = saveComponentChanges;

// This function sets up an observer specifically for components in #componentSteps
// DATA IN: String
function setupComponentAutoSave(pageId) {
  // Check periodically for #componentSteps since it may not exist initially
  const checkForComponentSteps = setInterval(() => {
    const targetNode = document.getElementById('componentSteps');

    if (targetNode && !targetNode.classList.contains('hidden')) {
      clearInterval(checkForComponentSteps);

      const config = {
        childList: true,
        attributes: true,
        subtree: true,
        characterData: true,
        attributeOldValue: true,
        characterDataOldValue: true
      };

      const callback = function (mutationsList, observer) {
        let shouldSave = false;

        for (const mutation of mutationsList) {
          // Check if this is a meaningful change
          if (mutation.type === 'attributes') {
            // Save on class or style changes
            if (mutation.attributeName === 'class' || mutation.attributeName === 'style') {
              shouldSave = true;
              break;
            }
          } else if (mutation.type === 'childList' || mutation.type === 'characterData') {
            shouldSave = true;
            break;
          }
        }

        if (shouldSave) {
          // Debounce the save operation
          clearTimeout(window.componentSaveTimeout);
          window.componentSaveTimeout = setTimeout(() => {
            saveComponentChanges(pageId);
          }, 500);
        }
      };

      const observer = new MutationObserver(callback);
      observer.observe(targetNode, config);
      console.log('Component auto-save setup complete.');

      // Store observer reference for cleanup
      window.componentObserver = observer;
    }
  }, 100);

  // Clean up after 10 seconds if componentSteps never appears
  setTimeout(() => {
    clearInterval(checkForComponentSteps);
  }, 10000);
}
window.setupComponentAutoSave = setupComponentAutoSave;
