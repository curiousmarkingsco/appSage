/*

  preview/main.js

  This file is intended to clean up any residual content that could pop up from
  the designer editing the page. And, of course, load the necessary data from
  storage to show the final page design without the sidebar cluttering up
  their eyes, giving an unadultered view of the page.

*/

function initializePreview() {
  return new Promise((resolve, reject) => {
    try {
      // Dynamically inject the required head resources like Tailwind and fonts
      document.head.innerHTML = `
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${window.location.host === 'localhost:8080' ? `<meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline'; media-src 'self' 'unsafe-inline' localhost:8080 blob: data:;  img-src 'self' 'unsafe-inline' localhost:8080 blob: data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' 'unsafe-inline' fonts.gstatic.com;">` : '' }
        <title>Preview Page</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      `;

      // Inject body content (if any static content is necessary) or leave it for dynamic use
      const bodyElement = document.querySelector('body');
      const pageElement = document.createElement('div');
      pageElement.id = 'page';
      bodyElement.appendChild(pageElement);


      // Dynamically load scripts necessary for preview functionality
      const urlParams = new URLSearchParams(window.location.search);
      const previewPageId = urlParams.get('page');

      if (previewPageId) loadPreview(previewPageId);

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
window.initializePreview = initializePreview;

// This function does everything described above, though this comment should
// probably be reviewed and updated if anything is ever added to this file.
// DATA IN: String
async function loadPreview(pageId) {
  const json = await loadPage(pageId);  // Uses the already-refactored loadPage
  if (json) {
    const pageContainer = document.getElementById('page');
    pageContainer.innerHTML = ''; // Clear existing content

    document.querySelector('title').textContent = pageId;

    const data = json;
    data.forEach(item => {
      pageContainer.innerHTML += item.content;
    });

    loadPageSettings(pageId, true);
    loadPageMetadata(pageId);
  } else {
    console.error('No saved data found for pageId:', pageId);
  }
  activateComponents();
} // DATA OUT: null
window.loadPreview = loadPreview;
