// renderer.js
import './render/tailwind.js';
import './render/tailwind.config.js';
import './render/_globals.js';
import './render/index/main.js';
import './render/editor/main.js';
import './render/preview/main.js';


// Define `global` in the renderer process to mimic Node.js behavior
if (typeof global === 'undefined') {
  var global = window;  // In the browser, `global` is mapped to `window`
}

var appSageStore;
var storageMethodLegacy = false;

async function loadScripts(scripts) {
  const promises = scripts.map(script => loadScript(script));

  // Wait for all remaining scripts to load
  await Promise.all(promises);
}

function loadScript(scriptSrc) {
  // Check if the script is already part of the bundle
  if (window.api) {
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
  if (window.api) {
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

  loadScript('./render/index/main.js')
  console.log('Renderer process for index.html running');
});
