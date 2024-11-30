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
async function saveChanges(page) {
  const pageContainer = document.getElementById('page');
  // Query only elements with 'ugc-keep' that are meant to be saved
  const elements = pageContainer.querySelectorAll('.ugc-keep:not([data-editor-temp])');
  const data = Array.from(elements).map(element => ({
    tagName: element.tagName, // in the future, this could be a section name
    className: element.className, // deprecated
    content: getCleanInnerHTML(element)
  }));
  await savePageData(page, data);
  savePageSettingsChanges(page);
  console.log('Changes saved successfully!');
} // DATA OUT: null
window.saveChanges = saveChanges;

// This function creates or prepares the necessary localStorage object in order
// for subsequent content to be stored. If this objects already exists, it
// proceeds by properly setting existing content to these objects.
// DATA IN: ['String', 'JSON Object']
async function savePageData(pageId, json) {
  addRevision(pageId, json);
  if (!electronMode) {
    // Using localStorage for non-Electron mode
    const data = JSON.stringify(json);
    const appSageStorage = getAppSageStorage();
    appSageStorage.pages[pageId] = { ...appSageStorage.pages[pageId], page_data: data };
    localStorage.setItem(appSageStorageString, JSON.stringify(appSageStorage));
  } else if (electronMode) {
    // Using Electron storage
    window.api.readStoreData().then((storeData) => {
      // Update the page data
      if (!storeData.pages) {
        storeData.pages = {};
      }

      if (!storeData.pages[pageId]) {
        storeData.pages[pageId] = {};
      }

      storeData.pages[pageId] = { ...storeData.pages[pageId], page_data: json };
      // Save the updated data back to Electron store
      window.api.updateStoreData(storeData).then(updatedData => {
        window.appSageStore = updatedData;
      }).catch((error) => {
        console.error('Error saving page data in Electron mode:', error);
      });
    }).catch((error) => {
      console.error('Error reading store data in Electron mode:', error);
    });
  }
} // DATA OUT: null
window.savePageData = savePageData;

function saveComponentObjectToPage(componentName, object) {
  try {
    const pageId = getPageId();
    if (!electronMode) {
      // Using localStorage for non-Electron mode
      const appSageStorage = getAppSageStorage();
      const currentPage = appSageStorage.pages[pageId];
      currentPage[componentName] = object;
      localStorage.setItem(appSageStorageString, JSON.stringify(appSageStorage));
    } else {
      // Using Electron storage
      window.api.readStoreData().then((storeData) => {
        // Ensure pages exist in storeData
        if (!storeData.pages) {
          storeData.pages = {};
        }
        // Ensure the pageId exists in storeData
        if (!storeData.pages[pageId]) {
          storeData.pages[pageId] = {};
        }
        // Save the component object to the current page
        storeData.pages[pageId][componentName] = JSON.parse(object);

        // Save the updated data back to Electron store
        window.api.updateStoreData(storeData).then(updatedData => {
          window.appSageStore = updatedData;
        }).catch((error) => {
          console.error('Error saving component object to page in Electron mode:', error);
        });
      }).catch((error) => {
        console.error('Error reading store data in Electron mode:', error);
      });
    }
  } catch (error) {
    console.error('Something went wrong saving component data.', error);
  }
}
window.saveComponentObjectToPage = saveComponentObjectToPage;

function syncEndUserData(componentName, object = null, mode, apiCallConfig) {
  const modes = {
    "submit": "POST",
    "read": "GET",
    "update": "PUT",
    "delete": "DELETE"
  }
  try {
    const pageId = getPageId();
    if (!electronMode && object) {
      // Using localStorage for non-Electron mode
      const appSageStorage = getAppSageStorage();
      const currentPage = appSageStorage.pages[pageId];
      currentPage[`${componentName}_userdata`] = object;
      localStorage.setItem(appSageStorageString, JSON.stringify(appSageStorage));
    } else if (electronMode && object) {
      // Using Electron storage
      window.api.readStoreData().then((storeData) => {
        // Ensure pages exist in storeData
        if (!storeData.pages) {
          storeData.pages = {};
        }
        // Ensure the pageId exists in storeData
        if (!storeData.pages[pageId]) {
          storeData.pages[pageId] = {};
        }
        // Save the component object to the current page
        storeData.pages[pageId][`${componentName}_userdata`] = JSON.parse(object);

        // Save the updated data back to Electron store
        window.api.updateStoreData(storeData).then(updatedData => {
          window.appSageStore = updatedData;
        }).catch((error) => {
          console.error('Error saving component object to page in Electron mode:', error);
        });
      }).catch((error) => {
        console.error('Error reading store data in Electron mode:', error);
      });
    }
    // Handle API call for both save (POST/PUT) and fetch (GET)
    if (customBackend) {
      const fetchConfig = cleanAndSanitizeFetchConfigJson({
        ...apiCallConfig,
        method: modes[mode],
        body: (mode === 'save' || mode === 'update') ? JSON.parse(object) : undefined,
      });

      // Add query parameters for fetching if needed
      const url = mode === 'fetch' && apiCallConfig.queryParams
        ? buildUrlWithParams(customBackend.url, apiCallConfig.queryParams)
        : customBackend.url;

      // Make API request
      return makeApiRequest(url, fetchConfig)
        .then(response => {
          console.log(`${mode === 'save' ? 'Save' : 'Fetch'} successful:`, response);
          return response;
        })
        .catch(error => {
          console.error(`${mode === 'save' ? 'Save' : 'Fetch'} failed:`, error);
          throw error;
        });
    }
  } catch (error) {
    console.error('Something went wrong saving component data.', error);
  }
}
window.saveEndUserData = saveEndUserData;

// Helper function to build a URL with query parameters
function buildUrlWithParams(baseUrl, params) {
  const url = new URL(baseUrl);
  Object.keys(params).forEach(key => {
    if (params[key] != null) { // Only add non-null params
      url.searchParams.append(key, params[key]);
    }
  });
  return url.toString();
}

function cleanAndSanitizeFetchConfigJson(object) {
  if (typeof object !== 'object' || object === null) {
    throw new Error("Invalid fetch config: must be a non-null object.");
  }

  const cleanedConfig = {};

  // Merge `options` into the root level, but do not overwrite existing properties
  const options = object.options || {};
  const mergedConfig = { ...options, ...object };

  // Ensure method is valid and default to 'GET'
  const validMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];
  cleanedConfig.method = validMethods.includes((mergedConfig.method || 'GET').toUpperCase())
    ? mergedConfig.method.toUpperCase()
    : 'GET';

  // Ensure headers is an object
  cleanedConfig.headers = typeof mergedConfig.headers === 'object' && mergedConfig.headers !== null
    ? mergedConfig.headers
    : {};

  // Ensure headers have valid key-value pairs
  for (const [key, value] of Object.entries(cleanedConfig.headers)) {
    if (typeof key !== 'string' || !key.trim()) {
      delete cleanedConfig.headers[key];
    }
    if (typeof value !== 'string') {
      delete cleanedConfig.headers[key];
    }
  }

  // Ensure body is valid for methods that allow it
  const methodsWithBody = ['POST', 'PUT', 'PATCH'];
  if (methodsWithBody.includes(cleanedConfig.method)) {
    if (typeof mergedConfig.body === 'string' || mergedConfig.body === null || mergedConfig.body === undefined) {
      cleanedConfig.body = mergedConfig.body;
    } else {
      throw new Error("Invalid fetch config: 'body' must be a string for POST/PUT/PATCH methods.");
    }
  }

  // Ensure credentials are valid
  const validCredentials = ['omit', 'same-origin', 'include'];
  cleanedConfig.credentials = validCredentials.includes(mergedConfig.credentials)
    ? mergedConfig.credentials
    : undefined; // Defaults to browser's fetch behavior

  // Ensure mode is valid
  const validModes = ['cors', 'no-cors', 'same-origin', 'navigate'];
  cleanedConfig.mode = validModes.includes(mergedConfig.mode)
    ? mergedConfig.mode
    : undefined;

  // Ensure cache is valid
  const validCacheOptions = ['default', 'no-store', 'reload', 'no-cache', 'force-cache', 'only-if-cached'];
  cleanedConfig.cache = validCacheOptions.includes(mergedConfig.cache)
    ? mergedConfig.cache
    : undefined;

  // Ensure redirect is valid
  const validRedirectOptions = ['follow', 'manual', 'error'];
  cleanedConfig.redirect = validRedirectOptions.includes(mergedConfig.redirect)
    ? mergedConfig.redirect
    : undefined;

  // Ensure integrity is a string if provided
  if (mergedConfig.integrity && typeof mergedConfig.integrity === 'string') {
    cleanedConfig.integrity = mergedConfig.integrity;
  }

  // Sanitize referrer
  if (mergedConfig.referrer && typeof mergedConfig.referrer === 'string') {
    cleanedConfig.referrer = mergedConfig.referrer;
  }

  // Sanitize referrerPolicy
  const validReferrerPolicies = [
    'no-referrer',
    'no-referrer-when-downgrade',
    'same-origin',
    'origin',
    'strict-origin',
    'origin-when-cross-origin',
    'strict-origin-when-cross-origin',
    'unsafe-url',
  ];
  cleanedConfig.referrerPolicy = validReferrerPolicies.includes(mergedConfig.referrerPolicy)
    ? mergedConfig.referrerPolicy
    : undefined;

  return cleanedConfig;
}
window.cleanAndSanitizeFetchConfigJson = cleanAndSanitizeFetchConfigJson;

async function makeApiRequest(url, fetchConfig) {
  const response = await fetch(url, fetchConfig);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

// This function saves all page's settings from the designer's additions,
// changes, and removals during the designer's traditional editor workflow
// from the dedicated Page Settings sidebar.
// DATA IN: ['String', 'JSON Object']
// Save page settings (renamed to savePageDataSettings)
function savePageDataSettings(pageId, data) {
  if (!electronMode) {
    // Using localStorage for non-Electron mode
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
    // Using Electron storage
    window.api.readStoreData().then((storeData) => {
      // Ensure pages exist in storeData
      if (!storeData.pages) {
        storeData.pages = {};
      }
      // Ensure the pageId exists in storeData
      if (!storeData.pages[pageId]) {
        storeData.pages[pageId] = { page_data: {}, settings: {}, blobs: {} };
      }
      // Update the settings for the specified pageId
      storeData.pages[pageId].settings = data;

      // Save the updated data back to Electron store
      window.api.updateStoreData(storeData).then(updatedData => {
        window.appSageStore = updatedData;
      }).catch((error) => {
        console.error('Error saving page data settings in Electron mode:', error);
      });
    }).catch((error) => {
      console.error('Error reading store data in Electron mode:', error);
    });
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
  };

  if (!electronMode) {
    // Using localStorage for non-Electron mode
    const appSageStorage = getAppSageStorage();
    appSageStorage.pages[pageId].settings = JSON.stringify(settings);
    localStorage.setItem(appSageStorageString, JSON.stringify(appSageStorage));
  } else {
    // Using Electron storage
    window.api.readStoreData().then((storeData) => {
      // Ensure pages exist in storeData
      if (!storeData.pages) {
        storeData.pages = {};
      }

      if (!storeData.pages[pageId]) {
        storeData.pages[pageId] = {}
      }

      if (!storeData.pages[pageId]) {
        storeData.pages[pageId] = {};
      }
      // Update the settings for the specified pageId
      storeData.pages[pageId].settings = JSON.stringify(settings);

      // Save the updated data back to Electron store
      window.api.updateStoreData(storeData).then(updatedData => {
        window.appSageStore = updatedData;
      }).catch((error) => {
        console.error('Error saving page settings in Electron mode:', error);
      });
    }).catch((error) => {
      console.error('Error reading store data in Electron mode:', error);
    });
  }
} // DATA OUT: null
window.savePageSettingsChanges = savePageSettingsChanges;
