/*

  preview/main.js

  This file is intended to clean up any residual content that could pop up from
  the designer editing the page. And, of course, load the necessary data from
  localStorage to show the final page design without the sidebar cluttering up
  their eyes, giving an unadultered view of the page.

*/

// app/render/preview/main.js

function initializePreview() {
  // Dynamically inject the required head resources like Tailwind and fonts
  document.head.innerHTML = `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview Page</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <script src="./app/render/tailwind.js"></script>
    <script src="./app/render/tailwind.config.js"></script>
  `;

  // Inject body content (if any static content is necessary) or leave it for dynamic use
  const pageElement = document.getElementById('page');
  
  // Dynamically load scripts necessary for preview functionality
  loadScripts([
    './app/render/editor/globals.js',
    './app/render/editor/components/main.js',
    './app/render/editor/save.js',
    './app/render/load.js',
    './app/render/preview/main.js'
  ]);

  /**
   * Helper function to dynamically load scripts
   * @param {Array} scriptUrls - An array of script URLs to load
   */
  function loadScripts(scriptUrls) {
    scriptUrls.forEach(src => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    });
  }
};

const store = require('../../storage/index.js');

// This function does everything described above, though this comment should
// probably be reviewed and updated if anything is ever added to this file.
// DATA IN: String
function loadPreview(pageId) {
  if (storageMethodLegacy) {
    const json = loadPage(pageId);  // Uses the already-refactored loadPage
    if (json) {
      const pageContainer = document.getElementById('page');
      pageContainer.innerHTML = ''; // Clear existing content

      document.querySelector('title').textContent = pageId;

      const data = JSON.parse(json);
      data.forEach(item => {
        pageContainer.innerHTML += item.content;
      });

      loadPageSettings(pageId, true);
      loadPageBlobs(pageId);
      loadPageMetadata(pageId);
    } else {
      console.error('No saved data found for pageId:', pageId);
    }
  } else {
    // Electron-store version (handling real-time)
    const pageHtml = store.get(`appSage.pages.${pageId}.html`);
    if (pageHtml) {
      const pageContainer = document.getElementById('page');
      pageContainer.innerHTML = pageHtml;

      document.querySelector('title').textContent = pageId;

      loadPageSettings(pageId, true);
      loadPageBlobs(pageId);  // Should call electron-store version
      loadPageMetadata(pageId);
    } else {
      console.error('No saved data found for pageId:', pageId);
    }
  }
} // DATA OUT: null

// This used to be in an inline script on the page:
document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const previewPageId = urlParams.get('page');

  if (previewPageId) {
    loadPreview(previewPageId);
  }
});

if (document.readyState === 'loading') {
  // Document is still loading, attach event listener
  document.addEventListener('DOMContentLoaded', initializePreview);
} else {
  // Document is already fully loaded, run initialization immediately
  initializePreview();
}
