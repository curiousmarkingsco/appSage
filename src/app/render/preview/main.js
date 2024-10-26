/*

  preview/main.js

  This file is intended to clean up any residual content that could pop up from
  the designer editing the page. And, of course, load the necessary data from
  localStorage to show the final page design without the sidebar cluttering up
  their eyes, giving an unadultered view of the page.

*/

const store = require('../../electron_app/storage/storage.js');

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
