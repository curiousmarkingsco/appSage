// renderer.js

// Define `global` in the renderer process to mimic Node.js behavior
if (typeof global === 'undefined') {
  var global = window;  // In the browser, `global` is mapped to `window`
}

var appSageStore;

document.addEventListener('DOMContentLoaded', function () {
  const username = 'jojfsfweffwfe';
  const userPassword = 'aaafewfwefewaav';

  // Initialize the store and log the result or error
  window.api.createOrFindStore(username, userPassword)
    .then(store => {
      appSageStore = store;
      console.log('Store initialized:', store);
    })
    .catch(error => {
      console.error('Error initializing store:', error.stack || error);
    });

  loadScript('./render/index/main.js')
  console.log('Renderer process for index.html running');
});

async function loadScripts(scripts) {
  const promises = scripts.map(script => loadScript(script));

  // Wait for all remaining scripts to load
  await Promise.all(promises);
}

function loadScript(scriptSrc) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = scriptSrc;
    script.async = true;
    script.onload = resolve;  // Resolve when loaded
    script.onerror = reject;  // Reject on error
    document.body.appendChild(script);
  });
}
