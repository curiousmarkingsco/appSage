/*

  preview/main.js

  This file is intended to clean up any residual content that could pop up from
  the designer editing the page. And, of course, load the necessary data from
  localStorage to show the final page design without the sidebar cluttering up
  their eyes, giving an unadultered view of the page.

*/

// This function does everything described above, though this comment should
// probably be reviewed and updated if anything is ever added to this file.
// DATA IN: String
function loadPreview(pageId) {
  const json = loadPage(pageId);
  if (json) {
    const pageContainer = document.getElementById('page');
    pageContainer.innerHTML = ''; // Clear existing content

    document.querySelector('title').textContent = pageId;

    const data = JSON.parse(json);
    data.forEach(item => {
      const element = document.createElement(item.tagName);
      element.className = item.className;
      element.innerHTML = item.content;
      pageContainer.appendChild(element);
    });

    loadPageSettings(pageId, true);
    loadPageBlobs(pageId);
    loadPageMetadata(pageId);
  } else {
    console.error('No saved data found for pageId:', pageId);
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
