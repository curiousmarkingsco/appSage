// renderer.js

// Define `global` in the renderer process to mimic Node.js behavior
if (typeof global === 'undefined') {
  var global = window;  // In the browser, `global` is mapped to `window`
}

var appSageStore;

async function loadScripts(scripts) {
  const promises = scripts.map(script => loadScript(script));

  // Wait for all remaining scripts to load
  await Promise.all(promises);
}

function loadScript(scriptSrc) {
  // Check if the script is already part of the bundle
  if (typeof window.api !== 'undefined') {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      script.onload = resolve;  // Resolve when loaded
      script.onerror = reject;  // Reject on error
      document.body.appendChild(script);
    });
  } else {
    // Skip loading as the script is already bundled
    console.log(`${scriptSrc} is already bundled, skipping dynamic loading.`);
    return Promise.resolve();  // Return a resolved promise to continue the flow
  }
}

document.addEventListener('DOMContentLoaded', function () {
  if (typeof window.api !== 'undefined') {
    const username = 'jojfsfweffwfe';
    const userPassword = 'aaafewfwefewaav';

    // Initialize the store and log the result or error
    window.api.createOrFindStore(username, userPassword).then(store => {
        appSageStore = store;
        console.log('Store initialized:', store);
    }).catch(error => {
      storageMethodLegacy = true;
      console.error('Error initializing store:', error.stack || error);
    });

    
    window.api.readStore().then(store => {
        appSageStore = store;
        console.log('Store read:', store);
    }).catch(error => {
        console.error('Error initializing store:', error.stack || error);
    });
  } else {
    storageMethodLegacy = true;
  }
  const params = new URLSearchParams(window.location.search);

  const config = params.get('config');
  if (config) loadScript('./render/editor/main.js').then(() => {initializeEditor()});
  
  const pageConfig = params.get('page');
  // if (pageConfig) loadScript('./render/preview/main.js').then(() => {initializePreview()});
  
  if (!config && !pageConfig) loadScript('./render/index/main.js').then(() => {initializeDashboard()});
  console.log('Renderer process for index.html running');
});
